<template>
  <div class="blog-detail">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <div class="blog-detail-article">
      <div class="article-left">
        <h2>{{article_info.tit}}</h2>
        <p class="article-info">
          <span class="article-info-span">讲师：{{article_info.teacher}}</span>
          <span class="article-info-span">浏览次数：{{article_info.see_times}}</span>
          <span class="article-info-share article-info-span" @mouseover="pic_change(true)"
                @mouseleave="pic_change(false)">
          <img class="m-r-5" :src="share_pic" alt="" width="23" height="23">
          分享导师
          <div class="article-info-share-con" v-show="share_type">
            <div class="share-con-detail">
              <span class="share-con-icon m-r-8" @mouseover="wx_change(true)" @mouseleave="wx_change(false)"
                    @click="wx_share">
                <img :src="wx_pic" alt="">
              </span>
              <span class="share-con-icon m-r-8" @mouseover="qq_change(true)" @mouseleave="qq_change(false)"
                    @click="qq_share">
                <img :src="qq_pic" alt="">
              </span>
              <span class="share-con-icon" @mouseover="wb_change(true)" @mouseleave="wb_change(false)"
                    @click="wb_share">
                <img :src="wb_pic" alt="">
              </span>
              <div class="xsj"></div>
            </div>
          </div>
        </span>
        </p>
        <p class="article-sm">{{article_info.introduce}}</p>
        <p class="article-con" v-for="(item,index) in article_info.detail_con" :key="index">{{item}} </p>
      </div>
      <div class="article-right">
        <h2>相关文章</h2>
        <ul class="tuijian-list">
          <li v-for="(item,index) in tuijian_article" :key="index" @click="get_other_id(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'

  export default {
    name: 'index',
    components: {
      topBg,
      localRoute
    },
    data() {
      return {
        num: 4,
        route_data: [{name: '享学科技网', path: '/'}, {name: '名师博客', path: '/blogs/list'}],
        // 当前地址
        now_address: '营销管理',
        article_info: {
          id: 1,
          tit: '童装店的营销策划案例 ——20平米的小店一天现金成交14.8万',
          teacher: '某某某',
          see_times: 111,
          introduce: '童装店的营销策划案例20平米的小店一天现金成交14.8万2016-09-13麦吉安琪何凯华一次偶遇，成为一个让人津津乐童装店的营销策划案例20平米的小店一天现金成交14.8万2016-09-13麦吉安琪何凯华一次偶遇，成为一个让人津津乐童装店的营销策划案例20平米的小店一天现金成交14.8万2016-09-13麦吉安琪何凯华一次偶遇，成为一个让人津津乐',
          detail_con: [
            '一次偶遇，成为一个让人津津乐道的话题，同时也成就一个经典的案例。 ',
            '周末，素来无事，接到多年不见同学的电话。',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店',
            '同学老婆开了一个童装店同学老婆开了一个童装店同学老婆开了一个童装店'
          ]
        },
        // 推荐文章
        tuijian_article: [
          {
            name: '孙军正：认识三层业务链',
            id: 1
          },
          {
            name: '孙军正：认识三层业务链',
            id: 2
          },
          {
            name: '孙军正：认识三层业务链',
            id: 3
          },
          {
            name: '孙军正：认识三层业务链',
            id: 4
          },
          {
            name: '孙军正：认识三层业务链',
            id: 5
          },
          {
            name: '孙军正：认识三层业务链',
            id: 6
          },
          {
            name: '孙军正：认识三层业务链',
            id: 7
          },
          {
            name: '孙军正：认识三层业务链',
            id: 8
          },
          {
            name: '孙军正：认识三层业务链',
            id: 9
          }
        ],
        // 分享图标
        share_pic: '/images/blogs/icon-share1.png',
        // qq等小图标的显示
        share_type: false,
        qq_pic: '/images/blogs/icon-qq1.png',
        wx_pic: '/images/blogs/icon-wx1.png',
        wb_pic: '/images/blogs/icon-wb1.png'
      }
    },
    methods: {
      // 分享图标切换
      pic_change(bool) {
        var that = this
        that.share_type = bool
        if (bool) {
          that.share_pic = '/images/blogs/icon-share2.png'
        } else {
          that.share_pic = '/images/blogs/icon-share1.png'
        }
      },
      //  微信图标切换
      wx_change(bool) {
        var that = this
        if (bool) {
          that.wx_pic = '/images/blogs/icon-wx2.png'
        } else {
          that.wx_pic = '/images/blogs/icon-wx1.png'
        }
      },
      //  qq图标切换
      qq_change(bool) {
        var that = this
        if (bool) {
          that.qq_pic = '/images/blogs/icon-qq2.png'
        } else {
          that.qq_pic = '/images/blogs/icon-qq1.png'
        }
      },
      //  微博图标切换
      wb_change(bool) {
        var that = this
        if (bool) {
          that.wb_pic = '/images/blogs/icon-wb2.png'
        } else {
          that.wb_pic = '/images/blogs/icon-wb1.png'
        }
      },
      wx_share() {
        console.log('微信分享')
      },

      qq_share() {
        console.log('qq分享')
      },

      wb_share() {
        console.log('微博分享')
      },
      // 其他文章ID
      get_other_id(id){
        console.log('其他文章ID  ' + id)
      }
    }
  }
