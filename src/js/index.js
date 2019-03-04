//import '../css/index.css';
import $ from 'jquery';
import * as ChcUtils from 'chcutils';
import Clipboard from 'Clipboard';

import Title from './parts/Title';
import PopContent from './parts/PopContent';
import Strong from './parts/Strong';
import Article from './parts/Article';
import StrongCopy from './parts/StrongCopy';
import Video from './parts/Video';
import Link from './parts/Link';
import Pic from './parts/Pic';

let fm_title = ''; //格式化后的标题
let codeHTML = ''; //生成的代码
let strUtil = new ChcUtils.StringUtil();

let titlePart = new Title(); //大标题组件
let popPart = new PopContent(); //弹点组件
let strongPart = new Strong(); //粗体段落组件
let articlePart = new Article(); //正文组件
let strongCopyPart = new StrongCopy(); //加粗组件
let videoPart = new Video(); //视频组件
let linkPart = new Link(); //加链接组件
let picPart = new Pic(); //图片组件

initBtn();

var layer;
var element;
layui.use(['layer', 'upload','element'], function () {
    layer = layui.layer;
    element = layui.element;
});


//换肤
window.setSkin = function (theme, __this) {
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
        //alert('复制成功');
        layer.msg('复制成功', {shade: [0.3, '#000000'], shadeClose: true});
    });

    //复制失败执行的回调，可选
    clipboardTitle.on('error', function (e) {
        //alert('复制失败');
        layer.msg('复制失败', {shade: [0.3, '#000000'], shadeClose: true});
    });

    //复制内容到剪贴板
    var clipboard = new Clipboard('#copyBtn', {
        text: function () {
            return codeHTML;
        }
    });

    //复制成功执行的回调，可选
    clipboard.on('success', function (e) {
        //alert('复制成功');
        layer.msg('复制成功', {shade: [0.3, '#000000'], shadeClose: true});
    });

    //复制失败执行的回调，可选
    clipboard.on('error', function (e) {
        //alert('复制失败');
        layer.msg('复制失败', {shade: [0.3, '#000000'], shadeClose: true});
    });
}


//添加标题组件
window.addTitle = function () {
    titlePart.add();
}

//添加弹点内容
window.addDot = function () {
    popPart.add();
}


//添加粗体文本组件
window.addStrong = function () {
    strongPart.add();
}

//添加正文段落组件
window.addContent = function () {
    articlePart.add();
}

//添加视频组件
window.addVideo = function () {
    videoPart.add();
}

//添加图片组件
window.addPic = function () {
    /*showTimePop('正在装修中', 2);
    return;*/
    picPart.add();
}


//给选中的文字加链接
window.addLink = function () {
    let obj = articlePart.getSelect();
    linkPart.addLink(obj);
}

//添加加粗选中文本组件
window.addCuTxt = function () {
    let obj = articlePart.getSelect();
    strongCopyPart.addStrong(obj);
}

//删除该组件
window.delItem = function (e) {
    let box = $(e).parent().parent().parent();
    box.remove();
}

//上移
window.moveUp = function (e) {
    let box = $(e).parent().parent().parent(); //本身节点
    let prev = $(box).prev(); //上一个兄弟节点
    if (prev.length <= 0) {
        //alert('已是最上面了');
        layer.msg('已是最上面了', {shade: [0.3, '#000000'], shadeClose: true});
        return;
    }

    $(box).after($(prev));
}

//下移
window.moveDown = function (e) {
    let box = $(e).parent().parent().parent(); //本身节点
    let next = $(box).next(); //下一个兄弟节点
    if (next.length <= 0) {
        //alert('已是最下面了');
        layer.msg('已是最下面了', {shade: [0.3, '#000000'], shadeClose: true});
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
            tempStr = videoPart.getVideo($(box[i]));
            codeHTML += tempStr;
        } else if ($(box[i]).data("type") == 'pic') {
            tempStr = picPart.getPic($(box[i]));
            codeHTML += tempStr;
        } else {
            let temp = $(box[i]).children('.layui-colla-content').children('.txt-area');
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

    //转换完成提示
    showTimePop('转换完成', 2);
}

//生成图片代码
/*function getPic(__box) {
    let picBox = $(__box).children('.picBox');
    let picSub = $(picBox).children('.pic-sub');
    let picLink = $(picSub[0]).children('.img-area').html().toString();
    if (picLink == '') {
        //alert('请选择上传图片');
        layer.msg('请选择上传图片', {shade: [0.3, '#000000'], shadeClose: true});
        return;
    }
    let str = '<img src=' + picLink + ' />';
    return str;
}*/

//根据类型生成代码
function getStr(__type, __val) {
    let str = "";
    let arr = [];
    switch (__type) {
        case '标题':
            fm_title = titlePart.formate(__val);
            return "";
            break;
        case '弹点内容':
            str = popPart.formate(__val);
            break;
        case '粗体段落':
            str = strongPart.formate(__val);
            break;
        case '正文段落':
            str = articlePart.formate(__val);
            break;
    }

    //加粗字体
    /*str = strUtil.strReplace(str, "--Strong::", "<strong>", "g");
    str = strUtil.strReplace(str, "::Strong--", "</strong>", "g");*/
    //加换行符
    let str4 = strUtil.strReplace(str, "\n", "", "g");
    return str4;
}

//关闭蒙版
window.hidePop = function () {
    $('#popBox').hide();
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

//只显示的蒙版
window.showPop = function (__msg) {
    layer.msg(__msg, {shade: [0.3, '#000000'], shadeClose: true});
    /*$('#pop_msg').html(__msg);
    $('#popBox').css('display', 'flex');*/
}

//倒计时蒙版
let timer;

window.showTimePop = function (__msg, __num) {
    layer.msg(__msg, {icon: 6, time: __num * 1000, shade: [0.3, '#000000'], shadeClose: true});
    /*let num = __num || 3;
    $('#pop_msg').html(__msg + ' ' + num);
    $('#popBox').css('display', 'flex');
    timer = setInterval(function () {
        num--;
        $('#pop_msg').html(__msg + ' ' + num);
        if (num <= 0) {
            hidePop();
        }
    }, 1000);*/
}