<!-- 1. 图文广告模块 -->
<template>
  <div class="carousel-box">
    <!-- 轮播图 -->
    <div v-if="property.layout === 'swiper'" :style="boxStyle">
      <van-swipe class="my-Carousel" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, i) in imageList"
          :key="i"
          :style="itemStyle"
          @click="jumpLink(item.link)"
        >
          <van-image
            :style="imgStyle"
            :radius="radius"
            fit="fill"
            :src="item.imageUrl ? item.imageUrl : defaultImg"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 单张图片 一行一个 不轮播 -->
    <div v-else class="single" :style="boxStyle">
      <div
        v-for="(item, i) in imageList"
        :key="i"
        class="img-box"
        :style="i < imageList.length - 1 ? itemStyle : ''"
        @click="jumpLink(item.link)"
      >
        <van-image
          :style="imgStyle"
          :radius="radius"
          :src="item.imageUrl ? item.imageUrl : defaultImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "../assets/swipe-default.png" // 默认图片(容错)
import JumpLink from "@/mixin/jumpLink" // 跳转

export default {
  name: "Carousel",
  mixins: [JumpLink],
  props: {
    // 接收外部传入的配置对象
    property: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isDisplay: true,
      radius: 0,
      imageList: [], // 图片列表
      imgStyle: {},
      itemStyle: {},
      boxStyle: {},
      defaultImg, // 默认图片
    }
  },
  watch: {
    property: {
      handler: function (val, oldVal) {
        console.log("this.property val", val)
        if (val) {
          this.imageList = this.property.imageList
          this.setMyStyle()
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.isDisplay = this.property.isDisplay
  },
  methods: {
    // 获取样式
    // 两种轮播模式、边距、圆角、背景颜色
    setMyStyle() {
      let padding = "0"
      let height = "100%"
      this.radius = this.property.isBorderRadius ? this.property.radius : 0
      if (this.property.isDefaultMargin) {
        // marginSize 第一项上下边距 第二项左右边距
        padding =
          `${this.property.marginSize[0]}px ${this.property.marginSize[1]}px` +
          ""
      }
      this.imgStyle = {
        height,
        verticalAlign: "top",
      }
      this.boxStyle = {
        padding,
        backgroundColor: this.property.backgroundColor,
      }
      // layout 组件布局方式
      this.itemStyle =
        this.property.layout === "swiper"
          ? {
              backgroundColor: this.property.backgroundColor,
            }
          : {
              backgroundColor: this.property.backgroundColor,
              marginBottom:
                (this.property.isDefaultMargin && this.property.imageMargin
                  ? this.property.imageMargin
                  : 0) + "px",
            }
    },
  },
}
</script>

<style scoped>
.carousel-box {
  width: 100%;
}
.my-Carousel {
  overflow: hidden;
  transform: translateY(0);
}
.my-Carousel .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  text-align: center;
}
/* .img-box{
  height: 150px;
} */
</style>
