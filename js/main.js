sessionStorage["check_sign"]="yes";
$("section").css("height",$(document).height());
$(".page-content").css("height",$(document).height());
var globalPara=0;
function slidePage(){
    var pageH= $(".page-content").height();
    musPlay.init();
    var para=0;
    $('.page-box').swipe({//滑动事件
        swipe:function(event, direction) {
            if (direction=="up") {
                para++;
                para=para>=2?2:para;
                $(this).animate({
                    top:-pageH*para
                },400);
                slideCallback(para)
            }
            if (direction=="down") {
                para--;
                para=para<=0?0:para;
                $(this).animate({
                    top:-pageH*para
                },400);
                slideCallback(para)
            }
        },
        threshold:1

    })
}
function slideCallback(num){
    if(num==2){
        if(globalPara===0) {
            $("#hint1").css("display", "block");
            globalPara=1
        }
        $("#arrow").css("display","none")
    }else{
        $("#arrow").css("display","block")
    };
    if(num==0){
        $("#page1>img:last-child").addClass("animate2");
    }else{
        $("#page1>img:last-child").removeClass("animate2");
    }
    if(num==1){
        $("#page2>.page2-inf").addClass("animate3");
    }else{
        $("#page2>.page2-inf").removeClass("animate3");
    }
}
$(document).ready(slidePage);

//活动说明
$(".bottom-btn p:first-child").click(function(){
    $("#hint1").css("display","block")
});
$("#hint1>img").click(function(){
    $("#hint1").css("display","none")
});
//我的礼包
$(".bottom-btn p:last-child").click(function(){
    if(localStorage["dfxtl_uid"]){
        location.href="gift-bag.html"
    }else{
        $("#hint6").css("display","block")
        $("#hint6>img").click(function(){
            $("#hint6").css("display","none")
        })
    }
});
//游戏说明
$(".end_land img:last-child").click(function(){
    $("#hint8").css("display","block")
    $("#hint8>img").click(function(){
        $("#hint8").css("display","none")
    })
})
window.onload=function(){
    $("#cover").fadeOut(100);
};
//音乐播放暂停
var musPlay={
    status:1,
    deg:0,
    timer:null,
    autoPlay:true,
    init:function(){
        this.timer=setInterval(this.doRotate.bind(this),10);
        document.getElementById("music-box").onclick=function(){
            this.playMus();
            console.log(this.status)
        }.bind(this);

    },
    doRotate:function(){
        this.deg+=1;
        $("#music-box>img").css("transform","rotate("+this.deg+"deg)");
        if(this.deg==360) this.deg=0;
    },
    playMus:function(){
        if(this.status==0){
            document.querySelector("audio").play();
            this.timer=setInterval(this.doRotate.bind(this),10);
            this.status=1
        }else if(this.status==1){
            document.querySelector("audio").pause();
            clearInterval(this.timer);
            this.status=0;
        }
    }
};


