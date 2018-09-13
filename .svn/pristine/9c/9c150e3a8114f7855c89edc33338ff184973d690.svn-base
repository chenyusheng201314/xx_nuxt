<template>
  <div>
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
    <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'course',
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
      pageData: {
        total: 10,
        current: 1,
        visible: 8
      }
    }
  },
  components: {Paging},
  methods: {
    // 切换分页
    paging (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped>
  .paging {
    margin-top: 45px;
    margin-bottom: 0!important;
  }
</style>
