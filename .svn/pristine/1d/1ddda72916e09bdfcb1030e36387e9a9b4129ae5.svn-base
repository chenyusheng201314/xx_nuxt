<template>
  <div>
    <div class="login-tit">
      <div class="login-tit-left" :class="{active:tab_type === 1}" @click="tab_change(1)">
        <img :src="login_tab.number_img" alt="">
        账户登录
      </div>
      <div class="login-tit-left" :class="{active:tab_type === 2}" @click="tab_change(2)">
        <img :src="login_tab.phone_img" alt="">
        手机登录
      </div>
      <NumberLogin v-show="tab_type ===1" :login_number="login_number" :login_pwd="login_pwd" @get_number="get_number" @get_pwd="get_pwd"></NumberLogin>
      <PhoneLogin v-show="tab_type ===2" :login_phone="login_phone" :login_pwd="login_pwd" :login_yzm="login_yzm" @get_phone="get_phone" @get_yzm="get_yzm" @get_pwd="get_pwd"></PhoneLogin>
      <p class="login-error" v-show="error_show">
        <img src="/images/login/icon-error.png" alt="" width="12">
        {{error_info}}
      </p>
      <div class="login-btn" @click="user_login">登 录</div>
      <div class="login-type">
        <div class="login-type-left">
          <span class="box" @click="change_remember">
            <img src="/images/login/icon-gou.png" v-show="remember_type" alt="" width="12">
          </span>
          <span class="f12 color-999">十天免登录</span>
          <span class="f12 color-999">|</span>
          <span class="f12 color-999 forget-pwd" @click="go_forget">忘记密码</span>
        </div>
        <div class="login-type-right">
          <span class="go-zhuce" @click="go_register">去注册 &gt;</span>
        </div>
      </div>
      <ul class="other-login">
        <li><p>其他登录方式</p></li>
        <li>
          <img :src="wx_img" alt="" width="35" @mouseover="wx_change(true)" @mouseleave="wx_change(false)" @click="wx_login">
          <p>微信</p>
        </li>
        <li>
          <img :src="qq_img" alt="" width="35" @mouseover="qq_change(true)" @mouseleave="qq_change(false)">
          <p>QQ</p>
        </li>
      </ul>
    </div>
    <WxLogin v-show="wx_type" @wx_login_close="wx_close"></WxLogin>
  </div>
</template>

