<template>
  <table>
    <tr>
      <th>序号</th>
      <th>训练营封面</th>
      <th>训练营名称</th>
      <th>单价（学币）</th>
      <th>上架状态</th>
    </tr>
    <tbody>
    <tr v-for="(item,index) in data" :key="index">
      <td width="80px">{{index + 1}}</td>
      <td width="120px">
        <img :src="item.training.training_cover_pc.value" alt="" width="68px" height="42px">
      </td>
      <td width="480px">
        <p class="width wid2">{{item.training.content_pc}}</p>
      </td>
      <td width="150px">{{item.training.pay_price}}</td>
      <td width="150px"> <span :class="{col_true : item.training.status === 1,col_false : item.training.status === 0}">{{ item.training.status ? '已上架' : '已下架'}}</span></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "xlyTable",
    props: ['data']
  }
</script>

<style scoped>

</style>
