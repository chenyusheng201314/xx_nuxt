<template>
<div class="app_index">
   <div class="app_index_show">
     <div class="app_index_show_iphone">
          <div style="position: relative;">
             <img :src="addInfo.image" style="width: 100%; margin-bottom: 10px;" />
             <p>好友通过你的邀请链接注册成功，Ta可获得{{addInfo.invitee_point}}积分</p>
             <p>每成功邀请1个好友注册，你可获得{{addInfo.inviter_point}}积分</p>
             <img src="/admin/images/yaoqing.png" style="width: 100%; position:absolute; left:0; top: 420px"/>
          </div>
     </div>
     <div class="app_index_show_btn">立即发布</div>
   </div>
   <div class="invite">
     <div class="base_title">
       <div class="title">
          邀请设置
       </div>
     </div>
     <div class="invite_setting">
          <el-upload
            class="avatar-uploader-invite"
            :action="$store.state.admin.fileAddUrl"
            :headers="{token:$store.state.admin.token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="addInfo.image" :src="addInfo.image" class="avatar" style="max-width: 100%" >
            <img v-else src="/admin/images/app_setBanner_01.png" style="max-width: 100%"   />
 
          </el-upload>
          <p>尺寸 1500*1000px</p>
          <ul>
            <li>邀请者可获得奖励 <el-input v-model="addInfo.inviter_point" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" placeholder="" ></el-input> 积分</li>
            <li>被邀请者可获得奖励 <el-input v-model="addInfo.invitee_point" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" placeholder="" ></el-input>积分</li>
          </ul>
             <el-button  @click="save()" class="btn_create" >保存</el-button>
     </div>

   </div>
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
      
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/person_invitation/info",data:{page:1,psize:100}}
      let res  = await store.dispatch("adminHttpGet",params);
      var addInfo ={}
      addInfo.image = res.data.config.value
      addInfo.inviter_point = res.data.person_point_rule_1.point
      addInfo.invitee_point = res.data.person_point_rule_2.point
      return {
         addInfo:addInfo
      }
  },
  
  methods: {
     handleAvatarSuccess(res, file,fileList) {
        var img = new Image();
        img.src = file.url;
        var a =1
        var _this = this
        img.onload = function(){
          if(img.width!=1500 && img.height!=1000) {
            _this.$message.error('上传图片尺寸必须为1500*1000px'); 
          }
          else{
            _this.$set(_this.addInfo,'image',file.response.data.file_url)
          }
        };  
      
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async save(){
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'person_invitation','setting')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        let params = {url: "/manage/person_invitation/setting",data:this.addInfo} 
        let res  = await this.$store.dispatch("adminHttpPost",params)
        if(res.code==0) {
           this.$message({message: '设置成功',type: 'success'});
 
        }
        else {
          this.$message.error("设置失败")
        }
      }

  },
  mounted () {
  
    
  }
}
</script>