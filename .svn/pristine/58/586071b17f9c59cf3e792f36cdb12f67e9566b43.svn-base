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
    data() {
      return {
        title: 'app管理',
        leftNav: [],
        
      }
    },
    components: {
      LeftNav
    },
    methods: {
      setMeau() {
         let leftNav = []
         let roles =  this.$store.state.admin.adminRole.data
         //更新管理
         let course_activity = this.comsys.adminGetMeau(roles,"course_activity")
         let course_new_list = [] //最新上架
         let course_jp_list = []  //精品课程
         let course_tj_list = [] //特价课程
         let course_jf_list = [] //积分购 
         let course_myzy_list = [] //买一赠一
         let course_free_list = [] //免费专区
         let given_words_list = [] //课程赠送文案


         if(course_activity.length>0) {
            course_new_list = this.comsys.adminGetMeau(course_activity[0].son,"course_new_list")
            course_jp_list = this.comsys.adminGetMeau(course_activity[0].son,"course_jp_list")
            course_tj_list = this.comsys.adminGetMeau(course_activity[0].son,"course_tj_list")
            course_jf_list = this.comsys.adminGetMeau(course_activity[0].son,"course_jf_list")
            course_myzy_list = this.comsys.adminGetMeau(course_activity[0].son,"course_myzy_list")
            course_free_list = this.comsys.adminGetMeau(course_activity[0].son,"course_free_list")
            given_words_list = this.comsys.adminGetMeau(course_activity[0].son,"given_words_list")

         }
         if(course_new_list.length>0) {
            leftNav.push({name:'最新上架',link:'/admin/promotion',active:false})
         }
         if(course_jp_list.length>0) {
            leftNav.push({name:'精品课程',link:'/admin/promotion/boutique',active:false})
         }
         if(course_tj_list.length>0) {
            leftNav.push({name:'特价课程',link:'/admin/promotion/special',active:false})
         }
         if(course_jf_list.length>0) {
            leftNav.push({name:'积分购',link:'/admin/promotion/integral',active:false})
         }
         if(course_myzy_list.length>0) {
            leftNav.push({name:'买一赠一',link:'/admin/promotion/present',active:false})
         }
         if(course_free_list.length>0) {
            leftNav.push({name:'免费专区',link:'/admin/promotion/free',active:false})
         }
         if(given_words_list.length>0) {
            leftNav.push({name:'课程赠送文案',link:'/admin/promotion/document',active:false})
         }
         leftNav[0].active = true
         this.leftNav =  leftNav
      },


    },
    mounted() {
      this.setMeau()
    },
    head () {
      return {
        title:this.title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123"
        }],
        
      }
    }
  }
</script>

