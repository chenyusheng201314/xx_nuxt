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
        leftNav: [
          {
            name: '首页配置',
            link: '/admin/app',
            active: true
          }, {
            name: '更新管理',
            link: '/admin/app/update',
            active: false
          }, {
            name: '闪屏广告',
            link: '/admin/app/adv',
            active: false
          }, {
            name: '意见反馈',
            link: '/admin/app/feedback',
            active: false
          }
        ]
      }
    },
    components: {
      LeftNav
    },
    methods: {},
    mounted() {

    }
  }
</script>

