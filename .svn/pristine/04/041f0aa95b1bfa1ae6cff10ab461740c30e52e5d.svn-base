<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">已购买课程</h4>
      </div>
      <div class="text-left online-courses">
        <div class="d-inline-block online-course" v-for="(item, index) in projects" :key="index"
             :class="{'online-course-right':(index+1)%3===0}">
          <img class="course-cover" :src="item.cover" alt="">
          <div class="text-center course-con">
            <div class="text-overflow-one course-title">{{item.title}}</div>
            <div class="text-overflow-one course-teacher">{{item.teacher}} | {{item.job}}</div>
            <div class="text-overflow-one course-nums">
              <div class="d-inline-block course-num">{{item.num}} 课时</div>
              <div class="d-inline-block course-time">{{item.time}} 小时</div>
            </div>
            <div class="course-process">
              <div class="d-inline-block position-relative process-box">
                <div class="position-absolute process-bar" :style="'width:'+item.process * 100+'%'"></div>
              </div>
              <span>已完成{{item.process * 100}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">未观看的课程 <small>（可以赠送给好友）</small></h4>
      </div>
      <div class="text-left online-courses">
        <div class="d-inline-block position-relative online-course" v-for="(item, index) in projects_new" :key="index"
             :class="{'online-course-right':(index+1)%3===0}">
          <div class="position-absolute cursor-pointer send">赠送</div>
          <img class="course-cover" :src="item.cover" alt="">
          <div class="text-center course-con">
            <div class="text-overflow-one course-title">{{item.title}}</div>
            <div class="text-overflow-one course-teacher">{{item.teacher}} | {{item.job}}</div>
            <div class="text-overflow-one course-nums">
              <div class="d-inline-block course-num">{{item.num}} 课时</div>
              <div class="d-inline-block course-time">{{item.time}} 小时</div>
            </div>
            <div class="course-process">
              <div class="d-inline-block position-relative process-box">
                <div class="position-absolute process-bar" :style="'width:'+item.process * 100+'%'"></div>
              </div>
              <span>已完成{{item.process * 100}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">已送出的课程</h4>
      </div>
      <div class="text-left online-courses">
        <div class="d-inline-block online-course" v-for="(item, index) in projects_send" :key="index"
             :class="{'online-course-right':(index+1)%3===0}">
          <img class="course-cover" :src="item.cover" alt="">
          <div class="text-center course-con">
            <div class="text-overflow-one course-title">{{item.title}}</div>
            <div class="text-overflow-one course-teacher">{{item.teacher}} | {{item.job}}</div>
            <div class="text-overflow-one course-nums">
              <div class="d-inline-block course-num">{{item.num}} 课时</div>
              <div class="d-inline-block course-time">{{item.time}} 小时</div>
            </div>
            <div class="course-receive">获赠人：{{item.receiver}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">已收到的课程</h4>
      </div>
      <div class="text-left online-courses">
        <div class="d-inline-block online-course" v-for="(item, index) in projects_receive" :key="index"
             :class="{'online-course-right':(index+1)%3===0}">
          <img class="course-cover" :src="item.cover" alt="">
          <div class="text-center course-con">
            <div class="text-overflow-one course-title">{{item.title}}</div>
            <div class="text-overflow-one course-teacher">{{item.teacher}} | {{item.job}}</div>
            <div class="text-overflow-one course-nums">
              <div class="d-inline-block course-num">{{item.num}} 课时</div>
              <div class="d-inline-block course-time">{{item.time}} 小时</div>
            </div>
            <div class="course-receive">赠送人：{{item.sender}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine01trip03buy',
  data () {
    return {
      projects: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0.8
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培中国中国培训行业发展培训行业发展训行业发展',
          teacher: '崔连彬',
          job: '留美博士中国培训行业发展',
          num: 5,
          time: 1.6,
          process: 0.8
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0.5
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0.1
        }
      ],
      projects_new: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培中国中国培训行业发展培训行业发展训行业发展',
          teacher: '崔连彬',
          job: '留美博士中国培训行业发展',
          num: 5,
          time: 1.6,
          process: 0
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          process: 0
        }
      ],
      projects_send: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          receiver: '接收人名字'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培中国中国培训行业发展培训行业发展训行业发展',
          teacher: '崔连彬',
          job: '留美博士中国培训行业发展',
          num: 5,
          time: 1.6,
          receiver: '接收人名字2'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          receiver: '接收人名字3'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          receiver: '接收人名字4'
        }
      ],
      projects_receive: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          sender: '赠送人名字1'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培中国中国培训行业发展培训行业发展训行业发展',
          teacher: '崔连彬',
          job: '留美博士中国培训行业发展',
          num: 5,
          time: 1.6,
          sender: '赠送人名字1'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          sender: '赠送人名字1'
        }, {
          id: 0,
          cover: '/images/test.png',
          title: '中国培训行业发展',
          teacher: '崔连彬',
          job: '留美博士',
          num: 5,
          time: 1.6,
          sender: '赠送人名字1'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .online-course {
    overflow: hidden;
  }
  .course-receive {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #ff6900;
  }
  .send {
    width: 74px;
    height: 34px;
    color: #fff;
    font-size: 15px;
    line-height: 20px;
    background-color: #ff6900;
    padding-left: 20px;
    bottom: -4px;
    right: -26px;
    transform: rotate(-45deg);
  }
</style>
