<template>
  <!-- <div v-if="property.runEnv === 'prod'"> -->
    <div class="float-layer"
      ref="float-container"
      :style="{
        width: `${property.width}px`,
        position: 'fixed',
        bottom: '100px',
        zIndex: 11,
        right: '24px',
        minHeight: '56px',
        cursor: 'poniter',
      }"
      >
      <div
      >
        <van-image
          class="img-container"
          ref="floatImg"
          :style="{
            position:'fixed',
            bottom: '100px',
            zIndex: 11,
            cursor: 'poniter',
          }"
          :width="property.width"
          :src="property.imageUrl ? property.imageUrl: defaultImg"
          @click="jumpLink(property.link)"
        />
      </div>
    </div>
</template>
<script>
import defaultImg from '../../assets/block-img.png'
import JumpLink from '@/mixin/jumpLink'
export default {
  name: 'FloatLayer',
  mixins: [JumpLink],
  data() {
    return {
      defaultImg,
    }
  },
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    'property.imageUrl'() {
      this.setImgHeight()
    },
    'property.width'() {
      this.setImgHeight()
    }
  },
  methods: {
    setImgHeight(){
      setTimeout(() => {
        const imgHeight = document.querySelector('.img-container')
          ? document.querySelector('.img-container').clientHeight
          : ''
        if (imgHeight) {
          this.$refs['float-container'].style.height  = `${imgHeight}px`
        }
      })    
    },
    scrollHandler() {
      let fl = document.querySelector('.img-container')
      fl.className = 'img-container van-image hide'
      setTimeout(() =>  { fl.className = 'img-container van-image show' }, 1000)
    },
  },
  mounted() {
    this.setImgHeight()
    if (this.property.hideByPageScroll && !document.querySelector('.draggable')) {
      window.addEventListener('scroll', () => {
        this.scrollHandler()
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
<style scoped>
.show {
  right: 24px;
  transition-duration: .5s;  

}

.hide {
  transition-duration: .5s;  
  right: -54px;
}
</style>
