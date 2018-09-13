<template>
  <div class="secret">
    <h1>超级隐私的页面</h1>
    <router-link to="/">返回主页</router-link>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'index',
  head () {
    return {
      title: "123",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
      link: [{
        rel: 'stylesheet',
        href: '/css/css.css'
      }],
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/js/index.js'
      }]
    }
  },

}
</script>