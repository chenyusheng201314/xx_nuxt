<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          导师
       </div>
     
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="导师姓名" label-width="80px">
            <el-input v-model="searchFilter.realname" auto-complete="off" clearable></el-input>
          </el-form-item>
 
          <el-form-item label="所属机构" label-width="80px">
              <el-select v-model="searchFilter.organization_id" placeholder="请选择" clearable>
                  <el-option  label="全部"  value=""></el-option>
                  <el-option
                    v-for="item in orgInfo"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
           <el-form-item label="账号状态" label-width="80px">
              <el-select v-model="searchFilter.status" placeholder="请选择" clearable>
                <el-option  label="全部"  value=""></el-option>
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>

          <el-form-item label="入驻日期" label-width="80px">
            <el-date-picker
      v-model="searchFilter.register_start_time"
      type="date"
      value-format = "yyyy-MM-dd 00:00:00"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.register_end_time"
      type="date"
      value-format = "yyyy-MM-dd 23:59:59"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="addTch()" class="btn_create">添加导师</el-button>
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="5%">序号</th>
          <th width="5%">导师图片</th>
          <th width="5%">导师姓名</th>
          <th width="8%">所属机构</th>
          <th width="8%">入驻日期</th>
          <th width="8%">拥有课程数</th>
          <th width="8%">相关案例</th>
          <th width="8%">粉丝数</th>
          <th width="8%">状态</th>
          <th width="10%">操作</th>
          <th width="8%">排序</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><img :src="vo.photo_small.value" style="height:50px; margin:2px 0"  /></td>
          <td>{{vo.realname}}</td>
          <td>{{vo.organization.title}}</td>
          <td>{{vo.created_at|y-m-d}}</td>
          <td v-on:click="getC(vo.id,1)">{{vo.course_count}}</td>
          <td>{{vo.organization_cases_count}}</td>
          <td>{{vo.follow_count}}</td>
          <td><div v-if="vo.status == 1">正常</div><div v-else>冻结</div></td>
          <td><span class="btn_setting" v-on:click="edit(vo.id)">编辑</span><span class="btn_see" v-on:click="see(vo.id)">查看</span></td>
          <td>
             <img src="/admin/images/app_index_up.png" class="btn_sort" v-on:click="setSortUp(index)" v-if="index!=0"  /> 
             <img src="/admin/images/app_index_down.png" class="btn_sort" v-on:click="setSortDown(index)" v-if="updateInfo.length!=(index+1)" />
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