<script>
  import NumberLogin from './number-login'
  import PhoneLogin from './phone-login'
  import WxLogin from './wx-login'

  export default {
    name: 'login',
    components: {
      NumberLogin,
      PhoneLogin,
      WxLogin
    },
    data () {
      return {
        login_tab: {
          number_img: '/images/login/number-login1.png',
          phone_img: '/images/login/phone-login.png'
        },
        tab_type: 1, // 1表示账户登录  2表示手机登录  默认账户登录
        wx_img: '/images/login/icon-wx1.png',
        qq_img: '/images/login/icon-qq1.png',
        remember_type: true, // 十天免登陆 默认是打钩
        wx_type: false, // 是否用微信登录
        login_number: '',
        login_pwd: '',
        login_phone: '',
        login_yzm: '',
        error_info: '这里是错误提示',
        error_show: false

      }
    },
    methods: {
      // 登录方式切换
      tab_change (num) {
        this.tab_type = num
      },
      // 鼠标滑过微信
      wx_change (bool) {
        var that = this
        if (bool) {
          that.wx_img = '/images/login/icon-wx2.png'
        } else {
          that.wx_img = '/images/login/icon-wx1.png'
        }
      },
      // 鼠标滑过qq
      qq_change (bool) {
        var that = this
        if (bool) {
          that.qq_img = '/images/login/icon-qq2.png'
        } else {
          that.qq_img = '/images/login/icon-qq1.png'
        }
      },
      //  十天免登陆切换
      change_remember () {
        this.remember_type = !this.remember_type
      },
      // 微信登录
      wx_login () {
        this.wx_type = true
      },
      // 微信登录关闭
      wx_close (data) {
        this.wx_type = data
      },
      // 获取登录账户
      get_number (data) {
        this.login_number = data
      },
      // 获取登录密码
      get_pwd (data) {
        this.login_pwd = data
      },
      //  获取手机号
      get_phone (data) {
        this.login_phone = data
      },
      //  获取验证码
      get_yzm (data) {
        this.login_yzm = data
      },
      //  登录
      user_login () {
        var that = this
        // var arr = [
        //   function () {
        //     if (that.login_number === '') {
        //       that.error_show = true
        //       that.error_info = '账户不能为空'
        //     } else {
        //       that.error_show = false
        //       that.error_info = ''
        //     }
        //   },
        //   function () {
        //     if (that.login_pwd === '') {
        //       that.error_show = true
        //       that.error_info = '密码不能为空'
        //     } else {
        //       that.error_show = false
        //       that.error_info = ''
        //     }
        //   }
        // ]

        var Isphone = /^1[34578]\d{9}$/

        if (that.tab_type === 1) {
          if (that.login_number === '') {
            that.error_show = true
            that.error_info = '账户不能为空'
          } else if (that.login_pwd === '') {
            that.error_show = true
            that.error_info = '密码不能为空'
          } else {
            that.error_show = false
            console.log('请求借口，发送登录信息，判断对错')
          }
        } else if (that.tab_type === 2) {
          if (that.login_phone === '') {
            that.error_show = true
            that.error_info = '手机号不能为空'
          } else if (!Isphone.test(that.login_phone)) {
            that.error_show = true
            that.error_info = '手机号格式不正确'
          } else if (that.login_yzm === '') {
            that.error_show = true
            that.error_info = '验证码不能为空'
          } else if (that.login_yzm === '123456') {
            that.error_show = true
            that.error_info = '验证码错误'
          } else if (that.login_pwd === '') {
            that.error_show = true
            that.error_info = '密码不能为空'
          } else {
            that.error_show = false
            console.log('请求借口，发送登录信息，判断对错')
          }
        }
      },
      //  去注册
      go_register () {
        this.$emit('to_register',true)
      },
      //  忘记密码
      go_forget () {
        this.$emit('to_forget',true)
      }
    },
    // 监听导航的切换
    watch: {
      tab_type () {
        var that = this
        if (that.tab_type === 1) {
          that.login_tab.number_img = '/images/login/number-login1.png'
          that.login_tab.phone_img = '/images/login/phone-login.png'
        } else if (that.tab_type === 2) {
          that.login_tab.phone_img = '/images/login/phone-login1.png'
          that.login_tab.number_img = '/images/login/number-login.png'
        }
      }
    }
  }
</script>

<style scoped>
  .f12 {
    font-size: 12px;
  }
  .color-999 {
    color: #999;
  }

  .login-tit {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .login-tit-left {
    width: 50%;
    float: left;
    text-align: center;
    font-size: 20px;
    color: #333;
    height: 35px;
    line-height: 35px;
    border-bottom: 2px solid #dcdcdc;
    cursor: pointer;
  }

  .login-tit-left.active {
    color: #ff6900;
    border-bottom: 3px solid #ff6900;
  }

  .login-tit-left img{
    vertical-align: text-top;
  }
  .login-error {
    width: 100%;
    height: auto;
    color: #ff5758;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 15px;
  }

  .login-btn {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    background: #ff6900;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    margin-top: 20px;
    cursor: pointer;
  }

  .login-type {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
  }

  .login-type .login-type-left {
    float: left;
  }

  .login-type .login-type-left .box {
    width: 14px;
    height: 14px;
    border: 1px solid #ccc;
    float: left;
    cursor: pointer;
    text-align: center;
    line-height: 9px;
    margin-top: 3px;
  }

  .login-type .login-type-left .f12.color-999 {
    margin-left: 5px;
  }

  .login-type .login-type-left .forget-pwd {
    cursor: pointer;
  }

  .login-type .login-type-right {
    float: right;
  }

  .login-type .login-type-right .go-zhuce {
    font-size: 12px;
    color: #ff6900;
    cursor: pointer;
  }

  .other-login {
    padding: 0;
    margin-top: 20px;
    margin-bottom: 0;
    overflow: hidden;
  }

  .other-login li {
    float: left;
    margin-right: 30px;

  }

  .other-login li p {
    font-size: 15px;
    color: #999;
    text-align: center;
    margin-top: 7px;
    margin-bottom: 0;
  }

  .other-login li img {
    cursor: pointer;
  }
</style>
