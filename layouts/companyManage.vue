<template>
  <div class='admin_main'>
    <!--顶部导航-->
    <Head/>
    <LeftNav />
    <nuxt/>
    <!--页脚-->
    <Foot/>
  </div>
</template>

<script>
  import Head from '~/components/companyManage/head'
  import Foot from '~/components/companyManage/foot'
  import LeftNav from '~/components/companyManage/LeftNav'
  export default {
    middleware: 'company',
    head () {
    return {
      title: "欢迎登录享学就学运营中心",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
      link: [{
        href: '/css/bootstrap.css',
        type: 'text/css',
        rel: 'stylesheet',
      }, {
        href: '/company_manage/css/css.css',
        type: 'text/css',
        rel: 'stylesheet',
      }],
      script: [{
        src: 'https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js'
      }, {
        src: 'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js'
      }]
    }
    },
    name: 'admin',

    components: {
      Head, Foot,LeftNav
    }, 
    beforeRouteEnter(to, from, next){
      
    },
    mounted () {
        // if (!this.$store.state.authUser) {
        //    this.$router.push({ path: '/' })
        // }    
    }


  }
</script>

