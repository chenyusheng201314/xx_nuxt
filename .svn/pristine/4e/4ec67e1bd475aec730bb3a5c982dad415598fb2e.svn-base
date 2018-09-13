<template>
  <div id="detail" class="container">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <div class="border">
      <div class="top-title">导师介绍</div>
      <div class="cover-bg">
        <div class="cover">
          <img class="cover-img" :src="teacher.cover" alt="">
        </div>
      </div>
      <div class="d-inline-block con">
        <div class="name">
          <div class="d-inline-block cn-name">{{teacher.name}}</div>
          <div class="d-inline-block teacher-job">{{teacher.job}}</div>
          <div class="d-inline-block en-name">{{teacher.en_name}}</div>
          <div class="d-inline-block text-right shares">
            <div class="d-inline-block icon icon-follow" @click="follow(teacher.id)">关注导师</div>
            <div class="d-inline-block icon position-relative icon-share">分享导师
              <div class="position-absolute share-icon">
                <div class="share-icon-con">
                  <div class="share-out-icon share-weixin"></div>
                  <div class="share-out-icon share-qq"></div>
                  <div class="share-out-icon share-weibo"></div>
                </div>
              </div></div>
          </div>
        </div>
        <div class="teacher-dec">{{teacher.dec}}</div>
        <div class="text-overflow-one cursor-pointer teacher-special" :title="teacher.special"><span class="little-title">擅长领域：</span>{{teacher.special}}</div>
        <div class="text-overflow-one cursor-pointer teacher-style" :title="teacher.style"><span class="little-title">授课风格：</span>{{teacher.style}}</div>
        <div class="labels">
          <div class="d-inline-block label" v-for="(item, index) in teacher.labels" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="border">
      <div class="beijing" v-html="teacher.beijingjingyan"></div>
    </div>
    <!--服务案例-->
    <div class="border">
      <div class="top-title">服务案例</div>
      <div class="text-center services">
        <div class="server-scroll" id="server-scroll">
          <div class="d-inline-block service" v-for="(item, index) in teacher.service" :key="index">
            <img class="service-cover" :src="item.cover" alt="">
            <div class="service-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--在线课程-->
    <div class="border">
      <div class="top-title">他/她的在线课程</div>
      <div class="text-center online-courses">
        <div class="d-inline-block online-course" v-for="(item, index) in teacher.online_course" :key="index">
          <img class="course-cover" :src="item.cover" alt="">
          <div class="course-con">
            <div class="text-overflow-one course-title">{{item.title}}</div>
            <div class="text-overflow-one course-teacher">{{item.teacher}} | {{item.job}}</div>
            <div class="text-overflow-one course-nums">
              <div class="d-inline-block course-num">{{item.num}} 课时</div>
              <div class="d-inline-block course-time">{{item.time}} 小时</div>
            </div>
            <div class="course-price">
              <div class="d-inline-block course-price-now"><span class="price-num">{{item.price}}</span> 学币</div>
              <div class="d-inline-block course-price-old">{{item.price_old}} 学币</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--公开课时间-->
    <div class="border">
      <div class="top-title">公开课开课时间</div>
      <div class="open-courses">
        <div class="d-inline-block open-course" v-for="(item, index) in teacher.open_course" :key="index">
          <div class="d-inline-block open-course-icon">◇</div>
          <div class="d-inline-block text-overflow-one open-title">{{item.title}}</div>
          <div class="d-inline-block text-overflow-one open-time">{{item.time}}</div>
        </div>
      </div>
    </div>
    <!--学员评价-->
    <div class="border">
      <div class="top-title">学员评价</div>
      <div class="text-center accesses">
        <div class="d-inline-block access" v-for="(item, index) in teacher.stu_access" :key="index">
          <img class="access-cover" :src="item.cover" alt="">
            <div class="text-overflow-one access-name">{{item.name}}</div>
            <div class="text-overflow-fore cursor-pointer access-con" :title="item.con">{{item.con}}</div>
        </div>
      </div>
    </div>
    <!--导师秀-->
    <div class="border show-border">
      <div class="top-title">导师秀</div>
      <div class="show-time">{{teacher.teacher_show.time}}</div>
      <!--<img class="show-teacher-cover" :src="teacher.teacher_show.cover" alt="">-->
      <div class="d-inline-block show-teacher-cover" :style="'background-image: url('+teacher.teacher_show.cover+')'"></div>
      <div class="d-inline-block show-con">
        <div class="d-inline-block show-name">{{teacher.teacher_show.name}} | {{teacher.teacher_show.job}}</div>
        <div class="d-inline-block show-company">{{teacher.teacher_show.company}}</div>
        <div class="show-title">{{teacher.teacher_show.title}}</div>
      </div>
      <div class="show-dec">{{teacher.teacher_show.dec}}</div>
      <div class="">
        <img class="show-cover" v-for="(item, index) in teacher.teacher_show.show_pics" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import topBg from '@/components/topBg'
