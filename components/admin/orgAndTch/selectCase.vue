<template>
<div>
    {{ids}}
    <div class="case_table">
         <div class="row">
       
            <div :class="'col-md-3 '+vo.isSelectd" v-for="(vo, index) in caseInfo.data" :key="index" v-on:click="setSelectd(vo.id,index)">
              <div class="case_list">
                <img :src="vo.organization_small_logo.value"/> 
              </div>
              <div class="case_title">{{vo.title}}</div>
            </div>
 
        </div>    
  </div>

  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="caseInfo.pageInfo.currentPage"
      :page-sizes="caseInfo.pageInfo.pageSizes"
      :page-size="caseInfo.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="caseInfo.pageInfo.total">
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
  props:['caseInfo','ids'],
  data () {
    return {
      allChecked:false,
      idsAll:"",
      updateInfo:[],
      orgInfo:[],
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },

  
  methods: {
    async getData(){
        this.searchFilter.page = this.caseInfo.pageInfo.currentPage;
        this.searchFilter.psize = this.caseInfo.pageInfo.pageSize;
        let params = {url: "/manage/organization_cases/list",data:this.searchFilter} 
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.caseInfo.data=res.data.data
        for(var i in this.caseInfo.data) {
          var ints = this.ids.indexOf(this.caseInfo.data[i].id)
          if(ints > -1) {
              this.$set(this.caseInfo.data[i],'isSelectd','isSelectd')
          }
          else {
             this.$set(this.caseInfo.data[i],'isSelectd','')
          }      
        }
  
       

        this.caseInfo.pageInfo={
            total:res.data.total,
            pageSizes:[2,10, 20, 30, 400],
            pageSize:this.caseInfo.pageInfo.pageSize,
            currentPage:parseInt(res.data.page),
        }
    
    },
    setSelectd(id,index){
      
      if(this.ids.indexOf(id)>-1) {
        this.ids.splice(this.ids.indexOf(id),1);
        this.$set(this.caseInfo.data[index],'isSelectd','');
      }
      else {
        this.ids.push(id)
        this.$set(this.caseInfo.data[index],'isSelectd','isSelectd');  
      }
   
      
    },
    handleSizeChange(val) {
      this.$set(this.caseInfo.pageInfo,'pageSize',val);
      this.getData()
    },
    handleCurrentChange(val) {
      this.$set(this.caseInfo.pageInfo,'currentPage',val);
      this.getData() 
    },

    submit() {
      let res = {}
      res.visible = false
      res.ids = this.ids  
      this.$emit('selectSuccess',res) 
    },
    cancel:function(){
        var res={}
        res.visible = false
        res.action = "getTraining"
        res.ids = []
        this.$emit('selectSuccess',res) 
     },
 
  },
 
  mounted () {
    
  },

 
}
</script>

