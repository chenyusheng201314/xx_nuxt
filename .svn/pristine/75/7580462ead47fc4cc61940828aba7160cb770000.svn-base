<template>
  <div class="mine-box">
    <div class="flex-two msg">
      <div class="text-center mine-title base-title">
        <div class="h-title">基本资料</div>
      </div>
      <div class="text-center flex-1">
        <div class=" avatar-box">
          <img class="avatar" :src="user.avatar" alt="">
        </div>
        <div class="cursor-pointer up-avatar" v-if="1">上传头像</div>
      </div>
      <div class="flex-1 msg-box">
        <label for="nick_name">昵称</label>
        <input type="text" v-model="user.nick_name" id="nick_name">
        <label for="birthday">生日</label>
        <input type="text" id="birthday" v-model="user.birthday">
        <label for="tel">手机号</label>
        <input type="text" id="tel" v-model="user.tel">
        <label for="pwd">登录密码</label>
        <input disabled type="password" id="pwd" v-model="user.password">
        <span class="cursor-pointer edit-pwd" @click="edit_pwd">修改</span>
        <label>性别</label>
        <div class="d-inline-block sex">
          <div class="d-inline-block cursor-pointer boy-box" @click="radio_sex(1)">
            <div class="d-inline-block boy" :class="{'sex-active':user.sex===1}"></div>
            <span>男</span>
          </div>
          <div class="d-inline-block cursor-pointer girl-box" @click="radio_sex(2)">
            <div class="d-inline-block girl" :class="{'sex-active':user.sex===2}"></div>
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
        <div class="flex-1 ">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="user.name">
        </div>
        <div class="flex-1">
          <label>居住地</label>
          <div class="d-inline-block select">
            <select style="margin-right: 40px;" name="place1" id="place1" v-model="user.place_provence">
              <option selected disabled value="">请选择</option>
              <option v-for="(item, index) in provence" :key="index"  :value="item">{{item}}</option>
            </select>
            <select name="place2" id="place2" v-model="user.place_city">
              <option selected disabled value="">请选择</option>
              <option v-for="(item, index) in city" :key="index"  :value="item">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="flex-1">
          <label for="company">所在公司</label>
          <input type="text" id="company" v-model="user.company">
        </div>
        <div class="flex-1">
          <label for="job">现任职位</label>
          <input type="text" id="job" v-model="user.job">
        </div>
        <div class="flex-1">
          <label for="qq">QQ</label>
          <input type="tel" id="qq" v-model.number="user.qq">
        </div>
        <div class="flex-1">
          <label for="mail">常用邮箱</label>
          <input type="email" id="mail" v-model="user.mail">
        </div>
        <div class="clearfix"></div>
        <button class="save" @click="save">保存</button>
      </div>
    </div>
    <transition name="fade">
      <modal :data="modal">
        <div class="edit-title">
          <div class="text-center edit-title-text">
            <img src="/images/common/edit_pwd.png" alt="">
            <div class="d-inline-block">修改密码</div>
          </div>
        </div>
        <div class="position-relative">
          <input type="tel" class="edit-input" placeholder="请输入手机号" v-model="change.tel">
          <img src="/images/common/tel.png" alt="">
        </div>
        <div class="position-relative">
          <input type="text" class="edit-input code" placeholder="请输入短信验证码" v-model="change.code">
          <img src="/images/common/code.png" alt="">
          <div class="position-absolute cursor-pointer get-code" @click="get_code">
            <span style="color: #999">|</span>&nbsp;&nbsp;获取验证码</div>
        </div>
        <div class="position-relative">
          <input type="password" class="edit-input" placeholder="设置新密码" v-model="change.new_pwd">
          <img src="/images/common/password.png" alt="">
        </div>
        <div class="position-relative">
          <input type="password" class="edit-input" placeholder="再次输入新密码" v-model="change.check_pwd">
          <img src="/images/common/password.png" alt="">
        </div>
        <div class="danger"><img src="/images/common/error.png" alt=""> {{warn}}</div>
        <button class="done">完成</button>
      </modal>
    </transition>
  </div>
</template>

