<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          导师秀
       </div> 
     
     </div>
    <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="导师姓名" label-width="80px">
            <el-input v-model="searchFilter.realname" clearable auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="发布时间" label-width="80px" >
            <el-date-picker
      v-model="searchFilter.create_start_time"
      type="date"
      value-format="yyyy-MM-dd 00:00:00"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.create_end_time"
      type="date"
      value-format="yyyy-MM-dd 23:59:59"
      placeholder="选择日期" >
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">发布导师秀</el-button>
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>  
    <div class="tch_show" v-for="(vo, index) in updateInfo" :key="index">
       <div class="tch_show_binfo">
         <span class="tch_show_img"><img :src="vo.teacher.photo_small.value"></span>
         <span class="tch_show_title">{{vo.teacher.realname}}</span>
         <span class="tch_show_honer">{{vo.teacher.title}}</span>
         <span class="tch_show_atOrg" v-if="vo.teacher.organization">{{vo.teacher.organization.title}}</span>
         <span class="tch_show_time">{{vo.created_at}}</span>
       </div>
       <div class="tch_show_content">{{vo.content}}</div>
       <div class="tch_show_imgs">
            <ul>
              <li v-for="(item, index) in vo.images" :key="index"><img :src="item.value" v-on:click="setPic(item.value)"/></li>
             </ul>
       </div>
      <div class="tch_show_address">
        {{vo.address}}
      </div>
      <div class="tch_show_del" v-on:click="del(index)">×</div>
    
  
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
 

<el-dialog :title="(saveAction=='edit'?'编辑':'添加')+'发布导师秀'" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :close-on-click-modal="false">
    <tchShowEdit 
    :addInfo="addInfo" 
    :orgInfo="orgInfo" 
    v-on:editSuccess="editSuccess"/>
</el-dialog>


    <el-dialog title="图片预览" :visible.sync="dialogPicVisible" v-if="dialogPicVisible" append-to-body width="80%" :close-on-click-modal="false">
       <!-- <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in picView" :key="index">
                <img :src="item.value.value" class="swiper_banner">
            </div>
          </div>
          <div class="swiper-pagination"></div>
       </div> -->
       <div style="text-align:center;"><img :src="picView"   style="max-width: 100%;max-height:100%"></div>
    </el-dialog>
</div>
</template>

<script>
import tchShowEdit from '~/components/admin/orgAndTch/tchShowEdit';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      tchShowEdit
    },
  data () {
    return {
      addInfo:{teacher:{photo_small:{}}},
      addInfoMore:[{title:"",content:""}],
      addInfoSamllThumb:"",
      addInfoBigThumb:"",
      status:[{id:0,name:"全部"},{id:1,name:"正常"},{id:2,name:"否"}],
      feedBackType:[{id:0,name:"全部"},{id:1,name:"软件出错"},{id:2,name:"账号申诉"}],
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogPicVisible:false,
      picView:'',
      formLabelWidth: '120px',
      saveAction:"",
      choose:null,
      orgInfo:[],
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/organization_teacher_show/list",data:{page:1,psize:20}}
      let res  = await store.dispatch("adminHttpGet",params);
      return {
        updateInfo: res.data.data,
        pageInfo:{
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:20,
          currentPage:parseInt(res.data.page),
        },
      }
  },
  created () {
   
  },
  methods: {
    setPic(img) {
         this.picView = img
         this.dialogPicVisible = true

     },
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        console.log(this.addInfo);
        this.dialogTableVisible = true;
     },
    async add(){
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'organization_teacher_show','add')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.addInfo = {}
        this.$set(this.addInfo,'images', '')
        this.saveAction = "add"
        let params = {url: "/manage/organization/list",data:{status:1,role:1,page:1,psize:100}}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        this.orgInfo = res.data.data
        this.dialogFormVisible = true
     },
     edit:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = JSON.parse(JSON.stringify(this.updateInfo[index]));
        this.addInfoMore = JSON.parse(JSON.stringify(this.updateInfo[index].more));
        this.dialogFormVisible = true;
     },
     async del(index) {
         let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'organization_teacher_show','del')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
         this.$confirm('此操作将删除该导师秀, 是否继续?', '风险操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
           let ht = {}
           ht.id = this.updateInfo[index].id
           let params = {url: "/manage/organization_teacher_show/del",data:ht}
           let res  = await this.$store.dispatch("adminHttpPost",params);
           this.setData()
           this.$message({type: 'success',message: '删除成功!'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

         
     },
    async editSuccess(res) {
          this.dialogFormVisible = res.visible;
          if(res.btnAaction == 'save') {
            let params = {url: "/manage/organization_teacher_show/add",data:this.addInfo}
            let res  = await this.$store.dispatch("adminHttpPost",params);
            this.setData()
          }
          console.log(this.addInfo)
     },
 
     
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
 
      this.setData()
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
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/organization_teacher_show/list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      console.log(res)
      this.pageInfo.page = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
    },



 
  },
  computed:{
  
  },
  mounted () {
 
  },
   head () {
    return {
    
      link: [
        {
          href: '/css/css.css',
          type:'text/css',
          rel: 'stylesheet',
        },{
          href: '/static/css/bootstrap.css',
          type:'text/css',
          rel: 'stylesheet',
        }
      ],
      
    }
  }
}
</script>

