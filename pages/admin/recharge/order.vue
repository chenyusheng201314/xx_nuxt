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
            <el-input v-model="searchFilter.order_number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="searchFilter.mobile" auto-complete="off"></el-input>
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
         <el-form-item label="订单状态" label-width="80px">
              <el-select v-model="searchFilter.status" clearable placeholder="请选择">
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="下单渠道" label-width="80px">
              <el-select v-model="searchFilter.order_channel" clearable placeholder="请选择">
                  <el-option
                    v-for="item in order_channel"
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
          <th width="8%">序号</th>
          <th width="14%">订单编号</th>  
          <th width="10%">账号</th>  
          <th width="10%">充值金额</th>  
          <th width="15%">下单时间</th>  
          <th width="10%">订单状态</th>  
          <th width="10%">支付渠道</th>
          <th width="10%">操作</th>
        </tr>
        <tr v-for="(vo, index) in updateInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{vo.order_number}}</td>
          <td>{{vo.person.mobile}}</td>
          <td>{{vo.pay_money}}</td>
          <td>{{vo.created_at}}</td>
          <td>{{statusDic[vo.status]}}</td>
          <td>{{order_channelDic[vo.order_channel]}}  </td>
          <td>
             <span class="btn_see" v-on:click="see(index)">查看</span>
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


 


<el-dialog title="用户信息"  :visible.sync="dialogTableVisible">

  <el-form :model="addInfo">
    <el-form-item label="用户账号" :label-width="formLabelWidth" >
        {{addInfo.person.mobile}}
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth" >
        {{addInfo.person.username}}
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth" >
        {{addInfo.person.sex}}
    </el-form-item>
    <el-form-item label="所属企业" :label-width="formLabelWidth" >
        {{addInfo.person.company_name}}
    </el-form-item>
   <div class="base_title">
       <div class="title">
          订单信息
       </div>  
     </div>'

   <el-form-item label="订单编号" :label-width="formLabelWidth" >
        {{addInfo.order_number}}
    </el-form-item>
    <el-form-item label="订单状态" :label-width="formLabelWidth" >
         {{statusDic[addInfo.status]}}
    </el-form-item>
    <el-form-item label="充值金额" :label-width="formLabelWidth" >
         {{addInfo.money}}
    </el-form-item>
    <el-form-item label="支付金额" :label-width="formLabelWidth" >
         {{addInfo.pay_money}}
    </el-form-item>
    <el-form-item label="下单时间" :label-width="formLabelWidth" >
         {{addInfo.created_at}} 
    </el-form-item>
    <el-form-item label="下单渠道" :label-width="formLabelWidth" >
         {{order_channelDic[addInfo.order_channel]}}
    </el-form-item>
    <el-form-item label="支付渠道" :label-width="formLabelWidth" >
         {{pay_typeDic[addInfo.pay_type]}}
    </el-form-item>
    <el-form-item label="支付单编号" :label-width="formLabelWidth" >
         {{addInfo.pay_number}}
    </el-form-item>
    <el-form-item label="支付单流水号" :label-width="formLabelWidth" >
         {{addInfo.payment_number}}
    </el-form-item>

  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </div>
</el-dialog>
 



</div>
</template>
<style>
 
</style>

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
      order_channel:[{id:1,title:"pc"},{id:2,title:"android"},{id:3,title:"ios"},{id:4,title:"web"}],
      order_channelDic:[],
      pay_type:[{id:0,title:"微信支付"},{id:1,title:"支付宝"},{id:2,title:"Apple Pay"}],
      pay_typeDic:[],
      addInfo:{person:{}},
      searchFilter:{},    
      dialogTableVisible: false,
      formLabelWidth: '120px',

    }
  },
  async asyncData({store}){
      let params = {url: "/manage/recharge_order/recharge_order_list",data:{page:1,psize:10}}
      let res  = await store.dispatch("adminHttpGet",params);
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
    this.order_channelDic = this.jsonToArr(this.order_channel)
    this.pay_typeDic = this.jsonToArr(this.pay_type)
  },
  methods: {
    see:function(index) {
        this.addInfo = this.updateInfo[index];
        this.dialogTableVisible = true;
     },
    exportTable() {
        require.ensure([], () => {
            const { export_json_to_excel } = require('~/plugins/Export2Excel');
            const tHeader = ['用户账号', '用户昵称', '性别', '所属企业', '订单编号','订单状态','支付金额','充值金额','下单时间','下单渠道','支付渠道','支付单编号','支付单流水号']
            const filterVal = ['mobile','username','sex','company_name','order_number','status','money','pay_money','created_at','order_channel','pay_type','pay_number','payment_number']
            const list = JSON.parse(JSON.stringify(this.updateInfo));
            for(var item in list) {
              list[item].mobile = list[item].person.mobile
              list[item].username = list[item].person.username
              list[item].sex = list[item].person.sex
              list[item].company_name = list[item].person.company_name
              list[item].status = this.statusDic[list[item].status]
              list[item].order_channel = this.order_channelDic[list[item].order_channel]
              list[item].pay_type = this.pay_typeDic[list[item].pay_type]
            }
            const data = this.formatJson(filterVal, list);
            console.log(data)
            export_json_to_excel(tHeader, data, '充值订单');
          })
    },
    formatJson(filterVal, jsonData) {

          return jsonData.map(v => filterVal.map(j => v[j]))
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
      let params = {url: "/manage/recharge_order/recharge_order_list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      this.pageInfo.page = parseInt(res.data.page);
      this.pageInfo.total = res.data.total;
      this.updateInfo = res.data.data
    },
 
  },
  computed:{
    sortUpdateInfo:function(){
       return this.sortByKey(this.updateInfo,'sort');
    }
  },
  
  watch: {
 
  
  },
   head () {
    return {
      title: "导师",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
 
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
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

