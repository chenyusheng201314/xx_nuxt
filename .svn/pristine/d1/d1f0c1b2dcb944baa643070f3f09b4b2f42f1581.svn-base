<template>
  <div id="nav-head" class="container">
    <img class="cursor-pointer header-logo" src="/images/logo.png" alt="">
    <ul class="head-ul">
      <li class="cursor-pointer head-li" :class="{'head-li-active':item.active}"
          v-for="(item, index) in menus" :key="index" @click="check(index)">
        <router-link :to="item.link">{{item.name}}</router-link>
        <!--{{item.name}}-->
      </li>
    </ul>
    <div class=" login">
      <div class="d-inline-block cursor-pointer" @click="to_login">登录</div>
      <div class="d-inline-block line">|</div>
      <div class="d-inline-block cursor-pointer register" @click="to_register(true)">注册</div>
    </div>
    <!--登录分类-->
    <modal :data="classify">
      <div class="classify">
        <div class="classify-con">
          <div class="classify-close">
            <img src="/images/login/colse-cover.png" alt="" width="16">
          </div>
          <div class="classify-tit">
            <h4>选择你的会员类型</h4>
          </div>
          <div class="classify-type" v-for="(item,index) in classify_info" :class="{active:index === now_ind}"
               @mouseover="icon_change(index)" @click="type_to_login(item.login_type)" :key="index">
            <img :src="item.show_icon" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </modal>
    <!--登录-->
    <modal :data="login">
      <div class="login-cover">
        <div class="login-cover-con">
       <span class="cover-close" @click="login_close">
        <img src="/images/login/colse-cover.png" alt="" width="16">
      </span>
          <Login @to_register="to_register" @to_forget="to_forget"></Login>
        </div>
      </div>
    </modal>
    <!--注册-->
    <modal :data="zhuce">
      <div class="register-cover">
        <div class="register-con">
        <span class="cover-close" @click="register_close">
          <img src="/images/login/colse-cover.png" alt="" width="16">
       </span>
          <div class="register-tit">
            <div class="register-tit-left active">
              <img src="/images/login/register.png" alt="" width="13">
              账户登录
            </div>
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-phone.png" alt="" width="9">
            <input type="text" placeholder="请输入手机号" v-model="zhuce_info.phone">
          </div>
          <div class="register-yzm">
            <div class="yzm-left">
              <img src="/images/login/icon-yzm.png" alt="" width="15">
              <input type="text" placeholder="请输入验证码" v-model="zhuce_info.yzm">
            </div>
            <div class="yzm-right">
              <img src="/images/login/yzm.png" alt="">
            </div>
          </div>
          <div class="register-duanxin">
            <img src="/images/login/icon-duanxin.png" alt="" width="13">
            <input type="text" placeholder="输入短信码" v-model="zhuce_info.duanxin">
            <span class="line">|</span>
            <span class="get_num" @click="get_yzm">{{zhuce_info.duanxin_info}}</span>
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="请输入密码" v-model="zhuce_info.pwd">
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="再次输入密码" v-model="zhuce.pwd_again">
          </div>
          <p class="register-error" v-show="zhuce_info.error_type">
            <img src="/images/login/icon-error.png" alt="" width="12">
            {{zhuce_info.error_info}}
          </p>
          <div class="register-btn" @click="user_register">注 册</div>
          <div class="login-type">
            <div class="login-type-left">
          <span class="box" @click="agree_change">
            <img src="/images/login/icon-gou.png" alt="" width="12" v-show="zhuce_info.agree">
          </span>
              <span class="f12 color-999">我同意</span>
              <a href="javascript:;" class="f12 color-999">《服务条款》</a>
              <span class="f12 color-999">和</span>
              <a href="javascript:;" class="f12 color-999">《享学隐私政策》</a>
            </div>
            <div class="login-type-right">
              <span class="go-zhuce" @click="to_login">去登录 &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <!--忘记密码-->
    <modal :data="forget">
      <div class="forget">
        <div class="forgrt-con">
      <span class="forget-close" @click="forget_close">
          <img src="/images/login/colse-cover.png" alt="" width="16">
      </span>
          <div class="forget-tit">
            <div class="forget-tit-left active">
              <img src="/images/login/forget.png" alt="" width="16">
              忘记密码
            </div>
          </div>
          <div class="forget-inp">
            <img src="/images/login/icon-phone.png" alt="" width="9">
            <input type="text" placeholder="请输入手机号" v-model="forget_info.phone">
          </div>
          <div class="forget-duanxin">
            <img src="/images/login/icon-duanxin.png" alt="" width="13">
            <input type="text" placeholder="输入短信码" v-model="forget_info.yzm">
            <span class="line">|</span>
            <span class="get_num" @click="forget_get_yzm">{{forget_info.yzm_info}}</span>
          </div>
          <div class="forget-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="设置新密码" v-model="forget_info.pwd">
          </div>
          <div class="forget-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="再次输入新密码" v-model="forget_info.pwd_again">
          </div>
          <p class="forget-error" v-show="forget_info.error_show">
            <img src="/images/login/icon-error.png" alt="" width="12">
            {{forget_info.error_info}}
          </p>
          <div class="forget-btn" @click="user_forget">完 成</div>
          <div class="login-type">
            <div class="login-type-right">
              <span class="go-zhuce" @click="forget_go_login">去登录 &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>