</script>

<style scoped>
  .blog-detail {
    width: 1200px;
    margin: 0 auto;
  }

  ul {
    padding: 0 !important;
    margin: 0 !important;
  }

  ul, li, ol {
    list-style-type: none;
  }

  .m-r-5 {
    margin-right: 5px;
  }

  .m-r-8 {
    margin-right: 8px;
  }

  p {
    margin: 0;
  }

  .blog-detail-article {
    width: 1200px;
    height: auto;
    overflow: hidden;
    margin-bottom: 60px;
  }

  .blog-detail-article .article-left {
    float: left;
    border: 1px solid #dcdcdc;
    padding: 45px;
    width: 850px;
    height: auto;
    overflow: hidden;
  }

  .blog-detail-article .article-left h2 {
    font-size: 20px;
    color: #333;
    text-align: center;
    font-weight: bolder;
  }

  .blog-detail-article .article-left .article-info {
    width: 100%;
    height: auto;
    margin-top: 70px;
  }

  .blog-detail-article .article-left .article-info .article-info-span {
    display: inline-block;
    font-size: 15px;
    color: #666;
    margin-right: 45px;
    position: relative;
  }

  .blog-detail-article .article-left .article-info .article-info-share:hover {
    color: #ff6900;
    cursor: pointer;
  }

  .blog-detail-article .article-left .article-info .article-info-share .article-info-share-con {
    width: 120px;
    height: 52px;
    position: absolute;
    right: 0;
    top: -52px;
  }

  .share-con-detail {
    width: 120px;
    height: 40px;
    background: #fff;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    line-height: 36px;
    text-align: center;
    box-shadow: 0 1px 14px 2px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 1px 14px 2px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 14px 2px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 0 1px 14px 2px rgba(0, 0, 0, 0.15);
    -o-box-shadow: 0 1px 14px 2px rgba(0, 0, 0, 0.15);
  }

  .share-con-detail .xsj {
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

  .share-con-detail .share-con-icon {
    display: inline-block;
    cursor: pointer;
  }

  .article-left .article-sm {
    width: 100%;
    height: auto;
    padding: 45px;
    background: #f0f0f0;
    margin-top: 45px;
    margin-bottom: 45px;
  }

  .article-left .article-con {
    font-size: 15px;
    color: #666;
  }

  .blog-detail-article .article-right {
    float: right;
    height: auto;
    width: 330px;
    padding: 45px;
    border: 1px solid #dcdcdc;
  }

  .blog-detail-article .article-right h2 {
    color: #ff6900;
    font-size: 20px;
  }

  .blog-detail-article .article-right .tuijian-list {
    margin-top: 10px;
    padding: 0;
  }

  .blog-detail-article .article-right .tuijian-list li {
    margin-top: 20px;
    font-size: 15px;
    color: #333;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    list-style-type: decimal;
    cursor: pointer;
  }

  .blog-detail-article .article-right .tuijian-list li:hover {
    color: #ff6900;
  }
</style>
