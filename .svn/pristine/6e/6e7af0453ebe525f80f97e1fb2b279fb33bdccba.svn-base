<template>
  <div>
    <h2>用户列表</h2>
    <ul class="user-search">
      <li>
        <span>用户昵称</span>
        <input type="text" class="inp" v-model="search_info.name">
      </li>
      <li>
        <span>账号</span>
        <input type="text" class="inp" v-model="search_info.account">
      </li>
      <li>
        <span>账号状态</span>
        <el-select v-model="search_info.type" placeholder="请选择" class="m-r-15">
          <el-option
            v-for="(item,index) in search_info.type_select"
            :key="index"
            :label="item.tit"
            :value="item.num">
          </el-option>
        </el-select>
      </li>
      <li>
        <span>性别</span>
        <el-select v-model="search_info.sex" placeholder="请选择" class="m-r-15">
          <el-option
            v-for="(item,index) in search_info.sex_select"
            :key="index"
            :label="item.tit"
            :value="item.num">
          </el-option>
        </el-select>
      </li>
      <li>
        <span>注册时间</span>
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
      <li>
        <span>生日</span>
        <el-date-picker
          v-model="search_info.birthday"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </li>
      <li class="last-li">
        <span class="btn-search" @click="user_list_search">搜索</span>
      </li>
    </ul>
    <table>
      <tr>
        <th>序号</th>
        <th>用户</th>
        <th>账户</th>
        <th>性别</th>
        <th>生日</th>
        <th>注册时间</th>
        <th>积分</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <tr v-for="(item,index) in user_lists" :key="index">
        <td width="100px">{{index + 1}}</td>
        <td width="180px">
          <img style="float: left; margin-top: 5px;" :src="item.photo.value" alt="" class="header">
          <p style="width: 100px; float: left;padding: 0; margin: 0; line-height: 50px">{{item.username}}</p>

        </td>
        <td width="180px">{{item.mobile}}</td>
        <td width="80px">{{item.sex === 0 ? '保密':item.sex === 1 ? '男':'女' }}</td>
        <td width="120px">{{item.birthday}}</td>
        <td width="250px">{{item.register_time}}</td>
        <td width="170px">{{item.point}}</td>
        <td width="100px">
          <span class="col_true" v-show="item.status === 1">正常</span>
          <span class="col_false" v-show="item.status === 0">冻结</span>
        </td>
        <td class="last-td">
          <span class="td-see" @click="get_user_id(item.id)">查看</span>
          <span class="td-sq" @click="to_accredit(item.id)">授权课程</span>
          <span class="td-dj" v-show="item.status === 1" @click="change_account_type(0,index,item.id)">冻结账户</span>
          <span class="td-hf" v-show="item.status === 0" @click="change_account_type(1,index,item.id)">恢复账户</span>
        </td>
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

    <div class="accredit-cover" v-show="cover_show">
      <div class="cover-con">
        <span class="close-cover" @click="close_cover">
          <img src="/admin/images/class/close.png" alt="">
        </span>
        <h2>授权</h2>
        <p class="accredit-tab">
          <span :class="{active : accredit_tab_type}" @click="accredit_tab_change(true)">课程</span>
          <span :class="{active : !accredit_tab_type}" @click="accredit_tab_change(false)">训练营</span>
        </p>
        <!--课程-->
        <div v-show="accredit_tab_type">
          <ul class="accredit-search">
            <li>
              <span>课程分类</span>
              <el-select v-model="accredit_search.fir_id" placeholder="请选择" style="margin-right: 15px">
                <el-option
                  v-for="(item,index) in accredit_search.fir_selcet"
                  :key="index"
                  :label="item.sort_name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="accredit_search.sec_id" placeholder="请选择">
                <el-option
                  v-for="(item,index) in accredit_search.sec_select"
                  :key="index"
                  :label="item.sort_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>课程名称</span>
              <input type="text" class="inp" v-model="accredit_search.lesson_name">
            </li>
            <li>
              <span>上架状态</span>
              <el-select v-model="accredit_search.status" placeholder="请选择" style="margin-right: 15px">
                <el-option
                  v-for="(item,index) in accredit_search.status_select"
                  :key="index"
                  :label="item.tit"
                  :value="item.num">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>主讲导师</span>
              <el-select v-model="accredit_search.jg_id" placeholder="请选择" style="margin-right: 15px">
                <el-option
                  v-for="(item,index) in accredit_search.jg_select"
                  :key="index"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="accredit_search.teacher_id" placeholder="请选择">
                <el-option
                  v-for="(item,index) in accredit_search.teacher_select"
                  :key="index"
                  :label="item.realname"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="last-li">
              <span class="btn-search" @click="fun_accredit_search">搜索</span>
            </li>
          </ul>
          <table>
            <tr>
              <th>
                <img src="/admin/images/user/no-choose.png" alt="" class="choose" v-show="!accredit.lesson_all_choose"
                     @click="lesson_choose_all(true)">
                <img src="/admin/images/user/choose.png" alt="" class="choose" v-show="accredit.lesson_all_choose"
                     @click="lesson_choose_all(false)">
              </th>
              <th>序号</th>
              <th>课程封面图</th>
              <th>视频名称</th>
              <th>主讲导师</th>
              <th>单价（学币）</th>
              <th>销量</th>
              <th>参与活动</th>
              <th>上架状态</th>
            </tr>
            <tbody>
            <tr v-for="(item,index) in accredit.lesson_list" :key="index">
              <td width="50px">
                <img src="/admin/images/user/no-choose.png" alt="" class="choose" v-show="!item.choose && item.status"
                     @click="lesson_choose_one(true,index)">
                <img src="/admin/images/user/choose.png" alt="" class="choose" v-show="item.choose && item.status"
                     @click="lesson_choose_one(false,index)">
                <img src="/admin/images/user/disable-choose.png" class="choose" alt="" v-show="item.status === 0">
              </td>
              <td width="80px">{{index + 1}}</td>
              <td width="130px">
                <img :src="item.cover.value" width="68px" height="42px" alt="">
              </td>
              <td width="350px"><p class="name">{{item.course_name}}</p></td>
              <td width="100px">{{item.organization_teacher.realname}}</td>
              <td width="100px">{{item.price}}</td>
              <td width="120px">{{item.sales}}</td>
              <td width="200px">
                <img src="/admin/images/class/jing.png" alt="" v-show="item.is_jp === 1">
                <img src="/admin/images/class/new.png" alt="" v-show="item.is_new === 1">

                <img src="/admin/images/class/zeng.png" alt="" v-show="item.is_activity === 1">
                <img src="/admin/images/class/zhe.png" alt="" v-show="item.is_activity === 2">
                <img src="/admin/images/class/free.png" alt="" v-show="item.is_activity === 3">
                <img src="/admin/images/class/fen.png" alt="" v-show="item.is_activity === 4">
              </td>
              <td>
                <span class="col_true" v-show="item.status === 1">已上架</span>
                <span class="col_false" v-show="item.status === 0">已下架</span>
              </td>
            </tr>
            </tbody>
          </table>
          <!--分页-->
          <div class="paging">
            <el-pagination
              @size-change="accreditSizeChange"
              @current-change="accreditCurrentChange"
              :current-page.sync="paging2.currentPage"
              :page-sizes="paging2.page_sizes"
              :page-size="paging2.page_size"
              layout="prev, pager, next, sizes, jumper"
              :total="paging2.total"
              :pager-count="5">
            </el-pagination>
          </div>
        </div>
        <!--训练营-->
        <div v-show="!accredit_tab_type">
          <ul class="xly-lists">
            <li v-for="(item,index) in accredit.xly_list" :key="index">
              <div class="traning-cover" v-show="item.is_auth === 1"></div>
              <span v-show="item.choose"><img src="/admin/images/user/icon-choose.png" alt=""></span>
              <div style="width: 275px;height: 206px" @click="xly_choose(index)">
                <img :src="item.training_cover_pc.value" alt="" :class="{active : item.choose}">
              </div>
              <p>{{item.training_name}}</p>
            </li>
          </ul>
          <h2 class="m-t-60">选择班级</h2>
          <table>
            <tr>
              <th></th>
              <th>序号</th>
              <th>班级封面</th>
              <th>班级名称</th>
              <th>所属训练营</th>
              <th>主讲导师</th>
              <th>学员数量</th>
              <th>上架状态</th>
            </tr>
            <tbody v-for="(item,index) in accredit.xly_list" v-show="item.choose" :key="index">
            <tr v-for="(it,ind) in item.training_class" :key="ind">
              <td width="100px">
                <img src="/admin/images/user/no-choose.png" alt="" class="choose" v-show="!it.choose && it.status"
                     @click="choose_bj(true,index,ind)">
                <img src="/admin/images/user/choose.png" alt="" class="choose" v-show="it.choose && it.status"
                     @click="choose_bj(false,index,ind)">
                <img src="/admin/images/user/disable-choose.png" class="choose" alt="" v-show="it.status === 0">
              </td>
              <td width="100px">{{ind + 1}}</td>
              <td width="130px"><img :src="it.class_cover" width="68px" height="42px" alt=""></td>
              <td width="250px"><p class="name">{{it.class_name}}</p></td>
              <td width="250px"><p class="name">{{item.training_name}}</p></td>
              <td width="150px">{{it.class_teacher}}</td>
              <td width="150px">{{it.class_members}}</td>
              <td>
                <span class="col_true" v-show="it.status === 1"> 已上架</span>
                <span class="col_false" v-show="it.status === 0">已下架</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="btn_accredit" @click="show_sure_cover(true)">确认授权</div>
      </div>

      <!--授权人弹窗-->
      <div class="sure_cover" v-show="sure_cover_show">
        <div class="sure-cover-con">
         <span class="close-cover" @click="show_sure_cover(false)">
          <img src="/admin/images/class/close.png" alt="">
        </span>
          <h2>授权确认</h2>
          <div class="cover-con-per">
            <span>授权申请人</span>
            <input type="text" v-model="accredit.accredit_per" maxlength="20">
          </div>
          <p class="error-info" v-show="accredit.accredit_per === ''">此项为必填项不能为空！</p>
          <div class="queding" @click="accredit_sure">确定授权</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import '~/static/admin/css/user.css'

  export default {
    name: "userList",
    props: ['search_info', 'user_lists', 'paging', 'accredit', 'accredit_search', 'paging2', 'sure_cover_show', 'cover_show', 'accredit_tab_type'],
    data() {
      return {}
    },
    methods: {
      // 每页显示多少条
      handleSizeChange(val) {
        this.$emit('SizeChange', val);
      },
      // 当前页
      handleCurrentChange(val) {
        this.$emit('CurrentChange', val);
      },
      // 用户搜索
      user_list_search() {
        this.$emit('user_list_search')
      },

      // 获取id
      get_user_id(id) {
        this.$emit('get_user_id', id)
      },
      // 冻结和恢复
      change_account_type(bool, ind, id) {
        const that = this;
        if (!bool) {
          that.$confirm('是否冻结此账户？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            that.$emit('type_change', bool, ind, id)
          }).catch(() => {

          });
        } else {
          that.$emit('type_change', bool, ind, id)
        }
      },
      //  授权账户
      to_accredit(id) {
        this.$emit('to_accredit', id);
      },
      //  授权搜索
      fun_accredit_search() {
        this.$emit('fun_accredit_search')
      },
      //  授权导航切换
      accredit_tab_change(bool) {
        this.$emit('accredit_tab_change', bool);

      },
      //  课程选择
      lesson_choose_one(bool, ind) {
        this.$emit('lesson_choose_one', bool, ind)
      },
      //  课程全选
      lesson_choose_all(bool) {
        this.$emit('lesson_choose_all', bool)
      },
      // 每页显示多少条
      accreditSizeChange(val) {
        this.$emit('accreditSizeChange', val)
      },
      // 当前页切换
      accreditCurrentChange(val) {
        this.$emit('accreditCurrentChange', val)
      },
      // 训练营选择
      xly_choose(ind) {
        this.$emit('accredit_xly_choose', ind)
      },
      // 选择班级
      choose_bj(bool, index, ind) {
        this.$emit('accredit_bj_choose', bool, index, ind)
      },
      //  确定授权
      accredit_sure() {
        const that = this
        that.$emit('accredit_sure', that.accredit_tab_type)
      },
      //  关闭弹窗
      close_cover() {
        this.$emit('close_cover', false);
      },
      //  授权人填写
      show_sure_cover(bool) {
        this.$emit('show_sure_cover', bool);
      }
    },
    watch: {
      'accredit.search_info.classify': function () {
        const {accredit} = this
        accredit.search_info.classify2 = ' ';
        $.each(accredit.search_info.classify_select, function (kay, val) {
          if (val.name === accredit.search_info.classify) {
            accredit.search_info.classify2_select = val.lists
          }
        })
      },
      'accredit.search_info.jigou': function () {
        const {accredit} = this
        accredit.search_info.teacher = ' ';
        $.each(accredit.search_info.jigou_select, function (kay, val) {
          if (val.name === accredit.search_info.jigou) {
            accredit.search_info.teacher_select = val.lists
          }
        })
      },
    }
  }

</script>

<style scoped>

</style>
