<template>
  <div class="text-center paging">
    <ul>
      <li class="d-inline-block to">
        <a :href="url+1">首页</a>
      </li>

      <li class="paging-li d-inline-block" v-for="(item,index) in page_total" :key="index" :class="{'last':index===page_total-1}"
          v-if="index>=current-3 && index< current +3">
        <a v-if="current!=item" :href="url+item">{{item}}</a>
        <a v-else :class="{'active':current==index+1}">{{item}}</a>
      </li>
      <li class="d-inline-block to">
        <a :href="url+page_total">尾页</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "aPaging",
    props: {
      page_total: {
        type: Number,
        default: 1
      },
      current: {
        type: Number
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  .paging {
    font-size: 14px;
    color: #666;
    height: 20px;
    line-height: 20px;
    margin: 20px;
  }
  .paging-li {
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;

  }
  .last {
    border-right: 1px solid #999;
  }
  .to {
    padding: 4px 8px;
    margin: 0 10px;
    border: 1px solid #999;
  }
  .active {
    color: #ff6900!important;
  }
  .paging-li>a{
    display: block;
    padding: 4px 8px;
  }
</style>
