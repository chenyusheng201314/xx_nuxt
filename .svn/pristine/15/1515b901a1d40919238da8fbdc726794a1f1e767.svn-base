<template>
  <div>
    <div class="admin-setting">
      <!-- 顶部 -->
      <h2>顶部广告</h2>
      <div class="setting-con">
        <div class="con-con">
          <div class="con-con-l">
            <el-upload
              class="avatar-uploader"
              :action="$store.state.admin.fileAddUrl"
              :headers="{token:$store.state.admin.token}"
              :show-file-list="false"
              :on-success="top_success"
              :before-upload="up_before">
              <img :src="top_ad.image.value" class="img1">
            </el-upload>
            <p class="con-sm">1920x120，PNG，jpg格式</p>
          </div>
          <div class="con-con-r">
            <p class="con-list">
              <span>链接：</span>
              <input type="text" maxlength="100" placeholder="请输入URL链接" v-model="top_ad.link">
            </p>
            <p class="con-list">
              <span>备注：</span>
              <input type="text" maxlength="10" placeholder="备注不会显示在前端" v-model="top_ad.name">
            </p>
            <span class="setting-save" @click="top_save">保存</span>
          </div>
        </div>
      </div>
      <!-- banner -->
      <h2>
        <b>banner</b>
        <span class="banner-save bannner-btn" @click="banner_save">保存</span>
        <span class="bannner-btn" :class="{banner_add: banner.length < 6,no_add : banner.length >= 6}"
              @click="add_banner">添加banner</span>
      </h2>
      <div class="con-con" v-for="(item,index) in banner" :key="index">
        <div class="con-con-l banner-l">
          <el-upload
            class="avatar-uploader"
            :action="$store.state.admin.fileAddUrl"
            :headers="{token:$store.state.admin.token}"
            :show-file-list="false"
            :on-success="banner_success"
            :before-upload="up_before">
            <img :src="item.image.value" class="img2" @click="get_ind(index)">
          </el-upload>
          <p class="con-sm">1920x600，PNG，jpg格式</p>
        </div>
        <div class="con-con-r">
          <p class="con-list">
            <span>链接：</span>
            <input type="text" maxlength="100" placeholder="请输入URL链接" v-model="item.link">
          </p>
          <p class="con-list">
            <span>备注：</span>
            <input type="text" maxlength="10" placeholder="备注不会显示在前端" v-model="item.name">
          </p>
          <div class="img-r">
            <img src="/admin/images/pc/delete.png" class="detele" alt="" @click="detele(index)">
            <img src="/admin/images/pc/up.png"
                 :class="{m_r_60: index === (banner.length - 1)}"
                 alt=""
                 v-show="index !== 0"
                 @click="to_up(index)"
            >
            <img src="/admin/images/pc/down.png"
                 :class="{m_r_60: index === 0}"
                 alt=""
                 v-show="index !== (banner.length - 1)"
                 @click="to_down(index)"
            >
          </div>
        </div>
      </div>
      <!-- 精品课程广告 -->
      <h2>精品课程广告</h2>
      <div class="setting-con">
        <div class="con-con">
          <div class="con-con-l jp-l">
            <el-upload
              class="avatar-uploader"
              :action="$store.state.admin.fileAddUrl"
              :headers="{token:$store.state.admin.token}"
              :show-file-list="false"
              :on-success="jp_success"
              :before-upload="up_before">
              <img :src="jp_ad.image.value" class="img3">
            </el-upload>
            <p class="con-sm">360x1273，PNG，jpg格式</p>
          </div>
          <div class="con-con-r">
            <p class="con-list">
              <span>链接：</span>
              <input type="text" maxlength="100" placeholder="请输入URL链接" v-model="jp_ad.link">
            </p>
            <p class="con-list">
              <span>备注：</span>
              <input type="text" maxlength="10" placeholder="备注不会显示在前端" v-model="jp_ad.name">
            </p>
            <span class="setting-save" @click="jp_save">保存</span>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <h2>底部广告</h2>
      <div class="setting-con">
        <div class="con-con">
          <div class="con-con-l">
            <el-upload
              class="avatar-uploader"
              :action="$store.state.admin.fileAddUrl"
              :headers="{token:$store.state.admin.token}"
              :show-file-list="false"
              :on-success="bottom_success"
              :before-upload="up_before">
              <img :src="bottom_ad.image.value" class="img4">
            </el-upload>
            <p class="con-sm">1200x120，PNG，jpg格式</p>
          </div>
          <div class="con-con-r">
            <p class="con-list">
              <span>链接：</span>
              <input type="text" maxlength="100" placeholder="请输入URL链接" v-model="bottom_ad.link">
            </p>
            <p class="con-list">
              <span>备注：</span>
              <input type="text" maxlength="10" placeholder="备注不会显示在前端" v-model="bottom_ad.name">
            </p>
            <span class="setting-save" @click="bottom_save">保存</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "setting",
    data() {
      return {
        now_banner: '',
      }
    },
    async asyncData({store}) {
      //顶部广告
      let top_req = {
        url: '/manage/ad/list',
        data: {
          type: 1
        }
      };
      let top_res = await store.dispatch('adminHttpGet', top_req);
      if (top_res.code === 1 || top_res.data.length === 0) {
        top_res.data = [
          {
            image: {
              name: '',
              value: '/admin/images/pc/top.png'
            },
            link: '',
            name: '',
            order_num: 0,
          }
        ]
      }
      //banner
      let banner_req = {
        url: '/manage/ad/list',
        data: {
          type: 2
        }
      };
      let banner_res = await store.dispatch('adminHttpGet', banner_req);
      console.log('banner', banner_res.data);
      if (banner_res.code === 0) {
        banner_res.data.forEach((val, key) => {
          val.order_num = key
        })
      } else if (banner_res.code === 1 || banner_res.data.length === 0) {
        banner_res.data = [
          {
            image: {
              name: '',
              value: '/admin/images/pc/banner.png'
            },
            link: '',
            name: '',
            order_num: ''
          }
        ];
      }

      //精品课程
      let jp_req = {
        url: '/manage/ad/list',
        data: {
          type: 3
        }
      };
      let jp_res = await store.dispatch('adminHttpGet', jp_req);

      if (jp_res.code === 1 || jp_res.data.length === 0) {
        jp_res.data = [
          {
            image: {
              name: '',
              value: '/admin/images/pc/jp.png'
            },
            link: '',
            name: '',
            order_num: 0,
          }
        ]
      }
      //底部课程
      let b_req = {
        url: '/manage/ad/list',
        data: {
          type: 4
        }
      };
      let b_res = await store.dispatch('adminHttpGet', b_req);
      if (b_res.code === 1 || b_res.data.length === 0) {
        b_res.data = [
          {
            image: {
              name: '',
              value: '/admin/images/pc/bottom.png'
            },
            link: '',
            name: '',
            order_num: 0,
          }
        ]
      }
      return {
        top_ad: top_res.data[0],
        banner: banner_res.data,
        jp_ad: jp_res.data[0],
        bottom_ad: b_res.data[0],
      }
    },
    methods: {
      //上移
      to_up(index) {
        this.banner.splice(index - 1, 1, ...this.banner.splice(index, 1, this.banner[index - 1]));
      },
      //下移
      to_down(index) {
        this.banner.splice(index, 1, ...this.banner.splice(index + 1, 1, this.banner[index]));
      },
      // banner增加
      add_banner() {
        const that = this;
        let len = this.banner.length;
        if (len < 6) {
          let json = {
            image: {
              name: '',
              value: ' /admin/images/pc/banner.png'
            },
            link: '',
            name: '',
            order_num: '',
          };
          that.banner.push(json);
        } else {
          this.$message.error('最多只能添加6条')
        }
      },
      //删除
      detele(index) {
        const that = this;
        that.banner.splice(index, 1);
        // that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //
        //   that.$message({
        //     type: 'success',
        //     message: '已删除，保存后生效!'
        //   });
        // }).catch(() => {
        //   that.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
      },
      // 顶部广告  上传之前
      up_before(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,png,gif 格式!');
        }
        return isJPG;
      },
      // 顶部广告
      top_success(res, file) {
        const that = this;
        let img = new Image();
        img.src = file.url;
        //判断尺寸
        img.onload = function () {
          if (img.width === 1920 && img.height === 120) {
            that.$set(that.top_ad.image, 'name', file.response.data.filename);
            that.$set(that.top_ad.image, 'value', file.response.data.file_url);

          } else {
            that.$message.error('上传图片尺寸必须为1920x120');
          }
        }

      },
      banner_success(res, file) {
        const that = this;
        let img = new Image();
        img.src = file.url;
        //判断尺寸
        img.onload = function () {
          if (img.width === 1920 && img.height === 600) {
            that.$set(that.banner[that.now_banner].image, 'name', file.response.data.filename);
            that.$set(that.banner[that.now_banner].image, 'value', file.response.data.file_url);

          } else {
            that.$message.error('上传图片尺寸必须为1920x600');
          }
        }

      },
      jp_success(res, file) {
        const that = this;
        let img = new Image();
        img.src = file.url;
        //判断尺寸
        img.onload = function () {
          if (img.width === 300 && img.height === 1273) {
            that.$set(that.jp_ad.image, 'name', file.response.data.filename);
            that.$set(that.jp_ad.image, 'value', file.response.data.file_url);
          } else {
            that.$message.error('上传图片尺寸必须为1260*2240px');
          }
        }

      },
      bottom_success(res, file) {
        const that = this;
        let img = new Image();
        img.src = file.url;
        //判断尺寸
        img.onload = function () {
          if (img.width === 1200 && img.height === 120) {
            that.$set(that.bottom_ad.image, 'name', file.response.data.filename);
            that.$set(that.bottom_ad.image, 'value', file.response.data.file_url);
          } else {
            that.$message.error('上传图片尺寸必须为1260*2240px');
          }
        }

      },
      get_ind(index) {
        console.log('qqq', index);
        this.now_banner = index;
      },
      //顶部广告保存
      async top_save() {
        const that = this;
        if (that.top_ad.image.name === '') {
          that.$message.error('请先上传图片!')
        } else if (that.top_ad.name !== '' && that.top_ad.link !== '') {
          // 数组处理
          let data = {
            name: that.top_ad.name,
            image: that.top_ad.image.name,
            order_num: that.top_ad.order_num,
            link: that.top_ad.link,
          };
          let req = {
            url: '/manage/ad/add',
            data: {
              type: 1,
              data: JSON.stringify(data),
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        } else {
          that.$message.error('请填写完整信息!')
        }
      },
      //banner保存
      async banner_save() {
        const that = this;
        let num = 0, arr = [];
        that.banner.forEach((val, key) => {
          if (val.image.name !== '' && val.name !== '' && val.link !== '') {
            num += 0;
            let json = {
              image: val.image.name,
              name: val.name,
              link: val.link,
              order_num: val.order_num,
            };
            arr.push(json);
          } else {
            num++
          }

        });
        if (num !== 0) {
          that.$message.error('请填写信息完整!')
        } else {
          let req = {
            url: '/manage/ad/add',
            data: {
              type: 2,
              data: JSON.stringify(arr),
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        }
      },
      // 精品课程保存
      async jp_save() {
        const that = this;
        if (that.jp_ad.image.name === '') {
          that.$message.error('请先上传图片!')
        } else if (that.jp_ad.name !== '' && that.jp_ad.link !== '') {
          // 数组处理
          let data = {
            name: that.jp_ad.name,
            image: that.jp_ad.image.name,
            order_num: that.jp_ad.order_num,
            link: that.jp_ad.link,
          };
          let req = {
            url: '/manage/ad/add',
            data: {
              type: 3,
              data: JSON.stringify(data),
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        } else {
          that.$message.error('请填写完整信息!')
        }
      },
      //底部广告保存
      async bottom_save() {
        const that = this;
        if (that.bottom_ad.image.name === '') {
          that.$message.error('请先上传图片!')
        } else if (that.bottom_ad.name !== '' && that.bottom_ad.link !== '') {
          // 数组处理
          let data = {
            name: that.bottom_ad.name,
            image: that.bottom_ad.image.name,
            order_num: that.bottom_ad.order_num,
            link: that.bottom_ad.link,
          };
          let req = {
            url: '/manage/ad/add',
            data: {
              type: 4,
              data: JSON.stringify(data),
            }
          };
          let res = await that.$store.dispatch('adminHttpPost', req);
          if (res.code === 0) {
            that.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        } else {
          that.$message.error('请填写完整信息!')
        }
      },

    },
    watch: {
      // 排序
      banner() {
        this.banner.forEach((val, key) => {
          val.order_num = key
        });
        console.log(this.banner);

      }
    },
    mounted() {
      console.log('aaa', this.banner);
    },
    head() {
      return {
        title: '官网管理',
        link: [
          {
            href: '/admin/css/setting.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
