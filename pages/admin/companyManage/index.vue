<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          企业列表
       </div>
     
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="企业名称" label-width="80px">
            <el-input v-model="searchFilter.company_name" auto-complete="off" clearable></el-input>
          </el-form-item>
 
          <el-form-item label="企业账号" label-width="80px">
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
      value-format="yyyy-MM-dd 00:00:00"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.register_end_time"
      value-format="yyyy-MM-dd 23:59:59"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">创建机构</el-button>
          <el-button   @click="setData(1)" class="btn_search">搜索</el-button>
      </el-form-item>

        </el-form>

       
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">企业logo</th>
          <th width="8%">企业名称</th>
          <th width="8%">机构账号</th>
          <th width="8%">入驻日期</th>
          <th width="6%">课程数量</th>
          <th width="6%">训练营数量</th>
          <th width="6%">学员数量</th>
          <th width="6%">账号状态</th>
          <th width="10%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><div class="head_img"><img :src="vo.company_logo.value" /></div></td>
          <td>{{vo.company_name}}</td>
          <td>{{vo.username}}</td>
          <td>{{vo.created_at}}</td>
          <td v-on:click="getCourseInfo(vo.id)">{{vo.company_course_get}}</td>
          <td v-on:click="getTrainingInfo(vo.id)">{{vo.company_training_get}}</td>
          <td v-on:click="getPersonInfo(vo.id)">{{vo.company_person}}</td>
          <td><div v-if="vo.status == 1">正常</div><div v-else>冻结</div></td>
          <td><span class="btn_setting" v-on:click="edit(vo.id)">编辑</span><span class="btn_see" v-on:click="see(vo.id)">查看</span></td>
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
      <el-form-item label="账号（手机号）" :label-width="formLabelWidth" prop="mobile">
        <el-input type="number" v-model="addInfo.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="addInfo.password" auto-complete="off" :disabled="true"></el-input>
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
   
   <div class="el-dialog__header"><span class="el-dialog__title">企业信息</span> </div>
     <el-form-item label="企业名称" :label-width="formLabelWidth" prop="company_name">
        <el-input v-model="addInfo.company_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业logo" :label-width="formLabelWidth" prop="company_logo">
         <div v-on:click="cut_pic('company_logo',500,500)" >
              <img v-if="addInfo.company_logo.value" :src="addInfo.company_logo.value" class="avatar" style="width:200px;height:200px;">
              <div class="cut_pic_add" v-else><i>+</i></div>
         </div>
      </el-form-item>
      <el-form-item label="企业地址" :label-width="formLabelWidth" prop="company_address">
        <el-input v-model="addInfo.company_address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人" :label-width="formLabelWidth" prop="company_link_man">
        <el-input v-model="addInfo.company_link_man" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" prop="company_link_phone">
        <el-input v-model="addInfo.company_link_phone" auto-complete="off"></el-input>
      </el-form-item>
     <div class="el-dialog__header"><span class="el-dialog__title">开票信息</span> </div>
      <el-form-item label="纳税人识别号" :label-width="formLabelWidth">
        <el-input v-model="addInfo.n_taxpayer_identification_number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" :label-width="formLabelWidth" >
        <el-input v-model="addInfo.n_bank_account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" >
        <el-input v-model="addInfo.n_address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" >
        <el-input v-model="addInfo.n_phone" auto-complete="off"></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="submitForm('addInfo')">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" append-to-body width="80%">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>

<el-dialog title="查看企业" :visible.sync="dialogTableVisible">

 <el-form :model="addInfo" >
      <el-form-item label="账号（手机号）" :label-width="formLabelWidth" prop="mobile">
        {{addInfo.mobile}}
      </el-form-item>
     
      <el-form-item label="账号状态" :label-width="formLabelWidth"  prop="status">
        <span v-if="status==1">正常</span><span v-else>冻结</span>   
      </el-form-item>
   
   <div class="el-dialog__header"><span class="el-dialog__title">企业信息</span> </div>
     <el-form-item label="企业名称" :label-width="formLabelWidth" prop="company_name">
        {{addInfo.company_name}}
      </el-form-item>
      <el-form-item label="企业logo" :label-width="formLabelWidth" prop="company_logo">
         <img v-if="addInfo.company_logo.value" :src="addInfo.company_logo.value" class="avatar" style="width:200px;height:200px;">
      </el-form-item>
      <el-form-item label="企业地址" :label-width="formLabelWidth" prop="company_address">
        {{addInfo.company_address}}
      </el-form-item>
      <el-form-item label="联系人" :label-width="formLabelWidth" prop="company_link_man">

        {{addInfo.company_link_man}}
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" prop="company_link_phone">
        {{addInfo.company_link_phone}}
      </el-form-item>
     <div class="el-dialog__header"><span class="el-dialog__title">开票信息</span> </div>
      <el-form-item label="纳税人识别号" :label-width="formLabelWidth">
        {{addInfo.n_taxpayer_identification_number}}
      </el-form-item>
      <el-form-item label="银行账号" :label-width="formLabelWidth" >
        {{addInfo.n_bank_account}}
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" >
        {{addInfo.n_address}}
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" >
        {{addInfo.n_phone}}
      </el-form-item>
 
  </el-form>
</el-dialog>


