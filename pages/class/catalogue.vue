<template>
  <div>
    <ul class="mulu-list" v-for="(item,index) in lesson_mulu" :key="index">
      <li class="muli-tit">
        <span class="li-span1">{{item.tit}}</span>
        <span class="li-span2">【本章免费】购前必读</span>
        <span class="li-span3"></span>
        <span class="li-span4"></span>
      </li>
      <li v-for="(it,ind) in item.detail" :key="ind">
        <span class="li-span1">{{it.solt}}</span>
        <span class="li-span2">{{it.name}}</span>
        <span class="li-span3"><img src="/images/class/icon-free.png" alt="" width="18" height="9">试看</span>
        <span class="li-span4"><img src="/images/class/icon-video.png" alt="" width="15" height="15">{{it.time}}</span>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'catalogue',
    props:['lesson_mulu']
  }
</script>

<style scoped>
  ul{
    padding: 0;
    margin: 0;
  }
  .mulu-list{
    width: 850px;
    height: auto;
    overflow: hidden;
    border: 1px solid #dcdcdc;
    border-bottom: none;
  }
  .mulu-list:first-child{
    margin-top: 20px;
  }
  .mulu-list:last-child{
    margin-bottom: 50px;
    border-bottom: 1px solid #dcdcdc;
  }

  .mulu-list li{
    width: 850px;
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    border-bottom:1px solid #dcdcdc ;
    background: #fff;
  }
  .mulu-list li:last-child{
    border-bottom: none;
  }
  .muli-tit{
    background: #fafafa !important;
    font-weight: bold;
  }
  .mulu-list li span{
    float: left;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #666;
  }
  .mulu-list li .li-span3{
    color: #ff6900;
  }
  .mulu-list li .li-span1,.mulu-list li .li-span3,.mulu-list li .li-span4{
    width: 120px;
  }
  .mulu-list li .li-span2{
    width: 400px;
  }
  .mulu-list li .li-span3 img,.mulu-list li .li-span4 img{
    margin-right: 5px;
  }
</style>
