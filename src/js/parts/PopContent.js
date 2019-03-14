/*
弹点组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class PopContent {
    constructor() {
        this.content = '<div class="area-box layui-colla-item"><div class="layui-colla-title">弹点:</div><div class="layui-colla-content layui-show"><textarea class="txt-area" placeholder="弹点内容"></textarea><div class="btnBox layui-btn-group"><button class="delBtn layui-btn layui-btn-normal" onclick="delItem(this)">删除</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveUp(this)">上移</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveDown(this)">下移</button></div><div class="clear"></div></div></div>';
    }

    add() {
        $('#edit-area').append(this.content);
        element.init('collapse');
    }

    formate(__val) {
        let strUtil = new ChcUtils.StringUtil();

        let arr = [];
        __val = strUtil.trim(__val, 4);
        /*__val = strUtil.strReplace(__val, '·', '▪');
        __val = strUtil.strReplace(__val, '•', '▪');*/
        arr = __val.split('\n');
        for (let i = 0; i < arr.length; i++) {
            //arr[i] = strUtil.strReplace(arr[i], '·', '▪');
            arr[i] = strUtil.strReplace(arr[i], '•\t', ''); //清除制表符

            arr[i] = strUtil.strReplace(arr[i], '·', '▪');
            arr[i] = strUtil.strReplace(arr[i], '•', '▪');

            let temp = "<p>·<strong>" + arr[i] + "</strong></p>";
            arr[i] = temp;

        }
        let str = arr.join("") + "";

        return str;
    }
}