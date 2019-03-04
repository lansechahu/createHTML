/*
加链接组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class Link {
    constructor() {

    }

    addLink(obj) {
        let strUtil = new ChcUtils.StringUtil();

        let thisArea = obj.thisArea;
        let start = obj.start;
        let end = obj.end;

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
}