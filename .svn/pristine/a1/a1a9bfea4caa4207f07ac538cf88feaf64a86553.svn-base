<!-- 赠送表格-->
<template>
  <table>
    <tr>
      <th>序号</th>
      <th>课程封面</th>
      <th>课程名称</th>
      <th>获赠人昵称</th>
      <th>获赠人账号</th>
      <th>领取时间</th>
    </tr>
    <tbody>
    <tr v-for="(item,index) in data" :key="index">
    <td width="80px">{{index + 1}}</td>
    <td width="120px">
    <img :src="item.course.cover.value" class="teacher-header" alt="" width="68px" height="42px">
    </td>
    <td width="300px"><p class="width">{{item.course.course_name}}</p></td>
    <td width="120px">{{item.person_get.username}}</td>
    <td width="180px">{{item.person_get.mobile}}</td>
    <td width="200px">{{item.created_at}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "sendTable",
    props: ['data']
  }
</script>

<style scoped>

</style>
