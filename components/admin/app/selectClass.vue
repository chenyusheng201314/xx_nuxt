<template>
<div class="app_update">
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
          <th width="5%">序号</th>
          <th width="5%">课程封面图</th>
          <th width="15%">课程名称</th>
          <th width="6%">主讲导师</th>
          <th width="6%">单价（学币）</th>
          <th width="6%">销量</th>
          <th width="6%">参与活动</th>
          <th width="6%">上架状态</th>

        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td><el-radio v-model="ids" :disabled="vo.status == 1?false:true" :label="index+','+vo.id">{{index+1}}</el-radio></td>
          <td><div class="head_img"><img :src="vo.cover.value" /></div></td>
          <td>{{vo.course_name}}</td>
          <td>{{vo.organization_teacher.realname}}</td>
          <td>{{vo.price}}</td>
          <td>{{vo.sales}}</td>
          <td>{{vo.is_activity}}</td>
          <td><div v-if="vo.status == 1">已上架</div><div v-else>已下架</div></td>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
 
</div>
</template>
 

<script>

export default {
  layout: 'admin',
  name: 'admin_body',
  data () {
    return {
      allChecked:false,
      ids:"",
      idsAll:"",
      updateInfo:[],
      first_sort:[],
      second_sort:[],
      tchs:[],
      activity:[{id:1,title:'精品课程'},{id:2,title:'最新课程'},{id:3,title:'买一赠一'},{id:4,title:'折扣活动'},{id:5,title:'限时免费'},{id:6,title:'积分购'}],
      orgInfo:[],
      pageInfo:{currentPage:1,pageSize:20},
      status:[{id:1,title:"已上架"},{id:0,title:"已下架"}],
      sex:[{id:1,title:"男"},{id:2,title:"女"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  created(){
      this.getData()
  },

  
  methods: {
    async getData(x=0){
  
        this.searchFilter.page = x==1?x:this.pageInfo.currentPage;
        this.searchFilter.page = this.pageInfo.currentPage;
        this.searchFilter.psize = this.pageInfo.pageSize;
        this.searchFilter.role=1
        console.log(this.searchFilter)
        let params = {url: "/manage/manage_course/course_list",data:this.searchFilter} 
        let res  = await this.$store.dispatch("adminHttpGet",params);
        let paramsOrg = {url: "/manage/organization/list",data:{page:1,psize:20,role:1}}
        let resOrg  = await this.$store.dispatch("adminHttpGet",paramsOrg);

        let paramsFirst = {url: "/manage/manage_course/course_sort_list",data:{role:1}}
        let resFirst = await this.$store.dispatch("adminHttpGet",paramsFirst);

        let paramsTch = {url: "/manage/organization_teacher/list",data:{page:1,psize:100,role:1}}
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
    },
    async setData(x=0) {
      this.searchFilter.page = x==1?x:this.pageInfo.currentPage;
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      this.searchFilter.role=1
      let params = {url: "/manage/manage_course/course_list",data:this.searchFilter} 
      let res  = await this.$store.dispatch("adminHttpGet",params);
      console.log(res)
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
      this.getData()
    },
    handleCurrentChange(val) {
      this.$set(this.pageInfo,'currentPage',val);
      this.getData() 
    },
    submit() {
      let res = {}
      res.visible = false
      res.action = "getClass"
      if(this.ids === "") {
        this.$message.error('请选择课程');
      }
      else {
        let idArr = this.ids.split(',')
        let thisIndex = idArr[0]
        res.info = this.updateInfo[thisIndex]  
        this.$emit('editSuccess',res) 
      }
 
    },
    cancel:function(){
        var res={}
        res.visible = false
        res.action = "getClass"
        res.info = {}
        
        this.$emit('editSuccess',res) 
     },
 
  },
 


 
}
</script>

