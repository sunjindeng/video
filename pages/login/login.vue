<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	var sign = require('../../common/sign.js');
	var _self, _options, openid, session_key;
	export default {
		data() {
			return {
				
			}
		},
						
		onLoad(options) {
			sign.sign(this.apiServer)
			 _self = this;
			 _options = options;
			console.log(_options)
			//#ifdef MP-WEIXIN
				uni.login({
					success(res) {
						console.log(res); //res.code---openid
						uni.request({
							url:_self.apiServer+'/login/getOpenId',
							data: {
								code: res.code
							},
							success: function (infoRes) {
								console.log(infoRes.data.openid)
								openid = infoRes.data.openid;
								session_key = infoRes.data.session_key;
								console.log(_options)
		
							}
						})
					}
				})
			//#endif
			// #ifdef APP-PLUS
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					 //获取加密信息
					 uni.getUserInfo({
					      provider: 'weixin',
						  //获取用户信息
					      success: function (infoRes) {
							  uni.request({
							      url: _self.apiServer+'/login/index', //仅为示例，并非真实接口地址。
							      data: {
							          openId: infoRes.userInfo.openId,
									  nickName: infoRes.userInfo.nickName,
									  avatarUrl: infoRes.userInfo.avatarUrl,
							      }, 
								  method:'POST',
							      header: {'content-type' : "application/x-www-form-urlencoded"},
							      success: (res) => {
									  if(res.data.code='ok'){
										  uni.showToast({title:"登录成功"});
										  uni.setStorageSync('SUID', res.data.data.id);
										  uni.setStorageSync('SRAND', res.data.data.random);
										  uni.setStorageSync('SNAME', res.data.data.uname);
										  uni.setStorageSync('SFACE', res.data.data.face);
										  
										  //登录后跳转
											if(_options.backtype == 1){
											  uni.redirectTo({
												url:_options.backpage
											  });
											}else{ 
											  uni.switchTab({
												url:_options.backpage
											  });
											}
										}else{
											uni.showToast({
												title:res.data
											})
										}
							      }
							  });
					      }
					    });
				  },
				  fail:()=> {
				  	uni.showToast({
				  		title:"微信登录授权失败！",
						icon:"none"
				  	})
				  }
				});
			// #endif
			
			
		},
		methods: {
			getUserInfo:(userInfo)=>{
				var _userInfo = userInfo.detail.userInfo;
				console.log(_userInfo)
				console.log(openid)
				console.log(_options)
				uni.request({
					url: 'https://www.cliyun.cn/index.php/login/index', //仅为示例，并非真实接口地址。
					data: {
					    openId: openid,
						nickName: _userInfo.nickName,
						avatarUrl: _userInfo.avatarUrl,
					}, 
					method:'POST',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					success: (res) => {
						if(res.data.code == 'ok'){
							uni.showToast({title:"登录成功"});
							uni.setStorageSync('SUID',res.data.data.id);
							uni.setStorageSync('SNAME',res.data.data.uname);
							uni.setStorageSync('SRAND',res.data.data.random);
							uni.setStorageSync('SFACE',res.data.data.face);
							console.log(res.data)
							
							if(_options.backtype == 1){
								uni.redirectTo({
									url:_options.backpage,
								})
							}else{
								uni.switchTab({
									url:_options.backpage,
								})
							}
						}else{
							uni.showToast({
								title:res.data.data,
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
