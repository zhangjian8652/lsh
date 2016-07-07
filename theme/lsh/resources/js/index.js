// JavaScript Document

//专题网站
$(function(){$('#pane1').jScrollPane();});

//活动预告
$(function(){$('#pane2').jScrollPane();});

//tab标签切换
$(document).ready(function(){   
	$(".info_nav li:first").addClass("current");   
	$(".info_content dl:not(:first)").hide();   
	$(".info_nav li").click(function(){   
		$(".info_nav li").removeClass("current");   
		$(".info_nav #activity").removeClass("findcurrent"); 
		$(this).addClass("current");   
		$(".info_content dl").hide();  
		$("."+$(this).attr("id")).fadeIn("slow");   
	});  
	$("#activity").click(function(){   
		$(".info_nav li").removeClass("current");   
		$(this).addClass("findcurrent"); 
	});  
});   

$(document).ready(function(){   
	$(".media_nav li:first").addClass("current");   
	$(".media_content dl:not(:first)").hide();   
	$(".media_nav li").click(function(){   
		$(".media_nav li").removeClass("current");   
		$(this).addClass("current");   
		$(".media_content dl").hide();  
		$("."+$(this).attr("id")).fadeIn("slow");   
	});  
});   
//新闻稿和项目故事
jQuery(".autoPage").slide({ titCell:".hd ul", mainCell:".bd ul",effect:"left",vis:4,scroll:4,autoPlay:true,autoPage:true});
//图片切换
function DY_scroll(wraper,prev,next,img,speed,or)
{ 
  var wraper = $(wraper);
  var prev = $(prev);
  var next = $(next);
  var img = $(img).find('ul');
  var w = img.find('li').outerWidth(true)*1;
  var s = speed;
  next.click(function()
       {
        img.animate({'margin-left':-w},function()
                  {
                   img.find('li').eq(0).appendTo(img);
                   img.css({'margin-left':0});
                   });
        });
  prev.click(function()
       {
        img.find('li:last').prependTo(img);
        img.css({'margin-left':-w});
        img.animate({'margin-left':0});
        });
  if (or == true)
  {
   ad = setInterval(function() { next.click();},s*7000);
   wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*7000);});

  }
}
DY_scroll('.mediaphoto','.prev','.next','.shipin',1,false);// true为自动播放，不加此参数或false就默认不自
DY_scroll('.mediaphoto','.prev','.next','.tupian',1,false);// true为自动播放，不加此参数或false就默认不自

//右侧分享条
  var position = function(){
      var isIE6 = !-[1,] && !window.XMLHttpRequest,
          html = document.getElementsByTagName('html')[0],
          dd = document.documentElement,
          db = document.body,
          dom = dd || db,
          // 获取滚动条位置
          getScroll = function(win){
              return {
                  left: Math.max(dd.scrollLeft, db.scrollLeft),
                  top: Math.max(dd.scrollTop, db.scrollTop)
                  };
          };
      // 给IE6 fixed 提供一个"不抖动的环境"
      // 只需要 html 与 body 标签其一使用背景静止定位即可让IE6下滚动条拖动元素也不会抖动
      // 注意：IE6如果 body 已经设置了背景图像静止定位后还给 html 标签设置会让 body 设置的背景静止(fixed)失效
      if (isIE6 && document.body.currentStyle.backgroundAttachment !== 'fixed') {
          html.style.backgroundImage = 'url(about:blank)';
          html.style.backgroundAttachment = 'fixed';
      };
      return {
          fixed: isIE6 ? function(elem){
              var style = elem.style,
                  doc = getScroll(),
                  dom = '(document.documentElement || document.body)',
                  left = parseInt(style.left) - doc.left,
                  top = parseInt(style.top) - doc.top;
              this.absolute(elem);
              style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
              style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
          } : function(elem){
              elem.style.position = 'fixed';
          },
          absolute: isIE6 ? function(elem){
              var style = elem.style;
              style.position = 'absolute';
              style.removeExpression('left');
              style.removeExpression('top');
          } : function(elem){
          elem.style.position = 'absolute';
          }
      };
  }();


/*  var elem = document.getElementById('fixed');
  elem.style.right = '0px';
  elem.style.top = '150px';
  position.fixed(elem);*/

//控制字体大小
$(function () { 
    $(".size").click(function () {
        $("body").css("font-size", $(this).attr('title')); 
		$(".size").css("text-decoration", "none");
		$(this).css("text-decoration", "underline");
        return false; 
    });
}); 


$(document).ready(function(){   
	$(".site1 li:first a").css("margin-left", "0px");
	$(".site1 li:last a").css("background", "none");
	$(".ul1 li:first").css("border-top", "none");
});

