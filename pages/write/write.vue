<template>
	<view>
		{{title}}
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				title:'我是写作'
			}
		},
		onLoad() {
			loginRes = this.checklogin('../write/write',2)
			if(!loginRes){
				return false;
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
