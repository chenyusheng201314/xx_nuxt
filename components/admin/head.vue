<template>

  <div class="admin_head">
    <div class="admin_logo">
      <img class="logo" src="/admin/images/user/header.jpg" alt="">
      享学就学运营中心
    </div>
    <div class="admin_head_title">APP管理</div>
    <ul class="admin_head_manage">
      <li>
        <img src="/admin/images/user/header.jpg" alt="" class="header">
        <span class="f-18 col-nor">管理员账号</span>
      </li>
      <li>|</li>
      <li>
        <img src="/admin/images/icon-pwd.png" alt="">
        <span class="f-16 col-bule cur-point">修改密码</span>
      </li>
      <li>
        <img src="/admin/images/icon-exit.png" alt="">
        <span class="f-16 col-bule cur-point" @click="user_logout">退出登录</span>
      </li>
    </ul>

  
  </div>

</template>
<script>
  export default {
    name: 'admin_head',
    data() {
      return {
        menus: [
          {
            name: '首页',
            link: '/',
            active: true
          }, {
            name: '企业内训',
            link: '/ty',
            active: false
          }, {
            name: '导师秀',
            link: '/teacher/shows',
            active: false
          }, {
            name: '企业案例',
            link: '/case/list',
            active: false
          }, {
            name: '名师博客',
            link: '/blogs/list',
            active: false
          }, {
            name: 'APP下载',
            link: '/aa',
            active: false
          }, {
            name: '账户中心',
            link: '/mine/mine',
            active: false
          }
        ]
      }
    },
    methods: {
      check(index) {
        index = String(index)
        let menus = this.$data.menus
        for (let i in menus) {
          menus[i].active = false
          // console.log(typeof index, typeof i)
          if (index === i) {
            menus[i].active = true
          }
        }
      },
      async user_logout() {
        await this.$store.dispatch('admin_logout');
        this.$router.push({'path': '/admin/login'})
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let path = vm.$root._router.history.current.fullPath
        console.log('rou')
        // vm.$router.push('/mine/follow/followCourse')
      })
    },
    watch: {
      'this.$route'() {
        console.log(11122211)
      }
    },
    mounted() {
      // let path = this.$root._router.history.current
      let path = this.$root._router.history.current.fullPath.split('/')
      console.log(path)
    },
  }
 
 
 
</script>

<style scoped>
  .f-16 {
    font-size: 16px;
  }

  .f-18 {
    font-size: 18px;
  }

  .col-nor {
    color: #203B4E;
  }

  .col-bule {
    color: #4667B4;
  }

  .cur-point {
    cursor: pointer;
  }

  .admin_head .admin_logo .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .admin_head_manage li {
    float: left;
    margin-right: 30px;
  }

  .admin_head_manage li .header {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .admin_head_manage li img {
    margin-right: 15px;
  }
</style>
