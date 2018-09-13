<template>
  <ul class="blog-list-filtrate">
    <li>
      <strong>文章分类：</strong>
      <span class="type-all" @click="fir_all">全部</span>
      <span class="li-choose-one" v-for="(item,index) in choose_condition" :class="{active:item.active}" @click="tab_change(index,item.tit)" :key="index">{{item.tit}}</span>
    </li>
    <li>
      <strong>二级分类：</strong>
      <span class="type-all" @click="sec_all">全部</span>
      <span @click="sec_tab(it.name)" :class="{active:it.active}" class="li-choose-one" v-for="(it,ind) in arr1" :key="ind">{{it.name}}</span>
    </li>
    <li v-show="arr2.length !== 0 ">
      <span @click="sec_tab(it.name)" :class="{active:it.active}"  class="li-choose-one" v-for="(it,ind) in arr2" :key="ind">{{it.name}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'filtrate',
    props: {
      choose_condition: Array,
      change_address: Function
    },
    data () {
      return {
        arr1: [], // 二级分类渲染数组1
        arr2: [], // 二级分类渲染数组2
        arr2_show: true,
        index: 0 // 当前点击的一级分类索引值
      }
    },
    methods: {
      tab_change (ind, val) {
        //  导航联动
        const that = this
        that.change_address(val)

        that.index = ind
        that.arr1 = that.choose_condition[ind].tmp1
        that.arr2 = that.choose_condition[ind].tmp2
        //  选择效果
        $.each(that.choose_condition, function (key, val) {
          if (key === ind) {
            val.active = true
          } else {
            val.active = false
          }
        })
        // 清除其他tab下面的选择效果
        $.each(that.choose_condition, function (key, val) {
          if (key !== that.index) {
            $.each(val.detail, function (k, v) {
              v.active = false
            })
          }
        })
      },
      // 二级导航的选择
      sec_tab (name) {
        var that = this
        // 添加效果
        $.each(that.choose_condition[that.index].detail, function (key, val) {
          if (val.name === name) {
            val.active = true
          } else {
            val.active = false
          }
        })
        that.handle_array()
      },
      //  二级分类分层处理
      handle_array () {
        const that = this
        $.each(that.choose_condition, function (key, val) {
          const tmp1 = []
          const tmp2 = []
          $.each(val.detail, function (k, v) {
            if (k < 9) {
              tmp1.push(v)
            } else if (k >= 9 && k < 18) {
              tmp2.push(v)
            }
          })
          val.tmp1 = tmp1
          val.tmp2 = tmp2
        })
      },
      //  点击一级分类全部默认选择第一个
      fir_all () {
        var that = this
        $.each(that.choose_condition, function (key, val) {
          if (key === 0) {
            val.active = true
          } else {
            val.active = false
          }
        })
        that.arr1 = that.choose_condition[0].tmp1
        that.arr2 = that.choose_condition[0].tmp2

        that.change_address('营销管理')
      },
      //  二级分类点击全部
      sec_all () {
        console.log('请求思路：获取一级分类的类别，然后请求该类别下面的数据')
      }
    },
    mounted () {
      const that = this
      // 数据二级分类分层处理
      that.handle_array()
      //  默认赋值
      that.arr1 = that.choose_condition[0].tmp1
      that.arr2 = that.choose_condition[0].tmp2
    }
  }
</script>

<style scoped>
  .blog-list-filtrate {
    width: 1200px;
    height: auto;
    border: 1px solid #dcdcdc;
    border-bottom: none;
  }

  .blog-list-filtrate li {
    border-bottom: 1px solid #dcdcdc;
    height: 50px;
    width: 1200px;
    padding: 0 45px;
    line-height: 50px;
  }

  .blog-list-filtrate li:last-child {
    padding-left: 200px;
  }

  .blog-list-filtrate li:last-child strong, .blog-list-filtrate li:last-child .type-all {
    display: none;
  }

  .blog-list-filtrate li span {
    display: inline-block;
    font-size: 15px;
    color: #666;
    padding: 5px 8px;
    line-height: 15px;
    background: #fff;
    cursor: pointer;
    margin-right: 21px;
  }

  .blog-list-filtrate li span.type-all {
    border: 1px solid #ff6900;
    padding: 3px 5px;
    color: #ff6900;
    line-height: 15px;
    margin-right: 25px;
    cursor: pointer;
  }

  .blog-list-filtrate li span:hover {
    background: #ff6900;
    color: #fff;
  }
  .blog-list-filtrate li span.active{
    background: #ff6900;
    color: #fff;
  }
</style>
