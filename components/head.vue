<template>
  <div id="nav-head" class="container position-sticky head">
    <nuxt-link target="_blank" to="/">
      <img class="cursor-pointer header-logo" src="/images/logo.png" alt="">
      <!--@click="check(0)"-->
    </nuxt-link>
    <div class="position-relative d-inline-block">
      <ul class="head-ul">
        <li class="cursor-pointer head-li"
            :class="{'head-li-active':item.active,'train-shadow bg-white':hindex===1&&index===1}"
            v-for="(item, index) in menus" :key="index" @mouseenter="hindex=index" @mouseleave="hindex=-1">
          <!--@click="check(index)"-->
          <router-link target="_blank" :to="item.link">{{item.name}}</router-link>
          <ul v-if="hindex===1 &&index===1" class="bg-white select-train">
            <li :class="{active: tindex===ind+1}" v-for="(it,ind) in item.list" :key="ind">
              <!--@click="trainSele(ind+1)"-->
              <a target="_blank" :href="'/openStatic/2'+(ind+1)">{{it}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <!--<ul class="position-absolute bg-white black select-train" v-show="hindex===1">-->
      <!--<li>房产行业</li>-->
      <!--<li>服装行业</li>-->
      <!--<li>金融行业</li>-->
      <!--<li>汽车行业</li>-->
      <!--<li>物流行业</li>-->
      <!--<li>医药行业</li>-->
      <!--<li>IT行业</li>-->
      <!--</ul>-->
    </div>


    <div class="login">
      <div v-if="$store.state.isLogin">
        <a target="_blank" href="/mine/mine/mine01trip/total">
          <div class="d-inline-block head-avatar" :style="'background-image: url('+$store.state.user.photo+');'" v-if="$store.state.user"></div>
        </a>
        <div class="d-inline-block">
          <a target="_blank" class="person-center" href="/mine/mine/mine01trip/total">账户中心</a>
          <div class="d-inline-block line">|</div>
          <div class="d-inline-block cursor-pointer register">
            <el-button type="text" class="login-out" @click="login_out">注销</el-button>
          </div>
        </div>

      </div>

      <div v-else>
        <div class="d-inline-block cursor-pointer" @click="to_login">登录</div>
        <div class="d-inline-block line">|</div>
        <div class="d-inline-block cursor-pointer register" @click="to_register(true)">注册</div>

      </div>
    </div>
    <!--登录分类-->
    <div class="classify" v-show="classify.show">
      <div class="classify-con">
        <div class="classify-close" @click="colse_classify">
          <img src="/images/login/colse-cover.png" alt="" width="16">
        </div>
        <div class="classify-tit">
          <h4>选择你的会员类型</h4>
        </div>
        <div class="classify-type" v-for="(item,index) in classify_info" :class="{active:index === now_ind}"
             @mouseover="icon_change(index)" @click="type_to_login(item.login_type)" :key="index" v-if="item.login_type !==2">
          <img :src="item.show_icon" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <!--个人 登录  账号登录和 重置密码-->
    <Login v-if="login.show" :login_type="login_type" @to_register="to_register" @login_close="login_close"></Login>
    <!--<div class="login-cover" :data="login">-->
      <!--<div class="login-cover-con">-->
       <!--<span class="cover-close" @click="">-->
        <!--<img src="/images/login/colse-cover.png" alt="" width="16">-->
      <!--</span>-->

      <!--</div>-->
    <!--</div>-->
    <!--个人 注册-->
    <modal :data="zhuce">
      <div class="register-cover">
        <div class="register-con">
        <span class="cover-close" @click="register_close">
          <img src="/images/login/colse-cover.png" alt="" width="16">
       </span>
          <div class="register-tit">
            <div class="register-tit-left active">
              <img src="/images/login/register.png" alt="" width="13">
              用户注册
            </div>
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-phone.png" alt="" width="9">
            <input type="text" placeholder="请输入手机号" v-model="zhuce_info.phone">
          </div>
          <!--<div class="register-yzm">-->
            <!--<div class="yzm-left">-->
              <!--<img src="/images/login/icon-yzm.png" alt="" width="15">-->
              <!--<input type="text" placeholder="请输入验证码" v-model="zhuce_info.yzm">-->
            <!--</div>-->
            <!--<div class="yzm-right">-->
              <!--<img src="/images/login/yzm.png" alt="">-->
            <!--</div>-->
          <!--</div>-->
          <div class="register-duanxin">
            <img src="/images/login/icon-duanxin.png" alt="" width="13">
            <input type="text" placeholder="输入短信验证码" v-model="zhuce_info.duanxin">
            <span class="line">|</span>
            <span class="get_num" @click="get_yzm">{{zhuce_info.duanxin_info}}</span>
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="请输入密码" v-model="zhuce_info.pwd">
          </div>
          <div class="register-inp">
            <img src="/images/login/icon-pwd.png" alt="" width="13">
            <input type="password" placeholder="再次输入密码" v-model="zhuce_info.pwd_again">
          </div>

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
              <span class="go-zhuce" @click="type_to_login(1)">去登录 &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>

</template>
<script>
  import axios from 'axios'
  import Login from './login'
  import modal from '@/components/modal'

  export default {
    name: 'nav-head',
    head () {
      return {
        link: [
          {
            href: '/css/login.css',
            type:'text/css',
            rel: 'stylesheet',
          }
        ]
      }
    },
    components: {Login, modal},
    data() {
      return {
        menus: [
          {
            name: '首页',
            link: '/',
            active: true
          },
          {
            name: '企业解决方案',
            link: '/openStatic/21',
            active: false,
            list: [
              '房产行业',
              '服装行业',
              '金融行业',
              '汽车行业',
              '物流行业',
              '医药行业',
              'IT行业'
            ]
          },
          {
            name: '导师秀',
            link: '/teacher/shows',
            active: false
          },
          {
            name: '企业案例',
            link: '/case/list',
            active: false
          },
          {
            name: '名师博客',
            link: '/blogs/list',
            active: false
          },
          {
            name: 'APP下载',
            link: '/download',
            active: false
          }
        ],
        hindex: -1,//企业解决方案
        tindex: -1,

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

        // 分类
        now_ind: 0,
        type_show: false,
        classify_info: [
          {
            name: '个人用户',
            show_icon: '/images/login/user-icon2.png',
            mouseover_icon: '/images/login/user-icon2.png',
            mouseleave_icon: '/images/login/user-icon1.png',
            login_type: 1
          },
          {
            name: '机构用户',
            show_icon: '/images/login/jigou-icon1.png',
            mouseover_icon: '/images/login/jigou-icon2.png',
            mouseleave_icon: '/images/login/jigou-icon1.png',
            login_type: 2
          },
          {
            name: '公司用户',
            show_icon: '/images/login/com-icon1.png',
            mouseover_icon: '/images/login/com-icon2.png',
            mouseleave_icon: '/images/login/com-icon1.png',
            login_type: 3
          }
        ],

        login_type: 0,   // 1 个人  2机构  3 企业.
        zhuce_info: {
          phone: '', // 注册手机号

          duanxin: '', // 短信验证码
          pwd: '',
          pwd_again: '',

          agree: true, // 同意
          duanxin_info: '获取验证码',
          on_off: true, // 防恶意点击
          time: 60 // 60s后再次获取
        }
      }
    },
    watch:{

      'classify.show' (v) {
        if (v) {
          document.getElementsByTagName('body')[0].className = 'modal-open'
        }else {
          document.getElementsByTagName('body')[0].className = ''
        }
      },
      'login.show' (v) {
        console.log(v)
        if (v) {
          document.getElementsByTagName('body')[0].className = 'modal-open'
        }else {
          document.getElementsByTagName('body')[0].className = ''
        }
      }
    },
    methods: {
      // 注销
      login_out() {
        let that = this
        this.$confirm('确定退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await axios.post('/api/logout')
          that.$store.commit('SET_USER', {})
          that.$store.commit('setUserIsLogin', 0)
          that.$store.commit('setUser', {})

          that.$router.replace({'path': '/'});
        }).catch(() => {
          that.$message.error('操作异常，请重试！');
        });


      },
      // 切换选择 tab  使用a target=_blank时 不用此方法
      check(index) {
        if (index === 1) {
          this.hindex = 1
        } else {
          this.tindex = -1,
            index = String(index)

          let menus = this.menus
          for (let i in menus) {
            menus[i].active = false
            // console.log(index, i)
            if (index === i) {
              menus[i].active = true
            }
          }
        }
      },
      // 选择 企业解决方案
      trainSele(ind) {
        let menus = this.menus
        for (let i in menus) {
          menus[i].active = false
        }
        menus[1].active = true
        this.tindex = ind
        this.$router.push('/openStatic/2' + ind)
      },
      // 登录页面关闭
      login_close() {
        //this.login.show = false
        this.$set(this.login, 'show', false)
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
        this.login_type = logintype;
        this.classify.show = false;
        this.zhuce.show = false;
        this.login.show = true
      },
      to_register(data) {
        this.login.show = !data
        this.zhuce.show = data;

      },

      // 获取验证码
      async get_yzm() {
        var that = this.zhuce_info
        if (that.on_off) {
          // 防抖
          that.on_off = false
          // console.log(that.phone,!this.iphone(that.phone))
          if (that.phone === '') {
            this.$message({
              message: '手机号不能为空~',
              type: 'warning'
            })
            that.on_off = true
          } else if (!this.iphone(that.phone)) {
            this.$message({
              message: '手机号格式不正确~',
              type: 'warning'
            })
            that.on_off = true
          } else {
            // type: 1注册 2 找回
            let res = await axios({
              method: 'post',
              url: this.$store.state.mineBaseURL + '/api/common/sms/send',
              data:
                {
                  mobile: that.phone,
                  type: 1
                }
            })
            console.log('发送验证码', res.data)
            if (res.data.code === 0) {
              this.$message({
                message: '验证码已发送，请注意查收~',
                type: 'success'
              })
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
              }, 1000)
            } else if (res.data.code === 1) {
              this.$message.error('该手机号已注册，请直接登录！')
            } else {
              this.$message.error(res.data.message)
            }

          }
        }
      },
      //  同意或者不同意
      agree_change() {
        this.zhuce_info.agree = !this.zhuce_info.agree
      },
      // 注册条件判断
      async user_register() {
        var that = this.zhuce_info

        if (that.phone === '') {
          this.$message({
            message: '手机号不能为空~',
            type: 'warning'
          })
        } else if (!this.iphone(that.phone)) {
          this.$message({
            message: '手机号格式不正确~',
            type: 'warning'
          })
        } else if (that.duanxin === '') {
          this.$message({
            message: '短信验证码不能为空~',
            type: 'warning'
          })
        } else if (that.pwd === '') {
          this.$message({
            message: '密码不能为空~',
            type: 'warning'
          })
        } else if (that.pwd_again !== that.pwd) {
          this.$message({
            message: '两次密码不一致~',
            type: 'warning'
          })
        } else if (!that.agree) {
          this.$message({
            message: '请勾选我同意~',
            type: 'warning'
          })
        } else {
          // 注册
          let res = await this.$store.dispatch('httpPost', {
            url: '/app/auth/register',
            data: {
              mobile: that.phone,
              password: that.pwd,
              yzm: that.duanxin
            }
          })
          console.log('发生请求', res)
          if (res.code === 0) {
            this.$message({
              message: '注册成功，请登录~',
              type: 'success'
            })
            this.type_to_login(1)
          } else {
            this.$message.error(res.message)
          }
        }
      },
      //  去登陆
      to_login() {
        this.classify.show = true;
        this.zhuce.show = false;
      },
      colse_classify() {
        this.classify.show = false;
      },
      //  关闭弹窗
      register_close() {
        this.zhuce.show = false
      },
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     // 通过 `vm` 访问组件实例
    //     let path = vm.$root._router.history.current.fullPath
    //     console.log('路由',path,vm.$router)
    //     // vm.$router.push('/mine/follow/followCourse')
    //   })
    // },
    mounted() {
      // let path = this.$root._router.history.current
      let path = this.$route.fullPath.split('/')[1]
      let path1 = this.$route.fullPath.split('/')
      // let path = this.$root._router.history.current.fullPath.split('/')
      // console.log('head路由--', path1[2])
      let menus = this.menus
      for (let i in menus) {
        menus[i].active = false
        // console.log('head路由:', path, menus[i].link.split('/')[1])

        if (path === 'openStatic' && Number(path1[2]) > 20) {
          this.menus[1].active = true
          switch (path1[2]) {
            case '21':
              this.tindex = 1
              break;
            case '22':
              this.tindex = 2
              break;
            case '23':
              this.tindex = 3
              break;
            case '24':
              this.tindex = 4
              break;
            case '25':
              this.tindex = 5
              break;
            case '26':
              this.tindex = 6
              break;
            case '27':
              this.tindex = 7
              break;
          }
        } else if (path === 'openStatic' && Number(path1[2]) <= 20) {
          this.menus[0].active = true
        } else if (path === menus[i].link.split('/')[1]) {
          this.menus[i].active = true
        }
      }
      let n = 0
      for (let i in menus) {
        if (!menus[i].active) {
          n++
        }
      }
      if (n === 6) {
        this.menus[0].active = true
      }
    }
  }
</script>
