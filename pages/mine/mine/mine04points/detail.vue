<template>
  <div class="mine-points-detail mine-box">
    <div class="mine-con">
      <div class="mine-money">
        <div class="my-money">
          <span class="my-money-num">{{user.point}}</span> 积分
        </div>
      </div>
      <div class="mine-title">
        <h4 class="h-title">积分明细</h4>
      </div>
      <ul class="records" v-loading="loading">
        <li v-for="item in list.data" :key="item.id">
          <div class="record-num">{{item.point_method_name}}{{item.point_num}} 积分</div>
          <div class="d-inline-block record-time">{{item.created_at}}</div>
          <div class="d-inline-block text-overflow-one record-con">{{item.point_type_name}}</div>
        </li>
      </ul>
      <paging v-if="list.total" :page_total="list.page_total" @pageChange="pageChange" :current="p"></paging>
    </div>
  </div>
</template>

<script>
  import paging from '@/components/dataPaging'
export default {
  name: 'detail',
  data () {
    return {
      loading:false
    }
  },
  props:['user'],
  components: {paging},
  async asyncData({store}) {
    let myDate = new Date();
    let time = myDate.getFullYear()+"年 "+myDate.getMonth()+"月 "+myDate.getDate()+"日 "+myDate.getDay()
    let list = await store.dispatch('mineGet', {
      url: '/app/personal/point_list',
      data: {
        page:1,
        psize:8,
        datetime: time
      }
    })
    console.log('积分明细',list)
    return {
      p:1,
      list: list.data,
    }
  },
  methods: {
    // 切换分页
    async pageChange (num) {
      // console.log(num)
      this.loading = true
      this.p = num
      let myDate = new Date();
      let time = myDate.getFullYear()+"年 "+myDate.getMonth()+"月 "+myDate.getDate()+"日 "+myDate.getDay()
      let list = await this.$store.dispatch('mineGet', {
        url: '/app/personal/point_list',
        data: {
          page:num,
          psize:8,
          datetime: time
        }
      })
      if (list.code ===0 ) {
        this.list = list.data
        this.loading = false
      }

    }
  },
  mounted() {
    // console.log(this.user)
  }
}
</script>
