

var getWeixinOpenid='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0d59d5a3705a608&redirect_uri=https://mycitroen.dpca.com.cn/weixin/transfer/transferStation.do?param={"appID":"wxa0d59d5a3705a608","appsecret":"e75d5f11345b4f1f66b91fa319eaa079","url":"http://bk.dongfeng-citroenclub.com.cn/static/mobile/campaign1/leave-message.html"}&response_type=code&scope=snsapi_base&state=1#wechat_redirect';

    function gameInit(){
        var date1=new Date();
        /*if(!localStorage["firstTime"]){
			localStorage["game_num"]=0;
            localStorage["firstTime"]=date1.getDate();
        }
        if(localStorage["firstTime"]!=date1.getDate()){
            localStorage["game_num"]=0;
            localStorage["firstTime"]=date1.getDate();
        }*/
        //找到所有的浮桥
        var nodeList=document.querySelectorAll("#draw_map>div");
        //找到浮桥的爹
        var parNode=document.querySelector("#draw_map");
        //清除爹下的所有浮桥
        for(var i=0;i<nodeList.length;i++){
            parNode.removeChild(nodeList[i]);
            nodeList[i]=null;
        }
        var totalW=$("#draw_map").width();//游戏界面总宽度
        var totalH=$("#draw_map").height();//游戏界面总高度
        var numX=4;   //横向可以容纳的浮桥数量
        var numY=7;    //纵向可以容纳的浮桥数量
        var w=totalW/numX;//一个浮桥的宽,
        var h=totalH/numY;   //一个浮桥的高度
        var second=30;      //每移动一步花的时间
        var speed=2;        //每一步的步长
        var totalSecond=second*w/speed*3;//实例化浮桥间隔时间
        var timer=[];//盛放定时器的数组
        //------------------
        var car=document.getElementById("car");//小车
        var up=document.getElementById("up");   //上移
        var down=document.getElementById("down");//下移
        var car_step=0;//小车移动的步数，起步0 最下依次 1 2 3 4 5 6 7
        var car_timer;//小车定时器
        //小车的状态初始化
            car.className="car_show";
            car.style.left="40%";
            car.style.top="0";
        //浮桥构造函数
        //添加前进键跳动
        //$("#up").addClass("animate1")
        $("#start").addClass("animate1");
        var bridge=function(left,floor,speed,edge){
            this.edge=edge;    //方向
            this.speed=speed*this.edge;
            this.left=left*w;    //元素left值
            this.bottom=h*floor;     //元素top值
            this.newEle=document.createElement("div");
            this.num=parseInt(Math.random()*50-25)
            this.newEle.style.width=w+this.num+"px";
            this.newEle.style.height=h+"px";
            this.newEle.style.left=this.left+"px";
            this.newEle.style.bottom=this.bottom+"px";
            this.newEle.className="c"+floor;
            document.getElementById("draw_map").appendChild(this.newEle);
            this.timer=setInterval(function(){
                this.left+=this.speed;
                this.newEle.style.left=this.left+"px";
                if(this.edge==1){
                    if(this.left>totalW){
                        clearInterval(this.timer);
                        isFather(document.getElementById("draw_map"),this.newEle)
                         &&document.getElementById("draw_map").removeChild(this.newEle);
                        this.newEle=null;
                    }
                }else{
                    if(this.left<-w){
                        clearInterval(this.timer);
                        isFather(document.getElementById("draw_map"),this.newEle)&&
                        this.newEle && document.getElementById("draw_map").removeChild(this.newEle);
                        this.newEle=null;
                        //console.log("清除反向定时器")
                    }
                }
            }.bind(this),second);
        };
        //判断父子是不是父子
        function isFather(p, c2){
            var c = c2;
            while(c.parentNode){
                c = c.parentNode;
                if(c == p)
                    return true;
            }
            return false;
        };
        function gameStart(){
           /* //停止前进键跳动
            //$("#up").removeClass("animate1");
            var game_num=localStorage["game_num"];
                game_num++;
            localStorage["game_num"]=game_num;
            if(localStorage["game_num"]>5){
                $("#start").removeClass("animate1");
                $("#hint9").css("display","block");
                $("#hint9-sure").click(function(){
                    $("#hint9").css("display","none");
                });
                $("#hint9-share").click(function(){
                    $("#hint9").css("display","none");
                    $("#cover-notice").css("display","block");
                });
                $("#cover-notice").click(function(){
                    $(this).css("display","none");
                });
                return;
            }*/
            $("#start").removeClass("animate1");
            document.getElementById("start").onclick=null;
            var rm1=Math.random()+0.2;
            var b1=new bridge(-(1+rm1),0,speed,1);
            var rm2=Math.random()+0.2;
            var b2=new bridge(numX+rm2,1,speed,-1);
            var rm3=Math.random()+0.2;
            var b3=new bridge(-(1+rm3),2,speed,1);
            var rm4=Math.random()+0.2;
            var b4=new bridge(numX+rm4,3,speed,-1);
            var rm5=Math.random()+0.2;
            var b5=new bridge(-(1+rm5),4,speed,1);
            var rm6=Math.random()+0.2;
            var b6=new bridge(numX+rm6,5,speed,-1);
            var rm7=Math.random()+0.2;
            var b7=new bridge(-(1+rm7),6,speed,1);
            var rm8=Math.random()+0.2;
            var b8=new bridge(numX+rm8,7,speed,-1);
            timer[timer.length]=setInterval(function(){
               var rm=Math.random()+0.2;
               var b1=new bridge(-(1+rm),0,speed,1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(numX+rm,1,speed,-1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.3;
               var b1=new bridge(-(1+rm),2,speed,1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(numX+rm,3,speed,-1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(-(1+rm),4,speed,1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(numX+rm,5,speed,-1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(-(1+rm),6,speed,1);
           },totalSecond);
            timer[timer.length]=setInterval(function(){
                var rm=Math.random()+0.2;
               var b1=new bridge(numX+rm,7,speed,-1);
           },totalSecond);
            //------------------------------------------------

        //点击小车上移
       up.onclick=function(){
           clearInterval(car_timer);
           car_step++;//步数加1
           if(car_step<=numY){
               car.style.top=-car_step*h+"px";
               if(check(car_step-1)==true){
                   if(car_step%2!=0){
                        move(1)
                    }else{
                       move(-1)
                   }
               }else{
                   gameOver()
               }
            }else{
                car.style.top=-car_step*h+"px";
                gameSuccess();
            }
        };
        }
        //点击小车下移
        down.onclick=function(){
            clearInterval(car_timer);
            car_step--;
            car.style.top= -car_step * h + "px";
            if (car_step > 0) {
                if(check(car_step-1)==true){
                    if (car_step != 0 && car_step % 2 == 0) {
                        move(-1)
                    } else if (car_step != 0) {
                        move(1)
                    }
                }else{
                    gameOver()
                }
            }else{
                car_step =0;
                car.style.top = -car_step * h + "px";
            }

        };
      //小车的移动
        function move(edge){
            //safari的getcomputedStyle属性把不能解释百分比
            //var car_left=parseInt(getComputedStyle(car).left);
            var car_left= parseInt($("#car").css("left"));
            car_timer=setInterval(function(){
                car_left+=speed*edge;
                if(car_left<1){
                    car_left=0;
                    if(check(car_step-1)==false){
                        gameOver()
                    }
                }
                if(car_left>totalW-parseInt(getComputedStyle(car).width)+1){
                    car_left=totalW-parseInt(getComputedStyle(car).width);
                    if(check(car_step-1)==false){
                        gameOver()
                    }
                }
                car.style.left=car_left+"px"
            },second)
        };
        //验证小车是否在桥上
        function check(num) {
            if (car_step > 0 && car_step < numY+1) {
                var brg = document.querySelectorAll(".c" + num);
                var brg=$(".c" + num);
                for (var i = 0; i < brg.length; i++) {
                    var leftB = parseInt(brg[i].style.left);
                    var rightB = parseInt(brg[i].style.left) +parseInt(brg[i].style.width);
                   /* var car_left = parseInt(getComputedStyle(car).left);
                    var car_width = parseInt(getComputedStyle(car).width);*/
                    var car_left = parseInt($("#car").css("left"));
                    var car_width = parseInt($("#car").css("width"));
                    var car_right = car_left + car_width;
                    if (leftB < car_left && rightB > car_right) {
                        return true;
                    }
                }
                clearInterval(car_timer);
                return false;
            }
        };
        //游戏失败
       function gameOver(){
            for(var i=0;i<timer.length;i++){
                clearInterval(timer[i])
            }
           up.onclick=null;
           down.onclick=null;
           car.className="car_hidden";

           if(localStorage["dfxtl_uid"]){
               $("#hint5").css("display","block");
               $("#hint5>img").click(function(){
                   $("#hint5").css("display","none");
                   gameInit();
                   //document.getElementById("up").onclick=gameInit();
                   document.getElementById("start").onclick=gameInit();
               });
           }else{
               $("#hint4").css("display","block");
               $("#hint4>img").click(function(){
                   $("#hint4").css("display","none");
                   gameInit();
                   //document.getElementById("up").onclick=gameInit();
                   document.getElementById("start").onclick=gameInit();
               });
           }
       }
        //通关成功
       function gameSuccess(){
           up.onclick=null;
           down.onclick=null;
           localStorage["game_succ"]="succ";
           for(var i=0;i<timer.length;i++){
               clearInterval(timer[i])
           }
           if(localStorage["dfxtl_uid"]){
               $("#hint3").css("display","block")
               $("#hint3>img").click(function(){
                   $("#hint3").css("display","none");
                   gameInit()
                   //document.getElementById("up").onclick=gameInit();
                   document.getElementById("start").onclick=gameInit();
               })
           }else{
               $("#hint2").css("display","block");

               $("#hint2>img").click(function(){
                  /* var targetTime=(new Date("2017-06-10 23:59:59")).getTime();
                   var currentTime=(new Date()).getTime();
                   if(currentTime>=targetTime){
                       alert("夏季活动已经结束，新活动即将上线，敬请期待。");
                       $("#hint2").css("display","none");
                       return;
                   }*/
                    if(isWeiXin()){
                       //location.href="openid.php";
                       location.href=getWeixinOpenid;
                    }else{
                        location.href="leave-message.html";
                    }
                  /* $("#hint2").css("display","none");
                   gameInit()
                   document.getElementById("up").onclick=gameInit();*/
               })
           }
       }
        return gameStart;
    };
    //document.getElementById("up").onclick=gameInit();
    document.getElementById("start").onclick=gameInit();
    //判断设备是不是微信
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }