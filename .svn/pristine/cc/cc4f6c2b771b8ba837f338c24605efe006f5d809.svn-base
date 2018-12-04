<!--
   author :cys
-->
<template>
  <div>
    <div class="admin-blogroll" v-loading.fullscreen.lock="fullscreenLoading">
      <h2 class="title">友情链接</h2>
      <div class="admin-blogroll-add">
        <span class="blogroll-add-btn btn" @click="add">创建友链</span>
      </div>

      <table>
        <tr>
          <th>序号</th>
          <th>友情链接名称</th>
          <th>友情链接地址</th>
          <th>创建日期</th>
          <th>操作</th>
        </tr>
        <tbody>
        <tr v-for="(item,index) in link_lists" :key="index">
          <td width="100px">{{index + 1}}</td>
          <td width="500px"><p>{{item.link_name}}</p></td>
          <td width="500px"><p>{{item.link_url}}</p></td>
          <td width="200px">{{item.created_at}}</td>
          <td width="210px">
            <span class="edit m-r-10" @click="edit(item)">编辑</span>
            <span class="delete" @click="delete_one(item.id)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paging.currentPage"
          :page-sizes="paging.page_sizes"
          :page-size="paging.page_size"
          layout="prev, pager, next, sizes, jumper"
          :total="paging.total"
          :pager-count="5">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="cover_tit"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <ul class="url_list">
        <li>
          <span class="li-txt"><label>*</label>友情链接名称</span>
          <input type="text" maxlength="40" v-model="info.name">
        </li>
        <li>
          <span class="li-txt"><label>*</label>友情链接地址</span>
          <input type="text" maxlength="100" v-model="info.src">
        </li>
      </ul>
      <div class="admin-blogroll-add-save" @click="save">保存</div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "blogroll",
    data() {
      return {
        // 弹窗显示与消失
        centerDialogVisible: false,
        //加载动画
        fullscreenLoading: false,
        cover_tit: '创建友链',
        info: {
          name: '',
          src: '',
          id: ''
        }
      }
    },
    async asyncData({store}) {
      // 获取友链列表
      let list_req = {
        url: '/manage/links/links_list',
        data: {
          page: 1,
          psize: 20
        }
      };
      let list_res = await store.dispatch('adminHttpGet', list_req);
      return {
        paging: {
          currentPage: 1,
          page_sizes: [10, 20, 30, 40],
          page_size: 20,
          total: list_res.data.total
        },
        link_lists: list_res.data.data,
      }
    },
    methods: {
      // 获取列表
      async get_list() {
        const that = this;
        that.fullscreenLoading = true;
        let list_req = {
          url: '/manage/links/links_list',
          data: {
            page: that.paging.currentPage,
            psize: that.paging.page_size
          }
        };
        let list_res = await this.$store.dispatch('adminHttpGet', list_req);

        if (list_res) {
          that.fullscreenLoading = false;
        }
        that.paging.total = list_res.data.total;
        that.link_lists = list_res.data.data;
      },
      handleSizeChange(val) {
        this.paging.page_size = val;
        this.get_list();
      },
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        this.get_list();
      },
      // 创建
      add() {
        this.centerDialogVisible = true;
        this.cover_tit = '创建友情链接';
        // 初始化
        this.info.name = '';
        this.info.src = '';
        this.info.id = '';
      },
      // 编辑
      edit(item) {
        this.centerDialogVisible = true;
        this.cover_tit = '编辑友情链接';
        // 初始化
        this.info.name = item.link_name;
        this.info.src = item.link_url;
        this.info.id = item.id;
      },
      // 删除
      delete_one(id) {
        const that = this;
        this.$confirm('删除后将无法恢复，确定删除此友情链接？', '重要操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let req = {
            url: '/manage/links/links_del',
            data: {
              id
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.get_list();
          } else {
            that.$message.error(res.message);
          }


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async save() {
        const that = this;
        if (that.info.name !== '' && that.info.src !== '') {
          let req = {
            url: '/manage/links/links_add',
            data: {
              id: that.info.id,
              link_name: that.info.name,
              link_url: that.info.src,
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          console.log(res);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '操作成功!'
            });
            that.centerDialogVisible = false;
            that.get_list()
          } else {
            that.$message.error(res.message);
          }
        } else {
          that.$message.error('必填项不能为空')
        }
      }
    },
    mounted() {
      console.log('ss', this.link_lists)
    },
    head() {
      return {
        title: '官网管理',
        link: [
          {
            href: '/admin/css/blogroll.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
