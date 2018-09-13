<template>
   <div class="base_body">
        <div class="work_list_title">今日任务</div>
        <div class="base_form_list">
           <div class="title">日期：</div>
           <div class="content">{{workInfo.taskSuccessData.date}}</div>
        </div>
        <div class="base_form_list">
           <div class="title">课题：</div>
           <div class="content">{{workInfo.taskSuccessData.title}}</div>
        </div>
        <div class="base_form_list">
           <div class="title">任务：</div>
           <div class="content">{{workInfo.taskSuccessData.content}}</div>
        </div>
        <div class="clr"></div>
      
          <div class="work_list" v-for="(vo, index) in workInfo.workMoreInfo.data" :key="index">
              <div class="work_list_binfo">
                  
                   <div style="float: right" class="has_score" v-if="vo.fraction_status==1">
                      <b>{{vo.fraction}}</b> 经验值
                   </div>
                   <div style="float: right" class="give_score" v-else>
                   <el-button   @click="giveScore(vo.id)" class="btn_create" >打分</el-button>
                    <div v-if="vo.come_late == 0">未按时提交</div>
                   </div>
                    <span class="work_list_honer">{{workInfo.taskSuccessData.title}}</span><br>
                   <span class="work_list_time">{{vo.created_at}}</span>
               </div>
              <div class="work_list_content">{{vo.content}}</div>
             <div class="work_list_imgs">
                      <ul>
                        <li v-for="(item, index) in vo.photos" :key="index"><img :src="item.value"/></li>
                       </ul>
               </div>
              <div class="work_list_address">
                {{vo.digg_up}} {{vo.comment_count}}
              </div>
        
         </div>
         {{workInfo.pageInfo}}
              <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="workInfo.pageInfo.currentPage"
                :page-sizes="workInfo.pageInfo.pageSizes"
                :page-size="workInfo.pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="workInfo.pageInfo.total">
              </el-pagination>
              </div>
 
    <el-dialog title="作业打分" :visible.sync="dialogScoreVisible" append-to-body width="40%">
       <p>作业满分为10点经验值，请根据作业质量赋予相应经验值</p>
       <ul class="score_radio">
         <li><el-radio v-model="addInfo.fraction_status" :label="1" border></el-radio>
          打分，给与
          <el-input v-model="addInfo.fraction" auto-complete="off" style="width: 80px"></el-input>
          经验值</li>
         <li><el-radio v-model="addInfo.fraction_status" :label="2" border></el-radio>不给分，并隐藏此作业</li>
       </ul>
       <div slot="footer" class="dialog-footer">
        <el-button @click="dialogScoreVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitScore()">确 定</el-button>
      </div>
    </el-dialog>

         

    </div>


</template>
<style scoped>
.swiper-container {
      width: 100%;
      height: 100%;
 }
.swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
</style>
<script>
 
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
 
export default {
 
  props: ['classManagerInfo','workInfo'],
	data() {
		return {  
      formLabelWidth:"120px",
      searchFilter:{},
      dialogScoreVisible:false,
      addInfo:{fraction_status:"",fraction:""}
		}
	},
  computed: {
     
    },

	methods: {
     handleSizeChange(val) {
      this.workInfo.pageInfo.pageSize = val;
      this.setData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.setData()
    },
    async setData() {
      this.searchFilter.page = this.workInfo.pageInfo.currentPage;
      this.searchFilter.psize = this.workInfo.pageInfo.pageSize;
      let params = {url: "/manage/training_class_task/list",data:this.workInfo.taskSuccessData}
      let res = await this.$store.dispatch("adminHttpGet",params)
      this.workInfo.pageInfo.page = parseInt(res.data.page);
      this.workInfo.pageInfo.total = res.data.total;
      this.workInfo.workMoreInfo = res.data
    },
    async giveScore(id){
      this.$set(this.addInfo,"id",id)
      this.dialogScoreVisible = true

      
    },
    async submitScore(){
      if(this.addInfo.fraction_status == 1) {
        if(this.addInfo.fraction=="") {
          this.$message.error('经验值必填')
          return false
        }
      }
      else if(this.addInfo.fraction_status == 2){
         this.$set(this.addInfo,"fraction",0)
      }
      else{
        this.$message.error('请选择给分或不给分')
        return false
      }
      let params = {url: "/manage/training_class_task/update_fraction",data:this.addInfo}
      let res = await this.$store.dispatch("adminHttpPost",params)
      console.log(res)
      if(res.code==0) {
         this.$message({message: '打分成功',type: 'success'})
      }
      else {
        this.$message.error('打分失败，稍后尝试')
      }
    }
  
  },
  created() {
      
  },
  async mounted () {

  },   
}
</script>

 