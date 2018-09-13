<template>
<div id="home" class="">
  <!--banner轮播-->
  <div class="position-relative">
    <div class="swiper-container swiper-container-banner row">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index"><a href=""><img class="swiper-img-banner" :src="item" alt="没有？" /></a></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination swiper-pagination-banner"></div>
      <!--<div class="swiper-button-prev"></div>&lt;!&ndash;左箭头&ndash;&gt;-->
      <!--<div class="swiper-button-next"></div>&lt;!&ndash;右箭头&ndash;&gt;-->
    </div>
    <!--轮播悬浮导航-->
    <div class="container">
      <ul class="position-absolute  home-ul">
        <li class="cursor-pointer home-li" @click="to_class(1)">全部</li>
        <li class="cursor-pointer home-li" @click="to_class(2)">领导力学习</li>
        <li class="cursor-pointer home-li" @click="to_class(3)">内训师</li>
        <li class="cursor-pointer home-li" @click="to_class(4)">绩效改进</li>
        <li class="cursor-pointer home-li" @click="to_class(5)">企业管理</li>
        <li class="cursor-pointer home-li" @click="to_class(6)">公开课</li>
        <li class="cursor-pointer home-li" @click="to_class(7)">企业内训 TDF</li>
      </ul>
    </div>
  </div>
  <!--内容区域-->
  <div class="container position-relative">
    <!--5个活动优惠-->
    <div class="container-active5">
    <div class="active5">
      <div class="text-center active5-li">
        <div :class="{'active5-img-hover': active5Index === 0}">
        <img class="active5-img" :class="{'active5-img-up': active5Index === 0}" src="/images/home/1.png" alt="">
        </div>
        <div class="active5-line" v-show="active5Index !== 0"></div>
        <div class="active5-text" :class="{'active5-text-only': active5Index !== 0}">限时免费</div>
        <!--<transition name="fade">-->
          <div class="cursor-pointer active5-view" v-show="active5Index === 0">点击查看</div>
        <!--</transition>-->
      </div>
      <div class="text-center active5-li">
        <div :class="{'active5-img-hover': active5Index === 1}">
          <img class="active5-img" :class="{'active5-img-up': active5Index === 1}" src="/images/home/2.png" alt="">
        </div>
        <div class="active5-line" v-show="active5Index !== 1"></div>
        <div class="active5-text" :class="{'active5-text-only': active5Index !== 1}">买一赠一</div>
        <!--<transition name="fade">-->
          <div class="cursor-pointer active5-view" v-show="active5Index === 1">点击查看</div>
        <!--</transition>-->
      </div>
      <div class="text-center active5-li">
        <div :class="{'active5-img-hover': active5Index === 2}">
        <!--<div :class="{'active5-img-hover': 2}">-->
          <img class="active5-img" :class="{'active5-img-up': active5Index === 2}" src="/images/home/3.png" alt="">
        </div>
        <div class="active5-line" v-show="active5Index !== 2"></div>
        <div class="active5-text">积分购</div>
        <!--<transition name="fade">-->
          <div class="cursor-pointer active5-view" v-show="active5Index === 2">点击查看</div>
        <!--</transition>-->
      </div>
      <div class="text-center active5-li">
        <div :class="{'active5-img-hover': active5Index === 3}">
          <img class="active5-img" :class="{'active5-img-up': active5Index === 3}" src="/images/home/4.png" alt="">
        </div>
        <div class="active5-line" v-show="active5Index !== 3"></div>
        <div class="active5-text">最新课程</div>
        <!--<transition name="fade">-->
          <div class="cursor-pointer active5-view" v-show="active5Index === 3">点击查看</div>
        <!--</transition>-->
      </div>
      <div class="text-center active5-li">
        <div :class="{'active5-img-hover': active5Index === 4}">
          <img class="active5-img" :class="{'active5-img-up': active5Index === 4}" src="/images/home/5.png" alt="">
        </div>
        <div class="active5-line" v-show="active5Index !== 4"></div>
        <div class="active5-text">特价课程</div>
        <!--<transition name="fade">-->
          <div class="cursor-pointer active5-view" v-show="active5Index === 4">点击查看</div>
        <!--</transition>-->
      </div>
    </div>
    </div>
    <!--/*精品课程*/-->
    <section class="text-center">
      <h4 class="position-relative title"><div class="title-text">精品课程</div></h4>
      <div class="sub-title">EXCELLENT COURSE</div>
      <div class="all">全部 > </div>
      <div class="lesson-main">
        <img class="lesson-main-cover" :src="lessons[0].cover" alt="">
      </div>
      <div class="text-left lessons">
        <ul style="width: 100%;">
          <li class="position-relative lesson" v-for="(item, index) in lessons" :key="index" :class="{'lesson-bottom-top': index> 2}" >
            <img class="lesson-cover" :src="item.cover" alt="">
            <div class="lesson-con">
              <div class="text-overflow-one lesson-title">{{item.title}}</div>
              <div class="text-overflow-one lesson-teacher">
                <span class="">{{item.teacher}}</span>
                <span class="lesson-job">{{item.job}}</span>
              </div>
              <div class="text-overflow-one lesson-num">
                <img class="lesson-icon" src="/images/home/num.png" alt="">
                <span class="">{{item.num}} 课时</span>
                <img class="lesson-icon" src="/images/home/time.png" alt="">
                <span class="lesson-time">{{item.time}} 小时</span>
              </div>
              <div class="text-overflow-one lesson-price">
                <span class="price-now">{{item.price}} 学币</span>
                <span class="price-old">{{item.price_old}} 学币</span>
              </div>
            </div>
            <div class="position-absolute line-right" :class="{'line-right-top': index>2}" v-show="(index+1)%3!==0 && index !== lessons.length-1"></div>
            <div class="position-absolute line-bottom" :class="{'line-bottom-left': index>0}" v-show="index< lessons.length - (lessons.length)%3"></div>
          </li>
        </ul>
      </div>
    </section>
    <!--/*金牌导师*/-->
    <section class="text-center">
      <h4 class="position-relative title"><div class="title-text">金牌导师</div></h4>
      <div class="sub-title">GOLD MEDALS TUTORS</div>
      <div class="all">
        <nuxt-link to="/teacher"> 全部 > </nuxt-link>
      </div>
      <div class="position-relative cursor-pointer teacher-main">
        <nuxt-link :to="'/teacher/' + teachers[0][0].id">
          <img class="teacher-main-cover" :src="teachers[0][0].cover" alt="">
          <div class="position-absolute teacher-main-hover">
            <div class="teacher-main-name">{{teachers_main.name}} | {{teachers_main.job}}</div>
            <div class="teacher-main-line"></div>
            <div class="teacher-main-company">{{teachers_main.company}}</div>
            <div class="teacher-main-special" v-for="(item, index) in teachers_main.special" :key="index">{{item}}</div>
          </div>
        </nuxt-link>
      </div>
      <div class="text-left teachers">
        <!--导师轮播-->
        <div class="swiper-container swiper-container-teacher">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in teachers" :key="index">
              <div class="position-relative text-center teacher" v-for="(it, ind) in item"
                   :key="ind" :class="{'teacher-margin-left': ind%3===0, 'teacher-margin-bottom':ind === 0}">
                <nuxt-link :to="'/teacher/' + it.id">
                  <img class="teacher-main-cover" :src="it.cover" alt="">
                  <div class="position-absolute teacher-hover">
                    <div class="teacher-main-name">{{it.name}} | {{it.job}} /{{ind}}</div>
                    <div class="teacher-main-line"></div>
                    <div class="teacher-main-company">{{it.company}}</div>
                    <div class="teacher-special" v-for="(v, i) in it.special" :key="i"
                         :class="{'teacher-special-margin': i%2===0}">{{v}}</div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination swiper-pagination-teacher"></div>
        </div>
      </div>
    </section>
    <!--公开课和资讯-->
    <section class="text-left">
      <div class="courses">
        <div class="title-border-left">
          <h4 class="courses-title"><div class="courses-stitle-text">公开课</div></h4>
          <div class="courses-all">
            <nuxt-link to="/"> 全部 > </nuxt-link>
          </div>
          <div class="courses-sub-title">OPEN CLASS</div>
        </div>
        <div class="course" v-for="(item, index) in courses" :key="index"  :data-index="index"
             :class="{'course-margin': index%2===0}" @click="to_open(item.id)">
          <img class="course-cover" :src="item.cover" alt="">
          <div class="position-relative course-con">
            <div class="position-absolute triangle"></div>
            <div class="course-teacher">{{item.teacher}}</div>
            <div class="course-title">{{item.title}}</div>
            <div class="course-date">{{item.date}}</div>
          </div>
        </div>
      </div>
      <div class="news">
        <div class="title-border-left">
          <h4 class="courses-title"><div class="courses-stitle-text">行业资讯</div></h4>
          <div class="courses-all">
            <nuxt-link to="/news/news">更多 > </nuxt-link>
          </div>
          <div class="courses-sub-title">INDUSTRY INFORMATION</div>
        </div>
        <div class="new" v-for="(item, index) in news" :key="index">
          <nuxt-link :to="'/news/' +item.id">
            <img class="new-cover" :src="item.cover" alt="">
            <div class="new-con">
              <div class="text-overflow-two new-title">{{item.title}}</div>
              <div class="new-date">{{item.date}}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>
    <!--训练营和学院反馈-->
    <section class="text-left">
      <div class="courses trains">
        <div class="title-border-left">
          <h4 class="courses-title"><div class="courses-stitle-text">训练营</div></h4>
          <div class="courses-all">全部 > </div>
          <div class="courses-sub-title">TRAINING CAMP</div>
        </div>
        <div class="train" v-for="(item, index) in trains" :key="index">
          <img class="train-cover" :src="item.cover" alt="">
          <div class="position-relative train-con">
            <div class="text-overflow-one train-title">{{item.title}}</div>
            <div class="train-pass"><img class="icon-num" src="/images/home/num.png" alt="">共 {{item.pass}} 关</div>
            <div class="train-price">
              <div class="train-price-now"><span class="train-price-now-number">{{item.price}}</span>学币</div>
              <div class="train-price-old"><span class="train-price-old-number">{{item.price_old}}</span>学币</div>
            </div>
            <div class="text-overflow-fore train-dec">{{item.dec}}</div>
          </div>
        </div>
      </div>
      <div class="news backs">
        <div class="title-border-left">
          <h4 class="text-overflow-one courses-title"><div class="courses-stitle-text">学院反馈</div></h4>
          <div class="courses-all"><img class="icon-change" src="/images/home/change.png" alt=""> 换一批</div>
          <div class="courses-sub-title">FEEDBACK FROM STUDENTS</div>
        </div>
        <div class="back" v-for="(item, index) in backs" :key="index">
          <img class="back-cover" :src="item.cover" alt="">
          <div class="back-con">
            <div class="back-belong">{{item.belong}}</div>
            <div class="back-title">{{item.name}}</div>
            <div class="back-job">{{item.job}}</div>
          </div>
          <div class="text-overflow-fore back-dec">{{item.dec}}</div>
        </div>
      </div>
    </section>
    <!--/*导师博客*/-->
    <section class="text-center">
      <h4 class="position-relative title"><div class="title-text">导师博客</div></h4>
      <div class="sub-title">TUTOR'S BLOG</div>
      <div class="all">全部 > </div>
      <ul class="text-left blogs">
        <li class="cursor-pointer blog" v-for="(item, index) in blogs" :key="index" :class="{'blog-border': index%2===1}">
          <img class="blog-cover" :src="item.cover" alt="">
          <div class="blog-con">
            <div class="text-overflow-one blog-title">{{item.title}}</div>
            <div class="text-overflow-one blog-teacher">{{item.teacher}} | {{item.job}}</div>
          </div>
        </li>
      </ul>
    </section>
    <div class="text-center gg-bottom">广告</div>
    <!--/*企业案例*/-->
    <section class="text-center">
      <h4 class="position-relative title"><div class="title-text">企业案例</div></h4>
      <div class="sub-title">ENTERPRISE CASE</div>
      <div class="all">全部 > </div>
      <div class="text-left business">
        <!--企业案例轮播-->
        <div class="swiper-container swiper-container-business">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in business" :key="index">
                <img  v-for="(it, ind) in item" :key="ind" class="business-cover" :src="it"
                      :class="{'business-cover-right': (ind+1)%5 === 0}">
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination swiper-pagination-business"></div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  // layout: 'index',
  name: 'home',
  data () {
    return {
      topGg: false,
      gg: '广告',
      banners: ['/images/test.png', '/images/logo.png', '/images/test.png'],
      active5Index: -1,
      lessons: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '中国势解读',
          teacher: '崔连彬',
          job: '留美士',
          num: '6',
          time: '1.6',
          price: '200',
          price_old: '500',
          hover: false
        }, {
          id: 1,
          cover: '/images/test.png',
          title: '中国培训行留美人力资源开发博士业解读',
          teacher: '崔连彬',
          job: '留美人力资留美人力资源开发博士源开发博士',
          num: '6',
          time: '1.6',
          price: '200',
          price_old: '500',
          hover: false
        }, {
          id: 2,
          cover: '/images/test.png',
          title: '中国培训势解读',
          teacher: '崔连彬',
          job: '留美士留美人力资源开发博士发博士',
          num: '6',
          time: '1.6',
          price: '200',
          price_old: '500',
          hover: false
        }, {
          id: 3,
          cover: '/images/test.png',
          title: '中国培训势解读',
          teacher: '崔连彬',
          job: '留美人发博士',
          num: '6000',
          time: '16000',
          price: '200000',
          price_old: '500留美人力资源开发博士000',
          hover: false
        }, {
          id: 3,
          cover: '/images/test.png',
          title: '中国培训势解读',
          teacher: '崔连彬',
          job: '留美人发博士',
          num: '6000',
          time: '16000',
          price: '200000',
          price_old: '500留美人力资源开发博士000',
          hover: false
        }
      ],
      teachers: [
        [
          {
            id: 0,
            cover: '/images/test.png',
            name: '崔连彬1111',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]
          },
          {
            id: 1,
            cover: '/images/test.png',
            name: '崔连彬22',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]
          },
          {
            id: 2,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]
          },
          {
            id: 3,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]},
          {
            id: 4,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]},
          {
            id: 5,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]},
          {
            id: 6,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]}], [
          {
            id: 7,
            cover: '/images/test.png',
            name: '崔连彬',
            job: '博士',
            company: '安迪曼',
            special: [
              '首席技术官',
              '可是司机',
              '留美博士',
              'DACUM引导师'
            ]}
        ]],
      teachers_main: {
        id: 100,
        cover: '/images/test.png',
        name: '崔连彬100',
        job: '博士',
        company: '安迪曼',
        special: [
          '首席技术官',
          '可是司机',
          '留美博士',
          'DACUM引导师'
        ]
      },
      courses: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          teacher: '曹晓多',
          position: '上海',
          date: '7月6号~7月8号'
        }, {
          id: 3,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          teacher: '曹晓多',
          position: '上海',
          date: '7月6号~7月8号'
        }, {
          id: 5,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          teacher: '曹晓多',
          position: '上海',
          date: '7月6号~7月8号'
        }, {
          id: 12,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          teacher: '曹晓多',
          position: '上海',
          date: '7月6号~7月8号'
        }
      ],
      news: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '给予岗位序列给予岗位序列的给予课程给予岗位序列的给予课程的给予课程',
          date: '2018-08-9'
        }, {
          id: 3,
          cover: '/images/test.png',
          title: '给予岗位序给予岗位序列的给予课程给予岗位序列的给予课程给予岗位序列的给予课程列的给予课程',
          date: '2018-08-9'
        }, {
          id: 5,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          date: '2018-08-9'
        }, {
          id: 12,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          date: '2018-08-9'
        }, {
          id: 5,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          date: '2018-08-9'
        }, {
          id: 12,
          cover: '/images/test.png',
          title: '给予岗位序列的给予课程',
          date: '2018-08-9'
        }
      ],
      trains: [
        {
          id: 0,
          cover: '/images/test.png',
          title: 'TDF线上课程',
          pass: '5',
          price: '128000',
          price_old: '128001',
          dec: '导师：崔连彬给予岗位序崔连彬给予岗位序给予岗位序列的给予课程给予岗位序列的给予课程给予岗位序列的给予课程列的给予课程给予岗位序列的给予课程给予岗位序列的给予课程给予岗位序列的给予课程列的给予课程'
        }, {
          id: 2,
          cover: '/images/test.png',
          title: 'TDF线上课程',
          pass: '5',
          price: '128000',
          price_old: '128001',
          dec: '导师：崔连彬给予岗位序给予岗位序列的给予课程给予岗位序列的给予课程给予岗位序列的给予课程列的给予课程'
        }
      ],
      backs: [
        {
          id: 0,
          cover: '/images/test.png',
          name: '华为 蜘蛛侠',
          job: '大学教育主管',
          belong: '蒲公英计划学员',
          dec: '很好给予岗位序列给予岗位序很好给予岗位序列给予岗位序列的给予课程给予岗位序列的给予课程的给予课程很好给予岗位序列给予岗位序列的给予课程给予岗位序列的给予课程的给予课程列的给予课程给予岗位序列的给予课程的给予课程'
        }, {
          id: 0,
          cover: '/images/test.png',
          name: '华为 蜘蛛侠',
          job: '大学教育主管',
          belong: '蒲公英计划学员',
          dec: '很好给予岗位序列给予岗位序列的给予课程给予岗位序列的给予课程的给予课程'
        }, {
          id: 0,
          cover: '/images/test.png',
          name: '华为 蜘蛛侠',
          job: '大学教育主管',
          belong: '蒲公英计划学员',
          dec: '很好给予岗位序列给予岗位序列的给予课程给予岗位序列的给予课程的给予课程'
        }
      ],
      blogs: [
        {
          id: 0,
          cover: '/images/test.png',
          title: '领导者不是杀死问题！',
          teacher: '崔连彬',
          job: '博士'
        }, {
          id: 1,
          cover: '/images/test.png',
          title: '领导者不是杀领导者不是杀死问题领导者不是杀死问题死问题！',
          teacher: '崔连彬',
          job: '博士领导者不是杀死问题领导者不是杀死问题领导者不是杀死问题'
        }, {
          id: 2,
          cover: '/images/test.png',
          title: '领导者不是杀死问题！',
          teacher: '崔连彬',
          job: '博士'
        }
      ],
      business: [
        [
          '/images/test.png', '/images/logo.png', '/images/test.png',
          '/images/test.png', '/images/logo.png', '/images/test.png',
          '/images/test.png', '/images/logo.png', '/images/test.png',
          '/images/test.png'
        ], [
          '/images/test.png', '/images/logo.png', '/images/test.png',
          '/images/test.png', '/images/logo.png', '/images/test.png'
        ]
      ]
    }
  },
  methods: {
    init () {
      let that = this
      // banner轮播
      /* eslint-disable no-new */
      new Swiper('.swiper-container-banner', {
        autoplay: false,
        delay: 3000,
        loop: true,
        speed: 500,
        grabCursor: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination-banner',
          clickable: true
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        on: {
          click (event) {
            console.log('1', event)
          }
        }
      })

      // 优惠hover
      let li = document.getElementsByClassName('active5-li')
      let len = li.length
      for (let i = 0; i < len; i++) {
        li[i].addEventListener('mouseenter', () => {
          // console.log(i)
          that.$data.active5Index = i
        }, false)
        li[i].addEventListener('mouseleave', () => {
          // console.log('out', i)
          that.$data.active5Index = -1
        }, false)
      }

      // 老师轮播
      /* eslint-disable no-new */
      new Swiper('.swiper-container-teacher', {
        autoplay: false,
        delay: 2000,
        loop: true,
        speed: 500,
        grabCursor: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination-teacher',
          clickable: true,
          modifierClass: 'teacher-pagination-'
        }
      })
      // 企业案例轮播
      /* eslint-disable no-new */
      new Swiper('.swiper-container-business', {
        autoplay: false,
        delay: 2000,
        loop: true,
        speed: 500,
        grabCursor: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination-business',
          clickable: true,
          modifierClass: 'business-pagination-',
          bulletClass: 'business-pagination-bullet'
        },
        on: {
          click (event) {
            console.log('3', event)
          }
        }
      })
    },
    // 跳转公开课详情页
    to_open (id) {
      this.$router.push({path:'/open/detail',query:{id}})
    },
    // 跳转到课程分类页面
    to_class(type){
      this.$router.push({path:'/class/list',query:{type}})
    },
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  .swiper-container-banner {
    /*width: 100%;*/
    height: 600px;
    text-align: center;

    margin-left: -15px!important;
    margin-right: -15px!important;
  }
  .swiper-img-banner {
    width: 100%;
    vertical-align: middle;
  }

  .container {
    padding: 0;
  }

  /*banner的悬浮导航*/
  .home-ul {
    color: #fff;
    font-size: 18px;
    width: 300px;
    height: 600px;
    list-style: none;
    background-color: rgba(0,0,0,.6);
    padding-left: 48px;
    margin: 0;
    top: 0;
    z-index: 11;
    /*opacity: 0.5;*/
  }
  .home-li {
    width: 100%;
    height: 62px;
    line-height: 62px;
  }
  .home-li::before {
    content: '·';
    font-size: 40px;
    margin-right: 10px;
    vertical-align: top;
  }
  /*5个优惠*/
  .container-active5 {
    height: 212px;
    margin-bottom: 70px;
    height: 212px;
    border-bottom: 1px solid #d1d1d1;
  }
  .active5 {
    width: 100%;
    position: absolute;
    top: -70px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    display: flex;
    z-index: 12;
  }
  .active5-li {
    box-sizing: border-box;
    flex: 1;
  }
  .active5-img {
    box-sizing: content-box;
    width: 68px;
    height: 68px;
    padding-top: 26px;
  }
  .active5-img-up {
    transition: transform 1ms;
    transform: translateY(-30px);
  }
  .active5-img-hover {
    background-color: #fff;
    padding: 26px 0 0;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 8px 4px rgba(0,0,0,.2);
    transition: transform 300ms;
    transform: translateY(-30px);
  }

  .active5-text {
    font-size: 25px;
  }
  .active5-text-only {
    margin-bottom: 64px;
  }
  .active5-line {
    width: 110px;
    height: 2px;
    border-bottom: 2px solid #ff6900;
    margin: 20px auto 30px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .active5-view {
    width: 122px;
    height: 39px;
    font-size: 20px;
    line-height: 39px;
    border-radius: 20px;
    color: #fff;
    background-color: #ff6900;
    margin: 30px auto 30px;
  }
  /*精品课程*/
  section {
    margin-bottom: 70px;
  }
  .title {
    font-size: 30px;
    color: #333;
    width: 100%;
    border-bottom: 1px solid #d1d1d1;
    /*padding-bottom: 23px;*/
    margin-bottom: 18px;
  }
  .title-text {
    width: 140px;
    border-bottom: 2px solid #ff6900;
    padding-bottom: 23px;
    margin: 0 auto -1px;
  }
  .sub-title {
    font-size: 15px;
    color: #888;
    margin-bottom: 20px;
  }
  .all {
    text-align: right;
    font-size: 18px;
    color: #999;
    margin-bottom: 20px;
  }
  .lesson-main {
    display: inline-block;
    width: 340px;
    height: 598px;
    border-radius: 14px;
    overflow: hidden;
    background-color: #999;
  }
  .lesson-main-cover {
    width: 100%;
    height: 100%;
  }
  .lessons {
    display: inline-block;
    vertical-align: top;
    width: 70%;
    margin-left: 13px;
  }
  .lesson {
    width: 260px;
    float: left;
    /*overflow: hidden;*/
    margin: 0 10px;
  }

  .lesson-bottom-top {
    margin-top: 20px;
  }
  /*.lesson-border-right {*/
    /*border-right: 1px solid #ddd;*/
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
  /*}*/
  /*.lesson-border-bottom {*/
    /*border-bottom: 1px solid #ddd;*/
    /*padding-top: 16px;*/
    /*padding-bottom: 16px;*/
  /*}*/
  .line-right {
    width: 1px;
    height: 294px;
    background-color: #ddd;
    right: -10px;
    top: 0;
  }
  .line-bottom {
    width: 280px;
    height: 1px;
    background-color: #ddd;
    bottom: -10px;
    left: 0;
  }
  .line-right-top {
    top: -10px;
  }
  .line-bottom-left {
    left: -10px;
  }
  .lesson-cover {
    width: 260px;
    height: 160px;
    border-radius: 14px;
  }

  .lesson-con {
    box-sizing: border-box;
    width: 100%;
    padding: 14px 16px 1px;
  }
  .lesson-title {
    font-size: 18px;
    color: #333;
  }
  .lesson-job {
    margin-left: 6px;
    padding-left: 6px;
    border-left: 1px solid #999;
  }
  .lesson-teacher, .lesson-num, .lesson-price {
    font-size: 15px;
    color: #999;
    margin-top: 4px;
  }
  .price-now {
    font-size: 18px;
    color: #ff6900;
  }
  .lesson:hover .lesson-cover,
  .lesson:hover .lesson-title,
  .lesson:hover .lesson-teacher,
  .lesson:hover .lesson-job,
  .lesson:hover .lesson-num,
  .lesson:hover .lesson-price

  {
    transition: all 300ms;
    transform: translateY(-20px);
  }
  /*金牌导师*/
  .teacher-main {
    width: 410px;
    height: 610px;
    display: inline-block;
    /*border: 2px solid #ff6900;*/
    border-width: 2px;
    border-style: solid;
    border-color: #ff6900;
    overflow: hidden;
  }
  .teacher-main-cover {
    width: 100%;
    height: 100%;
  }
  .teacher-main-hover{
    width: 100%;
    height: 108px;
    color: #fff;
    background-color: #ff6900;
    opacity: 0.5;
    padding: 24px 24px 0;
    bottom: 0;
  }
  .teacher-main-hover:hover{
    height: 220px;
    transition: height 300ms;
  }
  .teacher-main-name {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .teacher-main-line {
    width: 104px;
    height: 1px;
    border-bottom: 2px dashed #fff;
    margin: 0 auto 10px;
  }
  .teacher-main-company {
    font-size: 15px;
    margin-bottom: 20px;
  }
  .teacher-main-special {
    width: 123px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    border: 1px solid #fff;
    display: inline-block;
    margin: 0 24px 20px;
  }
  .teachers {
    width: 64%;
    height: 710px;
    display: inline-block;
    vertical-align: top;
    margin-left: 16px;
    font-size: 0;
  }
  .swiper-container-teacher {
    width: 100%;
    height: 100%;
  }

  .teacher {
    width: 240px;
    height: 300px;
    display: inline-block;
    border: 1px solid #999;
    margin-left: 20px;
    /*overflow: hidden;*/
  }
  .teacher-margin-bottom {
    margin-bottom: 10px;
  }
  .teacher-margin-left {
    margin-left: 6px;
  }
  .teacher-hover{
    width: 100%;
    height: 96px;
    color: #fff;
    background-color: #ff6900;
    opacity: 0.5;
    padding: 10px 10px 0;
    bottom: 0;
  }
  .teacher-hover:hover{
    height: 220px;
    transition: height 500ms;
  }
  .teacher-hover-active {
    height: 220px;
    transition: height 500ms;
  }
  .teacher-special {
    width: 90px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    border: 1px solid #fff;
    display: inline-block;
    margin-bottom:20px;
  }
  .teacher-special-margin {
    margin-right: 16px;
  }
  .teacher-pagination {
    position: absolute;
    text-align: center;
    -webkit-transition: .3s opacity;
    -o-transition: .3s opacity;
    transition: .3s opacity;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    z-index: 10;
  }
  .swiper-container-horizontal>.teacher-pagination-bullets, .teacher-pagination-custom, .teacher-pagination-fraction {
    bottom: 0;
    left: -430px;
    height: 100px;
    width: 1100px;
    background: #fff;
  }
  /*公开课和资讯*/
  .courses {
    width: 65%;
    display: inline-block;
  }
  .courses-title-text{
    font-size: 30px;
    color: #333;
  }
  .title-border-left{
    padding-left: 20px;
    border-left: 2px solid #ff5900;
    margin-bottom: 30px;
  }
  .courses-sub-title{
    font-size: 15px;
    color: #888;
  }
  .courses-all{
    font-size: 18px;
    color: #999;
    float: right;
  }
  .course {
    width: 49%;
    height: 276px;
    display: inline-block;
    border-bottom: 2px solid #ff6900;
    cursor: pointer;
  }
  .course-margin {
    margin: 0 10px 10px 0;
  }
  .course-cover {
    width: 100%;
    height: 200px;
  }
  .course-con {
    padding: 10px 20px 10px 14px;
    background-color: #fff;
    /*color: #333;*/
  }
  .triangle {
    width: 20px;
    height: 20px;
    background-color: #fff;
    left: 30px;
    top: -10px;
    transform: rotate(45deg);
  }
  .course-teacher, .course-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 6px;
  }
  .course-teacher {
    float: right;
  }
  .course-date {
    font-size: 15px;
    color: #999;
  }
  .course:hover .course-teacher,
  .course:hover .course-title,
  .course:hover .course-date
  {
    color: #fff;
  }
  .course:hover .course-con,
  .course:hover .triangle
  {
    background-color: #ff6900;
  }
  .news {
    width: 32%;
    display: inline-block;
    vertical-align: top;
    margin-left: 30px;
  }
  .new {
    margin-bottom: 18px;
  }
  .new-cover {
    width: 148px;
    height: 79px;
    vertical-align: top;
    margin-right: 6px;
  }
  .new-con {
    display: inline-block;
  }
  .new-title {
    width: 230px;
    font-size: 18px;
    color: #333;
    margin-bottom: 6px;
  }
  .new:hover .new-title {
    color: #ff6900;
  }
  .new-date {
    font-size: 15px;
    color: #999;
  }
  /*训练营和学院反馈*/
  .trains {
    width: 68%;
  }
  .train{
    width: 100%;
    display: inline-block;
    vertical-align: top;
    padding-right: 15px;
    padding-bottom: 10px;
    border-right: 1px solid #ddd;
  }
  .train-cover{
    width: 450px;
    height: 260px;
    vertical-align: top;
  }
  .train-con{
    width: 320px;
    display: inline-block;
    margin-left: 10px;
  }
  .train-title{
    width: 100%;
    font-size: 18px;
    color: #333;
    margin-top: 14px;
    margin-bottom: 10px;
  }
  .train-pass{
    font-size: 15px;
    color: #999;
    margin-bottom: 26px;
  }
  .icon-num {
    margin-right: 6px;
  }
  .train-price{
    font-size: 15px;
    color: #999;
    margin-bottom: 26px;
  }
  .train-price-now{
    display: inline-block;
    color: #ff6900;
    margin-right: 20px;
  }
  .train-price-old{
    display: inline-block;
  }
  .train-price-now-number{
    font-size: 18px;
  }
  .train-price-old-number{
    text-decoration: line-through;
  }
  .train-dec{
    font-size: 15px;
    line-height: 26px;
    color: #999;
  }
  .icon-change {
    margin-bottom: 2px;
  }
  .backs {
    width: 30%;
    margin-left: 18px;
  }
  .back {
    min-height: 177px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .back:last-of-type {
    border-bottom: 0 none;
    margin-bottom: 0;
  }
  .back-cover {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    vertical-align: top;
  }
  .back-con {
    width: 79%;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 16px;
  }
  .back-title {
    font-size: 18px;
    color: #333;
  }
  .back-job {
    font-size: 15px;
    color: #999;
  }
  .back-belong {
    font-size: 15px;
    color: #999;
    float: right;
    margin-top: 10px;
  }
  .back-dec {
    width: 100%;
    font-size: 15px;
    color: #333;
    line-height: 26px;
  }
  /*导师博客*/
  .blog {
    width: 50%;
    display: inline-block;
    border-right: 1px solid #d1d1d1;
  }
  .blog-border {
    border-right: 0 none;
    padding-left: 80px;
  }
  .blog-cover {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 12px;
  }
  .blog-con{
    width: 84%;
    display: inline-block;
    padding-bottom: 27px;
  }
  .blog-title {
    font-size: 18px;
    color: #333;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .blog-teacher {
    font-size: 15px;
    color: #999;
  }

  .gg-bottom {
    width: 100%;
    height: 120px;
    background-color: #ff6900;
    margin-bottom: 100px;
  }
  /*.企业案例轮播*/
  .business{
    min-height: 300px;
    /*border: 1px solid #999;*/
  }
  .swiper-container-business {
    height: 350px;
  }
  .business-cover {
    width: 225px;
    height: 120px;
    margin: 10px 18px 10px 0;
  }
  .business-cover-right{
    margin-right: 0;
  }

  .swiper-container-horizontal>.business-pagination-bullets, .business-pagination-custom, .business-pagination-fraction {
    bottom: 0px;
    height: 40px;
    width: 100%;
    background: #fff;
  }
  .business-pagination-bullet {
    display: inline-block;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    vertical-align: middle;
    margin: 10px 10px 0;

    background: #000;
    opacity: .2;
  }
</style>

<style>
  /*.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {*/
    /*bottom: 110px;*/
  /*}*/
 .swiper-pagination.swiper-pagination-banner{
    width: 100%;
    bottom: 110px;
  }
  .swiper-pagination.swiper-pagination-teacher{
    /*width: 1100px;*/
    /*height: 120px;*/
    /*bottom: -20px;*/
    /*!*margin-left: -426px;*!*/
    /*background-color: #fff;*/
  }
  .swiper-pagination.swiper-pagination-business{
    bottom: 0;
    height: 40px;
    width: 100%;
    background: #fff;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 10px;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    vertical-align: middle;
    margin: 50px 10px 0;
  }
  .business-pagination-bullet {
    display: inline-block;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    vertical-align: middle;
    margin: 10px 10px 0;

    background: #000;
    opacity: .2;
  }

  .swiper-pagination-bullet-active {
    width: 13px;
    height: 14px;
    opacity: 1;
    background: #ff6900;
  }

</style>
