// 8. 图文导航组件
import ImageNav from "./components/image-nav.vue"

ImageNav.install = (Vue) => {
  Vue.install(ImageNav.name, ImageNav)
}

export default ImageNav
