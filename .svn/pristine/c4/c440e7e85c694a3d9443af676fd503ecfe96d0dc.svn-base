<!--
author:cys
-->

<template>
  <div class="company-role" v-loading.fullscreen.lock="fullscreenLoading">
    <h2>角色管理</h2>
    <p class="eng-name">Role management</p>
    <ul class="search-info">
      <li>
        <span class="li-span">角色名称</span>
        <input type="text" v-model="search_info.role">
      </li>
      <li>
        <span class="li-span">创建时间</span>
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
      <li class="last">
        <span class="search-btn" @click="fun_search">搜索</span>
        <span class="add-btn" @click="type_change(1)">+ 创建</span>
      </li>
    </ul>
    <table>
      <tr>
        <th>序号</th>
        <th>角色名称</th>
        <th>相关人员</th>
        <th>创建时间</th>
        <th>操作</th>
      </tr>
      <tbody>
      <tr v-for="(item,index) in roles_lists" :key="index">
        <td width="120">{{index + 1}}</td>
        <td width="200">{{item.role_name}}</td>
        <td width="680">
          <span v-for="(it,ind) in item.company" :key="ind">{{it.realname}}</span>
        </td>
        <td width="350">{{item.created_at}}</td>
        <td>
          <span class="iconfont" @click="type_change(3,item)">&#xe610;</span>
          <span class="iconfont" @click="type_change(2,item)">&#xe678;</span>
          <span class="iconfont" @click="delete_one(index,item.role_id,item)">&#xe62f;</span>
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
      >
      </el-pagination>
    </div>
    <!--弹窗-->
    <el-dialog
      :title="cover_type === 1? '创建角色' : cover_type === 2 ? '编辑角色' : '查看'"
      :visible.sync="cover_show"
      :close-on-click-modal="false"
      width="40%">
      <div class="cover-con">
        <ul>
          <li>
            <span class="li-name"><label>*</label>角色名称</span>
            <input type="text" :disabled="cover_type === 3" v-model="add_info.name" maxlength="10">
          </li>
          <li>
            <span class="li-name"><label>*</label>权限名称</span>
            <div class="jurisdiction">
              <div class="jurisdiction-all">
                <div class="jurisdiction-cover" v-show="cover_type === 3"></div>
                <div class="p1 p" v-for="(it1,ind1) in add_info.jurisdiction" :key="ind1">
                  <span class="iconfont no-choose"
                        @click="choose(true,ind1)"
                        v-show="!it1.isChoose">&#xe63b;</span>
                  <span class="iconfont choose"
                        @click="choose(false,ind1)"
                        v-show="it1.isChoose">&#xe670;</span>
                  <span class="span">{{it1.privilege_title}}</span>
                  <div class="p2 p" v-for="(it2,ind2) in it1.son" :key="ind2">
                    <span class="iconfont no-choose"
                          @click="choose(true,ind1,ind2)"
                          v-show="!it2.isChoose">&#xe63b;</span>
                    <span class="iconfont choose"
                          @click="choose(false,ind1,ind2)"
                          v-show="it2.isChoose">&#xe670;</span>
                    <span class="span">{{it2.privilege_title}}</span>
                    <div class="p3 p" v-for="(it3,ind3) in it2.son" :key="ind3">
                      <span class="iconfont no-choose"
                            @click="choose(true,ind1,ind2,ind3)"
                            v-show="!it3.isChoose">&#xe63b;</span>
                      <span class="iconfont choose"
                            @click="choose(false,ind1,ind2,ind3)"
                            v-show="it3.isChoose">&#xe670;</span>
                      <span class="span">{{it3.privilege_title}}</span>
                      <div class="p4 p" v-for="(it4,ind4) in it3.son" :key="ind4">
                        <span class="iconfont no-choose"
                              @click="choose(true,ind1,ind2,ind3,ind4)"
                              v-show="!it4.isChoose">&#xe63b;</span>
                        <span class="iconfont choose"
                              @click="choose(false,ind1,ind2,ind3,ind4)"
                              v-show="it4.isChoose">&#xe670;</span>
                        <span class="span">{{it4.privilege_title}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="add-save" v-show="cover_type !== 3" @click="role_save">保存</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    layout: 'companyManage',
    name: "role",
    data() {
      return {
        // 搜索信息
        search_info: {
          role: '',
          time: [],
        },

        // 加载动画
        fullscreenLoading: false,
        // 弹窗类型
        cover_type: 1, // 1表示创建账号  2表示编辑账号  3表示查看
        // 弹窗显示
        cover_show: false,
        // 添加或者编辑的用户信息
        user_info: {
          id: '',
          tit: '',
        },
        // 当前用户ID
        now_user_id: '',
      }
    },
    // 初始获取数据
    async asyncData({store}) {
      // 获取权限菜单
      let mun_req = {
        url: '/company/acl/privilege_list'
      };
      let mun_res = await store.dispatch('companyHttpGet', mun_req);
      // console.log('权限组', mun_res);

      // 添加状态选择状态
      // 判断数据是否为空
      if (mun_res.code === 0) {

        add_type(mun_res.data);

        // 递归方法
        function add_type(data) {
          data.forEach((val, key) => {
            val.isChoose = false;
            if (val.son) {
              add_type(val.son)
            } else {
              return false
            }
          })
        }
      } else {
        mun_res.data = [];
      }

      // 列表
      let list_req = {
        url: '/company/acl/role_list',
        data: {
          role_name: '',
          start_time: '',
          end_time: '',
          page: 1,
          psize: 20
        }
      };
      let list_res = await store.dispatch('companyHttpGet', list_req);
      return {
        //权限列表
        add_info: {
          name: '',
          id: '',
          jurisdiction: mun_res.data,
        },
        // 角色列表
        roles_lists: list_res.data.data,
        // 分页
        paging: {
          total: list_res.data.total,
          currentPage: 1,  //当前页
          page_sizes: [10, 20, 30], //每页显示多少条下拉
          page_size: 20,// 默认显示多少条
        },
      }
    },
    methods: {
      // 获取列表
      async get_list() {
        const that = this;
        that.fullscreenLoading = true;
        let list_req = {
          url: '/company/acl/role_list',
          data: {
            role_name: that.search_info.role,
            start_time: that.search_info.time ? that.search_info.time[0] : '',
            end_time: that.search_info.time ? that.search_info.time[1] : '',
            page: that.paging.currentPage,
            psize: that.paging.page_size,
          }
        };
        let list_res = await this.$store.dispatch('companyHttpGet', list_req);
        if (list_res) {
          that.fullscreenLoading = false;
        }
        that.roles_lists = list_res.data.data;
      },
      fun_search() {
        this.paging.currentPage = 1;
        this.paging.page_size = 20;
        this.get_list();
      },
      //分页每页显示数量
      handleSizeChange(val) {
        this.paging.page_size = val;
        this.get_list();
      },
      //分页当前页
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        this.get_list();
      },
      // 弹窗出现 一级类型区分
      async type_change(num, item) {
        const that = this;

        // num  1  添加  2编辑  3查看
        if (parseInt(num) === 1) {
          //权限
          let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'acl', 'role_add');
          if (!checkInfo) {
            this.$message({message: '警告，您无此权限', type: 'warning'});
            return false
          }
          // 添加初始化
          that.cover_show = true;
          that.cover_type = parseInt(num);
          that.add_info.name = '';
          that.add_info.id = '';
          init(that.add_info.jurisdiction);

          // 递归
          function init(data) {
            data.forEach((val, key) => {
              val.isChoose = false;
              if (val.son) {
                data = val.son;
                init(data)
              } else {
                return false
              }
            })
          }
        } else if (num === 2) {
          //权限
          let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'acl', 'role_add');
          if (!checkInfo) {
            this.$message({message: '警告，您无此权限', type: 'warning'});
            return false
          }
          //  编辑
          that.cover_show = true;
          that.cover_type = parseInt(num);
          that.add_info.name = item.role_name;
          // 获取权限
          that.now_user_id = item.role_id;
          that.add_info.id = item.role_id;
          // 添加选择效果
          that.set_choose(that.add_info.jurisdiction);

        } else if (num === 3) {
          // 查看
          //  编辑
          that.cover_show = true;
          that.cover_type = parseInt(num);
          that.add_info.name = item.role_name;
          // 获取权限
          that.now_user_id = item.role_id;
          that.add_info.id = item.role_id;
          // 添加选择效果
          that.set_choose(that.add_info.jurisdiction);
        }
      },
      // 查看，编辑给已有状态添加选择效果
      async set_choose(data) {
        const that = this;
        let arr = await that.get_jurisdiction(that.now_user_id);
        data.forEach((val, key) => {
          if (arr.indexOf(val.privilege_id) !== -1) {
            val.isChoose = true
          } else {
            val.isChoose = false
          }
          if (key === (data.length - 1)) {
            this.fullscreenLoading = false;
          }
          if (val.son) {
            data = val.son;
            that.set_choose(data)
          } else {
            return false
          }
        });

      },
      // 获取权限
      async get_jurisdiction(id) {
        const that = this;
        that.fullscreenLoading = true;
        let arr = [];
        let req = {
          url: '/company/acl/role_info',
          data: {
            role_id: id
          }
        };
        let res = await this.$store.dispatch('companyHttpGet', req);
        get_id(res.data);
        console.log('11', res.data);

        // 递归 获取ID 方法
        function get_id(data) {
          data.forEach((val, key) => {
            arr.push(parseInt(val.privilege_id));
            if (val.son) {
              get_id(val.son)
            } else {
              return false
            }
          })
        };
        return arr;

      },
      // 删除角色
      delete_one(ind, id, item) {
        console.log(id);
        const that = this;
        //权限
        let checkInfo = that.comsys.adminCheckRole(that.$store.state.company.companyRole.data, 'acl', 'role_del');
        if (!checkInfo) {
          this.$message({message: '警告，您无此权限', type: 'warning'});
          return false
        }


        if (item.company.length > 0) {
          that.$message.error('无法删除，存在账号正在使用该角色')
        } else {
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let req = {
              url: '/company/acl/role_del',
              data: {role_id: id}
            };
            let res = await that.$store.dispatch('companyHttpPost', req);
            if (res.code === 0) {
              that.$message({
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
        }
      },
      //选择一个
      choose(bool, ...ind) {
        const that = this;
        let ind1 = ind[0],
          ind2 = ind[1],
          ind3 = ind[2],
          ind4 = ind[3];

        // 子级选择时父级
        function choose1() {
          let num = 0;
          $.each(that.add_info.jurisdiction[ind1].son, function (key, val) {
            if (val.isChoose) {
              num++
            } else {
              num += 0
            }
            if (num !== 0) {
              that.add_info.jurisdiction[ind1].isChoose = true
            }
          })
        }

        // 子级选择时父级
        function choose2() {
          let num = 0;
          $.each(that.add_info.jurisdiction[ind1].son[ind2].son, function (key, val) {
            if (val.isChoose) {
              num++
            } else {
              num += 0
            }
            if (num !== 0) {
              that.add_info.jurisdiction[ind1].son[ind2].isChoose = true
            }
          })
        }

        // 子级选择时父级
        function choose3() {
          let num = 0;
          $.each(that.add_info.jurisdiction[ind1].son[ind2].son[ind3].son, function (key, val) {
            if (val.isChoose) {
              num++
            } else {
              num += 0
            }
            if (num !== 0) {
              that.add_info.jurisdiction[ind1].son[ind2].son[ind3].isChoose = true
            }
          })
        }

        // 父级选择是自己全选
        switch (ind.length) {
          case 1:
            that.add_info.jurisdiction[ind1].isChoose = bool;
            if (that.add_info.jurisdiction[ind1].son) {
              change(that.add_info.jurisdiction[ind1].son, bool);
            } else {
              that.add_info.jurisdiction[ind1].isChoose = bool
            }
            break;
          case 2:
            that.add_info.jurisdiction[ind1].son[ind2].isChoose = bool;
            if (that.add_info.jurisdiction[ind1].son[ind2].son) {
              change(that.add_info.jurisdiction[ind1].son[ind2].son, bool);
            } else {
              that.add_info.jurisdiction[ind1].son[ind2].isChoose = bool
            }
            choose1();
            break;
          case 3:
            that.add_info.jurisdiction[ind1].son[ind2].son[ind3].isChoose = bool;
            if (that.add_info.jurisdiction[ind1].son[ind2].son[ind3].son) {
              change(that.add_info.jurisdiction[ind1].son[ind2].son[ind3].son, bool);
            } else {
              that.add_info.jurisdiction[ind1].son[ind2].son[ind3].isChoose = bool
            }
            choose2();
            choose1();
            break;
          case 4:
            that.add_info.jurisdiction[ind1].son[ind2].son[ind3].son[ind4].isChoose = bool;
            choose3();
            choose2();
            choose1();
            break;
        }

        function change(data, type) {
          data.forEach(function (val, key) {
            val.isChoose = type;
            if (val.son) {
              data = val.son;
              change(data, type)
            } else {
              return
            }
          })
        }

      },
      // 保存
      async role_save() {
        const that = this;
        let already_choose = [];
        bl(that.add_info.jurisdiction);
        if (that.add_info.name !== '' && already_choose.length !== 0) {
          let req = {
            url: '/company/acl/role_add',
            data: {
              role_id: that.add_info.id,
              role_name: that.add_info.name,
              role_status: 1,
              privilege_id: already_choose.join(',')
            }
          };
          let res = await that.$store.dispatch('companyHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '操作成功!'
            });
            // 关闭弹窗
            that.cover_show = false;
            // 跟新数据
            that.get_list();
          } else {
            that.$message.error(res.message);
          }
        } else {
          that.$message.error('信息请填写完整!')
        }

        //方法-遍历数组拿到已经选择的
        function bl(data) {
          data.forEach((val, key) => {
            if (val.isChoose) {
              already_choose.push(val.privilege_id)
            }
            if (val.son) {
              data = val.son;
              bl(data);
            } else {
              return false
            }
          })
        }
      },
    },
    mounted() {
      console.log('token', this.$store.state.company.token);
    },
    head() {
      return {
        title: '角色管理',
        link: [
          {
            href: '/company_manage/css/iconfont.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/company_manage/css/role.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ],
      }
    },
  }
</script>

<style scoped>

</style>
