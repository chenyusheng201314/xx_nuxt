<template>
<div class="app_update">
  <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="用户昵称" label-width="80px">
            <el-input v-model="searchFilter.username" auto-complete="off" clearable></el-input>
          </el-form-item>
 
          <el-form-item label="账号" label-width="80px">
               <el-input v-model="searchFilter.mobile" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" label-width="80px">
               <el-input v-model="searchFilter.realname" auto-complete="off" clearable></el-input>
          </el-form-item>
           <el-form-item label="性别" label-width="80px">
              <el-select v-model="searchFilter.sex" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>

          <el-form-item label="生日" label-width="80px" clearable>
            <el-date-picker
      v-model="searchFilter.birthday_start_time"
      value-format="yyyy-MM-dd 00:00:00"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.birthday_end_time"
      value-format="yyyy-MM-dd 23:59:59"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>

          <el-form-item label="加入时间" label-width="80px" clearable>
            <el-date-picker
      v-model="searchFilter.join_start_time"
      value-format="yyyy-MM-dd 00:00:00"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.join_end_time"
      value-format="yyyy-MM-dd 23:59:59"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          
          <el-button   @click="getData(1)" class="btn_search">搜索</el-button>
 
      </el-form-item>

        </el-form>

       
     </div> 
     <div class="app_update_setting">
    <div class="table-responsive">
     
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">学员</th>
          <th width="8%">真实姓名</th>
          <th width="8%">部门</th>
          <th width="8%">账号</th>
          <th width="6%">性别</th>
          <th width="6%">生日</th>
          <th width="12%">加入时间</th>
 
        </tr>
         </tbody>
      </table>
 
      <table class="table">
        <tbody> 
        <tr v-for="(vo, index) in updateInfo" :key="index"  >
          <td width="8%">{{index+1}}</td>
          <td width="8%" align="left"><div v-if="vo.person"><div class="head_img" v-if="vo.person.photo.value"><img :src="vo.person.photo.value" /></div>{{vo.person.username}}</div></td>
          <td width="8%">{{vo.realname}}</td>
          <td width="8%">{{vo.department}}</td>
          <td width="8%">{{vo.person.mobile}}</td>
          <td width="6%"><span v-if="vo.person.sex!=''">{{$store.state.company.sex[vo.person.sex]}}</span><span v-else>--</span></td>
          <td width="6%">{{vo.person.birthday?vo.person.birthday:'--'}}</td>
          <td width="12%">{{vo.created_at}}</td>
    
        </tr>
        </tbody>
      </table>
 
    </div>

     <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfoC.currentPage"
      :page-sizes="pageInfoC.pageSizes"
      :page-size="pageInfoC.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfoC.total">
    </el-pagination>
    </div> 
    </div>
 
</div>
</template>
 

<script>

export default {
  layout: 'admin',
  name: 'admin_body',
  props:['company_id'],
  data () {
    return {
      allChecked:false,
      ids:[],
      idsAll:"",
      updateInfo:[],
      pageInfoC:{
            total:0,
            pageSizes:[10, 20, 30, 400],
            pageSize:20,
            currentPage:1,
      },
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      searchFilter:{mobile:""},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isBuy:0,
    }
  },
  created(){
    
  },
  
  methods: {
    async getData(val = 0){
      this.searchFilter.page = val!=0?val:this.pageInfoC.currentPage
      this.searchFilter.psize = this.pageInfoC.pageSize
      this.searchFilter.company_id = this.company_id
      console.log(this.searchFilter)
      let params = {url:"/manage/company_person/list",data:this.searchFilter} 
      let res  = await this.$store.dispatch("adminHttpGet",params)
      this.updateInfo=res.data.data
      this.pageInfoC.total = res.data.total
      this.pageInfoC.currentPage = parseInt(res.data.page)     
    },
    setIsBuy(val) {
      this.isBuy = val
      this.getData()
    },
    handleSizeChange(val) {
      this.$set(this.pageInfoC,'pageSize',val);
      this.getData()
    },
    handleCurrentChange(val) {
      this.$set(this.pageInfoC,'currentPage',val);
      this.getData() 
    },
    remove(val) { 
      var index = this.ids.indexOf(val); 
      if (index > -1) { 
       this.ids.splice(index, 1); 
      } 
    },
    setAll() {
      if(this.allChecked == true) {
          for(var i in this.updateInfo){
            var index = this.ids.indexOf(this.updateInfo[i].id); 
            if (index == -1) { 
              this.ids.push(this.updateInfo[i].id);
            } 
          }
        　　
       }
    },
    save() {
      let res = {}
      res.visible = false
      if(this.allChecked == true) {
        res.ids = ["all"]
      }
      else {
        res.ids = this.ids
      }
      
      this.$emit('editSuccess',res) 
    },
    cancel:function(){
        var res={}
        res.visible = false
        res.ids = []
        this.$emit('editSuccess',res) 
     },
 
  },
 
  mounted () {
    this.getData()
 
  },
 
 
}
</script>

