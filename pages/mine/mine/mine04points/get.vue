<template>
  <div class="mine-points-get mine-box">
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{sign_points}}</span> 积分</div>
      <div class="d-inline-block points-title">签到</div>
      <div class="d-inline-block points-text">已连续签到 <span class="points-num">{{sign_days}}</span> 天</div>
      <div class="points-con">签到一次2积分，连续签到学分累加。连续签到2天3积分，连续3天4积分，连续7天及以上8积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{paid_points}}</span> 积分</div>
      <div class="d-inline-block points-title">消费</div>
      <div class="d-inline-block points-text">已累计消费 <span class="points-num">{{paid}}</span> 学币</div>
      <div class="points-con">消费一个学币获得10积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{hours_points}}</span> 积分</div>
      <div class="d-inline-block points-title">学习时长</div>
      <div class="d-inline-block points-text">已累计学习 <span class="points-num">{{hours}}</span> 小时</div>
      <div class="points-con">每学习一小时获得2积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{study_points}}</span> 积分</div>
      <div class="d-inline-block points-title">学习天数</div>
      <div class="d-inline-block points-text">已累计学习 <span class="points-num">{{study_days}}</span> 天</div>
      <div class="points-con">每学习一天获得10积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{request_points}}</span> 积分</div>
      <div class="d-inline-block points-title">邀请好友</div>
      <div class="d-inline-block points-text">已累计邀请好友 <span class="points-num">{{request}}</span> 名</div>
      <div class="points-con">每邀请一名好友注册获得10积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{share_points}}</span> 积分</div>
      <div class="d-inline-block points-title">分享课程</div>
      <div class="d-inline-block points-text">已累计分享课程 <span class="points-num">{{share}}</span> 门</div>
      <div class="points-con">每分享一门课程获得2积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{send_points}}</span> 积分</div>
      <div class="d-inline-block points-title">赠送课程</div>
      <div class="d-inline-block points-text">已累计赠送课程 <span class="points-num">{{send}}</span> 门</div>
      <div class="points-con">每赠送好友一门课程获得10积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{done_points}}</span> 积分</div>
      <div class="d-inline-block points-title">完成课程</div>
      <div class="d-inline-block points-text">已累计完成课程 <span class="points-num">{{done}}</span> 门</div>
      <div class="points-con">每学完一门课程获得30积分</div>
    </div>
    <div class="mine-con">
      <div class="points-total">累计获得 <span class="points-num">{{card_points}}</span> 积分</div>
      <div class="d-inline-block points-title">完善名片</div>
      <div class="d-inline-block points-text">已连续签到 <span class="points-num">{{card}}</span> 天</div>
      <div class="points-con">完善名片信息获得20积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'get',
  data () {
    return {
      sign_days: 10,
      sign_points: 10,
      paid: 399,
      paid_points: 399,
      hours: 20,
      hours_points: 20,
      study_days: 10,
      study_points: 10,
      request: 10,
      request_points: 10,
      share: 10,
      share_points: 10,
      send: 10,
      send_points: 10,
      done: 10,
      done_points: 10,
      card: 10,
      card_points: 10
    }
  }
}
</script>
