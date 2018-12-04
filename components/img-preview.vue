<template>
  <div class="img-preview">
    <!--图片列表 预览组件 参照导师秀-->
    <div class="modal" v-if="lists.length" @click.self="$emit('preClose')">
      <div class="swiper-modal-box">
        <div class="swiper-container swiper-container-preview">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide-banner" v-for="(item,index) in lists" :key="index">
                <img class="swiper-img-banner" :src="item" alt="没有？" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination swiper-pagination-preview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  // import 'css/swiper.min.css'
  export default {
    name: "img-preview",
    data() {
      return {
        mySwiper:null
      }
    },
    props:['lists','initialSlide'],
    updated () {
      // console.log('组件',this.lists)
      if (this.lists.length) {
        let that = this
        this.mySwiper = new Swiper('.swiper-container-preview', {
          autoplay: false,//可选选项，自动滑动
          loop: false,
          speed: 500,
          initialSlide :that.initialSlide,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination-preview',
            clickable: true
          },
        })
        document.getElementsByTagName('body')[0].className  = 'modal-open'
      }else {
        document.getElementsByTagName('body')[0].className  = ''
        this.mySwiper.destroy()
      }
    },
    mounted () {

    }
  }
</script>

