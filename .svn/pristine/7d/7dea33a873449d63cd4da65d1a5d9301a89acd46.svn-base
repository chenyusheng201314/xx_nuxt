<template>
  <table>
    <tr>
      <th>序号</th>
      <th>课程封面图</th>
      <th>视频名称</th>
      <th>主讲导师</th>
      <th>单价（学币）</th>
      <th>上架状态</th>
    </tr>
    <tbody>
    <tr v-for="(item,index) in data" :key="index">
      <td width="80px">{{index + 1}}</td>
      <td width="120px">
        <img :src=" item.course ? item.course.cover.value : item.companycourse.cover.value" alt="" width="68px"
             height="42px">
      </td>
      <td width="400px">
        <p class="width">{{ item.course ? item.course.course_name : item.companycourse.course_name}}</p>
      </td>
      <td width="150px">{{item.course ? item.course.teacher_name : item.companycourse.teacher}}</td>
      <td width="150px">{{item.course ? item.course.price : '--'}}</td>

      <td width="150px">
        <span class="col_true" v-show="item.status === 1">已上架</span>
        <span class="col_false" v-show="item.status === 0">已下架</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: "lessonTable",
    props: ['data']
  }
</script>

<style scoped>

</style>
