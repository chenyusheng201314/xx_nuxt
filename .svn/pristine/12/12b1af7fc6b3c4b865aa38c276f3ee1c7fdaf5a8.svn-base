<template>
  <div class="class-list">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data" ></localRoute>
    <ClassFiltrate :class_list="class_list" :choose_now_list="choose_now_list" :discounts_list="discounts_list" :price_list="price_list" :all_choose_type="all_choose_type" @all_choose_type="all_choose_change"></ClassFiltrate>
    <DetailList :lesson_list="lesson_list"></DetailList>
  </div>
</template>

<script>
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'
  import ClassFiltrate from './filtrate'
  import DetailList from './list-list'

  export default {
    name: 'list',
    components: {
      ClassFiltrate,
      DetailList,
      topBg,
      localRoute
    },
    data() {
      return {
        type: 1,
        route_data: [{name: '享学科技网', path: '/'}, {name: '课程分类', path: '/class/list'}],
        // 现在位置
        now_class_list: '全部',
        // 全选
        all_choose_type:true,
        // 条件筛选课程分类
        class_list: [
          {con: '领导力学习', type: false},
          {con: '内训师', type: false},
          {con: '绩效改进', type: false},
          {con: '企业管理', type: false},
          {con: '公开课', type: false},
          {con: '企业内训TDF', type: false}
        ],
        // 条件筛选活动
        discounts_list: [
          {con: '限时免费', type: false},
          {con: '买一赠一', type: false},
          {con: '特价课程', type: false},
          {con: '最新课程', type: false},
          {con: '积分购', type: false}
        ],
        // 条件筛选价格
        price_list: [
          {con: '100以下', type: false},
          {con: '100-300', type: false},
          {con: '300-500', type: false},
          {con: '500-1000', type: false},
          {con: '1000以上', type: false}
        ],
        // 课程详细列表
        lesson_list: [
          {
            id: 1,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          },
          {
            id: 2,
            cover: '/images/class/class-cover.png',
            tit: '中国培训行业发展趋势解读',
            teacher: '崔连斌',
            position: '留美人力资源开发博士',
            num: '6课时',
            time: '1.6小时',
            now_price: 299,
            old_price: 599,
            src: 'javascript:;'
          }
        ],
        // 分页信息
        paging_info: {
          total: 5, // 总数
          page_size: 1, // 每页显示条目个数  和total配合使用
          current_page: 1 // 当前页
        }
      }
    },
    methods: {
      choose_now_list: function (val) {
        this.now_class_list = val
      },
      all_choose_change(data){
        this.all_choose_type = data
        console.log(data);
      }
    },
    mounted() {
      const that = this;
      that.type = this.$route.query.type
      if (that.type === 1) {
        that.now_class_list = '全部'
      } else {
        this.all_choose_type = false
        $.each(that.class_list, function (key, val) {
          if (key === that.type - 2) {
            that.now_class_list = val.con
            val.type = true
          }else {
            val.type = false
          }
        })
      }
      console.log(that.now_class_list)
    }

  }
</script>

<style scoped>
  .class-list {
    width: 1250px;
    margin: 0 auto;
  }

</style>
