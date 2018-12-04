<template>
  <div class="text-right paging">
    <!--局部刷新 的分页-->
    <ul>
      <li class="d-inline-block to">
        <a v-if="current!=1" @click="$emit('pageChange',1)" style="color: #333;">首页</a>
        <a v-else>首页</a>
      </li>
      <li class="paging-li d-inline-block" v-for="(item,index) in page_total" :key="index"
          :class="{'paging-li-active':current==index+1}">
        <a v-if="current!=item" @click="$emit('pageChange',item)" style="color: #333;">{{item}}</a>
        <a v-else :class="{'active':current==index+1}">{{item}}</a>
      </li>
      <li class="d-inline-block to">
        <a v-if="current!=page_total" @click="$emit('pageChange',page_total)" style="color: #333;">尾页</a>
        <a v-else>尾页</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import paging from '@/components/dataPaging'
  export default {
    name: "dataPaging",
    props: {
      page_total: {
        type: Number,
        default: 1
      },
      current: {
        type: Number
      }
    },
    methods:{
    }
  }
</script>
