<template>
<div class="app_preview">
 
   <el-form :model="addInfo" :rules="rules" ref="addInfo" >
    
      <el-form-item label="训练营名称" :label-width="formLabelWidth"  prop="training_name">
        {{addInfo.training_name}}
      </el-form-item>

      <el-form-item label="*训练营封面 （APP） " :label-width="formLabelWidth"  prop="training_cover_app">
    
              <img v-if="addInfo.training_cover_app" :src="addInfo.training_cover_app.value" class="avatar" style="width:352px;height:165px;">
 
      </el-form-item>
 
      <el-form-item label="*训练营封面（PC）" :label-width="formLabelWidth"  prop="training_cover_pc">
 
              <img v-if="addInfo.training_cover_pc" :src="addInfo.training_cover_pc.value" class="avatar" style="width:282px;height: 163px;">
 
      </el-form-item>

      <el-form-item label="训练营原价" :label-width="formLabelWidth"  prop="cost_price">
        {{addInfo.cost_price}}元
      </el-form-item>
      <el-form-item label="训练营现价" :label-width="formLabelWidth"  prop="pay_price">
        {{addInfo.pay_price}}元
      </el-form-item>
 
      <el-form-item label="上架状态" :label-width="formLabelWidth" prop="status">
        <span v-if="addInfo.status==1">上架</span><span v-else>下架</span>
 
     </el-form-item>


 
      

     <div class="base_tab" style="margin-bottom: 20px;">
      <div :class="isStage?'tab hover':'tab'" v-on:click="setIsStage(true)" >训练营关卡</div>
      <div :class="!isStage?'tab hover':'tab'" v-on:click="setIsStage(false)">训练营介绍</div>
     </div> 
     <div class="el-dialog__header"  v-if="!isStage"><span class="el-dialog__title">训练营简介</span></div>
     <div  class="ql-editor" v-if="!isStage">{{addInfo.training_description}}</div>
     <div class="el-dialog__header"  v-if="!isStage"><span class="el-dialog__title">详情介绍 (APP)</span></div>
     <div  class="ql-editor" v-if="!isStage" v-html="addInfo.content_app"> </div>
     <div class="el-dialog__header"  v-if="!isStage"><span class="el-dialog__title">详情介绍 (PC)</span></div>
     <div  class="ql-editor" v-if="!isStage" v-html="addInfo.content_pc"> </div>

      
      <div  class="training_more" v-if="isStage">
        <div class="stage_img" style="position: relative;" v-if="stagePicInfo.stageValueArr.length>0">
            <img :src="stage_pic.value" >
            <div class="stage_img_position" v-for="(item,index) in addInfo.stage_count" :key="index" 
            :style="'top:'+stagePicInfo.stageValueArr[index][1]+'%;left:'+stagePicInfo.stageValueArr[index][0]+'%;width:'+stagePicInfo.stageWhArr[0]+'%'">
                <img src="/admin/images/box.png" :width="stagePicInfo.stageWhArr[0]+'%'">
                <div class="title"  >{{addInfo.stage_content[index].stage_name}}</div>
                <div class="title_num">{{index+1}}</div>
            </div>          
        </div>

        <div class="stage_content">
          <div class="stage_set">
            

            <el-form-item label="选择地图" :label-width="formLabelWidth"  prop="map_num">
               <span v-for="item in stage_map" :key="item.id" v-if="addInfo.map_num == item.id">{{item.map_name}}</span>
 
            </el-form-item>

            <el-form-item label="训练营关卡数" :label-width="formLabelWidth"   prop="stage_count">
              <span v-for="item in stage_count" :key="item.stage_count" v-if="addInfo.stage_count == item.stage_count">{{item.stage_name}}</span>
            </el-form-item>
      
          </div>

          <div v-for="(it,index) in addInfo.stage_content" :key="index" class="stage_content_son" v-if="addInfo.stage_count>index">

               <el-form-item :label="'第'+gkNum[index]+'关'"   
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_name'" 
               :rules="{required: true, message: '必填', trigger:'blur' }">

                  {{it.stage_name}}
               </el-form-item>
               <el-form-item label="关卡欢迎词"
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_description'" 
               :rules="{required: true, message: '必填', trigger:'blur' }">

                  {{it.stage_description}}
               </el-form-item>
               <el-form-item label="关卡积分奖励" 
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_score'" 
               :rules="{required: true, message: '必填', trigger:'blur' }">
                 {{it.stage_score}}
               </el-form-item>

               <el-form-item label="通关完成度" 
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_pct'" 
               :rules="{required: true, message: '必填', trigger:'blur' }">
               {{it.stage_pct}}%
                 </el-form-item>
                
                <b>关卡课程</b>
                <el-checkbox-group v-model="delClassIndex[index]">
                  <table class="sections">
                     <tbody>
                       <tr v-for="(item, ind) in  sections[index]" :key="ind">
                         <td><img :src="item.cover.value" v-if="item.cover" /></td>
                         <td>{{item.course_name}}</td>
                         <td>{{item.price}}学币</td>
                         <td>{{(item.media_time/60).toFixed(2)}}分钟</td>
                       </tr>
                     </tbody>
                  </table>
                </el-checkbox-group>
  
          

                <div class="clr"></div>

           
          </div>

