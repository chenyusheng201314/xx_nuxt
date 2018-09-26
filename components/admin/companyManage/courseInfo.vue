<template>
<div class="app_update">
   {{updateInfo}}
</div>
</template>
 

<script>

export default {
  layout: 'admin',
  name: 'admin_body',
  props:['courseInfo'],
  data () {
    return {
      allChecked:false,
      ids:[],
      idsAll:"",
      updateInfo:this.courseInfo,
      pageInfo:{currentPage:1,pageSize:10},
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      searchFilter:{mobile:""},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',


    }
  },
  created(){
   
  },
  
  methods: {
    async getData(){
         this.searchFilter.page = this.pageInfo.currentPage;
         this.searchFilter.psize = this.pageInfo.pageSize;
         let params = {url: "/manage/person/list",data:this.searchFilter} 
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.updateInfo=res.data.data
        this.pageInfo={
            total:res.data.total,
            pageSizes:[10, 20, 30, 400],
            pageSize:this.pageInfo.pageSize,
            currentPage:parseInt(res.data.page),
        }
        this.setAll()
    
    },
    handleSizeChange(val) {
      this.$set(this.pageInfo,'pageSize',val);
      this.getData()
    },
    handleCurrentChange(val) {
      this.$set(this.pageInfo,'currentPage',val);
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

 
  },
 
 
}
</script>

