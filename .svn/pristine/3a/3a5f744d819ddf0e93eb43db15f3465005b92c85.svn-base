<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          意见反馈
       </div>
     
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="机构名称" label-width="80px">
            <el-input v-model="searchFilter.title" auto-complete="off" clearable></el-input>
          </el-form-item>
 
          <el-form-item label="机构账号" label-width="80px">
               <el-input v-model="searchFilter.mobile" auto-complete="off" clearable></el-input>
          </el-form-item>
           <el-form-item label="账号状态" label-width="80px">
              <el-select v-model="searchFilter.status" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>

          <el-form-item label="入驻日期" label-width="80px" clearable>
            <el-date-picker
      v-model="searchFilter.register_start_time"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.register_end_time"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">创建机构</el-button>
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
      </el-form-item>

        </el-form>

       
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">机构logo</th>
          <th width="8%">机构名称</th>
          <th width="8%">机构账号</th>
          <th width="8%">注入时间</th>
          <th width="8%">拥有导师数</th>
          <th width="8%">拥有课程数</th>
          <th width="8%">账号状态</th>
          <th width="10%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><div class="head_img"><img :src="vo.pic_logo.value" /></div></td>
          <td>{{vo.title}}</td>
          <td>{{vo.username}}</td>
          <td>{{vo.register_time}}</td>
          <td>{{vo.teacher_count}}</td>
          <td>{{vo.course_count}}</td>
          <td><div v-if="vo.status == 1">正常</div><div v-else>冻结</div></td>
          <td><span class="btn_setting" v-on:click="edit(index)">编辑</span><span class="btn_see" v-on:click="see(index)">查看</span></td>
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


<el-dialog :title="(saveAction=='edit'?'编辑':'创建')+'机构'" :visible.sync="dialogFormVisible">
 
  <el-form :model="addInfo" :rules="rules" ref="addInfo">
      <el-form-item label="机构账号" :label-width="formLabelWidth" prop="username">
        <el-input v-model="addInfo.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password" v-if="isRresetPW">
        <el-input v-model="addInfo.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth"  v-else>
          <div class="btn reset" v-on:click="resetPw()">重设密码</div>
      </el-form-item>
      <el-form-item label="绑定手机号" :label-width="formLabelWidth" prop="mobile" >
        <el-input v-model="addInfo.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号状态" :label-width="formLabelWidth"  prop="status">
        <el-select v-model="addInfo.status" placeholder="请选择">
           <el-option
          v-for="it in status"
          :key="it.id"
          :label="it.title"
          :value="it.id">
        </el-option>
        
        </el-select>
         
      </el-form-item>
   
   <div class="el-dialog__header"><span class="el-dialog__title">机构信息</span> </div>
     <el-form-item label="机构简称" :label-width="formLabelWidth" prop="title">
        <el-input v-model="addInfo.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="机构全称" :label-width="formLabelWidth" prop="full_title">
        <el-input v-model="addInfo.full_title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="机构logo" :label-width="formLabelWidth" prop="pic_logo">
          <el-upload
          class="avatar-uploader"
          :action="$store.state.admin.fileAddUrl"
          :headers="{token:$store.state.admin.token}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="addInfo.pic_logo.value" :src="addInfo.pic_logo.value" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
         
      </el-form-item>

      <el-form-item label="机构地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="addInfo.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="机构对接人" :label-width="formLabelWidth" prop="link_man">
        <el-input v-model="addInfo.link_man" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="对接人联系方式" :label-width="formLabelWidth" prop="link_tel">
        <el-input v-model="addInfo.link_tel" auto-complete="off"></el-input>
      </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('addInfo')">确 定</el-button>
  </div>
</el-dialog>


