<template>
  <div class="open-detail-nav">
    <a href="javascript:;"  v-for="(item,index) in detail_info" :class="{active : index === ind}" @click="nav_change(item,index)" :key="index"> {{item.title}}</a>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    props: {
      detail_info: Array
    },
    data () {
      return {
        ind: 0
      }
    },
    methods: {
      nav_change (name, ind) {
        const that = this
        that.ind = ind
        that.$emit('tab_change', name, ind)
        $('html, body').animate({scrollTop: $('#li' + ind).offset().top + 'px'}, 500)
        return false
      }
    }
  }
</script>

<style scoped>
  .open-detail-nav{
    width: 1200px;
    height: 45px;
    background: #eee;
    margin-top: 45px;
    padding: 0 45px;
  }
  .open-detail-nav a{
    float: left;
    width: 100px;
    text-align: center;
    color: #333;
    font-size: 18px;
    height: 45px;
    line-height: 45px;
    margin-right: 95px;
    cursor: pointer;
    text-decoration: none !important;
  }
  .open-detail-nav a:last-child{
    margin-right: 0;
  }
  .open-detail-nav a.active{
    height: 50px;
    color: #ff6900;
    margin-top: -5px;
    border: 1px solid #dcdcdc;
    border-bottom: 2px solid #ff6900;
    background: #fff;
    line-height: 50px;
  }
</style>
