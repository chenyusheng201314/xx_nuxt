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
      title: '广告',
      leftNav: [
        {
          name: '最新上架',
          link: '/admin/sale',
          active: true
        }, {
          name: '精品课程',
          link: '/admin/sale/course',
          active: false
        }, {
          name: '特价课程',
          link: '/admin/sale/atSale',
          active: false
        }, {
          name: '积分购',
          link: '/admin/sale/integral',
          active: false
        } 
      ]
    }
  },
  components: {
      LeftNav
    },
  methods: {
 
 
  },
  mounted () {
  
  }
}
</script>

