<template>
	<view>
		<view>
			<button type="primary" size="mini" @tap="addImg" >选择图片</button>
			<button type="primary"  plain="uploadStatus"></button>
		</view>
		<view>
			<scroll-view scroll-top="true">
				<view>
					<block v-for="(item,index) in imgArr" :key="index" >
						<view class="image-arr" :data-index="index">
							<image :src="item.content" mode="widthFix"></image>
						</view>
						
					</block>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
	
</template>
		
<script>
	var _self ;
	export default {
		data() {
			return {
				imgArr:[],
				uploadStatus:true,
				artContent:[]
			}
		},
		onLoad() {
			_self = this;
			var loginRes = this.checklogin('../image/image',2);
			if(!loginRes){
				return false;
			}
			
		},
		methods: {
			addImg: ()=>{
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						console.log(res.tempFilePaths)
						var imageArr = res.tempFilePaths;
						if(res.tempFilePaths.length > 0){
							_self.uploadStatus = false
						}
						for(var key in imageArr){
							_self.imgArr.push({'content':imageArr[key]});
						}
						console.log(_self.uploadStatus)
						console.log(_self.imgArr)
						
				    }
				});
			},			
						
		}
	}
</script>

<style>
.image-arr{
	text-align: center;
}
</style>
