<template>
  <div class="buy-info">
    <div class="buy-left">
      <img :src="lesson_info.cover" alt="" width="534" height="300">
    </div>
    <div class="buy-right">
      <h3 class="buy-tit">{{lesson_info.tit}}</h3>
      <p class="buy-teacher">{{lesson_info.teacher}} | {{lesson_info.postion}}</p>
      <p class="buy-class-info">
        <img src="/images/class/icon-num.png" alt="" width="16" height="16">
        <span>{{lesson_info.lesson_num}}</span>
        <img src="/images/class/icon-time.png" alt="" width="16" height="16">
        <span>{{lesson_info.lesson_time}}</span>
        <img src="/images/class/icon-per.png" alt="" width="16" height="16">
        <span>{{lesson_info.per}}人</span>
      </p>
      <p class="buy-price">
        <span class="buy-price-now">价格：{{lesson_info.now_price}}学币</span>
        <span class="buy-price-old">{{lesson_info.old_price}}学币</span>
      </p>
      <div class="buy-btn now-buy" v-show="!buy_info.Isbuy">立即购买</div>
      <div class="buy-btn already-buy" v-show="buy_info.Isbuy">已购买</div>
      <div class="buy-share">
        <span class="share share-icon" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">
          <img :src="share.src" alt="" width="23" height="23">
        </span>
        <span class="like share-icon" @click="like_change">
              <img :src="like.src" alt="" width="23" height="21">
        </span>
        <div class="share-detail" v-show="share.type" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">
          <div class="share-detail-show">
             <span class="share-detail-icon" @mouseenter="qq_change(true)" @mouseleave="qq_change(false)">
               <img :src="qq" alt="" width="25" height="25">
             </span>
            <span class="share-detail-icon" @mouseenter="wx_change(true)" @mouseleave="wx_change(false)">
              <img :src="wx" alt="" width="25" height="25">
            </span>
            <span class="share-detail-icon" @mouseenter="wb_change(true)" @mouseleave="wb_change(false)">
              <img :src="wb" alt="" width="25" height="25">
            </span>
            <p class="xsj"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import layer from 'layui-layer'

  export default {
    name: 'buy',
    props: ['buy_info', 'lesson_info'],
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
        wb: '/images/class/icon-wb1.png'
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
          that.like.src = '/images/class/like2.png'
          layer.msg('收藏成功', {
            time: 2000
          })
        } else {
          that.like.src = '/images/class/like1.png'
          layer.msg('收藏已取消', {
            time: 2000
          })
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
      }
    },
    mounted() {
      // 是否已经收藏
      const that = this
      const buy_info = this.buy_info
      if (buy_info.Islike) {
        that.like = {
          src: '/images/class/like2.png', // 图片路径
          type: true // 是否被选中 默认未选中
        }
      } else {
        that.like = {
          src: '/images/class/like1.png', // 图片路径
          type: false // 是否被选中 默认未选中
        }
      }
    }
  }
</script>

<style scoped>
  .buy-info {
    width: 1200px;
    height: 350px;
    padding: 25px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    background: #333;
  }

  .buy-info .buy-left {
    width: 534px;
    height: 300px;
    float: left;
  }

  .buy-info .buy-right {
    float: right;
    width: 530px;
    height: 300px;
  }

  .buy-info .buy-right .buy-tit {
    color: #fff;
    font-size: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 30px;
  }

  .buy-info .buy-right .buy-teacher {
    color: #fff;
    font-size: 20px;

  }

  .buy-info .buy-right .buy-class-info {
    color: #999;
    font-size: 15px;
    margin-top: 15px;
  }

  .buy-info .buy-right .buy-class-info img {
    margin-right: 5px;
  }

  .buy-info .buy-right .buy-class-info span {
    margin-right: 30px;
  }

  .buy-info .buy-right .buy-price {
    margin-top: 30px;
  }

  .buy-info .buy-right .buy-price .buy-price-now {
    font-size: 20px;
    color: #ff6900;
  }

  .buy-info .buy-right .buy-price .buy-price-old {
    font-size: 15px;
    color: #999;
    text-decoration: line-through;
    margin-left: 30px;
  }

  .buy-info .buy-right .buy-btn {
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    margin-top: 30px;
    cursor: pointer;
  }

  .buy-info .buy-right .now-buy {
    background: #ff6900;
  }

  .buy-info .buy-right .already-buy {
    background: #50af3e;
  }

  .buy-info .buy-right .buy-share {
    text-align: right;
    position: relative;
  }

  .buy-info .buy-right .buy-share .share-icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #fcfcfc;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    margin-right: 5px;
  }

  .buy-info .buy-right .buy-share .share-detail {
    width: 120px;
    height: 52px;
    position: absolute;
    right: 0;
    top: -52px;
  }

  .buy-info .buy-right .buy-share .share-detail .share-detail-show {
    width: 120px;
    height: 40px;
    background: #fff;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    line-height: 36px;
  }

  .buy-info .buy-right .buy-share .xsj {
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0; /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
    line-height: 0; /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
    border-width: 6px;
    border-style: solid dashed dashed dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
    border-color: #fff transparent transparent transparent;
    position: absolute;
    top: 40px;
    left: 57px;
  }

  .buy-info .buy-right .buy-share .share-detail .share-detail-icon {
    display: inline-block;
    margin-right: 8px;
    cursor: pointer;
  }
</style>
