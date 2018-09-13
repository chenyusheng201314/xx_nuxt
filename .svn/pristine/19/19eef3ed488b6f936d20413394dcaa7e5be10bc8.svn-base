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
          <el-form-item label="手机号码" label-width="80px" clearable>
            <el-input v-model="searchFilter.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号转态" label-width="80px">
              <el-select v-model="searchFilter.status" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="反馈类型" label-width="80px">
              <el-select v-model="searchFilter.type" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in feedBackType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>

          <el-form-item label="反馈时间" label-width="80px" clearable>
            <el-date-picker
      v-model="searchFilter.create_start_time"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.create_end_time"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
       
          <el-button type="primary" @click="setData()">确 定</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">用户</th>
          <th width="8%">手机号码</th>
          <th width="8%">状态</th>
          <th width="8%">反馈类型</th>
          <th width="20%">反馈内容</th>
          <th width="10%">反馈时间</th>
          <th width="10%">操作</th>
        </tr>
        <tr v-for="(item, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><div v-if="item.person != null"><div class="head_img"><img :src="item.person.photo.value" /></div>{{item.person.username}}</div></td>
          <td><div v-if="item.person != null">{{item.person.mobile}}</div></td>
          <td><span v-if="item.status==1">正常</span><span v-else>否</span></td>
          <td>{{item.type_name}}</td>
          <td>{{item.content}}</td>
          <td>{{item.created_at}}</td>
          <td><span class="btn_see" v-on:click="see(index)">查看</span></td>
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

<el-dialog :title="'用户'+addInfo.person.username+'意见反馈'" :visible.sync="dialogFormVisible">
  <el-form :model="addInfo">
    <el-form-item label="用户：" :label-width="formLabelWidth">
         {{addInfo.person.username}}
    </el-form-item>
    <el-form-item label="手机号码：" :label-width="formLabelWidth">
         {{addInfo.person.mobile}}
    </el-form-item>
    <el-form-item label="状态：" :label-width="formLabelWidth">
     <span v-if="addInfo.status==1">正常</span><span v-else>否</span>
    </el-form-item>
    <el-form-item label="反馈类型：" :label-width="formLabelWidth">
     {{addInfo.type_name}}
    </el-form-item>
    <el-form-item label="反馈内容：" :label-width="formLabelWidth">
      {{addInfo.content}}
    </el-form-item>
    <el-form-item label="反馈时间：" :label-width="formLabelWidth">
       {{addInfo.created_at}}
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </div>
</el-dialog>



</div>
</template>

<script>
export default {
  layout: 'admin',
  name: 'feedback',
  data () {
    return {
      addInfo:{id:"",person:{photo:''},version:"",isForce:'',features:"",time:"",downloadUrl:"",features:""},  
      status:[{id:1,name:"正常"},{id:0,name:"否"}],
      feedBackType:[{id:1,name:"服务问题"},{id:2,name:"软件出错"},{id:3,name:"课程问题"},{id:4,name:"其他"}],
      searchFilter:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      saveAction:"",
      choose:null,
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/app_feedback/list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);
      console.log(res)
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
     async see(index) {
         let params = {url: "/manage/app_feedback/list",data:{}}
         let res  = await this.$store.dispatch("adminHttpGet",params)
         console.log(res)
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        this.dialogFormVisible = true;
     },
     save:function() {
        console.log(this.addInfo)
        if(this.saveAction == "add") {
          if(this.updateInfo.length>=this.pageInfo.pageSize) {
            this.updateInfo.pop();
          }
           this.updateInfo.unshift(this.addInfo)
           this.pageInfo.total++
        }
        if(this.saveAction == "edit") {
          this.updateInfo[this.choose] = this.addInfo

        }
        this.dialogFormVisible = false
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
    setFilter() {

    },
    async setData() {
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      console.log(this.searchFilter)
      let params = {url: "/manage/app_feedback/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params)
      console.log(res.data.data)
      this.updateInfo = res.data.data
    }
  },
  computed:{
    sortKeywords:function(){
       return this.sortByKey(this.keywords,'sort');
    }
  },
  mounted () {
    console.log(this.pageInfo)
      
  }
}
</script>