</template>
<script>
  import Login from './login'
  import modal from '@/components/modal'

  export default {
    name: 'nav-head',
    components: {
      Login,
      modal
    },
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
            link: '/open/detail',
            active: false
          }, {
            name: '账户中心',
            link: '/mine/mine',
            active: false
          }
        ],
        login: {
          title: '',
          show: false,
          class: 'edit-pwd-modal'
        },
        classify: {
          title: '',
          show: false,
          class: 'edit-pwd-modal'
        },
        zhuce: {
          title: '',
          show: false,
          class: 'edit-pwd-modal'
        },
        forget: {
          title: '',
          show: false,
          class: 'edit-pwd-modal'
        },
        now_ind: 0,
        classify_info: [
          {
            name: '个人用户',
            show_icon: 'images/login/user-icon2.png',
            mouseover_icon: 'images/login/user-icon2.png',
            mouseleave_icon: 'images/login/user-icon1.png',
            login_type: 1
          },
          {
            name: '机构用户',
            show_icon: 'images/login/jigou-icon1.png',
            mouseover_icon: 'images/login/jigou-icon2.png',
            mouseleave_icon: 'images/login/jigou-icon1.png',
            login_type: 2
          },
          {
            name: '公司用户',
            show_icon: 'images/login/com-icon1.png',
            mouseover_icon: '/images/login/com-icon2.png',
            mouseleave_icon: '/images/login/com-icon1.png',
            login_type: 3
          }
        ],
        login_type: 0,   // 1 个人  2机构  3 企业.
        zhuce_info: {
          phone: '', // 注册手机号
          yzm: '', // 注册验证码
          duanxin: '', // 短信验证码
          pwd: '',
          pwd_again: '',
          error_type: false, // 错误信息提示
          error_info: '错误信息提示',
          agree: true, // 同意
          duanxin_info: '获取验证码',
          on_off: true, // 防恶意点击
          time: 60 // 60s后再次获取
        },
        forget_info: {
          phone: '',
          yzm: '',
          pwd: '',
          pwd_again: '',
          error_show: false,
          error_info: '错误信息',
          Isphone: /^1[34578]\d{9}$/,
          on_off: true,
          time: 60,
          yzm_info: '获取验证码',
          cover_show: true
        },
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
      // 登录页面关闭
      login_close() {
        this.login.show = false
      },
      icon_change(ind) {
        const that = this
        that.now_ind = ind
        $.each(that.classify_info, function (key, val) {
          if (key === ind) {
            val.show_icon = val.mouseover_icon
          } else {
            val.show_icon = val.mouseleave_icon
          }
        })
      },

      type_to_login(logintype) {
        this.login_type = logintype
        this.classify.show = false
        this.login.show = true
      },
      to_register(data) {
        this.zhuce.show = data;
        this.login.show = !data
      },
      to_forget (data){
        this.forget.show = data;
        this.login.show = !data
      },
      // 获取验证码
      get_yzm() {
        var that = this.zhuce_info
        if (that.on_off) {
          console.log(that.on_off)
          that.on_off = false
          var set = setInterval(function () {
            if (that.time > 1) {
              that.time--
              that.duanxin_info = that.time + 's'
            } else {
              that.time = 60
              clearInterval(set)
              that.duanxin_info = '获取验证码'
              that.on_off = true
            }
          }, 500)
        }
      },
      //  同意或者不同意
      agree_change() {
        this.zhuce_info.agree = !this.zhuce_info.agree
      },
      // 注册条件判断
      user_register() {
        var that = this.zhuce_info,
          Isphone = /^1[34578]\d{9}$/
        if (that.phone === '') {
          that.error_info = '手机号不能为空'
          that.error_type = true
        } else if (!Isphone.test(that.phone)) {
          that.error_info = '手机号格式不正确'
          that.error_type = true
        } else if (that.yzm === '') {
          that.error_info = '验证码不能为空'
          that.error_type = true
        } else if (that.duanxin === '') {
          that.error_info = '短信验证码不能为空'
          that.error_type = true
        } else if (that.pwd === '') {
          that.error_info = '密码不能为空'
          that.error_type = true
        } else if (that.pwd_again !== that.pwd) {
          that.error_info = '两次密码不一致'
          that.error_type = true
        } else if (!that.agree) {
          that.error_info = '是否同意政策'
          that.error_type = true
        } else {
          that.error_type = false
          console.log('发生请求，判断手机号是否存在！')
        }
      },
      //  去登陆
      to_login() {
        this.login.show = true
        this.zhuce.show = false
      },
      //  关闭弹窗
      register_close() {
        this.zhuce.show = false
      },
      //忘记密码
      user_forget() {
        const that = this.forget_info
        if (that.phone === '') {
          that.error_show = true
          that.error_info = '手机号码不能为空'
        } else if (that.Isphone.test(that.phone)) {
          that.error_show = true
          that.error_info = '手机号码格式不正确'
        } else if (that.yzm === '') {
          that.error_show = true
          that.error_info = '验证码不能为空'
        } else if (that.pwd === '') {
          that.error_show = true
          that.error_info = '新密码不能为空'
        } else if (that.pwd_again !== that.pwd) {
          that.error_show = true
          that.error_info = '两次密码不一致'
        }
      },
      forget_go_login() {
        this.forget.show = false
        this.login.show = true
      },
      //  获取验证码
      forget_get_yzm() {
        var that = this.forget_info
        if (that.on_off) {
          that.on_off = false
          let set = setInterval(function () {
            if (that.time > 1) {
              that.time--
              that.yzm_info = that.time + 's'
            } else {
              that.time = 60
              that.yzm_info = '获取验证码'
              that.on_off = true
              clearInterval(set)
            }
          }, 1000)
        }
      },
      //  弹窗关闭
      forget_close() {
        this.forget.show = false
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
      let menus = this.$data.menus
      for (let i in menus) {
        menus[i].active = false
        console.log(path[1], menus[i].link.split('/')[1])
        if (path[1] === menus[i].link.split('/')[1]) {
          this.$data.menus[i].active = true
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 0;
    margin-top: 20px;
  }

  .header-logo {
    width: 154px;
    height: 63px;
    vertical-align: super;
  }

  .head-ul {
    display: inline-block;
    list-style: none;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding-left: 20px;
    margin-bottom: 1rem;
  }

  .head-ul > .head-li {
    color: #666;
    float: left;
    margin: 0 30px;
  }

  .head-ul > .head-li a {
    padding: 16px 0;
  }

  .head-ul > .head-li-active {
    border-bottom: 1px solid #ff6900;
  }

  .head-ul > .head-li-active a {
    color: #ff6900;
  }

  .login {
    color: #666;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    float: right;
  }

  .login .line {
    font-size: 1.4rem;
    margin-left: 10px;
    margin-right: 10px;
    /*color: #ff6900;*/
  }

  .login-cover {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
    background: rgba(0, 0, 0, 0.6);
  }

  .login-cover-con {
    width: 440px;
    background: #fff;
    height: auto;
    padding: 40px;
    margin: 150px auto 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    position: relative;
  }

  .cover-close {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1000;
  }

  .classify {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }

  .classify-con {
    width: 440px;
    height: auto;
    padding: 40px 30px;
    background: #fff;
    margin: 150px auto;
    position: relative;
  }

  .classify-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .classify-con .classify-tit {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 2px solid #e0e0e0;
  }

  .classify-con .classify-tit h4 {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 20px;
    color: #ff6900;
    border-bottom: 3px solid #ff6900;
    margin: 0 auto;
  }

  .classify-con .classify-type {
    width: 100%;
    height: 100px;
    border: 1px solid #e0e0e0;
    margin-top: 35px;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    -ms-border-radius: 16px;
    -o-border-radius: 16px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
  }

  .classify-con .classify-type img {
    vertical-align: text-bottom;
    margin-right: 10px;
  }

  .classify-con .classify-type span {
    font-size: 20px;
    color: #666;
  }

  .classify-con .classify-type:hover {
    background: #ff6900;
  }

  .classify-con .classify-type:hover span {
    color: #fff;
  }

  .classify-con .classify-type.active {
    background: #ff6900;
  }

  .classify-con .classify-type.active span {
    color: #fff;
  }

  .f12 {
    font-size: 12px;
  }

  .color-999 {
    color: #999;
  }

  .register-cover {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .register-con {
    width: 440px;
    background: #fff;
    height: auto;
    padding: 40px;
    margin: 150px auto 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    position: relative;
  }

  .register-con .cover-close {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1000;
  }

  .register-tit {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .register-tit .register-tit-left {
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

  .register-tit .register-tit-left.active {
    color: #ff6900;
    border-bottom: 3px solid #ff6900;
  }

  .register-tit .register-tit-left img {
    vertical-align: text-top;
  }

  .register-inp, .register-yzm .yzm-left, .register-duanxin {
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

  .register-inp span {
    display: inline-block;
    line-height: 50px;
  }

  .register-inp input, .yzm-left input, .register-duanxin input {
    width: 300px;
    height: 46px;
    border: none;
    font-size: 15px;
    outline: none;
    float: right;
    background: #f9f9f9;
  }

  .register-yzm {
    width: 100%;
    height: 50px;
    overflow: hidden;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .register-yzm .yzm-left {
    width: 210px;
    float: left;
    margin-top: 0;
  }

  .register-yzm .yzm-left input {
    width: 150px;
  }

  .register-yzm .yzm-right {
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

  .register-duanxin input {
    width: 170px;
    float: none;
    height: 40px;
    margin-left: 5px;
  }

  .register-duanxin .line {
    font-size: 15px;
    color: #999;
  }

  .get_num {
    height: 50px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    float: right;
    cursor: pointer;
    width: 110px;
    text-align: center;
    font-size: 15px;
    color: #ff6900;
  }

  .register-error {
    width: 100%;
    height: auto;
    color: #ff5758;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 15px;
  }

  .register-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    background: #ff6900;
    color: #fff;
    border-radius: 55px;
    -webkit-border-radius: 55px;
    -moz-border-radius: 55px;
    -ms-border-radius: 55px;
    -o-border-radius: 55px;
    margin-top: 15px;
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
    margin-right: 5px;
  }

  .login-type .login-type-left a {
    text-decoration: none;
    margin: 0;
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

  .register-inp img, .register-yzm .yzm-left img, .register-duanxin img {
    vertical-align: center;
  }

  .forget {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .forgrt-con {
    width: 440px;
    background: #fff;
    height: auto;
    padding: 40px;
    margin: 150px auto 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    position: relative;
  }

  .forget-close {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1000;
  }

  .forget-tit {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .forget-tit .forget-tit-left {
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

  .forget-tit .forget-tit-left.active {
    color: #ff6900;
    border-bottom: 3px solid #ff6900;
  }

  .forget-inp, .forget-duanxin {
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

  .forget-inp span {
    display: inline-block;
    line-height: 50px;
  }

  .forget-inp input, .forget-duanxin input {
    width: 300px;
    height: 46px;
    border: none;
    font-size: 15px;
    outline: none;
    float: right;
    margin-left: 5px;
    background: #f9f9f9;
  }

  .forget-duanxin input {
    width: 170px;
    float: none;
    height: 40px;
  }

  .forget-duanxin .line {
    font-size: 15px;
    color: #999;
  }

  .forget-duanxin .get_num {
    height: 50px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    float: right;
    cursor: pointer;
    width: 110px;
    text-align: center;
    font-size: 15px;
    color: #ff6900;
  }

  .forget-error {
    width: 100%;
    height: auto;
    color: #ff5758;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 15px;
  }

  .forget-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    background: #ff6900;
    color: #fff;
    border-radius: 55px;
    -webkit-border-radius: 55px;
    -moz-border-radius: 55px;
    -ms-border-radius: 55px;
    -o-border-radius: 55px;
    margin-top: 15px;
    cursor: pointer;
  }

  .login-type {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
  }

  .login-type .login-type-right {
    float: right;
  }

  .login-type .login-type-right .go-zhuce {
    font-size: 12px;
    color: #ff6900;
    cursor: pointer;
  }

  .forget-inp img,.forget-duanxin img {
    vertical-align: 0px;
  }
</style>
<style>
  .edit-pwd-modal {
    width: 440px !important;
  }
</style>
