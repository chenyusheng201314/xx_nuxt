<template>
  <div class="phone-login">
    <div class="inp">
      <img src="/images/login/icon-phone.png" alt="" width="9">
      <input type="text" placeholder="请输入手机号" v-model="login_phone" @input="get_phone">
    </div>
    <div class="yzm">
      <div class="yzm-left">
        <img src="/images/login/icon-yzm.png" alt="" width="15">
        <input type="text" placeholder="请输入验证码" v-model="login_yzm" @input="get_yzm">
      </div>
      <div class="yzm-right">
        <img src="/images/login/yzm.png" alt="">
      </div>
    </div>
    <div class="inp">
      <img src="/images/login/icon-pwd.png" alt="" width="13">
      <input type="password" placeholder="请输入密码" v-model="login_pwd" @input="get_pwd">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'phone-login',
    data () {
      return {
        login_phone: '',
        login_pwd: '',
        login_yzm: ''
      }
    },
    methods: {
      get_phone () {
        var that = this
        this.$emit('get_phone', that.login_phone)
      },
      get_yzm () {
        var that = this
        this.$emit('get_yzm', that.login_yzm)
      },
      get_pwd () {
        var that = this
        this.$emit('get_pwd', that.login_pwd)
      }
    }
  }
</script>

<style scoped>
  .phone-login{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .phone-login .inp,.phone-login .yzm-left {
    margin-top: 15px;
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
  .phone-login .yzm{
    width: 100%;
    height: 50px;
    overflow: hidden;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .phone-login .yzm-left{
    width: 210px;
    float: left;
    margin-top: 0;
  }

  .phone-login .inp span {
    display: inline-block;
    line-height: 50px;
  }

  .phone-login .inp input,.phone-login .yzm-left input {
    width: 300px;
    height: 46px;
    border: none;
    font-size: 15px;
    outline: none;
    float: right;
    background: #f9f9f9;
  }
  .phone-login .yzm-left input{
    width: 150px;
  }
  .phone-login  .yzm-right{
    float: right;
    width: 130px;
    height: 50px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    overflow: hidden;
  }
</style>
