<template>
<div class="admin_body">
  <LeftNav :data="leftNav"/>
  <div class="admin_body_right">
    <nuxt-child :leftNav="leftNav"/>
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
      title: '消息推送',
      leftNav: [
        {
          name: '创建消息',
          link: '/admin/sendMsg',
          active: true
        }, {
          name: '历史消息',
          link: '/admin/sendMsg/list',
          active: false
        } 
      ]
    }
  },
  components: {
      LeftNav
    },
   methods: {
    setMeau() {
        let leftNav = []
        let roles =  this.$store.state.admin.adminRole.data
         let message = this.comsys.adminGetMeau(roles,"message")
         let add = []
         let list = []
         if(message.length>0) {
           add = this.comsys.adminGetMeau(message[0].son,"add")
           list = this.comsys.adminGetMeau(message[0].son,"list")
         }
         if(add.length>0) {
            leftNav.push({name:'创建消息',link:'/admin/sendMsg',active:false})
         }
         if(list.length>0) {
            leftNav.push({name:'历史消息',link:'/admin/sendMsg/list',active:false})
         }
         if(leftNav.length>0) {leftNav[0].active = true}
         this.leftNav =  leftNav
      },
  },
  mounted () {
      this.setMeau()
  
  },
  head () {
    return {
      title: "消息推送",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
       
    }
  }
}
</script>

