<template>
  <div class="mine-card mine-card-box">
    <div class="flex-two msg">
      <div class="mine-title base-title">
        <div class="h-title">基本资料</div>
      </div>
      <div class="text-center flex-1">
        <div class=" avatar-box">
          <!--<img class="avatar" :src="user1.photo" alt="">-->
          <div class="avatar" :style="'background-image: url('+user1.photo+')'"></div>
        </div>
        <div class="position-relative">
          <input type="file" accept="image/*" class="position-absolute cursor-pointer up-avatar-input" :value="value" @change="plus">
          <div class="cursor-pointer up-avatar" >上传头像</div>
        </div>
      </div>
      <div class="flex-1 msg-box">
        <label for="nick_name">姓名</label>
        <input type="text" v-model.trim="user1.username" id="nick_name">

        <label for="birthday">生日</label>
        <input type="date" id="birthday" :value="user1.birthday?user1.birthday:'1990-01-01'" @input="birth">
        <label for="tel">手机号</label>
        <input type="text" id="tel" v-model.trim="user1.mobile">

        <label for="pwd">登录密码</label>
        <!--<input disabled type="password" id="pwd" value="* * * * * *">-->
        <div class="d-inline-block input-job">* * * * * *</div>



        <span class="cursor-pointer edit-pwd" @click="modal.show=true;change.mobile = user1.mobile">修改</span>
        <label>性别</label>
        <div class="d-inline-block sex">
          <div class="d-inline-block cursor-pointer boy-box" @click="radio_sex(1)">
            <div class="d-inline-block boy" :class="{'sex-active':user1.sex===1}"></div>
            <span>男</span>
          </div>
          <div class="d-inline-block cursor-pointer girl-box" @click="radio_sex(2)">
            <div class="d-inline-block girl" :class="{'sex-active':user1.sex===2}"></div>
            <span>女</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-two">
      <div class="mine-title">
        <div class="h-title">完善资料</div>
      </div>
      <div class="bottom-msg">
        <!--<div class="flex-1 ">-->
          <!--<label for="name">姓名</label>-->
          <!--<input type="text" id="name" v-model.trim="user1.name">-->
        <!--</div>-->
        <div class="flex-1">
          <label>居住地</label>
          <input type="text" v-model.trim="user1.address">
          <!--<div class="d-inline-block select">-->
            <!--<select style="margin-right: 40px;" name="place1" id="place1" v-model="user1.place_provence">-->
              <!--<option selected disabled value="">请选择</option>-->
              <!--<option v-for="(item, index) in provence" :key="index"  :value="item">{{item}}</option>-->
            <!--</select>-->
            <!--<select name="place2" id="place2" v-model="user1.place_city">-->
              <!--<option selected disabled value="">请选择</option>-->
              <!--<option v-for="(item, index) in city" :key="index"  :value="item">{{item}}</option>-->
            <!--</select>-->
          <!--</div>-->
        </div>
        <div class="flex-1">
          <label for="company">所在公司</label>
          <input type="text" id="company" v-model.trim="user1.company_name">
        </div>
        <div class="flex-1 position-relative">
          <label>现任职位</label>
          <!--<input type="text" id="job" v-model.trim="user1.company_position">-->
          <div class="d-inline-block input-job" @click="jobs_show=!jobs_show">{{user1.company_position}}</div>
          <div class="position-absolute select-down" @click="jobs_show=!jobs_show">
            <img class="select-down" :src="jobs_show?'/images/mine/select_up.png':'/images/mine/select_down.png'" alt="">
          </div>
          <ul class="position-absolute jobs-list" v-show="jobs_show">
            <li v-for="(item,index) in jobs" :key="index" @click="user1.company_position=item;jobs_show=false">{{item}}</li>
          </ul>
        </div>

        <div class="flex-1">
          <label for="mail">常用邮箱</label>
          <input type="email" id="mail" v-model.trim="user1.email">
        </div>
        <div class="flex-1">
          <label for="qq">身份证号</label>
          <input type="tel" id="qq" v-model.trim="user1.identification_number">
        </div>
        <div class="clearfix"></div>
        <button class="save" @click="save">保存</button>
      </div>
    </div>


    <!--<transition name="fade">-->
    <modal :data="modal">
        <div class="edit-title">
          <div class="text-center edit-title-text">
            <img src="/images/common/edit_pwd.png" alt="">
            <div class="d-inline-block" style="margin-left: 10px">修改密码</div>
          </div>
        </div>
        <div class="position-relative">
          <input type="tel" class="edit-input" placeholder="请输入手机号" v-model.trim="change.mobile">
          <img src="/images/common/tel.png" alt="">
        </div>
        <div class="position-relative">
          <input type="text" class="edit-input code" placeholder="请输入短信验证码" v-model.trim="change.yzm">
          <img src="/images/common/code.png" alt="">
          <div class="position-absolute cursor-pointer get-code" @click="get_code">
            <span style="color: #999">|</span>&nbsp;&nbsp;获取验证码</div>
        </div>
        <div class="position-relative">
          <input type="password" class="edit-input" placeholder="设置新密码" v-model.trim="change.password">
          <img src="/images/common/password.png" alt="">
        </div>
        <div class="position-relative">
          <input type="password" class="edit-input" placeholder="再次输入新密码" v-model.trim="change.check_pwd">
          <img src="/images/common/password.png" alt="">
        </div>
        <!--<div class="danger"><img src="/images/common/error.png" alt=""> {{warn}}</div>-->
        <button class="done" @click="change_done">完成</button>
      </modal>
    <!--</transition>-->
  </div>
</template>

