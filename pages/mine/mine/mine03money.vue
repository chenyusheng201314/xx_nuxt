<template>
  <div class="mine-money mine-box">
    <div class="clearfix money-box">
      <div class="my-money">
        <span class="my-money-num">{{user.learn_coin}}</span> 学币
      </div>
      <div class="mine-title">
        <div class="h-title">学币充值</div>
      </div>
      <div class="recharges">
        <div class="text-center recharge" :class="{'recharge-active': recharge_index === index, br: (index+1)%3===0}"
             v-for="(item, index) in list" :key="item.id" @click="check_recharge(index, item.id)">
          <span class="recharge-money">{{item.xueb}}</span> 学币
          <div class="recharge-money-real" :class="{'recharge-active': recharge_index === index}">{{item.rmb}} 元</div>
        </div>
        <div class="clearfix"></div>
        <div class="d-flex" style="justify-content: center">
          <button class="pay-main pay-we" @click="pay(1)">微信支付</button>
          <button class="pay-main pay-ali" @click="pay(2)">支付宝支付</button>
        </div>
        <modal :data="payData" v-show="payData.show" @close="codeClose">
          <div v-if="payDone===1" id="qrcode" style="margin: 30px auto;"></div>
          <div v-if="payDone===2">支付成功</div>
          <div v-if="payDone===3">支付取消</div>
        </modal>
      </div>
    </div>
    <div class="money-box">
      <div class="mine-title">
        <div class="h-title">消费明细</div>
      </div>
      <ul class="records" v-loading="loading1">
        <li class="clearfix" v-for="item in records.data" :key="item.id">
          <div class="float-right record-num">- {{item.total}}</div>
          <div class="d-inline-block record-time">{{item.pay_time}}</div>
          <div class="d-inline-block record-con">{{item.issue_type===1?'购买课程':'购买训练营'}}</div>
        </li>
      </ul>
      <paging v-if="records.total" :page_total="records.page_total"  @pageChange="pageChange1" :current="p1"></paging>
      <div class="mine-title">
        <div class="h-title">充值明细</div>
      </div>
      <ul class="records" v-loading="loading2">
        <li class="clearfix" v-for="item in recharge.data" :key="item.id">
          <div class="float-right record-num">+ {{item.pay_money}}</div>
          <div class="d-inline-block record-time">{{item.pay_time}}</div>
          <!--<div class="d-inline-block record-con">{{item.issue_type===1?'购买课程':'购买训练营'}}</div>-->
        </li>
      </ul>
      <paging v-if="recharge.total" :page_total="recharge.page_total"  @pageChange="pageChange2" :current="p2"></paging>
    </div>
    <form v-if="ali" id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=utf8' method='POST'>
      <input type='hidden' name='return_url' :value='ali.return_url'/>
      <input type='hidden' name='app_id' :value='ali.app_id'/>
      <input type='hidden' name='method' :value='ali.method'/>
      <input type='hidden' name='format' :value='ali.format'/>
      <input type='hidden' name='charset' :value='ali.charset'/>
      <input type='hidden' name='sign_type' :value='ali.sign_type'/>
      <input type='hidden' name='timestamp' :value='ali.timestamp'/>
      <input type='hidden' name='version' :value='ali.version'/>
      <input type='hidden' name='notify_url' :value='ali.notify_url'/>
      <input type='hidden' name='biz_content' :value='ali.biz_content'/>
      <input type='hidden' name='sign' :value='ali.sign'/>
      <input type='submit' value='ok' style='display:none;'>
    </form>
  </div>
</template>

<script>
  import paging from '@/components/dataPaging'
  import modal from '@/components/modal'

  // import jquery from 'jquery'
  // import QRCode from 'qrcodejs'

