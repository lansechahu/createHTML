/*
图片组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class Pic {
    constructor() {
        this.content = '<div class="area-box  layui-colla-item" data-type="pic"><div class="layui-colla-title">插入图片:</div><div class="layui-colla-content layui-show"><div class="picBox"><div class="pic-sub"><div class="area_title">图片地址:</div><div class="img-area" style="border: 1px solid #000000;">abc</div></div><button onclick="uploadPicClick(this)" class="my-img layui-btn layui-btn-normal">上传图片</button><input type="file" accept="image/*" class="img-upload" onchange="uploadPic(this)"></input></div><div class="btnBox layui-btn-group"><button class="delBtn layui-btn layui-btn-normal" onclick="delItem(this)">删除</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveUp(this)">上移</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveDown(this)">下移</button></div></div></div>';

        this.upload = null;
        this.layer = null;
        let that = this;
        layui.use(['layer', 'upload'], function () {
            that.upload = layui.upload;
            that.layer = layui.layer;
        });
    }

    add() {
        this.layer.msg('正在建设中', {shade: [0.3, '#000000'], shadeClose: true});
        return;
        $('#edit-area').append(this.content);
        element.init('collapse');

        /*let uploadInst = this.upload.render({
            elem: '.my-img',
            url: 'http://localhost:3000/posts',
            done:function(res){
                console.log(res);
            }
        });*/
    }

    //生成图片代码
    getPic(__box) {
        let picBox = $(__box).children('.layui-colla-content').children('.picBox');
        let picSub = $(picBox).children('.pic-sub');
        let picLink = $(picSub[0]).children('.img-area').html().toString();
        if (picLink == '') {
            //alert('请选择上传图片');
            layer.msg('请选择上传图片', {shade: [0.3, '#000000'], shadeClose: true});
            return;
        }
        let str = '<img src=' + picLink + ' />';
        return str;
    }
}

//上传图片按钮
window.uploadPicClick = function (e) {
    let imgUpload = $(e).siblings('.img-upload');
    console.log(imgUpload);
    $(imgUpload).click();
}

//上传图片
window.uploadPic = function (event) {
    if ($(event).val() == undefined) return;
    let me = $(event); //本身节点

    var fd = new FormData();
    fd.append("upload", 1);
    fd.append("upfile", event.files['0']);

    showPop('图片上传中。。。'); //上传图片蒙版
    uploadImg(fd, function (result) {
        console.log(typeof result.code);
        if (result.code == "2000") {
            let img_area = $(me).siblings('.pic-sub').children('.img-area');
            $(img_area).html(result.url);
        }
        hidePop(); //关闭提示蒙版
    });
}

function uploadImg(__img, __callback) {
    /*$.ajax({
        url: "http://localhost:3000/profile",
        type: "POST",
        dataType:"json",
        processData: false,
        contentType: false,
        //data: __img,
        data:{
            "abc":"123"
        },
        success: function (result) {
            __callback(result);
        }
    });*/

    $.ajax({
        type: "POST",
        //url: "/api/getIndustry",
        url: "http://localhost:3000/posts",
        data: {
            "code": 2000,
            "url": "https://www.gamersky.com/showimage/id_gamersky.shtml?http://img1.gamersky.com/image2018/10/20181015_my_227_3/image007.jpg"
        },
        dataType: "JSON",
        success: function (result) {
            __callback(result);
        }
    })
}