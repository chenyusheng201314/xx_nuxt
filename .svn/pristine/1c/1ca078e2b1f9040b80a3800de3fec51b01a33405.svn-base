<template>
  <div>
    <div class="admin-about">
      <h2>关于我们</h2>
      <div class="about-title">
        <span>iOS端显示游客登录的版本号</span>
        <input type="text" maxlength="10" @focus="get_txt" v-model="versions" @blur="v_save">
      </div>
      <div class="about-title">
        <span>关于我们介绍</span>
        <textarea v-model="con"></textarea>
        <div class="about-save" @click="con_save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        tmp_v: '',
      }
    },
    async asyncData({store}) {
      let v_req = {
        url: '/manage/config/info',
        data: {
          ident: 'app_person_guest_verson'
        }
      };
      let v_res = await store.dispatch('adminHttpGet', v_req);
      let con_req = {
        url: '/manage/config/info',
        data: {
          ident: 'about_us'
        }
      };
      let con_res = await store.dispatch('adminHttpGet', con_req);
      console.log('neirong', con_res);
      return {
        versions: v_res.data.value,
        con: con_res.data.value,
      }
    },
    methods: {
      //进入检查是否相同  可以为空
      get_txt() {
        this.tmp_v = this.versions;
      },
      //离开保存  可以为空
      async v_save() {
        const that = this;
        if (that.versions === that.tmp_v) {
          that.$message({
            type: 'success',
            message: '保存成功!'
          })
        } else {
          let req = {
            url: '/manage/config/update',
            data: {
              ident: 'app_person_guest_verson',
              value: that.versions
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '保存成功!'
            })
          } else {
            that.$message.error(res.message);
          }
        }
      },
      // 关于我们的内容保存  可以为空
      async con_save() {
        const that = this;
        let req = {
          url: '/manage/config/update',
          data: {
            ident: 'about_us',
            value: that.con
          }
        };
        let res = await that.$store.dispatch('adminHttpPost', req);
        console.log(res);
        if (res.code === 0) {
          that.$message({
            type: 'success',
            message: '保存成功!'
          })
        } else {
          that.$message.error(res.message);
        }
      }
    },
    mounted() {

    },
    head() {
      return {
        title: 'APP管理',
        link: [
          {
            href: '/admin/css/about.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
