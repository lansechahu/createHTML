import '../css/index.css';
import $ from 'jquery';
import * as ChcUtils from 'chcutils';
import Clipboard from 'Clipboard';

let fm_title = ''; //格式化后的标题
let codeHTML = ''; //生成的代码
let strUtil = new ChcUtils.StringUtil();

initBtn();

//换肤
window.setSkin = function (theme,__this) {
    $(__this).addClass('select_skin').siblings().removeClass('select_skin');
    window.document.documentElement.setAttribute('data-theme', theme);
}

function initBtn() {
    $('#zhuanBtn').on('click', zhuanhuan);

    //复制标题到剪贴板
    var clipboardTitle = new Clipboard('#copyTitleBtn', {
        text: function () {
            return $('#formatTitle').html();
        }
    });

    //复制成功执行的回调，可选
    clipboardTitle.on('success', function (e) {
        alert('复制成功');
    });

    //复制失败执行的回调，可选
    clipboardTitle.on('error', function (e) {
        alert('复制失败');
    });

    //复制内容到剪贴板
    var clipboard = new Clipboard('#copyBtn', {
        text: function () {
            return codeHTML;
        }
    });

    //复制成功执行的回调，可选
    clipboard.on('success', function (e) {
        alert('复制成功');
    });

    //复制失败执行的回调，可选
    clipboard.on('error', function (e) {
        alert('复制失败');
    });
}


