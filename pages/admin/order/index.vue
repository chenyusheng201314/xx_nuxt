<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          用户订单
       </div>
     </div>
     <div class="searchFilter">
        <el-form :inline="true" :model="searchFilter" class="demo-form-inline">
          <el-form-item label="订单编号" label-width="80px">
            <el-input v-model="searchFilter.order_number" clearable auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="searchFilter.mobile" clearable auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" label-width="80px">
            <el-date-picker
      v-model="searchFilter.start_in_time"
      type="date"
      value-format = "yyyy-MM-dd 00:00:00"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.end_in_time"
      value-format = "yyyy-MM-dd 23:59:59"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>


         <el-form-item label="课程类型" label-width="80px">
              <el-select v-model="searchFilter.issue_type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in issue_type"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="支付方式" label-width="80px">
              <el-select v-model="searchFilter.order_type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in order_type"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>


      <el-form-item class="fRight">
          <el-button   @click="exportTable()" class="btn_create">导出EXCEL</el-button>
          <el-button   @click="setData()" class="btn_search">搜索</el-button>
    
      </el-form-item>

        </el-form>

       
     </div>
     <div class="base_tab" style="padding: 0 ">
      <div :class="searchFilter.status==''?'tab hover':'tab'" v-on:click="getStatus('')"  >全部订单</div>
      <div :class="searchFilter.status==1?'tab hover':'tab'" v-on:click="getStatus(1)" >待支付</div>
      <div :class="searchFilter.status==2?'tab hover':'tab'" v-on:click="getStatus(2)" >已完成</div>
      <div :class="searchFilter.status==3?'tab hover':'tab'" v-on:click="getStatus(3)" >已关闭</div>
    </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="5%">序号</th>
          <th width="8%">订单编号</th>  
          <th width="8%">账号</th>  
          <th width="8%">课程类型</th>  
          <th width="8%">课程名称</th>  
          <th width="8%">所属机构</th>  
          <th width="5%">购买数量</th>  
          <th width="8%">总价（学币）</th>  
          <th width="8%">支付方式</th>  
          <th width="8%">下单时间</th>  
          <th width="8%">订单状态</th>
          <th width="8%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{vo.order_number}}</td>
          <td v-on:click="getUserInfo(vo.user_id)">{{vo.person.mobile}}</td>
          <td>{{issue_typeDic[vo.issue_type]}}</td>
          <td v-if="vo.issue_type==1">
            {{vo.course.course_name.length>6?vo.course.course_name.substr(0,6)+"...":vo.course.course_name}}
          </td>
          <td v-else>
           {{vo.training.training_name.length>6?vo.training.training_name .substr(0,6)+"...":vo.training.training_name}}
          </td>


          <td v-if="vo.issue_type==1">{{vo.course.organization.title}}</td><td v-else>--</td>
          
          
          <td>{{vo.amount}}</td>
          <td>{{vo.total}}</td>
          <td>
            <div v-if="vo.status==2">
            <span v-if="vo.order_type==3">{{order_typeDic[vo.order_type]}}</span>
            <span v-else v-html='vo.order_type?"学币支付<br>（"+order_typeDic[vo.order_type]+"）":"--"'></span>
            </div>
            <div v-else>--</div>
          </td>
          <td>{{vo.created_at}}</td>
          <td :class="'order_status'+vo.status">{{statusDic[vo.status]}}</td>
          <td >
             <span class="btn_see" v-on:click="see(vo.id)">查看</span>
        
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

<el-dialog  title="用户信息"  :visible.sync="dialogTableVisible" :close-on-click-modal="false">
 
  <el-form :model="addInfo">
    <el-form-item label="用户账号" :label-width="formLabelWidth"  >
       {{addInfo.person.mobile}}
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth"  >
       {{addInfo.person.username}}
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth"  >
        {{$store.state.admin.sex[addInfo.person.sex]}}
    </el-form-item>
    <el-form-item label="所属企业" :label-width="formLabelWidth"  >
       {{addInfo.person.company_name}}
    </el-form-item>


     <div class="base_title">
       <div class="title">
          订单信息
       </div>  
     </div>

    <el-form-item label="订单编号" :label-width="formLabelWidth"  >
       {{addInfo.order_number}}
    </el-form-item>
    <el-form-item label="下单时间" :label-width="formLabelWidth"  >
       {{addInfo.created_at}}
    </el-form-item>
    <el-form-item label="完结时间" :label-width="formLabelWidth"  >
       {{addInfo.status!=1?addInfo.updated_at:''}}
    </el-form-item>
    <el-form-item label="订单状态" :label-width="formLabelWidth"  >
        {{statusDic[addInfo.status]}}
    </el-form-item>
    <el-form-item label="支付方式" :label-width="formLabelWidth"  >
       {{addInfo.status==2?order_typeDic[addInfo.order_type]:''}}
    </el-form-item>
    <el-form-item label="课程类型" :label-width="formLabelWidth"  >
       {{issue_typeDic[addInfo.issue_type]}}
    </el-form-item>
    <el-form-item label="课程名称" :label-width="formLabelWidth"  >
       <span v-if="addInfo.issue_type==1">{{addInfo.course.course_name}}</span><span v-else>{{addInfo.training.training_name}}</span>
    </el-form-item>
    <el-form-item label="所属机构" :label-width="formLabelWidth"  >
       <span v-if="addInfo.issue_type==1">{{addInfo.course.organization.title}}</span><span v-else>--</span>
    </el-form-item>
    <el-form-item label="课程原单价" :label-width="formLabelWidth"  >
       {{addInfo.money}}学币
    </el-form-item>
    <el-form-item label="课程现单价" :label-width="formLabelWidth"  >
       {{addInfo.pay_money}}学币 <span v-if="addInfo.pay_points != '0.00'">或 {{addInfo.pay_points}}积分</span>
    </el-form-item>
    <el-form-item label="购买数量" :label-width="formLabelWidth"  >
      {{addInfo.amount}}
    </el-form-item>
    <el-form-item label="总价" :label-width="formLabelWidth"  >
       {{addInfo.total}}学币 <span v-if="addInfo.total_points != '0.00'">或 {{addInfo.total_points}}积分</span>
    </el-form-item>
    <el-form-item label="优惠" :label-width="formLabelWidth"  >
       {{addInfo.preferential}}
    </el-form-item>
  </el-form>
 
