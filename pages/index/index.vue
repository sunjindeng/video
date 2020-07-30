<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view> -->
			<!-- <image src="http://js.cliyun.cn/static/image/wife/wife.jpg" mode="widthFix" class='image'> -->
			<image src="http://js.cliyun.cn/static/image/wife/wife1.jpg" mode="widthFix" class="image">
			<image src="../../static/parrot3.jpg" mode="widthFix" class='image'>
			<image src="../../static/yang.jpg" mode="widthFix" class="image">
			
		</view>
	</view>
	<!-- <view><image class="image" src="../../static/wife.jpg" mode="widthFix" ></view> -->
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.image{
		text-align: center;
		margin-top: 20px;
	}
</style>
