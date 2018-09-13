<template>
  <div id="foot" class="row">
    <div class="container">
      <div class="flex foot-top">
        <div class="msg flex2">
          <div class="title">客户服务</div>
          <div class="con">
            <div>客服电话：400-000-000</div>
            <div>联系邮箱：xxx@xiangxue.me</div>
          </div>
        </div>
        <div class="msg text-center flex1">
          <div class="title">帮助</div>
          <div class="con">
            <div>关于我们</div>
            <div>企业用户</div>
            <div>机构用户</div>
          </div></div>
        <div class="msg text-center flex1">
          <div class="title">关注我们</div>
          <div class="con">
            <img class="code" src="/images/home/code.png" alt="">
          </div>
        </div>
        <div class="text-center flex1">
          <div class="title">关注我们</div>
          <div class="con">
            <img class="code" src="/images/home/code.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="container">
      <div class="foot-bottom">
        <div class="title">友情链接</div>
        <div class="col-12 row link">
          <div class="col-2 row">安迪曼</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
          <div class="col-2 row">塔伦特</div>
        </div>
        <div class="text-center foot-bottom1">Copyright ©️2017-2027 XIANGXUE /
          享学（深圳）科技有限公司/粤公网安备 11000002000019 号 粤ICP备 17065259 号 -1</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style scoped>

  #foot {
    color: #fff;
    background-color: #333;
  }
  .flex {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
  .flex2{
    flex: 2;
  }
  .flex3 {
    flex: 3;
  }
  .foot-top {
    margin: 70px 0 60px;
  }
  .title {
    font-size: 20px;
    line-height: 52px;
  }
  .con {
    font-size: 18px;
    line-height: 40px;
  }
  .msg {
    border-right: 1px solid #d1d1d1;
  }
  .line {
    width: 100%;
    height: 2px;
    background-color: #d1d1d1;
  }
  .foot-bottom {
    margin-top: 70px;
  }
  .link {
    font-size: 16px;
    line-height: 30px;
    justify-content: flex-start;
    margin-bottom: 30px;
  }
  .foot-bottom1 {
    font-size: 16px;
    line-height: 40px;
  }
</style>
