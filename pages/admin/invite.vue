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
      title: '邀请好友',
      leftNav: []
    }
  },
  components: {
      LeftNav
    },
  methods: {
    setMeau() {
        let leftNav = []
        let roles =  this.$store.state.admin.adminRole.data
         let person_invitation = this.comsys.adminGetMeau(roles,"person_invitation")
         let list = []
         let setting = []
         if(person_invitation.length>0) {
           list = this.comsys.adminGetMeau(person_invitation[0].son,"list")
           setting = this.comsys.adminGetMeau(person_invitation[0].son,"setting")
         }
         if(list.length>0) {
            leftNav.push({name:'邀请列表',link:'/admin/invite',active:false})
         }
         if(setting.length>0) {
            leftNav.push({name:'邀请设置',link:'/admin/invite/setInvite',active:false})
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
      title: "邀请好友",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/admin/js/ueditor/ueditor.config.js'
      }, {
        src: '/admin/js/ueditor/ueditor.all.min.js'
      },{
        src: '/admin/js/ueditor/lang/zh-cn/zh-cn.js'
      }

      ]
    }
  }
}
</script>

