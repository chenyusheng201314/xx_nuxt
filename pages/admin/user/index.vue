<template>
  <div>
    <leftNav :data="leftNav"></leftNav>
    <div class="user" v-loading.fullscreen.lock="fullscreenLoading">
      <List :search_info="search_info"
            :user_lists="user_lists"
            :paging="paging"
            :paging2="paging2"
            :accredit_search="accredit_search"
            @CurrentChange="CurrentChange"
            @SizeChange="SizeChange"
            @get_user_id="get_user_id"
            @type_change="type_change"
            :accredit="accredit"
            @accredit_search="accredit_search"
            @lesson_choose_one="lesson_choose_one"
            @lesson_choose_all="lesson_choose_all"
            @accreditSizeChange="accreditSizeChange"
            @accreditCurrentChange="accreditCurrentChange"
            @accredit_xly_choose="accredit_xly_choose"
            @accredit_bj_choose="accredit_bj_choose"
            @accredit_sure="accredit_sure"
            @user_list_search="user_list_search"
            @to_accredit="to_accredit"
            v-show="list_show"
            :sure_cover_show="sure_cover_show"
            @show_sure_cover="show_sure_cover"
            :cover_show="cover_show"
            :accredit_tab_type="accredit_tab_type"
            @accredit_tab_change="accredit_tab_change"
            @close_cover="close_cover"
      ></List>

      <Information
        v-show="!list_show"
        :user_info="user_info"
        :jifen_list="jifen_list"
        :jifen_paging="jifen_paging"
        @back="back"
        @coverCurrentChange="coverCurrentChange"
        @coverSizeChange="coverSizeChange"
        @get_per_jifen="get_per_jifen"
        @jf_handleSizeChange="jf_handleSizeChange"
        @jf_handleCurrentChange="jf_handleCurrentChange"
        :pt_list="pt_list"
        :pt_paging="pt_paging"
        @pt_handleSizeChange="pt_handleSizeChange"
        @pt_handleCurrentChange="pt_handleCurrentChange"
        @to_money="to_money"
        :ios_list="ios_list"
        :ios_paging="ios_paging"
        @ios_handleSizeChange="ios_handleSizeChange"
        @ios_handleCurrentChange="ios_handleCurrentChange"
        @to_ios="to_ios"
        :user_couser_list="user_couser_list"
        :user_course_paging="user_course_paging"
        @get_user_course="get_user_course"
        @course_handleSizeChange="course_handleSizeChange"
        @course_handleCurrentChange="course_handleCurrentChange"
        :get_list="get_list"
        :send_list="send_list"
        :get_paging="get_paging"
        @get_send="get_send"
        @get_handleCurrentChange="get_handleCurrentChange"
        @get_handleSizeChange="get_handleSizeChange"
        :like_lesson="like_lesson"
        :like_teacher="like_teacher"
        :like_xly="like_xly"
        :like_paging="like_paging"
        @get_like="get_like"
        @like_handleSizeChange="like_handleSizeChange"
        @like_handleCurrentChange="like_handleCurrentChange"
        :user_xly_list="user_xly_list"
        @get_user_xly="get_user_xly"
      ></Information>

    </div>
  </div>
</template>

