<template>
<div class="base_body">
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
 
         <el-form-item label="课程名称" label-width="80px">
            <el-input v-model="searchFilter.course_name" clearable auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="主讲导师" label-width="80px">
             <el-input v-model="searchFilter.teacher" clearable auto-complete="off"></el-input>
          </el-form-item>
 
 
      <el-form-item class="fRight">
 
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
    
     <div class="base_tab">
      <div :class="thisClass==2?'tab hover':'tab'" v-on:click="setIsOwn(2)">企业课程</div>
      <div :class="thisClass==1?'tab hover':'tab'" v-on:click="setIsOwn(1)">已购课程</div>
     </div> 
     <div class="table-responsive">
    
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">
            <el-checkbox v-model="mAllCheckedOwn" @change="mSetAllOwn" v-if='thisClass==2'>{{''}}</el-checkbox>
            <el-checkbox v-model="mAllCheckedBuy" @change="mSetAllBuy" v-if='thisClass==1'>{{''}}</el-checkbox>
          序号</th>
          <th width="8%">课程封面图</th>
          <th width="15%">视频名称</th>
          <th width="8%">主讲导师</th>
          <th width="8%">剩余数量</th>
        </tr>
        </tbody>
      </table>
       <el-checkbox-group v-model="newClassIds">
      <table class="table">
         <tbody>
        <tr v-for="(vo, index) in classInfo" :key="index" >
          <td width="8%" v-if="thisClass==2"><el-checkbox  :label="vo.id+','+thisClass">{{index+1}}</el-checkbox></td>
          <td width="8%" v-if="thisClass==2"><div class="head_img" ><img :src="vo.cover.value" v-if="vo.cover" /></div></td>
          <td width="15%" v-if="thisClass==2">{{vo.course_name?vo.course_name:"--"}}</td>
          <td width="8%" v-if="thisClass==2">{{vo.teacher?vo.teacher.realname:"--"}}</td>
          <td width="8%" v-if="thisClass==2">不限</td>

          <td  width="8%" v-if="thisClass==1"><el-checkbox  :label="vo.course_id+','+thisClass">{{index+1}}</el-checkbox></td>
          <td width="8%" v-if="thisClass==1"><div class="head_img" v-if="vo.course" ><img :src="vo.course.cover.value" v-if="vo.course.cover" /></div></td>
          <td width="15%" v-if="thisClass==1">{{vo.course?vo.course.course_name:"--"}}</td>
          <td width="8%" v-if="thisClass==1">{{vo.course?vo.course.teacher.realname:"--"}}</td>
          <td width="8%" v-if="thisClass==1">{{vo.course_left}}</td>
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
     <div class="clr"></div>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button v-on:click="cancel()">取 消</el-button>
      <el-button type="primary" v-on:click="submit()">确 定</el-button>
    </div>
</div>
</template>
 

<script>

