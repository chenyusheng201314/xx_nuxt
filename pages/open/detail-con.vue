<template>
  <div class="open-detial-con">
    <ul class="open-con-left">
      <li v-for="(item,index) in detail_info" :id="'li' + index" :key="index">
        <h2>
          <img :src="item.pic" alt="">
          <span>{{item.title}}</span>
        </h2>
        <p v-for="(it,ind) in item.con" :key="ind">{{it}}</p>
      </li>
    </ul>
    <ul class="open-con-right">
      <li>
        <h3>讲师介绍</h3>
        <div class="teacher-head">
          <img :src="teacher_info.header" alt="">
        </div>
        <p class="name">
          {{teacher_info.name}}  {{teacher_info.position}}
        </p>
        <p class="name"> {{teacher_info.eng_name}} </p>
        <p class="sm">{{teacher_info.introduce}}</p>
        <span class="tips" v-for="(it,ind) in teacher_info.merit" :key="ind">{{it}}</span>
      </li>
      <li>
        <h3>服务案例</h3>
        <div class="case-list" v-for="(item,index) in case_info" :key="index" @click="to_case(item.id)">
          <img :src="item.case_cover" alt="">
          <p>{{item.name}}</p>
        </div>
      </li>
      <li>
        <h3>学员反馈</h3>
        <div class="stu-list" v-for="(item,index) in stu_feedback" :key="index">
          <div class="stu-list-tit">
            <div class="tit-left">
              <img :src="item.stu_header" alt="">
            </div>
            <div class="tit-right">
              <h4>{{item.company}}  {{item.name}}</h4>
              <p>{{item.position}}</p>
            </div>
          </div>
          <p class="stu-fk">{{item.con}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'detail-con',
    props: {
      detail_info: Array,
      teacher_info: Object,
      case_info: Array,
      stu_feedback: Array
    },
    methods:{
      to_case(id){
        this.$router.push({path:'/case/detail',query:{id}})
      }
    }
  }
</script>

<style scoped>
  p{
    margin: 0;
  }
  .open-detial-con {
    width: 1200px;
    height: auto;
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 60px;
  }

  .open-detial-con .open-con-left {
    float: left;
    border: 1px solid #dcdcdc;
    width: 850px;
    height: auto;
    padding: 0;
    border-bottom: none;
  }

  .open-detial-con .open-con-left li {
    padding: 45px;
    border-bottom: 1px solid #dcdcdc;
  }

  .open-detial-con .open-con-left li h2 {
    font-size: 18px;
    color: #ff6900;
  }
  .open-detial-con .open-con-left li h2 img{
    margin-right: 5px;
  }

  .open-detial-con .open-con-left li p {
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 0;
    color: #666;
    font-size: 15px;
  }

  .open-detial-con .open-con-right {
    float: right;
    height: auto;
    width: 330px;
    padding: 0;
  }
  .open-detial-con .open-con-right li{
    padding: 45px 30px;
    border:1px solid #dcdcdc;
    margin-top: 20px;
    overflow: hidden;
  }
  .open-detial-con .open-con-right li:first-child{
    margin-top: 0;
  }
  .open-detial-con .open-con-right li h3{
    font-size: 18px;
    color: #ff6900;
  }
  .open-detial-con .open-con-right li .teacher-head{
    width: 128px;
    height: 128px;
    margin: 27px auto;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }
  .open-detial-con .open-con-right li p.name{
    font-size: 15px;
    color: #333;
    text-align: center;
  }
  .open-detial-con .open-con-right li p.sm{
    font-size: 15px;
    color: #666;
    margin-top: 30px;
  }
  .open-detial-con .open-con-right li span.tips{
    display: inline-block;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #ff6900;
    border:1px solid  #ff6900;
    margin-top: 15px;
  }
  .open-detial-con .open-con-right li span.tips:nth-child(2n){
    margin-right: 15px;
  }
  .open-detial-con .open-con-right li .case-list{
    float: left;
    width: 121px;
    height: auto;
    margin-top: 20px;
    cursor: pointer;
  }
  .open-detial-con .open-con-right li .case-list:nth-child(odd){
    margin-left: 24px;
  }
  .open-detial-con .open-con-right li .case-list p{
    font-size: 15px;
    color: #666;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
  }
  .open-detial-con .open-con-right li .stu-list{
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    padding: 20px 0;
  }
  .open-detial-con .open-con-right li .stu-list:last-child{
    border-bottom: none;
  }
  .open-detial-con .open-con-right li .stu-list .stu-list-tit{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .open-detial-con .open-con-right li .stu-list .stu-list-tit .tit-left,  .open-detial-con .open-con-right li .stu-list .stu-list-tit .tit-right{
    float: left;
  }
  .open-detial-con .open-con-right li .stu-list .stu-list-tit .tit-left{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    margin-right: 10px;
  }
  .open-detial-con .open-con-right li .stu-list .stu-list-tit .tit-right h4{
    font-size: 18px;
    color: #333;
    margin-bottom: 0;
  }
  .open-detial-con .open-con-right li .stu-list .stu-list-tit .tit-right p{
    font-size: 15px;
    color: #999;
    margin-top: 5px;
  }
  .open-detial-con .open-con-right li .stu-list .stu-fk{
    width: 100%;
    height: auto;
    color: #666;
    font-size: 15px;
    display: -webkit-box;
    display: -moz-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-line-clamp: 3;
    -moz-line-clamp: 3;
    -ms-line-clamp: 3;
    -o-line-clamp: 3;
    overflow: hidden;
    margin-top: 15px;
  }
</style>
