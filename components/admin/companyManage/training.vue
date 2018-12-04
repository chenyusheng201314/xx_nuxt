<template>
<div class="app_update">
  
  <div class="base_tab">
        <div :class="isBuy!=1?'tab hover':'tab'" v-on:click="setIsBuy(0)">企业训练营</div>
        <div :class="isBuy==1?'tab hover':'tab'" v-on:click="setIsBuy(1)">已购买训练营</div>
   </div>

  <div class="case_table">
         <div class="row">
            <div v-for="(vo, index) in updateInfo" :key="index" class="col-md-3">
     
              <div class="case_list" v-if="isBuy==1&&vo.training">
               
                <img :src="vo.training.training_cover_app.value" v-if="vo.training.training_cover_app"  v-on:click="seeTraining(vo.training.id)"/></div>
              <div class="case_list" v-else><img :src="vo.training_cover_app.value" v-if="vo.training_cover_app" v-on:click="seeTraining(vo.id)" /></div>

              <div class="case_title" v-if="isBuy==1&&vo.training">{{vo.training.training_name}}</div>
              <div class="case_title" v-else>{{vo.training_name}}</div>

              <div class="case_title" v-if="isBuy==1">{{vo.training?vo.training_left:0}}</div>
              <div v-else>{{vo.left_count}}</div>
            </div>
        </div>    
  </div>

  <el-dialog title="查看训练营" :close-on-click-modal="false" :visible.sync="dialogEditIndexVisible" append-to-body v-if='dialogEditIndexVisible' width="60%">
    <trainIndex
    :addInfo="addInfo" 
    :editInfo = "editInfo"
    :isOwn = "isOwn"
    :sections="sections"
    :stage_map="stage_map"
    :stage_count="stage_count"
    :stage_pic="stage_pic"
    :stagePicInfo="stagePicInfo"
    />
     <div slot="footer" class="dialog-footer" align="right">
      <el-button v-on:click="dialogEditIndexVisible=false">取 消</el-button>
    </div>
</el-dialog>
<div v-loading.fullscreen.lock="fullscreenLoading"></div> 
</div>
</template>
 

<script>
import trainIndex from '~/components/companyManage/training/trainIndex';
export default {
  layout: 'admin',
  name: 'admin_body',
  props:['company_id'],
  components: {
      trainIndex
    },
  data () {
    return {
      fullscreenLoading:false,
      allChecked:false,
      ids:[],
      idsAll:"",
      updateInfo:[],
      pageInfoC:{
            total:0,
            pageSizes:[10, 20, 30, 400],
            pageSize:10,
            currentPage:1,
      },
      status:[{id:1,title:"正常"},{id:2,title:"冻结"}],
      sex:[{id:1,title:"男"},{id:0,title:"女"}],
      searchFilter:{mobile:""},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isBuy:0,
      isOwn:1,
      addInfo:{},
      editInfo:{},
      stage_map:[],
      sections:[],
      stage_count:3,
      stage_pic:"",
      stagePicInfo:{stageValueArr:[],stageWhArr:[]},
      dialogEditIndexVisible:false,
      imgs:{},
    }
  },
  created(){
    
  },
  
  methods: {
    async getData(){
      this.searchFilter.page = this.pageInfoC.currentPage
      this.searchFilter.psize = this.pageInfoC.pageSize
      this.searchFilter.company_id = this.company_id
      let url = "/manage/company/company_training_list"
      if(this.isBuy == 1) {
        url = '/manage/company/company_training_buy_list'
      }
      let params = {url:url,data:this.searchFilter} 
      let res  = await this.$store.dispatch("adminHttpGet",params)
      this.updateInfo=res.data.data
      this.pageInfoC.total = res.data.total
      this.pageInfoC.currentPage = parseInt(res.data.page)     
    },
    setIsBuy(val) {
      this.updateInfo=[]
      this.isBuy = val
      this.isOwn = this.isBuy==1?0:1
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
    async seeTraining(id) {
        this.fullscreenLoading = true
        this.$set(this.stagePicInfo,'stageValueArr',[])
        
        this.saveAction = "edit"
        let params = {url: "/manage/training/training_edit_get",data:{training_id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);    
        this.addInfo = res.data
        this.imgs.training_cover_app = res.data.training_cover_app
        this.imgs.training_cover_pc = res.data.training_cover_pc
        this.sections = []
        for (var  index in res.data.stage_content) {
             var ids = []
             var course_ids = []
             var sec = []
             for(var i in res.data.stage_content[index].sections) {
                 ids.push({type:res.data.stage_content[index].sections[i].course_type,course_id:res.data.stage_content[index].sections[i].course_id})
                 course_ids.push(res.data.stage_content[index].sections[i].course_id)
                 sec[i]={}
                 sec[i].section_id = res.data.stage_content[index].sections[i].id
                 sec[i].course_id = res.data.stage_content[index].sections[i].course_id
                 sec[i].course_type = res.data.stage_content[index].sections[i].course_type
             }
             res.data.stage_content[index].sections = sec
             
             if(ids.length>0) {
              let paramst = {url: "/manage/training/training_add_course_info",data:{course_ids:course_ids.join(",")}}
              let rest  = await this.$store.dispatch("adminHttpGet",paramst);
              for (var j in rest.data) {
                if(rest.data[j]) {
                  rest.data[j].section_id = sec[j].section_id
                  rest.data[j].course_type = sec[j].course_type   
                }
                
              }
              this.$set(this.sections,index,rest.data)
              console.log(course_ids,rest.data)
             }
             else {
              this.$set(this.sections,index,[])

             }
             
             //this.sections[index] = rest.data
        }
        console.log(this.sections)
        this.editInfo = JSON.parse(JSON.stringify(this.addInfo))
 

       let paramsm = {url: "/manage/training/training_map_list",data:{role:1}}
       let resm  = await this.$store.dispatch("adminHttpGet",paramsm);
       this.stage_map =  resm.data
       let params_g = {url: "/manage/training/training_map_stage_list",data:{map_id:this.editInfo.map_num,role:1}}
       let res_g  = await this.$store.dispatch("adminHttpGet",params_g);
       console.log(resm,res_g)
       this.stage_count = res_g.data
       var _this = this;
       var tasks = res_g.data.filter(function(p){
            return p.stage_count === _this.editInfo.stage_count;
       });

       this.stage_pic = tasks[0].stage_pic
       //this.stagePicInfo = res_g.data[0]
       var stageValueArr = tasks[0].stage_value.split(";")
       
       for(var i in tasks[0].stage_value.split(";")){
         this.$set(this.stagePicInfo.stageValueArr,i,stageValueArr[i].split(","))
       }
       this.$set(this.stagePicInfo,'stageWhArr',tasks[0].stage_wh.split(","))

       this.dialogEditIndexVisible = true; 
       this.fullscreenLoading = false
    
 
       
        
     },
    
 
  },
 
  mounted () {
    this.getData()
 
  },
 
 
}
</script>

