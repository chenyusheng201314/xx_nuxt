<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          历史推送
       </div>
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="消息标题" label-width="80px">
            <el-input v-model="searchFilter.title" clearable auto-complete="off"></el-input>
          </el-form-item>
    
          <el-form-item label="推送时间" label-width="80px">
            <el-date-picker
      v-model="searchFilter.start_time"
      type="date"
      value-format = "yyyy-MM-dd 00:00:00"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.end_time"
      type="date"
      value-format = "yyyy-MM-dd 23:59:59"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


         <el-form-item label="推送对象" label-width="80px">
              <el-select v-model="searchFilter.user_group_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in user"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
         


      <el-form-item class="fRight">
          <el-button   @click="setData(1)" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="5%">序号</th>
          <th width="8%">消息标题</th>  
          <th width="8%">消息摘要</th>  
          <th width="8%">通知对象</th>  
          <th width="8%">推送规则</th>  
          <th width="8%">推送时间</th>  
          <th width="15%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{vo.title.length>8?vo.title.substr(0,8)+"...":vo.title}}</td>
          <td>{{vo.summary.substr(0,10)}}<span v-if="vo.summary.length>10">...</span> </td>
           <td>{{userDic[vo.user_group_id]}}</td>
           <td>{{typeDic[vo.type]}}</td>
          <td>{{vo.type==2?'--':vo.created_at}}</td>
          <td >
             <span class="btn_see" v-on:click="see(vo.id)">查看</span>
             <span class="btn_setting" v-on:click="edit(vo.id)" v-if="vo.type==2">修改</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="pageInfo.pageSizes"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    </div>
   </div>


<el-dialog  title="查看消息"  :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :close-on-click-modal="false">
 
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
         {{typeDic[addInfo.type]}}
      </el-form-item>
      <el-form-item label="推送对象" label-width="100px" prop="user_group_id">
         {{userDic[addInfo.user_group_id]}}
      </el-form-item>
      <el-form-item label="选择用户" label-width="100px" v-if="addInfo.user_group_id==3&&addInfo.type==1" >
           <div class="select_user" v-on:click="dialog()">+选择用户</div>  
           <div style="display: inline-block;" v-if="addInfo.user_ids == 'all'"> 选择推送所有用户</div><div  style="display: inline-block;" v-else> 共选择推送用户{{userNum}} 个</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
</el-dialog>




<el-dialog  title="查看消息"  :visible.sync="dialogTableVisible" width="80%" :close-on-click-modal="false" class="base_body">
 
    <el-form :model="addInfo" :rules="rules" ref="addInfo" class="send_msg_content">
      <el-form-item label="消息标题" label-width="100px"  prop="title">
        {{addInfo.title}}
      </el-form-item>
      <el-form-item label="消息图片" label-width="100px"  prop="image">
            <img v-if="addInfo.image.value" :src="addInfo.image.value" class="avatar" >     
      </el-form-item>
      <el-form-item label="消息摘要" label-width="100px"  prop="summary">
        {{addInfo.summary}}
      </el-form-item>
      <el-form-item label="消息内容" label-width="100px"  prop="content" >
          <div class="ql-editor" v-html="addInfo.content"></div>
      </el-form-item> 
      <el-form-item label="推送规则" label-width="100px"   prop="type">
         {{typeDic[addInfo.type]}}
      </el-form-item>
      <el-form-item label="推送对象" label-width="100px" prop="user_group_id">
         {{userDic[addInfo.user_group_id]}}
      </el-form-item>
 
    </el-form>
    <div class="base_title">
       <div class="title">
          用户列表
       </div>  
     </div>


  <div class="table-responsive">

 
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">用户</th>
          <th width="8%">账号</th>
          <th width="8%">性别</th>
          <th width="8%">生日</th>
          <th width="8%">注册时间</th>
          <th width="8%">积分</th>
          <th width="8%">状态</th>      
        </tr>

        <tr v-for="(vo, index) in userList" :key="index" v-if="vo.person" >
          <td>{{index+1}}</td>
          <td>{{vo.person.username}}</td>
          <td>{{vo.person.mobile}}</td>
          <td>{{$store.state.admin.sex[vo.person.sex]}}</td>
          <td>{{vo.person.birthday}}</td>
          <td>{{vo.person.register_time}}</td>
          <td>{{vo.person.point}}</td>
          <td>{{vo.person.status==1?"正常":"冻结"}}</td> 

        </tr>

 
        
        </tbody>
      </table>
 
    </div>

