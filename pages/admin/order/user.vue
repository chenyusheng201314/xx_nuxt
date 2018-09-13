<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="app_update_title">
       <div class="title">
          充值订单
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
          <el-form-item label="入驻日期" label-width="80px">
            <el-date-picker
      v-model="searchFilter.start_in_time"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="searchFilter.end_in_time"
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
          <th width="15%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{vo.order_number}}</td>
          <td>{{vo.person.mobile}}</td>
          <td>{{issue_typeDic[vo.issue_type]}}</td>
          <td v-if="vo.issue_type==1">{{vo.course.course_name}}</td><td v-else>{{vo.training.training_name}}</td>
          <td v-if="vo.issue_type==1">{{vo.course.organization.title}}</td><td v-else>--</td>
          
          
          <td>{{vo.amount}}</td>
          <td>{{vo.pay_money}}</td>
          <td>{{order_typeDic[vo.order_type]}}</td>
          <td>{{vo.pay_time}}</td>
          <td :class="'status'+vo.status">{{statusDic[vo.status]}}</td>
          <td >
             <span class="btn_see" v-on:click="see(vo.id)">查看</span>
             <span class="btn_setting" v-on:click="editPrice(index)">修改价格</span>
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

<el-dialog  title="用户信息"  :visible.sync="dialogTableVisible">
 
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
          充值金额
       </div>  
     </div>

    <el-form-item label="订单编号" :label-width="formLabelWidth"  >
       {{addInfo.order_number}}
    </el-form-item>
    <el-form-item label="下单时间" :label-width="formLabelWidth"  >
       {{addInfo.created_at}}
    </el-form-item>
    <el-form-item label="完结时间" :label-width="formLabelWidth"  >
       {{addInfo.pay_time}}
    </el-form-item>
    <el-form-item label="订单状态" :label-width="formLabelWidth"  >
        {{statusDic[addInfo.status]}}
    </el-form-item>
    <el-form-item label="支付方式" :label-width="formLabelWidth"  >
       {{order_typeDic[addInfo.order_type]}}
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
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </div>
</el-dialog>
 



</div>
</template>
 

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  layout: 'admin',
  name: 'admin_body',
  data () {
    return {
      status:[{id:1,title:"待支付"},{id:2,title:"已完成"},{id:3,title:"已关闭"}],
      statusDic:[],
      issue_type:[{id:1,title:"课程"},{id:2,title:"训练营"}],
      issue_typeDic:[],
      order_type:[{id:1,title:"普通钱包"},{id:2,title:"iOS"},{id:3,title:"积分"}],
      order_typeDic:[],
      addInfo:{person:{},training:{},course:{}},
      searchFilter:{},    
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/person_order/person_order_list",data:{page:1,psize:10}}
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
          pageSize:10,
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
    async see(id) {
        let params = {url: "/manage/person_order/person_order_detail",data:{order_id:id}}
        let res  = await this.$store.dispatch("adminHttpGet",params);   
        this.addInfo = res.data
        this.dialogTableVisible = true;
     },
    editPrice:function() {

     },
    exportTable() {
        require.ensure([], () => {
            const { export_json_to_excel } = require('~/plugins/Export2Excel');
            const tHeader = ['订单编号', '账号', '充值金额', '下单时间', '订单状态','支付渠道'];
            const filterVal = ['oderId', 'acc', 'money', 'addtime','status','from'];
            const list = this.updateInfo;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '充值订单');
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
    async setData() {
      this.searchFilter.page = this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/person_order/person_order_list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.page = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
     
      
    },
 
  },
 
  mounted () {
 

  },
  watch: {
 
  
  },
   head () {
    return {
      title: "用户订单",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
  
    }
  }
}
</script>

