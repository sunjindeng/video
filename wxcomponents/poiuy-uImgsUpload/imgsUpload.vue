<template>
<uni-shadow-root class="poiuy-uImgsUpload-imgsUpload"><view class="w-100">
	<view class="w-100 flex_wrap">
		<view v-for="(v,i) in (imgArray)" :key="v.i" class="imgs-view">
			<image @click="preview" :data-value="v" :data-i="i" :src="v"></image>
			<view class="del-btn" @click="delImg" :data-i="i">
				<image src="delete.png"></image>
			</view>
		</view>
		<view v-if="imgArray.length<imgCount" class="upload-img-view flex_xy_center" @click="upPhoto">
			<image src="jia.png"></image>
		</view>
	</view>
	<view v-if="(!closeTip)" class="tip">* 最多上传{{imgCount}}张图片(<label> {{imgArray.length}} </label>/{{imgCount}})，单张大小为<label>{{imgSize}}</label>M</view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'poiuy-uImgsUpload/imgsUpload'
// components/imgsUpload.js

const app = getApp();

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		imgArr: { //图片数组
			type: [Array],
		},
		uploadImgCount: { //一次上传图片数
			type: String,
			value: '3'
		},
		imgCount: { //可上传图片总数
			type: String,
			value: '3'
		},
		imgSize: { //图片大小
			type: Number,
			value: 2
		},
		closeTip: {
			type: Boolean,
			value: false
		}
		//暂时无法得到类型/后续有空加入
		// imgType: {
		// 	type: [Array],
		// 	value:['jpeg', 'png', 'jpg']
		// }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		imgArray: [],
		canUpCount:'',
	},
	attached: function() {
		this.data.imgArray = this.properties.imgArr;
		this.data.canUpCount = Number(this.data.uploadImgCount);
		
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		upPhoto() {
			let that = this;
			if (Number(that.properties.imgCount - that.data.imgArray.length) < Number(that.properties.uploadImgCount)) {
				that.data.canUpCount = Number(that.properties.imgCount - that.data.imgArray.length);
			}
			wx.showActionSheet({
				itemList: ['拍照上传', '从相册中选择'],
				success: function(res) {
					if (res.tapIndex == 0) {
						wx.chooseImage({
							count: Number(that.data.canUpCount),
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['camera'], //从相册选择
							success: function(res) {
								if (res) {
									if (res.tempFiles instanceof Array && res.tempFiles) {
										for (let item of res.tempFiles) {
											if (item.size > (that.data.imgSize * 1024 * 1024)) {
												wx.showToast({
													title: `图片不能大于${that.imgSize}M`,
													icon: 'none'
												})
												return false;
											}
											//暂时无法得到类型/后续有空加入
											// let r = that.data.imgType.some(v => {
											// 	let type = item.type.split('/');
											// 	if (type.length)
											// 		return (v === type[1]);
											// });
											// if (!r) {
											// 	wx.showToast({
											// 		title: `只允许上传${that.imgType}的类型`,
											// 		icon: 'none'
											// 	})
											// 	return false;
											// }
										}
									}
									that.data.imgArray = [...that.data.imgArray, ...res.tempFilePaths];
									that.setData({
										imgArray: that.data.imgArray
									})
								}
							}
						});
					} else if (res.tapIndex == 1) {
						wx.chooseImage({
							count: Number(that.data.canUpCount),
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: function(res) {
								if (res) {
									if (res.tempFiles instanceof Array && res.tempFiles) {
										for (let item of res.tempFiles) {
											if (item.size > (that.data.imgSize * 1024 * 1024)) {
												wx.showToast({
													title: `图片不能大于${that.data.imgSize}M`,
													icon: 'none'
												})
												return false;
											}
											//暂时无法得到类型/后续有空加入
											// let r = that.data.imgType.some(v => {
											// 	let type = item.type.split('/');
											// 	if (type.length)
											// 		return (v === type[1]);
											// });
											// if (!r) {
											// 	wx.showToast({
											// 		title: `只允许上传${that.imgType}的类型`,
											// 		icon: 'none'
											// 	})
											// 	return false;
											// }
										}
									}
									that.data.imgArray = [...that.data.imgArray, ...res.tempFilePaths];
									that.setData({
										imgArray: that.data.imgArray
									})
								}
							}
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		preview(e) {
			// 预览图片
			wx.previewImage({
				urls: [e.currentTarget.dataset.value]
			});
		},
		delImg(e) {
			const _this = this;
			wx.showModal({
				title: '提示',
				content: '是否删除这张照片？',
				success: function(res) {
					if (res.confirm) {
						_this.data.imgArray.splice(e.currentTarget.dataset.i, 1);
						_this.setData({
							imgArray: _this.data.imgArray
						})
					} else if (res.cancel) {}
				}
			});
		},


		 upload(callback) {
			const _this = this;
			if (_this.data.imgArray instanceof Array &&_this.data.imgArray.length) {
				let successNum = 0;
				let urlArr = [];
				for (let item of _this.data.imgArray) {
					 _this.uploadImg(item, res => {
						if (res.code == 0) {
							successNum++;
							urlArr.push(res.url);
						} else {
							urlArr.push(res);
						}
						if (urlArr.length == _this.data.imgArray.length) {
							callback(_this.result(urlArr, successNum));
						}
					});
				}
			}else{
				callback({
					result:'warning',
					code:400,
					msg:'请先上传图片！'
				});
			}
		},

		result(urlArr, successNum) {
			let result = {
				result:'success',
				code:0,
				urlArray: urlArr,
				success: successNum
			}
			return result;
		},

		uploadImg(item, callback) {
			const _this = this;
			wx.uploadFile({
				url: app.siteInfo.siteroot + '/dalang/dalang/upload/addImage', //自行修改各自的对应的接口
				filePath: item,
				name: 'file',
				success: (uploadFileRes) => {
					if (uploadFileRes) {
						let res = JSON.parse(uploadFileRes.data);
						callback(res);
					}
				}
			});
		}
	}
})
export default global['__wxComponents']['poiuy-uImgsUpload/imgsUpload']
</script>
<style platform="mp-weixin">
/* components/imgsUpload.css */


	.w-100{
		width: 100%;
	}
	
	.flex {
		/* 转为弹性盒模型*/
		display: flex;
	}
	
	.flex_bet {
		/* 两端左右*/
		display: flex;
		justify-content: space-between;
	}
	
	.flex_xy_center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.flex_wrap {
		/* 转为弹性盒模型并自动换行*/
		display: flex;
		flex-wrap: wrap;
	}
	
	.upload-img-view {
		height: 200rpx;
		width: 32%;
		border-radius: 10rpx;
		border: 4rpx dotted #e1e1e1;
		/* background-color: #F1F1F1; */
	}

	.upload-img-view>image {
		width: 70rpx;
		height: 70rpx;
	}

	.imgs-view {
		height: 200rpx;
		width: 31.5%;
		border-radius: 10rpx;
		margin-right: 1.8%;
		margin-bottom: 16rpx;
		border: 1rpx solid #e1e1e1;
		box-sizing: border-box;
		position: relative;
	}

	.imgs-view>image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.tip {
		font-size: 24rpx;
		color: #FF0000;
		margin-top: 12rpx;
	}

	.tip>label {
		color: #009100;
	}

	.del-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 32rpx;
		height: 32rpx;
		z-index: 999;
	}

	.del-btn>image {
		width: 100%;
		height: 100%;
		display: flex;
	}
</style>