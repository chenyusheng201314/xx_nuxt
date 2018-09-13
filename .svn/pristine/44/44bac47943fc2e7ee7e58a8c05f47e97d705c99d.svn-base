<!--
  author：cys
-->
<template>
  <div>
    <leftNav :data="leftNav"></leftNav>
    <div class="promotion">
      <h2>
        课程赠送文案
        <span class="add_list" @click="add_list">添加</span>
      </h2>
      <ul class="document-list">
        <li v-for="(item,index) in document_list" :key="index">
          <span class="delete-one" @click="delete_one(item.id)">
            <img src="/admin/images/promotion/delete-one.png" alt="">
          </span>
          <textarea v-model="item.words" maxlength="100" @focus="get_id(item.words)"
                    @blur="change_txt(item.id,item.words)"></textarea>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import leftNav from '~/components/admin/LeftNav'
  import '~/static/admin/css/promotion.css'
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
        let params = {
          url: '/manage/course_activity/given_words_list'
        };
        let res = await this.$store.dispatch("adminHttpGet", params);
        this.document_list = res.data
      },
      // 获取ID
      get_id(txt) {
        this.txt = txt;
      },
      change_txt(id, txt) {
        const that = this;
        if (txt !== this.txt) {
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
              })
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      // 增加
      add_list() {
        let json = {
          id: '',
          words: '',
        };
        this.document_list.unshift(json)
      },
      //  删除
      delete_one(id) {
        const that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
