/*
加粗组件
 */

import $ from "jquery";
import * as ChcUtils from "chcutils";

export default class StrongCopy {
    constructor(){

    }

    addStrong(obj){
        let strUtil = new ChcUtils.StringUtil();

        let thisArea = obj.thisArea;
        let start = obj.start;
        let end = obj.end;

        if (thisArea == null) return;

        let initTxt = thisArea.val();
        let s_txt = initTxt.substring(start, end);
        let new_txt = strUtil.del_flg(initTxt, start + 1, (end - start));
        //let insert_txt = "--Strong::" + s_txt + "::Strong--";
        let insert_txt = "<strong>" + s_txt + "</strong>";
        new_txt = strUtil.insert_flg(new_txt, insert_txt, start);
        thisArea.val(new_txt);
    }
}
