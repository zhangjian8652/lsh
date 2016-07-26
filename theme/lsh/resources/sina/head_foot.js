// 轮播图
$(function() {
    var index = 0;
    var imgWidth = $('.pics_switch li').width(); //单张图片宽度
    var len = $('.pics_switch li').length; //图片数
    var totalImgWidth = imgWidth * len; //图片序列宽度\
    var clientsWidth = (len+1)*35
    $('.pics_switch_clients ul').css('width', clientsWidth);


    //左右翻页按钮滑过透明度
    $('.ps_box .pics_switch .viewArrows').css({
        'opacity': 0.6
    });
    $('.ps_box .pics_switch .viewArrows').hover(function() {
        $(this).fadeTo(200, 0.8);
    }, function() {
        $(this).fadeTo(200, 0.6);
    });

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $('.ps_box .pics_switch_clients ul span').css("opacity", 0.6).mouseover(function() {
        index = $('.ps_box .pics_switch_clients ul span').index(this);
        showPics(index);
    }).eq(0).trigger("mouseover");

    //上一页按钮
    $(".ps_box .va_prev").click(function() {
        index -= 1;
        if (index == -1) {
            index = len - 1;
        }
        showPics(index);
    });

    //下一页按钮
    $(".ps_box .va_next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        showPics(index);
    });

    $('.ps_box .pb').css({
        'width': totalImgWidth
    });
    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $('.ps_box').hover(function() {
        clearInterval(picTimer);
    }, function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 4000); //此4000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) {
        var nowLeft = -index * imgWidth; //根据index值计算ul元素的left值
        $('.ps_box .pb').stop(true, false).animate({
            "marginLeft": nowLeft
        }, 1000, 'easeInOutExpo'); //通过animate()调整ul元素滚动到计算出的position
        $('.ps_box .pics_switch_clients ul span').removeClass('hover').stop(true, false).animate({
            "opacity": "0.6"
        }, 600).eq(index).addClass('hover').stop(true, false).animate({
            "opacity": "1"
        }, 600); //为当前的按钮切换到选中的效果
    }

});
//公告
function disMove(){
   /* var dis_height = $("#SG_top_notice li").height();
    var dis_li = $("#SG_top_notice li");
    var dis_wrap= $("#SG_top_notice ul");
    dis_wrap.stop(true, false).animate({marginTop: -dis_height}, 1000,function(){
        dis_li.eq(0).appendTo(dis_wrap);
    }).animate({marginTop: 0},0);
    t=setTimeout("disMove()", 3000);
    $("#SG_top_notice").mouseover(function(event) {
         clearTimeout(t);
    });
    $("#SG_top_notice").mouseleave(function(event) {
       disMove();
    });*/
    t=setInterval("changeMove()", 3000);
    $("#SG_top_notice").mouseover(function(event) {
         clearInterval(t);
    });
    $("#SG_top_notice").mouseleave(function(event) {
       changeMove();
    });
}
function changeMove(){
    var dis_height = $("#SG_top_notice li").height();
    var dis_li = $("#SG_top_notice li");
    var dis_wrap= $("#SG_top_notice ul");
    dis_wrap.stop(true, false).animate({marginTop: -dis_height}, 1000,function(){
        dis_li.eq(0).appendTo(dis_wrap);
    }).animate({marginTop: 0},0);
}
// 返回顶部
$(window).scroll(function () {
  if( $(window).scrollTop()>199){
    $("#fixedtop").removeClass('off');
  }else{
   $("#fixedtop").addClass('off'); 
  }
});

$(function() {
	//图片延时加载
	$('img[data-src]').live('inview', function(event, isVisible) {
	    if (!isVisible) {
	        return;
	    }
	    var img = $(this);
	    img.css('opacity', 0);
	    img.load(function() {
	        img.animate({
	            opacity: 1
	        }, 500);
	    });
	    img.attr('src', img.attr('data-src'));
	    img.removeAttr('data-src');
	});
});
