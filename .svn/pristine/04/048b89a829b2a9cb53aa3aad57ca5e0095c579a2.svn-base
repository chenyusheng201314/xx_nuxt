<template>
<div class="app_preview">
  
   <el-form :model="addInfo" :rules="rules" ref="addInfo" >
    
      <el-form-item label="训练营名称" :label-width="formLabelWidth"  prop="training_name">
        <el-input v-model="addInfo.training_name" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="*训练营封面" :label-width="formLabelWidth"  prop="training_cover_app">
              <img v-if="addInfo.training_cover_app.value" :src="addInfo.training_cover_app.value" class="avatar" style="width:352px;height:165px;" v-on:click="cut_pic('training_cover_app',1408,660)">
              <div class="cut_pic_add" v-else v-on:click="cut_pic('training_cover_app',1408,660)"><i>+</i></div>
      </el-form-item>

      
   
      <div class="el-dialog__header"><span class="el-dialog__title">关卡设置</span></div>
      <div  class="training_more">
        <div class="stage_img" style="position: relative;">
            <img :src="stage_pic.value" >
            <div class="stage_img_position" v-for="(item,index) in addInfo.stage_content" :key="index" 
            :style="'top:'+stagePicInfo.stageValueArr[index][1]+'%;left:'+stagePicInfo.stageValueArr[index][0]+'%;width:'+stagePicInfo.stageWhArr[0]+'%'">
                <img src="/admin/images/box.png" :width="stagePicInfo.stageWhArr[0]+'%'">
                <div class="title"  >{{addInfo.stage_content[index].stage_name}}</div>
                <div class="title_num">{{index+1}}</div>
            </div>          
        </div>
        <div class="stage_content">
          <div class="stage_set">
            <el-form-item label="选择地图" :label-width="formLabelWidth"  prop="map_num" @change="setMapNum">
               <el-select v-model="addInfo.map_num"   placeholder="请选择">
                  <el-option
                    v-for="item in stage_map"
                    :key="item.id"
                    :label="item.map_name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="训练营关卡数" :label-width="formLabelWidth"   prop="stage_count">
               <el-select v-model="addInfo.stage_count" :value="1" placeholder="请选择" @change="setStage" >
                  <el-option
                    v-for="item in stage_count"
                    :key="item.stage_count"
                    :label="item.stage_name"
                    :value="item.stage_count">
                  </el-option>
                </el-select>
            </el-form-item>
      
          </div>
         
          <div v-for="(it,index) in addInfo.stage_content" :key="index" class="stage_content_son">

               <el-form-item :label="'第'+gkNum[index]+'关'" 
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_name'" 
               :rules="[{required: true, message: '必填', trigger:'blur' },{validator:comssr.validatorLen8}]">

                  <el-input v-model="it.stage_name" auto-complete="off" ></el-input>
               </el-form-item>
               <el-form-item label="关卡欢迎词"
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_description'" 
               :rules="[{required: true, message: '必填', trigger:'blur' },{validator:comssr.validatorLen150}]">

                  <el-input v-model="it.stage_description" auto-complete="off" ></el-input>
               </el-form-item>
               <el-form-item label="经验值奖励" 
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_jingyan'" 
               :rules="[{required: true, message: '必填', trigger:'blur' },{ pattern: /^[1-9]\d{0,7}$/, message: '必须为8位数值' }]">
                  <el-input v-model="it.stage_jingyan" auto-complete="off" ></el-input>
               </el-form-item>

               <el-form-item label="通关完成度" 
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].stage_pct'" 
               :rules="{required: true, message: '必填', trigger:'blur' }">
               <el-select v-model="it.stage_pct"   placeholder="请选择">
                  <el-option
                    v-for="i in ['0','20','40','60','70','80','90','100']"
                    :key="i"
                    :label="i+'%'"
                    :value="Number(i).toFixed(1)">
                  </el-option>
                </el-select>
                 </el-form-item>
                
                <b>关卡课程</b><div v-on:click="addClass(index)" class="base_btn_add"> <strong>+</strong> 增加</div>
        
                  <table class="sections">
                     <tbody>
                       <tr v-for="(item, ind) in  sections[index]" :key="ind">
                         <td><img :src="item.cover.value" v-if="item.cover" /></td>
                         <td>{{item.course_name}}</td>
                         <td>{{(item.media_time/60).toFixed(2)}}分钟</td>
                         <td> 
                           <i class="iconfont icon_btn icon_btn_del" v-on:click="delClass(index,ind)">&#xe62f;</i>
                         </td>
                       </tr>
                     </tbody>
                  </table>
    
                <el-form-item  
               :label-width="formLabelWidth"  
               :prop="'stage_content['+index+'].sections'" 
               :rules="{required: true, message: '关卡课程必填', trigger:'blur' }"></el-form-item>
               

                <div class="clr"></div>

           
          </div>

