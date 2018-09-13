<template>
  <div class="open-detail">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <Nav :detail_info="detail_info" @tab_change="get_nav"></Nav>
    <DetailCon :detail_info="detail_info" :teacher_info="teacher_info" :case_info="case_info" :stu_feedback="stu_feedback"></DetailCon>
  </div>
</template>

<script>
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'
  import Nav from './nav'
  import DetailCon from './detail-con'
  export default {
    name: 'index',
    components: {
      Nav,
      DetailCon,
      topBg,
      localRoute
    },
    data () {
      return {
        route_data: [{name: '享学科技网', path: '/'}, {name: '公开课详情', path: '/open/detail'}],
        // 详情页导航
        detail_info: [
          {
            title: '课程定位',
            pic: '/images/open/icon1.png',
            con: [
              '课程定位1课程定位1课程定位1课程定位1课程定位1课程定位1',
              '富文本富文本富文本富文本富文本富文本富文本富文本富文本',
              '课程定位1课程定位1课程定位1课程定位1课程定位1课程定位1',
              '课程定位1课程定位1课程定位1课程定位1课程定位1课程定位1',
              '课程定位1课程定位1课程定位1课程定位1课程定位1课程定位1'
            ]

          },
          {
            title: '课程特色',
            pic: '/images/open/icon2.png',
            con: [
              '课程特色1课程特色1课程特色1课程特色1课程特色1课程特色1',
              '富文本富文本富文本富文本富文本富文本富文本富文本富文本',
              '课程特色1课程特色1课程特色1课程特色1课程特色1课程特色1',
              '课程特色1课程特色1课程特色1课程特色1课程特色1课程特色1',
              '课程特色1课程特色1课程特色1课程特色1课程特色1课程特色1'
            ]

          },
          {
            title: '项目收益',
            pic: '/images/open/icon3.png',
            con: [
              '课程收益课程收益课程收益课程收益课程收益课程收益课程收益',
              '富文本富文本富文本富文本富文本富文本富文本富文本富文本',
              '课程收益课程收益课程收益课程收益课程收益课程收益课程收益',
              '课程收益课程收益课程收益课程收益课程收益课程收益课程收益',
              '课程收益课程收益课程收益课程收益课程收益课程收益课程收益',
              '课程收益课程收益课程收益课程收益课程收益课程收益课程收益'
            ]

          },
          {
            title: '学员对象',
            pic: '/images/open/icon4.png',
            con: [
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象',
              '富文本富文本富文本富文本富文本富文本富文本富文本富文本',
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象',
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象',
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象',
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象',
              '学员对象学员对象学员对象学员对象学员对象学员对象学员对象'
            ]

          },
          {
            title: '课程大纲',
            pic: '/images/open/icon5.png',
            con: [
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲',
              '富文本富文本富文本富文本富文本富文本富文本富文本富文本',
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲',
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲',
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲',
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲',
              '课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲课程大纲'
            ]
          }
        ],
        // 已选导航
        now_nav: '课程定位', // 默认第一个
        now_index: 0, // 默认第一个
        // ID
        class_id:'',
        get_id: function () {
          return this.$route.query.id
        },
        // 老师信息
        teacher_info: {
          header: '/images/open/teacher-header.png',
          name: '崔连斌',
          position: '博士',
          eng_name: 'Lianbin Cui, Ph.D.',
          introduce: '他是美国柯氏公司讣证的第一位中文讲师和顾问，是美国讣证的模拟课程设计不开发师，是国内少有的拥有培训不发展领域与业背景的人士。他他是美国柯氏公司讣证的第一位中文讲师和顾问，是美国讣证的模拟课程设计不开发师，是国内少有的拥有培训不发展领域与业背景的人士。',
          merit: [
            '首席培训技术官',
            '柯氏四级',
            '留美博士',
            'DACUM导引师'
          ]
        },
        // 案例信息
        case_info: [
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 1
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 2
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 3
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 4
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 5
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 6
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 7
          },
          {
            case_cover: '/images/open/pr-cover.png',
            name: '南方航空',
            id: 8
          }
        ],
        //  学员反馈
        stu_feedback: [
          {
            id: 1,
            stu_header: '/images/open/stu-header.png',
            company: '华为',
            name: '大盖伦',
            position: '华为大学教育主管',
            con: '好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好好很好非常好'
          },
          {
            id: 2,
            stu_header: '/images/open/stu-header.png',
            company: '华为',
            name: '大盖伦',
            position: '华为大学教育主管',
            con: '好很好非常好好很好非常好好很好非常好好很好非常好'
          },
          {
            id: 3,
            stu_header: '/images/open/stu-header.png',
            company: '华为',
            name: '大盖伦',
            position: '华为大学教育主管',
            con: '好很好非常好好很好非常好好很好非常好好很好非常好'
          },
          {
            id: 4,
            stu_header: '/images/open/stu-header.png',
            company: '华为',
            name: '大盖伦',
            position: '华为大学教育主管',
            con: '好很好非常好好很好非常好好很好非常好好很好非常好'
          }
        ]
      }
    },
    methods: {
      get_nav (data, ind) {
        this.now_nav = data
        this.now_index = ind
      }
    },
    watch: {
      get_id(){
        const that =this;
        that.class_id = that.get_id();
        console.log( that.class_id);
        console.log(1)
      }
    },
    mounted (){
      const that =this;
      that.class_id = that.get_id();
      console.log( that.class_id);
    }
  }
</script>

<style scoped>
.open-detail{
  width: 1200px;
  margin: 0 auto;
}
</style>
