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
  import Head from '~/components/companyManage/head'
  import Foot from '~/components/companyManage/foot'

  export default {
    name: "company",
    components: {
      Head, Foot
    },
    head() {
      return {
        title: "欢迎登录享学就学企业后台",
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123"
        }],
        link: [
          {
            href: '/css/bootstrap.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/admin/css/css.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/css/element.css',
            type: 'text/css',
            rel: 'stylesheet',
          }],
        script: [{
          src: '/js/jquery.min.js'
        }]
      }
    },
  }
</script>

<style scoped>

</style>