import localRoute from '@/components/localRoute'
export default {
  name: 'detail',
  data () {
    return {
      route_data: [{name: '享学科技网', path: '/'}, {name: '金牌导师', path: '/teachers'}],
      teacher: {
        id: 0,
        cover: '/images/teacher/simple.png',
        name: '褚丽丽',
        en_name: 'lilichu',
        job: '讲师',
        dec: '褚老师拥有10年企业褚老师拥有10年企业培训褚老师拥有10年企业培训褚老师拥有10年企业培训褚老师拥有10年企业培训培训',
        special: '擅长这些和那些、擅长这些和那些擅长这些和那些',
        style: '风格这些和那些、风格这些和那些、风格这些和那些。',
        labels: ['渴死四级', '渴死四级', '渴死四级', '渴死四级'],
        beijingjingyan: '背景经验富文本',
        service: [
          {
            cover: '/images/teacher/simple.png',
            name: '南方航空'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空11'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空22'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }, {
            cover: '/images/teacher/simple.png',
            name: '南方航空3'
          }
        ],
        online_course: [
          {
            id: 1,
            cover: '/images/teacher/simple.png',
            title: '中国培训行业发展趋势解读sad大大多多多大多多多',
            teacher: '崔连彬',
            job: '留美人力资源开发博士大萨达多多多大所多大多',
            num: 622222222,
            time: 1.6,
            price: '200',
            price_old: '211'
          }, {
            id: 2,
            cover: '/images/teacher/simple.png',
            title: '中国培训行业发展趋势解读',
            teacher: '崔连彬',
            job: '留美人力资源开发博士',
            num: 6,
            time: 1.6,
            price: '209',
            price_old: '211'
          }, {
            id: 3,
            cover: '/images/teacher/simple.png',
            title: '中国培训行业发展趋势解读',
            teacher: '崔连彬',
            job: '留美人力资源开发博士',
            num: 6,
            time: 1.6,
            price: '209',
            price_old: '211'
          }, {
            id: 4,
            cover: '/images/teacher/simple.png',
            title: '中国培训行业发展趋势解读',
            teacher: '崔连彬',
            job: '留美人力资源开发博士',
            num: 6,
            time: 1.6,
            price: '209',
            price_old: '211'
          }
        ],
        open_course: [
          {
            title: '中国培训行业发展趋势解读',
            time: '2018-9-10'
          }, {
            title: '中国培训行业发展趋势解读',
            time: '2018-9-10'
          }, {
            title: '中国培训行业发展趋势解读',
            time: '2018-9-10'
          }, {
            title: '中国培训行业发展趋势解读',
            time: '2018-9-10'
          }, {
            title: '中国培训行业发展趋势解读',
            time: '2018-9-10'
          }
        ],
        stu_access: [
          {
            cover: '/images/teacher/simple.png',
            name: '某个学员',
            con: '老师讲得老师讲得好老师讲得好老师讲得好老师讲得好老师讲得好好'
          }, {
            cover: '/images/teacher/simple.png',
            name: '某个学员',
            con: '老师讲得老师讲得好老师讲得好老师讲得好老师讲得好老师讲得好好'
          }, {
            cover: '/images/teacher/simple.png',
            name: '某个学员',
            con: '老师讲得老师讲得好老师讲得好老师讲得好老师讲得好老师讲得好好'
          }, {
            cover: '/images/teacher/simple.png',
            name: '某个学员',
            con: '老师讲得老师讲得好老师讲得好老师讲得讲得老师讲得好老师讲得好老师讲得好老师讲讲得老师讲得好老师讲得好老师讲得好老师讲讲得老师讲得好老师讲得好老师讲得好老师讲讲得老师讲得好老师讲得好老师讲得好老师讲好老师讲得好老师讲得好好'
          }
        ],
        teacher_show: {
          cover: '/images/teacher/simple.png',
          name: '褚丽丽',
          job: '讲师',
          title: '中国培训行业趋势发展解读',
          time: '2018-09-07',
          dec: '今天收腾讯今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请今天收腾讯邀请邀请',
          company: '安迪曼',
          show_pics: [
            '/images/teacher/simple.png', '/images/teacher/simple.png',
            '/images/teacher/simple.png', '/images/teacher/simple.png', '/images/teacher/simple.png'
          ]
        }
      }
    }
  },
  components: {
    topBg, localRoute
  },
  methods: {
    follow (id) {
      console.log('关注老师', id)
    }
  },
  mounted () {
    // let r = this.$router
    this.$data.route_data.push({name: '导师介绍', path: ''})
    console.log(this.$route)

    var abc = document.getElementById('server-scroll')
    abc.onmousewheel = function (e) {
      e = e || window.event
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }

      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      // console.log(e.wheelDelta)
      abc.scrollTo(abc.scrollLeft - e.wheelDelta, 0)
      // if (e.wheelDelta > 0) {
      //   abc.scrollTo(abc.scrollLeft + 10, 0)
      // } else {
      //   abc.scrollTo(abc.scrollLeft - 10, 0)
      // }
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .border {
    padding: 45px;
    margin-bottom: 20px;
  }
  .top-title {
    font-size: 20px;
    color: #ff6900;
    margin-bottom: 30px;
  }
  .cover-bg{
    width: 214px;
    height: 214px;
    display: inline-block;
    background: url("/images/teacher/circle.png") no-repeat center;
    background-size: cover;
    margin-right: 150px;
    overflow: hidden;
  }
  .cover {
    width: 192px;
    height: 192px;
    border-radius: 50%;
    margin: 10px auto 0;
    /*background: rgba(0,0,0,.2);*/
    overflow: hidden;
  }
  .cover-img{
    /*width: 100%;*/
    /*height: 100%;*/
    transform: scale(0.7);
    margin: -32px auto 0;
  }
  .con {
    width: 66%;
    font-size: 15px;
    color: #666;
    vertical-align: top;
  }
  .name {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
  }
  .shares {
    width: 59%;
    font-size: 15px;
    color: #666;
    margin-right: 80px;
  }
  .icon {
    /*width: 30px;*/
    /*height: 30px;*/
    /*vertical-align: middle;*/
  }
  .icon-follow {
    background: url("/images/teacher/follow.png") no-repeat left center;
    padding-left: 35px;
    margin-right: 45px;
  }
  .icon-follow:hover {
    background-image: url("/images/teacher/follow1.png");
  }
  .icon-share {
    background: url("/images/teacher/share.png") no-repeat left center;
    padding-left: 35px;
  }
  .icon-share:hover {
    background-image: url("/images/teacher/share1.png");
  }
  /*.icon-share:hover+.share-icon .share-icon-con{*/
    /*display: block!important;*/
  /*}*/
  .share-icon {
    width: 120px;
    height: 70px;
    top: -48px;
    right: -10px;
  }

  .share-icon-con {
    display: none;
    width: 120px;
    height: 32px;
    box-shadow: 0 4px 4px 2px rgba(0,0,0,.5);
    border-radius: 16px;
  }
  .share-icon:hover .share-icon-con {
    display: block!important;
  }
  .share-icon:hover .icon-share {
    background-image: url("/images/teacher/share1.png")!important;
  }
  .share-out-icon {
    width: 30px;
    height: 32px;
    display: inline-block;
    margin: 0 3px;
  }
  .share-weixin {
    background: url("/images/teacher/weixin.png") no-repeat center;
  }
  .share-weixin:hover {
    background-image: url("/images/teacher/weixin1.png");
  }
  .share-qq {
    background: url("/images/teacher/qq.png") no-repeat center;
  }
  .share-qq:hover {
    background-image: url("/images/teacher/qq1.png");
  }
  .share-weibo {
    background: url("/images/teacher/weibo.png") no-repeat center;
  }
  .share-weibo:hover {
    background-image: url("/images/teacher/weibo1.png");
  }
  .cn-name {

  }
  .teacher-job {

  }
  .en-name {
    margin-left: 45px;
  }
  .teacher-dec {
    margin-bottom: 20px;
  }
  .little-title {
    color: #333;
    font-weight: 500;
  }
  .teacher-special {
    margin-bottom: 4px;
  }
  .teacher-style {
    margin-bottom: 20px;
  }
  .labels {

  }
  .label {
    font-size: 15px;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ff6900;
    border: 1px solid #ff6900;
    margin-right: 5px;
  }
  /*服务案例*/
  .services {
    width: 100%;
    height: 210px;
  }
  .server-scroll::-webkit-scrollbar {
    height:10px;
  }
  .server-scroll::-webkit-scrollbar-thumb{
    background:#fff;
    border-radius:4px;
  }
  .server-scroll {
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .services:hover .server-scroll::-webkit-scrollbar-thumb {
    background:#ddd;
  }
  .service {
    width: 150px;
    height: 150px;
    margin-right: 42px;
  }

  .service-cover {
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
  }
  /*在线课程*/
  .online-courses {
    font-size: 0;
  }
  .online-course {
    width: 270px;
    border: 1px solid #dcdcdc;
    margin-right: 9px;
  }
  .online-course:last-of-type {
    margin-right: 0;
  }
  .course-cover {
    width: 100%;
    height: 152px;
    margin-bottom: 10px;
  }
  .course-con {
    padding: 10px 26px;
  }
  .course-title {
    font-size: 15px;
    color: #666;
    margin-bottom: 10px;
  }
  .course-teacher {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .course-nums {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .course-num {
    background: url("/images/teacher/num.png") no-repeat left center;
    margin-right: 10px;
    padding-left: 20px;
  }
  .course-time {
    background: url("/images/teacher/time.png") no-repeat left center;
    padding-left: 20px;
  }

  .course-price {
    font-size: 15px;
    color: #999;
  }
  .course-price-now {
    color: #ff6900;
  }
  .price-num{
    font-size: 18px;
  }
  .course-price-old {
    text-decoration: line-through;
  }
  /*公开课*/
  .open-courses{
    font-size: 15px;
    color: #666;
  }
  .open-course{
    width: 50%;
  }
  .open-course-icon{
    vertical-align: top;
  }
  .open-title{
    width: 62%;
  }
  .open-time{
    width: 32%;
  }
  /*学员评价*/
  .accesses{
  }
  .access{
    width: 230px;
    height: 321px;
    padding: 15px 10px;
    margin-right: 62px;
    border: 1px solid #e0e0e0;
  }
  .access:last-of-type{
    margin-right: 0;
  }
  .access-cover{
    width: 120px;
    height: 120px;
    border: 1px solid #ff6900;
    border-radius: 50%;
    margin: 0 auto 20px;
  }
  .access-name{
    font-size: 18px;
    color: #333;
    margin-bottom: 14px;
  }
  .access-con{
    font-size: 15px;
    color: #666;
    min-height: 88px;
  }
  /*导师秀*/
  .show-teacher-cover{
    width: 90px;
    height: 90px;
    border: 1px solid #ff6900;
    border-radius: 50%;
    margin-right: 20px;
    margin-bottom: 30px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }
  .show-con{
    font-size: 18px;
    color: #333;
    vertical-align: top;
    margin-top: 10px;
  }
  .show-name{
    margin-bottom: 10px;
    font-weight: 500;
  }
  .show-company{
    font-size: 15px;
    padding: 0 10px;
    color: #ff6900;
    border: 1px solid #ff6900;
    border-radius: 20px;
    vertical-align: top;
  }
  .show-title{
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  .show-time {
    float: right;
    margin-top: 45px;
  }
  .show-dec{
    font-size: 15px;
    color: #666;
    margin-bottom: 30px;
  }
  .show-cover{
    width: 200px;
    height: 200px;
    margin-right: 26px;
  }
  .show-cover:last-of-type{
    margin-right: 0;
  }
  .show-border {
    margin-bottom: 60px;
  }
</style>
