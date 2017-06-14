shareInit();
function shareInit() {
        $.ajax({
            url: "/jssdk/getConfig",
            type: "POST",
            data: {
                "appId": "wxa0d59d5a3705a608",
                "url": location.href.split('#')[0]
            },
            dataType: "json",
            success: function (result) {
 
                if (result && result.success) {
                    wx.config({
                        debug: false,
                        appId: result.data.appId, // 必填，公众号的唯一标识
                        timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.data.noncestr, // 必填，生成签名的随机串
                        signature: result.data.signature, // 必填，签名，见附录1
                        jsApiList: [
                        'onMenuShareTimeline','onMenuShareAppMessage',
						'onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                } else {
                    window.location.reload();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    }
	
	var sharePic = 'http://bk.dongfeng-citroenclub.com.cn/static/mobile/campaign1/share.jpg';
	var shareTitle = '东风雪铁龙夏季送清凉，惊喜好礼清爽一夏';
	
	wx.ready(function(){    
	wx.onMenuShareTimeline({
		title: shareTitle, // 分享标题
		link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: sharePic, // 分享图标
		success: function () {
				
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	wx.onMenuShareAppMessage({
		title: shareTitle, // 分享标题
		desc: shareTitle, // 分享描述
		link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: sharePic, // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareQQ({
		title: shareTitle, // 分享标题
		desc: shareTitle, // 分享描述
		link: location.href, // 分享链接
		imgUrl: sharePic, // 分享图标
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
		   // 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareWeibo({
		title: shareTitle, // 分享标题
		desc: shareTitle, // 分享描述
		link: location.href, // 分享链接
		imgUrl: sharePic, // 分享图标
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareQZone({
		title: shareTitle, // 分享标题
		desc: shareTitle, // 分享描述
		link: location.href, // 分享链接
		imgUrl: sharePic, // 分享图标
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
});

wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});