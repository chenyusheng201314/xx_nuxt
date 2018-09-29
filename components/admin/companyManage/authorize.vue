<template>
<div class="app_update">
 <div class="base_tab">
    <div :class="isCourse?'tab hover':'tab'" v-on:click="setIsCoures(true)">课程</div>
    <div :class="isCourse?'tab':'tab hover'" v-on:click="setIsCoures(false)">训练营</div>
  </div>
   <div class="app_update_setting" :style="isCourse?'display:block':'display:none'">
<div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="课程分类" label-width="80px">
              <el-select v-model="searchFilter.first_sort_id" clearable placeholder="请选择" @change="setScond">
                  <el-option
                    v-for="item in first_sort"
                    :key="item.id"
                    :label="item.sort_name"
                    :value="item.id">
                  </el-option>
               </el-select>
               <el-select v-model="searchFilter.second_sort_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in second_sort"
                    :key="item.id"
                    :label="item.sort_name"
                    :value="item.id">
                  </el-option>
               </el-select>
          </el-form-item>
         <el-form-item label="课程名称" label-width="80px">
            <el-input v-model="searchFilter.course_name" clearable auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="主讲导师" label-width="80px">
             <el-select v-model="searchFilter.teacher_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in tchs"
                    :key="item.id"
                    :label="item.realname"
                    :value="item.id">
                  </el-option>
               </el-select>
          </el-form-item>
           <el-form-item label="上架状态" label-width="80px">
              <el-select v-model="searchFilter.status" clearable placeholder="请选择">
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="参与活动" label-width="80px">
              <el-select v-model="searchFilter.activity_type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in activity"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>


          <el-form-item label="所属机构" label-width="80px">
              <el-select v-model="searchFilter.organization_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in orgInfo"
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
          <th width="8%"><el-checkbox v-model="courseAllChecked" @change="setAll">序号</el-checkbox></th>
          <th width="8%">课程封面图</th>
          <th width="8%">课程名称</th>
          <th width="8%">主讲导师</th>
          <th width="8%">单价（学币）</th>
          <th width="8%">销量</th>
          <th width="8%">上架状态</th>    
        </tr>
        </tbody>
      </table>
      <el-checkbox-group v-model="ids.courseIds" >
      <table class="table">
        <tbody>  
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td width="8%"><el-checkbox :label="vo.id" :disabled="vo.status!=1?true:false">{{index+1}}</el-checkbox></td>
          <td width="8%"><img :src="vo.cover.value" style="width:80px" /></td>
          <td width="8%">{{vo.course_name}}</td>
          <td width="8%">{{vo.organization_teacher.realname}}</td>
          <td width="8%">{{vo.price}}</td>
          <td width="8%">{{vo.sales}}</td>
          <td width="8%"><div v-if="vo.status == 1" class="green">已上架</div><div class="red" v-else>已下架</div></td>
        </tr>    
        </tbody>
      </table>
      </el-checkbox-group>
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
   <div class="case_table" :style="isCourse?'display:none':'display:block'">
         <div class="row">
            <div :class="ids.trainingIds.indexOf(vo.id)>-1?'col-md-3 isSelectd':'col-md-3'" v-for="(vo, index) in trainingInfo" :key="index" v-on:click="setSelectd(vo.id,index)" v-if="vo.status==1">
              <div class="case_list">
                <img :src="vo.training_cover_app.value"/> 
              </div>
              <div class="case_title">{{vo.training_name}}</div>
            </div>
 
        </div>    
  </div>
  <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button v-on:click="cancel()">取 消</el-button>
      <el-button type="primary" v-on:click="save()">确 定</el-button>
  </div>


  <el-dialog title="授权确认" :visible.sync="dialogAuthorizeVisible" append-to-body width="30%">
        <el-form  :model="sq" :rules="rules" ref="sq" class="demo-form-inline">
          <el-form-item label="各授权" label-width="120px" prop="amount">
            <el-input v-model.number="sq.amount" auto-complete="off" clearable style="width:60%"></el-input> &nbsp;份
          </el-form-item>
          <el-form-item label="申请授权人" label-width="120px" prop="proposer">
            <el-input v-model="sq.proposer" auto-complete="off" clearable  style="width:60%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-on:click="cancel2()">取 消</el-button>
            <el-button type="primary" v-on:click="submit()">授权</el-button>
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
      courseAllChecked:false,
      trainingAllChecked:false,
      idsAll:"",
      updateInfo:{},
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      searchFilter:{mobile:""},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogAuthorizeVisible:false,
      formLabelWidth: '120px',
      pageInfo:{currentPage:1,pageSize:10},
      ids:{courseIds:[],trainingIds:[]},
      sq:{},
      isCourse:true,
      trainingInfo:[],
      rules:{
        amount:[
           { type: 'number', message: '必须为数字值',trigger: 'blur'},
           { required: true, message: '不能为空'},
        ],
        proposer:[
           { required: true, message: '不能为空',trigger: 'blur'},
        ],

      },
      


    }
  },
  created(){
 
  },
  
  methods: {
   setIsCoures(val) {
     this.isCourse = val
   },
    async getData(){
       this.searchFilter.page = this.pageInfo.currentPage;
        this.searchFilter.psize = this.pageInfo.pageSize;
        let params = {url: "/manage/manage_course/course_list",data:this.searchFilter} 
        let res  = await this.$store.dispatch("adminHttpGet",params);
        let paramsOrg = {url: "/manage/organization/list",data:{page:1,psize:10}}
        let resOrg  = await this.$store.dispatch("adminHttpGet",paramsOrg);

        let paramsFirst = {url: "/manage/manage_course/course_sort_list",data:{}}
        let resFirst = await this.$store.dispatch("adminHttpGet",paramsFirst);

        let paramsTch = {url: "/manage/organization_teacher/list",data:{}}
        let resTch = await this.$store.dispatch("adminHttpGet",paramsTch);
        this.tchs = resTch.data.data 
     
        this.updateInfo=res.data.data
        this.orgInfo = resOrg.data.data
        this.first_sort = resFirst.data
        this.pageInfo={
            total:res.data.total,
            pageSizes:[10, 20, 30, 400],
            pageSize:this.pageInfo.pageSize,
            currentPage:parseInt(res.data.page),
        }
        let paramst = {url: "/manage/training/training_list",data:{page:1,psize:1000}} 
        let rest  = await this.$store.dispatch("adminHttpGet",paramst);
       
        if(rest.code==0) {
          this.trainingInfo = rest.data.data
          console.log(rest)
        }
        else {
          this.trainingInfo = []
        }

        
        
        
    
    },
    async setData(x=0) {
      this.searchFilter.page = x==1?x:this.pageInfo.currentPage;
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/manage_course/course_list",data:this.searchFilter} 
      let res  = await this.$store.dispatch("adminHttpGet",params);
    
      this.updateInfo=res.data.data
      this.pageInfo={
            total:res.data.total,
            pageSizes:[10, 20, 30, 400],
            pageSize:this.pageInfo.pageSize,
            currentPage:parseInt(res.data.page),
      }

    },
    async setScond(){
      this.$set(this.searchFilter,'second_sort_id', null)
      if(this.searchFilter.first_sort_id=='') {
         this.second_sort=[]
         return false
      }
       let obj = {};
       obj = this.first_sort.find((item)=>{    
            return item.id === this.searchFilter.first_sort_id;//比如：选项2
       });
        this.second_sort=obj.second_sorts
 
    },
    handleSizeChange(val) {
      this.$set(this.pageInfo,'pageSize',val);
      this.setData()
    },
    handleCurrentChange(val) {
      this.$set(this.pageInfo,'currentPage',val);
      this.setData()
       
     
    },
    setSelectd(id,index) {
      if(this.ids.trainingIds.indexOf(id)>-1) {
        this.ids.trainingIds.splice(this.ids.trainingIds.indexOf(id),1);
      }
      else {
        this.ids.trainingIds.push(id)
      }
    },
    setAll() {
      if(this.courseAllChecked == true) {
          for(var i in this.updateInfo){
            var index = this.ids.courseIds.indexOf(this.updateInfo[i].id); 
            if (index == -1) { 
              this.ids.courseIds.push(this.updateInfo[i].id);
            } 
          }  　　
       }
       else {
         for(var i in this.updateInfo){
            var index = this.ids.courseIds.indexOf(this.updateInfo[i].id); 
            if (index > -1) { 
              this.ids.courseIds.splice(index,1);
            } 
          }
       }
    },
    save() {
      this.sq={}
      if(this.ids.courseIds.length==0 && this.ids.trainingIds.length==0) {
        this.$message.error("请选择课程或训练营")
        return false;
      }
      else{
       this.dialogAuthorizeVisible=true
      }
      
    },
    cancel:function(){
        this.ids={courseIds:[],trainingIds:[]}
        this.isCourse = true
        let res = {ids:{courseIds:[],trainingIds:[]}}
        res.visible = false
        this.$emit('selectSuccess',res)
    },
    submit(){
      this.$refs['sq'].validate((valid) => {
          if (valid) {
            this.dialogAuthorizeVisible = false
            let res = {ids:{courseIds:[],trainingIds:[]}}
            res.visible = false
            res.ids.courseIds = this.ids.courseIds
            res.ids.trainingIds = this.ids.trainingIds
            res.proposer = this.sq.proposer
            res.amount = this.sq.amount
            this.$emit('selectSuccess',res)
            this.ids={courseIds:[],trainingIds:[]}
            this.isCourse = true
          } else {
            console.log('error submit!!');
            return false;
          }
      });
      
    },
    cancel2:function(){
         this.dialogAuthorizeVisible = false
    },
  },
 
  mounted () {

    this.getData()
  },
  watch: {
    // courseAllChecked: function (val) {
    //   this.setAll()
    //   // if(val == false) {
    //   //   this.setAll()
    //   // }
    //   // else {
    //   //   this.setAll()
    //   // }
    // },
 
  
  },
 
}
</script>

