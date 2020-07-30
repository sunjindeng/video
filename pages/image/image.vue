<template>
	<!-- <view class='content'>
			<image src="../../static/wife.jpg" mode="widthFix" class='image'>
			<image src="../../static/wife1.jpg" mode="widthFix" class='image'>
			<image src="../../static/parrot1.jpg" mode="widthFix" class='image'>
			<image src="../../static/parrot2.jpg" mode="widthFix" class='image'>
			<image src="../../static/parrot3.jpg" mode="widthFix" class='image'>
			<image src="../../static/yang.jpg" mode="widthFix" class="image">
	</view> -->
	<view class="laugh">
			<button type="primary" @click="getImg">请选择图片</button>
			<!-- <uni-list>
			    <uni-list-item v-for="(item, index) in imgArr" :key='index'>
					<image :src="item" :mode="scaleToFill"></image>
				</uni-list-item>
			</uni-list> -->
		</view>
</template>
		
<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.checklogin('../image/image',2)
		},
		methods: {
			getImg () {
							var that = this
							uni.chooseImage({
							    count: 6,           // 最多可以选择的图片张数，默认9
							    sizeType: ['original', 'compressed'],              //original 原图，compressed 压缩图，默认二者都有
							    sourceType: ['album', 'camera'],             //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
							    success: function (res) {
							        console.log(JSON.stringify(res));
									that.imgArr = res.tempFilePaths
									uni.previewImage({
									            urls: res.tempFilePaths,
									            longPressActions: {
									                itemList: ['发送给朋友', '保存图片', '收藏'],
									                success: function(data) {
									                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
									                },
									                fail: function(err) {
									                    console.log(err.errMsg);
									                }
									            }
									        });
							    },
								
							});
						},
		}
	}
</script>

<style>
.image{
	text-align: center;
	margin-top: 20px;
}
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
