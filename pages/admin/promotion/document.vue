<!--
  author：cys
-->
<template>
  <div>
    <div class="promotion" v-loading.fullscreen.lock="fullscreenLoading">
      <h2>
        课程赠送文案
        <span class="add_list" @click="add_list">添加</span>
      </h2>
      <ul class="document-list">
        <li v-for="(item,index) in document_list" :key="index">
          <span class="delete-one" @click="delete_one(item.id)">
            <img src="/admin/images/promotion/delete-one.png" alt="">
          </span>
          <textarea v-model="item.words"
                    maxlength="50"
                    @focus="get_id(item.words)"
                    @blur="change_txt(item.id,item.words,index)"></textarea>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import leftNav from '~/components/admin/LeftNav'
  import axios from 'axios'

  export default {
    layout: 'admin',
    name: 'document',
    components: {
      leftNav
    },
    data() {
      return {
        leftNav: [
          {
            name: '最新上架',
            link: '/admin/promotion/',
            active: false
          },
          {
            name: '精品课程',
            link: '/admin/promotion/boutique',
            active: false
          },
          {
            name: '特价课程',
            link: '/admin/promotion/special',
            active: false
          },
          {
            name: '积分购',
            link: '/admin/promotion/integral',
            active: false
          },
          {
            name: '买一赠一',
            link: '/admin/promotion/present',
            active: false
          },
          {
            name: '免费专区',
            link: '/admin/promotion/free',
            active: false
          },
          {
            name: '课程赠送文案',
            link: '/admin/promotion/document',
            active: true
          }
        ],
        // 目前的内容 如果内衣改动 则不需要调用接口
        txt: '',
        fullscreenLoading: false,
      }
    },
    async asyncData({store}) {
      // 获取列表
      let params = {
        url: '/manage/course_activity/given_words_list'
      };
      let res = await store.dispatch("adminHttpGet", params);
      return {
        document_list: res.data,
      }
    },

    methods: {
      // 获取列表
      async get_list() {
        this.fullscreenLoading = true;
        let params = {
          url: '/manage/course_activity/given_words_list'
        };
        let res = await this.$store.dispatch("adminHttpGet", params);
        if (res) {
          this.fullscreenLoading = false;
        }
        this.document_list = res.data
      },
      // 获取ID
      get_id(txt) {
        this.txt = txt;
      },
      change_txt(id, txt, index) {
        const that = this;
        //权限
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data, 'course_activity', 'given_words_save');
        if (!checkInfo) {
          this.$message({message: '警告，您无此权限', type: 'warning'});
          return false
        }

        if (txt === '') {
          that.$message.error('不能为空');
          that.document_list[index].words = that.txt;
        } else if (txt !== that.txt && txt !== '') {
          axios({
            method: 'post',
            url: '/manage/course_activity/given_words_save',
            baseURL: that.$store.state.admin.baseUrl,
            headers: {
              token: that.$store.state.admin.token,
            },
            data: {
              id: id,
              words: txt,
            }
          }).then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                message: '修改成功!',
                type: "success"
              });
              that.get_list();
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      // 增加
      add_list() {
        //权限
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data, 'course_activity', 'given_words_save');
        if (!checkInfo) {
          this.$message({message: '警告，您无此权限', type: 'warning'});
          return false
        }

        let json = {
          id: '',
          words: '',
        };
        if (this.document_list.length > 20) {
          this.$message({
            type: 'error',
            message: '最多只能添加20条!'
          });
        }
        else {
          this.document_list.unshift(json)
        }
      },
      //  删除
      delete_one(id) {
        const that = this;
        //权限
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data, 'course_activity', 'given_words_del');
        if (!checkInfo) {
          this.$message({message: '警告，您无此权限', type: 'warning'});
          return false
        }
        console.log(id);

        axios({
          method: 'post',
          url: '/manage/course_activity/given_words_del',
          baseURL: that.$store.state.admin.baseUrl,
          headers: {
            token: that.$store.state.admin.token,
          },
          data: {
            id: id
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.get_list();
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    head() {
      return {
        title: "促销活动",
        link: [
          {
            href: '/admin/css/promotion.css',
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
