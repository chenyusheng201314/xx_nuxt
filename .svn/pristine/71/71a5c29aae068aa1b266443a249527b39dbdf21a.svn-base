<template>
  <div>
    <LeftNav :data="lefNav"></LeftNav>
    <div class="admin-blog">
      <h2 class="title">课程管理</h2>
      <ul class="classify">
        <li>
          <span>标题</span>
          <input type="text" class="inp">
        </li>
        <li>
          <span>发布日期</span>
          <el-date-picker
            v-model="search_info.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li>
          <span>导师</span>
          <el-select v-model="search_info.jg_id" placeholder="请选择" class="m-r-15">
            <el-option
              v-for="(item,index) in search_info.jg_select"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="search_info.teacher_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in search_info.teacher_select"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>分类</span>
          <el-select v-model="search_info.fir_id" placeholder="请选择" class="m-r-15">
            <el-option
              v-for="(item,index) in search_info.fir_select"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="search_info.sec_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in search_info.sec_select"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li class="last-li">
          <div class="set-btn btn" @click="_create(true)">创建博客</div>
          <div class="search-btn btn">搜索</div>
        </li>
      </ul>
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>标题</th>
          <th>发布日期</th>
          <th>导师</th>
          <th>浏览次数</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in blog_list" :key="index">
          <td width="80">{{index + 1}}</td>
          <td width="450"><p class="p1">{{item.name}}</p></td>
          <td width="250">{{item.create_time}}</td>
          <td width="150">{{item.teacher}}</td>
          <td width="150">{{item.see_times}}</td>
          <td width="250">
            <span class="edit m-r-15" @click="_edit">配置</span>
            <span class="see m-r-15" @click="_see">查看</span>
            <span class="delete" @click="_delete(index)">删除</span>
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
          v-loading.fullscreen.lock="fullscreenLoading"
          :pager-count="5">
        </el-pagination>
      </div>
    </div>

    <div class="blog-cover" v-show="cover_show">
      <!-- 编辑-->
      <div class="cover-con" v-show="cover_type ===1 ">
        <h2>{{cover_tit}}</h2>
        <span class="close" @click="_create(false)"><img src="/admin/images/blog/close.png" alt=""></span>
        <ul class="edit-detail">
          <li>
            <span class="type-name"><label>*</label>博客标题</span>
            <input type="text" maxlength="30" class="inp" v-model="blog_con.tit">
            <label class="error_info" v-show="!blog_con.tit">必填项不能为空</label>
          </li>
          <li>
            <span class="type-name" style="float: left"><label>*</label>博客摘要</span>
            <textarea maxlength="250" v-model="blog_con.digest"></textarea>
            <label class="error_info" style="float: right; margin-right: 95px;"
                   v-show="!blog_con.digest">必填项不能为空</label>
          </li>
          <li>
            <span class="type-name" style="float: left"><label>*</label>分类</span>
            <el-select v-model="blog_con.fir_id" placeholder="请选择" class="m-r-15">
              <el-option
                v-for="(item,index) in blog_con.fir_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="blog_con.sec_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in blog_con.sec_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <label class="error_info" style="float: right; margin-right: 95px;"
                   v-show="!blog_con.fir_id || !blog_con.sec_id">必填项不能为空</label>
          </li>
          <li>
            <span class="type-name" style="float: left"><label>*</label>导师</span>
            <el-select v-model="blog_con.jg_id" placeholder="请选择" class="m-r-15">
              <el-option
                v-for="(item,index) in blog_con.jg_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="blog_con.teacher_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in blog_con.teacher_select"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <label class="error_info" style="float: right; margin-right: 95px;"
                   v-show="!blog_con.jg_id || !blog_con.teacher_id">必填项不能为空</label>
          </li>
          <li>
            <span class="type-name">博客内容</span>
            <div class="reach-edit">富文本编辑器</div>
          </li>
        </ul>
        <div class="add-btn" @click="add_save">立即发布</div>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftNav from '~/components/admin/LeftNav'
  import '~/static/admin/css/blog.css'

  export default {
    name: "index",
    layout: 'admin',
    components: {
      LeftNav
    },
    data() {
      return {
        // 侧边导航
        lefNav: [
          {
            name: '导师博客',
            link: '/admin/blog',
            active: true
          },
          {
            name: '博客分类管理',
            link: '',
            active: false
          },
          {
            name: '行业资讯',
            link: '',
            active: false
          },
        ],
        // 搜索信息
        search_info: {
          name: '',
          time: [],
          jg_select: [
            {
              id: '',
              name: '全部',
            },
            {
              id: 1,
              name: '安迪曼',
            },
            {
              id: 2,
              name: '塔伦特',
            },
          ],
          jg_id: '',
          teacher_select: [
            {
              id: '',
              name: '全部'
            },
            {
              id: 1,
              name: '胡老师'
            },
            {
              id: 2,
              name: '崔老师'
            },
            {
              id: 3,
              name: '曹老师'
            },
          ],
          teacher_id: '',
          fir_select: [
            {
              id: '',
              name: '全部',
            },
            {
              id: 1,
              name: '绩效考核',
            },
            {
              id: 2,
              name: '领导力培训',
            },
          ],
          fir_id: '',
          sec_select: [
            {
              id: '',
              name: '全部',
            },
            {
              id: 1,
              name: '绩效考核111',
            },
            {
              id: 2,
              name: '领导力培训222',
            },
          ],
          sec_id: '',
        },
        // 列表
        blog_list: [
          {
            name: '第一个标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          },
          {
            name: '中等长度标题中等长度标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          },
          {
            name: '长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          },
          {
            name: '第一个标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          },
          {
            name: '中等长度标题中等长度标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          },
          {
            name: '长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题',
            create_time: '2017-07-04 10:00:00',
            teacher: '胡老师',
            see_times: '15222',
          }
        ],
        // 加载动画
        fullscreenLoading: false,
        // 弹窗显示与消失
        // 分页
        paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50
        },
        // 弹窗显示
        cover_show: false,
        // 编辑还是查看 1 编辑  2查看
        cover_type: 1,
        // 弹窗标题
        cover_tit: '创建博客',
        // 编辑、新增的内容
        blog_con: {
          tit: '',
          digest: '',
          fir_select: [
            {
              id: 1,
              name: '绩效考核',
            },
            {
              id: 2,
              name: '领导力培训',
            },
          ],
          fir_id: '',
          sec_select: [
            {
              id: 1,
              name: '绩效考核111',
            },
            {
              id: 2,
              name: '领导力培训222',
            },
          ],
          sec_id: '',
          jg_select: [
            {
              id: 1,
              name: '安迪曼',
            },
            {
              id: 2,
              name: '塔伦特',
            },
          ],
          jg_id: '',
          teacher_select: [
            {
              id: 1,
              name: '胡老师'
            },
            {
              id: 2,
              name: '崔老师'
            },
            {
              id: 3,
              name: '曹老师'
            },
          ],
          teacher_id: '',
          con: '假装有内容！',
        }
      }
    },
    methods: {
      // 分页 每页显示数量
      handleSizeChange(val) {
        console.log('每页显示数量', val)
      },
      // 分页 当前页
      handleCurrentChange(val) {
        console.log('当前页', val)
      },
      // 新建博客
      _create(bool) {
        this.cover_show = bool;
      },
      // 编辑
      _edit() {
        // 编辑弹窗的显示
        this.cover_show = true;
        this.cover_type = 1;
        this.cover_tit = '编辑博客';
      },
      // 查看
      _see() {
        // 编辑弹窗的显示
        this.cover_show = true;
        this.cover_type = 2;
        this.cover_tit = '查看博客';
      },
      // 删除
      _delete(ind) {
        const that = this;
        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.blog_list.splice(ind, 1);
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
      // 保存
      add_save() {
        const that = this;
        // 判断条件
        if (that.blog_con.tit && that.blog_con.digest && that.blog_con.fir_id && that.blog_con.sec_id && that.blog_con.teacher_id && that.blog_con.con) {
          console.log('发送请求！')
        }else {
          this.$message.error('请把信息填写完整！')
        }
      },

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
