<template>

    <table>
      <tr>
        <th>序号</th>
        <th>训练营封面</th>
        <th>训练营名称</th>
        <th>所在班级</th>
        <th>入班时间</th>
        <th>闯关进度</th>
      </tr>
      <tbody>
      <tr v-for="(item,index) in data" :key="index">
        <td width="80px">{{index + 1}}</td>
        <td width="120px">
          <img :src="item.training.training_cover_app.value" alt="" width="68px" height="42px">
        </td>
        <td width="300px">
          <p class="width wid2">{{item.training.training_name}}</p>
        </td>
        <td width="150px">{{item.class.class_name}}</td>
        <td width="250px">{{item.join_time}}</td>
        <td width="80px">{{item.jindu}} / {{item.rates.length}}</td>
      </tr>
      </tbody>
    </table>
</template>

<script>
  export default {
    name: "userXlyTable",
    props: ['data'],
    mounted() {

    }
  }
</script>

<style scoped>

</style>
