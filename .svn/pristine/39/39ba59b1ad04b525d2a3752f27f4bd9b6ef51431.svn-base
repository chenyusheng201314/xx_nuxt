<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          案例
       </div> 
        <div class="btn" data-toggle="modal" data-target="#myModal" v-on:click="add">
          <img  src="/admin/images/app_index_add.png" /> 添加案例
       </div>
     </div>
      
    <div class="case_table">
         <div class="row">
           
            <div class="col-md-3 " v-for="(vo, index) in updateInfo" :key="index">
              <div class="case_list">
                <img :src="vo.addInfoSamllThumb"/> 
                <div class="op"><span v-on:click="ded(index)">收藏</span> <span v-on:click="edit(index)">编辑</span> <span v-on:click="del(index)">删除</span></div>
              </div>
            </div>
 
        </div>    
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
 

<el-dialog :title="(saveAction=='edit'?'编辑':'添加')+'案例'" :visible.sync="dialogFormVisible">
    <caseEdit 
    :addInfo="addInfo" 
    :formData="formData" 
    :extFormData="extFormData" 
    :addInfoMore="addInfoMore" 
    :addInfoSamllThumb="addInfoSamllThumb"
    :addInfoBigThumb="addInfoBigThumb"
    v-on:editSuccess="editSuccess"/>
</el-dialog>



<el-dialog title="查看" :visible.sync="dialogTableVisible">
  <el-form :model="addInfo">
    <el-form-item :label="item.title" :label-width="formLabelWidth" v-for="(item, index) in tableHead" :key="index">
         {{addInfo[item.field]}}
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </div>
</el-dialog>



</div>
</template>

<script>
import caseEdit from '~/components/admin/orgAndTch/caseEdit';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      caseEdit
    },
  data () {
    return {
      tableHead:[
         {title:"机构logo",field:"logo",width:"8%"},
         {title:"机构名称",field:"name",width:"8%"},
         {title:"机构账号",field:"accountNum",width:"8%"},
         {title:"注入时间",field:"addtime",width:"8%"},
         {title:"拥有导师数",field:"hasTch",width:"8%"},
         {title:"拥有课程数",field:"HasClass",width:"8%"},
         {title:"账号状态",field:"status",width:"8%"},
      ],
      formData:[
         {title:"案例名称",field:"name",fieldType:"Input"},
         {title:"企业logo （小图） ",field:"samllLogo",fieldType:"UploadImg"},
         {title:"企业logo （大图） ",field:"bigLogo",fieldType:"UploadImg"},
         {title:"案例概述",field:"info",fieldType:"Input"},
      ],
      extFormData:[{title:"标题",field:"title",fieldType:"Input"}, {title:"内容",field:"content",fieldType:"Input"}],
      sortTableHead:[],
      addInfo:{},
      addInfoMore:[{title:"",content:""}],
      addInfoSamllThumb:"",
      addInfoBigThumb:"",
      updateInfo: [
         {id:"1",addInfoSamllThumb:"/admin/images/left_nav_bg.png",addInfoBigThumb:"/admin/images/left_nav_bg.png",name:"Android",info:"",more:[{title:"abc",content:"22"}]},
         {id:"1",addInfoSamllThumb:"/admin/images/left_nav_bg.png",addInfoBigThumb:"/admin/images/left_nav_bg.png",name:"Android",info:"",more:[{title:"abc",content:"223"}]},
      ],
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
      dialogFormVisible: false,
      formLabelWidth: '120px',
      saveAction:"",
      choose:null
    }
  },
  created () {
          this.addInfo.addInfoSamllThumb=this.addInfoSamllThumb;
          this.addInfo.addInfoBigThumb=this.addInfoBigThumb;
          this.addInfo.more =  this.addInfoMore     
  },
  methods: {
    see:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = this.updateInfo[index];
        console.log(this.addInfo);
        this.dialogTableVisible = true;
     },
    add:function(){
        this.addInfo = {}
        this.addInfo.addInfoSamllThumb=this.addInfoSamllThumb;
        this.addInfo.addInfoBigThumb=this.addInfoBigThumb;
        this.addInfoMore = [{title:"",content:""}];
        this.addInfo.more = this.addInfoMore
        this.saveAction = "add"
        this.dialogFormVisible = true
     },
     edit:function(index) {
        this.choose = index
        this.saveAction = "edit"
        this.addInfo = JSON.parse(JSON.stringify(this.updateInfo[index]));
        this.addInfoMore = JSON.parse(JSON.stringify(this.updateInfo[index].more));
        this.dialogFormVisible = true;
     },
     del:function(index) {
        this.updateInfo.splice(index,1)
     },
     editSuccess:function(res) {
          this.dialogFormVisible = res.visible;
          if(res.btnAaction == 'save') {
            if(this.saveAction=='add') {
              this.updateInfo.unshift(this.addInfo)
            }
            else {
              this.updateInfo[this.choose]=this.addInfo
            }
            
             
          }
          console.log(this.addInfo)
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



 
  },
  computed:{
  
  },
  mounted () {
     console.log(this.addInfo);
      this.sortTableHead = JSON.parse(JSON.stringify(this.tableHead))
      this.sortTableHead =  this.sortByKey(this.sortTableHead,'sort');
  },
   head () {
    return {
      title: "机构",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
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
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/js/index.js'
      }, {
        src: '/admin/js/ueditor/ueditor.config.js'
      }, {
        src: '/admin/js/ueditor/ueditor.all.min.js'
      },{
        src: '/admin/js/ueditor/lang/zh-cn/zh-cn.js'
      }

      ]
    }
  }
}
</script>

