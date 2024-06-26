import Vue from "vue"
import App from "@/App"
import store from "@/store"
import router from "@/router"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import Vant from "vant" // 移动端 Vue 组件库
import "vant/lib/index.css"
import less from "less"
import "./utils/rem"

Vue.use(ElementUI)
Vue.use(Vant)
Vue.use(less)
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
})
