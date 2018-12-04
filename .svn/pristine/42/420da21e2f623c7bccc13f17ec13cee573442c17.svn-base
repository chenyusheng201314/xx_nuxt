<template>
<div class="admin_body_right">
   <div class="base_body">
     <div class="base_title">
       <div class="title">训练营 
          <p>Training camp</p>
   
       </div> 
        <div class="btn" data-toggle="modal" data-target="#myModal" v-on:click="add">
          <strong>+</strong> 添加训练营
       </div>
     </div>
   <div class="base_tab">
      <div :class="isOwn?'tab hover':'tab'" v-on:click="setIsOwn(true)" v-if="isOwnShow">企业训练营</div>
      <div :class="isOwn?'tab':'tab hover'" v-on:click="setIsOwn(false)"  v-if="isBuyShow">已购买训练营</div>
   </div>  
    <div class="training_table" v-if="isOwn&isOwnShow">
         <div class="row">
            <div class="col-md-3 " v-for="(vo, index) in updateInfo" :key="index" >
              <div class="case_list">
                <img :src="vo.training_cover_app.value"  v-on:click="seeTraining(vo.id)"/> 
                <div class="op">
                  <img src="/admin/images/base_edit.png" v-on:click="edit(vo.id)">
 
                </div>
          
              </div>
              <div class="case_title">{{vo.training_name}}</div>
              <div class="case_title">剩余名额：{{vo.left_count}}</div>
            </div>
 
        </div>    
    </div>

     <div class="training_table"  v-if="!isOwn&isBuyShow">

         <div class="row">
            <div class="col-md-3 " v-for="(vo, index) in updateInfoBuy" :key="index">
     
              <div class="case_list">
                <img :src="vo.training.training_cover_app.value" v-if='vo.training.training_cover_app' v-on:click="seeTraining(vo.training_id)"/> 
              </div>
              <div class="case_title">{{vo.training.training_name}}</div>
              <div class="case_stitle">剩余名额：{{vo.training_left}}</div>
            </div>
 
        </div>    
    </div>
 
 


 
   </div>
 

<el-dialog title="创建训练营" :close-on-click-modal="false" :visible.sync="dialogAddVisible" v-if="dialogAddVisible" width="60%">
    <trainAdd 
    :addInfo="addInfo" 
    :classIds="classIds" 
    :newClassIds="newClassIds"
    v-on:setClassVisible = "setClassVisible"
    v-on:addSuccess="addSuccess"/>
</el-dialog>

<el-dialog title="编辑训练营" :close-on-click-modal="false" :visible.sync="dialogEditVisible" v-if="dialogEditVisible" width="60%">
    <trainEdit 
    :addInfo="addInfo" 
    :classIds="classIds"
    :newClassIds="newClassIds" 
    :imgs="imgs"
    :sections="sections"
    :editInfo="editInfo"
    :stage_map="stage_map"
    :stage_count="stage_count"
    :stage_pic="stage_pic"
    :stagePicInfo="stagePicInfo"
    v-on:setClassVisible = "setClassVisible"
    v-on:editSuccess="editSuccess"/>
</el-dialog>

<el-dialog title="查看训练营" :close-on-click-modal="false" :visible.sync="dialogEditIndexVisible" v-if='dialogEditIndexVisible' width="60%">
    <trainIndex
    :addInfo="addInfo" 
    :isOwn = "isOwn"
    :classIds="classIds" 
    :imgs="imgs"
    :sections="sections"
    :editInfo="editInfo"
    :stage_map="stage_map"
    :stage_count="stage_count"
    :stage_pic="stage_pic"
    :stagePicInfo="stagePicInfo"
    v-on:setClassVisible = "setClassVisible"
    v-on:editSuccess="editSuccess"/>
     <div slot="footer" class="dialog-footer" align="right">
      <el-button v-on:click="dialogEditIndexVisible=false">取 消</el-button>
    </div>
</el-dialog>

<el-dialog title="选择课程" :visible.sync="dialogClassVisible" v-if="dialogClassVisible">
    <selectClass 
    :classIds = "classIds"
    :classInfo = "classInfo"
    :classPage = "classPage"
    v-on:selectSuccess="selectSuccess"/>
</el-dialog>

 
<div v-loading.fullscreen.lock="fullscreenLoading"></div>


</div>
</template>

