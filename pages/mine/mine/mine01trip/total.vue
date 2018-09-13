<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="title">
        <h4 class="h-title">学习勋章</h4>
      </div>
      <div class="medals">
          <img class="medal-cover" v-for="item in medals" :key="item" :src="item< get? '/images/test.png':'/images/logo.png'" alt="">
      </div>
    </div>
    <div class="mine-con">
      <div class="title">
        <h4 class="h-title">学习总天数</h4>
      </div>
      <div class="text">已累计学习天数 {{days}} 天</div>
    </div>
    <div class="mine-con">
      <div class="title">
        <h4 class="h-title">学习总课程数</h4>
      </div>
      <div class="text">已累计学习总课程数 {{num}} 课</div>
    </div>
    <div class="mine-con">
      <div class="title">
        <h4 class="h-title">累计学习总时长</h4>
      </div>
      <div class="text">已累计学习总时长 {{time}} 小时</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine01tripTotal',
  data () {
    return {
      get: 5,
      medals: 10,
      days: 20,
      num: 32,
      time: 59.3
    }
  }
}
</script>
<style scoped>
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
    background: url("/images/teacher/num.png") no-repeat left center;
    margin-right: 10px;
    padding-left: 22px;
  }
  .course-time {
    background: url("/images/teacher/time.png") no-repeat left center;
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
  .medals {
    width: 100%;
  }
  .medal-cover {
    width: 50px;
    height: 50px;
    margin: 0 12px;
  }
  .text {
    font-size: 15px;
    color: #666;
    padding-left: 20px;
  }
</style>
