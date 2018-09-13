<template>
<div class="app_index">
   <div class="app_index_setting">
     <div class="admin_setting_title">
       <div class="title">
          搜索框配置
       </div>
       <div class="btn"  v-on:click="addM">
          <img  src="/admin/images/app_index_add.png" /> 添加热词
       </div>
     </div>
     <div class="table-responsive">
       <table class="table">
         <tbody>
         <tr>
          <th width="25%">序号</th>
          <th width="25%">热词</th>
          <th width="25%">操作</th>
          <th width="25%">排序</th>
        </tr>
        <tr v-for="(kw, index) in sortSearchInfo" :key="index">
          <td>{{index+1}}</td>
          <td><el-input v-model="kw.title" auto-complete="off"></el-input></td>
          <td><span class="btn_del"  v-on:click="delKw(index)">删除</span></td>
          <td>
            <img src="/admin/images/app_index_up.png" v-on:click="setSortUp(index)" v-if="index!=0"  /> <img src="/admin/images/app_index_down.png" v-on:click="setSortDown(index)" v-if="indexInfo.searchInfo.length!=(index+1)" /></td>
        </tr>
        </tbody>
      </table>
    </div>
 <div class="app_index_setting_btn">
        <nuxt-link :to="{name:'admin-app-index'}"><span class="back">返回</span></nuxt-link>
        <span v-on:click="submit">保存</span>
    </div>


   </div>

 

</div>
</template>

<script>
 

 
 
export default {
  layout: 'admin',
 
  name: 'admin_body',
  props: ['indexInfo'],
  data () {
    return {
 
    }
  },
  async asyncData({store}){
      let params = {url: "/manage/app_hot_search/list",data:{}}
      let res  = await store.dispatch("adminHttpGet",params);
      return {
        keywords: res.data,
      }
  },
  
  methods: {
 
     setting:function() {
      let layer = this.$refs.layer
      layer.open({
        type: 0,
        shadeClose: true, // 点击空白区域是否隐藏此弹出框  默认是false
      })
     },
     addM:function() {
         var order_num = this.indexInfo.searchInfo[this.indexInfo.searchInfo.length-1].order_num+1
         this.indexInfo.searchInfo.push({title:"",order_num:order_num})
     },
     delKw(index) {
       this.indexInfo.searchInfo.splice(index, 1);

     },
     async submit(){
      console.log(this.indexInfo.searchInfo);
        let params = {url: "/manage/app_hot_search/add",data:{data:JSON.stringify(this.indexInfo.searchInfo)}}
        let res  = await this.$store.dispatch("adminHttpPost",params);
        console.log(res)
        if(res.code == 0) {
          this.$message({
          message: '保存成功',
          type: 'success'
        });
        }
        else{
           this.$message.error('保存失败');
        }
  },
 
    setSortUp:function(index){
      let t = JSON.parse(JSON.stringify(this.indexInfo.searchInfo[index].order_num));
      this.$set(this.indexInfo.searchInfo[index],'order_num',JSON.parse(JSON.stringify(this.indexInfo.searchInfo[index-1].order_num)))
      this.$set(this.indexInfo.searchInfo[index-1],'order_num',t)
    },
    setSortDown:function(index){
      let t = JSON.parse(JSON.stringify(this.indexInfo.searchInfo[index].order_num));
      this.$set(this.indexInfo.searchInfo[index],'order_num',JSON.parse(JSON.stringify(this.indexInfo.searchInfo[index+1].order_num)))
      this.$set(this.indexInfo.searchInfo[index+1],'order_num',t)   
    },
    sortByKey: function(array, key) { //(数组、排序的列)
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })
    },
  },
  computed:{
    sortSearchInfo:function(){
       return this.sortByKey(this.indexInfo.searchInfo,'order_num');
    }
  },
  mounted () {
      
  }
}
</script>