<script>
import selectClass from '~/components/companyManage/training/selectClass';
import trainAdd from '~/components/companyManage/training/trainAdd';
import trainEdit from '~/components/companyManage/training/trainEdit';
import trainIndex from '~/components/companyManage/training/trainIndex';
export default {
  layout: 'companyManage',
  name: 'admin_body',
  components: {
      trainAdd,
      trainEdit,
      selectClass,
      trainIndex
    },
  data () {
    let isOwnShow
    let roles =  this.$store.state.company.companyRole.data
    let isOwn =  isOwnShow = this.comssr.adminCheckRole(roles,'training','training_list')
    let isBuyShow = this.comssr.adminCheckRole(roles,'training','training_buy_list')
    return {
      addInfo:{map_num:1,stage_count:'',stage_content:[],training_cover_app:{},training_cover_pc:{},status:1},
      isOwn:isOwn,
      status:[{id:"0",name:"全部"},{id:"1",name:"正常"},{id:"2",name:"否"}],
      feedBackType:[{id:"0",name:"全部"},{id:"1",name:"软件出错"},{id:"2",name:"账号申诉"}],
      pageInfo:{
        total:400,
        pageSizes:[10, 20, 30, 400],
        pageSize:10,
        currentPage:1
      },
      searchFilter:{tel:"",status:"1",type:"1",time1:'',time2:''},    
      dialogTableVisible: false,
      dialogClassVisible:false,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogEditIndexVisible:false,
      formLabelWidth: '120px',
      saveAction:"",
      choose:null,
      classIds:[],
      newClassIds:[],
      classInfo:[],
      classPage:{},
      imgs:{},
      sections:[],
      editInfo:{},
      stage_map:[],
      stage_count:3,
      stage_pic:"",
      stagePicInfo:{stageValueArr:[],stageWhArr:[]},
      fullscreenLoading:false,
      isOwnShow:isOwnShow,
      isBuyShow:isBuyShow
 
 
    }
  },
  async asyncData({store}){

      let params = {url: "/company/training/training_list",data:{page:1,psize:100}}
      let res  = await store.dispatch("companyHttpGet",params);
      if(res.code!=0) {
        res.data.data=[]
      }
 
      let paramsBuy = {url: "/company/training/training_buy_list",data:{page:1,psize:100}}
      let resBuy  = await store.dispatch("companyHttpGet",paramsBuy);
      if(resBuy.code!=0) {
        resBuy.data.data=[]
      }
      
      
      
 
 
      return {
        updateInfo: res.data.data,
        updateInfoBuy: resBuy.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        },
        

      }
  },
  async created () {
     
   
  },
  methods: {
    setIsOwn(val) {
      this.isOwn=val
    },
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        console.log(this.addInfo);

        this.dialogTableVisible = true;
     },
    add:function(){
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training','training_add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.saveAction = "add"
        this.addInfo = {map_num:1,stage_count:'',stage_content:[],training_cover_app:{}}
        this.dialogAddVisible = true

     },
     async edit(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training','training_edit_get')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.fullscreenLoading = true
        this.newClassIds = []
        this.$set(this.stagePicInfo,'stageValueArr',[])

        this.saveAction = "edit"
        let params = {url: "/company/training/training_edit_get",data:{training_id:id}}
        let res  = await this.$store.dispatch("companyHttpGet",params);     
        this.addInfo = res.data
        this.imgs.training_cover_app = res.data.training_cover_app
        this.imgs.training_cover_pc = res.data.training_cover_pc
        this.sections = []
        for (var  index in res.data.stage_content) {
             var ids = []
             var sec = []
             for(var i in res.data.stage_content[index].sections) {
                 ids.push({type:res.data.stage_content[index].sections[i].course_type,course_id:res.data.stage_content[index].sections[i].course_id})
                 sec[i]={}
                 sec[i].section_id = res.data.stage_content[index].sections[i].id
                 sec[i].course_id = res.data.stage_content[index].sections[i].course_id
                 sec[i].course_type = res.data.stage_content[index].sections[i].course_type
             }
        
             res.data.stage_content[index].sections = sec
             if(ids.length>0) {
              let paramst = {url: "/company/training/training_add_course_info",data:{content:JSON.stringify(ids)}}
              let rest  = await this.$store.dispatch("companyHttpGet",paramst);
              for (var j in rest.data) {
                if(rest.data[j]) {
                  rest.data[j].section_id = sec[j].section_id
                  rest.data[j].course_type = sec[j].course_type   
                }
                
              }
              this.$set(this.sections,index,rest.data)
             }
             else {
              this.$set(this.sections,index,[])

             }
             
             //this.sections[index] = rest.data
        }
        this.editInfo = JSON.parse(JSON.stringify(this.addInfo))
 

       let paramsm = {url: "/company/training/training_map_list",data:{role:1}}
       let resm  = await this.$store.dispatch("companyHttpGet",paramsm);
       this.stage_map =  resm.data
       let params_g = {url: "/company/training/training_map_stage_list",data:{map_id:this.editInfo.map_num,role:1}}
       let res_g  = await this.$store.dispatch("companyHttpGet",params_g);
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
       //console.log("map",this.addInfo.map_num,this.stagePicInfo.stageValueArr) 
       this.fullscreenLoading = false
       this.dialogEditVisible = true
       
        
     },
      async seeTraining(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training','training_edit_get')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.$set(this.stagePicInfo,'stageValueArr',[])
        this.dialogEditIndexVisible = true; 
        this.saveAction = "edit"
        let params = {url: "/company/training/training_edit_get",data:{training_id:id}}
        let res  = await this.$store.dispatch("companyHttpGet",params);    
        this.addInfo = res.data
        this.imgs.training_cover_app = res.data.training_cover_app
        this.imgs.training_cover_pc = res.data.training_cover_pc
        this.sections = []
        for (var  index in res.data.stage_content) {
             var ids = []
             var sec = []
             for(var i in res.data.stage_content[index].sections) {
                 ids.push({type:res.data.stage_content[index].sections[i].course_type,course_id:res.data.stage_content[index].sections[i].course_id})
                 sec[i]={}
                 sec[i].section_id = res.data.stage_content[index].sections[i].id
                 sec[i].course_id = res.data.stage_content[index].sections[i].course_id
                 sec[i].course_type = res.data.stage_content[index].sections[i].course_type
             }
             console.log(ids,sec)
             res.data.stage_content[index].sections = sec
             if(ids.length>0) {
              let paramst = {url: "/company/training/training_add_course_info",data:{content:JSON.stringify(ids)}}
              let rest  = await this.$store.dispatch("companyHttpGet",paramst);
              for (var j in rest.data) {
                if(rest.data[j]) {
                  rest.data[j].section_id = sec[j].section_id
                  rest.data[j].course_type = sec[j].course_type   
                }
                
              }
              this.$set(this.sections,index,rest.data)
             }
             else {
              this.$set(this.sections,index,[])

             }
             
             //this.sections[index] = rest.data
        }
        this.editInfo = JSON.parse(JSON.stringify(this.addInfo))
 

       let paramsm = {url: "/company/training/training_map_list",data:{role:1}}
       let resm  = await this.$store.dispatch("companyHttpGet",paramsm);
       this.stage_map =  resm.data
       let params_g = {url: "/company/training/training_map_stage_list",data:{map_id:this.editInfo.map_num,role:1}}
       let res_g  = await this.$store.dispatch("companyHttpGet",params_g);
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
    
 
       
        
     },
     del:function(index) {
        this.updateInfo.splice(index,1)
     },
     addSuccess:function(res) {
          this.dialogAddVisible = res.visible;
          this.setData()
     },
     editSuccess:function(res) {
          this.dialogEditVisible = res.visible;
          this.setData() 
     },
     selectSuccess:function(res) {
          this.dialogClassVisible = res.visible;
          if(res.action == "submit") {
            //this.classIds = []
            this.newClassIds = res.classIds
            for(var i=0;i <res.classIds.length; i++) {
              this.classIds.push(res.classIds[i]);
            }
          }
          console.log(this.classIds)
    
         
     },
     async setClassVisible(res) {
         this.newClassIds = []
         let params = {url: "/company/course/company_course_list",data:{page:1,psize:10}}
         let rest  = await this.$store.dispatch("companyHttpGet",params);
         this.classPage={
            total:rest.data.total,
            pageSizes:[10, 20, 30, 400],
            pageSize:10,
            currentPage:parseInt(rest.data.page),
         }
         this.classInfo = rest.data.data
         this.classIds = res.classIds
         this.dialogClassVisible = res.visible;
     },
     async statusChange(id,status) {
        var msg = status==1?"下架":"上架"
        let params = {url: "/company/training/training_status_change",data:{trainging_id:id}}
        let res  = await this.$store.dispatch("companyHttpPost",params);
        if(res.code==0) {
            this.$message({message: msg+'成功',type: 'success'});
            this.setData()
 
        }
        else {
          this.$message.error(msg+"失败")
        }
     },

 
     
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val
      console.log(`当前页: ${val}`);
    },
    sortByKey: function(array, key) { //(数组、排序的列)
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })

    }, 
    handleAvatarSuccess(res, file,fileList) {
      this.addInfo.logo = URL.createObjectURL(file.raw); 
    },
    async setData() {
      console.log(this.upInfo)
      let params = {url: "/company/training/training_list",data:{page:1,psize:100}}
      let res  = await this.$store.dispatch("companyHttpGet",params);
      this.updateInfo = res.data.data
      var downIndex =0;
      var upIndex =0;
      this.downInfo =[]
      this.upInfo = []
      for (var i in this.updateInfo) {
        if(this.updateInfo[i].status ==0) {
           this.$set(this.downInfo,downIndex,this.updateInfo[i]) 
           downIndex++
        }
        else {
            this.$set(this.upInfo,upIndex,this.updateInfo[i]) 
            upIndex++
        }
        

      }
 
      
      
    },




 
  },
  watch:{
  
  },
  mounted () {
     this.setData()
  },
  head () {
    return {
      title: "训练营",
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

