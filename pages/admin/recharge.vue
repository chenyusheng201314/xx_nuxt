<template>
<div class="admin_body">
  <LeftNav :data="leftNav"/>
  <div class="admin_body_right">
    <nuxt-child/>
  </div>
</div>
</template>

<script>
import LeftNav from '~/components/admin/LeftNav';
export default {
  layout: 'admin',
  name: 'recharge',
  data () {
    return {
    
      leftNav: []
    }
  },
  components: {
      LeftNav
  },
  create() {
      
  },
  methods: {
       setMeau() {
         let leftNav = []
         let roles =  this.$store.state.admin.adminRole.data
         
         let recharge_order = this.comsys.adminGetMeau(roles,"recharge_order")
         let recharge_set_list = []
         let recharge_order_list = []
         if(recharge_order.length>0) {
           recharge_set_list = this.comsys.adminGetMeau(recharge_order[0].son,"recharge_set_list")
           recharge_order_list = this.comsys.adminGetMeau(recharge_order[0].son,"recharge_order_list")
         }

         if(recharge_set_list.length>0) {
            leftNav.push({name:'充值金额',link:'/admin/recharge',active:false})
         }
         if(recharge_order_list.length>0) {
            leftNav.push({name:'充值订单',link:'/admin/recharge/order',active:false})
         }
         if(leftNav.length>0) {leftNav[0].active = true}
         this.leftNav =  leftNav
       }
  },
  mounted () {
      this.setMeau()
  },
  head () {
    return {
      title: "充值管理",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
     
    }
  }
}
</script>

