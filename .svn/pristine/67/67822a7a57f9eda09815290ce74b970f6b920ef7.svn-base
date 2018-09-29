<template>
  <div class="left_nav">
    <el-menu
      default-active="2"
      unique-opened
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu  v-for="(item,index) in navInfo" :key="index" :index="index" v-if="item.isShow">
        <template slot="title">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="(vo,ind) in item.sonNav" :key="ind" :index="index+'-'+ind" v-if="vo.isShow"><nuxt-link :to="vo.url">{{vo.title}}</nuxt-link></el-menu-item>
      </el-submenu>

    </el-menu>



  </div>
</template>
<script>
  export default {
    data () {
      return {
        navInfo:[
         {
            title:'企业管理',
            icon:"&#xe600;",
            sonNav:[
            {title:"企业信息",url:"/company_manage",isShow:true},
            {title:"员工账号",url:"/company_manage/account",isShow:true},
            {title:"角色管理",url:"/company_manage/role",isShow:true},
            ],
            isShow:true
         },
         {
            title:'学员管理',
            icon:"&#xe602;",
            sonNav:[
            {title:"公司学员",url:"/company_manage",isShow:true},
            ],
            isShow:true
         },
         {
            title:'课程管理',
            icon:"&#xe613;",
            sonNav:[
            {title:"视频库",url:"/company_manage",isShow:true},
            {title:"课程管理",url:"/company_manage",isShow:true},
            ],
            isShow:true
         },
         {
            title:'训练营管理',
            icon:"&#xe7de;",
            sonNav:[
            {title:"训练营",url:"/company_manage",isShow:true},
            {title:"班级管理",url:"/company_manage",isShow:true},
            ],
            isShow:true
         },

        ],
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>

</style>

