<template>
  <div class="my-paging">
    <div class="paging-con">
      <div class="perv" @click="perv" :class="{no_choose:parseInt(now_page) === 1}">上一页</div>
      <ul class="paging-list">
        <li
          v-for="(item,index) in page_list"
          :key="index"
          :class="{no_choose: page_list.length === 1,active: now_page === item}"
          @click="page_change(item)">
          <a :href="paging.url +'?page='+ item" :class="{no_choose: page_list.length === 1}">{{item}}</a>
        </li>
      </ul>
      <div class="next" :class="{no_choose: now_page === page_list.length}" @click="next">下一页</div>
      <div class="page-show">每页显示
        <el-select v-model="paging.psize" placeholder="请选择">
          <el-option
            v-for="(item,index) in paging.psizes"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        条
      </div>
      <div class="to-page">跳转到第
        <input type="text" v-model="enter_num" @keydown.13="page_to">
        页
      </div>
    </div>
  </div>
</template>
<script>
  import '~/static/css/paging.css'

  export default {
    name: "my_paging",
    props: ['paging'],
    data() {
      return {
        // 页码
        page_list: [],
        now_page: '',
        page_len: '',
        enter_num: 1,
      }
    },
    methods: {
      //获取页码的数组
      get_paging_list() {
        const that = this;
        for (let i = 1; i < that.page_len + 1; i++) {
          that.page_list.push(i)
        }
      },
      // 页码选择
      page_change(num) {
        this.now_page = num;
      },
      // 上一页
      perv() {
        const that = this;
        if (1 < that.now_page) {
          that.now_page--;
        } else {
          that.now_page = 1
        }
      },
      //下一页
      next() {
        const that = this;
        if (that.now_page < that.page_list.length) {
          that.now_page++;
        } else {
          that.now_page = that.page_list.length;
        }
      },
      page_to() {
        this.now_page = parseInt(this.enter_num);
      }
    },
    watch: {
      'paging.psize': function () {
        const that = this;
        that.$emit('psizeChange', that.paging.psize)
      },
      now_page: function () {
        const that = this;
        that.$emit('pageChange', that.now_page);
      },
      enter_num: function () {
        const that = this;
        if (that.enter_num < 0) {
          that.enter_num = 1
        } else if (that.enter_num > that.page_list.length) {
          that.enter_num = that.page_list.length
        } else if (!Number(that.enter_num) && that.enter_num !== '') {
          that.enter_num = '';
        }
      },
    },
    mounted() {
      const that = this;
      // 获取数组长度
      that.page_len = Math.ceil(that.paging.total / that.paging.psize);
      // 获取数组
      that.get_paging_list();
      //初始化当前页
      that.now_page = that.paging.currentPage
    }
  }
</script>

<style scoped>

</style>