<el-dialog :title="(saveAction=='edit'?'编辑':'添加')+'导师'" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :close-on-click-modal="false">
 
  <el-form :model="addInfo" :rules="rules" ref="addInfo">
      <el-form-item label="导师姓名" :label-width="formLabelWidth" prop="realname">
        <el-input v-model="addInfo.realname" auto-complete="off"  ></el-input>
      </el-form-item>
      <el-form-item label="导师头衔" :label-width="formLabelWidth" prop="title">
        <el-input v-model="addInfo.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="导师英文名" :label-width="formLabelWidth" prop="realname_en">
        <el-input v-model="addInfo.realname_en" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属机构" :label-width="formLabelWidth"  prop="organization_id">
       
        <el-select v-model="addInfo.organization_id" :disabled ="saveAction == 'edit'?true:false"  placeholder="请选择" >
           <el-option
          v-for="it in orgInfo"
          :key="it.id"
          :label="it.title"
          :value="it.id">
        </el-option>
        
        </el-select>
         
      </el-form-item>
 
     <el-form-item label="导师状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="addInfo.status" placeholder="请选择" :disabled ="addInfo.organization.status === 0?true:false">
           <el-option
          v-for="it in status"
          :key="it.id"
          :label="it.title"
          :value="it.id">
        </el-option>
        
        </el-select>
         
      </el-form-item>
 
      <el-form-item label="导师小图" :label-width="formLabelWidth" prop="photo_small.value" :rules="[{required: true, message: '必填', trigger:'blur' }]">
   
              <img v-if="addInfo.photo_small.value" :src="addInfo.photo_small.value" class="avatar" style="width:216px;height: 312px;" v-on:click="cut_pic('photo_small',432,624)">
              <div class="cut_pic_add" v-else v-on:click="cut_pic('photo_small',432,624)"><i>+</i></div>
     
      </el-form-item>
 
  
 
      <el-form-item label="导师大图" :label-width="formLabelWidth" prop="photo_big.value"  :rules="[{required: true, message: '必填', trigger:'blur' }]">
           <div v-on:click="cut_pic('photo_big',870,1160)" >
              <img v-if="addInfo.photo_big.value" :src="addInfo.photo_big.value" class="avatar" style="width:216px;height: 312px;">
              <div class="cut_pic_add" v-else><i>+</i></div>
         </div>
      </el-form-item>
 
   

       <div v-for = "(item,index) in addInfo.tagsArr" :key="index" style="position:relative;" >
        <el-form-item  
                :label="(index==0)?'导师标签':''" 
                :label-width="formLabelWidth"  
                :prop="'tagsArr['+index+']'" 
                :rules="[{required: true, message: '必填', trigger:'blur' },{validator:comssr.validatorLen10, trigger: 'blur'}]">
            <el-input v-model="addInfo.tagsArr[index]" auto-complete="off"></el-input>
          </el-form-item>
           <div class="add_info_more_del" v-on:click="descDel(index)" v-if="addInfo.tagsArr.length>4">×</div>
        </div>
 <div v-on:click="addNew()" class="base_btn_add" style="float: left; margin-left: 120px; margin-bottom: 20px;" v-if="addInfo.tagsArr.length<8"><img src="/admin/images/app_index_add.png"> 增加</div>

<div class="clr"></div>



      <el-form-item label="导师简介" :label-width="formLabelWidth" prop="introduction">
        <el-input v-model="addInfo.introduction" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="导师擅长领域" :label-width="formLabelWidth" prop="areas_of_expertise">
        <el-input v-model="addInfo.areas_of_expertise" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="授课风格" :label-width="formLabelWidth" prop="teaching_style">
        <el-input v-model="addInfo.teaching_style" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="导师详情--APP端" :label-width="formLabelWidth">
 
        <quill-editor 
          v-model="addInfo.details_app" 
          ref="myQuillEditor" 
          
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange('details_app',$event)"   >
      </quill-editor>
      </el-form-item>
      <el-form-item label="导师详情--PC端" :label-width="formLabelWidth">
        <quill-editor 
          v-model="addInfo.details_web" 
          ref="myQuillEditor" 
          
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange('details_web',$event)" >
      </quill-editor>
      </el-form-item>
      <el-form-item label="参与项目" :label-width="formLabelWidth">
          <div class="select_case" v-on:click='selectCase()'>
            <span>+</span>
         </div> 
 
         <div class="select_case_info" v-for="(item,index) in addInfo.organization_teacher_cases" :key="index">
             <div class="add_info_more_del" v-on:click="delCaseData(item.id,index)">×</div>
             <div class="img"><img :src="item.organization_small_logo.value" /></div>
         </div> 
      </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('addInfo')">确 定</el-button>
  </div>
  <el-dialog
      width="80%"
      title="选择参与项目"
      :visible.sync="caseVisible"
      append-to-body>
      <selectCase 
      :caseInfo="caseInfo"
      :ids="ids"
      v-on:selectSuccess="selectSuccess"  />
  </el-dialog>
  

</el-dialog>


