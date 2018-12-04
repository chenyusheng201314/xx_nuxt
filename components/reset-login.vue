<template>
  <div style="width: 100%;height: auto;overflow: hidden;">
      <div class="forget-inp" style="margin-top: 30px">
        <img src="/images/login/icon-phone.png" alt="" width="9">
        <input type="text" placeholder="请输入手机号" v-model="forget_info.mobile">
      </div>
      <div class="forget-duanxin">
        <img src="/images/login/icon-duanxin.png" alt="" width="13">
        <input type="text" placeholder="输入短信码" v-model="forget_info.yzm">
        <span class="line">|</span>
        <span class="get_num" @click="get_yzm">{{forget_info.yzm_info}}</span>
      </div>
      <div class="forget-inp">
        <img src="/images/login/icon-pwd.png" alt="" width="13">
        <input type="password" placeholder="设置新密码" v-model="forget_info.password">
      </div>
      <div class="forget-inp">
        <img src="/images/login/icon-pwd.png" alt="" width="13">
        <input type="password" placeholder="再次输入新密码" v-model="forget_info.pwd_again">
      </div>
      <div class="forget-btn" @click="resetPwd">重置密码</div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "reset-login",
    data(){
      return {
        forget_info: {
          mobile: '',
          yzm: '',
          password: '',
          pwd_again: '',
          on_off: true,
          time: 60,
          yzm_info: '获取验证码'
        },
      }
    },
    methods:{
      // 获取 重置密码 验证码
      // 获取验证码
      async get_yzm() {
        var that = this.forget_info
        if (that.on_off) {
          // 防抖
          that.on_off = false
          // console.log(that.phone,!this.iphone(that.phone))
          if (that.mobile === '') {
            this.$message({
              message: '手机号不能为空~',
              type: 'warning'
            })
            that.on_off = true
          } else if (!this.iphone(that.mobile)) {
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
                  mobile: that.mobile,
                  type: 2
                }
            })
            console.log('发送重置密码验证码', res.data)
            if (res.data.code === 0) {
              this.$message({
                message: '验证码已发送，请注意查收~',
                type: 'success'
              })
              var set = setInterval(function () {
                if (that.time > 1) {
                  that.time--
                  that.yzm_info = that.time + 's'
                } else {
                  that.time = 60
                  clearInterval(set)
                  that.yzm_info = '获取验证码'
                  that.on_off = true
                }
              }, 1000)
            } else {
              this.$message.error(res.data.message)
            }
          }
        }
      },
      // 重置密码
      async resetPwd() {
        var that = this.forget_info
        if (that.mobile === '') {
          this.$message({
            message: '手机号不能为空~',
            type: 'warning'
          })
        } else if (!this.iphone(that.mobile)) {
          this.$message({
            message: '手机号格式不正确~',
            type: 'warning'
          })
        } else if (that.yzm === '') {
          this.$message({
            message: '短信验证码不能为空~',
            type: 'warning'
          })
        } else if (that.password === '') {
          this.$message({
            message: '密码不能为空~',
            type: 'warning'
          })
        } else if (that.pwd_again !== that.password) {
          this.$message({
            message: '两次密码不一致~',
            type: 'warning'
          })
        } else {
          // 重置
          let res = await axios({
            method: 'post',
            url: this.$store.state.mineBaseURL + '/api/v1/app/auth/reset_password',
            data: that
          })

          console.log('重置', res.data)
          if (res.data.code === 0) {
            this.$message({
              message: '密码重置成功，请登录~',
              type: 'success'
            })
            this.$emit('login_close')
          } else {
            this.$message.error(res.data.message)
          }
        }
      },
    }
  }
</script>
