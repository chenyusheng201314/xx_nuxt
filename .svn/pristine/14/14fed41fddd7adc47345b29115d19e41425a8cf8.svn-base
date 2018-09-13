<template>
  <div>
    <div class="mine-box">
      <div class="mine-con">
        <div class="mine-title">
          <div class="h-title">邀好友，享好礼</div>
        </div>
        <div class="middle">
          <div class="d-inline-block address">
            推荐一个网站<input type="text" v-model="address">
          </div>
          <button class="d-inline-block btn-main" @click="copy">点击复制</button>
        </div>
        <div class="position-relative icons">
          <img src="/images/mine/share.png" alt="" @mouseenter="share=1" @mouseout="share=0">
          <img :src="qq?'/images/mine/qq1.png':'/images/mine/qq.png'" alt="" @mouseenter="qq=1" @mouseout="qq=0">
          <img :src="we?'/images/mine/we1.png':'/images/mine/we.png'" alt="" @mouseenter="we=1" @mouseout="we=0">
          <div class="position-absolute out-box" :class="{'qq':qq,'we':we}" v-show="share || qq || we">
            <div class="position-absolute triangle"></div>
            <div class="position-absolute triangle-box"></div>
            <img v-show="share" class="code-pic" src="/images/test.png" alt="">
            <img v-show="qq" class="code-pic" src="/images/logo.png" alt="">
            <img v-show="we" class="code-pic" src="/images/test.png" alt="">
          </div>
        </div>
        <div class="text">复制上面的链接发送给好友、QQ群，或者粘贴到微博、微信、贴吧、个人网站等评估</div>
        <div class="text">没成功邀请1个好友注册，你可以获得200积分</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine09request',
  data () {
    return {
      address: 'http://www.vpx.com.cn',
      share: 0,
      qq: 0,
      we: 0
    }
  },
  methods: {
    copy () {}
  }
}
</script>

<style scoped>
  .mine-box {
    width: 100%;
  }
  .mine-con {
    padding: 75px;
  }
  .middle {
    margin-bottom: 20px;
  }
  .address {
    width: 83%;
    font-size: 15px;
    line-height: 15px;
    color: #999;
    padding: 17px 18px;
    border: 1px solid #e5e5e5;
    margin-right: 14px;
  }
  input {
    width: 600px;
    font-size: 15px;
    color: #999;
    border: 0 none;
    margin-left: 10px;
  }
  input:active,
  input:focus {
    outline: none;
  }
  .btn-main {
    font-size: 15px;
    font-weight: 400;
    width: 150px;
    height: 50px;
    line-height: 50px;
  }
  .icons {
    float: right;
    margin-top: 10px;
    margin-right: 178px;
  }

  .icons>img{
    margin-left: 10px;
  }

  .out-box {
    width: 132px;
    height: 132px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    top: 40px;
    left: -46px;
  }
  .code-pic {
    width: 100%;
    height: 100%;
  }
  .qq {
    /*left: -8px;*/
    left: -12px;
  }
  .we {
    /*left: 32px;*/
    left: 24px;
  }
  .triangle {
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border: 1px solid #ddd;
    top: -8px;
    left: 59px;
  }
  .triangle-box {
    width: 18px;
    height: 12px;
    background-color: #fff;
    top: -3px;
    left: 57px;
    border-radius: 4px;
  }
  .text {
    font-size: 15px;
    color: #666;
  }

</style>
