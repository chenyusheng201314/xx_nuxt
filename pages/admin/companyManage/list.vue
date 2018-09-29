<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          企业列表
       </div>
     
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="企业名称" label-width="80px">
            <el-input v-model="searchFilter.company_name" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="操作人" label-width="80px">
            <el-input v-model="searchFilter.operator" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="申请人" label-width="80px">
            <el-input v-model="searchFilter.proposer" auto-complete="off" clearable></el-input>
          </el-form-item>
 
         

          <el-form-item label="授权时间" label-width="80px" clearable>
            <el-date-picker
      v-model="searchFilter.start_time"
      value-format="yyyy-MM-dd 00:00:00"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.end_time"
      value-format="yyyy-MM-dd 23:59:59"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>

           <el-form-item label="课程名称" label-width="80px" v-if="isCourse">
               <el-input v-model="searchFilter.course_name" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="训练营名称" label-width="100px" v-else>
               <el-input v-model="searchFilter.training_name" auto-complete="off" clearable></el-input>
          </el-form-item>
 
      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">创建机构</el-button>
          <el-button   @click="setData(1)" class="btn_search">搜索</el-button>
      </el-form-item>

        </el-form>

       
     </div>
     <div class="base_tab">
      <div :class="isCourse?'tab hover':'tab'" v-on:click="setIsCoures(true)" v-loading.fullscreen.lock="fullscreenLoading">课程</div>
      <div :class="isCourse?'tab':'tab hover'" v-on:click="setIsCoures(false)" v-loading.fullscreen.lock="fullscreenLoading">训练营</div>
    </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%">序号</th>
          <th width="8%">企业logo</th>
          <th width="8%">企业名称</th>
          <th width="8%">申请人</th>
          <th width="8%">名称</th>
          <th width="6%">单价（学币）</th>
          <th width="6%">份数</th>
          <th width="10%">授权时间</th>
          <th width="6%">操作人</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td><div class="head_img" v-if="vo.company"><img :src="vo.company.company_logo.value"  /></div></td>
          <td><div v-if="vo.company">{{vo.company.company_name}}</div></td>
          <td>{{vo.proposer}}</td>
          <td><div v-if="isOrNot">{{vo.course.course_name}}</div><div v-else>{{vo.training.training_name}}</div></td>
          <td><div v-if="isOrNot">{{vo.course.price}}</div><div v-else>{{vo.training.cost_price}}</div></td>
          <td><div v-if="isOrNot">{{vo.course.section_num}}</div><div v-else> </div></td>
          <td>{{vo.created_at}}</td>
          <td>{{vo.operator}}</td>  
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


 


</div>
</template>

<script>
import cropper from '~/components/admin/cropper';
import courseInfo  from '~/components/admin/companyManage/courseInfo';
import authorize  from '~/components/admin/companyManage/authorize';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      cropper,courseInfo,authorize
  },
  data () {
    return {
      isRresetPW:false,
 
      addInfo:{company_logo:{}},
 
      status:[{id:1,title:"正常"},{id:0,title:"冻结"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '200px',
      saveAction:"",
      choose:null,
      cutPicDic:"",
      cutPicInfo:{},
      dialogCropperVisible: false,
      dialogCourseVisible: false,
      dialogtrainingVisible: false,
      dialogPersonVisible: false,
      dialogAuthorizeVisible:false,
      courseInfo:{},
      company_id:0,
      isCourse:true,
      isOrNot:true,
      fullscreenLoading: false
      
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/company_authorization_record/course_auth_log_list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);
      console.log(res.data.data)
      return {
        updateInfo: res.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        },
      }
  },

  methods: {
    setIsCoures(val) {
     this.fullscreenLoading = true;
     this.isCourse = val
     this.setData(1)
    },
    authorize(id) {
      this.company_id = id
      this.dialogAuthorizeVisible = true    
    },
   
     handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.currentPage = 1;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage=val
      this.setData();
    },

    sortByKey: function(array, key) { //(数组、排序的列)
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })
    }, 
    handleAvatarSuccess(res, file,fileList) {
      //this.addInfo.pic_logo = URL.createObjectURL(file.raw); 
      this.$set(this.addInfo.company_logo,'value',file.response.data.file_url)
      this.$set(this.addInfo.company_logo,'name',file.response.data.filename)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async setData(val=0) {
      if(this.isCourse) {
        var url = "/manage/company_authorization_record/course_auth_log_list"
      }
      else {
        var url = "/manage/company_authorization_record/training_auth_log_list"
      }
      this.searchFilter.page = val==0?this.pageInfo.currentPage:val;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: url,data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      if(res.code==0) {
        this.fullscreenLoading = false;
        this.pageInfo.currentPage = parseInt(res.data.page);
        this.pageInfo.total = res.data.total;
        this.updateInfo = res.data.data
        this.isOrNot = this.isCourse

      }
      
    },
 

 
  },
  computed:{
 
  },
  mounted () {
 
  },
  head () {
    return {
      title: "企业列表",
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