<script>
  import leftNav from '~/components/admin/LeftNav'
  import List from './userList'
  import Information from './information'
  import '~/static/admin/css/user.css'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    layout: 'admin',
    name: "user",
    components: {
      leftNav,
      List,
      Information
    },
    data() {
      return {
        leftNav: [
          {
            name: '用户列表',
            link: '/admin/user',
            active: true
          },
          {
            name: '授权记录',
            link: '/admin/user/accreditLits',
            active: false
          },
        ],
        //当前授权的ID
        now_id: '',
        //记载动画
        fullscreenLoading: false,
        // 用户列表搜索条件
        search_info: {
          name: '',
          account: '',
          type_select: [
            {num: '', tit: '全部'},
            {num: 1, tit: '正常'},
            {num: 0, tit: '冻结'}
          ],
          type: '',
          sex_select: [
            {num: '', tit: '全部'},
            {num: 1, tit: '男'},
            {num: 2, tit: '女'}
          ],
          sex: '',
          time: [],
          birthday: []
        },
        // 可授权课程搜索信息
        accredit: {
          lesson_all_choose: false,
          lesson_list: [],
          xly_list: [],
          accredit_per: ''
        },
        // 授权最后确认弹窗
        sure_cover_show: false,
        // 授权弹窗
        cover_show: false,
        // 课程还是训练营 true 课程 false 训练营
        accredit_tab_type: true,
        // 列表和详情切换
        list_show: true,
        // 去查看当前用户id
        see_user_id: '',
        //  用户信息
        user_info: {
          person: {
            id: '',
            username: "188****8264",
            mobile: "18861828264",
            photo: {
              value: "https://xiangxue-project.oss-cn-shanghai.aliyuncs.com/platform/1533719651306140.png",
              name: "1533719651306140.png"
            },
            last_login_ip: "",
            last_login_time: '',
            register_time: "2018-09-10 16:14:17",
            birthday: '',
            sex: '',
            learn_coin: "0.00",
            learn_ios_coin: "0.00",
            point: '',
            status: '',
            is_aut: '',
            company_id: '',
            wechat: '',
            email: '',
            qq: '',
            is_new_message: '',
            login_day_num: '',
            identification_number: '',
            address: '',
            company_name: '',
            company_position: '',
            company_industry: '',
            years_of_training: '',
            company: ''
          },
          learning_track: {
            order_count: '',
            person_authorization_record_course_count: '',
            person_course_get_company_count: '',
            course_given_count: '',
            course_completion_count: '',
            training_buy_count: '',
            person_authorization_record_training_count: '',
            person_training_get_company_count: '',
            course_favour_count: '',
            person_teacher_follow_count: '',
            training_favour_count: '',
            get_given_person_count: '',
            given_person_count: ''
          },
          transaction_statistics: {
            recharge_money_total: '',
            order_money_total: '',
            order_count_total: ''
          }
        },
        //  积分列表
        jifen_list: [],
        //积分的分页
        jifen_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        // 普通钱包列表
        pt_list: [],
        //普通钱包的分页
        pt_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        // ios钱包列表
        ios_list: [],
        // ios钱包的分页
        ios_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        //课程列表
        user_couser_list: [],
        // 课程分页
        user_course_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        // 获赠列表
        get_list: [],
        // 赠送列表
        send_list: [],
        //  分页
        get_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        //关注课程
        like_lesson: [],
        //关注老师
        like_teacher: [],
        //关注训练营
        like_xly: [],
        // 关注相关的分页
        like_paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
        //  用户训练营
        user_xly_list: [],
      }
    },

    async asyncData({store}) {
      // 用户列表
      let user_list = {
        url: '/manage/person/list',
        data: {
          page: 1,
          psize: 10,
          username: '',
          mobile: '',
          status: '',
          sex: '',
          register_start_time: '',
          register_end_time: '',
          birthday_start_time: '',
          birthday_end_time: '',
        }
      };
      let user_res = await store.dispatch("adminHttpGet", user_list);

      // 可授权课程搜索信息
      // 1.一级课程分类
      let fir = {
        url: '/manage/manage_course/course_add_sort_list',
        data: {
          father_id: 0
        }
      };
      let fir_res = await store.dispatch("adminHttpGet", fir);
      fir_res.data.unshift({id: '', sort_name: '全部'});
      // 2.获取机构列表
      let jg = {
        url: '/manage/manage_course/course_organization_list',
      };
      let jg_res = await store.dispatch("adminHttpGet", jg);
      jg_res.data.unshift({id: '', title: '全部'});
      return {
        // 用户列表
        user_lists: user_res.data.data,
        //用户列表分页
        paging: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: user_res.data.total
        },
        // 可授权课程搜索信息
        accredit_search: {
          fir_selcet: fir_res.data,
          fir_id: '',
          sec_select: [{id: '', sort_name: '全部'}],
          sec_id: '',
          lesson_name: '',
          status_select: [
            {num: '', tit: '全部'},
            {num: 0, tit: '已下架'},
            {num: 1, tit: '已上架'},
          ],
          status: '',
          jg_select: jg_res.data,
          jg_id: '',
          teacher_select: [{id: '', realname: '全部'}],
          teacher_id: ''
        },
        // 可授权课程的分页
        paging2: {
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 10,// 默认显示多少条
          total: 50,
        },
      }
    },
    watch: {
      'accredit_search.fir_id': async function () {
        const that = this;
        if (that.accredit_search.fir_id === '') {
          that.accredit_search.sec_select = [{id: '', sort_name: '全部'}]
        } else {
          let sec = {
            url: '/manage/manage_course/course_add_sort_list',
            data: {
              father_id: that.accredit_search.fir_id
            }
          };
          let sec_res = await that.$store.dispatch("adminHttpGet", sec);
          if (sec_res.data) {
            sec_res.data.unshift({id: '', sort_name: '全部'})
          } else {
            sec_res.data = [{id: '', sort_name: '全部'}]
          }
          that.accredit_search.sec_select = sec_res.data;
        }
      },
      'accredit_search.jg_id': async function () {
        const that = this;
        if (that.accredit_search.jg_id === '') {
          that.accredit_search.teacher_select = [{id: '', realname: '全部'}]
        } else {
          let tea = {
            url: '/manage/manage_course/course_organization_teacher_list',
            data: {
              organization_id: that.accredit_search.jg_id
            }
          };
          let tea_res = await that.$store.dispatch("adminHttpGet", tea);
          console.log('111', tea_res);
          tea_res.data.unshift({id: '', realname: '全部'});
          that.accredit_search.teacher_select = tea_res.data;
        }
      },
    },
    methods: {
      // 用户列表搜索
      async get_user_list() {
        const that = this;
        that.fullscreenLoading = true;
        let user_list = {
          url: '/manage/person/list',
          data: {
            page: that.paging.currentPage,
            psize: that.paging.page_size,
            username: that.search_info.name,
            mobile: that.search_info.account,
            status: that.search_info.type,
            sex: that.search_info.sex,
            register_start_time: that.search_info.item ? that.search_info.item[0] : '',
            register_end_time: that.search_info.item ? that.search_info.item[1] : '',
            birthday_start_time: that.search_info.birthday ? that.search_info.birthday[0] : '',
            birthday_end_time: that.search_info.birthday ? that.search_info.birthday[1] : '',
          }
        };
        let user_res = await that.$store.dispatch("adminHttpGet", user_list);
        if (user_res) {
          that.fullscreenLoading = false;
        }
        that.user_lists = user_res.data.data;
        that.paging.total = user_res.data.total;
      },
      // 用户列表当前页
      CurrentChange(val) {
        console.log('当前页', val);
        this.paging.currentPage = val;
        this.get_user_list();
      },
      // 用户列表每页显示多少条
      SizeChange(val) {
        this.paging.page_size = val;
        this.get_user_list();
      },
      //用户列表搜索
      user_list_search() {
        this.get_user_list();
      },
      // 可授权的课程
      async get_acc_lesscon(id) {
        const that = this;
        that.fullscreenLoading = true;
        let params = {
          url: '/manage/person_authorization_record/course_auth_list',
          data: {
            page: that.paging2.currentPage,
            psize: that.paging2.page_size,
            person_id: id,
            first_sort_id: that.accredit_search.fir_id,
            second_sort_id: that.accredit_search.sec_id,
            course_name: that.accredit_search.lesson_name,
            teacher_id: that.accredit_search.teacher_id,
            organization_id: that.accredit_search.jg_id,
            status: that.accredit_search.status
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", params);
        if (res) {
          that.fullscreenLoading = false;
        }
        res.data.data.forEach(function (val, key) {
          if (val.is_auth === 1) {
            val.choose = true
          } else {
            val.choose = false
          }
        });

        that.accredit.lesson_list = res.data.data;
        that.paging2.total = res.data.total;
        console.log('可授权课程', res);
      },
      // 获取可授权 训练营
      async get_xly(id) {
        const that = this;
        var now = moment().format('YYYY-MM-DD');
        console.log('时间', now);
        that.fullscreenLoading = true;
        let params = {
          url: '/manage/person_authorization_record/training_auth_list',
          data: {
            person_id: id
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", params);
        if (res) {
          that.fullscreenLoading = false;
        }
        console.log('训练营', res);
        res.data.forEach(function (val, key) {
          val.choose = false;
          val.training_class.forEach(function (vv, kk) {
            vv.choose = false;
            if (moment(now).isBefore(vv.open_class_end_time)) {
              vv.status = 1
            } else {
              vv.status = 0
            }
          })
        });
        that.accredit.xly_list = res.data;
      },
      // 去授权
      to_accredit(id) {
        const that = this;
        that.now_id = id;
        // 初始化
        that.paging2.currentPage = 1;
        that.paging2.psize = 10;
        that.get_acc_lesscon(id);
        that.get_xly(id);
        this.cover_show = true
      },
      //  改变状态
      type_change(bool, ind, id) {
        const that = this;
        this.user_lists[ind].status = bool;
        axios({
          method: 'post',
          url: '/manage/person/status',
          baseURL: that.$store.state.admin.baseUrl,
          headers: {
            token: that.$store.state.admin.token,
          },
          data: {
            id: id,
            status: bool
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: '设置成功！',
              type: 'success'
            })
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //授权搜索
      fun_accredit_search() {
        console.log(this.accredit_search)
      },
      // 课程选择
      lesson_choose_one(bool, ind) {
        const that = this;
        let num = 0;
        that.accredit.lesson_list[ind].choose = bool
        $.each(that.accredit.lesson_list, function (key, val) {
          if (val.choose) {
            num += 0
          } else {
            num += 1
          }
        });
        if (num === 0) {
          that.accredit.lesson_all_choose = true
        } else {
          that.accredit.lesson_all_choose = false
        }
      },
      //  课程全选
      lesson_choose_all(bool) {
        const that = this;
        that.accredit.lesson_all_choose = bool;
        $.each(that.accredit.lesson_list, function (key, val) {
          val.choose = bool
        })
      },
      //  授权当前页切换
      accreditCurrentChange(val) {
        this.paging2.currentPage = val;
        this.get_acc_lesscon(this.now_id);
      },
      //  授权每页显示多少条切换
      accreditSizeChange(val) {
        this.paging2.page_size = val;
        this.get_acc_lesscon(this.now_id);
      },
      //授权训练营的选择
      accredit_xly_choose(ind) {
        const that = this;

        $.each(that.accredit.xly_list, function (key, val) {
          if (key === ind) {
            val.choose = true
          } else {
            val.choose = false
          }
        });
        console.log(that.accredit.xly_list[ind]);
      },
      //选择班级
      accredit_bj_choose(bool, index, ind) {
        const that = this;
        $.each(that.accredit.xly_list, function (key, val) {
          $.each(val.training_class, function (k, v) {
            if (key === index && k === ind) {
              v.choose = bool
            } else {
              v.choose = false
            }
          })
        })
      },
      //  授权人填写弹窗开启与关闭
      show_sure_cover(bool) {
        const that = this;
        let i = 0, j = 0, z = 0;
        // 判断是否选择了课程或者训练营
        if (bool) {
          if (that.accredit_tab_type) {
            // 课程
            //判断有无选择
            that.accredit.lesson_list.forEach(function (val, key) {
              if (!val.choose) {
                i += 0
              } else {
                i++
              }
            });
            if (i === 0) {
              this.$message.error('至少选择一个课程');
            } else {
              this.sure_cover_show = bool;
            }
          } else {
            that.accredit.xly_list.forEach(function (val, key) {
              if (!val.choose) {
                j += 0
              } else {
                j++;
                val.training_class.forEach(function (vv, kk) {
                  if (!vv.choose) {
                    z += 0;
                  } else {
                    z++;
                  }
                })
              }

            });
            if (j === 0) {
              this.$message.error('请选择训练营');
            } else {
              if (z === 0) {
                this.$message.error('请选择班级');
              } else {
                this.sure_cover_show = bool;
              }
            }

          }
        } else {
          this.sure_cover_show = bool;
        }

      },
      // 授权课程和训练营的切换
      accredit_tab_change(bool) {
        this.accredit_tab_type = bool
      },
      // 关闭授权弹窗
      close_cover(bool) {
        this.cover_show = bool
      },
      //  确认提交
      async accredit_sure(bool) {
        const that = this;
        let tmp = [], operator = '', tring_id = '', class_id = '';
        if (that.accredit.accredit_per !== '') {
          // 获取操作人
          operator = await axios({
            method: 'get',
            url: '/manage/manage/info',
            baseURL: that.$store.state.admin.baseUrl,
            headers: {
              token: that.$store.state.admin.token
            }
          }).then((res) => {
            return res.data.data.realname;
          }).catch((err) => {
            console.log(err);
          });
          // 提交
          if (bool) {
            // 提交课程
            // 获取选择的课程
            that.accredit.lesson_list.forEach(function (val, key) {
              if (val.choose) {
                tmp.push(val.id);
              }
            });
            // 发送请求
            axios({
              method: 'post',
              url: '/manage/person_authorization_record/course_auth_add',
              baseURL: that.$store.state.admin.baseUrl,
              headers: {
                token: that.$store.state.admin.token
              },
              data: {
                person_id: that.now_id,
                proposer: that.accredit.accredit_per,
                operator: operator,
                course_ids: tmp.join(',')
              }
            }).then((res) => {
              console.log(res);
              if (res.data.code === 0) {
                that.$message({
                  message: '授权成功！',
                  type: 'success',
                });
                //初始化
                that.sure_cover_show = false;
                that.cover_show = false;
                that.accredit_tab_type = true;
              }
            }).catch((err) => {
              console.log(err);
            })
          } else {
            // 训练营提交
            //获取已经选择的训练营的ID 和 class ID
            that.accredit.xly_list.forEach(function (val, key) {
              if (val.choose) {
                tring_id = val.id
              }
              val.training_class.forEach(function (vv, kk) {
                if (vv.choose) {
                  class_id = vv.id
                }
              })
            });

            axios({
              method: 'post',
              url: 'manage/person_authorization_record/training_auth_add',
              baseURL: that.$store.state.admin.baseUrl,
              headers: {
                token: that.$store.state.admin.token
              },
              data: {
                person_id: that.now_id,
                proposer: that.accredit.accredit_per,
                operator: operator,
                training_id: tring_id,
                class_id: class_id
              }
            }).then((res) => {
              console.log(res);
              if (res.data.code === 0) {
                that.$message({
                  message: '授权成功！',
                  type: 'success',
                });
                //初始化
                that.sure_cover_show = false;
                that.cover_show = false;
                that.accredit_tab_type = true;
              }
            }).catch((err) => {
              console.log(err);
            })

          }
        }

      },

      //  返回
      back(val) {
        this.list_show = val
      },
      coverSizeChange(val) {
        this.user_info.cover_paging.page_size = val
      },
      coverCurrentChange(val) {
        this.user_info.cover_paging.currentPage = val
      },
      // 查看获取ID
      async get_user_id(id) {
        const that = this;
        this.see_user_id = id;
        this.list_show = false;
        let params = {
          url: '/manage/person/show',
          data: {
            id: id
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", params);
        that.user_info = res.data;
        console.log('xinxi', that.user_info)
      },
      //获取积分的方法
      async fun_get_jifen(id) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person_point/list',
          data: {
            page: that.jifen_paging.currentPage,
            psize: that.jifen_paging.page_size,
            person_id: id,
            start_time: '',
            end_time: '',
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        that.jifen_list = res.data.data;
        that.jifen_paging.total = res.data.total;
      },
      //获取用户积分
      get_per_jifen() {
        const that = this;
        // 初始化
        that.jifen_paging.currentPage = 1;
        that.jifen_paging.page_size = 10;
        that.fun_get_jifen(that.see_user_id)
      },
      // 积分分页操作 每页显示数量
      jf_handleSizeChange(val) {
        this.jifen_paging.page_size = val;
        this.fun_get_jifen(this.see_user_id)
      },
      // 积分分页操作 当前页
      jf_handleCurrentChange(val) {
        this.jifen_paging.currentPage = val;
        this.fun_get_jifen(this.see_user_id)
      },
      //获取普通钱包方法
      async fun_get_money(data, id) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/wallet',
          data: {
            page: that.pt_paging.currentPage,
            psize: that.pt_paging.page_size,
            person_id: id,
            wallet_type: 2,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false
        }
        that.pt_list = res.data.data;
        that.pt_paging.total = res.data.total
      },
      //获取普通钱包
      to_money(data) {
        // 初始化
        this.pt_paging.currentPage = 1;
        this.pt_paging.page_size = 10;
        this.fun_get_money(data, this.see_user_id);
      },
      // 普通钱包分页操作 每页显示数量
      pt_handleSizeChange(data, val) {
        this.pt_paging.page_size = val;
        this.fun_get_money(data, this.see_user_id);
      },
      // 普通钱包分页操作 当前页
      pt_handleCurrentChange(data, val) {
        this.pt_paging.currentPage = val;
        this.fun_get_money(data, this.see_user_id);
      },
      // ios 获取方法
      async fun_get_ios(data, id) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/wallet',
          data: {
            page: that.ios_paging.currentPage,
            psize: that.ios_paging.page_size,
            person_id: id,
            wallet_type: 1,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false
        }
        that.ios_list = res.data.data;
        that.ios_paging.total = res.data.total
      },
      // ios钱包
      to_ios(data) {
        const that = this;
        // 初始化
        that.ios_paging.currentPage = 1;
        that.ios_paging.page_size = 10;
        that.fun_get_ios(data, that.see_user_id)

      },
      // ios钱包 分页操作 每页显示数量
      ios_handleSizeChange(data, val) {
      },
      // ios钱包 分页操作  当前页
      ios_handleCurrentChange(data, val) {
      },
      // 获取用户课程的方法
      async fun_get_course(id, data) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/course',
          data: {
            page: that.user_course_paging.currentPage,
            psize: that.user_course_paging.page_size,
            person_id: id,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        console.log('用户课程', res);
        res.data.data.forEach(function (val, key) {
          if (val.companycourse) {
            val.status = 1
          } else {
            val.status = val.course.status
          }
        });
        that.user_couser_list = res.data.data;
        that.user_course_paging.total = res.data.total;
      },
      // 获取用户
      get_user_course(data) {
        const that = this;
        // 初始化
        that.user_course_paging.currentPage = 1;
        that.user_course_paging.page_size = 10;
        that.fun_get_course(that.see_user_id, data);
      },
      // 课程分页操作
      course_handleSizeChange(data, val) {
        this.user_course_paging.page_size = val;
        this.fun_get_course(this.see_user_id, data);
      },
      // 课程分页操作
      course_handleCurrentChange(data, val) {
        this.user_course_paging.currentPage = val;
        this.fun_get_course(this.see_user_id, data);
      },
      // 赠送与后增方法
      async fun_get_send(data, id) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/course_given',
          data: {
            page: that.get_paging.currentPage,
            psize: that.get_paging.page_size,
            person_id: id,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        console.log('获赠或赠送', res);
        if (data === 1) {
          that.send_list = res.data.data;
        } else {
          that.get_list = res.data.data;
        }
        that.get_paging.total = res.data.total;
      },
      //赠送与获赠
      get_send(data) {
        // 初始化
        this.get_paging.currentPage = 1;
        this.get_paging.page_size = 10;
        this.fun_get_send(data, this.see_user_id);

      },
      // 赠送与获赠 分页操作 每页显示数量
      get_handleSizeChange(data, val) {
        this.get_paging.page_size = val;
        this.fun_get_send(data, this.see_user_id);
      },
      // 赠送与获赠 分页操作 当前页
      get_handleCurrentChange(data, val) {
        this.get_paging.currentPage = val;
        this.fun_get_send(data, this.see_user_id);
      },
      // 获取关注的列表
      async fun_get_like(data, id) {
        const that = this;
        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/follow',
          data: {
            page: that.get_paging.currentPage,
            psize: that.get_paging.page_size,
            person_id: id,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        console.log('关注', res);
        if (data === 1) {
          that.like_lesson = res.data.data
        } else if (data === 2) {
          that.like_teacher = res.data.data
        } else if (data === 3) {
          that.like_xly = res.data.data
        }
        that.like_paging.total = res.data.total
      },
      //  获取关注列表
      get_like(data) {
        const that = this;
        //初始化
        that.like_paging.currentPage = 1;
        that.like_paging.page_size = 10;
        that.fun_get_like(data, that.see_user_id);
      },
      like_handleSizeChange(data, val) {
        this.like_paging.page_size = val;
        this.fun_get_like(data, this.see_user_id);
      },
      like_handleCurrentChange(data, val) {
        this.like_paging.currentPage = val;
        this.fun_get_like(data, this.see_user_id);
      },
      //  获取用户训练营方法
      async fun_get_xly(data, id) {
        const that = this;

        that.fullscreenLoading = true;
        let pramas = {
          url: '/manage/person/training',
          data: {
            person_id: id,
            type: data,
          }
        };
        let res = await that.$store.dispatch("adminHttpGet", pramas);
        if (res) {
          that.fullscreenLoading = false;
        }
        if (res.data) {
          res.data.forEach((val, key) => {
            let num = 0;
            val.rates.forEach((vv, kk) => {

              if (vv.is_open === 1) {
                num++
              }
              val.jindu = num
            })
          });
          that.user_xly_list = res.data;

        } else {
          that.user_xly_list = [];
        }
        console.log('sssssss', that.user_xly_list);
      },
      //获取用户训练营
      get_user_xly(data) {
        const that = this;
        that.fun_get_xly(data, that.see_user_id)
      }

    },
    mounted() {
      console.log('token', this.$store.state.admin.token);
    },
  }
</script>

<style scoped>

</style>
