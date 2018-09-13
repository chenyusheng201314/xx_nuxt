<template>
  <table>
    <tr>
      <th class="th1">文章标题</th>
      <th class="th2">培训讲师</th>
      <th class="th3">发布时间</th>
      <th class="th4">人气</th>
    </tr>
    <tr v-for="(item,index) in article_list" @click="to_detail(item.id)" :key="index">
      <td class="td1">
        <p>{{item.tit}}</p>
      </td>
      <td class="td2"><p>{{item.teacher}}</p></td>
      <td class="td3"><p>{{item.time}}</p></td>
      <td class="td4"><p>{{item.per}}</p></td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: 'Article',
    props: {
      article_list: Array
    },
    methods: {
      to_detail (id) {
        this.$router.push({path: '/blogs/detail', query: {id}})
      }
    }
  }
</script>

<style scoped>
  table{
    width: 1200px;
    height: auto;
    border: 1px solid #dcdcdc;
    margin-bottom: 30px;
  }
  table tr,table td, table th{
    border: 1px solid #dcdcdc;
    cursor: pointer;
  }
  table td, table th{
    font-size: 15px;
    color: #666;
    height: 50px;
  }
  table tr:nth-child(odd){
    background: #f7f7f7;
  }
  table tr .th1,table tr .td1{
    width: 600px;
    padding-left:45px ;
  }
  table tr .th2,table tr .td2{
    width: 214px;
  }
  table tr .th3,table tr .td3{
    width: 250px;
  }
  table tr th p,table tr td p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 50px;
    line-height: 50px;
    margin: 0;
  }
  table tr .th2,table tr .th3,table tr .th4,table tr .td2,table tr .td3,table tr .td4{
    text-align: center;
  }

  table tr:hover .td1 p,table tr .td4 p{
    color: #ff6900;
  }
</style>
