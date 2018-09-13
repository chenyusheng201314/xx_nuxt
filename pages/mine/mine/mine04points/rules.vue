<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="h-title">
        <img src="/images/mine/point.png" alt="">
        <div class="d-inline-block title-text">如何获取积分？</div>
      </div>
      <ul>
        <li>有多种途径可以获取积分：</li>
        <li>1、每日签到可以获取积分，连续签到还有积分加成</li>
        <li>2、每日消费1学币可以获取10积分</li>
        <li>3、每学完一门课程可以获得30积分</li>
        <li>4、每学习一小时获得2积分</li>
        <li>5、每学习一天获得10积分</li>
        <li>6、每邀请一名好友注册获得10积分</li>
        <li>7、完善名片信息获得20积分</li>
      </ul>
    </div>
    <div class="mine-con">
      <div class="h-title">
        <img src="/images/mine/point.png" alt="">
        <div class="d-inline-block title-text">积分有什么作用？</div>
      </div>
      <div>积分可以在 <u>APP端</u> 兑换部分课程，后期还可以用来兑换实物礼品哦 ~</div>
    </div>
    <div class="mine-con">
      <div class="h-title">
        <img src="/images/mine/point.png" alt="">
        <div class="d-inline-block title-text">积分是否会过期？</div>
      </div>
      <div>积分不会过期，可以永久使用</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rules'
}
</script>

<style scoped>
  .mine-box {
    font-size: 15px;
    color: #666;
    padding: 15px 0;
  }
  .mine-con {
    padding: 30px;
    margin: 0 45px;
  }
  .mine-con:last-of-type {
    border-bottom: 0 none;
  }
  .h-title {
    border-left: 0 none;
    padding-left: 0;
    margin-bottom: 30px;
    margin-left: -30px;
  }
  .title-text {
    margin-left: 10px;
    line-height: 20px;
    vertical-align: middle;
  }
</style>