<div class="clr"></div>
        </div>        

        
      </div>
      
    </el-form>
    <div class="clr"></div>
   

     <el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" append-to-body width="80%">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>

 </div> 
 
</template>

<script>
 
 import cropper from '~/components/admin/cropper'; 
 
export default {
	name: "caseEdit",
  props: ['addInfo','classIds','imgs','sections','editInfo','stage_map','stage_count','stage_pic','stagePicInfo'], 
  components: {
      cropper
  },
	data() {
		return {
			 rules: {
          training_name:[{ required: true, message: '必填', trigger: 'blur' }],
          training_cover_app: [{ required: true, message: '必填', trigger: 'blur' }],
          training_cover_pc: [{ required: true, message: '必填', trigger: 'blur' }],
          cost_price: [{ required: true, message: '必填', trigger: 'blur' }],
          pay_price: [{ required: true, message: '必填', trigger: 'blur' }],
          status: [{ required: true, message: '必填', trigger: 'blur' }],
          training_description: [{ required: true, message: '必填', trigger: 'blur' }],
          content_app: [{ required: true, message: '必填', trigger: 'blur' }],
          content_pc: [{ required: true, message: '必填', trigger: 'blur' }],
          stage_count: [{ required: true, message: '必填', trigger: 'blur' }],
          map_num: [{ required: true, message: '必填', trigger: 'blur' }],
       },
       gkNum:['一','二','三','四','五','六','七','八','九'],
      formLabelWidth:"120px",
      status:[{id:1,title:"上架"},{id:0,title:"下架"}],
      stage_count_int:1,
      saveAction:"",
      chooseImg:"",
      editorOption:{},
      stageIndex:"",
      stage_content:{},
      delClassIndex:[[],[],[],[],[]],
      addInfoCopy:{},
      isStage:true,
      cutPicInfo:{},
      dialogCropperVisible: false,
   
		}
	},
  async created() {
     // let params = {url: "/manage/training/training_map_list",data:{}}
     // let res  = await this.$store.dispatch("adminHttpGet",params);
     // this.stage_map =  res.data
     // let params_g = {url: "/manage/training/training_map_stage_list",data:{map_id:this.addInfo.map_num}}
     // let res_g  = await this.$store.dispatch("adminHttpGet",params_g);
     // this.stage_count = res_g.data
     // this.stage_pic = res_g.data[0].stage_pic
     // this.stagePicInfo = res_g.data[0]
     // this.stagePicInfo.stageValueArr = []
     // var stageValueArr = res_g.data[0].stage_value.split(";")
     
     // for(var i in res_g.data[0].stage_value.split(";")){
     //   this.stagePicInfo.stageValueArr[i] = stageValueArr[i].split(",")
     // }
     // this.stagePicInfo.stageWhArr = res_g.data[0].stage_wh.split(",")
     // console.log(this.stagePicInfo.stageValueArr)
  },
  computed: {
     
    },
	methods: {
    setIsStage(val) {
      this.isStage = val
    },
    cut_pic(cutPicDic,picWidth,picHeight) {
        this.$set(this.cutPicInfo,"aspectRatio",picWidth/picHeight)
        this.$set(this.cutPicInfo,"cutPicDic",cutPicDic)
        this.$set(this.cutPicInfo,"curPic",this.addInfo[cutPicDic].value)
        this.dialogCropperVisible = true
    },
    async cutPicSuccess(res) {
      this.dialogCropperVisible = res.visible
      let params = {url: "/common/file/add",data:{file_base64:res.data}}
      let rest  = await this.$store.dispatch("adminHttpPost",params);
      if(rest.code==4002) {
        this.$set(this.addInfo[this.cutPicInfo.cutPicDic],"value",rest.data.file_url)
        this.$set(this.addInfo[this.cutPicInfo.cutPicDic],"name",rest.data.filename)
        //this.$message({message: '图片上传成功',type: 'success'});
      }
      else {
        this.$message.error('图片上传失败');
      }
    },
    onEditorBlur() { //失去焦点事件
    },
    onEditorFocus() { //获得焦点事件
    },
    onEditorChange() { //内容改变事件
    },
    async save() {
      this.$refs['addInfo'].validate((valid) => {
        if (valid) {
          this.update() 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async update() {
      
      this.addInfoCopy = JSON.parse(JSON.stringify(this.addInfo))
      console.log(this.addInfoCopy.stage_content)
      this.$set(this.addInfoCopy,'training_id',this.addInfoCopy.id)
      for(var i in this.addInfoCopy.stage_content) {
        this.$set(this.addInfoCopy.stage_content[i],'stage_id',this.addInfoCopy.stage_content[i].id)
        delete this.addInfoCopy.stage_content[i].id
        delete this.addInfoCopy.stage_content[i].created_at
        delete this.addInfoCopy.stage_content[i].stage_jingyan
        delete this.addInfoCopy.stage_content[i].stage_sort
        delete this.addInfoCopy.stage_content[i].training_id
        delete this.addInfoCopy.stage_content[i].updated_at  
      }
 
      this.$set(this.addInfoCopy,'stage_content',JSON.stringify(this.addInfoCopy.stage_content))

      this.$set(this.addInfoCopy,'training_cover_app',JSON.parse(JSON.stringify(this.addInfoCopy.training_cover_app.name)))
      this.$set(this.addInfoCopy,'training_cover_pc',JSON.parse(JSON.stringify(this.addInfoCopy.training_cover_pc.name)))
 

 

      let params = {url: "/manage/training/training_edit_save",data:this.addInfoCopy}
      let res  = await this.$store.dispatch("adminHttpPost",params);
      console.log(res)
      var rest = {}
      rest.visible = false;
      if(res.code==0) {
        this.$message({message: '编辑成功',type: 'success'});
        this.$emit('editSuccess', rest);
      }
      else {
        this.$message.error("编辑失败")
      }
    },
    async setMapNum() {

      this.stagePicInfo.stageValueArr = []
      let params_g = {url: "/manage/training/training_map_stage_list",data:{map_id:this.addInfo.map_num,role:1}}
      let res_g  = await this.$store.dispatch("adminHttpGet",params_g);
      this.stage_count = res_g.data
      this.stage_pic = res_g.data[0].stage_pic
      //this.stagePicInfo = res_g.data[0]
      
      var stageValueArr = res_g.data[0].stage_value.split(";")
      for(var i in res_g.data[0].stage_value.split(";")){
         this.stagePicInfo.stageValueArr[i] = stageValueArr[i].split(",")
      }
      this.stagePicInfo.stageWhArr = res_g.data[0].stage_wh.split(",")

    },
    setStage() {
        this.addInfo.stage_content = []
        for (var i = 0; i < this.addInfo.stage_count; i++) {
           var stage = this.editInfo.stage_content
           
           if(i<stage.length) {
              this.$set(this.addInfo.stage_content,i,stage[i]);
           }
           else {
             this.$set(this.addInfo.stage_content,i,{});
             this.$set(this.addInfo.stage_content[i],'id',-1);
             this.$set(this.addInfo.stage_content[i],'sections',[]);

             this.$set(this.editInfo.stage_content,i,{});
             this.$set(this.editInfo.stage_content[i],'id',-1);
             this.$set(this.editInfo.stage_content[i],'sections',[]);

             this.$set(this.sections,i,[]);
            
           }
           
        }
 
        var thisStage_count = this.addInfo.stage_count

        var tasks = this.stage_count.filter(function(p){
            return p.stage_count === thisStage_count;
        });
 
        this.stage_pic = tasks[0].stage_pic
        //this.stagePicInfo = JSON.parse(JSON.stringify(tasks[0]))
        this.$set(this.stagePicInfo,'stageValueArr',[])
        var stageValueArr = tasks[0].stage_value.split(";")
         
         for(var i in tasks[0].stage_value.split(";")){
           this.$set(this.stagePicInfo.stageValueArr,i,stageValueArr[i].split(","))
           
         }
         this.$set(this.stagePicInfo,'stageWhArr',tasks[0].stage_wh.split(","))
         console.log(this.stagePicInfo)
  
  
    },
    cancel:function(){
        this.$refs['addInfo'].resetFields();
        var res={}
        res.btnAaction = "cancel";
        res.visible = false;
        this.$emit('editSuccess',res) 
     },
     addClass:function(index) {
           this.stageIndex = index;
           var res = {}
           res.visible = true
           res.classIds = []
           var arr = JSON.parse(JSON.stringify(this.addInfo.stage_content[index].sections))

           for (var  index in arr){
               res.classIds.push(arr[index].course_id)
            }
   
           this.$emit('setClassVisible',res);
     },
     async delClass(index) {

        console.log(this.delClassIndex[index])

        var secInfo = JSON.parse(JSON.stringify(this.addInfo.stage_content[index].sections))
        secInfo.reverse()
        var section_ids = []
        for (var i in this.delClassIndex[index]){
          var tid = secInfo[this.delClassIndex[index][i]].section_id
          if(tid!=-1) {
            section_ids.push(tid)
          }
          this.sections[index].splice(this.delClassIndex[index][i],1)
          this.addInfo.stage_content[index].sections.splice(this.delClassIndex[index][i],1)

        }

        if(section_ids.length>0) {
          let params = {url: "/manage/training/training_section_del",data:{section_ids:section_ids.join(',')}}
          let res  = await this.$store.dispatch("adminHttpPost",params);
          // if(res.code==0) {
          //   this.$message({message: '删除成功',type: 'success'});
          //   this.$emit('editSuccess', rest);
          // }
          // else {
          //   this.$message.error("删除失败")
          // }
        }
        this.delClassIndex[index] = []
  
     },
     addInfoMoreDel:function(index) {
        this.addInfoMore.splice(index,1)
     },
    appAvatarSuccess(res, file,fileList) {
      this.$set(this.addInfo.training_cover_app,'name',file.response.data.filename)
      this.$set(this.addInfo.training_cover_app,'value',file.response.data.file_url)
    },
    pcAvatarSuccess(res, file,fileList) {
      this.$set(this.addInfo.training_cover_pc,'name',file.response.data.filename)
      this.$set(this.addInfo.training_cover_pc,'value',file.response.data.file_url)
 
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,png,gif 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    setChooseImg:function(field) {
       this.chooseImg = field; 
 
    }

  },
  mounted () {
 
  },
  watch: {
    classIds:async function (val) {
      var vvsl = []
      console.log("val",this.editInfo.stage_content[this.stageIndex])
      for (var  index in val){

           var tasks = this.editInfo.stage_content[this.stageIndex].sections.filter(function(p){
            return p.course_id === val[index];
           });
           if(tasks.length>0) {
             var section_id = tasks[0].section_id
           }
           else {
             var section_id = -1
           }
           vvsl.push({section_id:section_id,course_id:val[index]})
       }

      this.$set(this.addInfo.stage_content[this.stageIndex],'sections',JSON.parse(JSON.stringify(vvsl)));

      if(val.length>0) {
        let params = {url: "/manage/training/training_add_course_info",data:{course_ids:val.join(",")}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.$set(this.sections,this.stageIndex,res.data);
      }
      else {
        this.$set(this.sections,this.stageIndex,[]);
      }
      


    
 
 
    }
  }
   
}
</script>

 