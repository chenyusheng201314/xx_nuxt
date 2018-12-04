<template>
<div class="admin_body_right">
   <div class="base_body">
     <div class="base_title">
       <div class="title">班级
          <p>Class</p>
       </div>
     </div>
 
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="班级名称" label-width="80px" >
            <el-input v-model="searchFilter.class_name" auto-complete="off" clearable></el-input>
          </el-form-item>

          <el-form-item label="所属训练营" label-width="90px">
              <el-select v-model="searchFilter.training_id" placeholder="请选择"  clearable>
                <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="item in trainingInfo"
                    :key="item.id"
                    :label="item.training_name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
           <el-form-item label="班级状态" label-width="80px" >
              <el-select v-model="searchFilter.status" placeholder="请选择" clearable>
                <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>



      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">创建</el-button>
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
      </el-form-item>

        </el-form> 
     </div>
     <div class="base_tab">
      <div :class="!isClassM?'tab hover':'tab'" v-on:click="setClassM(false)" >全部班级</div>
      <div :class="isClassM?'tab hover':'tab'" v-on:click="setClassM(true)">我的班级</div>
     </div> 
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">班级封面</th>
          <th width="8%">班级名称</th>
          <th width="8%">所属训练营</th>
          <th width="8%">学员数量</th>
          <th width="8%">班主任</th>
          <th width="12%">班级日期</th>
          <th width="12%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index"  >
          <td>{{index+1}}   </td>
          <td><img :src="vo.class_cover.value" style="height:40px" /></td>
          <td><div v-if="vo.is_default==1" class="star">★</div>{{vo.class_name}}</td>
          <td>{{vo.training.training_name}}</td>
          <td>{{vo.class_member}}</td>
          <td><div v-if="vo.class_teacher_info">{{vo.class_teacher_info.realname}}</div></td>
          <td> <div :class="'status_color'+vo.status">{{vo.open_class_start_time}} ~ {{vo.open_class_end_time}}</div></td>
          <td>
            <i class="iconfont icon_btn icon_btn_see" v-on:click="see(vo.id)">&#xe610;</i>
            <i class="iconfont icon_btn icon_btn_edit" v-on:click="edit(vo.id)">&#xe678;</i>
            <i class="iconfont icon_btn icon_btn_task" v-on:click="task(vo.id,vo.open_class_start_time,vo.open_class_end_time)">&#xe617;</i>
            <i class="iconfont icon_btn icon_btn_user" v-on:click="memberM(vo.id,vo.class_member,vo.training.id)">&#xe601;</i>
          </td>
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
   </div>