<el-dialog title="查看机构" :visible.sync="dialogTableVisible">
 
  <el-form :model="addInfo" >
      <el-form-item label="机构账号" :label-width="formLabelWidth">
        {{addInfo.username}}
      </el-form-item>
      <el-form-item label="绑定手机号" :label-width="formLabelWidth" >
        {{addInfo.mobile}}
      </el-form-item>
      <el-form-item label="账号状态" :label-width="formLabelWidth"  >
         <div v-if="addInfo.status==1">正常</div><div v-else>冻结</div>
      </el-form-item>
   
   <div class="el-dialog__header"><span class="el-dialog__title">机构信息</span> </div>
     <el-form-item label="机构名称" :label-width="formLabelWidth" >
          {{addInfo.title}}
      </el-form-item>
      <el-form-item label="机构全称" :label-width="formLabelWidth" >
        {{addInfo.full_title}}
      </el-form-item>
      <el-form-item label="机构logo" :label-width="formLabelWidth" >
         <img :src="addInfo.pic_logo.value"/>     
      </el-form-item>

      <el-form-item label="机构地址" :label-width="formLabelWidth" >
        {{addInfo.address}}
      </el-form-item>
      <el-form-item label="机构对接人" :label-width="formLabelWidth" >
        {{addInfo.link_man}}
      </el-form-item>
      <el-form-item label="对接人联系方式" :label-width="formLabelWidth" >
       {{addInfo.link_tel}}
      </el-form-item>
  
  </el-form>
 
</el-dialog>

 



</div>
</template>

<script>
export default {
  layout: 'admin',
  name: 'admin_body',
  data () {
    return {
      isRresetPW:false,
 
      addInfo:{pic_logo:{}},
 
      status:[{id:1,title:"正常"},{id:0,title:"冻结"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '200px',
      saveAction:"",
      choose:null,
      rules:{
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        title: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        full_title: [{ required: true, message: ' 请输入机构全称', trigger: 'blur' }],
        pic_logo: [{ required: true, message: '请上传机构logo', trigger: 'blur' }],
        address: [{ required: true, message: '请输入机构地址', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        link_man: [{ required: true, message: '请输入机构联系人', trigger: 'blur' }],
        link_tel: [{ required: true, message: '请输入机构联系方式', trigger: 'blur' }],
        status: [{ required: true, message: ' 请选择状态', trigger: 'blur' }],
       


      }
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/organization/list",data:{page:1,psize:10}}
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

  

  methods: {
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        console.log(this.addInfo);
        this.dialogTableVisible = true;
     },
    add:function(){
        this.isRresetPW = true
        this.addInfo = {pic_logo:{}}
        this.saveAction = "add"
        this.dialogFormVisible = true;
        this.$refs["addInfo"].resetFields();


     },
     edit:function(index) {
 
        
        this.isRresetPW = false
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = JSON.parse(JSON.stringify(this.updateInfo[index]));
        this.dialogFormVisible = true;
        this.$refs["addInfo"].resetFields();
     },
     resetPw(){
       this.isRresetPW = true
     },
     submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
     },
 
     async update() {
        var submitInfo = JSON.parse(JSON.stringify(this.addInfo))
        this.$set(submitInfo,'pic_logo',submitInfo.pic_logo.name)
        let params = {url: "/manage/organization/add",data:submitInfo}
        let res  = await this.$store.dispatch("adminHttpPost",params);

        if(res.code==0) {
          this.$message({message: '更新成功',type: 'success'});
          this.setData();
          this.dialogFormVisible = false
        }
        else {
          this.$message.error("更新失败")
        }
    
        
     },


 
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.setData()
    },
    sortByKey: function(array, key) { //(数组、排序的列)
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })
    }, 
    handleAvatarSuccess(res, file,fileList) {
      //this.addInfo.pic_logo = URL.createObjectURL(file.raw); 
      this.$set(this.addInfo.pic_logo,'value',file.response.data.file_url)
      this.$set(this.addInfo.pic_logo,'name',file.response.data.filename)
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
    async setData() {
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/organization/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      console.log(this.searchFilter);
      console.log(res);
      this.updateInfo = res.data.data
    }

 
  },
  computed:{
 
  },
  mounted () {
 
  },
   head () {
    return {
      title: "机构",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
    }
  }
}
</script>

