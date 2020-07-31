<template>
	<view class="me">
		<view class="face">
			<image :src="uface" mode="widthFix"></image>
		</view>
		<view class="my-info">
			<view class="item">
				<view>{{uname}}</view>
				<view>名称</view>
			</view>
			<view class="item">
				<view>{{userInfo.integral}}</view>
				<view>照片</view>
			</view>
			<view class="item last-item">
				<view>{{userInfo.remainder}}</view>
				<view>视频</view>
			</view>
		</view>
	</view> 
	
</template>

<script>
	var sign = require('../../common/sign.js');
	var _self , uface;
	export default {
		data() {
			return {
				uface:'',
				userInfo:{integral:"2",remainder:"5"},
				arts:[],
				getMore:'点击加载更多',
				uname:''
			}
		},
		onLoad() {
			_self = this;
			var loginRes = this.checklogin('../my/my',2);
		    _self.uface = loginRes[3];
			_self.uname = loginRes[2];
			sign.sign(this.apiServer)
		},
		methods: {
			
		}
	}
</script>

<style>
.me{
		padding:30rpx;
	}
	.face{
		width:100%;
		text-align: center;
		padding: 50rpx;
		box-sizing: border-box;
		}
	.face image{
		width:80px;
		border-radius: 50%;
		border:4rpx solid #e86e59;
	}
	.my-info{
		display: flex;
	}
	.item{
		flex: 1;
		text-align: center;
		border-right: 1px solid #CCCCCC;
		color:#333;
	}
	.last-item{
		border: none; 
	}
	.my-article{
		margin-top:50rpx;
	}
	.my-title{
		font-size:32rpx;
		font-weight: bold;
		margin-bottom:20rpx;
	}
	.artcle-item{
		display: flex;
		color:#666;
		font-size:26rpx;
		padding:20rpx 0;
		border-bottom: 1px dashed #ccc;
	}
	.artcle-item .title{
		flex: 1;
	}
	.del-btn{
		color: red;
		padding-right:10rpx;
	}
	.edit-btn{
		color: green;
	}
	.get-more{
		text-align: center;
		color: #ccc;
		font-size:26rpx;
		margin-top: 30rpx;
	}
</style>
