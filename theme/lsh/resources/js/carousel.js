/**
 * Created by zhangjian on 2016/6/27.
 */


function Carousel(id, sizePerPage) {
    var seconds = 1;
    var interval = null;

    //计算出容器的宽度，以及容器中的滚动区域宽度
    function caculateContentWidth(id) {
        return $(id).width();
    }

    //计算总数tag标签宽度
    function caculateTotalTagWidth(pageCount, contentWidth) {
        return pageCount * contentWidth;
    }

    //每个标签的宽度
    function caculateEachTagWidth(contentWidth, size) {
        return contentWidth / size;
    }


    //计算滚动页总页数
    function caculatePageCount(totalCount, eachCount) {
        var more = totalCount%eachCount;
        if( more== 0){
            return (totalCount / eachCount);
        }
        return (totalCount - more) / eachCount + 1;

    }

    //计算出总共的标签条数，就是有多少个li
    function caculateTagCount(id) {
        var count = $(id).find(".content ul li").size();
        return count;
    }

    var i = 0;

    //设置timer定时滚动页面
    function rollingTimer($element, seconds, endIndex, startWidth, totalWidth) {
        var startWidth = startWidth;
        var interval = setInterval(function () {
/*            console.log("index :" + i);
            console.log("endIndex :" + endIndex);*/
            if (i == endIndex) {
                $element.animate({"right": 0}, seconds * 1000);
                //$element.css("right",0);
                i = 0;
            }
            $element.animate({"right": startWidth * i}, seconds * 1000);

            $(id).find(".hd ul li").removeClass("on").eq(i).addClass("on");

            i++;
        }, seconds * 1000 * 3);

        return interval;
    }


    function addHdLi(count) {
        var hdul = $(id).find(".hd ul");
        for (var i = 0; i < count; i++) {
            hdul.append("<li>" + (i + 1) + "</li>");
        }

    }


    //开始进行滚动
    this.start = function () {

        var tagCount = caculateTagCount(id);
        var contentWidth = caculateContentWidth(id);
        var eachTagWidth = caculateEachTagWidth(contentWidth, sizePerPage);
        var endIndex = caculatePageCount(tagCount, sizePerPage);
        var totalTagWidth = caculateTotalTagWidth(endIndex, contentWidth);

/*        console.log("tagCount:" + tagCount);
        console.log("contentWidth:" + contentWidth);
        console.log("totalTagWidth:" + totalTagWidth);
        console.log("eachTagWidth:" + eachTagWidth);
        console.log("endIndex:" + endIndex);*/

        $(id).css("width", contentWidth).css("overflow", "hidden");
        $(id).find(".content").css("width", totalTagWidth).css("position", "relative");
        $(id).find(".content ul li").css("width", eachTagWidth).css("float", "left");
        $(id).find(".hd").css("width", contentWidth).attr("align", "center");

        var $content = $(id).find(".content");

        var interval = rollingTimer($content, seconds, endIndex, contentWidth, totalTagWidth);


        addHdLi(endIndex);

        var $hdlis = $(id).find(".hd ul li");
        $hdlis.eq(0).addClass("on");
        $hdlis.hover(function() {

                clearInterval(interval);

                i = Number($(this).text()) - 1;
                $hdlis.removeClass("on");
                $hdlis.eq(i).addClass("on");

                $content.animate({"right": contentWidth * i}, seconds * 1000);

                interval = rollingTimer($content, seconds, endIndex, contentWidth, totalTagWidth);

            }
        );

    }


}
