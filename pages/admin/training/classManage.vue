<template>
<div class="app_update">
   <div class="base_body">
     <div class="base_title">
       <div class="title">
          班级管理
       </div>
     
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="班级名称" label-width="80px">
            <el-input v-model="searchFilter.class_name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属训练营" label-width="90px">
              <el-select v-model="searchFilter.training_id" placeholder="请选择">
                  <el-option
                    v-for="item in trainingInfo"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
           <el-form-item label="班级状态" label-width="80px">
              <el-select v-model="searchFilter.status" placeholder="请选择">
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>

        <el-form-item label="只显示星标班级" label-width="110px">
              <el-select v-model="searchFilter.is_default" placeholder="请选择">
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
        </el-form-item>
  
 


      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">添加</el-button>
          <el-button   @click="search()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form> 
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">班级封面</th>
          <th width="12%">班级名称</th>
          <th width="8%">所属训练营</th>
          <th width="8%">学员数量</th>
          <th width="8%">班主任</th>
          <th width="8%">班级状态</th>
          <th width="20%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><div class="head_img"><img :src="vo.class_cover.value" /></div></td>
          <td><div v-if="vo.is_default==1" class="star">★</div>{{vo.class_name}}</td>
          <td>{{vo.training.training_name}}</td>
          <td>{{vo.class_member}}</td>
          <td>{{vo.class_teacher}}</td>
          <td><div v-if="vo.status==1">进行中</div><div v-else>已结束</div></td>
          <td>
            <div class="btn_setting" v-on:click="edit(vo.id)">编辑</div>
            <div class="btn_see" v-on:click="see(index)">查看</div>
            <div class="btn_setting" v-on:click="task(vo.id,vo.open_class_start_time,vo.open_class_end_time)">每日任务</div>
            <div class="btn_setting" v-on:click="memberM(vo.id)">学员管理</div>
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


<el-dialog :title="(saveAction=='edit'?'编辑':'添加')+'班级'" :visible.sync="dialogFormVisible">
  <el-form :model="addInfo" :rules="rules" ref="addInfo">
    <el-form-item label="班级名称" :label-width="formLabelWidth" prop="class_name">
       <el-input v-model="addInfo.class_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属训练营" :label-width="formLabelWidth" prop="training_id">
       <el-select v-model="addInfo.training_id" placeholder="请选择"  >
        <el-option
          v-for="it in trainingInfo"
          :key="it.id"
          :label="it.training_name"
          :value="it.id">
        </el-option>
      </el-select>
    </el-form-item>
   <el-form-item label="班级封面" :label-width="formLabelWidth"  prop="class_cover">
       <el-upload
        :action="$store.state.admin.fileAddUrl"
        :headers="{token:$store.state.admin.token}"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" >
        <img v-if="addInfo.class_cover.value" :src="addInfo.class_cover.value" class="avatar"  >
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="班主任" :label-width="formLabelWidth"  prop="class_teacher">
       <el-input v-model="addInfo.class_teacher" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="班主任电话" :label-width="formLabelWidth"  prop="teacher_tel">
       <el-input v-model="addInfo.teacher_tel" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="开班时间" :label-width="formLabelWidth" prop="open_class_start_time">
            <el-date-picker
      v-model="addInfo.open_class_start_time"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="addInfo.open_class_end_time"
      type="date"
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

    <el-form-item label="班级状态" :label-width="formLabelWidth"  prop="status">
       <el-select v-model="addInfo.status" placeholder="请选择"  >
        <el-option
          v-for="it in status"
          :key="it.id"
          :label="it.name"
          :value="it.id">
        </el-option>
      </el-select>
    </el-form-item>  
      <div class="el-dialog__header"><span class="el-dialog__title">班级介绍</span> </div>

      <el-form-item label="" label-width="100px"  prop="content"  >
              <quill-editor 
              v-model="addInfo.content" 
              ref="myQuillEditor" 
              :options="editorOption" 
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
              </quill-editor>
      </el-form-item>
     <div class="el-dialog__header"><span class="el-dialog__title">经验值规则</span> </div>



  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="班级信息" :visible.sync="dialogTableVisible">
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="学员管理" :visible.sync="dialogMemberVisible" width="80%">
   <userManager :classManagerInfo="classManagerInfo" />
