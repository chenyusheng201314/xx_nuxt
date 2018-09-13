<template>
  <div class="mine-box">
    <div class="clearfix money-box">
      <div class="my-money">
        <span class="my-money-num">{{money}}</span> 学币
      </div>
      <div class="mine-title">
        <div class="h-title">学币充值</div>
      </div>
      <div class="recharges">
        <div class="text-center recharge" :class="{'recharge-active': recharge === index, br: (index+1)%3===0}"
             v-for="(item, index) in recharge_data" :key="item.id" @click="check_recharge(index, item.id)">
          <span class="recharge-money">{{item.money}}</span> 学币
          <div class="recharge-money-real" :class="{'recharge-active': recharge === index}">{{item.money_old}} 元</div>
        </div>
        <div class="clearfix"></div>
        <button class="btn-main">确认支付</button>
      </div>
    </div>
    <div class="money-box">
      <div class="mine-title">
        <div class="h-title">消费明细</div>
      </div>
      <ul class="records">
        <li v-for="item in records" :key="item.id">
          <div class="record-num">{{item.money}}</div>
          <div class="d-inline-block record-time">{{item.time}}</div>
          <div class="d-inline-block text-overflow-one record-con">{{item.con}}</div>
        </li>
      </ul>
      <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'mine03money',
  data () {
    return {
      money: 88.9,
      recharge_data: [
        {
          id: 1,
          money: 9,
          money_old: 10
        }, {
          id: 2,
          money: 99,
          money_old: 10
        }, {
          id: 3,
          money: 199,
          money_old: 10
        }, {
          id: 4,
          money: 399,
          money_old: 10
        }, {
          id: 5,
          money: 699,
          money_old: 10
        }, {
          id: 6,
          money: 999,
          money_old: 10
        }
      ],
      recharge: 2,
      records: [
        {
          id: 1,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 14,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 11,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 12,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
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
    // 切换分页
    paging (num) {
      console.log(num)
    },
    // 切换充值数额
    check_recharge (index, id) {
      this.$data.recharge = index
    }
  }
}
</script>

<style scoped>
  .mine-box {
    width: 100%;
  }
  .money-box {
    color: #666;
    padding: 45px 95px;
    border-bottom: 1px solid #ddd;
  }
  .my-money {
    margin-bottom: 45px;
  }
  .my-money-num {
    color: #ff6900;
    font-size: 50px;
    line-height: 50px;
  }
  .recharges {
    width: 660px;
  }
  .recharge {
    width: 200px;
    height: 115px;
    font-size: 20px;
    color: #ff6900;
    border: 1px solid #ff6900;
    border-radius: 10px;
    padding-top: 14px;
    margin: 0 30px 30px 0;
    float: left;
  }
  .br {
    margin-right: 0;
  }
  .recharge-money {
    font-size: 35px;
  }
  .recharge-money-real {
    color: #666;
  }
  .recharge-active {
    color: #fff;
    background-color: #ff6900;
  }
  .btn-main {
    width: 200px;
    height: 50px;
    line-height: 50px;
  }
  .records {
    font-size: 15px;
    color: #666;
  }
  .records li{
    padding: 10px 30px;
    border-top: 1px solid #ddd;
  }
  .records li:last-of-type{
    border-bottom: 1px solid #ddd;
  }
  .record-num {
    float: right;
    color: #ff6900;
  }
  .record-time {
    vertical-align: top;
    margin-right: 140px;
  }
  .record-con {
    width: 60%;
  }
  .paging {
    margin-top: 45px;
    margin-bottom: 0!important;
  }
</style>