<script>
import modal from '@/components/modal'
export default {
  name: 'mine02card',
  data () {
    return {
      user: {
        avatar: '/images/test.png',
        nick_name: '',
        birthday: '',
        tel: '',
        password: '12345678',
        sex: 0,
        name: '',
        place_provence: '',
        place_city: '',
        company: '',
        job: '',
        qq: '',
        mail: ''
      },
      change: {
        tel: '',
        code: '',
        get_code: '',
        new_pwd: '',
        check_pwd: '',
        warn: ''
      },
      provence: ['江苏省', '上海市'],
      city: ['无锡市', '南京市', '南京市1', '南京市2', '南京市3'],
      modal: {
        title: '',
        show: false,
        class: 'edit-pwd-modal'
      },
      warn: '手机号各市错误'
    }
  },
  components: {modal},
  methods: {
    radio_sex (sex) {
      this.$data.user.sex = sex
    },
    edit_pwd () {
      this.$data.modal.show = true
    },
    get_code () {
      console.log('获取验证码')
    },
    save () {
      console.log(this.$data.user)
    }
  }
}
</script>

<style scoped>
  .mine-box {
    width: 100%;
  }
  .base-title {
    width: 110px;
    margin: 0 auto 45px;
  }
  .flex-two {
    width: 100%;
    font-size: 18px;
    color: #666;
    font-weight: 500;
    padding: 45px 95px;
    border-bottom: 1px solid #ddd;
    clear: both;
    overflow: hidden;
  }
  .flex-1 {
    float: left;
    width: 50%;
    vertical-align: top;
  }
  .avatar-box {
    width: 185px;
    height: 185px;
    margin: 20px auto;
  }
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 100px;
  }

  label{
    width: 80px;
    text-align: right;
    margin-right: 40px;
    margin-bottom: 20px;
  }
  .edit-pwd {
    color: #ff6900;
    margin-left: 20px;

  }
  .label-sex {
    width: 30px;
    margin: 0;
  }
  input{
    width: 300px;
    height: 40px;
    font-size: 15px;
    color: #333;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding-left: 15px;
  }
  .msg-box .input-sex {
    width: 20px;
  }
  .sex {
    font-weight: 400;
    width: 60%;
    margin-top: 10px;
  }
  .boy {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    vertical-align: middle;
    background: #ddd url("/images/mine/boy.png") no-repeat center;
    margin-right: 10px;
  }
  .girl {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    vertical-align: middle;
    background: #ddd url("/images/mine/girl.png") no-repeat center;
    margin-right: 10px;
  }
  .sex-active {
    background-color: #ff6900;
  }
  .boy-box {
    margin-right: 30px;
  }
  .girl-box {
    float: right;
  }
  .bottom-msg {
    padding-left: 20px;
  }
  .select {
    width: 74%;
    vertical-align: super;
  }
  .select select{
    width: 140px;
    height: 40px;
    font-size: 15px;
    color: #333;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    padding-left: 15px;

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("/images/mine/arrow.png") no-repeat scroll 120px center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    /*padding-right: 18px;*/
    filter: none !important;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  /*select::-ms-expand { display: none; }*/
  .save {
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #ff6900;
    opacity: 0.9;
    border: 0 none;
    border-radius: 4px;
    display: block;
    margin: 45px auto 0;
  }
  .save:hover {
    opacity: 1;
  }
  .save:focus {
    outline: 0 none;
    opacity: 1;
    box-shadow: 0 1px 2px 1px #ff6900;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .edit-title {
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 24px;
  }
  .edit-title-text {
    width: 180px;
    font-size: 20px;
    color: #ff6900;
    border-bottom: 1px solid #ff6900;
    padding-bottom: 10px;
    margin-bottom: -1px;
  }
  .edit-input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding: 0 20px 0 60px;
    margin-bottom: 12px;
  }
  .edit-input::-webkit-input-placeholder {
    color: #aaa;
  }
  .edit-input+img {
    position: absolute;
    left: 36px;
    top: 17px;
  }
  .code {
  }
  .get-code {
    content: '获取验证码';
    position: absolute;
    top: 0;
    right: 20px;
    color: #ff6900;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }
  .danger {
    font-size: 14px;
    color: #dc3545;
  }
  .done {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff6900;
    opacity: 0.9;
    border: 0 none;
    border-radius: 8px;
    display: block;
    margin: 20px auto 0;
  }
  .done:hover {
    opacity: 1;
  }
  .done:focus {
    outline: 0 none;
    opacity: 1;
    box-shadow: 0 1px 2px 1px #ff6900;
  }
</style>
<style>
  .edit-pwd-modal {
    width: 430px!important;
    height: 530px!important;
    color: #333!important;
  }

</style>
