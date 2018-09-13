<template>
  <div class="text-right pages" onselectstart="return false;">
    <div class="d-inline-block text-center page-pre" :class="{'page-disable': page.page_pre_disable, 'cursor-pointer': !page.page_pre_disable}"
        @click="pre">上一页</div>
    <ul class="d-inline-block text-center">
      <li class="d-inline-block cursor-pointer page" v-for="(item,index) in page.li" :key="index"
          :class="{'page-active': pages.current === index+1}" @click="change_page(item)" v-if="item >= page.start && item <= page.end ">{{item}}
      </li>
    </ul>
    <div class="d-inline-block text-center page-next" :class="{'page-disable': page.page_next_disable, 'cursor-pointer': !page.page_next_disable}"
         @click="next">下一页</div>
  </div>
</template>
<script>
export default {
  name: 'paging',
  props: ['pageData'],
  data: function () {
    return {
      pages: this.$props.pageData,
      page: {
        start: 1,
        end: 10,
        page_pre_disable: true,
        page_next_disable: false,
        li: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    }
  },
  methods: {
    page_init () {
      let pages = this.$data.pages
      let page = []
      for (let i = 0; i < pages.total; i++) {
        page.push(i + 1)
      }
      this.$data.page.li = page
      this.$data.page.end = this.$data.pages.total < this.$data.pages.visible ? this.$data.pages.total : this.$data.pages.visible
      console.log('哈哈', page)
    },

    change_page (current) {
      let pagesOld = this.$data.pages
      // 当前页码
      if (pagesOld.total > pagesOld.visible) {
        if (current <= pagesOld.visible / 2) {
          this.$data.page.start = 1
          this.$data.page.end = pagesOld.visible
        } else if (current > pagesOld.visible / 2 && current <= pagesOld.total - pagesOld.visible / 2 + 1) {
          this.$data.page.start = current - pagesOld.visible / 2
          this.$data.page.end = current + pagesOld.visible / 2 - 1
          // console.log(pagesOld.visible / 2)
        } else if (current > pagesOld.total - pagesOld.visible / 2 + 1) {
          // this.$data.page.start = pagesOld.visible - current
          this.$data.page.end = pagesOld.total
        }
      } else {
        this.$data.page.start = 1
        this.$data.page.end = pagesOld.total
      }
      this.$data.pages.current = current
      let pagesNew = this.$data.pages
      if (pagesNew.current === pagesNew.total) {
        this.$data.page.page_next_disable = true
      } else {
        this.$data.page.page_next_disable = false
      }
      if (pagesNew.current === 1) {
        this.$data.page.page_pre_disable = true
      } else {
        this.$data.page.page_pre_disable = false
      }
      // 触发父组件更新分页数据
      this.$emit('changeList', current)
    },
    pre () {
      if (this.$data.pages.current > 1) {
        this.change_page(this.$data.pages.current - 1)
      }
    },
    next () {
      if (this.$data.pages.current < this.$data.pages.total) {
        this.change_page(this.$data.pages.current + 1)
      }
    }
  },
  mounted () {
    this.page_init()
  }
}
</script>

<style scoped>
  /*分页*/
  .pages {
    text-align: right;
    margin-bottom: 60px;
    /*width: 100px;*/
    /*height: 40px;*/
    /*background-color: #ddd;*/
    -moz-user-select:none;
  }
  .page-pre, .page-next {
    height: 30px;
    line-height: 30px;
    width: 60px;
    color: #333;
    border: 1px solid #ddd;
    margin-left: 10px;
  }
  .page-pre{
    margin-right: 20px;
  }
  .page-disable {
    color: #ddd;
  }
  .page{
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    padding: 0 8px;
    margin-right: 10px;
    /*margin-right: 10px;*/
  }
  .page-active {
    border-color: #ff6900;
  }
</style>
