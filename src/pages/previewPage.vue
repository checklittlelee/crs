<!-- 预览页面 与 在cms manage编辑详情页里看到的是不一样的，详情中可以拖拽通信，在预览中，是纯静态的渲染 -->
<template>
  <div id="wrap" class="wrap">
    <div class="main" :style="pageStyle">
      <div v-for="element in pageData.componentList" :key="element.id">
        <component
          :is="element.data.component"
          :property="element.data"
          :style="styleObject(element)"
        />
      </div>
    </div>
    <!-- 领取券包弹出框 -->
    <Coupon />
    <!-- 领取单券弹出框 -->
    <CouponSingle />
  </div>
</template>

<script>
import Coupon from "@/components/Coupon"
import CouponSingle from "@/components/CouponSingle"
import { getH5PageJson } from "@/apis/preview"
import UserInfo from "@/utils/getUserInfo"
import vehicle from "@/utils/vehicle"
import VConsole from "vconsole"

import Carousel from "@/components/Carousel"
import Dialog from "@/components/Dialog"
import imgc from "@/components/imgc"
import AssistLine from "@/components/AssistLine"
import FloatLayer from "@/components/FloatLayer"
import OnlineService from "@/components/OnlineService"
import Slider from "@/components/Slider"
import CubeSelection from "@/components/cubeSelection"
import ImageNav from "@/components/image-nav"
import product from "@/components/product"
import Notice from "@/components/notice"
import RichText from "@/components/richText"
var wx = require("weixin-js-sdk")

// 开发环境添加console插件
if (process.env.NODE_ENV !== "production") {
  const vConsole = new VConsole()
}

export default {
  name: "Page",
  components: {
    Coupon,
    CouponSingle,
    Carousel,
    Dialog,
    imgc,
    AssistLine,
    FloatLayer,
    OnlineService,
    Slider,
    CubeSelection,
    ImageNav,
    product,
    Notice,
    RichText,
  },
  data() {
    return {
      pageData: {},
    }
  },
  computed: {
    pageStyle() {
      return {
        backgroundColor: this.pageData.backgroundColor,
        backgroundImage: `url(${this.pageData.backgroundImage})`,
        backgroundPosition: `center ${this.pageData.backgroundPosition}`,
      }
    },
  },
  mounted() {
    // 获取页面id
    const id = this.$route.query.id
    // 获取小程序传递的数据
    let data = this.$route.query.data
    if (data) {
      data = JSON.parse(data)
      console.log("H5活动页面加载，传入参数为", data)
      UserInfo.SetLocalUserLoginStatus(data.isLogin)
      UserInfo.SetToken(data.token)
      UserInfo.SetCanToLoginStatus(true)
      UserInfo.SetPositionAddress(data.PositionAddress)
      UserInfo.SetCurrentAddress(data.CurrentAddress)
      UserInfo.setOpenid(data.openId)
      UserInfo.setUserid(data.userId)
      vehicle._saveCarToLocal(data.myCar)
    }
    // 获取页面数据
    getH5PageJson({ id }).then((res) => {
      document.title = res.data.name // 小程序中web-view显示页面名称
      this.pageData = res.data
      // 如果有自定义分享参数，则将分享参数传递到h5
      const { shareDesc, shareImage } = res.data
      if (shareDesc || shareImage) {
        const data = {
          shareDesc,
          shareImage,
        }
        wx.miniProgram.postMessage({ data })
      }
    })
  },
  methods: {
    styleObject(item) {
      return {
        color: item.textColor,
        borderRadius: item.radius + "px",
        marginTop: item.marginTop + "px",
      }
    },
  },
}
</script>

<style scoped>
.wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.main {
  position: relative;
  width: 375px;
}
.wrap .mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>
