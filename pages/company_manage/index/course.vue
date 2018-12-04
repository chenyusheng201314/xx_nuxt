<template>
  <div class="company-course" v-loading.fullscreen.lock="fullscreenLoading">
    <h2>课程管理</h2>
    <p class="eng-name">Course management</p>
    <ul class="search-info">
      <li>
        <span class="li-span">课程名称</span>
        <input type="text" v-model="search_info.course_name">
      </li>
      <li>
        <span class="li-span">主讲导师</span>
        <input type="text" v-model="search_info.teacher">
      </li>
      <li class="last-li">
        <span class="search-btn" @click="course_search">搜索</span>
        <span class="add-btn" @click="to_cover(1)">+ 创建企业课程</span>
      </li>
    </ul>
    <div class="course-nav">
      <span class="nav-con" :class="{nav_active: course_type === 1}" @click="tab_change(1)">企业课程</span>
      <span class="nav-con" :class="{nav_active: course_type === 2}" @click="tab_change(2)">已购买课程</span>
    </div>
    <!-- 企业课程-->
    <div class="course-type" v-show="course_type === 1">
      <table>
        <tr>
          <th>序号</th>
          <th>课程封面</th>
          <th>课程名称</th>
          <th>主讲导师</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        <tbody>
        <tr v-for="(item,index) in company_lists" :key="index">
          <td width="100">{{index + 1}}</td>
          <td width="200">
            <img :src="item.cover.value" alt="" width="58" height="34">
          </td>
          <td width="650"><p class="p1">{{item.course_name}}</p></td>
          <td width="150">{{item.teacher}}</td>
          <td width="150">{{course_type === 1 ? '不限' : '--'}}</td>
          <td>
            <span class="iconfont" @click="to_cover(3,item)">&#xe610;</span>
            <span class="iconfont" @click="to_cover(2,item)">&#xe678;</span>
            <span class="iconfont" @click="to_cover(4,item)">&#xe603;</span>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页-->
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paging1.currentPage"
          :page-sizes="paging1.page_sizes"
          :page-size="paging1.page_size"
          layout="prev, pager, next, sizes, jumper"
          :total="paging1.total"
          :pager-count="5"
        >
        </el-pagination>
      </div>
    </div>
    <!--已购买课程-->
    <div class="course-type" v-show="course_type === 2">
      <table>
        <tr>
          <th>序号</th>
          <th>课程封面</th>
          <th>课程名称</th>
          <th>主讲导师</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        <tbody>
        <tr v-for="(item,index) in buy_lists" :key="index">
          <td width="100">{{index + 1}}</td>
          <td width="200">
            <img :src="item.course.cover.value" alt="" width="58" height="34">
          </td>
          <td width="650"><p class="p1">{{item.course.course_name}}</p></td>
          <td width="150">{{item.course.teacher.realname}}</td>
          <td width="150">{{item.course_left}}</td>
          <td>
            <span class="iconfont" @click="to_cover(3,item)">&#xe610;</span>
            <span class="iconfont" @click="to_cover(4,item)">&#xe603;</span>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页-->
      <div class="paging">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="paging2.currentPage"
          :page-sizes="paging2.page_sizes"
          :page-size="paging2.page_size"
          layout="prev, pager, next, sizes, jumper"
          :total="paging2.total"
          :pager-count="5"
        >
        </el-pagination>
      </div>
    </div>

    <!--弹窗-->
    <el-dialog
      :title="cover.type === 1? '创建企业课程' : cover.type === 2 ? '编辑企业课程' : cover.type === 3? '查看企业课程': '分发至学员'"
      :visible.sync="cover.show"
      :close-on-click-modal="false"
      :width="cover.width">
      <!--创建或编辑-->
      <div class="edit-course" v-show="cover.type === 1 || cover.type=== 2">
        <ul class="edit-info">
          <li class="li">
            <span class="type-name"><label>*</label>课程名称</span>
            <input type="text" v-model="edit_info.name" maxlength="15">
          </li>
          <li class="li">
            <span class="type-name"><label>*</label>主讲导师</span>
            <input type="text" v-model="edit_info.teacher" maxlength="10">
          </li>
          <li class="li">
            <span class="type-name"><label>*</label>课程封面</span>
            <img :src="edit_info.cover" alt="" width="177" height="111" style="cursor: pointer;"
                 @click="cut_pic(1500,852)">
          </li>
          <li class="li">
            <span class="type-name"><label>*</label>详情介绍</span>
            <quill-editor
              v-model="edit_info.description"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </li>
        </ul>
        <ul class="course-section" v-for="(item,index) in edit_info.list" :key="index">
          <li class="section-title">
            <span class="round"></span>
            <span class="txt">第{{index + 1}}章</span>
            <input type="text" v-model="item.chapter_name" maxlength="10" placeholder="请输入标题">
            <span class="add-sec" @click="add_section(index)">+ 添加课时</span>
            <span class="delete-one" @click="delete_chapter(index)" v-show="index !== 0">&#xe763;</span>
          </li>
          <li class="section-list" v-for="(it,ind) in item.sections" :key="ind">
            <span class="li-txt">课时{{ind + 1}}</span>
            <input type="text" v-model="it.section_name" maxlength="10" placeholder="请输入标题">
            <span class="li-txt2 txt-center">{{(it.media_time /60).toFixed(1)}}分钟</span>
            <span class="iconfont" @click="delete_section(index,ind)">&#xe62f;</span>
          </li>
        </ul>
        <div class="add-fir" @click="add_chapter">+ 添加章节</div>
        <div class="add-save" @click="course_save">保 存</div>
      </div>
      <!--查看-->
      <div class="edit-course" v-show="cover.type === 3">
        <div class="class-info">
          <div class="info-left">
            <img :src="see_info.cover" alt="">
          </div>
          <div class="info-right">
            <p class="tit">{{see_info.tit}}</p>
            <p class="p">
              <span class="iconfont">&#xe621;</span>
              <span class="span">{{see_info.teacher}}</span>
            </p>
            <p class="p">
              <span class="iconfont">&#xe740;</span>
              <span class="span">{{see_info.class_hour}}课时</span>
              <span class="iconfont">&#xe693;</span>
              <span class="span">{{(see_info.time / 3600).toFixed(1) }}小时</span>
            </p>
            <p class="tip">
              <span class="iconfont" v-show="course_type === 1" style="margin-right: 5px">&#xe705;</span>
              <span class="iconfont" v-show="course_type === 2" style="margin-right: 5px">&#xe64e;</span>
              <span v-show="course_type === 1">企业课程</span>
              <span v-show="course_type === 2">已购课程</span>
            </p>
          </div>
        </div>
        <div class="course-nav">
          <span class="nav-con "
                :class="{nav_active : see_info.nav_type === 1}"
                @click="see_nav_type(1)"
          >课程目录</span>
          <span class="nav-con"
                :class="{nav_active : see_info.nav_type === 2}"
                @click="see_nav_type(2)"
          >课程介绍</span>
        </div>
        <div v-show="see_info.nav_type === 1">
          <ul class="see-list" v-for="(item,index) in see_info.course_list" :key="index">
            <li class="tit">
              <span class="round"></span>
              <span class="txt">第{{index + 1}}章</span>
              <span class="txt">{{item.chapter_name}}</span>
            </li>
            <li class="li" v-for="(it,ind) in item.sections" :key="ind">
              <span class="span1">课时 {{ind + 1}}</span>
              <span class="span2">{{it.section_name}}</span>
              <span class="span3">{{(it.media_time / 60).toFixed(1)}}分钟</span>
            </li>
          </ul>
        </div>
        <div style="margin-top: 10px" v-show="see_info.nav_type === 2" v-html="see_info.con"></div>
      </div>
      <!--分发-->
      <div class="edit-course" v-show="cover.type === 4 ">
        <ul class="search-info">
          <li>
            <span class="li-span">真实姓名</span>
            <input type="text" v-model="out_search.name">
          </li>
          <li>
            <span class="li-span">账号</span>
            <input type="text" v-model="out_search.account">
          </li>
          <li>
            <span class="li-span">所属部门</span>
            <input type="text" v-model="out_search.department">
          </li>
          <li>
            <span class="li-span">性别</span>
            <el-select v-model="out_search.sex" placeholder="请选择">
              <el-option
                v-for="(item,index) in out_search.sex_select"
                :key="index"
                :label="item.name"
                :value="item.num">
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="li-span">生日</span>
            <el-date-picker
              v-model="out_search.time"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00','23:59:59']">
            </el-date-picker>
          </li>
          <li class="last-li">
            <span class="search-btn" @click="fun_out_search">搜索</span>
          </li>
        </ul>
        <table>
          <tr>
            <th>
              <span class="iconfont" v-show="!out_all_choose" @click="out_choose_all(true)">&#xe63b;</span>
              <span class="iconfont" v-show="out_all_choose" @click="out_choose_all(false)">&#xe670;</span>
            </th>
            <th>序号</th>
            <th>学员</th>
            <th>真实姓名</th>
            <th>部门</th>
            <th>账号</th>
            <th>性别</th>
            <th>生日</th>
          </tr>
          <tbody>
          <tr v-for="(item,index) in user_lists" :key="index">
            <td width="50px">
              <span class="iconfont" v-show="!item.isChoose && item.is_auth === 0"
                    @click="out_choose_one(index,true,item.person.id)">&#xe63b;</span>
              <span class="iconfont" v-show="item.isChoose && item.is_auth === 0 "
                    @click="out_choose_one(index,false,item.person.id)">&#xe670;</span>
              <span class="dis_choose" v-show="item.is_auth !== 0"></span>
            </td>
            <td width="80px">{{index + 1}}</td>
            <td width="200px">
              <img
                :src="item.person ? item.person.photo.value : 'https://xiangxue-project.oss-cn-shanghai.aliyuncs.com/platform/1539228101334251.png'"
                alt="" style="float: left; margin-right: 25px; margin-left: 25px">
              <span style="float: left">{{item.person ? item.person.username : '--'}}</span>
            </td>
            <td width="150">{{item.realname}}</td>
            <td width="180">{{item.department}}</td>
            <td width="180">{{item.person ? item.person.mobile : '--'}}</td>
            <td width="80">{{item.person ? $store.state.company.sex[item.person.sex] : '--'}}</td>
            <td>{{item.person ? item.person.birthday ===null || item.person.birthda === '' ? '--': item.person.birthday
              : '--' }}
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 分页-->
        <div class="paging">
          <el-pagination
            @size-change="outSizeChange"
            @current-change="outCurrentChange"
            :current-page.sync="out_paging.currentPage"
            :page-sizes="out_paging.page_sizes"
            :page-size="out_paging.page_size"
            layout="prev, pager, next, sizes, jumper"
            :total="out_paging.total"
            :pager-count="5"
          >
          </el-pagination>
        </div>

        <!-- 分发-->
        <div class="out-save" @click="out_save">分发至{{out_stu_num}}个学员</div>
      </div>

      <!-- 选择课时-->
      <el-dialog
        width="70%"
        title="选择课时"
        :visible.sync="out_show"
        :close-on-click-modal="false"
        append-to-body>
        <div class="company-course edit-course">
          <ul class="search-info">
            <li>
              <span class="li-span">视频名称</span>
              <input type="text" v-model="video_info.name">
            </li>
            <li>
              <span class="li-span">上传时间</span>
              <el-date-picker
                v-model="video_info.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00','23:59:59']">

              </el-date-picker>
            </li>
            <li>
              <span class="li-span">是否被使用</span>
              <el-select v-model="video_info.is_use" placeholder="请选择">
                <el-option
                  v-for="(item,index) in video_info.isUse_select"
                  :key="index"
                  :label="item.name"
                  :value="item.num">
                </el-option>
              </el-select>
            </li>
            <li class="last-li">
              <span class="search-btn" @click="video_search">搜索</span>
              <span class="add-btn" @click="add_to_section">添加到课时</span>
            </li>
          </ul>
          <table>
            <tr>
              <th>
                <span class="iconfont" @click="video_choose_all(true)" v-show="!video_info.all_choose">&#xe63b;</span>
                <span class="iconfont" @click="video_choose_all(false)" v-show="video_info.all_choose">&#xe670;</span>
              </th>
              <th>序号</th>
              <th>视频ID</th>
              <th>视频名称</th>
              <th>时长</th>
              <th>类型</th>
              <th>上传时间</th>
              <th>是否被使用</th>
            </tr>
            <tbody>
            <tr v-for="(item,index) in video_info.list" :key="index">
              <td width="50">
                <span class="iconfont" v-show="!item.is_choose"
                      @click="choose_one(index,true,item)">&#xe63b;</span>
                <span class="iconfont" v-show="item.is_choose"
                      @click="choose_one(index,false,item)">&#xe670;</span>
              </td>

              <td width="80">{{index + 1}}</td>
              <td width="300"><p class="name">{{item.video_id}}</p></td>
              <td width="300"><p class="name">{{item.show_name}}</p></td>
              <td width="100">{{(item.duration / 60).toFixed(1)}}分钟</td>
              <td width="90">{{item.video_type}}</td>
              <td width="170">{{item.created_at}}</td>
              <td>
                <span class="true" v-show="item.is_used !== 0">是</span>
                <span class="false" v-show="item.is_used === 0">否</span>
              </td>
            </tr>
            </tbody>
          </table>
          <!-- 分页-->
          <div class="paging">
            <el-pagination
              @size-change="videoSizeChange"
              @current-change="videoCurrentChange"
              :current-page.sync="video_info.paging.currentPage"
              :page-sizes="video_info.paging.page_sizes"
              :page-size="video_info.paging.page_size"
              layout="prev, pager, next, sizes, jumper"
              :total="video_info.paging.total"
              :pager-count="5"
            >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </el-dialog>

    <!--图片裁剪框-->
    <el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible" append-to-body width="50%">
      <cropper
        :cutPicInfo="cutPicInfo"
        v-on:cutPicSuccess="cutPicSuccess"/>
    </el-dialog>
  </div>
