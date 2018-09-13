<template>
  <div class="wx-login">
    <span class="wx-close" @click="wx_close">
      <img src="/images/login/wx-close.png" alt="">
    </span>
    <h2>微信登录</h2>
    <div class="wx-ewm">
      <img :src="wx_rwm" alt="">
    </div>
    <div class="wx-sm">
      <p style="margin-top: 8px">请使用微信扫描二维码登录</p>
      <p>“享学就学网Web”</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wx-login',
    data () {
      return {
        wx_rwm: '/images/login/wx-rwm.png'
      }
    },
    methods: {
      wx_close () {
        this.$emit('wx_login_close', false)
      }
    }
  }
</script>

<style scoped>
  .wx-login {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1002;
    background: #333333;
    width: 100%;
    height: 100%;

  }

  .wx-login .wx-close {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1003;
    cursor: pointer;
  }

  .wx-login h2 {
    margin-top: 50px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: normal;
  }

  .wx-login .wx-ewm {
    margin: 20px auto 0;
    width: 280px;
    height: 280px;
  }

  .wx-login .wx-sm {
    margin: 20px auto 0;
    background: #232323;
    width: 280px;
    height: 55px;
    border-radius: 55px;
    -webkit-border-radius: 55px;
    -moz-border-radius: 55px;
    -ms-border-radius: 55px;
    -o-border-radius: 55px;
    overflow: hidden;
  }

  .wx-login .wx-sm p {
    margin: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
