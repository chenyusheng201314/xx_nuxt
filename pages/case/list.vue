<template>
  <div class="case">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <ul class="case-list">
      <li v-for="(item,index) in case_list" :key="index">
        <h2>● {{item.title}}</h2>
        <div class="img-all">
          <img v-for="(src,index) in item.list" :src="src.cover" alt="" @click="go_detail(src.id)" :key="index">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'
  export default {

    name: 'case',
    components:{
      topBg,
      localRoute
    },
    data() {
      return {
        num: 3,
        route_data: [{name: '享学科技网', path: '/'}, {name: '企业案例', path: '/case/list'}],
        case_list: [
          {
            title: '精选案例',
            list: [
              {
                cover: '/images/case/li1.png',
                id: 1
              },
              {
                cover: '/images/case/li1.png',
                id: 2
              },
              {
                cover: '/images/case/li1.png',
                id: 3
              },
              {
                cover: '/images/case/li1.png',
                id: 4
              },
              {
                cover: '/images/case/li1.png',
                id: 5
              },
              {
                cover: '/images/case/li1.png',
                id: 6
              }
            ]
          },
          {
            title: '餐饮/食品/快消品',
            list: [
              {
                cover: '/images/case/li2.png',
                id: 1
              },
              {
                cover: '/images/case/li2.png',
                id: 2
              },
              {
                cover: '/images/case/li2.png',
                id: 3
              },
              {
                cover: '/images/case/li2.png',
                id: 4
              },
              {
                cover: '/images/case/li2.png',
                id: 5
              },
              {
                cover: '/images/case/li2.png',
                id: 6
              },
              {
                cover: '/images/case/li2.png',
                id: 7
              },
              {
                cover: '/images/case/li2.png',
                id: 8
              },
              {
                cover: '/images/case/li2.png',
                id: 9
              },
              {
                cover: '/images/case/li2.png',
                id: 10
              }
            ]
          },
          {
            title: '电工/电器/通讯',
            list: [
              {
                cover: '/images/case/li2.png',
                id: 1
              },
              {
                cover: '/images/case/li2.png',
                id: 2
              },
              {
                cover: '/images/case/li2.png',
                id: 3
              },
              {
                cover: '/images/case/li2.png',
                id: 4
              },
              {
                cover: '/images/case/li2.png',
                id: 5
              },
              {
                cover: '/images/case/li2.png',
                id: 6
              },
              {
                cover: '/images/case/li2.png',
                id: 7
              },
              {
                cover: '/images/case/li2.png',
                id: 8
              },
              {
                cover: '/images/case/li2.png',
                id: 9
              },
              {
                cover: '/images/case/li2.png',
                id: 10
              }
            ]
          },
          {
            title: '电商/零售',
            list: [
              {
                cover: '/images/case/li2.png',
                id: 1
              },
              {
                cover: '/images/case/li2.png',
                id: 2
              },
              {
                cover: '/images/case/li2.png',
                id: 3
              },
              {
                cover: '/images/case/li2.png',
                id: 4
              },
              {
                cover: '/images/case/li2.png',
                id: 5
              },
              {
                cover: '/images/case/li2.png',
                id: 6
              },
              {
                cover: '/images/case/li2.png',
                id: 7
              },
              {
                cover: '/images/case/li2.png',
                id: 8
              },
              {
                cover: '/images/case/li2.png',
                id: 9
              },
              {
                cover: '/images/case/li2.png',
                id: 10
              }
            ]
          }
        ]
      }
    },
    methods: {
      route (index) {
        console.log(index)
        index = this.$data.route_data.length - index - 1
        let router = this.$router
        router.go(-index)
      },
      go_detail(id) {
        this.$router.push({path: '/case/detail', query: {id}})
      }
    }
  }
</script>

<style scoped>
  .case {
    width: 1200px;
    margin: 0 auto;
  }

  .case-list {
    width: 1200px;
    height: auto;
    padding: 45px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    margin-bottom: 50px;
  }

  .case-list li {
    margin-top: 45px;

  }

  .case-list li:first-child {
    margin-top: 0;
  }

  .case-list li h2 {
    font-size: 20px;
    color: #ff6900;
  }

  .case-list li .img-all {
    margin-top: 22px;
  }

  .case-list li .img-all img {
    margin-right: 8px;
    margin-top: 8px;
    cursor: pointer;
  }
</style>
