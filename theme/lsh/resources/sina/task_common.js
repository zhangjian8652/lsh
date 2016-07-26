// view
$(function() {
    // tab
    $('.tab_tit span').each(function(n) {
        $(this).click(function() {
            $(this).addClass('on').siblings().removeClass('on');
            $('.tab_con:eq(' + n + ')').addClass('show').show().siblings(".tab_con").removeClass('show').hide();
            onresize(n,"tab2");
            $('#tab_index').val(n);
        });
    });
    

    $('.tab_tit3 span').each(function(n) {
        $(this).click(function() {
            $(this).addClass('on').siblings().removeClass('on');
            $('.tab_con3:eq(' + n + ')').addClass('show').show().siblings(".tab_con3").removeClass('show').hide();
            onresize(n,"tab1");
        });
    });
    $('.tab_tit4 span').each(function(n) {
        $(this).click(function() {
            $(this).addClass('on').siblings().removeClass('on');
            $('.tab_con4:eq(' + n + ')').addClass('show').show().siblings(".tab_con4").removeClass('show').hide();
            onresize(n,"tab1");
        });
    });
});
//
function onresize(n,id){
    var aWidth = $("#"+id+" span").width()+1;
    $("#"+id+" .topborder").stop(true, false).animate({left: aWidth*n},{easing: 'easeOutBack',duration: 200});
}
// 倒计时
function ShowCountDown(end_time, divname, nub, n, f) {
	
    var now = new Date();
    if (f = parseInt(f)) {
    	now.setTime(now.getTime() + f);
    }
    var leftTime = end_time - now.getTime();

    
    if (leftTime > 0) {
        var leftsecond = parseInt(leftTime / 1000);
        var day = day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = hour1 = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = minute1 =  Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = second1 =  Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        if(day<10){
            day1 = '0'+day;
        }
        if(hour<10){
            hour1 = '0'+hour;
        }
        if(minute<10){
            minute1 = '0'+minute;
        }
        if(second<10){
            second1 = '0'+second;
        }
        switch(nub){
            case 1:
				var mtime  = day1 + "<em> 天 </em>" + hour1 + "<em> 时 </em><br/>" + minute1 + "<em> 分 </em>" + second1 + "<em> 秒</em>";        
				$(divname).prev('p').html(mtime);
				break;
            case 0:
				var mtime  = day1 + "<em> 天 </em>" + hour1 + "<em> 时 </em>" + minute1 + "<em> 分 </em>" + second1 + "<em> 秒</em>";        
				$(divname).find('span').html(mtime);
				break;
            case 2:
				var mtime  = day1 + "<em> 天 </em>" + hour1 + "<em> 时 </em>" + minute1 + "<em> 分 </em>" + second1 + "<em> 秒</em>";        
				$(divname).html(mtime);
				break;
            case 3:
				var mtime  = day1 + "<em> 天 </em>" + hour1 + "<em> 时 </em><br/>" + minute1 + "<em> 分 </em>" + second1 + "<em> 秒</em>";        
				$(divname).find('span').html(mtime);
				break;
            case 4:
            	var mtime = "<i>" + day1 + " </i>天<i> " + hour1 + " </i>时<i> " + minute1 + " </i>分<i> " + second1 + " </i>秒";       
				$(divname).html(mtime);
				break;
            case 5:
                var mtime = '';
                if (day) mtime += day1 + " 天 ";
                if (hour) mtime += hour1 + " 时 ";
                if (minute) mtime += minute1 + " 分 ";
                mtime += second1 + " 秒";
                
				$(divname).html(mtime);
				break;
        }
    }else{
        switch(nub){
            case 1:
				clearInterval(n);
				$.ajax({
					type: "POST",
					dataType: "json",
					url: "/task/release",
					data: {'task_id':n},
					success: function(res){
						location.reload();
					}
				});
				break;
            case 5:
                $(divname).html('00 秒');
                break;
            default:
				clearInterval(n);
				break;
        }
    }
}
