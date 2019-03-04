/*
视频组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class Video {
    constructor() {
        this.content = '<div class="area-box" data-type="video"><div class="videoBox"><div class="video-sub"><div class="area_title">视频链接:</div><textarea class="video-area" placeholder="视频链接"></textarea></div><div class="video-sub"><div class="area_title">封面图:</div><textarea class="img-area" placeholder="封面图链接"></textarea></div></div><div class="btnBox"><button class="delBtn" onclick="delItem(this)">删除</button><button class="moveBtn" onclick="moveUp(this)">上移</button><button class="moveBtn" onclick="moveDown(this)">下移</button></div></div>';
    }

    add() {
        $('#edit-area').append(this.content);
    }

    //生成视频代码
    getVideo(__box) {
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
}