(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0431":function(e,t,n){},"34d9":function(e,t,n){"use strict";(function(e,t){n("9f74");var o=c(n("66fd")),r=c(n("7610"));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.config.productionTip=!1,o.default.prototype.checklogin=function(t,n){var o=e.getStorageSync("SUID"),r=e.getStorageSync("SRAND"),c=e.getStorageSync("SNAME"),u=e.getStorageSync("SFACE");return""==o||""==r||""==c?(e.navigateTo({url:"../login/login?backpage="+t+"&backtype="+n}),!1):[o,r,c,u]},r.default.mpType="app";var f=new o.default(a({},r.default));t(f).$mount()}).call(this,n("543d")["default"],n("543d")["createApp"])},"4fb7":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=o},6432:function(e,t,n){"use strict";var o=n("0431"),r=n.n(o);r.a},6778:function(e,t,n){"use strict";n.r(t);var o=n("4fb7"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},7610:function(e,t,n){"use strict";n.r(t);var o=n("6778");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("6432");var c,u,a,i,f=n("f0c5"),l=Object(f["a"])(o["default"],c,u,!1,null,null,null,!1,a,i);t["default"]=l.exports}},[["34d9","common/runtime","common/vendor"]]]);