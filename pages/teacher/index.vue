<template>
  <div id="teachers" class="container">
    <topBg src="/images/test.png"></topBg>
    <!--<div class="route">当前位置：</div>-->
    <!--<div class="cursor-pointer route-data" v-for="(item, index) in route_data" :key="index" @click="route(index)">-->
      <!--{{item}} <span v-show="index !== route_data.length-1"> >&nbsp;&nbsp;</span>-->
    <!--</div>-->
    <localRoute :route="route_data"></localRoute>
    <div class="teachers">
      <div class="cursor-pointer teacher" v-for="(item, index) in teachers" :key="index"
           :class="{'teacher-margin-right': (index + 1)%4===0}" @click="detail(item.id)">
        <div class="cover-bg">
          <div class="cover">
            <img class="cover-img" :src="item.cover" alt="">
          </div>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="special">擅长领域：{{item.special}}</div>
        <div style="font-size: 0">
          <div class="text-center special1" v-for="(it, ind) in item.specail1" :key="ind"
          :class="{'special-margin-right': ind===0||ind===2}">{{it}}</div>
        </div>
      </div>
      <!--分页-->
    </div>
    <!--<router-view></router-view>-->
    <Paging v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="change"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
import topBg from '@/components/topBg'
import localRoute from '@/components/localRoute'
export default {
  name: 'teachers',
  data () {
    return {
      num: 2,
      route_data: [{name: '享学科技网', path: '/'}, {name: '金牌导师', path: '/teachers'}],
      teachers: [
        {
          id: 0,
          cover: '/images/teacher/simple.png',
          name: '曹晓多',
          special: '精品课程、培训咨询项目、教练挂历课程',
          specail1: ['课时四级', '课时四级', '课时四级', '课时四级']
        }, {
          id: 0,
          cover: '/images/teacher/simple.png',
          name: '曹晓多',
          special: '精品课程、培训咨询项目、教练挂历课程',
          specail1: ['课时四级', '课时四级', '课时四级', '课时四级']
        }, {
          id: 0,
          cover: '/images/teacher/simple.png',
          name: '曹晓多',
          special: '精品课程、培训咨询项目、教练挂历课程',
          specail1: ['课时四级', '课时四级', '课时四级', '课时四级']
        }, {
          id: 0,
          cover: '/images/teacher/simple.png',
          name: '曹晓多',
          special: '精品课程、培训咨询项目、教练挂历课程',
          specail1: ['课时四级', '课时四级', '课时四级', '课时四级']
        }, {
          id: 0,
          cover: '/images/teacher/simple.png',
          name: '曹晓多',
          special: '精品课程、培训咨询项目、教练挂历课程',
          specail1: ['课时四级', '课时四级', '课时四级', '课时四级']
        }
      ],
      pageData: {}
    }
  },
  components: {
    Paging, topBg, localRoute
  },
  methods: {
    route (index) {
      console.log(index)
      index = this.$data.route_data.length - index - 1
      let router = this.$router
      router.go(-index)
    },
    change (current) {
      console.log('父组件拿到页码', current)
      // this.$data.num += 4
      // this.$data.pageData = {
      //   total: 13,
      //   current: current,
      //   visible: 8
      // }
    },
    detail (id) {
      this.$router.push({path: '/teacher/2'})
    }
  },
  mounted () {
    // let r = this.$router
    // console.log(this.$router)
    // this.$data.route_data.push(r.options.routes[2].cn_name)
    // console.log()
    setTimeout(() => {
      this.$data.pageData = {
        total: 10,
        current: 1,
        visible: 8
      }
    }, 1000)
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .route {
    display: inline-block;
    font-size: 15px;
    color: #333;
    margin-bottom: 45px;
  }
  .route-data {
    display: inline-block;
    font-size: 15px;
    color: #333;
  }
  .route-data:hover {
    color: #ff6900;
  }
  /*老师列表*/
  .teachers{
    font-size: 0;
    margin-bottom: 60px;
  }
  .teacher{
    width: 280px;
    display: inline-block;
    box-shadow: 0 2px 0 0.5px rgba(0,0,0,.15);
    padding: 50px 18px 24px;
    margin-right: 26px;
  }
  .teacher-margin-right{
    margin-right: 0;
  }
  .cover-bg{
    width: 214px;
    height: 214px;
    background: url("/images/teacher/circle.png") no-repeat center;
    background-size: cover;
    margin-bottom: 24px;
    margin-left: auto;
    margin-right: auto;
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
  .name{
    text-align: center;
    font-size: 20px;
    color: #333;
    margin-bottom: 24px;
  }
  .special{
    font-size: 15px;
    color: #333;
    margin-bottom: 24px;
  }
  .special1{
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #ff6900;
    border: 1px solid #ff5900;
    display: inline-block;
    margin-bottom: 10px;
  }
  .special-margin-right{
    margin-right: 4px;
  }
</style>
