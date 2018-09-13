<template>
  <div>
    <div class="company-box">
      <img class="company-cover" src="/images/test.png" alt="封面">
      <div class="d-inline-block companey-con">
        <div class="company-name">{{name}}</div>
        <div class="company-members-num">{{members_num}}</div>
      </div>
    </div>
    <ul class="clearfix text-center company-members">
      <li class="li" v-for="(item, index) in members" :key="index" :class="{'margin-right-no':(index+1)%6===0}">
        <img :src="item.avatar" alt="头像">
        <div class="text-overflow-one result-name">{{item.name}}</div>
      </li>
    </ul>
    <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'members',
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
    // 切换分页
    paging (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped>
  .company-box{
    padding-left: 55px;
  }
  .company-cover{
    width: 130px;
    height: 130px;
    vertical-align: top;
    border: 1px solid #e5e5e5;
    border-radius: 70px;
    margin-right: 45px;
  }
  .companey-con{
    width: 74%;
    vertical-align: top;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 40px;
    margin-top: 40px;
  }
  .company-name{
    font-size: 20px;
    line-height: 20px;
    color: #ff6900;
    margin-bottom: 10px;
  }
  .company-members-num{
    font-size: 15px;
    color: #666;
    background: url("/images/mine/members.png") no-repeat left center;
    padding-left: 40px;
  }
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
  .paging {
    margin-top: 15px;
    margin-bottom: 0!important;
  }
</style>
