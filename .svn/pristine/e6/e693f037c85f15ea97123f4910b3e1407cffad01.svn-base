<template>
  <ul class="details-list">
    <DetailClass v-for="(lesson,index) in lesson_list" :lesson="lesson" :key="index"></DetailClass>
  </ul>
</template>

<script>
  import DetailClass from './list-class'
  export default {
    name: 'DetailList',
    props: {
      lesson_list: Array
    },
    components: {
      DetailClass
    }
  }
</script>

<style scoped>
  .details-list{
    width: 1250px;
    height: auto;
    overflow: hidden;
    padding: 25px;
    margin-left: -25px;
  }
</style>