<script>
import modal from '@/components/modal'
import axios from 'axios'
export default {
  name: 'mine02card',
  data () {
    return {
      value: '',
      jobs:[
        '农、林、牧、渔业','采矿业',
        '制造业', '电力、热力、燃气及水的生产和供应业', '环境和公共设施管理业',
        '建筑业', '交通运输、仓储业和邮政业', '信息传输、计算机服务和软件业',
        '批发和零售业', '住宿、餐饮业', '金融、保险业',
        '房地产业', '租赁和商务服务业', '科学研究、技术服务和地质勘查业',
        '水利、环境和公共设施管理业', '居民服务和其他服务业', '教育',
        '卫生、社会保障和社会服务业', '文化、体育、娱乐业', '综合（含投资类、主业不明显）','其它'
      ],
      jobs_show:false,
      change: {
        mobile: '',
        yzm: '',
        password: '',
        check_pwd: '',
      },
      // provence: ['江苏省', '上海市'],
      // city: ['无锡市', '南京市', '南京市1', '南京市2', '南京市3'],
      modal: {
        title: '',
        show: false,
        class: 'edit-pwd-modal'
      },
    }
  },
  props: ['user'],
  computed: {
    user1 () {
      return this.user
    }
  },
  components: {modal},
  methods: {
    // 切换性别
    radio_sex (sex) {
      this.user1.sex = Number(sex)
    },
    // 上传头像
    plus (e) {
      let file=e.target.files[0];
      // console.log(file)
      let reader =new FileReader();
      let that=this;
      reader.onloadend= async function(ret){
        let uri = ret.target.result
        // that.info.photo=uri;
        // console.log(uri)
        let res = await that.$store.dispatch('minePost', {
          url: '/common/file/add',
          data: {
            file_base64: uri
          }
        }).then(response => {
          // console.log('上传',response)
          if (response.code===4002) {
            // that.photos_name.push(response.data.data.filename)
            that.save_avatar(response.data.filename)
            that.value = ''
            that.user1.photo = response.data.file_url
          }else {
            // that.toast = '格式不支持，请选择常用格式的图片~'
            // setTimeout(()=>{
            //   that.toast = ''
            // },2000)
          }
        }).catch(error => {
          that.toast = error

        })
      }
      reader.readAsDataURL(file);
    },
    // 更改生日
    birth (e) {
      // console.log(e.target.value)
      this.user1.birthday= e.target.value
    },

    // 获取验证码
    async get_code () {
      let change = this.change
      if (!change.mobile || !this.iphone(change.mobile)) {
        this.$message({
          message: '请输入合法的手机号~',
          type: 'warning'
        })
      }else {
        let res = await axios({
          method: 'post',
          url: this.$store.state.mineBaseURL+'/api/common/sms/send',
          data: {
            mobile: change.mobile,
            type: 2,
            user_group_id: 3,  //1 机构 2 企业 3 个人 4平台
          }
        })
        if (res.data.code===0) {
          // console.log('获取验证码',res)
          this.$message({
            message: '验证码已发送~',
            type: 'success'
          })
        }

      }
    },
    // 修改密码
    async change_done() {
      let change = this.change
      // console.log('change',!change.mobile,this.iphone(change.mobile))
      if (!change.mobile || !this.iphone(change.mobile)) {
        this.$message({
          message: '请输入合法的手机号~',
          type: 'warning'
        })
      }else if (!change.yzm) {
        this.$message({
          message: '请填写验证码~',
          type: 'warning'
        })
        // this.$message.error('错了哦，这是一条错误消息');
      }else if (!change.password) {
        this.$message({
          message: '请填写新密码~',
          type: 'warning'
        })
      }else if (change.check_pwd !== change.password) {
        this.$message({
          message: '两次输入的密码不一致~',
          type: 'warning'
        })
      }
      else {
        let res = await this.$store.dispatch('minePost', {
          url: '/app/auth/reset_password',
          data:change
        })
        console.log('submit',res.code)
        if (res.code === 0) {
          // this.$router.push('/login')
          this.$message({
            message: '密码更改成功~',
            type: 'success'
          })
          this.modal.show = false
          this.change = {
            mobile: this.change.mobile,
            yzm: '',
            password: '',
            check_pwd: '',
          }
          // 重新登录
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }
    },
    // 单独保存头像
    async save_avatar (value) {
      let res = await this.$store.dispatch('minePost', {
        url: '/app/personal/update_my_info',
        data: {
          photo: value
        }
      })

      if (res.code===0) {
        // console.log('保存',res)
        // alert('保存成功~')
        this.$message({
          message: '保存成功~',
          type: 'success'
        })

        // 更新 导航栏 小头像 icon
        let res = await this.$store.dispatch('mineGet', {url: '/app/personal/my_info',data: {}})
        this.$store.commit('setUser', res.data)
      }else {
        this.$message.error(res.message);
      }
    },
    // 保存
    async save () {
      let res = await this.$store.dispatch('minePost', {
        url: '/app/personal/update_my_info',
        data: this.user1
      })

      if (res.code===0) {
        // console.log('保存',res)
        // alert('保存成功~')
        this.$message({
          message: '保存成功~',
          type: 'success'
        })
      }
    }
  },
  mounted() {

    // console.log('info',this.user1)
  }
}
</script>

<style scoped>
  .select-down {
    width: 20px;
    height: 20px;
    right: 84px;
    top: 5px;
  }
  .jobs-list {
    background-color: #fff;
    padding: 10px 0;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    top: 42px;
    right: 74px;
  }
  .jobs-list >li{
    color: #353535;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 10px;
  }
  .jobs-list >li:last-of-type{
    border-bottom: 0 none;
  }
  .jobs-list >li:hover{
    background-color: #ddd;
  }
</style>
