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
  name: 'admin_body',
  data () {
    return {
      title: '机构导师',
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
         //机构列表
         let organization = this.comsys.adminGetMeau(roles,"organization")
         let organization_list = []
         if(organization.length>0) {
            organization_list = this.comsys.adminGetMeau(organization[0].son,"list")
         }
     
         if(organization_list.length>0) {
            leftNav.push({name:'机构列表',link:'/admin/orgAndTch',active:false})
         }

         //导师列表
         let organization_teacher = this.comsys.adminGetMeau(roles,"organization_teacher")
         let organization_teacher_list = []
         if(organization_teacher.length>0) {
            organization_teacher_list = this.comsys.adminGetMeau(organization_teacher[0].son,"list")
         }
         if(organization_teacher_list.length>0) {
            leftNav.push({name:'导师列表',link:'/admin/orgAndTch/tch',active:false})
         }

         //案例
         let organization_cases = this.comsys.adminGetMeau(roles,"organization_cases")
         let organization_cases_list = []
         if(organization_cases.length>0) {
            organization_cases_list = this.comsys.adminGetMeau(organization_cases[0].son,"list")
         }
         if(organization_cases_list.length>0) {
            leftNav.push({name:'案例',link:'/admin/orgAndTch/case',active:false})
         }

         //导师秀
         let dsx = this.comsys.adminGetMeau(roles,"organization_teacher_show")
         let dsx_list = []
         if(dsx.length>0) {
            dsx_list = this.comsys.adminGetMeau(dsx[0].son,"list")
         }
         if(dsx_list.length>0) {
            leftNav.push({name:'导师秀',link:'/admin/orgAndTch/tchShow',active:false})
         }


         leftNav[0].active = true
         this.leftNav =  leftNav
      },
  },
  mounted () {
    this.setMeau()

  
  },
  head () {
    return {
      title: "机构及导师",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],  
    }
  }
}
</script>

