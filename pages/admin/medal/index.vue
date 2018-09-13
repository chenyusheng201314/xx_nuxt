<!--
    auoter: cys
-->
<template>
  <div>
    <LeftNav :data="leftNav"></LeftNav>
    <div class="admin-medal">
      <h2>勋章发放列表</h2>
      <ul class="medal-search">
        <li>
          <span>账户</span>
          <input type="text" class="inp">
        </li>
        <li>
          <span>勋章</span>
          <el-select v-model="search_info.medal_id" placeholder="请选择" style="margin-right: 15px">
            <el-option
              v-for="(item,index) in search_info.medal_select"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>获取时间</span>
          <el-date-picker
            v-model="search_info.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </li>
        <li class="last-li" @click="fun_search">搜索</li>
      </ul>
      <table>
        <tr>
          <th>序号</th>
          <th>用户</th>
          <th>勋章</th>
          <th>勋章类型</th>
          <th>勋章名称</th>
          <th>获取时间</th>
        </tr>
        <tbody>
        <tr v-for="(item,index) in medal_lists" :key="index">
          <td width="100px">{{index + 1}}</td>
          <td width="200px">
            <img :src="item.person.photo.value" alt="" class="header">
            {{item.person.username}}
          </td>
          <td width="200px">
            <img :src="item.medal.image_color.value" alt="" width="40px">
          </td>
          <td width="250px">{{item.medal.parent_medal.name}}</td>
          <td width="250px">{{item.medal.name}}</td>
          <td width="250px">{{item.created_at}}</td>
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
  import '~/static/admin/css/medal.css'

  export default {
    layout: 'admin',
    name: "medal",
    components: {
      LeftNav,
    },
    data() {
      return {
        leftNav: [
          {
            name: '勋章发放列表',
            link: '/admin/medal',
            active: true
          }, {
            name: '勋章规则',
            link: '/admin/medal/rule',
            active: false
          }
        ],
        fullscreenLoading: false,
      }
    },
    async asyncData({store}) {
      let arr = [{id: '', name: '全部'}], json = {};
      // 勋章发放列表
      let pramas = {
        url: '/manage/medal/person_list',
        data: {
          page: 1,
          psize: 10,
          mobile: '',
          medal_type_id: '',
          start_time: '',
          end_time: '',
        }
      };
      let res = await store.dispatch('adminHttpGet', pramas);
      //  搜索-勋章
      let medal = {
        url: '/manage/medal/list',
      };
      let medal_res = await store.dispatch('adminHttpGet', medal);

      medal_res.data.forEach(function (val, key) {
        json = {
          id: val.id,
          name: val.name
        };
        arr.push(json);
      });
      return {
        // 发放列表
        medal_lists: res.data.data,
        //分页
        paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 50], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: res.data.total,  // 总条数
        },
        // 搜索信息
        search_info: {
          account: '',
          medal_id: '',
          medal_select: arr,
          time: []
        },
      }
    },
    methods: {
      // 获取列表
      async get_list() {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/medal/person_list',
          data: {
            page: that.paging.currentPage,
            psize: that.paging.page_size,
            mobile: that.search_info.account,
            medal_type_id: that.search_info.medal_id,
            start_time: that.search_info.time ? that.search_info.time[0] : '',
            end_time: that.search_info.time ? that.search_info.time[1] : '',
          }
        };
        let res = await that.$store.dispatch('adminHttpGet', pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        that.medal_lists = res.data.data;
        that.paging.total = res.data.total;
      },
      //每页显示
      handleSizeChange(val) {
        this.paging.page_size = val;
        this.get_list();
      },
      // 当前页
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        this.get_list();
      },
      //搜索
      fun_search() {
        //  初始化
        this.paging.page_size = 10;
        this.paging.currentPage = 1;
        this.get_list();
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
