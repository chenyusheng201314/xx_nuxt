<template>
  <div class="mine-order">
      <div class="order-box">
        <!--issue_type '课程类型：1课程，2训练营',-->
        <ul v-loading="loading">
          <li v-for="(item, index) in orders.data" :key="index" v-if="item.issue_type===1">
            <img class="cover" :src="item.course.cover" alt="">
            <div class="d-inline-block order-con">
              <div class="order-title">{{item.course.course_name}}</div>
              <div class="order-price">{{item.order_type===1?item.pay_money:item.pay_points}} {{item.order_type===1?'学币':'积分'}}</div>
              <div class="order-num">数量：{{item.amount}}</div>
            </div>
            <div class="d-inline-block text-right order-con-right">
              <div class="order-time">{{item.pay_time| y-m-d}}</div>
              <div class="order-total">总计</div>
              <div class="order-money"><span>{{item.order_type===1?item.total:item.total_points}}</span> {{item.order_type===1?'学币':'积分'}}</div>
            </div>
          </li>

          <li v-for="(item, index) in orders.data" :key="index" v-if="item.issue_type===2">
            <img class="cover" :src="item.training.training_cover_pc" alt="">
            <div class="d-inline-block order-con">
              <div class="order-title">{{item.training.training_name}}</div>
              <div class="order-price">{{item.pay_money}} 学币</div>
              <div class="order-num">数量：{{item.amount}}</div>
            </div>
            <div class="d-inline-block text-right order-con-right">
              <div class="order-time">{{item.pay_time| y-m-d}}</div>
              <div class="order-total">总计</div>
              <div class="order-money"><span>{{item.total}}</span> 学币</div>
            </div>
          </li>
        </ul>
        <paging v-if="orders.total" :page_total="orders.page_total"  @pageChange="pageChange" :current="p"></paging>
    </div>
  </div>
</template>

<script>
  import paging from '@/components/dataPaging'
export default {
  name: 'mine08order',
  data () {
    return {
      p:1,
     loading:false
    }
  },
  components: {paging},
  async asyncData({store}) {
    let res = await store.dispatch('mineGet', {
      url: '/app/personal/order_list',
      data: {
        page:1,
        psize: 4
      }
    })
    console.log('订单',res)
    return {
      orders:res.data
    }
  },
  methods: {
    // 切换分页
    async pageChange (num) {
      // console.log(num)
      this.loading = true
      this.p = num
      let res = await this.$store.dispatch('mineGet', {
        url: '/app/personal/order_list',
        data: {
          page: num,
          psize: 4
        }
      })
      // console.log('订单分页',res)
      if (res.code === 0) {
        this.orders = res.data
        this.loading = false
      }
    },
  }
}
</script>
