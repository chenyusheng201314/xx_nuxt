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
            name: '训练营',
            link: '/admin/training',
            active: true
          }, {
            name: '班级管理',
            link: '/admin/training/classManage',
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

