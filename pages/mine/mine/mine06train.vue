<template>
  <div class="train-box mine-box-buy">
    <div class="mine-con mine-train">
      <div class="mine-title">
        <h4 class="h-title">平台训练营</h4>
      </div>
      <div class="d-inline-block train" v-for="(item, index) in train" :key="index" v-if="item.get_type===1||item.get_type===2"
           :class="{'train-right':(index+1)%3===0}" @click="ewm_show=true">
        <img class="train-cover" :src="item.class.class_cover" alt="">
        <div class="train-con">
          <div class="text-overflow-one train-title">{{item.class.class_name}}</div>
          <div class="train-price">{{item.training.pay_price}} <span style="font-size: 14px">学币</span></div>
        </div>
      </div>
    </div>
    <div class="mine-con mine-train">
      <div class="mine-title">
        <h4 class="h-title">企业训练营</h4>
      </div>
      <!--<div>{{item.company.company_name}}</div>-->
      <div class="d-inline-block train" v-for="(item, index) in train" :key="index" v-if="item.get_type===3||item.get_type===4"
           :class="{'train-right':(index+1)%3===0}" @click="ewm_show=true">
        <img class="train-cover" :src="item.class.class_cover" alt="">
        <div class="train-con">
          <div class="text-overflow-one train-title">{{item.class.class_name}}</div>
          <div class="train-price">{{item.training.pay_price}} <span style="font-size: 14px">学币</span></div>
        </div>
      </div>
    </div>
    <div class="ewm-cover" v-show="ewm_show">
      <div class="cover-con">
        <div class="close" @click="ewm_show=false"><img src="/images/class/close.png" alt=""></div>
        <img src="/images/class/ewm.png" alt="" width="150">
        <p>下载APP后学习</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine06train',
  data () {
    return {
      item: 1,
      ewm_show:false
    }
  },
  props:['user'],
  async asyncData({store}) {
    let info = await store.dispatch('mineGet', {
      url: '/app/personal/my_info',
      data: {}
    })
    // console.log('个人信息',info.data)
    let res = await store.dispatch('mineGet', {
      url: '/app/training/my_training_list',
      data: {
        company_id: info.data.company_id
      }
    })
    console.log('训练营',res)
    return {
      train:res.data
    }
  },
  watch: {
    ewm_show(t) {
      if(t) {
        document.getElementsByTagName('body')[0].className  = 'modal-open'
      }else {
        document.getElementsByTagName('body')[0].className  = ''
      }
    }
  }
}
</script>

