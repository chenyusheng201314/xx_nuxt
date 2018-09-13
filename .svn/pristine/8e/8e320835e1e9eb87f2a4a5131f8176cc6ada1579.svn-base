<template>
  <div class="blog-list">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <!--筛选条件-->
    <Filtrate :choose_condition="choose_condition" :change_address="change_address"></Filtrate>
    <!--文章列表的标题-->
    <ArticleTitle :now_address="now_address"></ArticleTitle>
    <!--文章-->
    <Article :article_list="article_list"></Article>
    <Paging v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="change"></Paging>
  </div>
</template>

<script>

  import Filtrate from './filtrate'
  import ArticleTitle from './article-title'
  import Article from './article'
  import Paging from '@/components/paging'
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'

  export default {
    name: 'list',
    components: {
      Filtrate,
      ArticleTitle,
      Article,
      Paging,
      topBg,
      localRoute
    },
    data () {
      return {
        num: 4,
        route_data: [{name: '享学科技网', path: '/'}, {name: '名师博客', path: '/blogs/list'}],
        pageData: {},
        // 当前地址
        now_address: '营销管理',
        choose_condition: [
          {
            tit: '营销管理',
            active: true,
            detail: [
              {
                name: '品牌管理',
                active: false
              },
              {
                name: '营销策划',
                active: false
              },
              {
                name: '销售技巧',
                active: false
              },
              {
                name: '门店管理',
                active: false
              },
              {
                name: '客户服务',
                active: false
              },
              {
                name: '客户服务',
                active: false
              },
              {
                name: '网络营销',
                active: false
              },
              {
                name: '电话销售',
                active: false
              },
              {
                name: '销售团队',
                active: false
              },
              {
                name: '渠道销售',
                active: false
              },
              {
                name: '商务谈判',
                active: false
              },
              {
                name: '合同管理',
                active: false
              },
              {
                name: '大客户销售',
                active: false
              },
              {
                name: '经销商',
                active: false
              },
              {
                name: '顾问式销售',
                active: false
              },
              {
                name: '国际贸易',
                active: false
              }]
          },
          {
            tit: '人力资源',
            active: false,
            detail: [
              {
                name: '人力资源1',
                active: false
              },
              {
                name: '人力2',
                active: false
              },
              {
                name: '人力3',
                active: false
              },
              {
                name: '人力4',
                active: false
              },
              {
                name: '人力5',
                active: false
              },
              {
                name: '人力6',
                active: false
              },
              {
                name: '人力6',
                active: false
              },
              {
                name: '人力8',
                active: false
              },
              {
                name: '人力9',
                active: false
              }
            ]
          },
          {
            tit: '生产研发',
            active: false,
            detail: [
              {
                name: '研发1',
                active: false
              },
              {
                name: '研发2',
                active: false
              },
              {
                name: '研发3',
                active: false
              },
              {
                name: '研发4',
                active: false
              },
              {
                name: '研发5',
                active: false
              },
              {
                name: '研发6',
                active: false
              },
              {
                name: '研发7',
                active: false
              },
              {
                name: '研发8',
                active: false
              }
            ]
          },
          {
            tit: '采购物流',
            active: false,
            detail: [
              {
                name: '采购1',
                active: false
              },
              {
                name: '采购2',
                active: false
              },
              {
                name: '采购3',
                active: false
              },
              {
                name: '采购4',
                active: false
              },
              {
                name: '采购5',
                active: false
              },
              {
                name: '采购6',
                active: false
              },
              {
                name: '采购7',
                active: false
              },
              {
                name: '采购8',
                active: false
              }
            ]
          },
          {
            tit: '财务管理',
            active: false,
            detail: [
              {
                name: '财务1',
                active: false
              },
              {
                name: '财务2',
                active: false
              },
              {
                name: '财务3',
                active: false
              },
              {
                name: '财务4',
                active: false
              },
              {
                name: '财务5',
                active: false
              },
              {
                name: '财务6',
                active: false
              },
              {
                name: '财务7',
                active: false
              },
              {
                name: '财务8',
                active: false
              },
              {
                name: '财务9',
                active: false
              },
              {
                name: '财务10',
                active: false
              },
              {
                name: '财务11',
                active: false
              }
            ]
          },
          {
            tit: '战略管理',
            active: false,
            detail: [
              {
                name: '战略1',
                active: false
              },
              {
                name: '战略2',
                active: false
              },
              {
                name: '战略3',
                active: false
              },
              {
                name: '战略4',
                active: false
              },
              {
                name: '战略5',
                active: false
              },
              {
                name: '战略6',
                active: false
              },
              {
                name: '战略7',
                active: false
              },
              {
                name: '战略8',
                active: false
              },
              {
                name: '战略9',
                active: false
              }]
          },
          {
            tit: '领导艺术',
            active: false,
            detail: [
              {
                name: '领导1',
                active: false
              },
              {
                name: '领导2',
                active: false
              },
              {
                name: '领导3',
                active: false
              },
              {
                name: '领导4',
                active: false
              },
              {
                name: '领导5',
                active: false
              },
              {
                name: '领导6',
                active: false
              },
              {
                name: '领导7',
                active: false
              },
              {
                name: '领导8',
                active: false
              },
              {
                name: '领导9',
                active: false
              }]
          },
          {
            tit: '综合技能',
            active: false,
            detail: [
              {
                name: '综合1',
                active: false
              },
              {
                name: '综合2',
                active: false
              },
              {
                name: '综合3',
                active: false
              },
              {
                name: '综合4',
                active: false
              }
            ]
          },
          {
            tit: '其他课程',
            active: false,
            detail: [
              {
                name: '其他1',
                active: false
              },
              {
                name: '其他2',
                active: false
              },
              {
                name: '其他3',
                active: false
              },
              {
                name: '其他4',
                active: false
              }
            ]
          }
        ],
        article_list: [
          {
            id: 1,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 2,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 3,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 4,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 5,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 6,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 7,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 8,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 9,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 10,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 11,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 12,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 13,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 14,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 15,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 16,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 17,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 18,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 19,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          },
          {
            id: 10,
            tit: '中国培训行业发展趋势解读',
            teacher: '褚莉莉',
            time: '2018-07-19',
            per: 111
          }
        ],
      }
    },
    methods: {
      change_address (val) {
        this.now_address = val
      },
      change (current) {
        console.log('父组件拿到页码', current)
        // this.$data.num += 4
        // this.$data.pageData = {
        //   total: 13,
        //   current: current,
        //   visible: 8
        // }
      },
    },
    mounted(){
      setTimeout(() => {
        this.$data.pageData = {
          total: 10,
          current: 1,
          visible: 8
        }
      }, 1000)
    }
  }
</script>

<style scoped>
  .blog-list {
    width: 1200px;
    margin: 0 auto;
  }

  ul {
    padding: 0 !important;
    margin: 0 !important;
  }

  ul, li, ol {
    list-style-type: none !important;
  }
</style>
