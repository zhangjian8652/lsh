/**
 * Created by zhangjian on 2016/6/27.
 */


function Carousel(id,sizePerPage) {
    var seconds = 5;
    var interval = null;

    //计算出容器的宽度，以及容器中的滚动区域宽度
    function caculateContentWidth(id) {
        return $(id).width();
    }

    //计算总数tag标签宽度
    function caculateTotalTagWidth(id,eachTagWidth) {
        return caculateTagCount(id)*eachTagWidth;
    }

    //每个标签的宽度
    function caculateEachTagWidth(contentWidth,size) {
        return contentWidth/size;
    }


    //计算滚动页总页数
    function caculatePageCount(totalCount,eachCount) {
        return (totalCount/eachCount);
    }

    //计算出总共的标签条数，就是有多少个li
    function caculateTagCount(id) {
        var count = $(id).find(".content ul li").size();
        return count;
    }

    function rollingTimer($element,seconds,endIndex,startWidth,totalWidth) {
        var startWidth = startWidth;
        var startIndex = 1;
        var i = 0;
        this.interval =  setInterval(function () {
            console.log("index :" + i);
            console.log("endIndex :" + endIndex);
            if(i == endIndex){
                // $element.animate({"right":0},seconds*1000);
                $element.css("right",0);
                i = 0;
            }
            $element.animate({"right":startWidth * i},seconds*1000);
            i++;
        },seconds*1000*2);

    }

    //开始进行滚动
    this.start = function () {

        var tagCount = caculateTagCount(id);
        var contentWidth = caculateContentWidth(id);
        var eachTagWidth = caculateEachTagWidth(contentWidth,sizePerPage);
        var totalTagWidth = caculateTotalTagWidth(id,eachTagWidth);
        var endIndex = caculatePageCount(tagCount,sizePerPage);

        console.log("tagCount:" + tagCount);
        console.log("contentWidth:" + contentWidth);
        console.log("totalTagWidth:" + totalTagWidth);
        console.log("eachTagWidth:" + eachTagWidth);
        console.log("endIndex:" + endIndex);

        $(id).css("width",contentWidth).css("overflow","hidden");
        $(id).find(".content").css("width",totalTagWidth).css("position","relative");
        $(id).find("ul li").css("width",eachTagWidth).css("float","left");
        rollingTimer($(id).find(".content"),2,endIndex,contentWidth,totalTagWidth);

    }



}

n