//添加标题组件
window.addTitle = function () {
    let content = '<div class="area-box"><div class="area_title">标题:</div><textarea class="txt-area" placeholder="标题"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//添加弹点内容
window.addDot = function () {
    let content = '<div class="area-box"><div class="area_title">弹点:</div><textarea class="txt-area" placeholder="弹点内容"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}


//添加粗体文本组件
window.addStrong = function () {
    let content = '<div class="area-box"><div class="area_title">粗体文本:</div><textarea class="txt-area" placeholder="粗体段落"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//添加正文段落组件
window.addContent = function () {
    let content = '<div class="area-box"><div class="area_title">正文:</div><textarea class="txt-area" placeholder="正文段落" onmouseup="areamouseup(this)"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//添加视频组件
window.addVideo = function () {
    let content = '<div class="area-box" data-type="video"><div class="videoBox"><div class="video-sub"><div class="area_title">视频链接:</div><textarea class="video-area" placeholder="视频链接"></textarea></div><div class="video-sub"><div class="area_title">封面图:</div><textarea class="img-area" placeholder="封面图链接"></textarea></div></div><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//文本域鼠标抬起事件
let start = null;
let end = null;
let thisArea = null;
window.areamouseup = function (__this) {
    let id = $(__this);
    start = id[0].selectionStart;
    end = id[0].selectionEnd;
    thisArea = id;
    if (start == end) {
        start = null;
        end = null;
        thisArea = null;
    }
}

//给选中的文字加链接
window.addLink = function () {
    if (thisArea == null) return;
    let link = prompt("请输入链接", "在这填写链接地址");
    if (link) {
        let initTxt = thisArea.val();
        let s_txt = initTxt.substring(start, end);
        let new_txt = strUtil.del_flg(initTxt, start + 1, (end - start));
        let insert_txt = "<a href=" + link + ">" + s_txt + "</a>";
        new_txt = strUtil.insert_flg(new_txt, insert_txt, start);
        thisArea.val(new_txt);
    }
}

//添加加粗选中文本组件
window.addCuTxt = function () {
    if (thisArea == null) return;

    let initTxt = thisArea.val();
    let s_txt = initTxt.substring(start, end);
    let new_txt = strUtil.del_flg(initTxt, start + 1, (end - start));
    let insert_txt = "--Strong::" + s_txt + "::Strong--";
    new_txt = strUtil.insert_flg(new_txt, insert_txt, start);
    thisArea.val(new_txt);
}

//删除该组件
window.delItem = function (e) {
    let box = $(e).parent().parent();
    box.remove();
}

//上移
window.moveUp = function (e) {
    let box = $(e).parent().parent(); //本身节点
    let prev = $(box).prev(); //上一个兄弟节点
    if (prev.length <= 0) {
        alert('已是最上面了');
        return;
    }

    $(box).after($(prev));
}

//下移
window.moveDown = function (e) {
    let box = $(e).parent().parent(); //本身节点
    let next = $(box).next(); //下一个兄弟节点
    if (next.length <= 0) {
        alert('已是最下面了');
        return;
    }

    $(next).after($(box));
}


//转换
function zhuanhuan() {
    let box = $('#edit-area').children('.area-box');
    let tempStr = '';
    fm_title = '';
    codeHTML = '';

    for (let i = 0; i < box.length; i++) {
        if ($(box[i]).data("type") == 'video') {
            tempStr = getVideo($(box[i]));
            codeHTML += tempStr;
        } else {
            let temp = $(box[i]).children('.txt-area');
            let type = $(temp).attr('placeholder');
            tempStr = getStr(type, $(temp).val());
            codeHTML += tempStr;
        }
    }

    //显示标题
    document.getElementById('formatTitle').innerHTML = fm_title;

    //显示代码
    var show = document.getElementById('panel-show');
    show.innerText = codeHTML;

    //显示最终效果
    document.getElementById('final-content').innerHTML = codeHTML;
    $('#final-content').show();
}

//生成视频代码
function getVideo(__box) {
    let videoBox = $(__box).children('.videoBox');
    let videoSub = $(videoBox).children('.video-sub');
    let videoLink = $(videoSub[0]).children('.video-area').val().toString();
    let imgLink = $(videoSub[1]).children('.img-area').val().toString();
    if (videoLink == "") {
        alert('请输入视频地址');
        return "";
    }
    if (imgLink == "") {
        alert('请输入视频封面');
        return "";
    }
    let str = '<p><video src=' + videoLink + ' poster=' + imgLink + '>您的浏览器不支持 video 标签。</video></p>';
    let str2 = '<p style="text-align: center;"><span style="color: rgb(216, 216, 216);">建议在WiFi环境下观看</span></p><br>';
    str += str2;

    return str;
}

//根据类型生成代码
function getStr(__type, __val) {
    let title = 'font-weight: bold;margin: 0 auto;text-align:center';

    let str = "";
    let arr = [];
    switch (__type) {
        case '标题':
            fm_title = strUtil.strReplace(__val, '•', '·');
            return "";
            break;
        case '弹点内容':
            __val = strUtil.trim(__val, 4);
            arr = __val.split('\n');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = strUtil.strReplace(arr[i], '•\t', ''); //清除制表符
                let temp = "<p>·<strong>" + arr[i] + "</strong></p>";
                arr[i] = temp;
            }
            str = arr.join("") + "<br>";
            break;
        case '粗体段落':
            __val = strUtil.strReplace(__val, '·', '▪');
            arr = __val.split('\n');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == "") continue;
                let temp = "<p class='p'><strong>" + arr[i] + "</strong></p><br>";
                arr[i] = temp;
            }
            str = arr.join("");
            //str = "<p><strong>" + __val + "</strong></p><br>";
            break;
        case '正文段落':
            __val = strUtil.strReplace(__val, '·', '▪');
            arr = __val.split('\n');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == "") continue;
                let temp = "<p class='p'>" + arr[i] + "</p><br>";
                arr[i] = temp;
            }
            str = arr.join("");
            //str = "<p>" + __val + "</p><br>";
            break;
    }

    //加粗字体
    str = strUtil.strReplace(str, "--Strong::", "<strong>", "g");
    str = strUtil.strReplace(str, "::Strong--", "</strong>", "g");
    //加换行符
    let str4 = strUtil.strReplace(str, "\n", "<br>", "g");
    return str4;
}