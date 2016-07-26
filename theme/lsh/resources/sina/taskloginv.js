var uid = 0;
var cookie = '';
$(document).ready(function() {
	check_login_status();
});


var user_info = {
};
function user_info_handle () {
	
	if (user_info.shop ) {
		user_info.info = {};
		user_info.info.nickname = '';
		user_info.info.pic = '';
		user_info.info.pic_160_160 = '';
		user_info.info.pic_30_30 = '';
		user_info.info.credit = user_info.shop.credit;
		user_info.info.gender = 1;
		user_info.info.coin = user_info.shop.coin;
		
		user_info.info.nickname = user_info.shop.nickname;
		user_info.info.gender = user_info.shop.gender;
		
		user_info.info.pic = user_info.shop.pic;
		user_info.info.pic_160_160 = user_info.shop.pic;
		user_info.info.pic_30_30 = user_info.shop.pic;
		
		$('#userinfo_icon').attr('src', user_info.info.pic_30_30);
		$('#userinfo_name').html(user_info.info.nickname);
		$('#user_coin').html(user_info.info.coin);
		
		
		$('#user_credit').html(user_info.info.credit);
		
		if (typeof user_info_handle_func == 'function') {
			user_info_handle_func();
		}
	} 
}
//var user_info_handle_func = function() {
//}

jQuery.fn.shake = function(intShakes /* Amount of shakes */,
		intDistance /* Shake distance */, intDuration /* Time duration */) {
	this.each(function() {
		var jqNode = $(this);
		jqNode.css({
			position : "absolute"
		});
		for ( var x = 1; x <= intShakes; x++) {
			jqNode.animate({
				left : (intDistance * -1)
			}, (((intDuration / intShakes) / 4))).animate({
				left : intDistance
			}, ((intDuration / intShakes) / 2)).animate({
				left : 0
			}, (((intDuration / intShakes) / 4)));
		}
	});
	return this;
}


function check_login_status() {
	cookie = sinaSSOController.getSinaCookie(true);
	if (cookie) {
		uid = cookie.uid;
		if (cookie != null && typeof cookie.uid != "undefined"
				&& cookie.uid != "") {
			$.ajax({
				type : "POST",
				url : base_url + "login/save/" + Math.random() ,
				data : "Nickname=" + cookie.user + "&Email=" + cookie.email
						+ "&Password=" + cookie.uid,
				dataType : 'json',
				success : function(d) {
					user_info.shop = d;
					
					user_info_handle();
					
				}
			});
		}
	}
}

