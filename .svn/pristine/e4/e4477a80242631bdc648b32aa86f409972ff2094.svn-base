<template>
  <div>
    <div class="admin-blogclassify">
      <h2>
        <span>博客分类管理</span>
        <div class="add-first true" @click="add_first">+ 添加一级分类</div>
      </h2>
      <div class="lists">
        <!--这个没class名的div啥意思都没有，负责拖拽 和数组遍历-->
        <div v-for="(item,index) in show_lists" :key="index" v-dragging="{item: item, list: show_lists,group:'item'}">
          <!--未编辑状态-->
          <div class="lists-tit" v-show="!item.isEdit">
            <div class="left">
              <span class="span1">{{item.name}}</span>
              <span class="span1">博客数量：{{item.num}}</span>
            </div>
            <div class="right">
              <span class="edit" @click="list_edit(index)">编辑</span>
              <img src="/admin/images/class/down.png" alt="" class="select-down" :class="{choose: item.child_show}"
                   @click="select_down(index)">
              <img src="/admin/images/class/solt.png" alt="" class="solt">
            </div>
          </div>
          <!--编辑状态-->
          <div class="lists-tit" v-show="item.isEdit">
            <img class="tit-delete" src="/admin/images/class/delete.png" alt="" @click="delete_first(index)">
            <div class="left">
              <span class="span1">第1章</span>
              <input type="text" class="inp">
              <span class="span2">博客数量：1111</span>
            </div>
            <div class="right">
              <span class="add-title">+ 添加二级分类</span>
              <span class="save" @click="list_save(index,item)">保存</span>
              <img src="/admin/images/class/solt.png" alt="" class="solt" style="margin-right: 80px">
            </div>
          </div>
          <!--子类未编辑状态-->
          <ul class="list" v-show="item.child_show && !item.isEdit">
            <li v-for="(it,ind) in item.child" :key="ind+'li'">
              <span class="span1">{{ind + 1}}</span>
              <span class="span1 span-name">{{it.name}}</span>
              <span class="span1">博客数量：{{it.num}}</span>
            </li>
          </ul>
          <!--子类编辑状态-->
          <ul class="list" v-show="item.isEdit">
            <li v-for="(it,ind) in item.child" :key="ind+'li'">
              <div class="li-left">
                <span class="span1">1</span>
                <input type="text" class="inp" v-model="it.son">
                <span class="span1">博客数量：{{it.num}}</span>
              </div>
              <div class="li-right">
                <span class="delete" @click="delete_one(index,ind,it)">删除</span>
                <img
                  src="/admin/images/class/to-up.png" alt=""
                  @click="to_up(index,ind)"
                  :class="{m_r_75: ind === (item.child.length - 1), m_r_45 : ind !== 0}"
                  v-show="ind !== 0"
                >

                <img
                  src="/admin/images/class/to-down.png" alt=""
                  @click="to_down(index,ind)"
                  :class="{m_r_75 : ind === 0}"
                  v-show="ind !== (item.child.length - 1)">

              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="seo-cover">

      </div>
    </div>
  </div>
</template>

<script>
  import '~/static/admin/css/blogClassify.css'
  import VueDND from 'awe-dnd'
  import Vue from 'vue'
  import axios from 'axios'

  Vue.use(VueDND);
  export default {
    name: "blogClassify",
    data() {
      return {
        show_lists: [
          {
            name: '11111',
            id: 1,
            num: 12564,
            isEdit: false,
            child_show: false,
            tit: '',
            keywords: '',
            introduce: '',
            child: [
              {
                son: '1',
                id: 11,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 12,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 13,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 14,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
            ]
          },
          {
            name: '22222',
            id: 1,
            num: 12564,
            isEdit: false,
            child_show: false,
            tit: '',
            keywords: '',
            introduce: '',
            child: [
              {
                son: '1',
                id: 11,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 12,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 13,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
            ]
          },
          {
            name: '333',
            id: 1,
            num: 12564,
            isEdit: false,
            child_show: false,
            child: [
              {
                son: '1',
                id: 11,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 12,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 13,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
            ]
          },
          {
            name: '444',
            id: 1,
            num: 12564,
            isEdit: false,
            child_show: false,
            tit: '',
            keywords: '',
            introduce: '',
            child: [
              {
                son: '1',
                id: 11,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 12,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
              {
                son: '1',
                id: 13,
                num: 21545,
                tit: '',
                keywords: '',
                introduce: '',
              },
            ]
          },
        ]
      }
    },
    methods: {
      //增加一级分类
      add_first() {
        const that = this;
        let len = that.show_lists.length;
        if (len < 30) {
          let json = {
            name: '默认名称',
            num: '',
            isEdit: false,
            child_show: false,
            child: []
          };
          that.show_lists.unshift(json)
        }
      },
      // 删除一级分类
      delete_first(ind) {
        const that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.show_lists.splice(ind, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 编辑
      list_edit(ind) {
        console.log(ind);
        this.show_lists[ind].isEdit = true
      },
      // 保存
      list_save(ind, item) {
        this.show_lists[ind].isEdit = false
      },
      //下拉
      select_down(ind) {
        this.show_lists[ind].child_show = !this.show_lists[ind].child_show
      },
      //排序
      to_up(index, ind) {
        const that = this;
        // 交换顺序
        that.show_lists[index].child.splice(ind - 1, 1, ...that.show_lists[index].child.splice(ind, 1, that.show_lists[index].child[ind - 1]));
      },
      // 排序
      to_down(index, ind) {
        const that = this;
        // 交换顺序
        that.show_lists[index].child.splice(ind, 1, ...that.show_lists[index].child.splice(ind + 1, 1, that.show_lists[index].child[ind]));
      },
    },
    mounted() {
      // 拖拽排序
      const that = this;
      this.$dragging.$on('dragged', ({value}) => {
        console.log(value.item);
        console.log(value.list);
      });
      this.$dragging.$on('dragend', () => {

      });
    },
  }
</script>

<style scoped>

</style>
