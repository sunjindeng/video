

插件安装
	
图片上传组件 将组件放在自己的组件库里导入即可

**注意 
1.组件加入后一定要去修改自己的上传路径！  
2.自己的上传接口的返回值注意修改 我这边是0！
**
	
#### 导入：  
> 小程序.json 文件里 
```
"usingComponents": {
	"imgUpload":"/component/imgUpload/imgUpload"
  },

```

-------------------------------------   

#### 属性 attribute

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| imgArr         | Array  | 图片展示列表      | \[\]             |
| uploadImgCount | Number | 一次可选多少张图片   | 3                |
| imgCount       | Number | 一共可以上传多少张图片 | 3                |
| imgSize        | Number | 上传图片的大小     | 2 \(M\)          |
| closeTip        | Boolean  | 关闭小提示    | false |

------------------------------------- 

#### 方法 method

>开始上传图片 在父页面中调用该方法
> *注意* 一定要给组件 **id** 如下（示范代码）

-------------------------------------

####示范代码
*wxml*:
```
<imgUpload id="imgUpload" imgArr="{{imgArr}}"></imgUpload>
<button bindtap="submit"></button>
```

*js*：

```
submit(){

	const imgUpload = this.selectComponent("#imgUpload");
	imgUpload.upload(res=>{
		if(res.code==0){
				// 正常的返回code=0 将回调的线上图片数组 赋值给需要提交的表单里
				// res.urlArray 线上路径图片数组
				//TODO
				
		}else{
			//没有上传图片的返回 code=400
		}
	})

}

```

 
	



	