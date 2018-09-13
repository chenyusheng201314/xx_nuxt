<template>
  <div>
    <ul class="clearfix text-center company-members">
      <li class="li" v-for="(item, index) in members" :key="index" :class="{'margin-right-no':(index+1)%6===0}">
        <img :src="item.avatar" alt="头像">
        <div class="d-inline-block text-overflow-one result-name">{{item.name}}</div>
        <div class="d-inline-block follow" title="取消关注" @click="not_follow(item.id)"></div>
      </li>
    </ul>
    <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'teacher',
  data () {
    return {
      name: '公司名字',
      members_num: '23',
      members: [
        {
          id: 0,
          avatar: '/images/test.png',
          name: '张三11'
        }, {
          id: 1,
          avatar: '/images/test.png',
          name: '张三1'
        }, {
          id: 11,
          avatar: '/images/test.png',
          name: '张三33'
        }, {
          id: 21,
          avatar: '/images/test.png',
          name: '张三2'
        }, {
          id: 12,
          avatar: '/images/test.png',
          name: '张三221'
        }, {
          id: 121,
          avatar: '/images/test.png',
          name: '张三123'
        }, {
          id: 1211,
          avatar: '/images/test.png',
          name: '张三12333'
        }, {
          id: 121123,
          avatar: '/images/test.png',
          name: '张三12333'
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
    not_follow () {},
    // 切换分页
    paging (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped>
  .company-members{
    padding-top: 45px;
  }
  .li{
    width: 100px;
    margin-right: 30px;
    float: left;
    margin-bottom: 30px;
  }
  .margin-right-no {
    margin-right: 0;
  }
  .company-members li img{
    width: 100%;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 20px;
  }
  .result-name{
    font-size: 15px;
    color: #666;
  }
  .follow {
    width: 16px;
    height: 16px;
    /*float: right;*/
    background: url("/images/mine/follow.png") no-repeat center;
    background-size: contain;
    vertical-align: top;
    margin-left: 4px;
    margin-top: 4px;
  }
  .follow:hover {
    background-image: url("/images/mine/follow1.png");
  }
  .paging {
    margin-top: 15px;
    margin-bottom: 0!important;
  }
</style>
