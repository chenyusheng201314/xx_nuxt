<template>
<div class="app_index">
   <div class="app_index_show">
     <div class="app_index_show_iphone"  >
         <AppPreview 
         :mod="mod" 
         :indexInfo = "indexInfo"
         :isShowAppPreview = "isShowAppPreview"
         :indexInfoBack = "indexInfoBack" v-if="isShowAppPreview"  />
         <div v-else>加载中...</div>
     </div>
     <div class="app_index_show_btn" v-on:click="publish()">立即发布</div>

   </div>
   <nuxt-child 
   :mod="mod"
   :indexInfo = "indexInfo"
   :indexInfoBack = "indexInfoBack"
   v-on:editSuccess="editSuccess"
   v-on:bannerSuccess="bannerSuccess"

    />
</div>
</template>

<script>
 
import AppPreview from '~/components/admin/AppPreview'
 
 
export default {
  layout: 'admin',
  components: {
    AppPreview
  },
  name: 'admin_body',
  data () {
    return {
      adds: '弹窗内容',
      isShowAppPreview:true
    }
  },
  async asyncData({store}){
      
      let paramsSearch = {url: "/manage/app_hot_search/list",data:{}}
      let searchInfo  = await store.dispatch("adminHttpGet",paramsSearch);

      let paramsBanner = {url: "/manage/app_banner/list",data:{}}
      let bannerInfo  = await store.dispatch("adminHttpGet",paramsBanner);
 

      let paramsNav = {url: "/manage/app_category_navigate/list",data:{}}
      let navInfo  = await store.dispatch("adminHttpGet",paramsNav);
 
      let params = {url: "/manage/app_module_topic/list",data:{}}
      let res  = await store.dispatch("adminHttpGet",params);

      let paramsTip = {url: "/manage/app_hot_search/message_info",data:{}}
      let resTip  = await store.dispatch("adminHttpGet",paramsTip);
      
      let indexInfo  = {}
      indexInfo.searchInfo = searchInfo.data
      indexInfo.bannerInfo = bannerInfo.data
      indexInfo.navInfo = navInfo.data
      indexInfo.searchTip = resTip.data
      console.log(res.data)
      indexInfo.mod = res.data.module_topic

      if(indexInfo.mod == undefined) {
        indexInfo.mod = []
      }
      return {
        mod: indexInfo.mod,
        indexInfo:indexInfo,
        indexInfoBack:indexInfo,
      }
  },
  methods: {
    editSuccess:function(res){ 
        this.indexInfo = res.indexInfo
    },
    bannerSuccess:function(res){ 
       this.isShowAppPreview = false
       let _this = this
       setTimeout(function(){ 
          _this.isShowAppPreview = true
        }, 1000);

       
    },
    async publish() {
      let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'app_home_config','publish')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
      } 
      let params = {url: "/manage/app_home_config/publish",data:{}}
      let res  = await this.$store.dispatch("adminHttpPost",params);
      if(res.code==0) {
         this.$message({
          message: '发布成功',
          type: 'success'
        });
      }
      else{
         this.$message.error('发布失败');
      }

    }
  },
  mounted () {
    //console.log(this.$store.state.adminMain.leftNav); 
  }
}
</script>

