<template>
  <div class="top-bg" :style="'background-image: url('+src+')'">
  </div>
</template>
<script>
export default {
  name: 'topBg',
  props: ['src']
}
</script>

<style scoped>
  .top-bg {
    width: 100%;
    height: 148px;
    /*background-color: #ddd;*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 45px;
  }
</style>
