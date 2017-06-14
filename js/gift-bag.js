//如果没有用户id直接登录，将被返回到主页面
/*if(!localStorage["dfxtl_uid"]){
    location.href="index.html"
}
if(sessionStorage["check_sign"]!="yes"){
    location.href="index.html"
}*/


$("section").css("height",$(document).height());
$.ajax({
    type:"post",
    cache:false,
    url:"http://139.224.199.100:891/api/Account/GetVerifyByUserID",
    data:{"id":localStorage["dfxtl_uid"]},
    success:function(msg){
        //用户提交的id返回正确的券种
        if(msg.status===1){
            var tic=msg.data.verifyList;
            var str="<h1>我的礼包</h1>";
            for(var i=0;i<tic.length;i++){
            str+=`<div class="ticket">
                <div>
                <h2>${tic[i].name}</h2>
                <p>${tic[i].explain}</p>
                </div>
                <h3>${tic[i].code}</h3>
                <p>使用日期：${tic[i].period}</p>
                </div>`
            }
            $(".page5-body").html(str);
            $("#hx-name").html(msg.data.user_name);
            $("#hx-phone").html(msg.data.user_phone);
            $("#hx-site").html(msg.data.verifySite
            );
        }
        //用户提交的id未查找到券，可能ID有误，返回留资页面，生成新的id
        if(msg.status===0){
            alert("用户信息已过期，请重新填写资料领取");
            localStorage.removeItem('dfxtl_uid');
            location.href="leave-message.html";
        }
    }
});
var urlArray=location.href.split("?");
console.log(urlArray[1])
if(urlArray[1]){
    $("#page5-hint1").css("display","block");
}
$("#page5-hint1-close").click(function(){
    $("#page5-hint1").css("display","none");
});
$("#page5-hint1-share").click(function(){
    $("#page5-hint1").css("display","none");
    $("#cover-notice").css("display","block");
});
$("#cover-notice").click(function(){
    $(this).css("display","none");
});
