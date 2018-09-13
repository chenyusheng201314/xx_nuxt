<!--
    auoter: cys
-->
<template>
  <div>
    <LeftNav :data="leftNav"></LeftNav>
    <div class="admin-medal">
      <h2>勋章规则</h2>
      <ul class="medal-rule">
        <li v-for="(item,index) in star_medal" :key="index +'a'">
          <p class="p1">{{item.name}}</p>
          <p>
            <img :src="item.image_color.value" alt="" width="40px" style="margin-right: 50px">
            <img :src="item.image_gray.value" alt="" width="40px">
          </p>
          <p class="p2">
            累计{{item.medal_rule.rule_type.name}}
            <span>{{item.medal_rule.rule_value}}</span>
            {{item.medal_rule.rule_type.unit}}
          </p>
          <p class="p2">已发放：{{item.person_medal_count}}</p>
        </li>
      </ul>
      <h2>勋章规则</h2>
      <ul class="medal-rule">
        <li v-for="(item,index) in xly_medal" :key="index +'b'">
          <span class="delete" v-show="item.type && item.person_medal_count === 0" @click="delete_one(index)">
            <img src="/admin/images/medal/delete.png" alt="" height="20" width="20">
          </span>
          <p class="p1">
            <span v-show="!item.type">{{item.name}}</span>
            <input type="text" v-model="item.name" v-show="item.type">
          </p>
          <!-- 头像-->
          <p class="p3">
            <img :src="item.image_gray.value" alt="" width="40px" v-show="!item.type">
            <!--上传插件-->
            <el-upload
              class="avatar-uploader"
              action="https://platform.vpx.com.cn/api/v1/common/file/add"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              v-show="item.type"
            >
              <img src="/admin/images/medal/header2.png" class="avatar">
            </el-upload>
          </p>
          <p>
            <img :src="item.image_color.value" alt="" width="40px" v-show="!item.type">
            <!--上传插件-->
            <el-upload
              class="avatar-uploader"
              action="https://platform.vpx.com.cn/api/v1/common/file/add"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
              v-show="item.type"
            >
              <img src="/admin/images/medal/header.png" class="avatar">
            </el-upload>
          </p>

          <p class="p4">
            <span v-show="!item.type">{{ xly_list.forEach(function(val,key) {
              item.id === val.id ? val.name : '--'
 })   }}</span>
            <el-select v-model="item.xly_id" v-show="item.type" placeholder="请选择">
              <el-option
                v-for="(it,ind) in xly_list"
                :key="ind"
                :label="it.training_name"
                :value="it.id"
              >
              </el-option>
            </el-select>
          </p>
          <p class="p2">
            已发放：{{item.person_medal_count}}
          </p>
          <p class="last-p">
            <span class="save" v-show="item.type" @click="xly_save(index)">保存</span>
            <span class="edit" v-show="!item.type" @click="xly_edit(index)">编辑</span>
          </p>
        </li>
      </ul>
      <div class="add-btn" @click="add_medal">+ 添加训练营勋章</div>
    </div>
  </div>
</template>

<script>
  import LeftNav from '~/components/admin/LeftNav';
  import '~/static/admin/css/medal.css'

  export default {
    layout: 'admin',
    name: 'rule',
    components: {
      LeftNav
    },
    data() {
      return {
        leftNav: [
          {
            name: '勋章发放列表',
            link: '/admin/medal',
            active: false
          }, {
            name: '勋章规则',
            link: '/admin/medal/rule',
            active: true
          }
        ],
        now_xly_ind: 0,
      }
    },
    async asyncData({store}) {
      let arr = [], arr2 = [];
      // 获取类表
      let pramas = {
        url: '/manage/medal/list'
      };
      let res = await store.dispatch('adminHttpGet', pramas);
      res.data.forEach(function (val, key) {
        if (val.pid === 1) {
          arr.push(val)
        } else {
          val.type = false;
          val.xly_id = val.id;
          arr2.push(val)
        }
      });
      // 获取训练营列表
      let xly = {
        url: '/manage/training/training_list',
        data: {
          page: 1,
          psize: 99999999999999999999999
        }
      };
      let res_xly = await store.dispatch('adminHttpGet', xly);
      return {
        star_medal: arr,
        xly_medal: arr2,
        xly_list: res_xly.data.data,
      }
    },
    methods: {
      //编辑  目前同一时间只能对一个训练营编辑
      xly_edit(index) {
        const that = this;
        that.now_xly_ind = index;

        $.each(that.xly_medal, function (key, val) {
          if (key === index) {
            val.type = true
          } else {
            val.type = false
          }
        });
      },
      // 保存
      xly_save(index) {
        this.xly_medal[index].type = false;
      },
      // 删除
      delete_one(index) {
        const that = this;
        that.xly_medal.splice(index, 1)
      },

      // 已获得图片成功之后返回数据
      handleAvatarSuccess(res, file) {
        console.log('发送之后', file);
        const that = this;
      },
      // 未获得图片成功之后返回数据
      handleAvatarSuccess2(res, file) {
        console.log('发送之后', file);
        const that = this;
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // return isJPG && isLt2M;
        console.log('发送之前', file);
      },
      // 增加勋章
      add_medal() {
        let json = {
          xly_id: '',
          name: '',
          image_gray: {
            value: '',
            name: ''
          },
          image_color: {
            value: '',
            name: ''
          }
        };
      },
    },
    mounted() {
      console.log('行', this.star_medal);
      console.log('训练营', this.xly_medal);
      console.log('训练营列表', this.xly_list);
    },
  }
</script>

<style scoped>

</style>
