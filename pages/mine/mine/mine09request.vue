<template>
  <div class="mine-request">
    <div class="mine-box">
      <div class="mine-con">
        <div class="mine-title">
          <div class="h-title">邀好友，享好礼</div>
        </div>
        <div class="middle">
          <div class="d-inline-block address">
            推荐一个网站<input type="text" disabled value="https://learning.com.cn">
          </div>
          <!--<button class="d-inline-block btn-main" data-clipboard-text="https://learning.com.cn">点击复制</button> -->
          <button class="d-inline-block btn-main" data-clipboard-text="https://learning.com.cn">点击复制</button>
        </div>
        <!--<div class="position-relative icons">-->
          <!--<img src="/images/mine/share.png" alt="" @mouseenter="share=1" @mouseout="share=0">-->
          <!--<img :src="qq?'/images/mine/qq1.png':'/images/mine/qq.png'" alt="" @mouseenter="qq=1" @mouseout="qq=0">-->
          <!--<img :src="we?'/images/mine/we1.png':'/images/mine/we.png'" alt="" @mouseenter="we=1" @mouseout="we=0">-->
          <!--<div class="position-absolute out-box" :class="{'qq':qq,'we':we}" v-show="share || qq || we">-->
            <!--<div class="position-absolute triangle"></div>-->
            <!--<div class="position-absolute triangle-box"></div>-->
            <!--<img v-show="share" class="code-pic" src="/images/test.png" alt="">-->
            <!--<img v-show="qq" class="code-pic" src="/images/logo.png" alt="">-->
            <!--<img v-show="we" class="code-pic" src="/images/test.png" alt="">-->
          <!--</div>-->
        <!--</div>-->
        <div class="text">复制上面的链接发送给好友、QQ群，或者粘贴到微博、微信、贴吧、个人网站等评估</div>
        <div class="text">每成功邀请1个好友注册，你可以获得 {{point.data.point_30}} 积分</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
export default {
  name: 'mine09request',
  data () {
    return {
      address: 'https://learning.com.cn/',
      share: 0,
      qq: 0,
      we: 0
    }
  },

  async asyncData({store}) {

    let point = await store.dispatch('mineGet', {
      url: '/app/personal/point_rule',
      data: {
      }
    })
    return {
      point
    }
  },
  mounted() {
    let that = this
    let clipboard = new Clipboard('.btn-main');
    clipboard.on('success', function(e) {
     that.$message({
       message: '复制成功！',
       type: 'success'
     })
      e.clearSelection();
    });
  }
}
</script>
