<template>
  <div class="mine-company-train text-center">
    <h4 class="h-title">请下载APP使用</h4>
    <div class="code">
      <img class="code-pic" src="/images/download/downCode.png" alt="">
      <div class="down">扫码下载</div>
    </div>
    <!--<paging v-if="orders.total" :page_total="orders.page_total"  @pageChange="pageChange" :current="p"></paging>-->
  </div>
</template>

<script>
  import paging from '@/components/dataPaging'
export default {
  name: 'train',
  // components: {paging},
}
</script>
