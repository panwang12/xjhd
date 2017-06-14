if(localStorage["game_succ"]!="succ"){
    location.href="index.html"
}
$("section").css("height",$(document).height());

//获得所有省，市，网点
/*$.ajax({
    type:"get",
    url:"http://139.224.199.100:891/api/Account/GetAllSiteInfo",
    success:function(msg){
        var obj={};
        for(var i=0;i<msg.data.length;i++){
            var pro=obj[msg.data[i].province]={};
            for(var j=0;j<msg.data[i].cityList.length;j++){
                var ct=pro[msg.data[i].cityList[j].city]=[];
                for(var k=0;k<msg.data[i].cityList[j].siteList.length;k++){
                    ct[k]=msg.data[i].cityList[j].siteList[k]
                }
            }
        };
        //省份
        var pro="<option>省份</option>"
        for(var m in obj){
            pro+=`<option>${m}</option>`
        }
        $("#province").html(pro);
        //城市
        $("#province").change(function(){
            var cty="<option>城市</option>"
            for(var n in obj[$("#province").val()]){
                cty+=`<option>${n}</option>`
            }
            $("#city").html(cty);
        })
        //网点
        $("#city").change(function(){
            var site="<option value='0'>网点</option>";
            var sites=obj[$("#province").val()][$("#city").val()];
            for(var v=0;v<sites.length;v++){
                var arr=sites[v].split(",");
                var key=arr[0];
                var val=arr[1];
                site+=`<option value="${key}">${val}</option>`
            }
            $("#website").html(site);
        })
    }
});*/
$.ajax({
    url:"http://139.224.199.100:891/api/Account/getprovince",
    type:"get",
    success:function(obj){
        var str="<option>省份</option>";
        for(var i=0;i<obj.data.length;i++){
            str+="<option>"+obj.data[i]+"</option>";
        }
        $("#province").html(str)
    },
    error:function(){
        console.log("错误")
    }
});
$("#province").change(function(){
    var pro=$(this).val();
    $.ajax({
        url:"http://139.224.199.100:891/api/Account/getcity/?province="+pro,
        type:"get",
        success:function(obj){
            var str="<option>城市</option>";
            for(var i=0;i<obj.data.length;i++){
                str+="<option>"+obj.data[i]+"</option>";
            }
            $("#city").html(str)
        }

    });
});
$("#city").change(function(){
    var city=$(this).val();
    $.ajax({
        url:"http://139.224.199.100:891/api/Account/getstore/?city="+city,
        type:"get",
        success:function(obj){
            console.log(obj);
            var str="<option value='0'>网点</option>";
            for(var i=0;i<obj.data.length;i++){
                var arr=obj.data[i].split(",");
                var key=arr[0];
                var val=arr[1];
                str+="<option value="+key+">"+val+"</option>"
            }
            $("#website").html(str)
        }
    });
});
//页面加载进来判断是否是认证车主
$.ajax({
    url:"http://139.224.199.100:891/api/Account/VerifyUerInfo",
    type:"post",
    data:{openid:getUrlParam("openid")},
    success:function(obj){
        if(obj.status==="1"){
            $("#userName").val(obj.data.name);
            $("#userPhone").val(obj.data.phone);
            $("#vinCode").val(obj.data.vincode);
        }
    }
});
//点击提交信息
document.getElementById("sub-msg").onclick=subMsg;
function subMsg(){
    var str=$("#get-message").serialize();
    //获得option的值，现在不需要
   /* var w=encodeURI($("#website").find("option:selected").text());
    var data=str+"&site_name="+w;*/
    var data=str+"&openid="+getUrlParam("openid");//获得openid的值
    console.log(data);
    if(checkUserName()&&checkPhone()&&checkVinCode()&&checkCarAge()&&checkProvince()&&checkCity()&&checkWebsite()){
        document.getElementById("sub-msg").onclick=null;
        $.ajax({
            type:"post",
            url:"http://139.224.199.100:891/api/Account/AddUser",
            data:data,
            success:function(msg){
                if(msg.status===1){
                    localStorage["dfxtl_uid"]=msg.data.user_id;
                    $("#hint9").css("display","block");
                    $("#hint9>img").click(function(){
                        $("#hint9").css("display","none");
                        location.href="gift-bag.html?isOnce=yes";
                    })
                }
                if(msg.status===0){
                    if(msg.msg==null){
                        localStorage["dfxtl_uid"]=msg.data;
                        $("#hint10").css("display","block");
                        $("#hint10>img").click(function(){
                            $("#hint10").css("display","none");
                            location.href="gift-bag.html?isOnce=yes";
                            document.getElementById("sub-msg").onclick=subMsg;
                        });

                    }else{
                        alert(msg.msg);
                        document.getElementById("sub-msg").onclick=subMsg;
                    }
                }
            },
            error:function(){
                alert("信息提交失败 请重新提交");
                document.getElementById("sub-msg").onclick=subMsg;
            }
        })
    }
}
//验证用户名
function checkUserName(){
    var val=$("#userName").val();
    if(val==""){
        alert("用户名不能为空");
        return false;
    }
    return true;
}
//验证电话
function checkPhone(){
    var val=$("#userPhone").val();
    var reg=/^1[3,5,7,8]\d{9}$/;
    if(val==""|| !reg.test(val)){
        alert("手机号码格式不正确");
        return false;
    }
    return true;
}
//验证车型
function checkVinCode(){
    var val=$("#vinCode").val();
    var reg=/^[L,l][D,d][C,c][0-9a-zA-Z]{14}$/;
    if(val==""|| !reg.test(val)){
        alert("vin码不正确");
        return false;
    }
    return true;
}

//验证车龄
function checkCarAge(){
    var val=$("#carAge").val();
    if(val=="请选择车龄"){
        alert("未选择车龄");
        return false;
    }
    return true;
}

//验证省份
function checkProvince(){
    var val=$("#province").val();
    if(val=="省份"){
        alert("未选择省份");
        return false;
    }
    return true;
}
//验证城市
function checkCity(){
    var val=$("#city").val();
    if(val=="城市"){
        alert("未选择城市");
        return false;
    }
    return true;
}
function checkWebsite(){
    var val=$("#website").val();
    if(val=="0"){
        alert("未选择网点");
        return false;
    }
    return true;
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return ""; //返回参数值
};

