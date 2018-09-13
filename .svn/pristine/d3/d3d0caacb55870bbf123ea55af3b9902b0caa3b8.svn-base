<template>
<div class="send_msg">
  <div class="app_update_title">
       <div class="title">
          创建消息
       </div>  
  </div>
  <div> {{addInfo}}</div>
   <el-form :model="addInfo" :rules="rules" ref="addInfo" class="send_msg_content">
      <el-form-item label="消息标题" label-width="100px"  prop="title">
        <el-input v-model="addInfo.title" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="消息图片" label-width="100px"  prop="image">
         <el-upload
            class="avatar-uploader"
            :action="$store.state.admin.fileAddUrl"
            :headers="{token:$store.state.admin.token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>
      <el-form-item label="消息摘要" label-width="100px"  prop="summary">
        <el-input v-model="addInfo.summary" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="消息内容" label-width="100px"  prop="content" >
          <quill-editor 
          v-model="addInfo.content" 
          ref="myQuillEditor" 
          :options="editorOption" 
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
          </quill-editor>
      </el-form-item> 
      <el-form-item label="推送规则" label-width="100px"   prop="type">

        <el-radio-group v-model="addInfo.type">
          <el-radio :label="1">立即推送</el-radio>
          <el-radio :label="2">注册推送</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="推送对象" label-width="100px" prop="user_group_id" v-if="addInfo.type==1">

        <el-radio-group v-model="addInfo.user_group_id">
          <el-radio :label="3">个人</el-radio>
          <el-radio :label="2" v-if="addInfo.type==1">企业</el-radio>
          <el-radio :label="1" v-if="addInfo.type==1">机构</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="选择用户" label-width="100px" v-if="addInfo.user_group_id==3 && addInfo.type==1" >
           <div class="select_user" v-on:click="dialog()">+选择用户</div>  
           <div style="display: inline-block;" v-if="addInfo.user_ids == 'all'"> 选择推送所有用户</div><div  style="display: inline-block;" v-else> 共选择推送用户{{userNum}} 个</div>


      </el-form-item>
    </el-form>
    <div class="clr"></div>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="cancel()">取 消</el-button>
      <el-button type="primary" v-on:click="submit()">确 定</el-button>
    </div>


      <el-dialog title="选择用户" :visible.sync="dialogTableVisible">
          <selectUser 
          :addInfo="addInfo" 
          v-on:editSuccess="editSuccess"/>
      </el-dialog>

 


 </div> 
 
</template>
<style>
  .el-dialog {width: 80%}
</style>
<script>
 
 
import selectUser from '~/components/admin/sendMsg/selectUser';
export default {
  name: "caseEdit",
   components: {
      selectUser
    },
  data() {
    return {
       rules: {  
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          image:[{ required: true, message: '请上传图片', trigger: 'blur' }],
          summary:[{ required: true, message: '请输入内容摘要', trigger: 'blur' }],
          content:[{ required: true, message: '请输入消息内容', trigger: 'blur' }],
          type:[{ required: true, message: '请选择推送规则', trigger: 'blur' }],
          user_group_id:[{ required: true, message: '请选择推送对象', trigger: 'blur' }],
       },
      dialogTableVisible:false,
      addInfo:{type:1,user_group_id:3},
      editorOption:{},
      userNum:0,
      imageUrl:""
      
    }
  },
  computed: {
     
    },
  methods: {
    onEditorBlur() { //失去焦点事件
    },
    onEditorFocus() { //获得焦点事件
    },
    onEditorChange() { //内容改变事件
    },
    submit() {
      this.$refs['addInfo'].validate((valid) => {
        if (valid) {
          this.alertOpen()
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    alertOpen() {
        this.$confirm('确认推送后将无法修改，确认执行该推送规则？', '确认推送', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.save()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推送'
          });          
        });
      },
  
    async save() {
      let params = {url: "/manage/message/add",data:this.addInfo} 
      let res  = await this.$store.dispatch("adminHttpPost",params)
      console.log(res)
    },
    dialog:function() {
      this.dialogTableVisible=true;
    },
    editSuccess:function(res) {
      this.dialogTableVisible = res.visible; 
      this.userNum = res.ids.length
      this.$set(this.addInfo,'user_ids',res.ids.join(","))
    },
   cancel:function(){
        this.$refs['addInfo'].resetFields();
        var res={}
        res.btnAaction = "cancel";
        res.visible = false;
        this.$emit('editSuccess',res) 
     },
    handleAvatarSuccess(res, file,fileList) {
 
      this.$set(this.addInfo,'image',file.response.data.filename)
      this.imageUrl = file.response.data.file_url 
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

  },
  watch: {
     addInfo:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                console.log(val,oldVal)
                  if(this.addInfo.type == 2) {
                      this.$set(this.addInfo,'user_ids','all')
                  }
              
            },
            deep:true
      }
 
 
  
  },
   
}
</script>

 