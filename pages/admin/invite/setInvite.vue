<template>
<div class="app_index">
   <div class="app_index_show">
     <div class="app_index_show_iphone">
         
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
            <img v-if="addInfo.image" :src="addInfo.image" class="avatar">
            <img v-else src="/admin/images/app_setBanner_01.png"   />
 
          </el-upload>
          <p>尺寸 500x800</p>
          <ul>
            <li>邀请者可获得奖励 <el-input v-model="addInfo.inviter_point" placeholder="" ></el-input> 积分</li>
            <li>被邀请者可获得奖励 <el-input v-model="addInfo.invitee_point" placeholder="" ></el-input>积分</li>
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
      addInfo:{}
    }
  },
  
  methods: {
     handleAvatarSuccess(res, file,fileList) {
      this.$set(this.addInfo,'image',file.response.data.file_url)    
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async save(){
        let params = {url: "/manage/person_invitation/setting",data:this.addInfo} 
        let res  = await this.$store.dispatch("adminHttpPost",params)
        console.log(res)
      }

  },
  mounted () {
  
    
  }
}
</script>