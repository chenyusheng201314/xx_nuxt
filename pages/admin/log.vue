<!--
  author：cys
-->
<template>
  <div>
    <LeftNav :data="leftNav"></LeftNav>
    <div class="admin-log">
      <h2 class="title">日志</h2>
      <ul class="log-search">
        <li>
          <span>操作账号</span>
          <input type="text" class="inp" v-model="search_info.account">
        </li>
        <li>
          <span>操作时间</span>

          <el-date-picker
            v-model="search_info.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00','23:59:59']">
          </el-date-picker>
        </li>
        <li class="last-li" @click="log_search">搜索</li>
      </ul>
      <table>
        <thead>
        <tr>
          <th width="150px">序号</th>
          <th width="350px">操作时间</th>
          <th width="350px">操作账户</th>
          <th>操作记录</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in log_lists" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.created_at}}</td>
          <td>{{item.manage.username}}</td>
          <td>{{item.module_name.privilege_title}} - {{item.method_name.privilege_title}}</td>
        </tr>
        </tbody>
      </table>
      <!--分页-->
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paging.currentPage"
          :page-sizes="paging.page_sizes"
          :page-size="paging.page_size"
          layout="prev, pager, next, sizes, jumper"
          :total="paging.total"
          :pager-count="5"
          v-loading.fullscreen.lock="fullscreenLoading"
        >
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import LeftNav from '~/components/admin/LeftNav';
  import '~/static/admin/css/log.css'


  export default {
    layout: 'admin',
    name: "log",
    components: {
      LeftNav
    },
    data() {
      return {
        leftNav: [],
        fullscreenLoading: false,
        search_info: {
          account: '',
          time: []
        },
      }
    },
    // 初始化数据
    async asyncData({store}) {
      let params = {
        url: "/manage/log/list",
        data: {
          username: '',
          start_time: '',
          end_time: '',
          page: 1,
          psize: 20,
        }
      };
      let res = await store.dispatch("adminHttpGet", params);
      console.log('记录', res.data);
      return {
        //  列表
        log_lists: res.data.data,
        //  分页
        paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 20,// 默认显示多少条
          total: res.data.total,  // 总条数
        }
      }
    },


    methods: {
      //  分页
      handleSizeChange(val) {
        this.paging.page_size = val;
        this.paging.currentPage = 1;
        this._paging()

      },
      handleCurrentChange(val) {
        // 当前页
        this.paging.currentPage = val;
        this._paging()
      },
      log_search() {
        this.paging.page_size = 20;
        this.paging.currentPage = 1;
        this._paging();
      },
      async _paging() {
        const that = this;
        that.fullscreenLoading = true;
        let params = {
          url: "/manage/log/list",
          data: {
            username: that.search_info.account,
            start_time: that.search_info.time ? that.search_info.time[0] : '',
            end_time: that.search_info.time ? that.search_info.time[1] : '',
            page: that.paging.currentPage,
            psize: that.paging.page_size,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", params);
        console.log(res);
        if (res.code === 0) {
          that.fullscreenLoading = false;
          that.log_lists = res.data.data;
          that.paging.total = res.data.total
        }
      },
      setMeau() {
        let leftNav = []
        let roles = this.$store.state.admin.adminRole.data

        let manage = this.comsys.adminGetMeau(roles, "manage")
        let acl = this.comsys.adminGetMeau(roles, "acl")
        let log = this.comsys.adminGetMeau(roles, "log")
        let manage_list = []
        let acl_list = []
        let log_list = []

        if (manage.length > 0) {
          manage_list = this.comsys.adminGetMeau(manage[0].son, "lists")
        }
        if (acl.length > 0) {
          acl_list = this.comsys.adminGetMeau(acl[0].son, "role_list")
        }
        if (log.length > 0) {
          log_list = this.comsys.adminGetMeau(log[0].son, "list")
        }

        if (manage_list.length > 0) {
          leftNav.push({name: '员工账号', link: '/admin/account', active: false})
        }
        if (acl_list.length > 0) {
          leftNav.push({name: '角色管理', link: '/admin/role', active: false})
        }
        if (log_list.length > 0) {
          leftNav.push({name: '日志', link: '/admin/log', active: true})
        }
        this.leftNav = leftNav

      },
    },
    mounted() {
      this.setMeau();
      console.log('1111', this.$store.state.admin.token);
    },
    head() {
      return {
        title: '基础设置',
      }
    }

  }
</script>

<style scoped>

</style>