</el-dialog>
 

<el-dialog :title="'用户信息'" :visible.sync="dialogUserVisible" v-if="dialogUserVisible" :close-on-click-modal="false" width="90%">
  <userInfo  :personId="personId"  />
</el-dialog> 

</div>
</template>
 

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import userInfo from '~/pages/admin/user/userInfo'
export default {
  layout: 'admin',
  name: 'admin_body',
  components: {
    userInfo
  },
  data () {
    return {
      status:[{id:1,title:"待支付"},{id:2,title:"已完成"},{id:3,title:"已关闭"}],
      statusDic:[],
      issue_type:[{id:1,title:"微课"},{id:2,title:"训练营"}],
      issue_typeDic:[],
      order_type:[{id:1,title:"普通钱包"},{id:2,title:"iOS"},{id:3,title:"积分"}],
      order_typeDic:[],
      addInfo:{person:{},training:{},course:{}},
      searchFilter:{status:''},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogUserVisible:false,
      personId:'',
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/person_order/person_order_list",data:{page:1,psize:20}}
      let res  = await store.dispatch("adminHttpGet",params);
      let newData = res.data.data;
      for(var item in newData) {
         if(newData[item].issue_type == 1) {
           newData[item].training = {}
         }
         else {
           newData[item].course = {}
         }

      }
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
  created(){
    this.statusDic = this.jsonToArr(this.status)
    this.issue_typeDic = this.jsonToArr(this.issue_type)
    this.order_typeDic = this.jsonToArr(this.order_type)
  },
  methods: {
    getUserInfo(id) {
       this.personId = id
       this.dialogUserVisible = true
    },
    getStatus(val){
       this.searchFilter.status = val
       this.setData(1)
    },
    async see(id) {
        let params = {url: "/manage/person_order/person_order_detail",data:{order_id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);   
        this.addInfo = res.data
        this.dialogTableVisible = true;
     },
    editPrice:function() {

     },
    exportTable() {
        let _this = this
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        require.ensure([], async () => {
            const { export_json_to_excel } = require('~/plugins/Export2Excel');
            // const tHeader = ['订单编号','用户账号','课程类型','课程名称','所属机构','购买数量','支付方式','下单时间','完结时间','订单状态','课程原单价','课程现单价','总价','优惠'];
            // const filterVal = ['order_number','mobile','issue_type','course_name','organization','amount','order_type','created_at','pay_time','status','money','pay_money','total','preferential'];
            const tHeader = ['订单编号','账号','课程类型','课程名称','所属机构','购买数量','总价（学币）','支付方式','下单时间','订单状态'];
            const filterVal = ['order_number','mobile','issue_type','course_name','organization','amount','total','order_type','created_at','status'];
            this.searchFilter.page = 1;
            this.searchFilter.psize =6000;
            let params = {url: "/manage/person_order/person_order_list",data:this.searchFilter}
            let res  = await this.$store.dispatch("adminHttpGet",params);
            console.log(res)
            const list = res.data.data
            this.perc = 0
            var i = 1
            var len = list.length
            for(var item in list) {
              list[item].mobile = list[item].person.mobile
              list[item].username = list[item].person.username
              list[item].sex =  _this.$store.state.admin.sex[list[item].person.sex]
              list[item].company_name = list[item].person.company_name
              list[item].order_number = list[item].order_number
              list[item].created_at = list[item].created_at
              list[item].pay_time = list[item].pay_time
              list[item].status = _this.statusDic[list[item].status]
              list[item].order_type = _this.order_typeDic[list[item].order_type]
              list[item].total = _this.total
              list[item].course_name = ''
              list[item].organization = ''
              if (list[item].issue_type==1) {
                if(list[item].course) {
                  list[item].course_name = list[item].course.course_name
                  list[item].organization = list[item].course.organization.title
                }
              }
              else {
                if(list[item].training) {
                  list[item].course_name = list[item].training.training_name
                }
                list[item].organization = '--'
              }

              list[item].issue_type = _this.issue_typeDic[list[item].issue_type]
              if(list[item].pay_points != '0.00') {
                list[item].pay_money = list[item].pay_money+'或'+list[item].pay_points+'积分'
              }
              else {
                list[item].pay_money = list[item].pay_money
              }

              if(list[item].total_points != '0.00') {
                list[item].total = list[item].total+'或'+list[item].total_points+'积分'
              }
              else {
                list[item].total = list[item].total
              }

  
              list[item].amount = list[item].amount
 
              i++
            }
            loading.close();
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '用户订单');
          })
    },
    formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.setData()
    },
 
    jsonToArr(obj) {
      let newArr = []
      for(var item in obj) {
         newArr[obj[item].id] = obj[item].title
      }
      return newArr;
    },
    async setData(x=0) {
 
      this.searchFilter.page = x!=0?x:this.pageInfo.currentPage;

      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/person_order/person_order_list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.currentPage = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
     
      
    },
 
  },
 
  mounted () {
 

  },
  watch: {
 
  
  },
 
}
</script>
<style>
.el-dialog__body .user {position: relative; width:100%; margin:0;top:0;}
</style>


