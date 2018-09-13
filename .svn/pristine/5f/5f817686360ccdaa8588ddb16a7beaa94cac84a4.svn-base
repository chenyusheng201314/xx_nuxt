<template>
  <div>
    <div class="row top-msg">
      <div class="container">
        <img class="user-cover" :src="user.cover" alt="">
        <div class="d-inline-block user-con">
          <h4 class="user-name">{{user.name}} ， {{user.greet}}</h4>
          <div class="user-note">{{user.note}}</div>
        </div>
        <div class="d-inline-block sign" :class="{signed:user.signed}">{{user.signed?'已签到':'签到'}}</div>
      </div>
    </div>
    <div class="row tabs">
      <div class="container">
        <ul>
          <li :class="{'tab-active': 1 === tab}" @click="tab=1"><nuxt-link to="/mine/mine/mine01trip">学习旅程</nuxt-link></li>
          <li :class="{'tab-active': 2 === tab}" @click="tab=2"><nuxt-link to="/mine/mine/mine02card">我的名片</nuxt-link></li>
          <li :class="{'tab-active': 3 === tab}" @click="tab=3"><nuxt-link to="/mine/mine/mine03money">我的学币</nuxt-link></li>
          <li :class="{'tab-active': 4 === tab}" @click="tab=4"><nuxt-link to="/mine/mine/mine04points">我的积分</nuxt-link></li>
          <li :class="{'tab-active': 5 === tab}" @click="tab=5"><nuxt-link to="/mine/mine/mine05medal">我的勋章</nuxt-link></li>
          <li :class="{'tab-active': 6 === tab}" @click="tab=6"><nuxt-link to="/mine/mine/mine06company">我的企业</nuxt-link></li>
          <li :class="{'tab-active': 7 === tab}" @click="tab=7"><nuxt-link to="/mine/mine/mine07message">我的消息</nuxt-link></li>
          <li :class="{'tab-active': 8 === tab}" @click="tab=8"><nuxt-link to="/mine/mine/mine08order">我的订单</nuxt-link></li>
          <li :class="{'tab-active': 9 === tab}" @click="tab=9"><nuxt-link to="/mine/mine/mine09request">邀请好友</nuxt-link></li>
          <li :class="{'tab-active': 10 === tab}" @click="tab=10"><nuxt-link to="/mine/mine/mine10follow">我的关注</nuxt-link></li>
          <li :class="{'tab-active': 11 === tab}" @click="tab=11"><nuxt-link to="/mine/mine/mine11feedback">意见反馈</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="container content">
      <!--<transition name="router-fade" mode="out-in">-->
        <keep-alive>
          <nuxt-child/>
        </keep-alive>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      user: {
        cover: '/images/test.png',
        name: '个人中心用户名',
        note: '个人中心用户装逼标签语',
        signed: false,
        greet: '下午好！'
      },
      tab: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$router.push('/mine/mine/mine01trip')
    })
  },
  comments: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .top-msg {
    height: 150px;
    background-color: #ffc107;
    padding: 32px 0;
  }
  .user-cover {
    width: 80px;
    height: 80px;
    border: 3px solid rgba(255,255,255,.5);
    border-radius: 50%;
    margin-right: 35px;
  }
  .user-con {
    color: #fff;
    vertical-align: top;
    margin-top: 18px;
    margin-right: 45px;
  }
  .user-name {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 12px;
  }
  .user-note {
    font-size: 15px;
  }
  .sign {
    color: #fff;
    box-sizing: border-box;
    vertical-align: middle;
    font-size: 18px;
    width: 60px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #fff;
    border-radius: 15px;
    padding-left: 10px;
  }
  .signed {
    color: #f00;
  }
  .tabs {
    color: #666;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
  }
  .tabs ul li {
    float: left;
    width: 64px;
    border-bottom: 1px solid #fff;
    margin-right: 49px;
  }
  .tabs ul li a{
    width: 64px;
    padding-top: 10px;
    padding-bottom: 18px;
  }
  .tabs ul li:last-of-type {
    margin-right: 0;
  }
  .tab-active {
    color: #ff6900!important;
    border-bottom: 1px solid #ff6900!important;
  }
  .content {
    margin-bottom: 60px;
  }
</style>
<style>
  /*子组件公用*/
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .mine-box {
    width: 844px;
    border: 1px solid #e5e5e5;
  }
  .mine-con {
    padding: 45px;
    border-bottom: 1px solid #ddd;
  }
  .mine-title {
    border-left: 4px solid #ff6900;
    padding-left: 4px;
    margin-bottom: 22px;
  }
  .h-title {
    font-size: 20px;
    line-height: 20px;
    color: #ff6900;
    border-left: 2px solid #ff6900;
    padding-left: 10px;
  }
  /*课程卡片*/
  .online-courses {
    font-size: 0;
    margin-bottom: -23px;
  }
  .online-course {
    width: 228px;
    height: 262px;
    border: 1px solid #dcdcdc;
    margin-right: 34px;
    margin-bottom: 23px;
  }
  .online-course-right {
    margin-right: 0;
  }
  .course-cover {
    width: 100%;
    height: 150px;
  }
  .course-con {
    padding: 10px 24px;
  }
  .course-title {
    font-size: 15px;
    line-height: 15px;
    color: #333;
    margin-bottom: 10px;
  }
  .course-teacher {
    font-size: 12px;
    line-height: 15px;
    color: #999;
    padding: 0 8px;
    margin-bottom: 6px;
  }
  .course-nums {
    font-size: 12px;
    line-height: 15px;
    color: #999;
    padding: 0 8px;
    margin-bottom: 10px;
  }
  .course-num {
    background: url("/static/images/teacher/num.png") no-repeat left center;
    margin-right: 10px;
    padding-left: 22px;
  }
  .course-time {
    background: url("/static/images/teacher/time.png") no-repeat left center;
    padding-left: 22px;
  }
  .course-process{
    width: 100%;
    height: 15px;
    font-size: 12px;
    line-height: 15px;
    color: #ff6900;
    padding: 0 8px;
  }
  .process-box {
    width: 46%;
    height: 6px;
    border: 1px solid #ff6900;
    background-color: #fff;
    border-radius: 5px;
  }
  .process-bar {
    left: 0;
    height: 4px;
    background-color: #ff6900;
    border-radius: 5px;
  }
</style>
