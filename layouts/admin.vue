<template>
  <div class='admin_main'>
    <!--顶部导航-->
    <Head/>
    <nuxt/>
    <!--页脚-->
    <Foot/>
  </div>
</template>

<script>
  import Head from '~/components/admin/head'
  import Foot from '~/components/admin/foot'
  import axios from 'axios'

  export default {
    middleware: 'auth',

    head () {
    return {
      title: this.seoTitle,
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
        href: '/admin/css/css.css',
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
      Head, Foot
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