</el-dialog>

<el-dialog title="每日任务" :visible.sync="dialogTaskVisible" width="70%">
   <taskManager :classManagerInfo="classManagerInfo" :dateInfo="dateInfo" :taskInfo="taskInfo" v-on:taskSuccess="taskSuccess" />
</el-dialog>

<el-dialog title="作业" :visible.sync="dialogWorkVisible" width="70%">
   <workManager :classManagerInfo="classManagerInfo" :workInfo="workInfo" />
</el-dialog>

<el-dialog title="班级学员信息" :visible.sync="dialogVisible">
   <div class="base_body"> 
   </div>
</el-dialog>



</div>
</template>

<script>
import {formatDate} from '~/plugins/date.js';
import userManager from '~/components/admin/training/userManager';
import taskManager from '~/components/admin/training/taskManager';
import workManager from '~/components/admin/training/workManager';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      userManager,
      taskManager,
      workManager
  },
  data () {
    return {   
      is_default:[{id:0,name:"未标星"},{id:1,name:"标星"}],
      status:[{id:1,name:"在进行中"},{id:2,name:"已结束"}],
      addInfo:{class_cover:{}},
      feedBackType:[{id:"0",name:"全部"},{id:"1",name:"软件出错"},{id:"2",name:"账号申诉"}],
      searchFilter:{},    
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
          class_cover:[{ required: true, message: '必填', trigger: 'blur' }],
          class_name:[{ required: true, message: '必填', trigger: 'blur' }],
          class_cover:[{ required: true, message: '必填', trigger: 'blur' }],
          class_teacher:[{ required: true, message: '必填', trigger: 'blur' }],
          teacher_tel:[{ required: true, message: '必填', trigger: 'blur' }],
          status:[{ required: true, message: '必填', trigger: 'blur' }],
          is_default:[{ required: true, message: '必填', trigger: 'blur' }],
          open_class_start_time:[{ required: true, message: '必填', trigger: 'blur' }],
          open_class_end_time:[{ required: true, message: '必填', trigger: 'blur' }],
          daily_punch_start_time:[{ required: true, message: '必填', trigger: 'blur' }],
          daily_punch_end_time:[{ required: true, message: '必填', trigger: 'blur' }],
       },
       dateInfo:{},
       taskInfo:{title:"",contentArr:['']},
       workInfo:{}
       
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/training_class/training_class_list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);

      let tparams = {url: "/manage/training/training_list",data:{page:1,psize:10}}
      let tres  = await store.dispatch("adminHttpGet",tparams);
 
      return {
        updateInfo: res.data.data,
        trainingInfo:tres.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        },
        
 
      }
  },
  methods: {
    onEditorBlur() { //失去焦点事件

    },
    onEditorFocus() { //获得焦点事件
 
    },
    onEditorChange() { //内容改变事件

    },
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        console.log(this.addInfo);
        this.dialogTableVisible = true;
     },
    add:function(){
        this.addInfo ={}
        this.saveAction = "add"
        this.dialogFormVisible = true
     },
     async edit(id) {
        let params = {url: "/manage/training_class/training_class_info",data:{id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        console.log(res)
        
        this.addInfo = res.data;
        this.dialogFormVisible = true;
     },
     memberM(id) {
        this.classManagerInfo.id = id
        this.dialogMemberVisible = true
     },
     toTwo(val) {
       return val.toString().length==2?val:(0+""+val)
     },
     async task(id,open_class_start_time,open_class_end_time) {
        this.dateInfo = {}
        this.classManagerInfo.id = id
        let params = {url: "/manage/training_class_topic/list",data:{training_class_id:this.classManagerInfo.id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        console.log(res)
        this.classManagerInfo.taskData = res.data
        this.classManagerInfo.open_class_start_time = res.data.start_time
        this.classManagerInfo.open_class_end_time = res.data.end_time
        

        var tasks = ""
        var myDate = new Date()
        var ss = this.toTwo(myDate.getDate())
        var today =  myDate.getFullYear()+"-"+this.toTwo(myDate.getMonth()+1)+"-"+myDate.getDate() 
        var today2 =  myDate.getFullYear()+"-"+this.toTwo(myDate.getMonth()+1)+"-"+ss 
        var isToday = false
        var startTime = new Date(this.classManagerInfo.open_class_start_time)
        var endTime = new Date(this.classManagerInfo.open_class_end_time)
        this.$set(this.classManagerInfo,'dateInfo',{})
         while((endTime.getTime()-startTime.getTime())>=0){
          var year = startTime.getFullYear();
          if(this.dateInfo[year] == undefined ) {
            this.$set(this.dateInfo,year,{})
          }
          var month = startTime.getMonth()+1;
          if(this.dateInfo[year][month] == undefined ) {
            this.$set(this.dateInfo[year],month,{})
          }
        
          var day =  startTime.getDate();
          var week = "星期" + "日一二三四五六".charAt(startTime.getDay());

          
          var thisDay = new Date(year+"-"+this.toTwo(month)+"-"+this.toTwo(day)).getTime()
          var month1 = month.toString().length==2?month:(0+""+month)
          var day1 = day.toString().length==2?day:(0+""+day)
          if(thisDay == new Date(today).getTime()) {
  
            isToday = "isToday"
          }
          else if(thisDay < new Date(today).getTime())  {
            isToday = "isBefore"
          }
          else {
             isToday = ""
          }
          tasks = this.classManagerInfo.taskData.calendar_data.filter(function(p){
            return p.date === (year+"-"+month1+"-"+day1);
          });
 
          this.$set(this.dateInfo[year][month],day,{week:week,isToday:isToday,tasks:tasks[0]})
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
          this.$set(this.taskInfo,"contentArr",tasks[0].topic.content.split(","))
          }
          else {
          this.$set(this.taskInfo,"title","") 
          this.$set(this.taskInfo,"contentArr",[""])
          }

        }
        
        


        this.dialogTaskVisible = true

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
            if(isToday != "isBefore") {
              var todayPosition = ($(".swiper-wrapper .isToday").parent().position().left+$(".swiper-wrapper .isToday").position().left)/2+100
            }
            else {
              var todayPosition = 0
            }
            console.log(todayPosition)

            $(".swiper-wrapper").css("transform","translate3d(-"+todayPosition+"px, 0px, 0px)")
            $(".task_days").click(function(){
                      $(".task_days").removeClass("isToday")
                       $(this).addClass("isToday")

             }) 
            
       })
     },
     async taskSuccess(res) {
    
          
          this.workInfo.taskSuccessData = res.taskSuccessData
          this.workInfo.taskSuccessData.page = 1
          this.workInfo.taskSuccessData.psize = 10
          this.workInfo.taskSuccessData.fraction_status = 0
          console.log(this.workInfo.taskSuccessData)
          let params = {url: "/manage/training_class_task/list",data:this.workInfo.taskSuccessData}
          let result = await this.$store.dispatch("adminHttpGet",params)
   
          if(result.code==0) {
            this.$set(this.workInfo,"workMoreInfo",result.data)
            
            this.workInfo.pageInfo={
              total:result.data.total,
              pageSizes:[10, 20, 30, 400],
              pageSize:10,
              currentPage:parseInt(result.data.page),
            },
console.log(this.workInfo)

            this.dialogTaskVisible = false
            this.dialogWorkVisible = true
          }
          else {
            this.$message.error('当天无任务');
          }
          
          

     },
     async submit(){
      this.$refs['addInfo'].validate(async (valid) => {
        if (valid) {
           var submitInfo = JSON.parse(JSON.stringify(this.addInfo))
           this.$set(submitInfo,"class_cover",submitInfo.class_cover.name)
           console.log(submitInfo)
            let params = {url: "/manage/training_class/training_class_add",data:this.addInfo}
            let res  = await this.$store.dispatch("adminHttpPost",params);
            console.log(res)
   
        } else {
          console.log('error submit!!');
          return false;
        }
      });
 
      
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
 
  },
   head () {
    return {
      title: "机构",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
      
    }
  }
}
</script>