<el-dialog :title="(saveAction=='edit'?'编辑':'创建')+'班级'" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :close-on-click-modal="false">
 
  <el-form :model="addInfo" :rules="rules" ref="addInfo">
    <el-form-item label="班级名称" :label-width="formLabelWidth" prop="class_name">
       <el-input v-model="addInfo.class_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属训练营" :label-width="formLabelWidth" prop="training_id">
       <el-select v-model="addInfo.training_id" placeholder="请选择" :disabled="saveAction=='edit'?true:false" >
        <el-option
          v-for="it in trainingInfo"
          :key="it.id"
          :label="it.training_name"
          :value="it.id">
        </el-option>
      </el-select>
    </el-form-item>
   <el-form-item label="班级封面" :label-width="formLabelWidth"  prop="class_cover">
  
       <div v-on:click="cut_pic('class_cover',352,165)" >
              <img v-if="addInfo.class_cover.value" :src="addInfo.class_cover.value" class="avatar" style="width:352px;height:165px;">
              <div class="cut_pic_add" v-else><i>+</i></div>
         </div>
    </el-form-item>
    <el-form-item label="班主任" :label-width="formLabelWidth"  prop="class_teacher">
   
       <el-select v-model="addInfo.class_teacher" filterable placeholder="请选择" @change="getTchTel()">
        <el-option
          v-for="item in headmaster"
          :key="item.id"
          :label="item.realname"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班主任电话" :label-width="formLabelWidth"  prop="teacher_tel">
       <el-input v-model="addInfo.teacher_tel" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="开班时间" :label-width="formLabelWidth" prop="open_class_start_time">
            <el-date-picker
      v-model="addInfo.open_class_start_time"
      type="date"
      :disabled="addInfo.status === 0 || saveAction!='edit'?false:true"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="addInfo.open_class_end_time"
      type="date"
      :disabled="addInfo.status == 2 && saveAction=='edit'?true:false"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
          </el-date-picker>
     </el-form-item>
     <el-form-item label="打卡时间" :label-width="formLabelWidth"  prop="daily_punch_start_time">
       <el-time-picker
        v-model="addInfo.daily_punch_start_time"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        format = "HH:mm:ss"
        value-format="HH:mm:ss"
        placeholder="签到时间">
      </el-time-picker> -

      <el-time-picker
        v-model="addInfo.daily_punch_end_time"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        format = "HH:mm:ss"
        value-format="HH:mm:ss"
        placeholder="签退时间">
      </el-time-picker>
    </el-form-item>

 
 
      <div class="el-dialog-header"><span class="el-dialog-title"></span>班级介绍 </div>

      <el-form-item label="" label-width="0px"  prop="info"  >
              <quill-editor 
              v-model="addInfo.info" 
              ref="myQuillEditor" 
              :options="editorOption" 
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
              </quill-editor>
      </el-form-item>
     <div class="el-dialog-header"><span class="el-dialog-title"></span>经验值规则 </div> 
 
     <div class="class_set_int">
       <div class="set_int_list">
           <h4>每日打卡</h4> 
           每天打卡赠送经验值
           <el-input v-model="expRule[0].experience_value" placeholder=""></el-input> 
           ，连续打卡经验值加成
     
           <el-input v-model="expRule[1].experience_value" placeholder=""></el-input> 
           ，上限
           <el-input v-model="expRule[1].experience_value_max" placeholder=""></el-input> 
           经验值
    
        </div>
        <div class="set_int_list">
           <h4>作业被点赞</h4> 
           每点赞1一次获得经验值
           <el-input v-model="expRule[2].experience_value" placeholder=""></el-input> 
        </div>
        <div class="set_int_list">
           <h4>作业批改打分</h4> 
           每日作业满分获得经验值
           <el-input v-model="expRule[3].experience_value" placeholder=""></el-input> 
        </div>
        <div class="set_int_list" v-for="(item,index) in expRule" :key="index" v-if="index>3">
           <h4>自定义线下规则</h4> 
           <el-input v-model="expRule[index].experience_name" placeholder="" :value="0" class="experience_name"></el-input>
           <el-select v-model="expRule[index].experience_method"  placeholder="请选择" class="experience_method">
            <el-option :key="1" label="增加" :value="1"></el-option>
            <el-option :key="0" label="减少" :value="0"></el-option>
           </el-select>
           <el-input v-model="expRule[index].experience_value" placeholder=""></el-input> 经验值   
           <div class="base_info_more_del" v-on:click="delExp(index)" style="position: initial; display: inline-block;float:right">×</div>
        </div>
        <div class="base_btn_add" v-on:click="addExp()"><strong>+</strong> 增加</div>


     </div>




  </el-form>

  <div slot="footer" class="dialog-footer" style="text-align: center;">
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="班级信息"   :visible.sync="dialogTableVisible" v-if="dialogTableVisible" :close-on-click-modal="false">
        <div class="base_form_list">
           <div class="title">班级名称</div>
           <div class="content"> {{editInfo.class_name}}</div>
        </div>
        <div class="base_form_list">
           <div class="title">所属训练营</div>
           <div class="content">  {{trainingInfoDic[editInfo.training_id]}}  </div>
        </div>
        <div class="base_form_list">
           <div class="title">班级封面</div>
           <div class="content"> <img :src="editInfo.class_cover.value" style="width:120px;" /></div>
        </div>
        <div class="base_form_list">
           <div class="title">班主任</div>
           <div class="content" v-if="editInfo.class_teacher_info.realname"> {{editInfo.class_teacher_info.realname}}</div>

        </div>
        <div class="base_form_list">
           <div class="title">班主任电话</div>
           <div class="content"> {{editInfo.teacher_tel}}</div>
        </div>
        <div class="base_form_list">
           <div class="title">开班时间</div>
           <div class="content"> {{editInfo.open_class_start_time}} - {{editInfo.open_class_end_time}}</div>
        </div>
        <div class="base_form_list">
           <div class="title">打卡时间</div>
           <div class="content">{{editInfo.daily_punch_start_time}} - {{editInfo.daily_punch_end_time}} </div>
        </div>
        <div class="base_form_list">
           <div class="title">班级介绍</div>
           <div class="content"><div v-html='editInfo.info'></div></div>
        </div>
        <div class="clr"></div>
      <div class="el-dialog__header"><span class="el-dialog__title">经验值规则</span> </div>
         <div class="class_set_int">
           <div class="set_int_list">
               <h4>每日打卡</h4> 
               每天打卡赠送经验值
               <el-input v-model="expRule[0].experience_value" placeholder="" :disabled="true"></el-input> 
               ，连续打卡经验值加成
         
               <el-input v-model="expRule[1].experience_value" placeholder="" :disabled="true"></el-input> 
               ，上限
               <el-input v-model="expRule[1].experience_value_max" placeholder="" :disabled="true"></el-input> 
               经验值
        
            </div>
            <div class="set_int_list">
               <h4>作业被点赞</h4> 
               每点赞1一次获得经验值
               <el-input v-model="expRule[2].experience_value" placeholder="" :disabled="true"></el-input> 
            </div>
            <div class="set_int_list">
               <h4>作业批改打分</h4> 
               每日作业满分获得经验值
               <el-input v-model="expRule[3].experience_value" placeholder="" :disabled="true"></el-input> 
            </div>
            <div class="set_int_list" v-for="(item,index) in expRule" :key="index" v-if="index>3">
               <h4>自定义线下规则</h4> 
               <el-input v-model="expRule[index].experience_name" placeholder="" :value="0" class="experience_name" :disabled="true"></el-input>
               <el-select v-model="expRule[index].experience_method"  placeholder="请选择" class="experience_method" :disabled="true">
                <el-option :key="1" label="增加" :value="1"></el-option>
                <el-option :key="0" label="减少" :value="0"></el-option>
               </el-select>
               <el-input v-model="expRule[index].experience_value" placeholder="" :disabled="true"></el-input> 经验值   
         
            </div>




         </div>
         
    
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
 
  </div>
