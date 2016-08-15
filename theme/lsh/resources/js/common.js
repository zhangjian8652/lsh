/**
 * Created by Joker on 2016/8/13.
 */




$(function () {
    $(".eepau-input").focus(function () {
        $(this).parent().addClass("success").removeClass("normal");
    });
    $(".eepau-input").blur(function () {
        $(this).parent().removeClass("success").addClass("normal");
    });

    $(".modal .close-btn").click(function () {
        $(".modal").hide();
        $(".modal-cover").hide();
    });

    $("input[name='password']").focus(function () {
        $(this).attr('type',"password");
    });

    /**
     * 注册验证代码块
     */


    $(".code-img").click(function(){
        $(this).attr("src","/management/verifycode.backend?a=" + new Date());
    });



    $("#register-form").validate({
        debug: true, //调试模式取消submit的默认提交功能
        //errorClass: "label.error", //默认为错误的样式类为：error
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        //onkeyup: true,
        errorPlacement:function(error, element){
            element.parent().addClass("error");
            error.appendTo(element.parent().parent());
        },
        success:function (label) {
            label.parent().find("div").removeClass("error");
        },
        rules:{
            loginId:{
                required:true,
                mobileCN:true
            },
//            mobile:{
//                required:true,
//                mobileCN:true
            //           },
            password:{
                required:true,
                rangelength:[6,16]
            },
            passwordConfirm:{
                required:true,
                equalTo:"#register-password"
            },
            code:{
                required:true,
                remote:{
                    url: "/management/verifycode/valid.backend",     //后台处理程序
                    type: "GET",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        verifyCode: function () {
                            return $("#code").val();
                        }
                    }
                }
            }
        },
        messages:{
            loginId:{
                required:"用户名必须填写。",
                rangelength:"用户名长度必须为{0}到{1}。"
            },
            mobile:{
                required:"手机号必须填写。",
                mobileCN:"手机号格式不正确。"
            },
            password:{
                required:"密码必须填写。",
                rangelength:"密码长度必须为{0}到{1}。"
            },
            passwordConfirm:{
                required:"确认密码必须填写。",
                equalTo:"与密码不一致。"
            },
            code:{
                remote:"验证码不正确。",
                required:"验证码必须填写"
            }
        },
        submitHandler:function(form){
            var uri = "/frontend/register"
            var params = $(form).serialize();

            uri += "?" + params
            $.post(uri,null, function (result) {

                try {
                    var jsonData = JSON.parse(result);
                    if(jsonData.code == "-1000")
                        alert("注册失败，请稍后再试!");

                } catch (e) {
                    alert("注册成功!");
                    var loginId = $("#register-form input[name='loginId']").val();
                    var password = $("#register-form input[name='password']").val();
                    var uri = "/frontend/authorization"
                    $.post(uri, {loginId: loginId, password: password}, function (result) {
                        try {
                            var jsonData = JSON.parse(result);
                            if (jsonData.code == 1000) {
                                location.href = "/";
                            } else {
                                alert("用户名或者密码不正确，请重新输入。");
                            }
                        } catch (e) {
                            alert("用户名或者密码不正确，请重新输入。");
                        }
                    });

                }

            });
        }
    });


    /**
     * 登陆验证代码块
     */

    $("#login-form").validate({
        debug: true, //调试模式取消submit的默认提交功能
        //errorClass: "label.error", //默认为错误的样式类为：error
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        //onkeyup: true,
        errorPlacement:function(error, element){
            element.parent().addClass("error");
            error.appendTo(element.parent().parent());
        },
        success:function (label) {
            label.parent().find("div").removeClass("error");
        },
        rules:{
            loginId:{
                required:true,
                rangelength:[6,16]
            },
            password:{
                required:true,
                rangelength:[6,16]
            }
        },
        messages:{
            loginId:{
                required:"用户名必须填写。",
                rangelength:"用户名长度必须为{0}到{1}。"
            },
            password:{
                required:"密码必须填写。",
                rangelength:"密码长度必须为{0}到{1}。"
            }
        },
        submitHandler:function(form){
            var uri = "/frontend/authorization"
            var params = $(form).serialize();

            uri += "?" + params
            $.post(uri,null, function (result) {
                try {
                    var jsonData = JSON.parse(result);
                    if (jsonData.code == 1000) {
                        location.href = "/";
                    } else {
                        alert("用户名或者密码不正确，请重新登陆。");
                    }
                } catch (e) {
                    alert("用户名或者密码不正确，请重新登陆。");
                }

            });
        }
    });

    $("#login-submit").click(function () {
        $("#login-form").submit();
    });
    $("#register-submit").click(function () {
        $("#register-form").submit();
    });
});

function showLogin() {
    $(".modal-cover").show();
    $("#login-modal").show();
}

function showRegister() {
    $(".modal-cover").show();
    $("#register-modal").show();
}


								
								