<template>
<div class="send_msg">
  <div class="app_update_title">
       <div class="title">
          创建消息
       </div>  
  </div>
 
   <el-form :model="addInfo" :rules="rules" ref="addInfo" class="send_msg_content">
      <el-form-item label="消息标题" label-width="100px"  prop="title">
        <el-input v-model="addInfo.title" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="消息图片" label-width="100px"  prop="image">
          
          <div  >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:704px;height: 284px;" v-on:click="cut_pic('imageUrl',1408,568)">
              <div class="cut_pic_add" v-else v-on:click="cut_pic('imageUrl',1408,568)"><i>+</i></div>
         </div>
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


      <el-dialog title="选择用户" :visible.sync="dialogTableVisible" width="80%">
          <selectUser 
          :addInfo="addInfo" 
          v-on:editSuccess="editSuccess"/>
      </el-dialog>

    

<el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible"  width="80%" :close-on-click-modal="false">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>

 


 </div> 
 
</template>
 
<script>
 
 
import selectUser from '~/components/admin/sendMsg/selectUser';
import cropper from '~/components/admin/cropper';
export default {
  name: "caseEdit",
  props:['leftNav'],
   components: {
      selectUser,
      cropper
    },
  data() {
    return {
       rules: {  
          title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {validator:this.comssr.validatorLen15, trigger: 'blur'}
          ],
          image:[{ required: true, message: '请上传图片', trigger: 'blur' }],
          summary:[{ required: true, message: '请输入内容摘要', trigger: 'blur' },
          {validator:this.comssr.validatorLen100, trigger: 'blur'}],
          content:[{ required: true, message: '请输入消息内容', trigger: 'blur' }],
          type:[{ required: true, message: '请选择推送规则', trigger: 'blur' }],
          user_group_id:[{ required: true, message: '请选择推送对象', trigger: 'blur' }],
       },
      dialogTableVisible:false,
      addInfo:{type:1,user_group_id:3},
      editorOption:{},
      userNum:0,
      imageUrl:"",
      cutPicInfo:{},
      dialogCropperVisible: false,
      
    }
  },
  computed: {
     
    },
  methods: {
    cut_pic(cutPicDic,picWidth,picHeight) {
        this.$set(this.cutPicInfo,"aspectRatio",picWidth/picHeight)
        this.$set(this.cutPicInfo,"cutPicDic",cutPicDic)
        this.$set(this.cutPicInfo,"curPic",this.imageUrl)
        this.dialogCropperVisible = true
    },
    async cutPicSuccess(res) {
      this.dialogCropperVisible = res.visible
      let params = {url: "/common/file/add",data:{file_base64:res.data}}
      let rest  = await this.$store.dispatch("adminHttpPost",params);
      if(rest.code==4002) {
        this.$set(this.addInfo,'image',rest.data.filename)
        this.imageUrl = rest.data.file_url 
        //this.$message({message: '图片上传成功',type: 'success'});
      }
      else {
        this.$message.error('图片上传失败');
      }
    },
    onEditorBlur() { //失去焦点事件
    },
    onEditorFocus() { //获得焦点事件
    },
    async onEditorChange() { //内容改变事件
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = this.addInfo.content.match(imgReg);
      arr = arr==null?[]:arr  
      for (var i = 0; i < arr.length; i++) {
       var src = arr[i].match(srcReg);
       //获取图片地址
       if(src[1]){
        if(src[1].indexOf('data:image')>-1) {
          let imgUrl = '/admin/images/img_loading.gif?'+i
          this.addInfo.content = this.addInfo.content.replace(src[1], imgUrl);
          let params = {url: "/common/file/add",data:{file_base64:src[1]}}
          let res  = await this.$store.dispatch("adminHttpPost",params);
          this.addInfo.content = this.addInfo.content.replace(imgUrl, res.data.file_url);
        }
       }
      }
    },
    submit() {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'message','add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
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
      if(res.code==0) {
        this.$message({type: 'success',message: '保存成功!'});
        this.leftNav[0].active = false
        this.leftNav[1].active = true
        this.$router.push({'path': '/admin/sendMsg/list'});
      }
      else {
        this.$message({type: 'error',message: res.mssage});
      }
      console.log(res)
    },
    dialog:function() {
      this.dialogTableVisible=true;
    },
    editSuccess:function(res) {
      this.dialogTableVisible = res.visible; 
      this.userNum = res.ids.length
      this.$set(this.addInfo,'user_ids',res.ids.join(","))
      console.log(this.addInfo.user_ids)
    },
   cancel:function(){
        this.$refs['addInfo'].resetFields();
        var res={}
        res.btnAaction = "cancel";
        res.visible = false;
        this.$emit('editSuccess',res) 
     },
    handleAvatarSuccess(res, file,fileList) {
      console.log(file);
      var img = new Image();
      img.src = file.url;
      var a =1
      var _this = this
      img.onload = function(){
        if(img.width!=1408 && img.height!=568) {
          _this.$message.error('上传图片尺寸必须为1408*568px');
        }
        else{
          _this.uploadImg(file)   
        }
      };  
    },
    uploadImg(file) {
       this.$set(this.addInfo,'image',file.response.data.filename)
       this.imageUrl = file.response.data.file_url 
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG，gif，png 格式!');
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
                  if(this.addInfo.user_group_id == 2 || this.addInfo.user_group_id == 1 ) {
                      this.$set(this.addInfo,'user_ids','all')
                  }
                  else {
                     
                  }

              
            },
            deep:true
      }
 
 
  
  },
  head () {
    return {
 
      link: [
          {
            href: '/admin/css/cropper.min.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ],
        script: [
          {src: '/admin/js/cropper.min.js'},
        ]
    }
  }
}
</script>

 