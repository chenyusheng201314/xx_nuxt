<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="mine-title">
        <h4 class="h-title">积分明细</h4>
      </div>
      <ul class="records">
        <li v-for="item in records" :key="item.id">
          <div class="record-num">{{item.money}} 积分</div>
          <div class="d-inline-block record-time">{{item.time}}</div>
          <div class="d-inline-block text-overflow-one record-con">{{item.con}}</div>
        </li>
      </ul>
      <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'detail',
  data () {
    return {
      records: [
        {
          id: 1,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 14,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 11,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
        }, {
          id: 12,
          time: '2018-09-09',
          con: '购买课程《中国培训行业分析》',
          money: '-299'
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
  .records {
    font-size: 15px;
    color: #666;
  }
  .records li{
    padding: 10px 30px;
    border-top: 1px solid #ddd;
  }
  .records li:last-of-type{
    border-bottom: 1px solid #ddd;
  }
  .record-num {
    float: right;
    color: #ff6900;
  }
  .record-time {
    width: 250px;
    vertical-align: top;
  }
  .record-con {
    width: 50%;
  }
  .paging {
    margin-top: 45px;
    margin-bottom: 0!important;
  }
</style>
