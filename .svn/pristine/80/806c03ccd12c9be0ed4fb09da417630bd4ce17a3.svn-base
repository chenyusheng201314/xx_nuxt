<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          搜索框配置
       </div>
       <div class="btn" data-toggle="modal" data-target="#myModal" v-on:click="add()">
          <img  src="/admin/images/app_index_add.png" /> 添加
       </div>
     </div>
  
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="10%">序号</th>
          <th width="10%">系统</th>
          <th width="10%">目标版本</th>
          <th width="10%">强制更新</th>
          <th width="10%">版本特性</th>
          <th width="10%">更新时间</th>
          <th width="10%">操作</th>
        </tr>
        <tr v-for="(item, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.device_name}}</td>
          <td>{{item.version}}</td>
          <td><span v-if="item.forced_upgrade=='1'">是</span><span v-else>否</span></td>
          <td>{{item.description}}</td>
          <td>{{item.upgrade_time}}</td>
          <td><span class="btn btn_set" v-on:click="edit(index)">编辑</span><span class="btn_del" v-on:click="see(index)">查看</span></td>
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

<el-dialog title="APP更新配置" :visible.sync="dialogFormVisible">
  <el-form :model="addInfo" :rules="rules" ref="addInfo">
    <el-form-item label="系统" :label-width="formLabelWidth" prop="device_type">
      <el-radio v-model="addInfo.device_type" :label="1">iOS</el-radio>
      <el-radio v-model="addInfo.device_type" :label="2">android</el-radio>
    </el-form-item>
    <el-form-item label="目前版本" :label-width="formLabelWidth" prop="version">
      <el-input v-model="addInfo.version" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="强制升级" :label-width="formLabelWidth" prop="forced_upgrade">
      <el-radio v-model="addInfo.forced_upgrade" :label="1">是</el-radio>
      <el-radio v-model="addInfo.forced_upgrade" :label="0">否</el-radio>
    </el-form-item>
    <el-form-item label="更新时间" :label-width="formLabelWidth"  prop="upgrade_time">
      <el-date-picker
      v-model="addInfo.upgrade_time"
      type="datetime"
      @change="setTime"
      placeholder="选择日期时间">
    </el-date-picker>
     
    </el-form-item>
    <el-form-item label="应用下载地址" :label-width="formLabelWidth" prop="url">
      <el-input v-model="addInfo.url" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="版本特性" :label-width="formLabelWidth"  prop="description">
      <el-input v-model="addInfo.description" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('addInfo')">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="APP更新配置" :visible.sync="dialogViewVisible">
  <el-form :model="addInfo">
    <el-form-item label="系统" :label-width="formLabelWidth">
      {{addInfo.device_name}}
    </el-form-item>
    <el-form-item label="目前版本" :label-width="formLabelWidth">
      {{addInfo.version}}
    </el-form-item>
    <el-form-item label="强制升级" :label-width="formLabelWidth">
      <span v-if="addInfo.forced_upgrade=='1'">是</span><span v-else>否</span>
     
    </el-form-item>
    <el-form-item label="更新时间" :label-width="formLabelWidth">
      {{addInfo.upgrade_time}}
    </el-form-item>
    <el-form-item label="应用下载地址" :label-width="formLabelWidth">
      {{addInfo.url}}
    </el-form-item>
    <el-form-item label="版本特性" :label-width="formLabelWidth">
      {{addInfo.description}}
    </el-form-item>
  </el-form>
 
</el-dialog>

</div>
</template>

<script>
import {formatDate} from '~/plugins/date.js';
export default {
  layout: 'admin',
 
  name: 'admin_body',
  data () {
    return {
      addInfo:{},
      dialogViewVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      saveAction:"",
      choose:null,
      map:{},
      rules:{
        device_type: [{ required: true, message: '请选择系统', trigger: 'blur' }],
        version: [{ required: true, message: '请输入目前版本', trigger: 'blur' }],
        forced_upgrade: [{ required: true, message: '请选择是否强制升级', trigger: 'blur' }],
        upgrade_time: [{ required: true, message: '请选择更新时间', trigger: 'blur' }],
        url: [{ required: true, message: '请输入应用下载地址', trigger: 'blur' }],
        description: [{ required: true, message: '请输入版本特性', trigger: 'blur' }],
      }
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/app_upgrade_config/list",data:{page:1,psize:10}}
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
      see:function(index){
        this.addInfo = JSON.parse(JSON.stringify(this.updateInfo[index]));
        this.dialogViewVisible = true;
      },
     add:function(){
        this.addInfo = {},
        this.saveAction = "add"
        this.dialogFormVisible = true
     },
     edit:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = JSON.parse(JSON.stringify(this.updateInfo[index]));
        this.dialogFormVisible = true;
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
      let params = {url: "/manage/app_upgrade_config/add",data:this.addInfo}
      let res  = await this.$store.dispatch("adminHttpPost",params);
      this.setData();
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage=val
      console.log(`当前页: ${val}`);
      this.setData()
    },
    setTime() {
       this.addInfo.upgrade_time = formatDate(this.addInfo.upgrade_time, 'yyyy-MM-dd hh:mm:ss');
    },
    async setData() {
      this.map.page = this.pageInfo.currentPage;
      this.map.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/app_upgrade_config/list",data:this.map}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.updateInfo = res.data.data;
      this.pageInfo.total = res.data.total; 
    }
 
 
  },
  computed:{
    sortKeywords:function(){
       return this.sortByKey(this.keywords,'sort');
    }
  },
  mounted () {
   
  }
}
</script>

