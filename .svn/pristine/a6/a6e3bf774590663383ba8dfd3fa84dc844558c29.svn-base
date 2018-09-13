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
            <el-input v-model="searchFilter.tel" auto-complete="off"></el-input>
          </el-form-item>
 
 

          <el-form-item label="入驻日期" label-width="80px">
            <el-date-picker
      v-model="searchFilter.time1"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.time2"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="add()" class="btn_create">发布导师秀</el-button>
          <el-button   @click="search()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>  
    <div class="tch_show" v-for="(vo, index) in updateInfo" :key="index">
       <div class="tch_show_binfo">
         <span class="tch_show_img"><img :src="vo.tchHead"></span>
         <span class="tch_show_title">{{vo.tchName}}</span>
         <span class="tch_show_honer">{{vo.tchHoner}}</span>
         <span class="tch_show_atOrg">{{vo.atOrg}}</span>
         <span class="tch_show_time">{{vo.time}}</span>
       </div>
       <div class="tch_show_content">{{vo.content}}</div>
       <div class="tch_show_imgs">
            <ul>
              <li v-for="(item, index) in vo.classImgs" :key="index"><img :src="item"/></li>
             </ul>
       </div>
      <div class="tch_show_address">
        腾讯大楼
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
 

<el-dialog :title="(saveAction=='edit'?'编辑':'添加')+'发布导师秀'" :visible.sync="dialogFormVisible">
    <tchShowEdit 
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
import tchShowEdit from '~/components/admin/orgAndTch/tchShowEdit';
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
      tchShowEdit
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
         {id:1,tchHead:"/admin/images/left_nav_bg.png",tchName:"崔老师",tchHoner:"博士",atOrg:"安迪曼咨询",time:"2018-6-23  16:35",content:"今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。",classImgs:['/admin/images/left_nav_bg.png','/admin/images/left_nav_bg.png'],address:"腾讯大楼"},
         {id:2,tchHead:"/admin/images/left_nav_bg.png",tchName:"崔老师",tchHoner:"博士",atOrg:"安迪曼咨询",time:"2018-6-23  16:35",content:"今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。今天崔老师受腾讯学院院长邀请，参加了腾讯公开课，进行了关于组织绩效考核的相关演讲。",classImgs:['/admin/images/left_nav_bg.png','/admin/images/left_nav_bg.png'],address:"腾讯大楼"},
         
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
        this.addInfo.classImgs = [];
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