<el-dialog title="查看" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
  <el-form :model="detailsInfo"  ref="detailsInfo">
      <el-form-item label="导师姓名" :label-width="formLabelWidth" prop="realname" >
        {{detailsInfo.realname}}
      </el-form-item>
      <el-form-item label="导师头衔" :label-width="formLabelWidth" prop="title"  >
        {{detailsInfo.title}}
      </el-form-item>
      <el-form-item label="导师英文名" :label-width="formLabelWidth" prop="realname_en" >
        {{detailsInfo.realname_en}}
      </el-form-item>
      <el-form-item label="所属机构" :label-width="formLabelWidth"  prop="organization_id">
        {{detailsInfo.organization.title}} 
      </el-form-item>
    
     <el-form-item label="导师状态" :label-width="formLabelWidth" prop="status">
         <div v-if="detailsInfo.status == 1">正常</div><div v-else>冻结</div>
      </el-form-item>
      <el-form-item label="导师小图" :label-width="formLabelWidth" prop="photo_small">
         <img :src="detailsInfo.photo_small.value"/>   
      </el-form-item>
      <el-form-item label="导师大图" :label-width="formLabelWidth" prop="photo_big">
         <img :src="detailsInfo.photo_big.value"/>   
      </el-form-item>
      <el-form-item label="导师标签" :label-width="formLabelWidth" prop="tags"  >
        {{detailsInfo.tags}}
      </el-form-item>
      <el-form-item label="导师简介" :label-width="formLabelWidth" prop="introduction">
        {{detailsInfo.introduction}}
      </el-form-item>
      <el-form-item label="导师擅长领域" :label-width="formLabelWidth" prop="areas_of_expertise"  >
        {{detailsInfo.areas_of_expertise}}
      </el-form-item>

      <el-form-item label="授课风格" :label-width="formLabelWidth">
        {{detailsInfo.teaching_style}}
      </el-form-item>
      <el-form-item label="导师详情--APP端" :label-width="formLabelWidth" >
            <div class="ql-editor" v-html="detailsInfo.details_app"></div>
      </el-form-item>
      <el-form-item label="导师详情--PC端" :label-width="formLabelWidth">
           <div class="ql-editor" v-html="detailsInfo.details_web"></div>
      </el-form-item>
      <el-form-item label="参与项目" :label-width="formLabelWidth">
          <div class="select_case_info" v-for="(item,index) in detailsInfo.organization_teacher_cases" :key="index">
             <div class="img"><img :src="item.organization_small_logo.value" /></div>
         </div> 
      </el-form-item>
  
  </el-form>
 
</el-dialog>

<el-dialog title="课程" :visible.sync="dialogCVisible" v-if="dialogCVisible" :close-on-click-modal="false" width="60%">
<div class="base_body">
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilterC" class="demo-form-inline">
          <el-form-item label="课程分类" label-width="80px">
              <el-select v-model="searchFilterC.first_sort_id" clearable placeholder="请选择" @change="setScond">
                  <el-option
                    v-for="item in first_sort"
                    :key="item.id"
                    :label="item.sort_name"
                    :value="item.id">
                  </el-option>
               </el-select>
               <el-select v-model="searchFilterC.second_sort_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in second_sort"
                    :key="item.id"
                    :label="item.sort_name"
                    :value="item.id">
                  </el-option>
               </el-select>
          </el-form-item>
         <el-form-item label="课程名称" label-width="80px">
            <el-input v-model="searchFilterC.course_name" clearable auto-complete="off"></el-input>
          </el-form-item>
          
       
          <el-form-item label="参与活动" label-width="80px">
              <el-select v-model="searchFilterC.activity_type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in activity"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>


     
          
 

      <el-form-item class="fRight">
 
          <el-button   @click="getC(searchFilterC.teacher_id,1)" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
    
   
     <div class="table-responsive">
      
       <table class="table">
         <tbody>
         <tr>
          <th width="8%"> 序号</th>
          <th width="8%">课程封面图</th>
          <th width="15%">视频名称</th>
          <th width="8%">主讲导师</th>
          <th width="15%">单价（学币）</th>
          <th width="8%">参与活动</th>
          <th width="8%">上架状态</th>
        </tr>
      
        <tr v-for="(vo, index) in cInfo" :key="index">
          <td>{{index+1}}</td>
          <td><img :src="vo.cover.value" v-if="vo.cover" style="width:50px" /></td>
          <td>{{vo.course_name}}</td>
          <td>{{vo.organization_teacher?vo.organization_teacher.realname:"--"}}</td>
          <td>{{vo.price}}</td>  
          <td>{{vo.is_activity}}</td>
          <td>{{vo.status==1?"上架":"下架"}}</td>       
        </tr>
      
        
        </tbody>
      </table>
   
    </div>
      
    <div class="page">
    <el-pagination
      @size-change="handleSizeChangeC"
      @current-change="handleCurrentChangeC"
      :current-page="pageInfoC.currentPage"
      :page-sizes="pageInfoC.pageSizes"
      :page-size="pageInfoC.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfoC.total">
    </el-pagination>
    </div>
     <div class="clr"></div>
 
