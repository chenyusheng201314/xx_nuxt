<template>
  <div class="class-tab">
    <span class="tab-con m-l-45 " :class="{active: lesson_tab == 1? true : false}" @click="tab_change(1)">课程概述</span>
    <span class="tab-con" :class="{active: lesson_tab == 2? true : false}" @click="tab_change(2)">课程目录</span>
  </div>
</template>

<script>
  export default {
    name: 'introduction-tab',
    props: ['lesson_tab', 'change_tab'],
    methods: {
      tab_change (num) {
        const {change_tab} = this
        change_tab(num)
      }
    }
  }
</script>

<style scoped>
  .m-l-45{
    margin-left: 45px;
  }
  .class-tab{
    width: 1200px;
    height: 45px;
    background: #eee;
    margin-top: 50px;
  }
  .class-tab .tab-con{
    display: inline-block;
    height: 45px;
    font-size: 18px;
    color: #333;
    line-height: 45px;
    margin-right: 15px;
    cursor: pointer;
  }
  .class-tab .tab-con.active{
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #ff6900;
    background: #fff;
    margin-top: -7px;
    border: 1px solid #dcdcdc;
    border-bottom: 2px solid #ff6900;
  }
</style>
