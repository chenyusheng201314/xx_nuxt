<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">积分购</h4>
      </div>
      <div class="text-left online-courses">
        <div class="d-inline-block online-course" v-for="(item, index) in lesson.data" :key="index"
             :class="{'online-course-right':(index+1)%3===0}">
          <nuxt-link :to="'/class/'+item.id">
            <img class="course-cover" :src="item.course.cover" alt="">
            <div class="text-center course-con">
              <div class="text-overflow-one course-title">{{item.course.course_name}}</div>
              <div class="text-overflow-one course-teacher">{{item.organization_teacher.realname}} | {{item.organization_teacher.title}}</div>
              <div class="text-overflow-one course-nums">
                <div class="d-inline-block course-num">{{item.course.section_num}} 课时</div>
                <div class="d-inline-block course-time">{{item.course.media_time|s-h|fixed2}} 小时</div>
              </div>
              <div class="text-overflow-one lesson-price-point1">
                <span class="lesson-price-point">{{item.points}}</span> 积分&nbsp;&nbsp;
                <span class="lesson-price">{{item.course.price}} 学币</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mine04pointsBuy',
    data () {
      return {

      }
    },
    props:['user'],
    async asyncData({store}) {
      let res = await store.dispatch('mineGet', {
        url: '/app/course/course_jf_list',
        data: {
          page: 1,
          psize: 1000
        }
      })
      console.log('积分购课程 ',res.data)
      return {
        lesson: res.data,
      }
    },
  }
</script>
