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
            <el-input v-model="searchFilter.order_number" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="searchFilter.mobile" auto-complete="off" clearable></el-input>
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
      type="date"
      value-format = "yyyy-MM-dd 23:59:59"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
 
          <el-form-item label="下单渠道" label-width="80px">
              <el-select v-model="searchFilter.order_channel" clearable placeholder="请选择">
                <el-option label="全部" value=""></el-option>
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
          <el-progress :text-inside="true" :stroke-width="18" :percentage="perc" v-if="false"></el-progress>
    
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
          <th width="8%">序号</th>
          <th width="14%">订单编号</th>  
          <th width="10%">账号</th>  
          <th width="10%">充值金额</th>  
          <th width="15%">下单时间</th>  
          <th width="10%">订单状态</th>  
          <th width="10%">下单渠道</th>
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
          <td>{{vo.order_channel?order_channelDic[vo.order_channel]:'--'}}  </td>
          <td>{{vo.pay_type?pay_typeDic[vo.pay_type]:'--'}}  </td>
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


 


<el-dialog title="用户信息"  :visible.sync="dialogTableVisible" :close-on-click-modal="false">

  <el-form :model="addInfo">
    <el-form-item label="用户账号" :label-width="formLabelWidth" >
        {{addInfo.person.mobile}}
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth" >
        {{addInfo.person.username}}
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth" >
        {{$store.state.admin.sex[addInfo.person.sex]}}
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
         {{addInfo.payment_number}}
    </el-form-item>
    <el-form-item label="支付单流水号" :label-width="formLabelWidth" >
         {{addInfo.payment_number}}
    </el-form-item>

  </el-form>

 
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
      pay_type:[{id:1,title:"微信支付"},{id:2,title:"支付宝"},{id:3,title:"Apple Pay"},{id:4,title:"其他"}],
      pay_typeDic:[],
      addInfo:{person:{}},
      searchFilter:{status:'',order_channel:''},    
      dialogTableVisible: false,
      formLabelWidth: '120px',
      perc:0

    }
  },
  async asyncData({store}){
      let params = {url: "/manage/recharge_order/recharge_order_list",data:{page:1,psize:20}}
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
  created(){
    this.statusDic = this.jsonToArr(this.status)
    this.order_channelDic = this.jsonToArr(this.order_channel)
    this.pay_typeDic = this.jsonToArr(this.pay_type)
  },
  methods: {
    getStatus(val){
       this.searchFilter.status = val
       this.setData(1)
    },
    see:function(index) {
        let checkInfo = this.comsys.adminCheckRole(this.$store.state.admin.adminRole.data,'recharge_order','recharge_order_detail')
        if(!checkInfo) {
            this.$message({message: '警告，您无此权限',type: 'warning'});  
            return false
        }
        this.addInfo = this.updateInfo[index];
        this.dialogTableVisible = true;
     },
    async exportTable() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        require.ensure([], async () => {
            const { export_json_to_excel } = require('~/plugins/Export2Excel');
            // const tHeader = ['用户账号', '用户昵称', '性别', '所属企业', '订单编号','订单状态','支付金额','充值金额','下单时间','下单渠道','支付渠道','支付单编号','支付单流水号']
            // const filterVal = ['mobile','username','sex','company_name','order_number','status','money','pay_money','created_at','order_channel','pay_type','pay_number','payment_number']
             const tHeader = ['订单编号', '账号', '充值金额', '下单时间', '订单状态','下单渠道','支付渠道']
             const filterVal = ['order_number','mobile','pay_money','created_at','status','order_channel','pay_type']

            //const list = JSON.parse(JSON.stringify(this.updateInfo));
            this.searchFilter.page = 1;
            this.searchFilter.psize = 6000;
            let params = {url: "/manage/recharge_order/recharge_order_list",data:this.searchFilter}
            let res  = await this.$store.dispatch("adminHttpGet",params);
            const list = res.data.data
            this.perc = 0
            var i = 1
            var len = list.length
            for(var item in list) {
              list[item].mobile = list[item].person.mobile
              list[item].username = list[item].person.username
              list[item].sex = list[item].person.sex
              list[item].company_name = list[item].person.company_name
              list[item].status = this.statusDic[list[item].status]
              list[item].order_channel = this.order_channelDic[list[item].order_channel]
              list[item].pay_type = this.pay_typeDic[list[item].pay_type]
              this.perc = i/len*100
              console.log(this.perc)
              i++
            }
            loading.close();
            const data = this.formatJson(filterVal, list);

            export_json_to_excel(tHeader, data, '充值订单');
            this.perc = 0
            

          })
    },
    formatJson(filterVal, jsonData) {

          return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.setData()

    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage=val
      this.setData()
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
    async setData(val=0) {
      this.searchFilter.page = val!=0?val:this.pageInfo.currentPage;
      this.searchFilter.psize = this.pageInfo.pageSize;
      let params = {url: "/manage/recharge_order/recharge_order_list",data:this.searchFilter}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      console.log(res)
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
 
}
</script>

