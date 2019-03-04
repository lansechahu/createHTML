/*
粗体段落组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";


export default class Title {
    constructor() {
        this.content = '<div class="area-box layui-colla-item"><div class="layui-colla-title">标题:</div><div class="layui-colla-content layui-show"><textarea class="txt-area" placeholder="标题"></textarea><div class="btnBox layui-btn-group"><button class="delBtn layui-btn layui-btn-normal" onclick="delItem(this)">删除</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveUp(this)">上移</button><button class="moveBtn layui-btn layui-btn-normal" onclick="moveDown(this)">下移</button></div><div class="clear"></div></div></div>';
    }

    add() {
        $('#edit-area').append(this.content);
        element.init('collapse');
    }

    formate(__val) {
        let strUtil = new ChcUtils.StringUtil();
        return strUtil.strReplace(__val, '•', '·');
    }
}