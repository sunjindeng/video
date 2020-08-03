<template>
	<view>
		<view>
			<view>
				<button type="primary" size="mini" @tap="addImg" >选择图片</button>
				<button v-if="uploadStatus == false" type='warn'  size='mini'  plain="uploadStatus" class="uploading-but" @tap="uploadImg">上传</button>
			</view>
			
		</view>
		<view class='content'>
			<scroll-view scroll-top="true" class="scroll-view-image">
				<view>
					<block v-for="(item,index) in imgArr" :key="index" >
						<view class="image-arr" @tap="removeImg" :data-index="index" >
							<image :src="item.content" mode="aspectFill"></image>
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
				artContent:[],
				uploadType:true,
				needUploadImgs:[]
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
						uni.previewImage({
							urls:res.tempFilePaths,
							longPressActions:{
								itemList:['发送给朋友','保存图片','收藏']
							}
						})
						var imageArr = res.tempFilePaths;
						if(res.tempFilePaths.length > 0){
							_self.uploadStatus = false
						}
						for(var key in imageArr){
							_self.imgArr.push({'content':imageArr[key]})
						}
						
				    },
				})
			},	
			uploadImg:()=>{
				console.log(_self.imgArr.length);
				if(_self.imgArr.length > 5){
					uni.showToast({
						title:'最多上传5张哦',
						duration:2000,
						image:'../../static/img.png'
					})
				}else{
					uni.showLoading({
						'title':'正在上传中···'
					})
					 //缺少  每张图片是否上传成功的判断
					for(var i = 0; i< _self.imgArr.length;i++){
						console.log(_self.imgArr[i]);
						//_self.needUploadImgs.push({'tmpUrl':_self.imgArr[i]['content'],'imgIndex':i})
						uni.uploadFile({
							url:_self.apiServer+'/Image/upload',
							filePath: _self.imgArr[i]['content'],
							name:'images',
							formData:{
								userId : uni.getStorageSync('SUID')
							},
							success(uploadImgRes) {
								uploadImgRes = JSON.parse(uploadImgRes.data);
								console.log(uploadImgRes)
								/* if(uploadImgRes.code == 'ok'){
									_self.needUploadImgs.push({'id':i})
								} */
							}
						})
					}
					setTimeout(function () {
						uni.switchTab({
							url:"../my/my"
						})}, 1500);
				}
			},
			removeImg: (e)=>{
				 console.log(e);
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					content:'确定删除该图吗？',
					title:'提示',
					success(res){
						if(res.confirm){
							_self.imgArr.splice(index, 1);
						}
					}
				})
				
			},
						
		}
	}
</script>

<style>
.image-arr{
	text-align: center;
}
.uploading-but{
	margin-left: 440rpx;
}
.icon-images{
	width: 50rpx;
	height: 40rpx;
	padding: 20rpx;
	color: #e38a42;
	
}
.content{
	height: 600rpx;
	background-color: #fffae8;
}
/* .scroll-view-image{
	height: 600rpx;
} */
</style>
