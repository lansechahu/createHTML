import '../css/index.css';
import $ from 'jquery';
import * as ChcUtils from 'chcutils';
import Clipboard from 'Clipboard';

let codeHTML = ''; //生成的代码
let strUtil = new ChcUtils.StringUtil();

initBtn();

function initBtn() {
    $('#zhuanBtn').on('click', zhuanhuan);

    //复制到剪贴板
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
    let content = '<div class="area-box"><textarea class="txt-area" placeholder="标题"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//添加段点内容
window.addDot = function () {
    let content = '<div class="area-box"><textarea class="txt-area" placeholder="段点内容"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}


//添加粗体文本组件
window.addStrong = function () {
    let content = '<div class="area-box"><textarea class="txt-area" placeholder="粗体段落"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    $('#edit-area').append(content);
}

//添加正文段落组件
window.addContent = function () {
    let content = '<div class="area-box"><textarea class="txt-area" placeholder="正文段落" onmouseup="areamouseup(this)"></textarea><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
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
    codeHTML = '';

    for (let i = 0; i < box.length; i++) {
        let temp = $(box[i]).children('.txt-area');
        let type = $(temp).attr('placeholder');
        let tempStr = getStr(type, $(temp).val());
        codeHTML += tempStr;
    }

    var show = document.getElementById('panel-show');
    show.innerText = codeHTML;

    document.getElementById('final-content').innerHTML = codeHTML;
    $('#final-content').show();
}

//根据类型生成代码
function getStr(__type, __val) {
    let title = 'font-weight: bold;font-size: 28px;margin: 0 auto;text-align:center';

    let str = "";
    switch (__type) {
        case '标题':
            __val = strUtil.strReplace(__val, '•', '·');
            str = "<div style='" + title + "'>" + __val + "</div><br>";
            break;
        case '段点内容':
            __val = strUtil.trim(__val, 4);
            let arr = __val.split('\n');
            for (let i = 0; i < arr.length; i++) {
                let temp = "<p>·<strong>" + arr[i] + "</strong></p>";
                arr[i] = temp;
            }
            str = arr.join("")+"<br>";
            break;
        case '粗体段落':
            __val = strUtil.strReplace(__val, '·', '▪');
            str = "<p><strong>" + __val + "</strong></p><br>";
            break;
        case '正文段落':
            __val = strUtil.strReplace(__val, '·', '▪');
            str = "<p>" + __val + "</p><br>";
            break;
    }

    //加粗字体
    str = strUtil.strReplace(str, "--Strong::", "<strong>", "g");
    str = strUtil.strReplace(str, "::Strong--", "</strong>", "g");
    //加换行符
    let str4 = strUtil.strReplace(str, "\n", "<br>", "g");
    return str4;
}