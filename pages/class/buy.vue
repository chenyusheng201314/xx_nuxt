<template>
  <div class="buy-info">
    <div class="buy-left">
      <img :src="info.cover" alt="" width="534" height="300">
    </div>
    <div class="buy-right">
      <h3 class="buy-tit">{{info.course_name}}</h3>
      <p class="buy-teacher">{{info.organization_teacher.realname}} | {{info.organization_teacher.title}}</p>
      <p class="buy-class-info">
        <img src="/images/class/icon-num.png" alt="" width="16" height="16">
        <span>{{info.section_num}} 课时</span>
        <img src="/images/class/icon-time.png" alt="" width="16" height="16">
        <span>{{info.media_time|s-h|fixed1}} 小时</span>
        <!--收藏的人数-->
        <!--<img src="/images/class/icon-per.png" alt="" width="16" height="16">-->
        <!--<span>{{info.per}}人</span>-->
      </p>
      <p class="buy-price">
        <span class="buy-price-now">价格：{{info.price}} 学币</span>
        <!--<span class="buy-price-old">{{info.old_price}} 学币</span>-->
      </p>
      <div class="buy-btn now-buy" v-show="!info.Isbuy" @click="ewm_change(true)">立即购买</div>
      <!--<div class="buy-btn already-buy" v-show="info.Isbuy">已购买</div>-->
      <!-- 点击购买出现二维码  前期没有登录功能加上-->
      <div class="ewm-cover" v-show="ewm_show">
        <div class="cover-con">
          <span class="close" @click="ewm_change(false)"><img src="/images/class/close.png" alt=""></span>
          <img src="/images/class/ewm.png" alt="" width="150">
          <p>下载APP购买课程</p>
        </div>
      </div>

      <!-- 勿删！！！！   后期加登入加上-->

      <!--<div class="buy-share">-->

      <!--<span class="share share-icon" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">-->
      <!--<img :src="share.src" alt="" width="23" height="23">-->
      <!--</span>-->
      <!--<span class="like share-icon" @click="like_change">-->
      <!--<img :src="like.src" alt="" width="23" height="21">-->
      <!--</span>-->
      <!--<div class="share-detail" v-show="share.type" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">-->
      <!--<div class="share-detail-show">-->
      <!--<span class="share-detail-icon" @mouseenter="qq_change(true)" @mouseleave="qq_change(false)">-->
      <!--<img :src="qq" alt="" width="25" height="25">-->
      <!--</span>-->
      <!--<span class="share-detail-icon" @mouseenter="wx_change(true)" @mouseleave="wx_change(false)">-->
      <!--<img :src="wx" alt="" width="25" height="25">-->
      <!--</span>-->
      <!--<span class="share-detail-icon" @mouseenter="wb_change(true)" @mouseleave="wb_change(false)">-->
      <!--<img :src="wb" alt="" width="25" height="25">-->
      <!--</span>-->
      <!--<p class="xsj"></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>

  export default {
    name: 'buy',
    head () {
      return {
        link: [
          {
            href: '/css/class.css',
            type:'text/css',
            rel: 'stylesheet',
          }
        ]
      }
    },
    props: ['info'],
    data() {
      return {
        share: {
          src: '/images/class/share1.png',
          type: false
        },
        like: {
          src: '/images/class/like1.png', // 图片路径
          type: false // 是否被选中 默认未选中
        },
        qq: '/images/class/icon-qq1.png', // qq图片切换
        wx: '/images/class/icon-wx1.png',
        wb: '/images/class/icon-wb1.png',
        //  二维码显示
        ewm_show: false,

      }
    },
    methods: {
      // 分享
      pic_change(bool) {
        var that = this
        if (bool) {
          that.share.src = '/images/class/share2.png'
          that.share.type = true
        } else {
          that.share.src = '/images/class/share1.png'
          that.share.type = false
        }
      },
      // 收藏
      like_change() {
        var that = this
        that.like.type = !that.like.type
        if (that.like.type) {
          that.like.src = '/images/class/like2.png';
          this.$message({
            message: '关注成功！',
            type: 'success'
          });
        } else {
          that.like.src = '/images/class/like1.png';
          this.$message({
            message: '取消关注成功！',
            type: 'success'
          });
        }
      },
      qq_change(bool) {
        var that = this
        if (bool) {
          that.qq = '/images/class/icon-qq2.png'
        } else {
          that.qq = '/images/class/icon-qq1.png'
        }
      },
      wx_change(bool) {
        var that = this
        if (bool) {
          that.wx = '/images/class/icon-wx2.png'
        } else {
          that.wx = '/images/class/icon-wx1.png'
        }
      },
      wb_change(bool) {
        var that = this
        if (bool) {
          that.wb = '/images/class/icon-wb2.png'
        } else {
          that.wb = '/images/class/icon-wb1.png'
        }
      },
      ewm_change(bool) {
        this.ewm_show = bool;
      },
    },
    mounted() {
      // 是否已经收藏
      const that = this
      // if (buy_info.Islike) {
      //   that.like = {
      //     src: '/images/class/like2.png', // 图片路径
      //     type: true // 是否被选中 默认未选中
      //   }
      // } else {
      //   that.like = {
      //     src: '/images/class/like1.png', // 图片路径
      //     type: false // 是否被选中 默认未选中
      //   }
      // }
    }
  }
</script>

