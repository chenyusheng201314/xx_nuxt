<template>
  <div class="number-login">
    <div class="inp">
      <img src="/images/login/icon-phone.png" alt="" width="9">
      <input type="text" placeholder="请输入账号" v-model="login_number" @input="get_number">
    </div>
    <div class="inp">
      <img src="/images/login/icon-pwd.png" alt="" width="13">
      <input type="password" placeholder="请输入密码" v-model="login_pwd" @input="get_pwd">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'number-login',
    data () {
      return {
        wx_img: '/images/login/icon-wx1.png',
        qq_img: '/images/login/icon-qq1.png',
        login_number: '',
        login_pwd: ''
      }
    },
    methods: {
      wx_change (bool) {
        var that = this
        if (bool) {
          that.wx_img = '/images/login/icon-wx2.png'
        } else {
          that.wx_img = '/images/login/icon-wx1.png'
        }
      },
      qq_change (bool) {
        var that = this
        if (bool) {
          that.qq_img = '/images/login/icon-qq2.png'
        } else {
          that.qq_img = '/images/login/icon-qq1.png'
        }
      },
      // 向父组件回传用户名
      get_number () {
        var that = this
        this.$emit('get_number', that.login_number)
      },
      get_pwd () {
        var that = this
        this.$emit('get_pwd', that.login_pwd)
      }
    }

  }
</script>

<style scoped>
  .number-login {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .number-login .inp {
    margin-top: 30px;
    width: 358px;
    height: 50px;
    border: 1px solid #e0e0e0;
    font-size: 20px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    padding-left: 35px;
    background: #f9f9f9;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    line-height: 50px;
  }

  .number-login .inp span {
    display: inline-block;
    line-height: 50px;
  }

  .number-login .inp input {
    width: 300px;
    height: 46px;
    border: none;
    font-size: 15px;
    outline: none;
    float: right;
    background: #f9f9f9;
  }
</style>
