<template>
  <div class="admin_body">
    <LeftNav :data="leftNav"></LeftNav>
    <div class="admin_body_right">
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
  import LeftNav from '~/components/admin/LeftNav'

  export default {
    layout: 'admin',
    name: 'admin_body',
    async asyncData({store}){
      let leftNav =  store.state.admin.adminRole.data
      // var tasks = leftNav.filter(function(p){
      //       return p.stage_count === thisStage_count;
      // });


      return {
        leftNav: []
      }
    },
    data() {
      return {
        title: 'app管理',

      }
    },
    components: {
      LeftNav
    },
    methods: {
      setMeau() {
         let leftNav = []
         leftNav.push({name:'首页配置',link:'/admin/app',active:false})
         let roles =  this.$store.state.admin.adminRole.data
         //更新管理
         let app_upgrade_config = this.comsys.adminGetMeau(roles,"app_upgrade_config")
         let app_upgrade_config_list = []
         if(app_upgrade_config.length>0) {
            app_upgrade_config_list = this.comsys.adminGetMeau(app_upgrade_config[0].son,"list")
         }
         if(app_upgrade_config_list.length>0) {
            leftNav.push({name:'更新管理',link:'/admin/app/update',active:false})
         }

         //闪屏广告
         let app_splash = this.comsys.adminGetMeau(roles,"app_splash")
         let app_splash_list = []
         if(app_splash.length>0) {
            app_splash_list = this.comsys.adminGetMeau(app_splash[0].son,"list")
         }
         if(app_splash_list.length>0) {
            leftNav.push({name:'闪屏广告',link:'/admin/app/adv',active:false})
         }

         //意见反馈
         let app_feedback = this.comsys.adminGetMeau(roles,"app_feedback")
         let app_feedback_list = []
         if(app_feedback.length>0) {
            app_feedback_list = this.comsys.adminGetMeau(app_feedback[0].son,"list")
         }
         if(app_feedback_list.length>0) {
            leftNav.push({name:'意见反馈',link:'/admin/app/feedback',active:false})
         }

        leftNav.push({name: '关于我们', link: '/admin/app/about', active: false});
         leftNav[0].active = true
         this.leftNav =  leftNav
      },


    },
    mounted() {
      this.setMeau()

    },
    head () {
      return {
        title:"App管理",
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123"
        }],

      }
    }
  }
</script>

