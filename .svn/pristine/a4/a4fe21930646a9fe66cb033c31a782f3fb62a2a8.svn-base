<template>
   <div class="base_body">
     <div class="searchFilter">
        <el-form :inline="true" :model="memberFilter" class="demo-form-inline">
          <el-form-item label="用户昵称" label-width="80px">
            <el-input v-model="memberFilter.username" auto-complete="off"></el-input>
          </el-form-item>
<el-form-item label="账号" label-width="80px">
            <el-input v-model="memberFilter.mobile" auto-complete="off"></el-input>
          </el-form-item>
<el-form-item label="真实姓" label-width="80px">
            <el-input v-model="memberFilter.realname" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别" label-width="90px">
              <el-select v-model="memberFilter.sex" placeholder="请选择">
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="操作时间" label-width="80px">
            <el-date-picker
      v-model="memberFilter.start_in_time"
      type="date"
      placeholder="选择日期">
          </el-date-picker> -
          <el-date-picker
      v-model="memberFilter.end_in_time"
      type="date"
      placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
      <el-form-item class="fRight">
          <el-button   @click="memberM(memberFilter.training_class_id)" class="btn_search">搜索</el-button>
      </el-form-item>
        </el-form>
     </div>
     {{classMember}}
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="8%"> 序号</th>
          <th width="8%">用户</th>
          <th width="8%">真实姓名</th>
          <th width="8%">性别</th>
          <th width="8%">入班时间</th>
          <th width="8%">闯关进度</th>
          <th width="8%">闯关总经验值</th>
          <th width="8%">本周经验值</th>
          <th width="8%">今日经验值</th>
          <th width="8%">作业提交次数</th>
          <th width="15%">操作</th>
        </tr>
     
        <tr v-for="(vo, index) in classMember" :key="index">
          <td>{{index+1}}</td>
          <td  align="left"><div class="head_img"><img :src="vo.person.photo"></div>{{vo.person.username}}</td>
          <td>
            <el-input 
            v-model="vo.realname" 
            placeholder="请输入内容" 
            :maxlength = "5"
            v-if="isShowInput[index] == true" 
            @blur="updateRealname(vo.id,vo.realname,index)"> 
            </el-input>
            <div v-if="isShowInput[index]!=true">{{vo.realname}}<img src="/admin/images/bi.png" v-on:click="setRealname(vo.id,index)" /></div> </td>
          <td>{{$store.state.admin.sex[vo.person.sex]}}</td>
          <td>{{vo.join_time}}</td>
          <td>{{vo.learn_pct}}</td>
          <td>{{vo.experience_total}}</td>
          <td>{{vo.continuous_check_in_day}}</td>
          <td>{{vo.continuous_check_in_day}}</td>
          <td>{{vo.continuous_check_in_day}}</td>
          <td><div class="btn_see" v-on:click="see(vo.id,vo.training_id,vo.training_class_id)">查看</div><div class="btn_setting" v-on:click="updateExp(vo.id)">曾减经验值</div></td>
        </tr>
        </tbody>
      </table>
    </div> 
    <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="memberPage.currentPage"
      :page-sizes="memberPage.pageSizes"
      :page-size="memberPage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="memberPage.total">
    </el-pagination>
    </div>
     <div class="clr"></div>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="cancel()">取 消</el-button>
      <el-button type="primary" v-on:click="submit()">确 定</el-button>
    </div>
</div>
 
</template>

<script>
 
 
 
export default {
 
  props: ['classManagerInfo'],
	data() {
		return {
			memberFilter:{},
      memberPage : {
          pageSize:10,
          currentPage:1,
        },
      classMember:[],  
      isShowInput:[],
      sex:[{id:1,name:"男"},{id:2,name:"女"}],
		}
	},
  computed: {
     
    },
	methods: {
    setRealname(id,index) {
         this.$set(this.isShowInput,index,true)

     },
     updateRealname(id,realname,index) {
        console.log(id,realname)
        this.$set(this.isShowInput,index,false)
     },
     updateExp(id) {

     },
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val
      console.log(`当前页: ${val}`);
    },
    async see(id,training_id,training_class_id) {
      let params = {url: "/manage/training_class_member/info",data:{person_id:id,training_id:training_id,training_class_id:training_class_id}}
      let res  = await this.$store.dispatch("adminHttpGet",params);
      console.log(res)

    }
     
  },
  async mounted () {
        this.memberFilter.training_class_id = this.classManagerInfo.id
        this.memberFilter.page = this.memberPage.currentPage
        this.memberFilter.psize = this.memberPage.pageSize
        console.log(this.memberFilter)
        let params = {url: "/manage/training_class_member/list",data:this.memberFilter}
        let res  = await this.$store.dispatch("adminHttpGet",params);
        console.log(res)
        this.classMember = res.data.data;
        this.memberPage = {
          total:res.data.total,
          pageSizes:[10, 20, 30, 400],
          pageSize:10,
          currentPage:parseInt(res.data.page),
        }
  },
  watch: {
    classIds: function (val) {
      this.$set(this.addInfo.stage_content[this.stageIndex],'sections',JSON.parse(JSON.stringify(val)));
      this.$set(this.addInfo.stage_content[this.stageIndex],'classIds',JSON.parse(JSON.stringify(val)));
      console.log(val)
    }
  }
   
}
</script>

 