</template>

<script>
  import cropper from '~/components/companyManage/cropper';

  export default {
    name: "course",
    layout: 'companyManage',
    components: {
      cropper
    },
    data() {
      return {
        course_type: 1,  // 1 表示企业课程   2表示已购买的课程
        // 加载动画
        fullscreenLoading: false,
        // 搜索内容
        search_info: {
          course_name: '',
          teacher: ''
        },
        //弹窗
        cover: {
          show: false,
          width: '70%',
          type: 1,   // 1表示创建  2.表示编辑  3.表示查看  4.表示分发
        },
        // 编辑信息
        edit_info: {
          description: '',
          id: '',
          name: '',
          teacher: '',
          cover: '/company_manage/images/class/add-pic.png',
          pic_name: '',
          list: [{chapter_id: -1, chapter_name: '默认第一章', sections: []}],
        },
        //   发放全选
        out_all_choose: false,
        // 分发的搜索
        out_search: {
          name: '',
          account: '',
          department: '',
          sex: '',
          sex_select: [
            {num: '', name: '全部'},
            {num: 0, name: '保密'},
            {num: 1, name: '男'},
            {num: 2, name: '女'},
          ],
          time: [],
        },
        // 分发课程ID
        out_couse_id: '',
        // 发放学员个数
        out_stu_num: 0,
        out_paging: {
          total: 50,
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 20,// 默认显示多少条
        },
        // 已选学员列表
        out_choose_stu: [],
        // 用户列表
        user_lists: [
          {
            id: 1,
            cover: '/company_manage/images/class/cover.jpg',
            name: 'tom',
            real_name: '张三',
            department: '啦啦队步',
            account: '18865412369',
            sex: 1,
            birthday: '10-05',
            isChoose: false,
          },
        ],
        // 查看信息
        see_info: {
          cover: '',
          tit: '',
          teacher: '',
          time: 0,
          class_hour: 0,
          nav_type: 1,  //1表示课程目录   2表示课程介绍  默认是 1
          course_list: []
        },
        //裁剪框的显示
        dialogCropperVisible: false,
        // 裁剪框信息
        cutPicInfo: {},
        // 控制打开分发框的情况
        out_show: false,

        // 已选视频
        already_choose_video: [],
        // 当前章节
        now_chapter: '',
      }
    },
    async asyncData({store}) {
      // 企业课程列表
      let my_req = {
        url: '/company/course/company_course_list',
        data: {
          page: 1,
          psize: 20,
          course_name: '',
          teacher: '',
        }
      };
      let my_res = await store.dispatch('companyHttpGet', my_req);

      if (my_res.code === 1) {
        my_res.data = {
          data: [],
          total: 1,
        };
      }

      // 企业购买列表
      let buy_req = {
        url: '/company/course/company_buy_course_list',
        data: {
          page: 1,
          psize: 20,
          course_name: '',
          teacher: '',
        }
      };
      let buy_res = await store.dispatch('companyHttpGet', buy_req);
      if (buy_res.code === 1) {
        buy_res.data = {
          data: [],
          total: 1,
        };
      }


      // 视频列表
      let video_req = {
        url: '/company/company_video/video_list',
        data: {
          page: 1,
          psize: 20,
          is_used: '',
          video_id: '',
          show_name: '',
          create_start_time: '',
          create_end_time: '',
        }
      };
      let video_res = await store.dispatch('companyHttpGet', video_req);
      // 容错
      if (video_res.code === 1) {
        video_res.data = {
          data: [],
          total: 1,
        }
      } else {
        video_res.data.data.data.forEach((val, key) => {
          val.is_choose = false
        })
      }

      return {
        //企业课程列表
        company_lists: my_res.data.data,
        //企业课程分页
        paging1: {
          total: my_res.data.total,
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 20,// 默认显示多少条
        },
        //已购买课程
        buy_lists: buy_res.data.data,
        //已购买课程分页
        paging2: {
          total: buy_res.data.total,
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 20,// 默认显示多少条
        },
        // 视频库 信息
        video_info: {
          name: '',
          time: [],
          is_use: '',
          isUse_select: [
            {num: '', name: '全部'},
            {num: 1, name: '是'},
            {num: 0, name: '否'},
          ],
          paging: {
            total: video_res.data.data.total,
            currentPage: 1,  //当前页
            page_sizes: [10, 20, 30], //每页显示多少条下拉
            page_size: 20,// 默认显示多少条
          },
          // 视频列表
          list: video_res.data.data.data,
          //全选
          all_choose: false,
        },
      }

    },
    methods: {
      // 获取列表
      async get_list() {
        const that = this;
        let type = that.course_type;
        that.fullscreenLoading = true;
        if (type === 1) {
          // 企业课程
          let req = {
            url: '/company/course/company_course_list',
            data: {
              page: that.paging1.currentPage,
              psize: that.paging1.page_size,
              course_name: that.search_info.course_name,
              teacher: that.search_info.teacher,
            }
          };

          let res = await that.$store.dispatch('companyHttpGet', req);
          if (res.code === 1) {
            res.data = {
              data: [],
              total: 1,
            };
          }
          if (res) {
            that.fullscreenLoading = false;
          }

          that.company_lists = res.data.data;
        } else if (type === 2) {
          // 企业购买的课程
          let req = {
            url: '/company/course/company_buy_course_list',
            data: {
              page: that.paging2.currentPage,
              psize: that.paging2.page_size,
              course_name: that.search_info.course_name,
              teacher: that.search_info.teacher,
            }
          };
          let res = await that.$store.dispatch('companyHttpGet', req);
          if (res.code === 1) {
            res.data = {
              data: [],
              total: 1,
            };
          }
          if (res) {
            that.fullscreenLoading = false;
          }
          that.buy_lists = res.data.data;
        }
      },
      course_search() {
        let type = this.course_type;
        if (type === 1) {
          this.paging1.currentPage = 1;
          this.paging1.page_size = 1;
        } else {
          this.paging2.currentPage = 1;
          this.paging2.page_size = 1;
        }

        this.get_list();
      },
      // 获取发放学员列表
      async get_stu_list() {
        const that = this;
        that.fullscreenLoading = true;
        let req = {
          url: '/company/course/course_member_list',
          data: {
            type: that.course_type,
            course_id: that.out_couse_id,
            realname: that.out_search.name,
            department: that.out_search.department,
            mobile: that.out_search.account,
            sex: that.out_search.sex,
            birthday_start_time: that.out_search.time ? that.out_search.time[0] : '',
            birthday_end_time: that.out_search.time ? that.out_search.time[1] : '',
            page: that.out_paging.currentPage,
            psize: that.out_paging.page_size,
            username: '',
          }
        };
        let res = await that.$store.dispatch('companyHttpGet', req);
        console.log('学员', res);
        if (res) {
          that.fullscreenLoading = false;
        }
        if (res.code === 0) {
          res.data.data.forEach((val, key) => {
            val.isChoose = false;
            val.is_auth = val.person.is_auth;
          })
        } else {
          res.data.data = [];
        }
        that.user_lists = res.data.data;
        that.out_paging.total = res.data.total;
      },
      //企业课程分页每页显示数量
      handleSizeChange(val) {
        this.paging1.page_size = val;
        this.get_list();
      },
      //企业课程分页当前页
      handleCurrentChange(val) {
        this.paging1.currentPage = val;
        this.get_list();
      },
      //已购买的课程分页每页显示数量
      sizeChange(val) {
        this.paging2.page_size = val;
        this.get_list();
      },
      //已购买的课程分页当前页
      currentChange(val) {
        this.paging2.currentPage = val;
        this.get_list();
      },
      //企业课程和企业购买的课程 tab切换
      tab_change(num) {
        this.course_type = num;
        // 初始化
        this.paging2.currentPage = 1;
        this.paging2.page_size = 20;
        this.paging1.currentPage = 1;
        this.paging1.page_size = 20;
      },
      // 创建 等弹窗
      async to_cover(num, item) {
        const that = this;

        //创建
        if (num === 1) {
          // 权限
          let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'course', 'course_add');
          if (!checkInfo) {
            this.$message({message: '警告，您无此权限', type: 'warning'});
            return false
          }

          //创建初始化
          that.cover.type = num;
          that.cover.show = true;
          that.edit_info.id = -1;
          that.edit_info.description = '';
          that.edit_info.name = '';
          that.edit_info.teacher = '';
          that.edit_info.cover = '/company_manage/images/class/add-pic.png';
          that.edit_info.pic_name = '';
          that.edit_info.list = [{chapter_id: -1, chapter_name: '默认第一章', sections: []}];

        }
        //编辑
        if (num === 2) {

          // 权限
          let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'course', 'course_add');
          if (!checkInfo) {
            this.$message({message: '警告，您无此权限', type: 'warning'});
            return false
          }


          //编辑初始化
          that.cover.type = num;
          that.cover.show = true;
          that.fullscreenLoading = true;
          let req = {
            url: '/company/course/course_get',
            data: {
              type: that.course_type,
              course_id: item.id,
            }
          };
          let res = await that.$store.dispatch('companyHttpGet', req);
          if (res) {
            that.fullscreenLoading = false
          }
          if (res.code === 0) {
            res.data.chapters.forEach((val, key) => {
              val.sections = JSON.parse(JSON.stringify(val.company_course_section));
            });
            that.edit_info.id = res.data.id;
            that.edit_info.description = res.data.description;
            that.edit_info.name = res.data.course_name;
            that.edit_info.teacher = res.data.teacher;
            that.edit_info.cover = res.data.cover.value;
            that.edit_info.pic_name = res.data.cover.name;
            that.edit_info.list = res.data.chapters;
          } else {
            that.$message.error(res.message);
            that.cover.show = false;
          }
        }
        //查看
        if (num === 3) {
          that.cover.type = num;
          that.cover.show = true;
          that.fullscreenLoading = true;
          let course_id = '';
          if (that.course_type === 1) {
            course_id = item.id;
          } else {
            course_id = item.course.id
          }
          let req = {
            url: '/company/course/course_get',
            data: {
              type: that.course_type,
              course_id
            }
          };
          let res = await that.$store.dispatch('companyHttpGet', req);

          console.log('查看', res);
          if (res) {
            that.fullscreenLoading = false;
          }
          res.data.chapters.forEach((val, key) => {
            if (val.company_course_section) {
              val.sections = JSON.parse(JSON.stringify(val.company_course_section));
            } else {
              val.sections = JSON.parse(JSON.stringify(val.course_section));
            }
          });
          if (res.code === 0) {
            that.see_info.tit = res.data.course_name;
            that.see_info.cover = res.data.cover.value;
            that.see_info.teacher = res.data.teacher ? res.data.teacher : item.course.teacher.realname;
            that.see_info.time = res.data.media_time;
            that.see_info.con = res.data.description;
            that.see_info.class_hour = res.data.section_num;
            that.see_info.course_list = res.data.chapters;
          } else {
            that.$message.error(res.message);
          }

        }
        //分发
        if (num === 4) {
          // 权限
          let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'course', 'course_distribute');
          if (!checkInfo) {
            this.$message({message: '警告，您无此权限', type: 'warning'});
            return false
          }
          that.out_choose_stu = [];
          that.cover.type = num;
          that.cover.show = true;
          that.out_search.name = '';
          that.out_search.account = '';
          that.out_search.department = '';
          that.out_search.sex = '';
          that.out_search.time = [];
          if (that.course_type === 1) {
            that.out_couse_id = item.id;
          } else {
            that.out_couse_id = item.course.id
          }
          that.get_stu_list();
        }
      },
      // 富文本编译器
      onEditorBlur() { //失去焦点事件
      },
      onEditorFocus() { //获得焦点事件
      },
      async onEditorChange() { //内容改变事件
        const that = this;
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = that.edit_info.description.match(imgReg);
        arr = arr == null ? [] : arr;
        for (var i = 0; i < arr.length; i++) {
          var src = arr[i].match(srcReg);
          //获取图片地址
          if (src[1]) {
            if (src[1].indexOf('data:image') > -1) {
              let params = {url: "/common/file/add", data: {file_base64: src[1]}};
              let res = await this.$store.dispatch("companyHttpPost", params);
              that.edit_info.description = that.edit_info.description.replace(src[1], res.data.file_url);
            }
          }
        }
        console.log(that.edit_info.description);
      },
      //删除章节
      delete_chapter(index) {
        const that = this;
        this.$confirm('此操作将永久删除章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          if (that.edit_info.list[index].chapter_id === -1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            let req = {
              url: '/company/course/course_chapter_del',
              data: {
                chapter_ids: that.edit_info.list[index].chapter_id
              }
            };
            let res = await that.$store.dispatch('companyHttpPost', req);
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              that.$message.error(res.message);
            }
          }


          that.edit_info.list.splice(index, 1);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除小节
      delete_section(index, ind) {
        const that = this;
        that.$confirm('此操作将永久删除此课时, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          if (parseInt(that.edit_info.list[index].sections[ind].section_id) === -1) {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            let req = {
              url: '/company/course/course_section_del',
              data: {
                section_ids: that.edit_info.list[index].sections[ind].section_id
              }
            };
            let res = await that.$store.dispatch('companyHttpPost', req);
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              that.$message.error(res.message);
            }
          }
          that.edit_info.list[index].sections.splice(ind, 1);
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 查看导航切换
      see_nav_type(num) {
        this.see_info.nav_type = num
      },
      // 分发搜索
      fun_out_search() {
        this.out_paging.currentPage = 1;
        this.out_paging.page_size = 20;
        this.get_stu_list();
      },
      // 发放分页
      outSizeChange(val) {
        this.out_paging.page_size = val;
        this.get_stu_list()
      },
      outCurrentChange(val) {
        this.out_paging.currentPage = val;
        this.get_stu_list()
      },
      // 发放全选
      out_choose_all(bool) {
        const that = this;
        that.out_all_choose = bool;
        that.user_lists.forEach((val, key) => {
          if (val.is_auth === 0) {
            val.isChoose = bool;
          }
          if (bool && val.is_auth === 0) {
            console.log('11', val);
            that.out_choose_stu.push(val.person.id)
          } else if (!bool && val.is_auth === 0) {
            that.out_choose_stu.splice(that.out_choose_stu.indexOf(val.person.id), 1)
          }
        });
        that.out_choose_stu = Array.from(new Set(that.out_choose_stu));
        console.log(that.out_choose_stu);
        that.out_stu_num = that.out_choose_stu.length;
      },
      //发放选择一个
      out_choose_one(ind, bool, person_id) {
        let num = 0;
        const that = this;
        that.user_lists[ind].isChoose = bool;
        //全选的状态变化
        that.user_lists.forEach((val, key) => {
          if (val.isChoose) {
            num += 0
          } else {
            num++
          }
        });
        if (num === 0) {
          that.out_all_choose = true
        } else {
          that.out_all_choose = false
        }
        if (bool) {
          that.out_choose_stu.push(person_id);
          that.out_stu_num = that.out_choose_stu.length;
        } else {
          that.out_choose_stu.splice(that.out_choose_stu.indexOf(person_id), 1);
          that.out_stu_num = that.out_choose_stu.length;
        }
      },
      // 发放
      async out_save() {
        const that = this;
        console.log(that.out_stu_num);
        if (parseInt(that.out_stu_num) === 0) {
          that.$message.error('请选择学员!')
        } else {
          let req = {
            url: '/company/course/course_distribute',
            data: {
              type: that.course_type,
              course_id: that.out_couse_id,
              person_ids: that.out_choose_stu.join(',')
            }
          };
          let res = await that.$store.dispatch('companyHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '操作成功!'
            });
            that.out_choose_stu = [];
            that.cover.show = false;
            that.get_list();
          } else {
            that.$message.error(res.message);
          }
        }

      },


      // 增加章节
      add_chapter() {
        let json = {
          chapter_id: -1,
          chapter_name: '',
          sections: [],
        };
        this.edit_info.list.push(json);
      },

      // 获取视频列表
      async get_video_list() {
        const that = this;
        that.fullscreenLoading = true;
        // 视频列表
        let video_req = {
          url: '/company/company_video/video_list',
          data: {
            page: that.video_info.paging.currentPage,
            psize: that.video_info.paging.page_size,
            is_used: that.video_info.is_use,
            video_id: '',
            show_name: that.video_info.name,
            create_start_time: that.video_info.time ? that.video_info.time[0] : '',
            create_end_time: that.video_info.time ? that.video_info.time[1] : '',
            role: 1,
          }
        };
        let video_res = await that.$store.dispatch('companyHttpGet', video_req);

        if (video_res.code === 1) {
          video_res.data = {
            data: [],
            total: 1,
          };
          that.fullscreenLoading = false;
        } else {
          video_res.data.data.data.forEach((val, key) => {
            val.is_choose = false
          });
          that.fullscreenLoading = false;
        }
        that.video_info.list = video_res.data.data.data;
      },
      video_search() {
        this.video_info.paging.currentPage = 1;
        this.video_info.paging.page_size = 20;
        this.get_video_list();
      },
      // 添加课时
      add_section(index) {
        this.out_show = true;
        // 初始化
        this.already_choose_video = [];
        // 当前章节
        this.now_chapter = index;
        // 清除已选状态
        this.video_info.list.forEach((val, key) => {
          val.is_choose = false;
        })

      },
      // 视频分页
      videoSizeChange(val) {
        this.video_info.paging.page_size = val;
        this.get_video_list();
      },
      // 视频分页
      videoCurrentChange(val) {
        this.video_info.paging.currentPage = val;
        this.get_video_list();
      },
      // 视频库选择
      async choose_one(ind, bool, item) {
        let num = 0;
        const that = this;
        console.log(item.duration);
        // 获取视频时长
        if (bool && parseInt(item.duration) === 0) {
          let time_req = {
            url: '/common/video/company_video_duration_save',
            data: {
              videoid: item.video_id
            }
          };
          let time_res = await that.$store.dispatch('companyHttpPost', time_req);
          if (typeof(time_res.data) !== 'number') {
            that.$message({
              type: 'warning',
              message: '视频加载中，请稍后再试!'
            });
            return false
          } else {
            that.video_info.list[ind].duration = time_res.data;
          }
          console.log('qqqq', time_res.data);
        }

        that.video_info.list[ind].is_choose = bool;
        that.video_info.list.forEach((val, key) => {
          if (val.is_choose) {
            num += 0
          } else {
            num++
          }
        });
        if (num === 0) {
          that.video_info.all_choose = true;
        } else {
          that.video_info.all_choose = false;
        }
        //选择
        if (bool) {
          that.already_choose_video.push(that.video_info.list[ind])
        } else {
          // 删除
          that.already_choose_video.forEach((val, key) => {
            if (val.id === that.video_info.list[ind].id) {
              that.already_choose_video.splice(key, 1);
            }
          });
        }
        console.log('已选', that.already_choose_video);
      },
      // 视频全选
      video_choose_all(bool) {
        const that = this;
        that.video_info.all_choose = bool;
        that.video_info.list.forEach((val, key) => {
          val.is_choose = bool;
        });
        if (bool) {
          that.video_info.list.forEach((val, key) => {
            that.already_choose_video.push(val);
          });
          that.already_choose_video = [...new Set(that.already_choose_video)]
        } else {
          that.video_info.list.forEach((val, key) => {
            that.already_choose_video.forEach((v, k) => {
                if (val.id === v.id) {
                  that.already_choose_video.splice(k, 1);
                }
              }
            )
          })
        }
      },
      // 添加到课时
      add_to_section() {
        const that = this;
        if (that.already_choose_video.length === 0) {
          that.$message.error('请选择视频!')
        } else {
          that.already_choose_video.forEach((val, key) => {
            let json = {
              section_id: -1,
              section_name: val.show_name,
              video_name: val.show_name,
              video_id: val.video_id,
              media_time: val.duration,
            };
            that.edit_info.list[that.now_chapter].sections.push(json);
          });
          that.out_show = false;
          that.already_choose_video = [];
        }
      },
      // 课程保存
      async course_save() {
        const that = this;
        // 弹窗类型  课程创建和编辑接口不同 分类
        let type = that.cover.type;
        // 判断课程名称是否为空
        let num = 0, time = 0;

        that.edit_info.list.forEach((val, key) => {
          if (val.chapter_name === '') {
            num += 1
          } else if (val.sections) {
            val.sections.forEach((v, k) => {
              if (v.section_name === '') {
                num += 1
              } else {
                num += 0
              }
            })
          }
        });
        if (num !== 0) {
          that.$message.error('请先保存课时名称!')
        } else if (that.edit_info.name !== '' && that.edit_info.teacher !== '') {

          if (type === 1) {
            let req = {
              url: '/company/course/course_add',
              data: {
                course_name: that.edit_info.name,
                teacher: that.edit_info.teacher,
                cover: that.edit_info.pic_name,
                description: that.edit_info.description,
                chapter_content: JSON.stringify(that.edit_info.list),
              }
            };
            let res = await that.$store.dispatch('companyHttpPost', req);
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '保存成功!'
              });
              that.get_list();
              that.cover.show = false
            } else {
              that.$message.error(res.message)
            }

          } else if (type === 2) {
            // 编辑
            let req = {
              url: '/company/course/course_edit_save',
              data: {
                course_name: that.edit_info.name,
                course_id: that.edit_info.id,
                teacher: that.edit_info.teacher,
                cover: that.edit_info.pic_name,
                description: that.edit_info.description,
                chapter_content: JSON.stringify(that.edit_info.list),
              }
            };
            let res = await that.$store.dispatch('companyHttpPost', req);
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '保存成功!'
              });
              that.get_list();
              that.cover.show = false
            } else {
              that.$message.error(res.message)
            }
          }

        } else {
          that.$message.error('信息填写完整!')
        }
      },
      //图片上传
      async cutPicSuccess(res) {
        const that = this;
        this.dialogCropperVisible = res.visible;
        let params = {url: "/common/file/add", data: {file_base64: res.data}};
        let rest = await this.$store.dispatch("companyHttpPost", params);
        if (rest.code == 4002) {
          that.edit_info.cover = rest.data.file_url;
          that.edit_info.pic_name = rest.data.filename;
        }
        else {
          this.$message.error('图片上传失败');
        }
      },
      // 裁剪
      cut_pic(picWidth, picHeight) {
        this.$set(this.cutPicInfo, "aspectRatio", picWidth / picHeight);
        this.dialogCropperVisible = true
      },
    },
    head() {
      return {
        title: '课程管理',
        link: [
          {
            href: '/company_manage/css/cropper.min.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/company_manage/css/iconfont.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/company_manage/css/course.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ],
        script: [
          {src: '/admin/js/cropper.min.js'},
        ]
      }
    },
  }
</script>

<style scoped>

</style>