</el-dialog>

<el-dialog title="学员管理" :visible.sync="dialogMemberVisible" v-if="dialogMemberVisible" width="80%" :close-on-click-modal="false">
   <userManager :classManagerInfo="classManagerInfo" />
</el-dialog>

<el-dialog title="每日任务" :visible.sync="dialogTaskVisible" v-if="dialogTaskVisible" width="70%" :close-on-click-modal="false">
   <taskManager 
   :classManagerInfo="classManagerInfo" 
   :dateInfo="dateInfo"
   :dateInfoNew="dateInfoNew"
   :taskInfo="taskInfo" 
   :todaySuccessData="todaySuccessData" 
   :isEdit="isEdit"
   v-on:taskSuccess="taskSuccess" />
</el-dialog>

<el-dialog title="作业" :visible.sync="dialogWorkVisible" v-if="dialogWorkVisible" width="70%" :close-on-click-modal="false">
   <workManager :classManagerInfo="classManagerInfo" :workInfo="workInfo" />
</el-dialog>



<el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible" width="80%" :close-on-click-modal="false">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>
<div v-loading.fullscreen.lock="fullscreenLoading"></div>
</div>
</template>

<script>
import {formatDate} from '~/plugins/date.js';
import userManager from '~/components/companyManage/training/userManager';
import taskManager from '~/components/companyManage/training/taskManager';
import workManager from '~/components/companyManage/training/workManager';
import cropper from '~/components/admin/cropper';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  layout: 'companyManage',
  name: 'classManage',
  components: {
      userManager,
      taskManager,
      workManager,
      cropper
  },
  data () {
    return {   
      is_default:[{id:0,name:"不是"},{id:1,name:"是"}],
      status:[{id:0,name:"未开始"},{id:1,name:"进行中"},{id:2,name:"已结束"}],
      addInfo:{class_cover:{},class_teacher_info:{}},
      editInfo:{class_cover:{},class_teacher_info:{}},
      feedBackType:[{id:"0",name:"全部"},{id:"1",name:"软件出错"},{id:"2",name:"账号申诉"}],
      searchFilter:{training_id:'',status:''},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogMemberVisible:false,
      dialogExpVisible: false,
      dialogVisible:false,
      dialogTaskVisible:false,
      dialogWorkVisible:false,
      formLabelWidth: '120px',
      saveAction:"",
      chooseImg:null,
      classManagerInfo:{},
      editorOption:{},
      rules: {
          training_id:[{ required: true, message: '必填', trigger: 'blur' }],
          class_cover:[{ required: true, message: '必填', trigger: 'blur' }],
          class_name:[{ required: true, message: '必填', trigger: 'blur' },{validator:this.comssr.validatorLen15, trigger: 'blur'}],
          class_cover:[{ required: true, message: '必填', trigger: 'blur' }],
          class_teacher:[{ required: true, message: '必填', trigger: 'blur' }],
          teacher_tel:[{ required: true, message: '必填', trigger: 'blur' },
          {pattern: /^1[0-9]\d{9}$/, message: '请输入正确手机号'}
          ],
          status:[{ required: true, message: '必填', trigger: 'blur' }],
          is_default:[{ required: true, message: '必填', trigger: 'blur' }],
          open_class_start_time:[{ required: true, message: '必填', trigger: 'blur' }],
          open_class_end_time:[{ required: true, message: '必填', trigger: 'blur' }],
          daily_punch_start_time:[{ required: true, message: '必填', trigger: 'blur' }],
          daily_punch_end_time:[{ required: true, message: '必填', trigger: 'blur' }],
          info:[{ required: true, message: '必填', trigger: 'blur' }],
        },
       dateInfo:{},
       taskInfo:{title:"",contentArr:['']},
       workInfo:{},
       expRule:[{},{},{},{}],
       expRuleName:['每日打卡','连续打卡','点赞','作业批改打分','自定义'],
       expRuleType:[10,11,20,30,1],
       trainingInfoDic:{},
       taskSuccessData:{},
       cutPicInfo:{},
       dialogCropperVisible: false,
       todaySuccessData:{},
       fullscreenLoading:false,
       isEdit:"today",
       isClassM:false
       
       
    }
  },
  async asyncData({store}){
      let params = {url: "/company/training_class/training_class_list",data:{page:1,psize:20,search_type:1}}
      let res  = await store.dispatch("companyHttpGet",params);
      if(res.code==1) {
         res.data.data=[]
      }
 
      let tparams = {url: "/company/training_class/class_training_choose",data:{page:1,psize:100,role:1}}
      let tres  = await store.dispatch("companyHttpGet",tparams);
      if(tres.code==1) {
         tres.data=[]
      }

      let hm = {url: "/company/company_user/list",data:{page:1,psize:100,role:1}}
      let headmaster = await store.dispatch("companyHttpGet",hm);
      if(headmaster.code==1) {
         headmaster.data.data=[]
      }
 
 
      return {
        updateInfo: res.data.data,
        trainingInfo:tres.data,
        headmaster:headmaster.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:20,
          currentPage:parseInt(res.data.page),
        },
        
 
      }
  },
  methods: {
    getTchTel(){
         var _this= this;
         var  tasks = this.headmaster.filter(function(p){
            return p.id === _this.addInfo.class_teacher;
         });
         this.addInfo.teacher_tel = tasks.length>0?tasks[0].mobile:''
    },
    setClassM(val) {
      this.isClassM=val
      this.setData()

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
    async setData() {
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      this.searchFilter.search_type = this.isClassM?2:1
      let params = {url: "/company/training_class/training_class_list",data:this.searchFilter}
      let res  = await this.$store.dispatch("companyHttpGet",params);
      
      console.log(this.searchFilter)
      if(res.code==0) {
        this.updateInfo = res.data.data
        this.pageInfo.currentPage = parseInt(res.data.page)
        this.pageInfo.total = res.data.total;
      }
      else {
        this.updateInfo = []
        this.pageInfo.currentPage = 1
        this.pageInfo.total = 0
      }
      
    },
    addExp() {
      this.expRule.push({experience_type:1,experience_method:1,experience_value:0,experience_name:'自定义'})
    },
    async delExp(index){
      if(this.expRule[index].hasOwnProperty("id") ) {
        let params = {url: "/company/training_class_experience_rule/del",data:{id:this.expRule[index].id}}
        let res  = await this.$store.dispatch("companyHttpPost",params);
        console.log(res)
      }
      this.expRule.splice(index,1)
      
    },
    onEditorBlur() { //失去焦点事件

    },
    onEditorFocus() { //获得焦点事件
 
    },
    async onEditorChange() { //内容改变事件
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = this.addInfo.info.match(imgReg);
      arr = arr==null?[]:arr  
      for (var i = 0; i < arr.length; i++) {
       var src = arr[i].match(srcReg);
       //获取图片地址
       if(src[1]){
        if(src[1].indexOf('data:image')>-1) {
          let imgUrl = '/admin/images/img_loading.gif?'+i
          this.addInfo.info = this.addInfo.info.replace(src[1], imgUrl);
          let params = {url: "/common/file/add",data:{file_base64:src[1]}}
          let res  = await this.$store.dispatch("companyHttpPost",params);
          this.addInfo.info = this.addInfo.info.replace(imgUrl, res.data.file_url);
        }
       }
      }

    },
    see:async function(id) {

        this.dialogTableVisible = true
        let params = {url: "/company/training_class/training_class_info",data:{id:id}}
        let res  = await this.$store.dispatch("companyHttpGet",params);

        let paramsExp = {url: "/company/training_class_experience_rule/list",data:{training_class_id:id}}
        let rest  = await this.$store.dispatch("companyHttpGet",paramsExp);
        this.expRule = rest.data
        var num = 4-rest.data.length
        if(rest.data.length<4) { 
          for (var i=0;i<num;i++) {
            this.expRule.push({experience_value:0})
          }
        }
        
        this.editInfo = res.data
        
     },
    add:function(){
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training_class','training_class_add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.addInfo ={class_cover:{}}
        this.expRule = [{},{},{},{}]
        this.saveAction = "add"
        this.dialogFormVisible = true
     },
     async edit(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training_class','training_class_info')
        if(!checkInfo&&!this.isClassM) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.saveAction = "edit"
        this.fullscreenLoading = true;
        let params = {url: "/company/training_class/training_class_info",data:{id:id}}
        let res  = await this.$store.dispatch("companyHttpGet",params);

        let paramsExp = {url: "/company/training_class_experience_rule/list",data:{training_class_id:id}}
        let rest  = await this.$store.dispatch("companyHttpGet",paramsExp);
        console.log(rest)
        
        this.expRule = rest.data
        var num = 4-rest.data.length
        if(rest.data.length<4) { 
          for (var i=0;i<num;i++) {
            this.expRule.push({experience_value:0})
          }
        }
        
        this.addInfo = res.data;
        this.dialogFormVisible = true;
        this.fullscreenLoading = false;
        
     },
     async memberM(id,class_member,tid) {
 
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training_class_member','list')
        if(!checkInfo&&!this.isClassM) {
          this.$message({message: '警告，您无此权限',type: 'warning'});  
          return false
        }
      
        this.fullscreenLoading = true;
        this.classManagerInfo.id = id
        this.classManagerInfo.trainingId = tid
        // if(class_member == 0) {
        //   this.$message.error("该班级暂无学员");
        //   return false
        // }
       
        let params = {url: "/company/training_class_member/list",data:{training_class_id:id,page:1,psize:20}}
        let res  = await this.$store.dispatch("companyHttpGet",params);
        console.log(res)
        if(res.code==0) {
           this.$set(this.classManagerInfo,'classMember',res.data.data)
           
           for(var i in res.data.data) {
              this.$set(this.classManagerInfo.classMember[i],'trainingCount',res.data.data[i].trainging_rete.length)
              var jinduMun =0 
              for (var j in res.data.data[i].trainging_rete) {
                if(res.data.data[i].trainging_rete[j].jindu>=parseFloat(res.data.data[i].trainging_rete[j].stage_pct)) {
                  jinduMun++
                }
              }
              this.$set(this.classManagerInfo.classMember[i],'jinduMun',jinduMun)
           }
           this.$set(this.classManagerInfo,'memberPage',{
              total:res.data.total,
              pageSizes:[10, 20, 30, 400],
              pageSize:20,
              currentPage:parseInt(res.data.page),
           })
           
           
        }
        else {
          this.$set(this.classManagerInfo,'classMember',[])
          this.$set(this.classManagerInfo,'memberPage',{
              total:0,
              pageSizes:[10, 20, 30, 400],
              pageSize:20,
              currentPage:1,
           })
      
        }
        this.dialogMemberVisible = true
        this.fullscreenLoading = false;
        
     },
     toTwo(val) {
       return val.toString().length==2?val:(0+""+val)
     },
     async task(id,open_class_start_time,open_class_end_time) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.company.companyRole.data,'training_class_topic','list')
        if(!checkInfo&&!this.isClassM) {
          this.$message({message: '警告，您无此权限',type: 'warning'});  
          return false
        }
        this.fullscreenLoading = true;
       
        this.isEdit = "today"
        this.dateInfo = {}
        this.dateInfoNew = {}
        this.classManagerInfo.id = id
        let params = {url: "/company/training_class_topic/list",data:{training_class_id:this.classManagerInfo.id}}
        let res  = await this.$store.dispatch("companyHttpGet",params);
        console.log(res)
        this.classManagerInfo.taskData = res.data
        this.classManagerInfo.open_class_start_time = res.data.start_time
        this.classManagerInfo.open_class_end_time = res.data.end_time
        
        var todayPosition = 0
        var tasks = ""
        var myDate = new Date()
        var ss = this.toTwo(myDate.getDate())
        var today =  myDate.getFullYear()+"-"+this.toTwo(myDate.getMonth()+1)+"-"+myDate.getDate() 
        var today2 =  myDate.getFullYear()+"-"+this.toTwo(myDate.getMonth()+1)+"-"+ss 
        var isToday = false
        var startTime = new Date(this.classManagerInfo.open_class_start_time)
        var endTime = new Date(this.classManagerInfo.open_class_end_time)
        this.$set(this.classManagerInfo,'dateInfo',{})
        let dayNum = 0
         while((endTime.getTime()-startTime.getTime())>=0){
          var year = startTime.getFullYear();
          if(this.dateInfo[year] == undefined ) {
            this.$set(this.dateInfo,year,{})
          }
          var month = startTime.getMonth()+1;
          if(this.dateInfo[year][month] == undefined ) {
            this.$set(this.dateInfo[year],month,{})
            dayNum++
          }
          if(this.dateInfoNew[dayNum] == undefined ) {
            this.$set(this.dateInfoNew,dayNum,{})
            this.$set(this.dateInfoNew[dayNum],'year',year)
            this.$set(this.dateInfoNew[dayNum],'month',month)
            this.$set(this.dateInfoNew[dayNum],'day',{})

          }
        
          var day =  startTime.getDate();
          var week = "星期" + "日一二三四五六".charAt(startTime.getDay());

          var thisDay = new Date(year+"-"+this.toTwo(month)+"-"+this.toTwo(day)).getTime()
          var month1 = month.toString().length==2?month:(0+""+month)
          var day1 = day.toString().length==2?day:(0+""+day)
          if(thisDay == new Date(today2).getTime()) {
            
            isToday = "isToday"
          }
          else if(thisDay < new Date(today2).getTime())  {
            isToday = "isBefore"
            todayPosition = todayPosition+80
          }
          else {
             isToday = ""
          }
          tasks = this.classManagerInfo.taskData.calendar_data.filter(function(p){
            return p.date === (year+"-"+month1+"-"+day1);
          });
 
          this.$set(this.dateInfo[year][month],day,{week:week,isToday:isToday,tasks:tasks[0]})
          this.$set(this.dateInfoNew[dayNum].day,day,{week:week,isToday:isToday,tasks:tasks[0]})
          startTime.setDate(startTime.getDate()+1);

          
        }
        tasks = this.classManagerInfo.taskData.calendar_data.filter(function(p){
            return p.date === (today2);
          });
        console.log(tasks)
        this.$set(this.taskInfo,'training_class_id',this.classManagerInfo.id) 
        this.$set(this.taskInfo,'date',today2)
        if(tasks.length>0) {
          if(tasks[0].topic.content) {
            this.$set(this.taskInfo,"title",tasks[0].topic.title)
            this.$set(this.taskInfo,"contentArr",tasks[0].topic.content.split("@!@"))

            this.todaySuccessData = JSON.parse(JSON.stringify(tasks[0].topic))
            this.$set(this.todaySuccessData,"training_class_topic_id",tasks[0].topic.id)
            this.$set(this.todaySuccessData,"title",tasks[0].topic.title)
            this.$set(this.todaySuccessData,"contentArr",tasks[0].topic.content.split("@!@"))

          }
          else {
            this.$set(this.taskInfo,"title","") 
            this.$set(this.taskInfo,"contentArr",[""])
            this.$set(this.todaySuccessData,"title","") 
            this.$set(this.todaySuccessData,"contentArr",[""])
          }

        }
        else {
            this.$set(this.taskInfo,"title","") 
            this.$set(this.taskInfo,"contentArr",[""])
         

            this.$set(this.todaySuccessData,"title","") 
            this.$set(this.todaySuccessData,"contentArr",[""])
        }
     
        
        


        this.dialogTaskVisible = true
        this.fullscreenLoading = false
        // var tasks2 = this.classManagerInfo.taskData.calendar_data.filter(function(p){
        //       return p.date === today;
        //  });
        // if(tasks.length>0) {
        // this.taskSuccessData = JSON.parse(JSON.stringify(tasks2[0].topic))
        // this.$set(this.taskSuccessData,"training_class_topic_id",tasks2[0].topic.id)
        // this.$set(this.taskSuccessData,"contentArr",JSON.parse(JSON.stringify(tasks2[0].topic.content.split("@!@"))))
    
       


        this.$nextTick(() =>{
            var swiper = new Swiper('.swiper-container', {
              slidesPerView: "auto",
              spaceBetween: 0   ,
              freeMode: true,
        
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
            console.log(isToday)
            // if(isToday != "isBefore") {
            //   var todayPosition = ($(".swiper-wrapper .isToday").parent().position().left+$(".swiper-wrapper .isToday").position().left)/2+100
            // }
            // else {
            //   var todayPosition = 0
            // }
            //console.log($(".swiper-wrapper .isToday").position().left)
            todayPosition = todayPosition-560
            $(".swiper-wrapper").css("transform","translate3d(-"+todayPosition+"px, 0px, 0px)")

            $(".task_days").click(function(){
                      $(".task_days").removeClass("isToday")
                       $(this).addClass("isToday")

             }) 
            
       })
     },
     async taskSuccess(res) {
    
          this.isEdit = res.isEdit
          this.workInfo.taskSuccessData = res.taskSuccessData
          this.workInfo.taskSuccessData.page = 1
          this.workInfo.taskSuccessData.psize = 20
          this.workInfo.taskSuccessData.fraction_status = 0
          console.log(this.workInfo.taskSuccessData)
          let params = {url: "/company/training_class_task/list",data:this.workInfo.taskSuccessData}
          let result = await this.$store.dispatch("companyHttpGet",params)
   
          if(result.code==0) {
            this.$set(this.workInfo,"workMoreInfo",result.data)
            this.$set(this.workInfo,"fraction_status_false",result.data.fraction_status_false)
            this.$set(this.workInfo,"fraction_status_true",result.data.fraction_status_true)
            this.workInfo.pageInfo={
              total:result.data.total,
              pageSizes:[10, 20, 30, 400],
              pageSize:20,
              currentPage:parseInt(result.data.page),
            },
            console.log(this.workInfo)


            //this.dialogTaskVisible = false
            this.dialogWorkVisible = true
          }
          else {
            this.$message.error('当天无任务');
          }
          
          

     },
     async submit(){
      console.log(this.expRule)
      var vis = false
      for(var i in this.expRule) {
        if(this.expRule[i].experience_value === '') {
            vis = true
        } 
        if(i>=4&&this.expRule[i].experience_name === '') {
            vis = true
        } 
      }
      if(vis) {
        this.$message.error("所有经验值规则不能为空")
        return false
      }
      this.$refs['addInfo'].validate(async (valid) => {
        if (valid) {
           var submitInfo = JSON.parse(JSON.stringify(this.addInfo))
           this.$set(submitInfo,"class_cover",submitInfo.class_cover.name)
           console.log(submitInfo)
            if(!submitInfo.daily_punch_end_time || !submitInfo.daily_punch_start_time || submitInfo.daily_punch_start_time>=submitInfo.daily_punch_end_time) {
              this.$message.error("请选择正确的打卡时间");
              return false;
            }
            let params = {url: "/company/training_class/training_class_add",data:submitInfo}
            let res  = await this.$store.dispatch("companyHttpPost",params);
            console.log("fh",res)
            if(res.code==0) {
              this.dialogFormVisible = false
              this.saveExp(res.data.id)
              this.setData() 
            }
            else {
              this.$message.error("保存失败！"+res.message)
              console.log(res)
            }
   
        } else {
          this.$message.error("带*号项必填")
          return false;
        }
      });
 
      
     },
     async saveExp(id) {
        let isOk = true
        for(var i in this.expRule) {
          this.$set(this.expRule[i],'training_class_id',id)
          if(!this.expRule[i].hasOwnProperty('experience_method')) {
             this.$set(this.expRule[i],'experience_method',1)
          }
          if(!this.expRule[i].hasOwnProperty('experience_value_max')) {
            this.$set(this.expRule[i],'experience_value_max',0)
          }
          if(i<4) {
            this.$set(this.expRule[i],'experience_name',this.expRuleName[i])
            this.$set(this.expRule[i],'experience_type',this.expRuleType[i])
          }
          else {
            //this.$set(this.expRule[i],'experience_name',this.expRuleName[5])
            this.$set(this.expRule[i],'experience_type',this.expRuleType[4])
          }
          let params = {url: "/company/training_class_experience_rule/add",data:this.expRule[i]}
          let res  = await this.$store.dispatch("companyHttpPost",params);
          if(res.code!=0) {
            isOk = false
          }
        }
        if(isOk) {
          this.$message({message: '保存成功',type: 'success'});
        }
        else {
          this.$message.error("经验值部分保存失败,"+res.message)
        }
        

     },

     save:function() {
        console.log(this.addInfo)
        if(this.saveAction == "add") {
          if(this.updateInfo.length>=this.pageInfo.pageSize) {
            this.updateInfo.pop();
          }
           this.updateInfo.unshift(this.addInfo)
           this.pageInfo.total++
        }
        if(this.saveAction == "edit") {
          this.updateInfo[this.choose] = this.addInfo

        }
        this.dialogFormVisible = false
     },
    handleSizeChange(val) {
 
  
      this.$set(this.pageInfo,'pageSize',val)
      this.setData()
    },
    handleCurrentChange(val) {
 
      this.$set(this.pageInfo,'currentPage',val)
      this.setData()
    },
    sortByKey: function(array, key) { //(数组、排序的列)

      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })

    }, 
    setChooseImg:function(field) {
       this.chooseImg = field;
       console.log(field);
    },
    handleAvatarSuccess(res, file,fileList) {
       this.$set(this.addInfo.class_cover,"name",file.response.data.filename)
       this.$set(this.addInfo.class_cover,"value",file.response.data.file_url)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    setSortUp:function(index){
      let t = this.updateInfo[index].sort;
      this.updateInfo[index].sort = this.updateInfo[index-1].sort;
      this.updateInfo[index-1].sort = t;   
    },
    setSortDown:function(index){
      let t = this.updateInfo[index].sort;
      this.updateInfo[index].sort = this.updateInfo[index+1].sort;
      this.updateInfo[index+1].sort = t;   
    },

 
  },
  computed:{
    sortUpdateInfo:function(){
       return this.sortByKey(this.updateInfo,'sort');
    }
  },
  mounted () {
    for(var i in this.trainingInfo) {
      this.trainingInfoDic[this.trainingInfo[i].id] = JSON.parse(JSON.stringify(this.trainingInfo[i].training_name))
    }
 
  },
  head () {
    return {
      title: "班级管理",
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

