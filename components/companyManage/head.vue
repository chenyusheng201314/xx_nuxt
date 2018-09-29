<template>

  <div class="admin_head">
    <div class="admin_logo" @click="router_link" style="cursor: pointer;">
      <img class="logo" src="/admin/images/user/header.jpg" alt="">
      享学就学企业后台
    </div>
    <div class="admin_head_title">{{now_nav}}</div>
    <ul class="admin_head_manage">
      <li>
        <img src="/admin/images/user/header.jpg" alt="" class="header">
        <span class="f-18 col-nor">{{$store.state.admin.adminUsername}}</span>
      </li>
      <li>|</li>
      <li v-on:click="resetPW">
        <img src="/admin/images/icon-pwd.png" alt="">
        <span class="f-16 col-bule cur-point">修改密码</span>
      </li>
      <li>
        <img src="/admin/images/icon-exit.png" alt="">
        <span class="f-16 col-bule cur-point" @click="user_logout">退出登录</span>
      </li>
    </ul>


    <el-dialog title="修改密码" :visible.sync="dialogResetVisible" width="40%">
      <el-form :model="addInfo" :rules="rules" ref="addInfo">
        <el-form-item label="训练营名称" label-width="120px">
          <el-input v-model="$store.state.admin.adminUsername" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="原密码" label-width="120px" prop="old_password">
          <el-input v-model="addInfo.old_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="password">
          <el-input v-model="addInfo.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button v-on:click="cancelReset()">取 消</el-button>
        <el-button type="primary" v-on:click="submitReset()">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>
<script>
  export default {
    name: 'admin_head',
    data() {
      return {
        addInfo: {},
        rules: {
          old_password: [{required: true, message: '必填', trigger: 'blur'}],
          password: [{required: true, message: '必填', trigger: 'blur'}],
        },
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
        ],
        now_nav: '',
        dialogResetVisible: false
      }
    },
    computed: {
      getNav() {
        return this.$store.state.admin.now_nav;
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
      cancelReset() {
        this.dialogResetVisible = false
      },
      resetPW() {
        this.dialogResetVisible = true
        this.addInfo = {}
      },
      async submitReset() {
        console.log(this.addInfo)
        let params = {url: "/manage/manage/update_password", data: this.addInfo}
        let res = await this.$store.dispatch("adminHttpPost", params);
        console.log(res)
        if (res.code == 0) {
          this.$message({message: '密码修改成功', type: 'success'});
          await this.$store.dispatch('admin_logout');
          this.$router.push({'path': '/admin/login'})
        }
        else {
          this.$message.error("密码修改失败，" + res.message);
        }
      },

      async user_logout() {
        await this.$store.dispatch('admin_logout');
        this.$router.push({'path': '/admin/login'})
      },
      router_link() {
        this.$router.push({path: '/admin'})
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
      getNav(val) {
        this.now_nav = val;
      }
    },
    mounted() {
      // let path = this.$root._router.history.current
      let path = this.$root._router.history.current.fullPath.split('/');
      console.log(path);
      this.now_nav = this.$store.state.admin.now_nav;
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
