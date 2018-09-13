<template>
  <div>
      <div class="order-box">
      <ul>
        <li v-for="(item, index) in orders" :key="index">
          <img class="cover" :src="item.cover" alt="">
          <div class="d-inline-block order-con">
            <div class="order-title">{{item.title}}</div>
            <div class="order-price">{{item.price}} 学币</div>
            <div class="order-num">数量：{{item.num}}</div>
          </div>
          <div class="d-inline-block text-right order-con-right">
            <div class="order-time">{{item.time}}</div>
            <div class="order-total">总计</div>
            <div class="order-money"><span>{{item.money}}</span> 学币</div>
          </div>
        </li>
      </ul>
      <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'mine08order',
  data () {
    return {
      orders: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展趋势解读',
          price: '299',
          num: 2,
          time: '2018-09-09',
          money: '598'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展趋势解读',
          price: '299',
          num: 2,
          time: '2018-09-09',
          money: '598'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展趋势解读',
          price: '299',
          num: 2,
          time: '2018-09-09',
          money: '598'
        }
      ],
      pageData: {
        total: 10,
        current: 1,
        visible: 8
      }
    }
  },
  components: {Paging},
  methods: {
    paging () {}
  }
}
</script>

<style scoped>
  .order-box {
    width: 100%;
    padding: 45px;
    border: 1px solid #e5e5e5;
    margin-bottom: 60px;
  }
 li {
   padding-bottom: 20px;
   border-bottom: 1px solid #e5e5e5;
   margin-bottom: 20px;
 }
  .cover {
    width: 165px;
    height: 100px;
    vertical-align: top;
    margin-right: 45px;
  }
 .order-con {
   font-size: 20px;
   color: #666;
   width: 60%;
   vertical-align: top;
 }
 .order-title {
   color: #333;
   line-height: 20px;
   margin-bottom: 10px;
 }
 .order-price {
   color: #ff6900;
   line-height: 20px;
   margin-bottom: 32px;
 }
 .order-num {
   font-size: 15px;
   color: #666;
 }

 .order-con-right {
   width: 20%;
   font-size: 15px;
   vertical-align: top;
 }
 .order-time {
   color: #999;
   line-height: 15px;
   margin-bottom: 30px;
 }
 .order-total {
   line-height: 15px;
   color: #333;

 }
 .order-money {
   font-size: 20px;
   color: #ff6900;
 }
 .order-money span {
   font-size: 30px;
 }
  .paging {
    margin: 45px 0 0!important;
  }
</style>
