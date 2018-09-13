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
          <el-form-item label="订单编号" label-width="80px">
            <el-input v-model="searchFilter.order_number" clearable auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="searchFilter.mobile" clearable auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入驻日期" label-width="80px">
            <el-date-picker
      v-model="searchFilter.start_in_time"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.end_in_time"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


         <el-form-item label="课程类型" label-width="80px">
              <el-select v-model="searchFilter.type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in type"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="支付方式" label-width="80px">
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
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
    
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
          <td>{{vo.title}}</td>
          <td>{{vo.summary}}</td>
           <td>{{userDic[vo.user_group_id]}}</td>
           <td>{{typeDic[vo.type]}}</td>
          <td>{{vo.created_at}}</td>
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


<el-dialog  title="查看消息"  :visible.sync="dialogFormVisible">
 
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
            <img v-if="addInfo.image.value" :src="addInfo.image.value" class="avatar" >
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




<el-dialog  title="查看消息"  :visible.sync="dialogTableVisible" width="80%">
 
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
          {{addInfo.user_group_id}}
      </el-form-item> 
      <el-form-item label="推送规则" label-width="100px"   prop="type">
         {{typeDic[addInfo.type]}}
      </el-form-item>
      <el-form-item label="推送对象" label-width="100px" prop="user_group_id">
         {{userDic[addInfo.user_group_id]}}
      </el-form-item>
      <el-form-item label="选择用户" label-width="100px" v-if="addInfo.user_group_id==3&&addInfo.type==1" >
           <div class="select_user" v-on:click="dialog()">+选择用户</div>  
           <div style="display: inline-block;" v-if="addInfo.user_ids == 'all'"> 选择推送所有用户</div><div style="display: inline-block;" v-else> 共选择推送用户{{userNum}} 个</div>


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
 
       
        <tr v-for="(vo, index) in addInfo.message_content" :key="index">
          <td width="8%">{{index+1}}</td>
          <td width="8%"><div class="head_img"><img :src="vo.photo" /></div>{{vo.person.username}}</td>
          <td width="8%">{{vo.person.mobile}}</td>
          <td width="8%">{{$store.state.admin.sex[vo.sex]}}</td>
          <td width="8%">{{vo.register_time}}</td>
          <td width="8%">{{vo.register_time}}</td>
          <td width="8%">{{vo.point}}</td>
          <td width="8%">{{vo.status}}</td>
        </tr>
        
        </tbody>
      </table>
 
    </div>


  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    </div>
</el-dialog>
 
 
</div>
</template>
 

<script>

export default {
  layout: 'admin',
  name: 'admin_body',
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


    }
  },
  async asyncData({store}){
      let params = {url: "/manage/message/list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);
      return {
        updateInfo: res.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        },
      }
  },
  created(){
    this.userDic = this.jsonToArr(this.user)
    this.typeDic = this.jsonToArr(this.type)
  },
  methods: {
    onEditorBlur() { //失去焦点事件
    },
    onEditorFocus() { //获得焦点事件
    },
    onEditorChange() { //内容改变事件
    },
    async see(id) {
        let params = {url: "/manage/message/info",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);   
        this.addInfo = res.data
        this.dialogTableVisible = true;
     },
    async edit(id) {
        let params = {url: "/manage/message/info",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.addInfo = res.data
        this.$set(this.addInfo,'user_ids','all')    
        this.dialogFormVisible = true;
     },

    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.setData()
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
      }
      else {
        this.$message({type: 'error',message: '保存失败!'});
      }
      this.setData()
    },
    async setData() {
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/message/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.page = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
       
    },
 
  },
 
  mounted () {
 

  },
  watch: {
 
  
  },
   head () {
    return {
      title: "用户订单",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
  
    }
  }
}
</script>

