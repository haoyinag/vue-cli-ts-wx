/** 库 */
import Vue from "vue";
import VConsole from "vconsole";
import { Component } from "vue-property-decorator";

import "./ts-test";

/** 本地状态器 */
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vant from "./vant";
import "./assets/iconfont/icon.css";
import "./assets/iconfont/iconfont.js";

/** 处理器--有这个才可以在组件内使用路由守卫功能 */
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate",
]);

/** 挂载 */
vant.map((comonent: any) => {
  return Vue.use(comonent);
});
Vue.config.productionTip = false;
// Vue.prototype.$Toast = Toast;
/** 开启移动端调试 */
const isVconsole = false;
const isDev = process.env.NODE_ENV === "development";
if (isVconsole && isDev) {
  new VConsole();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
