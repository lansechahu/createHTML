/*
粗体段落组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class Strong {
    constructor() {
        this.content = '<div class="area-box layui-colla-item"><div class="layui-colla-title">粗体段落:</div><div class="layui-colla-content layui-show"><textarea class="txt-area" placeholder="粗体段落"></textarea><div class="btnBox layui-btn-group"><button class="delBtn layui-btn layui-btn-normal" onclick="delItem(this)">删除</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveUp(this)">上移</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveDown(this)">下移</button></div><div class="clear"></div></div></div>';
    }

    add() {
        $('#edit-area').append(this.content);
        element.init('collapse');
    }

    formate(__val){
        let strUtil = new ChcUtils.StringUtil();

        let arr=[];
        __val = strUtil.strReplace(__val, '·', '▪');
        __val = strUtil.strReplace(__val, '•', '▪');
        arr = __val.split('\n');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == "") continue;
            let temp = "<p class='p'><strong>" + arr[i] + "</strong></p>";
            arr[i] = temp;
        }
        let str = arr.join("");
        return str;
    }
}