<template>
  <div>
    <LeftNav :leftNav="lefNav"></LeftNav>
    <div class="admin_body_right admin-class " style="margin-left: 0">
      <div class="app_update_title">
       <div class="title">
          搜索框配置
       </div>
       <div class="btn" data-toggle="modal" data-target="#myModal" v-on:click="add()">
          <img  src="/admin/images/app_index_add.png" /> 添加
       </div>
     </div>
     {{classify}}
      <dl v-for="(vo, ind) in classify" :key="ind" v-dragging="{ item: vo, list: classify, group: 'vo' }" class="classify" >
        <dt>
          <el-input v-model="vo.className" placeholder="请输入内容" :disabled="vo.isEdit"></el-input> 上架课程总数 {{vo.hasClass}}

          <div class="class_op">
          <span class="btn_setting"  v-on:click="save(ind)">{{vo.isEdit?'编辑':'保存'}}</span>
          <span v-on:click="setOpen(ind)"><img src="/admin/images/classClassify02.png" :class="vo.isShow?'show':'hide'" /></span>
          <span><img src="/admin/images/classClassify01.png" /></span>
           </div>
           <div class="base_btn_add"   v-on:click="addChild(ind)">
              <img  src="/admin/images/app_index_add.png" /> 添加二级
           </div>
           <div class="class_del" v-on:click="delClassify(ind)" v-if="!vo.isEdit">×</div>
        </dt>
        <dd v-for="(item, index) in vo.childClassify" :key="index" v-if="vo.isShow == true">
            <el-input v-model="item.className" placeholder="请输入内容" :disabled="vo.isEdit"></el-input> 上架课程数 {{vo.hasClass}}
            <div class="class_op">
            <span class="btn_del" v-on:click="delChild(ind,index)">删除</span>
            <span><img src="/admin/images/app_index_up.png" v-on:click="setSortUp(ind,index)" v-if="index!=0"  /> </span>
            <span><img src="/admin/images/app_index_down.png" v-on:click="setSortDown(ind,index)" v-if="vo.childClassify.length!=(index+1)" /> </span>
          </div>
        </dd>
      </dl>

    </div>

  </div>
</template>

<script>

import LeftNav from '~/components/admin/LeftNav';
import '~/static/admin/css/classClassify.css'
import Vue from 'vue'
import VueDND from 'awe-dnd'
Vue.use(VueDND)
  export default {
    name: "classClassify",
    layout: 'admin',
    components: {
      LeftNav
    },
    data() {
      return {
        lefNav: [
          {
            name: '视频库',
            link: '/',
            active: false
          }, {
            name: '课程管理',
            link: '',
            active: true
          }, {
            name: '课程分类管理',
            link: '',
            active: false
          },
        ],
        emptyClassify:{className:"",hasClass:0,sort:0,isShow:false,isEdit:false,childClassify:[]},
        emptyChildClassify:{className:"",hasClass:10,sort:1},
        classify:[
            {className:"领导力",hasClass:10,sort:2,isShow:false,isEdit:true,childClassify:[]},
            {className:"领导力",hasClass:10,sort:2,isShow:false,isEdit:true,childClassify:[
               {className:"1",hasClass:10,sort:1},
               {className:"2",hasClass:10,sort:2},
               {className:"2",hasClass:10,sort:3},

            ]},
            {className:"领导力2",hasClass:10,sort:1,isShow:false,isEdit:true,childClassify:[
               {className:"3",hasClass:10,sort:1},
               {className:"4",hasClass:10,sort:2},
            ]},
        ],
        childClassify:[],
        open:[],
     }

    },
    methods: {
      setOpen:function(ind) {
        if(this.classify[ind].isShow == true) {
          this.classify[ind].isShow = false;

        }
        else {
          this.classify[ind].isShow = true;
        }


      },
      save:function(ind) {
        if(this.classify[ind].isEdit == true) {
          this.classify[ind].isEdit = false;
          this.classify[ind].isShow = true;
        }
        else {
          this.classify[ind].isEdit = true;
        }
      },
      add:function(){
        this.classify.unshift(JSON.parse(JSON.stringify(this.emptyClassify)))
      },
      addChild:function(ind){
        this.classify[ind].childClassify.unshift(JSON.parse(JSON.stringify(this.emptyChildClassify)))
        this.classify[ind].isShow = true;
        this.classify[ind].isEdit = false;
      },
      setChildClassify:function(arr) {
        this.childClassify = arr;
      },
      delClassify:function(ind) {
        this.classify.splice(ind,1)
      },
      delChild:function(ind,index) {
        this.classify[ind].childClassify.splice(index,1)
      },
      sortByKey: function(array, key) { //(数组、排序的列)
        console.log(1)
               return array.sort(function(a, b) {
                  var x = a[key];
                  var y = b[key];
                  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                })

      },
      setSortUp:function(ind,index){
        let t = this.classify[ind].childClassify[index].sort;
        this.classify[ind].childClassify[index].sort = this.classify[ind].childClassify[index-1].sort;
        this.classify[ind].childClassify[index-1].sort = t;
      },
      setSortDown:function(index,ind){
        let t = this.classify[ind].childClassify[index].sort;
        this.classify[ind].childClassify[index].sort = this.classify[ind].childClassify[index+1].sort;
        this.classify[ind].childClassify[index+1].sort = t;
      },

    },
    computed:{
      sortChildClassify:function(){
         return this.sortByKey(this.childClassify,'sort');
      }

    },
    mounted() {

       this.$dragging.$on('dragged', ({value}) => {

         for (var i = 0; i < this.classify.length; i++) {
            this.classify[i].sort = i;
         }
          console.log(this.classify)

        })

    },
  }
</script>

<style scoped>


</style>
