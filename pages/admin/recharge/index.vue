<template>
<div class="app_update">
   <div class="app_update_setting">
     <div class="base_title">
       <div class="title">
          充值金额
       </div>  
     </div>
     <div class="rech_money">
      <ul>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
        <li><p>99<span class="coin_unit">学币</span></p> <span class="coin">99元</span></li>
      </ul>
 
    </div>
    <div class="schart">
      <div class="base_title">
         <div class="title">
            充值统计
         </div>  
       </div>
       <div class="schart_num">
         <canvas id="canvasNum" width="500" height="400"></canvas>
         <ul>
           <li v-for="(vo, index) in schartDataNum" :key="index"><i :style="'background-color:'+ schartOptNum.colorList[index]"></i>{{vo.name}} <span>{{vo.value}}</span></li>

         </ul>
         <div class="schart_change">
           <el-select v-model="changeValNum" placeholder="请选择" @change="getSchartNum">
              <el-option
                v-for="item in changeVal "

                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
         </div>
       </div>

      <div class="schart_num">
         <canvas id="canvasMon" width="500" height="400"></canvas>
         <ul>
           <li v-for="(vo, index) in schartDataMon" :key="index"><i :style="'background-color:'+ schartOptMon.colorList[index]"></i>{{vo.name}} <span>{{vo.value}}</span></li>

         </ul>
         <div class="schart_change">
           <el-select v-model="changeValMon" placeholder="请选择" @change="getSchartMon">
              <el-option
                v-for="item in changeVal "

                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
         </div>
       </div>

      <div class="clr"></div>
    </div>

    

   </div>



     
     
 

 


</div>
</template>

<script>
import sChart from 'schart.js';
export default {
  layout: 'admin',
  name: 'admin_body',
  data () {
    return {
       schartDataNum:[
            {name:'99学币', value:2260},
            {name:'299学币', value:1170},
            {name:'399学币', value:970},
            {name:'599学币', value:1450},
            {name:'699学币', value:2260},
            {name:'999学币', value:1170}
        ],
        schartOptNum:{
            title: '充值次数统计',
            titlePosition: 'bottom',
            legendTop: -100,
            colorList: ['#71C945', '#118DF0', '#4667B4', '#FC8193', '#FB5575','#FCAA2B'], 
         },
         schartDataMon:[
            {name:'99学币', value:2260},
            {name:'299学币', value:1170},
            {name:'399学币', value:970},
            {name:'599学币', value:1450},
            {name:'699学币', value:2260},
            {name:'999学币', value:1170}
        ],
        schartOptMon:{
            title: '充值金额统计',
            titlePosition: 'bottom',
            legendTop: -100,
            colorList: ['#71C945', '#118DF0', '#4667B4', '#FC8193', '#FB5575','#FCAA2B'], 
         },
         changeVal:[
         {id:1,name:'近一周'},
         {id:2,name:'近一个月'},
         {id:3,name:'近三个月'}

         ],
         changeValNum:"",
         changeValMon:""
     
    }
  },
 
  methods: {
    getSchartNum:function(){
      this.schartDataNum = [
            {name:'99学币', value:1},
            {name:'299学币', value:1170},
            {name:'399学币', value:2},
            {name:'599学币', value:1450},
            {name:'699学币', value:2260},
            {name:'999学币', value:3}
        ]
    },
    getSchartMon:function(){
      this.schartDataMon = [
            {name:'99学币', value:2260},
            {name:'299学币', value:1170},
            {name:'399学币', value:970},
            {name:'599学币', value:1450},
            {name:'699学币', value:2260},
            {name:'999学币', value:1170}
        ]
    }
 
  },
  computed:{
 
  },
  mounted () {
    new sChart('canvasNum', 'ring', this.schartDataNum, this.schartOptNum);
    new sChart('canvasMon', 'ring', this.schartDataMon, this.schartOptMon);
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
      } 

      ]
    }
  }
}
</script>

