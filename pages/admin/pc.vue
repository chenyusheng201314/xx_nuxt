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
        leftNav: []
      }
    },
    components: {
      LeftNav
    },
    methods: {
      setMeau() {
        let leftNav = []
        let roles = this.$store.state.admin.adminRole.data
        //博客
        let blog = this.comsys.adminGetMeau(roles, "blog")
        let blog_list = []
        let blog_sort_list = []
        if (blog.length > 0) {
          blog_list = this.comsys.adminGetMeau(blog[0].son, "blog_list")
          blog_sort_list = this.comsys.adminGetMeau(blog[0].son, "blog_sort_list")
        }

        if (blog_list.length > 0) {
          leftNav.push({name: '导师博客', link: '/admin/pc', active: false})
        }
        if (blog_sort_list.length > 0) {
          leftNav.push({name: '博客分类管理', link: '/admin/pc/blogClassify', active: false})
        }

        //行业资讯
        let news = this.comsys.adminGetMeau(roles, "news")
        let news_list = []
        if (news.length > 0) {
          news_list = this.comsys.adminGetMeau(news[0].son, "news_list")
        }
        if (news_list.length > 0) {
          leftNav.push({name: '行业资讯', link: '/admin/pc/news', active: false})
        }
        //报名信息
        let sign_up_msg = this.comsys.adminGetMeau(roles, "sign_up_msg")
        let msg_list = [];
        if (sign_up_msg.length > 0) {
          msg_list = this.comsys.adminGetMeau(sign_up_msg[0].son, "msg_list")
        }
        if (msg_list.length > 0) {
          leftNav.push({name: '报名信息', link: '/admin/pc/enroll', active: false})
        }
        leftNav[0].active = true;
        leftNav.push({name: '友情链接', link: '/admin/pc/blogroll', active: false});
        leftNav.push({name: '官网首页配置', link: '/admin/pc/setting', active: false});
        this.leftNav = leftNav;
      },

    },
    mounted() {
      this.setMeau()

    },
    head() {
      return {
        title: this.title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123"
        }],

      }
    }
  }
</script>

