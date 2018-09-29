<template>
  <div class="company-account">
    <h2>员工账号</h2>
    <p class="eng-name">Employee account number</p>
    <!-- 搜索-->
    <ul class="search-info">
      <li>
        <span class="li-span">姓名</span>
        <input type="text">
      </li>
      <li>
        <span class="li-span">账号</span>
        <input type="text">
      </li>
      <li>
        <span class="li-span">账号状态</span>
        <el-select v-model="search_info.status" placeholder="请选择">
          <el-option
            v-for="(item,index) in search_info.status_select"
            :key="index"
            :label="item.name"
            :value="item.num">
          </el-option>
        </el-select>
      </li>
      <li>
        <span class="li-span">创建时间</span>
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
      <li class="last">
        <span class="search-btn">搜索</span>
        <span class="add-btn" @click="change_type(1)">+ 创建账号</span>
      </li>
    </ul>
    <!-- 列表-->
    <table>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>账号</th>
        <th>角色</th>
        <th>创建时间</th>
        <th>最后登录时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <tr v-for="(item,index) in show_lists" :key="index">
        <td width="100">{{index + 1}}</td>
        <td width="180">{{item.name}}</td>
        <td width="220">{{item.account}}</td>
        <td width="160">{{item.role}}</td>
        <td width="250">{{item.creat_time}}</td>
        <td width="250">{{item.end_time}}</td>
        <td width="130">
          <span class="true" v-show="item.status === 1">正常</span>
          <span class="false" v-show="item.status === 0">冻结</span>
        </td>
        <td>
          <span class="iconfont" @click="change_type(3)">&#xe610;</span>
          <span class="iconfont" @click="change_type(2,index)">&#xe678;</span>
          <span class="iconfont" @click="delete_one(item.id,index)">&#xe62f;</span>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- 分页-->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paging.currentPage"
        :page-sizes="paging.page_sizes"
        :page-size="paging.page_size"
        layout="prev, pager, next, sizes, jumper"
        :total="paging.total"
        :pager-count="5"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
      </el-pagination>
    </div>
    <!--弹窗-->
    <el-dialog
      :title="cover_type === 1? '创建账号' : '编辑账号'"
      :visible.sync="cover_show"
      :close-on-click-modal="false"
      width="40%">
      <div class="cover-con">
        <ul>
          <li>
            <span class="li-name"><label>*</label>账号</span>
            <input type="text" :disabled="cover_type === 3" v-model="account_info.account">
          </li>
          <li>
            <span class="li-name"><label>*</label>密码</span>
            <input type="text" :disabled="cover_type === 3" v-model="account_info.pwd">
          </li>
          <li>
            <span class="li-name"><label>*</label>姓名</span>
            <input type="text" :disabled="cover_type === 3" v-model="account_info.name">
          </li>
          <li v-show="cover_type === 2 || cover_type === 3 ">
            <span class="li-name">所属部门</span>
            <input type="text" :disabled="cover_type === 3" v-model="account_info.department">
          </li>
          <li v-show="cover_type === 2 || cover_type === 3">
            <span class="li-name"><label>*</label>账号状态</span>
            <el-select v-model="account_info.status" placeholder="请选择" :disabled="cover_type === 3">
              <el-option
                v-for="(item,index) in account_info.status_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="li-name"><label>*</label>角色</span>
            <el-select v-model="account_info.role" placeholder="请选择" :disabled="cover_type === 3">
              <el-option
                v-for="(item,index) in account_info.role_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="add-save" v-show="cover_type === 1" @click="add_save">保存</div>
        <div class="edit" v-show="cover_type === 2">
          <span class="edit-delete" @click="delete_one(0)">删除账号</span>
          <span class="edit-save">保存</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import '~/static/company_manage/css/iconfont.css'
  import '~/static/company_manage/css/account.css'

  export default {
    name: "account",
    layout: 'companyManage',
    data() {
      return {
        // 搜索信息
        search_info: {
          name: '',
          accound: '',
          status_select: [
            {num: '', name: '全部'},
            {num: 1, name: '正常'},
            {num: 2, name: '冻结'},
          ],
          status: '',
          time: [],
        },
        // 分页
        paging: {
          total: 50,
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
        },
        // 加载动画
        fullscreenLoading: false,
        // 弹窗标题
        cover_type: 1, // 1表示创建账号  2表示编辑账号  3表示查看
        // 弹窗显示
        cover_show: false,
        // 当前账户
        now_account: '',
        //账户列表
        show_lists: [
          {
            id: 1,
            name: 'cheer',
            account: '18612345678',
            role: '班主任',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 1,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'chee22r',
            account: '18612345678',
            role: '班主任2222',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 0,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'cheer',
            account: '18612345678',
            role: '班主任',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 1,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'chee22r',
            account: '18612345678',
            role: '班主任2222',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 0,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'cheer',
            account: '18612345678',
            role: '班主任',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 1,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'chee22r',
            account: '18612345678',
            role: '班主任2222',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 0,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'cheer',
            account: '18612345678',
            role: '班主任',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 1,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'chee22r',
            account: '18612345678',
            role: '班主任2222',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 0,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'cheer',
            account: '18612345678',
            role: '班主任',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 1,  //1表示正常  0表示冻结
          },
          {
            id: 1,
            name: 'chee22r',
            account: '18612345678',
            role: '班主任2222',
            creat_time: '2017-07-04 10:00:00',
            end_time: '2018-07-04 10:00:00',
            status: 0,  //1表示正常  0表示冻结
          }
        ],
        //  添加/编辑信息
        account_info: {
          account: '',
          pwd: '',
          name: '',
          role_select: [
            {id: 1, name: '班主任1'},
            {id: 2, name: '班主任2'},
            {id: 3, name: '班主任3'},
          ],
          role: '',
          status_select: [
            {num: 1, name: '正常'},
            {num: 2, name: '冻结'},
          ],
          status: '',
          department: '',
        },
      }
    },
    methods: {
      //分页每页显示数量
      handleSizeChange(val) {
        this.paging.page_size = val;
      },
      //分页当前页
      handleCurrentChange(val) {
        this.paging.currentPage = val;
      },
      //弹窗显示并且赋值状态
      change_type(num, index) {
        const that = this;
        this.cover_show = true;
        this.cover_type = parseInt(num);
        if (index || index === 0) {
          that.now_account = index;
        }
        if (num === 1) {
          // 创建时初始化
          that.account_info.account = '';
          that.account_info.pwd = '';
          that.account_info.name = '';
          that.account_info.role = '';
        } else if (num === 2) {
          // 编辑
        } else if (num === 3) {
          // 查看
        }
      },
      //删除一个
      delete_one(id, ind) {
        const that = this;
        // 错误兼容 防止ind 不存在
        ind || ind === 0 ? ind : that.now_account;
        this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.show_lists.splice(ind, 1);
          // 如果有弹窗 那么弹窗关闭
          if (cover_show) {
            that.cover_show = false
          }
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
      // 新增保存
      add_save() {
        const that = this;
        if (that.account_info.account && that.account_info.pwd && that.account_info.name && that.account_info.role) {
          console.log('发送请求')
        } else {
          that.$message.error('信息请填写完整!')
        }
      }
    }
  }
</script>

<style scoped>

</style>
