import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import './static/iconfont/iconfont.css';
Vue.prototype.checklogin = function(backpage,backtype){
	var SUID = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SNAME == ''){
		uni.navigateTo({
			url : '../login/login?backpage='+backpage+'&backtype='+backtype
		})
		return false;
	}
	return [SUID,SRAND,SNAME,SFACE];
}
Vue.prototype.apiServer = "https://www.cliyun.cn/index.php";
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
