<template>
<div class="admin_body">
  <LeftNav :data="leftNav"/>
  <div class="admin_body_right">
     <div class="set_int">
        <div class="set_int_list">
           <h4>每日签到</h4>

           {{intDataNew[1].rule_name}}
           <b v-if="!intData.everyDay.isEdit">{{intDataNew[1].point}}</b>
           <el-input v-model="intDataNew[1].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分，{{intDataNew[2].rule_name}}
           <b v-if="!intData.everyDay.isEdit">{{intDataNew[2].point}}</b>
           <el-input v-model="intDataNew[2].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分，上限
           <b v-if="!intData.everyDay.isEdit">{{intDataNew[2].upper_limit_point}}</b>
           <el-input v-model="intDataNew[2].upper_limit_point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分
           <div class="set_int_list_r">
           <el-button  @click="save('everyDay',[1,2])" class="btn_create" v-if="intData.everyDay.isEdit == true">保存</el-button>
           <el-button  @click="edit('everyDay')" class="btn_setting" v-if="intData.everyDay.isEdit == false">编辑</el-button>
           </div>
        </div>

        <div class="set_int_list">
           <h4>消费学币</h4>
           {{intDataNew[3].rule_name}}
           <b v-if="!intData.useMoney.isEdit">{{intDataNew[3].point}}</b>
           <el-input v-model="intDataNew[3].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分
           <div class="set_int_list_r">
           <el-button   @click="save('useMoney',[3])" class="btn_create" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.useMoney.isEdit == true">保存</el-button>
           <el-button   @click="edit('useMoney')" class="btn_setting" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.useMoney.isEdit == false">编辑</el-button>
         </div>
        </div>

        <div class="set_int_list">
           <h4>邀请好友</h4>
           {{intDataNew[4].rule_name}}
           <b v-if="!intData.invite.isEdit">{{intDataNew[4].point}}</b>
           <el-input v-model="intDataNew[4].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
            积分，
           {{intDataNew[5].rule_name}}
           <b v-if="!intData.invite.isEdit">{{intDataNew[5].point}}</b>
           <el-input v-model="intDataNew[5].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
             积分
       <div class="set_int_list_r">
           <el-button   @click="save('invite',[4,5])" class="btn_create" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.invite.isEdit == true">保存</el-button>
           <el-button   @click="edit('invite')" class="btn_setting" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.invite.isEdit == false">编辑</el-button>
         </div>
        </div>

        <div class="set_int_list">
           <h4>分享</h4>
            {{intDataNew[6].rule_name}}
           <b v-if="!intData.share.isEdit">{{intDataNew[6].point}}</b>
           <el-input v-model="intDataNew[6].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
            积分，每日上限
           <b v-if="!intData.share.isEdit">{{intDataNew[6].upper_limit_point}}</b>
           <el-input v-model="intDataNew[6].upper_limit_point" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" placeholder="请输入内容" v-else></el-input>
            积分
 <div class="set_int_list_r">
           <el-button   @click="save('share',[6])" class="btn_create" v-if="intData.share.isEdit == true">保存</el-button>
           <el-button   @click="edit('share')" class="btn_setting" v-if="intData.share.isEdit == false">编辑</el-button>
         </div>
        </div>

        <div class="set_int_list">
           <h4>赠送课程</h4>
            {{intDataNew[7].rule_name}}
           <b v-if="!intData.giveClass.isEdit">{{intDataNew[7].point}}</b>
           <el-input v-model="intDataNew[7].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分
           <div class="set_int_list_r">
           <el-button   @click="save('giveClass',[7])" class="btn_create" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.giveClass.isEdit == true">保存</el-button>
           <el-button   @click="edit('giveClass')" class="btn_setting" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-if="intData.giveClass.isEdit == false">编辑</el-button>
         </div>
        </div>

        <div class="set_int_list">
           <h4>完善名片</h4>
            {{intDataNew[8].rule_name}}
           <b v-if="!intData.perfect.isEdit">{{intDataNew[8].point}}</b>
           <el-input v-model="intDataNew[8].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分,

           {{intDataNew[9].rule_name}}
           <b v-if="!intData.perfect.isEdit">{{intDataNew[9].point}}</b>
           <el-input v-model="intDataNew[9].point" placeholder="请输入内容" type="number" maxlength="5" oninput="if(value.length>5)value=value.slice(0,5)" v-else></el-input>
           积分
           <div class="set_int_list_r">
           <el-button   @click="save('perfect',[8,9])" class="btn_create" v-if="intData.perfect.isEdit == true">保存</el-button>
           <el-button   @click="edit('perfect')" class="btn_setting" v-if="intData.perfect.isEdit == false"  >编辑</el-button>
         </div>
        </div>

     </div>
  </div>
</div>
</template>

<script>
import LeftNav from '~/components/admin/LeftNav';
export default {
  layout: 'admin',
  name: 'recharge',
  data () {
    return {
      title: '积分设置',
      leftNav: [
        {
          name: '获取积分设置',
          link: '/admin/setInt',
          active: true
        }
      ],
      intData:{
         everyDay:{intNum:10,step:10,limit:10,isEdit:false},
         useMoney:{intNum:10,num:1,isEdit:false},
         invite:{intNum:10,beInviteIntNum:50,num:10,limit:10,isEdit:false},
         share:{intNum:10,limit:10,isEdit:false},
         giveClass:{intNum:88,isEdit:false},
         perfect:{intNum:100,isEdit:false},
      },

      isEdit:false
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/person_point_rule/list",data:{}}
      let res  = await store.dispatch("adminHttpGet",params);
      var intData = {}
      for (var i in res.data) {
           intData[res.data[i].id] = res.data[i]
           console.log(res.data[i])
      }
      console.log(intData)
      return {
        intDataNew: intData,
      }
  },
  components: {
      LeftNav
    },
  methods: {
    edit:function(op){
        this.intData[op].isEdit = true


    },
    save:async function(op,ids) {
      this.intData[op].isEdit = false
      var msg = []
      for(var i in ids) {
        console.log(this.intDataNew[ids[i]])
        let params = {url: "/manage/person_point_rule/edit",data:this.intDataNew[ids[i]]}
        let res  = await this.$store.dispatch("adminHttpPost",params);
        var type = "success"
        if(res.code == 0) {
            msg[i] = this.intDataNew[ids[i]].rule_name+"编辑成功"
            type = type=="error"?"error":"success"
        }
        else {
            msg[i] = this.intDataNew[ids[i]].rule_name+"<span>编辑失败</span>"
            type = "error"
        }
      }
      this.$message({message:msg.join(','),type: type});
    }

  },
  mounted () {

  },
  head () {
    return {
      title: "积分设置",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],

      
    }
  }
}
</script>

