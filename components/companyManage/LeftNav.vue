<template>
  <div class="left_nav">
    <ul>
       <li :class="item.isSelected?'el-submenu is-opened':'el-submenu'" v-for="(item,index) in navInfo" :key="index"  v-if="item.isShow" v-on:click="navChoose(index)">
         <div class="el-submenu__title"><i class="iconfont" v-html="item.icon"></i><span>{{item.title}}</span></div>
         <ul>
           <li v-for="(vo,ind) in item.sonNav" :key="ind"  v-if="vo.isShow" :class="vo.isSelected?'el-menu-item is-active':'el-menu-item'" v-on:click="navSonChoose(index,ind)" ><nuxt-link :to="vo.url">{{vo.title}}</nuxt-link></li>
         </ul>
       </li>
    </ul>
  </div>
</template>
<script>
  export default {

    data () {

      let navInfo = [
         {
            title:'企业管理',
            icon:"&#xe600;",
            sonNav:[
            {title:"企业信息",url:"/company_manage/",isShow:true,isSelected:false},
            {title:"员工账号",url:"/company_manage/account/",isShow:true,isSelected:false},
            {title:"角色管理",url:"/company_manage/role/",isShow:true,isSelected:false},
            ],
            isShow:true,
            isSelected:false
         },
         {
            title:'学员管理',
            icon:"&#xe602;",
            sonNav:[
            {title:"公司学员",url:"/company_manage/member/",isShow:true,isSelected:false},
            ],
            isShow:true,
            isSelected:false
         },
         {
            title:'课程管理',
            icon:"&#xe613;",
            sonNav:[
            {title:"视频库",url:"/company_manage/video",isShow:true,isSelected:false},
            {title:"课程管理",url:"/company_manage/course",isShow:true,isSelected:false},
            ],
            isShow:true,
            isSelected:false
         },
         {
            title:'训练营管理',
            icon:"&#xe7de;",
            sonNav:[
            {title:"训练营",url:"/company_manage/training/",isShow:true,isSelected:false},
            {title:"班级管理",url:"/company_manage/training/classManage/",isShow:true,isSelected:false},
            ],
            isShow:true,
            isSelected:false
         },

        ]
      let roles =  this.$store.state.company.companyRole.data

      navInfo[0].sonNav[1].isShow = this.comssr.adminCheckRole(roles,'company_user','list')
      navInfo[0].sonNav[2].isShow = this.comssr.adminCheckRole(roles,'acl','role_list')

      navInfo[1].isShow = navInfo[1].sonNav[0].isShow = this.comssr.adminCheckRole(roles,'company_person','list')

      navInfo[2].sonNav[0].isShow = this.comssr.adminCheckRole(roles,'company_video','video_list')
      navInfo[2].sonNav[1].isShow = this.comssr.adminCheckRole(roles,'course','company_course_list') || this.comssr.adminCheckRole(roles,'course','company_buy_course_list')
      navInfo[2].isShow = navInfo[2].sonNav[0].isShow || navInfo[2].sonNav[1].isShow

      navInfo[3].sonNav[0].isShow = this.comssr.adminCheckRole(roles,'training','training_list') || this.comssr.adminCheckRole(roles,'training','training_buy_list')
      navInfo[3].sonNav[1].isShow = this.comssr.adminCheckRole(roles,'training_class','training_class_list')
      navInfo[3].isShow = navInfo[3].sonNav[0].isShow || navInfo[3].sonNav[1].isShow

      return {
        navInfo:navInfo
      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      navChoose(x){
        for(let index in this.navInfo) {

             if(index==x) {
               this.navInfo[index].isSelected = true
             }
             else {
               this.navInfo[index].isSelected = false
             }
        }


      },
      navSonChoose(x,y) {
        for(let index in this.navInfo) {
          for(let ind in this.navInfo[index].sonNav) {
             if(index==x && ind==y) {
               this.navInfo[index].isSelected = true
               this.navInfo[index].sonNav[ind].isSelected = true
               this.$router.push({path: this.navInfo[index].sonNav[ind].url})
             }
             else {
               this.navInfo[index].isSelected = false
               this.navInfo[index].sonNav[ind].isSelected = false
             }
          }
        }
      },
      setMeau() {

      }
    },
    mounted() {

    },
    created() {
        for(let index in this.navInfo) {
          this.navInfo[index].isSelected = false
          for(let ind in this.navInfo[index].sonNav) {
             this.navInfo[index].sonNav[ind].isSelected = false
             if(this.navInfo[index].sonNav[ind].url == this.$route.path ) {
               this.navInfo[index].isSelected = true
               this.navInfo[index].sonNav[ind].isSelected = true
               if(this.navInfo[index].sonNav[ind].isShow==false) {
                  this.$router.push({path: '/company_manage/'})
                  this.navInfo[0].isSelected = true
                  this.navInfo[0].sonNav[0].isSelected = true
               }
             }

          }
        }

    },
  }
</script>
<style>

</style>

