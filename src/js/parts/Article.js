/*
正文组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class Article {
    constructor() {
        this.content = '<div class="area-box layui-colla-item"><div class="layui-colla-title">正文段落:</div><div class="layui-colla-content layui-show"><textarea class="txt-area" placeholder="正文段落" onmouseup="areamouseup(this)"></textarea><div class="btnBox layui-btn-group"><button class="delBtn layui-btn layui-btn-normal" onclick="delItem(this)">删除</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveUp(this)">上移</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveDown(this)">下移</button></div><div class="clear"></div></div></div>';
    }

    add() {
        $('#edit-area').append(this.content);
        console.log($(this.content).children('.layui-colla-content').children('.txt-area'))
        element.init('collapse');
    }

    formate(__val) {
        let strUtil = new ChcUtils.StringUtil();

        let arr = [];
        __val = strUtil.strReplace(__val, '·', '▪');
        __val = strUtil.strReplace(__val, '•', '▪');
        arr = __val.split('\n');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == "") continue;
            let temp = "<p class='p'>" + arr[i] + "</p>";
            arr[i] = temp;
        }
        let str = arr.join("");
        return str;
    }

    getSelect() {
        let obj = {
            "start": start,
            "end": end,
            "thisArea": thisArea
        }

        return obj;
    }
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
