<template>
  <div class="col-md-12" id='app' v-cloak>
    <!--顶部广告-->
    <!--<div :class="['top-gg row', {'slide-up': topGg}]">{{gg}}</div>-->
    <!--顶部导航-->
    <!--<div class="position-sticky w-100 bg-white" style="top: 0;z-index: 1055;"></div>-->
    <Head />
    <div class="position-fixed quick-tabs">
      <div class="quick-tab" @click="go_top">
        <img class="quick-tab-icon quick-tab-icon1" src="/images/common/totop.png" alt="">
        <div class="quick-tab-text">回到顶部</div>
      </div>
      <div class="quick-tab" @click="open_user">
        <img class="quick-tab-icon quick-tab-icon2" src="/images/common/online.png" alt="">
        <div class="quick-tab-text">在线咨询</div>
      </div>
      <div class="position-relative quick-tab quick-tab-hotline">
        <img class="quick-tab-icon quick-tab-icon3" src="/images/common/hotline.png" alt="">
        <div class="quick-tab-text">客服热线</div>
        <div class="position-absolute quick-tab-hotline-box">400-800-8375</div>
      </div>
      <div class="position-relative quick-tab quick-tab-we">
        <img class="quick-tab-icon quick-tab-icon4" src="/images/common/we.png" alt="">
        <div class="quick-tab-text">微信</div>
        <div class="position-absolute quick-tab-we-box"><img class="we-code" src="/images/home/code.jpg" alt=""></div>
      </div>
    </div>
    <keep-alive>
      <nuxt-child/>
    </keep-alive>
    <!--页脚-->
    <Foot />
  </div>
</template>

<script>
  import Head from '~/components/head'
  import Foot from '~/components/foot'

  import 'swiper/dist/css/swiper.min.css'
  export default {
    head () {
      return {
        meta: [{
          name: 'viewport', content: 'width=device-width, initial-scale=0.25,maximum-scale=1.0, user-scalable=1'
        }],
        // base:{target:"_blank"},
        link: [
          {
            href: '/css/bootstrap.css',
            type:'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/css/common.css',
            type:'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/element/index.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/element/tooltip.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/css/quill.core.css',
            type:'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/css/quill.snow.css',
            type:'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/css/quill.bubble.css',
            type:'text/css',
            rel: 'stylesheet',
          }
        ],
        script: [
          {
            src: '/js/jquery.min.js'
          },{
            src: '/js/index.js',
            async:true
          },
          // {src: 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-flash-min.js'}
        ]
      }
    },
    name: 'app',
    data () {
      return {
        topGg: false,
        gg: '广告'
      }
    },

    components: {
      Head, Foot
    },
    methods:{
      // 回顶部
      go_top() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      },
      // 在线沟通 窗口
      open_user () {
        window.open('http://p.qiao.baidu.com/cps/chat?siteId=12667303&userId=26578884','_blank',
          "height=600, width=900, top=200, left=600, scrollbars=no,resizable=0.2,modal=false,alwaysRaised=yes");
      },
    },
    // updated () {
    //   window.scrollTo(0, 0)
    // },
    mounted () {
      // //顶部广告消失
      // setTimeout(() => {
      //   this.$data.topGg = true
      //   this.$data.gg = ''
      // }, 3000)
    }
  }
</script>

<style scoped>
  .quick-tabs {
    top: 50%;
    right: 24px;
    z-index: 100;
  }
  .quick-tab {
    width: 56px;
    height: 62px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background-color: #626262;
    margin-bottom: 1px;
  }
  .quick-tab:hover {
    background-color: #ff6900;
  }
  .quick-tab-icon1 {
    width: 21px;
    /*height: 15px;*/
    display: inline-block;
    margin: 19px auto 8px;
  }
  .quick-tab-icon2 {
    width: 23px;
    /*height: 15px;*/
    display: inline-block;
    margin: 14px auto 6px;
  }
  .quick-tab-icon3 {
    width: 20px;
    /*height: 15px;*/
    display: inline-block;
    margin: 12px auto 8px;
  }
  .quick-tab-icon4 {
    width: 23px;
    /*height: 15px;*/
    display: inline-block;
    margin: 16px auto 5px;
  }
  /*.quick-tab-hotline:hover */
  .quick-tab-hotline-box {
    color: #fff;
    text-align: center;
    font-size: 18px;
    width: 0;
    height: 62px;
    line-height: 62px;
    background-color: #eee;
    bottom: 0;
    right: 56px;
    opacity: 0;
    transition: all 300ms;
    z-index: -1;
    overflow: hidden;
  }
  .quick-tab-hotline:hover .quick-tab-hotline-box {
    width: 200px;
    color: #ff6900;
    opacity: 1;
    /*display: block;*/
  }

  .quick-tab-we-box {
    text-align: center;
    width: 0;
    height: 250px;
    background-color: #eee;
    bottom: 0;
    right: 56px;
    opacity: 0;
    transition: all 300ms;
    z-index: -1;
    overflow: hidden;
    padding-top: 25px;
  }
  .quick-tab-we:hover .quick-tab-we-box {
    width: 250px;
    opacity: 1;
    /*display: block;*/
  }
  .we-code {
    width: 200px;
    height: 200px;
  }
</style>
