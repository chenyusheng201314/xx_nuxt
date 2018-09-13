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
  name: 'recharge',
  
  data () {
    return {
      title: '广告',
      leftNav: [
        {
          name: '创建消息',
          link: '/admin/sendMsg',
          active: true
        }, {
          name: '历史消息',
          link: '/admin/sendMsg/list',
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
  
  },
  head () {
    return {
      title: "机构",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/admin/js/ueditor/ueditor.config.js'
      }, {
        src: '/admin/js/ueditor/ueditor.all.min.js'
      },{
        src: '/admin/js/ueditor/lang/zh-cn/zh-cn.js'
      }

      ]
    }
  }
}
</script>