</div>
</el-dialog>

<el-dialog title="图片裁剪" :visible.sync="dialogCropperVisible" v-if="dialogCropperVisible" width="80%" :close-on-click-modal="false">
   <cropper 
     :cutPicInfo = "cutPicInfo"
     v-on:cutPicSuccess="cutPicSuccess"/>
</el-dialog>
 
</div>
</template>

<script>
import selectCase from '~/components/admin/orgAndTch/selectCase';
import cropper from '~/components/admin/cropper';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      selectCase,
      cropper
  },
  data () {
 
    return {
      rules: {
          realname:[
          { required: true, message: '必填', trigger: 'blur' },
           {validator:this.comssr.validatorLen10, trigger: 'blur'}
          ],
          title: [{ required: true, message: '必填', trigger: 'blur' },
          {validator:this.comssr.validatorLen10, trigger: 'blur'}],
          realname_en:[{ required: true, message: '必填', trigger: 'blur' },{validator:this.comssr.validatorLen10, trigger: 'blur'}],
          photo_small: [{ required: true, message: '必填', trigger: 'blur' }],
          photo_big:[{ required: true, message: '必填', trigger: 'blur' }],
          photo_big: [{ required: true, message: '必填', trigger: 'blur' }],
          organization_id:[{ required: true, message: '必填', trigger: 'blur' }],
          introduction: [{ required: true, message: '必填', trigger: 'blur' },
          {validator:this.comssr.validatorLen100, trigger: 'blur'}],
          areas_of_expertise: [
          { required: true, message: '必填', trigger: 'blur' },
           {validator:this.comssr.validatorLen100, trigger: 'blur'}
          ],
          tags:[{ required: true, message: '必填', trigger: 'blur' }],
          teaching_style: [{validator:this.comssr.validatorLen100, trigger: 'blur'}],
          details_app: [{ required: true, message: '必填', trigger: 'blur' }],
          details_web: [{ required: true, message: '必填', trigger: 'blur' }],
          status: [{ required: true, message: '必填', trigger: 'blur' }],
          organization_cases_ids: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      addInfo:{photo_small:{url:""},photo_big:{url:""},organization:{},tagsArr:["","","",""],status:1},   
      status:[{id:1,title:"正常"},{id:0,title:"冻结"}], 
      searchFilter:{organization_id:'',status:''},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogCropperVisible:false,
      formLabelWidth: '130px',
      saveAction:"",
      fullscreenLoading:false,
      cImg:null,
      caseVisible:false,
      caseInfo:{},
      caseData:[],
      ids:[],
      isSelectd:[],
      aspectRatio:1,
      cutPicDic:"",
      detailsInfo:{realname:"",photo_small:{url:""},photo_big:{url:""},organization:{}}, 
      cutPicInfo:{},
      cInfo:[],
      pageInfoC:{
          total:100,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:1,
      },
      dialogCVisible: false,
      searchFilterC:{},
      first_sort:[],
      second_sort:[],
      activity:[{id:1,title:'精品课程'},{id:2,title:'最新课程'},{id:3,title:'买一赠一'},{id:4,title:'折扣活动'},{id:5,title:'限时免费'},{id:6,title:'积分购'}],
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/organization_teacher/list",data:{page:1,psize:20}}
      let res  = await store.dispatch("adminHttpGet",params);
      let paramsOrg = {url: "/manage/organization/list",data:{status:1,role:1,page:1,psize:100}}
      let resOrg  = await store.dispatch("adminHttpGet",paramsOrg);
      return {
        updateInfo: res.data.data,
        orgInfo:resOrg.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:20,
          currentPage:parseInt(res.data.page),
        },
      }
  },
  async created() {
        let paramsFirst = {url: "/manage/manage_course/course_sort_list",data:{role:1}}
        let resFirst = await this.$store.dispatch("adminHttpGet",paramsFirst);
        this.first_sort = resFirst.data
  },
  methods: {
    async getC(id,x=0) {

      this.dialogCVisible = true
      this.searchFilterC.teacher_id = id
      this.searchFilterC.page = x!=0?x:this.pageInfoC.currentPage;
      this.searchFilterC.psize = this.pageInfoC.pageSize;
      this.searchFilterC.status = 1
      this.searchFilterC.role = 1
      let params = {url: "/manage/manage_course/course_list",data:this.searchFilterC}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfoC.currentPage = parseInt(res.data.page);
      this.pageInfoC.total = res.data.total;
      this.cInfo = res.data.data

    },
    handleSizeChangeC(val) {
      this.pageInfoC.pageSize = val;
      this.getC(this.searchFilterTch.teacher_id)
    },
    handleCurrentChangeC(val) {
      this.pageInfoC.currentPage = val;
      this.getC(this.searchFilterTch.teacher_id)
    },
    addNew() {
      this.addInfo.tagsArr.push("")
    },
    descDel(index) {
      this.addInfo.tagsArr.splice(index,1)
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
    async selectCase() {
      
      let params = {url: "/manage/organization_cases/list",data:{page:1,psize:8}}
      let res  = await this.$store.dispatch("adminHttpGet",params);

      this.$set(this.caseInfo,'pageInfo',{
          total:res.data.total,
          pageSizes:[8,10, 20, 30, 40],
          pageSize:8,
          currentPage:1,
      })
      this.$set(this.caseInfo,'data',res.data.data)
      if(this.addInfo.organization_cases_ids === "") {
        this.ids=[]
      }
      else {
        this.ids = this.addInfo.organization_cases_ids.split(',')
        this.ids = this.ids.map(Number)
      }
      
 
      for(var i in this.caseInfo.data) {
        var ints = this.ids.indexOf(this.caseInfo.data[i].id)
        if(ints > -1) {
            this.$set(this.caseInfo.data[i],'isSelectd','isSelectd')
        }
        else {
           this.$set(this.caseInfo.data[i],'isSelectd','')
        }      
      }
  
      this.caseVisible = true

    },
    async selectSuccess(res) {
        this.caseVisible = res.visible;
        this.$set(this.addInfo,'organization_cases_ids',res.ids.join(','))
        let params = {url: "/manage/organization_cases/show",data:{ids:this.addInfo.organization_cases_ids}}
        let rest  = await this.$store.dispatch("adminHttpGet",params);

        this.$set(this.addInfo,'organization_teacher_cases',rest.data)
 

    },
    delCaseData(id,index){
       var ids = this.addInfo.organization_cases_ids.split(',')
       ids.splice(ids.indexOf(id),1)
       this.$set(this.addInfo,'organization_cases_ids',ids.join(','))
       this.addInfo.organization_teacher_cases.splice(index,1)
       console.log(this.addInfo.organization_cases_ids)
    },

    onEditorBlur() { //失去焦点事件
    },
    onEditorFocus() { //获得焦点事件
    },
    async onEditorChange(val,e) { //内容改变事件



      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = this.addInfo[val].match(imgReg);
      arr = arr==null?[]:arr  
      for (var i = 0; i < arr.length; i++) {
       var src = arr[i].match(srcReg);
       //获取图片地址
       if(src[1]){
        if(src[1].indexOf('data:image')>-1) {
          let imgUrl = '/admin/images/img_loading.gif?'+i
          this.addInfo[val] = this.addInfo[val].replace(src[1], imgUrl);
          let params = {url: "/common/file/add",data:{file_base64:src[1]}}
          let res  = await this.$store.dispatch("adminHttpPost",params);
          this.addInfo[val] = this.addInfo[val].replace(imgUrl, res.data.file_url);
        }
       }
      }

 
    },
    see:async function(id) {
      let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'organization_teacher','show')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        let params = {url: "/manage/organization_teacher/show",data:{id:id}}
        let rest  = await this.$store.dispatch("adminHttpGet",params);
        this.detailsInfo = rest.data;
        var tag = []
        for (var i in rest.data.organization_teacher_tags) {
          tag[i] = rest.data.organization_teacher_tags[i].name
        }
        this.$set(this.detailsInfo,'tags',tag.join(','))

        this.dialogTableVisible = true;
     },
    addTch:function(){
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'organization_teacher','add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.ids =[]
        this.addInfo = {photo_small:{url:""},photo_big:{url:""},organization_cases_ids:"",organization:{},tagsArr:["","","",""],status:1}
        this.saveAction = "add"
        this.dialogFormVisible = true
 
     },
     edit:async function(id) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'organization_teacher','add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.saveAction = "edit"

        let params = {url: "/manage/organization_teacher/show",data:{id:id,role:1}}
        let rest  = await this.$store.dispatch("adminHttpGet",params);
        this.addInfo = rest.data;
        console.log(rest.data)
        var ids = []
        for (var i in rest.data.organization_teacher_cases) {
          ids[i] = rest.data.organization_teacher_cases[i].id
        }
        var tag = []
        for (var i in rest.data.organization_teacher_tags) {
          tag[i] = rest.data.organization_teacher_tags[i].name
        }
        this.$set(this.addInfo,'organization_cases_ids',ids.join(','))
        this.$set(this.addInfo,'tags',tag.join(','))
        this.$set(this.addInfo,'tagsArr',tag)
        this.dialogFormVisible = true;
 
     },
    submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
     },
 
     async update() {
        console.log(this.addInfo)
        var submitInfo = JSON.parse(JSON.stringify(this.addInfo))
        this.$set(submitInfo,'tags',submitInfo.tagsArr.join(",")) 
        this.$set(submitInfo,"photo_small",this.addInfo.photo_small.name)
        this.$set(submitInfo,"photo_big",this.addInfo.photo_big.name)
        let params = {url: "/manage/organization_teacher/add",data:submitInfo}
        let res  = await this.$store.dispatch("adminHttpPost",params);
        if(res.code == 0) {
          this.$message({message: '保存成功',type: 'success'});

        }
        else {
          this.$message.error('保存失败,'+res.message);
        }
 
        this.searchFilter = {}
        this.setData();
        this.dialogFormVisible = false
     },
     setImg(cimg){
        this.cImg = cimg
        console.log(cimg)
     },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
       this.pageInfo.currentPage = val;
      this.setData()
    },
 
    handleAvatarSuccess(res, file,fileList) {
       console.log(this.cImg)
      this.$set(this.addInfo[this.cImg],"value",file.response.data.file_url)
      this.$set(this.addInfo[this.cImg],"name",file.response.data.filename)
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
    async setSortUp(index){
      let res = await this.setSort(this.updateInfo[index].id,"top");
      if(res.code==0) {
        this.fullscreenLoading = false;
        this.setData()
      
      }
      
 
    },
    async setSortDown(index){
      let res = await this.setSort(this.updateInfo[index].id,"down")
      if(res.code==0) {
        this.fullscreenLoading = false;
        this.setData()
      }
      
    },
    async setSort(id,type) {
       this.fullscreenLoading = true;
       let params = {url: "/manage/organization_teacher/order",data:{id:id,type:type}}
       let res  = await this.$store.dispatch("adminHttpPost",params);
       console.log(res,id)
       return res;
    },
    async setData(x=0) {

      this.searchFilter.page = x!=0?x:this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/organization_teacher/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);

      this.pageInfo.currentPage = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
    },
 
  },
  computed:{
    sortUpdateInfo:function(){
       return this.sortByKey(this.updateInfo,'sort');
    }
  },
  mounted () {
 
  },
  watch: {
 
  
  },
   head () {
    return {
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