<div class="page">
    <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      :current-page="pageInfoUser.currentPage"
      :page-sizes="pageInfoUser.pageSizes"
      :page-size="pageInfoUser.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfoUser.total">
    </el-pagination>
    </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    </div>
</el-dialog>
 <el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible"  width="80%" :close-on-click-modal="false">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>
 
</div>
</template>
 

<script>
import cropper from '~/components/admin/cropper';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      cropper
    },
  data () {
    return {
      user:[{id:1,title:"机构"},{id:2,title:"企业"},{id:3,title:"个人"}],
      userDic:[],
      type:[{id:1,title:"立即推送"},{id:2,title:"注册推送"}],
      typeDic:[],
      order_type:[{id:1,title:"普通钱包"},{id:2,title:"iOS"},{id:3,title:"积分"}],
      order_typeDic:[],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      userNum:0,
      rules: {  
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          image:[{ required: true, message: '请上传图片', trigger: 'blur' }],
          summary:[{ required: true, message: '请输入内容摘要', trigger: 'blur' }],
          content:[{ required: true, message: '请输入消息内容', trigger: 'blur' }],
          type:[{ required: true, message: '请选择推送规则', trigger: 'blur' }],
          user_group_id:[{ required: true, message: '请选择推送对象', trigger: 'blur' }],
       },
      addInfo:{type:1,user_group_id:3,image:{}},
      editorOption:{},
      pageInfoUser:{
          total:10,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:1,
      },
      userList:[{person:{}}],
      msgId:'',
      imageUrl:"",
      cutPicInfo:{},
      dialogCropperVisible: false,


    }
  },
  async asyncData({store}){
      let params = {url: "/manage/message/list",data:{page:1,psize:20}}
      let res  = await store.dispatch("adminHttpGet",params);
      return {
        updateInfo: res.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:20,
          currentPage:parseInt(res.data.page),
        },
      }
  },
  created(){
    this.userDic = this.jsonToArr(this.user)
    this.typeDic = this.jsonToArr(this.type)
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
        this.$set(this.addInfo.image,'name',rest.data.filename)
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
    async see(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'message','info')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.msgId= id
        let params = {url: "/manage/message/info",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);   
        this.addInfo = res.data
        let paramsList = {url: "/manage/message/message_content_list",data:{message_id:id,page:1,psize:10}}
        let resList  = await this.$store.dispatch("adminHttpGet",paramsList);
        this.userList = resList.data.data
        this.pageInfoUser = {
          total:resList.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(resList.data.page),
        },
        this.dialogTableVisible = true;
     },
    async edit(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'message','edit')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        let params = {url: "/manage/message/info",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.addInfo = res.data
        this.imageUrl = this.addInfo.image.value
        this.$set(this.addInfo,'user_ids','all')    
        this.dialogFormVisible = true;
     },

    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.setData()
    },
    handleSizeChange1(val) {
      this.pageInfoUser.pageSize = val;
      this.setData2();
    },
    handleCurrentChange1(val) {
      this.pageInfoUser.currentPage = val;
      this.setData2()
    },
 
    jsonToArr(obj) {
      let newArr = []
      for(var item in obj) {
         newArr[obj[item].id] = obj[item].title
      }
      return newArr;
    },
    handleAvatarSuccess(res, file,fileList) {
 
      this.$set(this.addInfo,'image',file.response.data.file_url)    
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
          this.save()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推送'
          });          
        });
      },
  
    async save() {
      var saveInfo = JSON.parse(JSON.stringify(this.addInfo));
      saveInfo.image = this.addInfo.image.name
      console.log(saveInfo)
      let params = {url: "/manage/message/edit",data:saveInfo} 
      let res  = await this.$store.dispatch("adminHttpPost",params)
      if(res.code ==0) {
        this.$message({type: 'success',message: '保存成功!'});
        this.dialogFormVisible = false
      }
      else {
        this.$message({type: 'error',message: '保存失败!'});
      }
      this.setData()
    },
    async setData(val=0) {
      this.searchFilter.page = val!=0?val:this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      console.log(this.searchFilter)
      let params = {url: "/manage/message/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.currentPage = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
       
    },

    async setData2() {
      var pt = {}
      pt.page = this.pageInfoUser.currentPage
      pt.psize = this.pageInfoUser.pageSize;
      pt.message_id = this.msgId
      console.log(pt)
      let params = {url: "/manage/message/message_content_list",data:pt}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfoUser.currentPage = parseInt(res.data.page);
      this.pageInfoUser.total = res.data.total;
      this.userList = res.data.data
       
    },
 
  },
 
  mounted () {
 

  },
  watch: {
 
  
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

