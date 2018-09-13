<template>
  <div class="container">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <!--导师秀-->
    <div class="border-bottom" v-for="(item, index) in teacher_show" :key="index">
      <div class="d-inline-block text-center show-left">
        <div class="show-teacher-cover" :style="'background-image: url('+item.cover+')'"></div>
        <div class="show-name">{{item.name}} | {{item.job}}</div>
        <div class="show-company">{{item.company}}</div>
      </div>
      <div class="d-inline-block show-con">
        <div class="msg">
          <div class="d-inline-block show-position">{{item.position}}</div>
          <div class="d-inline-block show-time">{{item.time}}</div>
        </div>
        <div class="show-title">{{item.title}}</div>
        <div class="show-join">
          <div class="d-inline-block text-overflow-one show-join-company">参训企业：{{item.join_company}}</div>
          <div class="d-inline-block text-overflow-one show-join-id">参训对象：{{item.join_id}}</div>
        </div>
        <div class="show-dec">{{item.dec}}</div>
        <div class="">
          <img class="show-cover" v-for="(it, ind) in item.show_pics" :key="ind" :src="it" alt="">
        </div>
      </div>
    </div>
    <!--分页-->
    <Paging class="paging" :key="pageData.total" :pageData="pageData" @changeList="change"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
import topBg from '@/components/topBg'
import localRoute from '@/components/localRoute'
export default {
  name: 'shows',
  data () {
    return {
      route_data: [{name: '享学科技网', path: '/'}, {name: '导师秀', path: '/tShow'}],
      teacher_show: [
        {
          cover: '/images/teacher/simple.png',
          name: '褚丽丽',
          job: '讲师',
          company: '安迪曼',
          title: '中国培训行业趋势发展解读',
          position: '广州市',
          time: '2018-09-07',
          join_company: '京东华南物流',
          join_id: '中级车管理人员',
          dec: '今天收腾讯今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请邀请',
          show_pics: [
            '/images/teacher/simple.png', '/images/teacher/simple.png',
            '/images/teacher/simple.png', '/images/teacher/simple.png', '/images/teacher/simple.png'
          ]
        }, {
          cover: '/images/teacher/simple.png',
          name: '褚丽丽',
          job: '讲师',
          company: '安迪曼',
          title: '中国培训行业趋势发展解读',
          position: '广州市',
          time: '2018-09-07',
          join_company: '京东华南物流',
          join_id: '中级车管理人员',
          dec: '今天收腾讯今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请邀请',
          show_pics: [
            '/images/teacher/simple.png', '/images/teacher/simple.png',
            '/images/teacher/simple.png', '/images/teacher/simple.png', '/images/teacher/simple.png'
          ]
        }, {
          cover: '/images/teacher/simple.png',
          name: '褚丽丽',
          job: '讲师',
          company: '安迪曼',
          title: '中国培训行业趋势发展解读',
          position: '广州市',
          time: '2018-09-07',
          join_company: '京东华南物流',
          join_id: '中级车管理人员',
          dec: '今天收腾讯今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请邀请',
          show_pics: [
            '/images/teacher/simple.png', '/images/teacher/simple.png',
            '/images/teacher/simple.png', '/images/teacher/simple.png', '/images/teacher/simple.png'
          ]
        }
      ],
      pageData: {
        total: 10,
        current: 1,
        visible: 8
      }
    }
  },
  components: {
    Paging, topBg, localRoute
  },
  methods: {
    change () {
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0;
}
.border-bottom {
  padding: 45px;
  border-bottom: 1px solid #e0e0e0;
}
/*导师秀*/
.show-left {
  margin-right: 85px;
}
.show-teacher-cover{
  width: 90px;
  height: 90px;
  border: 1px solid #ff6900;
  border-radius: 50%;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}
.show-name{
  font-size: 15px;
  color: #666;
  margin-bottom: 10px;
}
.show-company{
  width: 70px;
  height: 21px;
  line-height: 21px;
  font-size: 15px;
  color: #ff6900;
  border: 1px solid #ff6900;
  border-radius: 20px;
  margin: 0 auto;
}
.show-con{
  width: 83%;
  font-size: 15px;
  color: #666;
  vertical-align: top;
}
.msg{
  float: right;
  color: #999;
}
.show-position {
  line-height: 18px;
  padding-right: 20px;
  border-right: 1px solid #999;
}
.show-time {
  padding-left: 20px;
}
.show-title{
  font-size: 20px;
  color: #333;
  font-weight: 500;
  margin-bottom: 20px;
}
.show-join {
  width: 100%;
  margin-bottom: 30px;
}
.show-join-company {
  width: 40%;
}
.show-join-id {
  width: 59%;
}
.show-dec{
  margin-bottom: 30px;
}
.show-cover{
  width: 170px;
  height: 170px;
  margin-right: 16px;
}
.show-cover:last-of-type{
  margin-right: 0;
}
  .paging {
    margin-top: 60px;
  }
</style>