export default {
  name: 'mine03money',
  data () {
    return {
      recharge_index: 2,
      timer:null,
      loading1:false,
      loading2:false,
      qrcode:'',
      ali:null,
      payDone: 1,
      payData:{
        title: '请使用微信扫码支付',
        show:false,
        class: 'modal-code',
      }
    }
  },
  head() {
    return {
      script:[{
        src: '/js/qrcode.js'
      }]
    }
  },
  components: {paging,modal},
  props: ['user'],
  async asyncData({store}) {
    // 充值金额列表
    let list = await store.dispatch('mineGet', {
      url: '/app/order/recharge_set_list',
      data: {}
    })
    let res1 = await store.dispatch('mineGet', {
      url: '/app/personal/person_money_detail',
      data: {
        type: 2,
        page: 1,
        psize: 2
      }
    })
    let res2 = await store.dispatch('mineGet', {
      url: '/app/personal/person_recharge_detail',
      data: {
        type: 2,
        page: 1,
        psize: 2
      }
    })

    // let res2 = res1
    console.log('充值金额列表',list, '消费明细',res1,'充值明细',res2.data)
    return {
      p1:1,
      p2:1,
      list: list.data,
      recharge_id: list.data[2].id,
      records:res1.data,
      recharge:res2.data
    }
  },
  methods: {
    // 1微信 2支付宝 充值
    async pay (t) {
      console.log('当前路径',this.$route)
      // let local = this.$store.'http://localhost:4000/mine/mine/mine03money'
      let local = 'http://localhost:4000/mine/mine/mine03money'
      if (t===1) {
        this.payData.show = true
      }
      let res = await this.$store.dispatch('minePost', {
        url: '/app/pay/pay',
        data: {
          pay_type: t,
          recharge_set_id: this.recharge_id,
          order_channel: 1,
          alipay_return_url: local
        }
      })
      console.log('充值'+t,res)
      if(res.code===0) {
        if (t===1) {
          // 微信
          this.qrcode = new QRCode(document.getElementById("qrcode"), res.data.wechat)
          this.payData.title = '请使用微信扫码支付'
          // this.payData.order_number = res.data.order_number
          this.checkPay (res.data.order_number)
        }
        // 支付宝
        else {
          this.ali = res.data.alipay
          setTimeout(()=>{
            document.forms['alipaysubmit'].submit()
          })
          this.payData.title = '请使用支付宝扫码支付'
        }
      }else {
        this.$message.error(res.message)
      }
    },
    codeClose() {
      this.payData.show = false
      clearInterval(this.timer)
    },
    // 检测微信订单状态
    checkPay (order_number) {
      this.timer = setInterval(async ()=>{
        let res = await this.$store.dispatch('minePost', {
          url: '/app/pay/pay_status',
          data: {
            order_number: order_number,
          }
        })
        console.log('检测微信订单状态',res)
        this.payDone = res.data.status
        if (res.data.status!==1) {
          // 1未支付 2支付完成 3支付关闭
          clearInterval(this.timer)
        }
        if (res.data.status===2) {
          // 1未支付 2支付完成 3支付关闭
          setTimeout(()=>{
            this.$router.go(0)
          },3000)
        }
      },5000)
    },
    // 切换分页
    async pageChange1 (num) {
      // console.log(num)
      this.loading1 = true
      this.p1 = num
      let res1 = await this.$store.dispatch('mineGet', {
        url: '/app/personal/person_money_detail',
        data: {
          type: 2,
          page: num,
          psize: 2
        }
      })
      if (res1.code ===0 ) {
        this.records = res1.data
        this.loading1 = false
      }

    },
    async pageChange2 (num) {
      // console.log(num)
      this.loading2 = true
      this.p2 = num
      let res2 = await this.$store.dispatch('mineGet', {
        url: '/app/personal/person_recharge_detail',
        data: {
          type: 2,
          page: num,
          psize: 2
        }
      })
      if (res2.code ===0 ) {
        this.recharge = res2.data
        this.loading2 = false
      }
    },
    // 切换充值数额
    check_recharge (index, id) {
      this.recharge_index = index
      this.recharge_id = id
    }
  },
  mounted () {
    console.log(this.user)
  }
}
</script>
