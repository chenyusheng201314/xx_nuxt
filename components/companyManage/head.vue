<template>

  <div class="admin_head">

    <div class="admin_logo" @click="router_link" style="cursor: pointer;">
 
      <img :src="$store.state.company.companyInfo.company_logo.value!==''?$store.state.company.companyInfo.company_logo.value:'/admin/images/user/header.jpg'" alt="" class="logo"  v-if="$store.state.company.companyInfo.company_logo">
      {{$store.state.company.companyInfo.company_name}}
    </div>
 
    <ul class="admin_head_manage">
      <li>
  
        <span class="f-18 col-nor"> {{$store.state.company.companyInfo.company_user.realname?$store.state.company.companyInfo.company_user.realname:$store.state.company.companyInfo.company_user.mobile}}</span>
      </li>
      <li>|</li>
      <li v-on:click="resetPW">
        <img src="/admin/images/icon-pwd.png" alt="">
        <span class="f-16  cur-point">修改密码</span>
      </li>
      <li>
        <img src="/admin/images/icon-exit.png" alt="">
        <span class="f-16 cur-point" @click="user_logout">退出登录</span>
      </li>
    </ul>


    <el-dialog title="修改密码" :visible.sync="dialogResetVisible" v-if="dialogResetVisible" width="40%">
        <el-form :model="addInfo" :rules="rules" ref="addInfo" style="margin-top:40px">
              <el-form-item label="用户名" label-width="120px">
                <el-input v-model="$store.state.company.companyUsername" :disabled="true" auto-complete="off" ></el-input>
             </el-form-item>
             <el-form-item label="原密码" label-width="120px"  prop="old_password">
                <el-input v-model="addInfo.old_password" auto-complete="off" ></el-input>
             </el-form-item>
             <el-form-item label="新密码" label-width="120px"  prop="password">
                <el-input v-model="addInfo.password" auto-complete="off" ></el-input>
             </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
 
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
        addInfo:{},
        rules:{ 
          old_password:[{ required: true, message: '必填', trigger: 'blur' }],
          password: [
            { required: true, message: '必填', trigger: 'blur' },
           {min:6, max:16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
           { pattern: /^[0-9a-zA-Z\d]+$/, message: '由6-16位数字或这字母组成' }
          ],
        },
        now_nav: '',
        dialogResetVisible:false,
        companyInfo:{company_logo:{value:''},company_name:'',company_user:{}}
      }
    },
    computed: {
      getNav() {
        return this.$store.state.admin.now_nav;
      }
    },
    async create() {
      
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
        this.$refs["addInfo"].validate(async (valid) => {
          if (valid) {
               let params = {url: "/company/company_user/change_password",data:this.addInfo}
               let res  = await this.$store.dispatch("companyHttpPost",params);
               if(res.code==0) {
                  this.$message({message: '密码修改成功',type: 'success'});
                  await this.$store.dispatch('company_logout');
                  this.$router.push({'path': '/'})
               }
               else {
                 this.$message.error("密码修改失败，"+res.message);
               }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },

      async user_logout() {
        await this.$store.dispatch('company_logout');
        this.$router.push({'path': '/'})
      },
      router_link() {
        this.$router.push({path: '/company_manage/'})
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
        
      },
      getNav(val) {
        this.now_nav = val;
      }
    },
    async mounted() {
      // let path = this.$root._router.history.current
      let path = this.$root._router.history.current.fullPath.split('/');
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
