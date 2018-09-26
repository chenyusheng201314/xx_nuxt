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
        title: '官网管理',
        leftNav: [
          {
            name: '导师博客',
            link: '/admin/pc',
            active: true
          }, {
            name: '博客分类管理',
            link: '/admin/pc/blogClassify',
            active: false
          }, {
            name: '行业资讯',
            link: '/admin/pc/news',
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

    },
    head () {
      return {
        title:this.title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123"
        }],
        
      }
    }
  }
</script>

