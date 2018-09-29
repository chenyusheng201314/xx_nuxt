<template>
  <div class="company">
    <h2>企业信息</h2>
    <p class="eng-name">Enterprise information</p>
    <el-row :gutter="20">
      <!-- 基础信息-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="info-top">
            <span class="span-left">基础信息</span>
            <span class="span-right" @click="basics_edit(basics_edit_type)">{{basics_edit_type? '保存': '编辑'}}</span>
          </div>
          <!-- 未编辑状态-->
          <ul class="info-bottom" v-show="!basics_edit_type">
            <li>
              <span class="li-name">企业名称</span>
              <span class="li-con">{{basics_info.name}}</span>
            </li>
            <li>
              <span class="li-name">企业logo</span>
              <span class="li-con"><img :src="basics_info.logo" alt="你猜猜图片去哪了"></span>
            </li>
            <li>
              <span class="li-name">企业地址</span>
              <span class="li-con">{{basics_info.address}}</span>
            </li>
            <li>
              <span class="li-name">联系人</span>
              <span class="li-con">{{basics_info.linkman}}</span>
            </li>
            <li>
              <span class="li-name">联系方式</span>
              <span class="li-con">{{basics_info.tel}}</span>
            </li>
          </ul>
          <!-- 编辑状态-->
          <ul class="info-bottom" v-show="basics_edit_type">
            <li>
              <span class="li-name edit">企业名称</span>
              <span class="li-con"><input type="text" v-model="basics_info.name"></span>
            </li>
            <li>
              <span class="li-name edit">企业logo</span>
              <span class="li-con"><img :src="basics_info.logo" alt=""></span>
            </li>
            <li>
              <span class="li-name edit">企业地址</span>
              <span class="li-con"><input type="text" v-model="basics_info.address"></span>
            </li>
            <li>
              <span class="li-name edit">联系人</span>
              <span class="li-con"><input type="text" v-model="basics_info.linkman"></span>
            </li>
            <li>
              <span class="li-name edit">联系方式</span>
              <span class="li-con"><input type="text" v-model="basics_info.tel"></span>
            </li>

          </ul>
        </div>
      </el-col>
      <!--开票信息-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="info-top">
            <span class="span-left">开票信息</span>
            <span class="span-right" @click="billing_edit(billing_edit_type)">{{billing_edit_type? '保存': '编辑'}}</span>
          </div>
          <!--未编辑状态-->
          <ul class="info-bottom" v-show="!billing_edit_type">
            <li>
              <span class="li-name li-name2">纳税人识别号</span>
              <span class="li-con li-con2">{{billing_info.taxpayer}}</span>
            </li>
            <li>
              <span class="li-name li-name2">银行账号</span>
              <span class="li-con li-con2">{{billing_info.bank}}</span>
            </li>
            <li>
              <span class="li-name li-name2">地址</span>
              <span class="li-con li-con2">{{billing_info.address}}</span>
            </li>
            <li>
              <span class="li-name li-name2">电话</span>
              <span class="li-con li-con2">{{billing_info.tel}}</span>
            </li>
          </ul>
          <!-- 编辑状态-->
          <ul class="info-bottom" v-show="billing_edit_type">
            <li>
              <span class="li-name li-name2 edit">纳税人识别号</span>
              <span class="li-con li-con2"><input type="text" v-model="billing_info.taxpayer"></span>
            </li>
            <li>
              <span class="li-name li-name2 edit">银行账号</span>
              <span class="li-con li-con2"><input type="text" v-model="billing_info.bank"></span>
            </li>
            <li>
              <span class="li-name li-name2 edit">地址</span>
              <span class="li-con li-con2"><input type="text" v-model="billing_info.address"></span>
            </li>
            <li>
              <span class="li-name li-name2 edit">电话</span>
              <span class="li-con li-con2"><input type="text" v-model="billing_info.tel"></span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- 消息-->
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div class="info-top">
            <span class="span-left">消息</span>
          </div>
          <ul class="news-list">
            <li @click="open_cover" v-for="(news,index) in news_list" :key="index">
              <div class="new-left">
                <img :src="news.cover" alt="">
              </div>
              <div class="new-right">
                <p class="news-tit">{{news.tit}}</p>
                <p class="news-con">{{news.con}}</p>
                <p class="news-con">{{news.date}}</p>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- 新闻弹窗-->
    <el-dialog
      title="消息"
      :visible.sync="cover_show"
      width="50%">
      <div class="new-cover-con">
        <p class="con-tit">我是企业端标题名称</p>
        <p class="con-date">2018-9-23 12:35 </p>
        <div>富文本编译器内容</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import '~/static/company_manage/css/company.css'

  export default {
    layout: 'companyManage',
    name: "index",
    data() {
      return {
        // 消息弹窗
        cover_show: false,
        //基础信息
        basics_info: {
          name: '华为科技有限公司',
          logo: '/company_manage/images/company/logo.jpg',
          address: '北京市海淀区中关村西区善缘街1号立方庭大厦1-707室',
          linkman: '张总',
          tel: '18812345678',
        },
        //开票信息
        billing_info: {
          address: '北京市海淀区中关村西区善缘街1号立方庭大厦1-707室',
          bank: '680370078475463847236368236r',
          taxpayer: '178362475378475463847236368236r',
          tel: '101-3897558948',
        },
        // 基础信息编辑状态
        basics_edit_type: false,
        // 开票信息编辑状态
        billing_edit_type: false,
        // 消息列表
        news_list: [
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 2,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
          {
            id: 1,
            cover: '/company_manage/images/company/logo.jpg',
            tit: '我是一个企业端的标题名称',
            con: '我是消息摘要我是消息摘要我是消878c90是消息878c90878c908780是消...',
            date: '2018-9-23 12:35'
          },
        ]
      }
    },
    methods: {
      open_cover() {
        this.cover_show = true;
      },
      close_cover() {
        this.cover_show = false;
      },
      // 基础信息编辑
      basics_edit(bool) {
        this.basics_edit_type = !bool;
        if (bool) {
          this.$message({
            message: '信息保存成功!',
            type: 'success'
          });
        }
      },
      // 开票信息编辑
      billing_edit(bool) {
        this.billing_edit_type = !bool;
        if (bool) {
          this.$message({
            message: '信息保存成功!',
            type: 'success'
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