<div class="clr"></div>
        </div>        

        
      </div>
      
    </el-form>
    <div class="clr"></div>
    <div slot="footer" class="dialog-footer" style="text-align:center; ">
 
      <el-button type="primary" v-on:click="save()">确 定</el-button>
    </div>

     <el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible" append-to-body width="80%" :close-on-click-modal="false">
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
  props: ['addInfo','classIds','newClassIds'],
  components: {
      cropper
  },
  data() {
    return {
       rules: {
           training_name:[{ required: true, message: '必填', trigger: 'blur' },
          {validator:this.comssr.validatorLen15, trigger: 'blur'}
          ],
          training_cover_app: [{ required: true, message: '必填', trigger: 'blur' }],
          training_cover_pc: [{ required: true, message: '必填', trigger: 'blur' }],
          cost_price: [{ required: true, message: '必填', trigger: 'blur' },
          { pattern: /(^[1-9]\d{0,4}$)|(^0\.\d{1,2}$)|(^[1-9]\d{0,4}\.\d{1,2}$)/, message: '金额不能大于99999，且小数不能大于2位' }],
          pay_price: [{ required: true, message: '必填', trigger: 'blur' },
          { pattern: /(^[1-9]\d{0,4}$)|(^0\.\d{1,2}$)|(^[1-9]\d{0,4}\.\d{1,2}$)/, message: '金额不能大于99999，且小数不能大于2位' }],
          status: [{ required: true, message: '必填', trigger: 'blur' }],
          training_description: [{ required: true, message: '必填', trigger: 'blur' },
          {validator:this.comssr.validatorLen150, trigger: 'blur'}],
          content_app: [{ required: true, message: '必填', trigger: 'blur' }],
          content_pc: [{ required: true, message: '必填', trigger: 'blur' }],
          stage_count: [{ required: true, message: '必填', trigger: 'blur' }],
          map_num: [{ required: true, message: '必填', trigger: 'blur' }],
       },
       gkNum:['一','二','三','四','五','六','七','八','九'],
      formLabelWidth:"120px",
      status:[{id:1,title:"上架"},{id:0,title:"下架"}],
      stage_map:[{id:1,title:"海盗船长",imgUrl:""},{id:2,title:"海盗导航",imgUrl:""}],
      stage_count:[{id:3,title:"3个关卡"},{id:4,title:"4个关卡"},{id:5,title:"5个关卡"}],
      stage_count_int:1,
      saveAction:"",
      chooseImg:"",
      editorOption:{},
      stageIndex:"",
      stage_content:{},
      sections:[[],[],[],[],[],[],[],[],[],[]],
      delClassIndex:[[],[],[],[],[],[],[],[],[],[]],
      imgs:{},
      addInfoCopy:{},
      stage_pic:{},
      stagePicInfo:{},
      cutPicInfo:{},
      dialogCropperVisible: false,
    }
  },
  async created() {
     let params = {url: "/company/training/training_map_list",data:{role:1}}
     let res  = await this.$store.dispatch("companyHttpGet",params);
     console.log("map",res)
     this.stage_map =  res.data
     let params_g = {url: "/company/training/training_map_stage_list",data:{map_id:this.addInfo.map_num,role:1}}
     let res_g  = await this.$store.dispatch("companyHttpGet",params_g);
     this.stage_count = res_g.data
     this.stage_pic = res_g.data[0].stage_pic
     this.stagePicInfo = res_g.data[0]
     this.stagePicInfo.stageValueArr = []
     var stageValueArr = res_g.data[0].stage_value.split(";")
     
     for(var i in res_g.data[0].stage_value.split(";")){
       this.stagePicInfo.stageValueArr[i] = stageValueArr[i].split(",")
     }
     this.stagePicInfo.stageWhArr = res_g.data[0].stage_wh.split(",")
     console.log(this.stagePicInfo.stageValueArr)
  },
  computed: {
     
    },
  methods: {
    cut_pic(cutPicDic,picWidth,picHeight) {
        this.$set(this.cutPicInfo,"aspectRatio",picWidth/picHeight)
        this.$set(this.cutPicInfo,"cutPicDic",cutPicDic)
        this.$set(this.cutPicInfo,"curPic",this.addInfo[cutPicDic].value)
        this.dialogCropperVisible = true
    },
    async cutPicSuccess(res) {
      this.dialogCropperVisible = res.visible
      let params = {url: "/common/file/add",data:{file_base64:res.data}}
      let rest  = await this.$store.dispatch("companyHttpPost",params);
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
    async onEditorChange1() { //内容改变事件
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = this.addInfo.content_app.match(imgReg);
      arr = arr==null?[]:arr  
      for (var i = 0; i < arr.length; i++) {
       var src = arr[i].match(srcReg);
       //获取图片地址
       if(src[1]){
        if(src[1].indexOf('data:image')>-1) {
          let imgUrl = '/admin/images/img_loading.gif?'+i
          this.addInfo.content_app = this.addInfo.content_app.replace(src[1], imgUrl);
          let params = {url: "/common/file/add",data:{file_base64:src[1]}}
          let res  = await this.$store.dispatch("companyHttpPost",params);
          this.addInfo.content_app = this.addInfo.content_app.replace(imgUrl, res.data.file_url);
        }
       }
      }
    },
    async onEditorChange2() { //内容改变事件
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = this.addInfo.content_pc.match(imgReg);
      arr = arr==null?[]:arr  
      for (var i = 0; i < arr.length; i++) {
       var src = arr[i].match(srcReg);
       //获取图片地址
       if(src[1]){
        if(src[1].indexOf('data:image')>-1) {
          let imgUrl = '/admin/images/img_loading.gif?'+i
          this.addInfo.content_pc = this.addInfo.content_pc.replace(src[1], imgUrl);
          let params = {url: "/common/file/add",data:{file_base64:src[1]}}
          let res  = await this.$store.dispatch("companyHttpPost",params);
          this.addInfo.content_pc = this.addInfo.content_pc.replace(imgUrl, res.data.file_url);
        }
       }
      }
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
      
      
      this.$set(this.addInfoCopy,'stage_content',JSON.stringify(this.addInfoCopy.stage_content))
      this.$set(this.addInfoCopy,'training_cover_app',JSON.parse(JSON.stringify(this.addInfoCopy.training_cover_app.name)))
      console.log(this.addInfoCopy)
      let params = {url: "/company/training/training_add",data:this.addInfoCopy}
      let res  = await this.$store.dispatch("companyHttpPost",params);
      var rest = {}
      rest.visible = false;
      if(res.code==0) {
        this.$message({message: '添加成功',type: 'success'});
        this.$emit('addSuccess', rest);
      }
      else {
        this.$message.error("保存失败")
      }
      
    },
    async setMapNum() {


      let params_g = {url: "/company/training/training_map_stage_list",data:{map_id:this.addInfo.map_num,role:1}}
      let res_g  = await this.$store.dispatch("companyHttpGet",params_g);
      this.stage_count = res_g.data
      this.stage_pic = res_g.data[0].stage_pic
      this.stagePicInfo = res_g.data[0]
      this.stagePicInfo.stageValueArr = []
      var stageValueArr = res_g.data[0].stage_value.split(";")
      for(var i in res_g.data[0].stage_value.split(";")){
         this.stagePicInfo.stageValueArr[i] = stageValueArr[i].split(",")
      }
      this.stagePicInfo.stageWhArr = res_g.data[0].stage_wh.split(",")

    },
    setStage() {
        this.addInfo.stage_content = []
        for (var i = 0; i < this.addInfo.stage_count; i++) {
           this.$set(this.sections,i,[]);
           this.$set(this.addInfo.stage_content,i,{});
           this.$set(this.addInfo.stage_content[i],'sections',[]);
           this.$set(this.addInfo.stage_content[i],'stage_pct','80.0');
           //this.$set(this.addInfo.stage_content[i],'classIds',[]);
        }
        var thisStage_count = this.addInfo.stage_count
        var tasks = this.stage_count.filter(function(p){
            return p.stage_count === thisStage_count;
        });
        this.stage_pic = tasks[0].stage_pic
        this.stagePicInfo = tasks[0]
        this.stagePicInfo.stageValueArr = []
        var stageValueArr = tasks[0].stage_value.split(";")
         
         for(var i in tasks[0].stage_value.split(";")){
           this.stagePicInfo.stageValueArr[i] = stageValueArr[i].split(",")
         }
         this.stagePicInfo.stageWhArr = tasks[0].stage_wh.split(",")
         console.log(this.stagePicInfo.stageValueArr)
  
    },
    cancel:function(){
        this.$refs['addInfo'].resetFields();
        var res={}
        res.btnAaction = "cancel";
        res.visible = false;
        this.$emit('addSuccess',res) 
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
     delClass(index,ind) {

        this.delClassIndex[index].push(ind)
        
        for (var i in this.delClassIndex[index]){
          this.sections[index].splice(this.delClassIndex[index][i],1)
          this.addInfo.stage_content[index].sections.splice(this.delClassIndex[index][i],1)
        }
        this.delClassIndex[index] = []
        // let cost_price = 0
        // for(var i in this.sections) {
        //    for(var j in this.sections[i]) {
        //       cost_price = cost_price + parseFloat(this.sections[i][j].price)
        //    }
        // }
        // this.$set(this.addInfo,"cost_price",cost_price);
  
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
        this.$message.error('上传头像图片只能是 JPG，gif，png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    setChooseImg:function(field) {
       this.chooseImg = field; 
 
    },
    returnFloat(value){
      var value=Math.round(parseFloat(value)*100)/100;
      var s=value.toString().split(".");
      if(s.length==1){
        value=value.toString()+".00";
        return value;
      }
      if(s.length>1){
        if(s[1].length<2){
          value=value.toString()+"0";
        }
        return value;
      }
    }
  },
  mounted () {
 
  },
  // watch: {
  //   classIds:async function (val) {
  //     console.log(val)
  //     var vvsl = []
  //     for (var  index in val){
  //          vvsl.push({course_id:val[index]})
  //      }

  //     this.$set(this.addInfo.stage_content[this.stageIndex],'sections',JSON.parse(JSON.stringify(vvsl)));
  //     let params = {url: "/manage/training/training_add_course_info",data:{course_ids:val.join(",")}}
  //     let res  = await this.$store.dispatch("adminHttpGet",params);
  //     if(res.code!==0) {
  //       res.data = []
  //     }
  //     this.$set(this.sections,this.stageIndex,res.data);
     
  //     let cost_price = 0
  //     for(var i in this.sections) {
  //        for(var j in this.sections[i]) {
  //           cost_price = cost_price + parseFloat(this.sections[i][j].price)
  //        }
  //     }
  //     this.$set(this.addInfo,"cost_price",cost_price);


    
 
 
  //   }
  // },
   watch: {
    classIds:async function (val) {
      let vvsl = []
      let content = []
      for (var  index in this.newClassIds){
           //vvsl.push({course_id:val[index]})
           let arrs = this.newClassIds[index].split(',')
           this.addInfo.stage_content[this.stageIndex].sections.push({course_id:arrs[0],course_type:arrs[1]})
           content.push({type:arrs[1],course_id:arrs[0]})
       }
       console.log(this.addInfo.stage_content[this.stageIndex])

      //this.$set(this.addInfo.stage_content[this.stageIndex],'sections',JSON.parse(JSON.stringify(vvsl)));
      let params = {url: "/company/training/training_add_course_info",data:{content:JSON.stringify(content)}}
      let res  = await this.$store.dispatch("companyHttpGet",params);
      console.log(JSON.stringify(content),res)
      if(res.code!==0) {
        res.data = []
      }
   
      for(var j in res.data) {
        if(res.data[j]) {
            if(res.data[j].id) {
              this.sections[this.stageIndex].push(res.data[j])
            }
        }
      }
      //this.$set(this.sections,this.stageIndex,res.data);
     
      // let cost_price = 0
      // for(var i in this.sections) {
      //    for(var j in this.sections[i]) {
      //       cost_price = cost_price + parseFloat(this.sections[i][j].price)
      //    }
      // }
      // this.$set(this.addInfo,"cost_price",cost_price);


    
 
 
    }
  }
   
}
</script>

 