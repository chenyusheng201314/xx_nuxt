<template>
  <div class="login">
    <div class="login-left">
      <img src="/admin/images/login/login-bg.png" alt="">
    </div>
    <div class="login-right">
      <h2>欢迎登录享学就学企业管理中心</h2>
      <p class="english-welcome">Welcome back</p>
      <div class="login-inp first">
        <img src="/admin/images/login/phone.png" alt="">
        <input type="text" placeholder="请输入账户" v-model="mobile">
      </div>
      <div class="login-inp">
        <img src="/admin/images/login/pwd.png" alt="">
        <input type="password" placeholder="请输入密码" v-model="pwd" @keydown.13="key_login($event)">
      </div>
      <p class="err_info" v-show="error_show">{{error_info}}</p>
      <div class="login-btn">
        <p @click="user_login">登 录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    layout: 'login',
    name: "login",
    data() {
      return {
        mobile: '',
        pwd: '',
        error_info: '错误信息',
        error_show: false,
        baseUrl: ''
      }
    },
    methods: {
      key_login(e) {
        const that = this;
        if (e.keyCode === 13) {
          that.user_login();
        }

      },
      //  登录
      async user_login() {
        const that = this;
        let ht = {};
        if (that.mobile === '' || that.pwd === '') {
          that.error_info = '账户密码不能为空';
          that.error_show = true;
        } else {
          ht.mobile = that.mobile;
          ht.password = that.pwd;
          //  条件判断成功 发送请求
          let res = await that.$store.dispatch('company_login', ht);
          console.log("abc",res);
          // if (res === 0) {
          //   that.error_info = '账户或密码错误';
          //   that.error_show = true;
          // } else {
          //   that.error_show = false;
          //   this.$router.push({'path': '/company_manage'})
          // }
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .login {
    width: 100%;
    height: auto;
    background: #fff;
    overflow: hidden;
  }

  .login .login-left {
    width: 1239px;
    float: left;
  }

  .login .login-right {
    float: right;
    width: calc(100% - 1239px);
    height: auto;
  }

  .login .login-right h2 {
    width: 100%;
    text-align: center;
    color: #2E4769;
    font-size: 27px;
    margin-top: 300px;
    font-weight: normal;
  }

  .login .login-right .english-welcome {
    color: #9FB7D6;
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 0;
  }

  .login .login-right .login-inp {
    width: 410px;
    height: 50px;
    margin: 20px auto;
    border: 1px solid #E2ECF2;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    padding: 0 20px;
  }

  .login .login-right .login-inp.first {
    margin-top: 80px;
  }

  .login .login-right .login-inp.active {
    border: 1px solid #4667B4;
  }

  .login .login-right .login-inp img {
    display: inline-block;
    margin-top: 13px;
  }

  .login .login-right .login-inp input {
    width: 335px;
    height: 40px;
    margin-top: 5px;
    float: right;
    border: none;
    outline: none;
    font-size: 16px;
    color: #4667B4;
  }

  .login .login-right .login-inp input.yzm {
    width: 200px;
  }

  .login .login-right .login-inp .line {
    float: right;
    height: 24px;
    width: 1px;
    margin-top: 13px;
    background: #9FB7D6;
  }

  .login .login-right .login-inp .get-yzm {
    float: right;
    width: 130px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #4667B4;
    font-size: 16px;
    cursor: pointer;
  }

  .login .login-right .login-btn {
    width: 463px;
    height: 113px;
    background: url("/admin/images/login/btn.png") no-repeat;
    margin: 88px auto 0;
    overflow: hidden;

  }

  .login .login-right .login-btn p {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    line-height: 60px;
    margin-top: 15px;
    cursor: pointer;
  }

  .login .login-right .err_info {
    font-size: 16px;
    color: #f65b79;
    text-align: center;
    margin-top: 20px;
  }
</style>