<el-dialog title="已购买课程" :visible.sync="dialogCourseVisible" append-to-body width="80%">
  <courseInfo 
     :courseInfo = "courseInfo"
     />
</el-dialog> 

<el-dialog title="已购买训练营" :visible.sync="dialogtrainingVisible" append-to-body width="80%">

</el-dialog> 

<el-dialog title="企业学员" :visible.sync="dialogPersonVisible" append-to-body width="80%">

</el-dialog> 
 



</div>
</template>

<script>
import cropper from '~/components/admin/cropper';
import courseInfo  from '~/components/admin/companyManage/courseInfo';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      cropper,courseInfo
  },
  data () {
    return {
      isRresetPW:false,
 
      addInfo:{company_logo:{}},
 
      status:[{id:1,title:"正常"},{id:0,title:"冻结"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '200px',
      saveAction:"",
      choose:null,
      rules:{
        mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        company_name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        full_title: [{ required: true, message: ' 请输入机构全称', trigger: 'blur' }],
        company_logo: [{ required: true, message: '请上传公司logo', trigger: 'blur' }],
        company_address: [{ required: true, message: '请输入公司地址', trigger: 'blur' }],
 
        company_link_man: [{ required: true, message: '请输入公司联系人', trigger: 'blur' }],
        company_link_tel: [{ required: true, message: '请输入公司联系方式', trigger: 'blur' }],
        status: [{ required: true, message: ' 请选择状态', trigger: 'blur' }],
      },
      cutPicDic:"",
      cutPicInfo:{},
      dialogCropperVisible: false,
      dialogCourseVisible: false,
      dialogtrainingVisible: false,
      dialogPersonVisible: false,
      courseInfo:{}
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/company/list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);
      console.log(res.data.data)
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
    cut_pic(cutPicDic,picWidth,picHeight) {
        this.$set(this.cutPicInfo,"aspectRatio",picWidth/picHeight)
        this.$set(this.cutPicInfo,"cutPicDic",cutPicDic)
        this.$set(this.cutPicInfo,"curPic",this.addInfo[cutPicDic].value)
        this.dialogCropperVisible = true
    },
    async cutPicSuccess(res) {
      this.dialogCropperVisible = res.visible
      let params = {url: "/common/file/add",data:{file_base64:res.data}}
      let rest  = await this.$store.dispatch("adminHttpPost",params);
      if(rest.code==4002) {
        this.$set(this.addInfo[this.cutPicInfo.cutPicDic],"value",rest.data.file_url)
        this.$set(this.addInfo[this.cutPicInfo.cutPicDic],"name",rest.data.filename)
        //this.$message({message: '图片上传成功',type: 'success'});
      }
      else {
        this.$message.error('图片上传失败');
      }
    },
    see:async function(id) {
        this.isRresetPW = false
        this.saveAction = "edit"
        let params = {url: "/manage/company/show",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
 
        this.addInfo = res.data;
        this.addInfo.mobile = res.data.company_user.mobile
        this.addInfo.password = "******"
        this.addInfo.n_taxpayer_identification_number = res.data.company_invoice.taxpayer_identification_number
        this.addInfo.n_bank_account = res.data.company_invoice.bank_account
        this.addInfo.n_address = res.data.company_invoice.address
        this.addInfo.n_phone = res.data.company_invoice.phone
        this.dialogTableVisible = true;
 
     },
    add:function(){
        this.dialogFormVisible = true;
        this.isRresetPW = true
        this.addInfo = {company_logo:{},password:"xiangxue123"}
        this.saveAction = "add"
        
     },
     cancel() {
        this.dialogFormVisible = false
        this.$refs["addInfo"].resetFields();
     },
     edit:async function(id) {
        this.isRresetPW = false
        this.saveAction = "edit"
        let params = {url: "/manage/company/show",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
 
        this.addInfo = res.data;
        this.addInfo.mobile = res.data.company_user.mobile
        this.addInfo.password = "******"
        this.addInfo.n_taxpayer_identification_number = res.data.company_invoice.taxpayer_identification_number
        this.addInfo.n_bank_account = res.data.company_invoice.bank_account
        this.addInfo.n_address = res.data.company_invoice.address
        this.addInfo.n_phone = res.data.company_invoice.phone
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
        this.$set(submitInfo,'company_logo',submitInfo.company_logo.name)
        let params = {url: "/manage/company/add",data:submitInfo}
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
      this.currentPage = 1;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage=val
      this.setData();
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
      this.$set(this.addInfo.company_logo,'value',file.response.data.file_url)
      this.$set(this.addInfo.company_logo,'name',file.response.data.filename)
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
    async setData(val=0) {
      this.searchFilter.page = val==0?this.pageInfo.currentPage:val;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/company/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.currentPage = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
    },
    async getCourseInfo(id) {
       
      let params = {url: "/manage/company/company_course_list",data:{company_id:id,page:1,psize:10}}
      let res  = await this.$store.dispatch("adminHttpGet",params);

      var pageInfo = {
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        }
      this.$set(this.courseInfo,'pageInfo',pageInfo)
      this.$set(this.courseInfo,'ownCourse',res.data.data)
      this.dialogCourseVisible = true


    }

 
  },
  computed:{
 
  },
  mounted () {
 
  },
  head () {
    return {
      title: "企业列表",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
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