export default {
  layout: 'admin',
  name: 'admin_body',
  props: ['classIds','classInfo','classPage'],
  data () {
    return {
      tableHead:[
         {title:"订单编号",field:"oderId",width:"10%"},
         {title:"账号",field:"acc",width:"12%"},
         {title:"企业名称",field:"companyName",width:"12%"},
         {title:"下单时间",field:"addtime",width:"10%"},
         {title:"订单金额（元）",field:"price",width:"10%"},
         {title:"合同金额（元）",field:"cPrice",width:"10%"},
         {title:"订单状态",field:"status",width:"10%"},
      ],
      allChecked:false,
      sortTableHead:[],
      addInfo:{},
      newClassIds:[],
 
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      pageInfo:this.classPage,
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      first_sort:[],
      second_sort:[],
      tchs:[],
      activity:[{id:1,title:'精品课程'},{id:2,title:'最新课程'},{id:3,title:'买一赠一'},{id:4,title:'折扣活动'},{id:5,title:'限时免费'},{id:6,title:'积分购'}],
      orgInfo:[],
      resClass:[],
      thisClass:2,
      mAllCheckedOwn:false,
      mAllCheckedBuy:false,
    }
  },
  created(){
  
  },
  methods: {
    async mSetAllOwn() {
      let url = this.thisClass == 2?"/company/course/company_course_list":"/company/course/company_buy_course_list"
      var searchFilter = JSON.parse(JSON.stringify(this.searchFilter))
      searchFilter.page = 1;
      searchFilter.psize = this.pageInfo.total;
      let params = {url:url,data:this.searchFilter} 
      let res  = await this.$store.dispatch("companyHttpGet",params); 
      var classInfo = res.data.data 
      if(this.mAllCheckedOwn == true) {
        for ( var i = 0; i <classInfo.length; i++){
          console.log(classInfo[i].id+','+this.thisClass)
          if(this.newClassIds.indexOf(classInfo[i].id+','+this.thisClass) == -1) {
            this.newClassIds.push(classInfo[i].id+','+this.thisClass)
          }
        }
      }
      else {
        for ( var i = 0; i <classInfo.length; i++){
          var ind = this.newClassIds.indexOf(classInfo[i].id+','+this.thisClass)
          if(ind > -1) {
            this.newClassIds.splice(ind,1)
          }
        }
      }
    },
    async mSetAllBuy() {
      let url = this.thisClass == 2?"/company/course/company_course_list":"/company/course/company_buy_course_list"
      var searchFilter = JSON.parse(JSON.stringify(this.searchFilter))
      searchFilter.page = 1;
      searchFilter.psize = this.pageInfo.total;
      let params = {url:url,data:searchFilter} 
  console.log(params)
      let res  = await this.$store.dispatch("companyHttpGet",params); 
      console.log(res)
      var classInfo = res.data.data 
      if(this.mAllCheckedBuy == true) {
        for ( var i = 0; i <classInfo.length; i++){
          if(this.newClassIds.indexOf(classInfo[i].course_id+','+this.thisClass) == -1) {
            this.newClassIds.push(classInfo[i].course_id+','+this.thisClass)
          }
        }
      }
      else {
        for ( var i = 0; i <classInfo.length; i++){
          var ind = this.newClassIds.indexOf(classInfo[i].course_id+','+this.thisClass)
          if(ind > -1) {
            this.newClassIds.splice(ind,1)
          }
        }
      }
    },
    async setIsOwn(val){
      this.thisClass = val
      this.setData(1)
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
    async setData(x=0) {
      this.searchFilter.page = x!=0?x:this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      this.searchFilter.role=1
      let url = this.thisClass == 2?"/company/course/company_course_list":"/company/course/company_buy_course_list"
      let params = {url:url,data:this.searchFilter} 
      let res  = await this.$store.dispatch("companyHttpGet",params);
      console.log(res)
      this.classInfo=res.data.data
      this.pageInfo={
            total:res.data.total,
            pageSizes:[10, 20, 30, 400],
            pageSize:this.pageInfo.pageSize,
            currentPage:parseInt(res.data.page),
      }
    },
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.classInfo[index];
        console.log(this.addInfo);
        this.dialogTableVisible = true;
     },
    editPrice:function() {

     },
    submit(){
       var backInfo = {}
       backInfo.visible = false
       backInfo.classIds = this.newClassIds
       backInfo.action = "submit"
       this.$emit('selectSuccess',backInfo)
     },
     cancel:function(){
       var backInfo = {}
       backInfo.visible = false
       //backInfo.classIds = []
       backInfo.action = "cancel"
       this.$emit('selectSuccess',backInfo) 
     },
    formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange(val) {
      this.$set(this.pageInfo,'pageSize',val);
      this.setData()
    },
    handleCurrentChange(val) {
      this.$set(this.pageInfo,'currentPage',val);
      this.setData() 
    },
    sortByKey: function(array, key) { //(数组、排序的列)
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })
    }, 
 
  },
  computed:{
    sortUpdateInfo:function(){
       return this.sortByKey(this.updateInfo,'sort');
    }
  },
  mounted () {

  },
  watch: {
 
 
  
  },
 
}
</script>

