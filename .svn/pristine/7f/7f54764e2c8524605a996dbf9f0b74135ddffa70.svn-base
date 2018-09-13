<!--
    author:cys
-->
<template>
  <div>
    <leftNav :data="leftNav"></leftNav>
    <div class="user" v-loading.fullscreen.lock="fullscreenLoading">
      <h2>授权记录</h2>
      <ul class="user-search">
        <li>
          <span>用户昵称</span>
          <input type="text" class="inp" v-model="search_info.user_name">
        </li>
        <li>
          <span>账号</span>
          <input type="text" class="inp" v-model="search_info.account">
        </li>
        <li>
          <span>申请人</span>
          <input type="text" class="inp" v-model="search_info.proposer">
        </li>
        <li>
          <span>名称</span>
          <input type="text" class="inp" v-model="search_info.name">
        </li>
        <li>
          <span>操作时间</span>
          <el-date-picker
            v-model="search_info.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </li>
        <li class="last-li">
          <span class="btn-add" @click="to_export">导出</span>
          <span class="btn-search" @click="to_search">搜索</span>
        </li>
      </ul>

      <p class="accredit-tab">
        <span :class="{active : tab}" @click="tab_change(true)">课程</span>
        <span :class="{active : !tab}" @click="tab_change(false)">训练营</span>
      </p>
      <!-- 课程-->
      <div v-show="tab">
        <table>
          <tr>
            <th>序号</th>
            <th>用户</th>
            <th>账户</th>
            <th>申请人</th>
            <th>课程名称</th>
            <th>单价(学币)</th>
            <th>操作时间</th>
            <th>操作人</th>
          </tr>
          <tbody>
          <tr v-for="(item,index) in lesson_lists" :key="index">
            <td width="80px">{{index + 1}}</td>
            <td width="140px">
              <img :src="item.person.photo" alt="" class="header">
              {{item.person.username}}
            </td>
            <td width="200px">{{item.person.mobile}}</td>
            <td width="150px">{{item.proposer}}</td>
            <td width="400px">
              <p class="name">{{item.course.course_name}}</p>
            </td>
            <td width="160px">{{item.course.price}}</td>
            <td width="250px">{{item.updated_at}}</td>
            <td>{{item.operator}}</td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
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
      <!-- 训练营-->
      <div v-show="!tab">
        <table>
          <tr>
            <th>序号</th>
            <th>用户</th>
            <th>账户</th>
            <th>申请人</th>
            <th>训练营名称</th>
            <th>单价(学币)</th>
            <th>操作时间</th>
            <th>操作人</th>
          </tr>
          <tbody>
          <tr v-for="(item,index) in xly_lists" :key="index">
            <td width="80px">{{index + 1}}</td>
            <td width="140px">
              <img :src="item.person.photo" alt="" class="header">
              {{item.person.username}}
            </td>
            <td width="200px">{{item.person.mobile}}</td>
            <td width="150px">{{item.proposer}}</td>
            <td width="400px">
              <p class="name">{{item.training.training_name}}</p>
            </td>
            <td width="160px">{{item.training.pay_price}}</td>
            <td width="250px">{{item.updated_at}}</td>
            <td>{{item.operator}}</td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paging2.currentPage"
            :page-sizes="paging2.page_sizes"
            :page-size="paging2.page_size"
            layout="prev, pager, next, sizes, jumper"
            :total="paging2.total"
            :pager-count="5">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import leftNav from '~/components/admin/LeftNav'
  import '~/static/admin/css/user.css'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import axios from 'axios'

  export default {
    layout: 'admin',
    name: "accreditLits",
    components: {
      leftNav
    },
    data() {
      return {
        leftNav: [
          {
            name: '用户列表',
            link: '/admin/user',
            active: false
          },
          {
            name: '授权记录',
            link: '/admin/user/accreditLits',
            active: true
          }
        ],
        search_info: {
          time: [],
          user_name: '',
          account: '',
          proposer: '',
          name: ''
        },
        tab: true,// 默认课程
        // 加载
        fullscreenLoading: false,
      }
    },
    async asyncData({store}) {
      // 课程授权列表
      let lesson_params = {
        url: '/manage/person_authorization_record/course_auth_log_list',
        data: {
          page: 1,
          psize: 10,
          proposer: '',
          start_time: '',
          end_time: '',
          username: '',
          mobile: '',
          name: '',
        }
      };
      let lesson_res = await store.dispatch("adminHttpGet", lesson_params);
      console.log('授权课程', lesson_res);

      // 授权训练营
      let xly_params = {
        url: '/manage/person_authorization_record/training_auth_log_list',
        data: {
          page: 1,
          psize: 10,
          proposer: '',
          start_time: '',
          end_time: '',
          username: '',
          mobile: '',
          name: '',
        }
      };
      let xly_res = await store.dispatch("adminHttpGet", xly_params);
      console.log('授权训练营', xly_res);


      return {
        // 授权课程列表
        lesson_lists: lesson_res.data.data,
        // 授权课程分页
        paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: lesson_res.data.total
        },
        // 授权训练营列表
        xly_lists: xly_res.data.data,
        // 授权训练营分页
        paging2: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: xly_res.data.total
        },
      }
    },

    methods: {
      // 课程、训练营切换
      tab_change(bool) {
        this.tab = bool
      },
      // 搜索
      async get_list() {
        const that = this;
        // 是课程
        that.fullscreenLoading = true;
        if (that.tab) {
          let lesson_params = {
            url: '/manage/person_authorization_record/course_auth_log_list',
            data: {
              page: that.paging.currentPage,
              psize: that.paging.page_size,
              proposer: that.search_info.proposer,
              start_time: that.search_info.time ? that.search_info.time[0] : '',
              end_time: that.search_info.time ? that.search_info.time[1] : '',
              username: that.search_info.user_name,
              mobile: that.search_info.account,
              name: that.search_info.name,
            }
          };
          let lesson_res = await that.$store.dispatch("adminHttpGet", lesson_params);
          console.log('kc', lesson_res);
          if (lesson_res) {
            that.fullscreenLoading = false
          }
          that.lesson_lists = lesson_res.data.data;
          that.paging.total = lesson_res.data.total
        } else {

          // 训练营
          let xly_params = {
            url: '/manage/person_authorization_record/training_auth_log_list',
            data: {
              page: that.paging2.currentPage,
              psize: that.paging2.page_size,
              proposer: that.search_info.proposer,
              start_time: that.search_info.time ? that.search_info.time[0] : '',
              end_time: that.search_info.time ? that.search_info.time[1] : '',
              username: that.search_info.user_name,
              mobile: that.search_info.account,
              name: that.search_info.name,
            }
          };
          let xly_res = await that.$store.dispatch("adminHttpGet", xly_params);
          if (xly_res) {
            that.fullscreenLoading = false
          }
          console.log('xly', xly_res);
          that.xly_lists = xly_res.data.data;
          that.paging2.total = xly_res.data.total
        }
      },

      // 每页显示多少条
      handleSizeChange(val) {
        this.paging.page_size = val;
        this.get_list();
      },
      // 当前页
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        this.get_list();
      },
      //  导出
      to_export() {
        const that = this;
        if (that.tab) {
          //课程
          require.ensure([], () => {
            let data = [];
            const {export_json_to_excel} = require('~/plugins/Export2Excel');
            const tHeader = ['用户名', '账户', '申请人', '课程名称', '单价(学币)', '操作时间', '操作人'];
            that.lesson_lists.forEach(function (val, key) {
              let tmp_arr = [];
              tmp_arr.push(val.person.username, val.person.mobile, val.proposer, val.course.course_name, val.course.price, val.updated_at, val.operator);
              data.push(tmp_arr);
            });
            export_json_to_excel(tHeader, data, '授权记录');
          })
        } else {
          require.ensure([], () => {
            const {export_json_to_excel} = require('~/plugins/Export2Excel');
            const tHeader = ['用户名', '账户', '申请人', '训练营名称', '单价(学币)', '操作时间', '操作人'];
            let data = [];
            that.xly_lists.forEach(function (val, key) {
              let tmp_arr = [];
              tmp_arr.push(val.person.username, val.person.mobile, val.proposer, val.training.training_name, val.training.pay_price, val.updated_at, val.operator);
              data.push(tmp_arr);
            });
            export_json_to_excel(tHeader, data, '授权记录');
          })
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      to_search() {
        this.get_list();
      }
    }
  }
</script>

<style scoped>

</style>
