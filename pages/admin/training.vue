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
        title: '训练营',
        leftNav:[]
      }
    },
    components: {
      LeftNav
    },
    methods: {
      setMeau() {
         let leftNav = []
         let roles =  this.$store.state.admin.adminRole.data
         //训练营
         let training = this.comsys.adminGetMeau(roles,"training")
         let training_list = []
         if(training.length>0) {
            training_list = this.comsys.adminGetMeau(training[0].son,"training_list")
         }
     
         if(training_list.length>0) {
            leftNav.push({name:'训练营',link:'/admin/training',active:false})
         }

         //班级管理
         let training_class = this.comsys.adminGetMeau(roles,"training_class")
         let training_class_list = []
         if(training_class.length>0) {
            training_class_list = this.comsys.adminGetMeau(training_class[0].son,"training_class_list")
         }
         if(training_class_list.length>0) {
            leftNav.push({name:'班级管理',link:'/admin/training/classManage',active:false})
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
      title: "训练营",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "训练营"
      }],
 
       
    }
  }
  }
</script>

