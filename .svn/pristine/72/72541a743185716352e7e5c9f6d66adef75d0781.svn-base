<template>
  <div class="introduce">
    <ul class="introduce-left">
      <li class="detail-con">
        <p class="li-tit">课程介绍</p>
        <div class="li-con">
          <p class="li-detail">{{lesson_info.lesson_introduce}}</p>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">课程定位</p>
        <div class="li-con">
          <p class="li-detail">{{lesson_info.lesson_position.tit}}</p>
          <p class="li-detail" v-for="(item,index) in lesson_info.lesson_position.detail" :key="index">
            <span class="p-left">◇</span>
            <span class="p-right">{{item}}</span>
          </p>
          <p class="li-detail">{{lesson_info.lesson_position.summarize}}</p>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">课程特色</p>
        <div class="li-con">
          <p class="li-detail" v-for="(item,index) in lesson_info.lesson_youshi" :key="index">
            <span class="p-left">◇</span>
            <span class="p-right">{{item}}</span>
          </p>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">课程模型</p>
        <div class="li-con">
          <img :src="lesson_info.lesson_medol.src" alt="" width="100%">
          <span class="pic-sm">{{lesson_info.lesson_medol.pic_sm}}</span>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">课程收益</p>
        <div class="li-con">
          <p class="li-detail" v-for="(item,index) in lesson_info.lesson_get" :key="index">
            <span class="p-left">◇</span>
            <span class="p-right">{{item}}</span>
          </p>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">课程目标</p>
        <div class="li-con">
          <p class="li-detail">
            <strong>总目标：</strong>{{lesson_info.lesson_target.last_target}}
          </p>
          <p class="li-detail" v-for="(item,index) in lesson_info.lesson_target.detail" :key="index">
            <span class="p-left">◇</span>
            <span class="p-right">{{item}}</span>
          </p>
        </div>
      </li>
      <li class="detail-con">
        <p class="li-tit">学员对象</p>
        <div class="li-con">
          <div class="li-con-left">
            <p class="li-detail" v-for="(item,index) in stu_left" :key="index">
              <span class="p-left">◇</span>
              <span class="p-right">{{item}}</span>
            </p>
          </div>
          <div class="li-con-right">
            <p class="li-detail" v-for="(item,index) in stu_right" :key="index">
              <span class="p-left">◇</span>
              <span class="p-right">{{item}}</span>
            </p>
          </div>
        </div>
      </li>

      <li class="detail-con">
        <p class="li-tit">课程大纲</p>
        <div class="li-con">
          <div class="li-con-left">
            <ul class="outline-list">
              <li v-for="(item,index)  in outline_left" :key="index">
                <p class="outline-tit">{{item.tit}} </p>
                <p class="outline-con" v-for="(it,ind) in item.detail" :key="ind"> {{it}}</p>
              </li>
            </ul>
          </div>
          <div class="li-con-right">
            <ul class="outline-list">
              <li v-for="(item,index)  in outline_right" :key="index">
                <p class="outline-tit">{{item.tit}} </p>
                <p class="outline-con" v-for="(it,ind) in item.detail" :key="ind"> {{it}}</p>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="introduce-right">
      <ul class="teacher_introduce">
        <li class="abotu-tacher">
          <p class="li-tit">讲师介绍</p>
          <div class="teacher_header">
            <img :src="teacher_info.pic" alt="" width="128" height="128">
          </div>
          <p class="teacher_name">{{teacher_info.name}}</p>
          <p class="teacher_name" style="margin-top: 0px">{{teacher_info.english_name}}</p>
          <p class="teacher_con">他是美国柯氏公司讣证的第一位中文讲师和顾问，是美国讣证的模拟课程设计不开发师，是国内少有的拥有培训不发展领域与业背景的人士。他他是美国柯氏公司讣证的第一位中文讲师和顾问，是美国讣证的模拟课程设计不开发师，是国内少有的拥有培训不发展领域与业背景的人士。他他是美国柯氏公司讣证的第一位中文讲师和顾问，是美国讣证的模拟课程设计不开发师，是国内少有的拥有培训不发展领域与业背景的人士。他</p>
          <div class="teacher_tips" v-for="(item,index) in teacher_info.tips" :key="index">{{ item }}</div>
        </li>
        <li>
          <p class="li-tit">主讲课程</p>
          <div class="about-lesson" v-for="(item,index) in teacher_info.about_lesson" :key="index" @click="talk_class(item.id)">
            <img :src="item.cover" alt="" width="270">
            <p class="about-tit">{{item.tit}}</p>
          </div>
        </li>
      </ul>
      <div class="teacher_project">
        <p class="li-tit">参与过的项目</p>
        <div class="project_list" v-for="(item,index) in teacher_info.about_project" :key="index" @click="to_case(item.id)">
          <img :src="item.cover" alt="">
          <p class="pr-name">{{item.name}}</p>
        </div>
      </div>
      <div class="recommend-lesson">
        <p class="li-tit">相关课程</p>
        <div class="about-lesson" v-for="(item,index) in recommend_lesson" :key="index" @click="talk_class(item.id)">
          <img :src="item.cover" alt="">
          <p class="about-tit">{{item.tit}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'introduce',
    props: ['lesson_info', 'teacher_info', 'recommend_lesson'],
    data () {
      return {
        stu_left: [],
        stu_right: [],
        outline_left: [],
        outline_right: []
      }
    },
    methods:{
      talk_class (id){
        console.log('相关课程  ' + id)
      },
      to_case(id){
        this.$router.push({path:'/case/detail',query:{id}})
      }
    },
    mounted: function () {
      const that = this
      // 学员左右分栏
      $.each(that.lesson_info.lesson_stu, function (k, val) {
        if (k < Math.ceil(that.lesson_info.lesson_stu.length / 2)) {
          that.stu_left.push(val)
        } else {
          that.stu_right.push(val)
        }
      })
      // 大纲左右分栏
      $.each(that.lesson_info.lesson_outline, function (k, val) {
        if (k < Math.ceil(that.lesson_info.lesson_stu.length / 2)) {
          that.outline_left.push(val)
        } else {
          that.outline_right.push(val)
        }
      })
    }
  }
</script>

<style scoped>
  ul, li, ol {
    list-style-type: none;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  .introduce {
    width: 1200px;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .introduce .introduce-left {
    float: left;
    width: 850px;
    height: auto;
    overflow: hidden;
    border: 1px solid #dcdcdc;
    padding: 0;
  }
  .introduce .introduce-left .detail-con{
    width: 850px;
    height: auto;
    padding: 45px;
    border-bottom: 1px solid #dcdcdc;
    overflow: hidden;
  }
  .introduce .introduce-left .detail-con:last-child{
    border-bottom: none;
  }
  .introduce .introduce-left .detail-con .li-tit{
    font-size: 20px;
    color: #ff6900;
  }
  .introduce .introduce-left .detail-con .li-con{
    margin-top: 30px;
    overflow: hidden;
  }
  .introduce .introduce-left .detail-con .li-con .li-detail{
    width: 100%;
    font-size: 15px;
    color: #666;
    overflow: hidden;
    margin-top: 5px;
  }
  .introduce .introduce-left .detail-con .li-con .li-detail .p-left{
    float: left;
    margin-right: 5px;
    width: 10px;
  }
  .introduce .introduce-left .detail-con .li-con .li-detail .p-right{
    float: right;
    width: calc(100% - 15px);
  }
  .introduce .introduce-left .detail-con .li-con .pic-sm{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #666;
    margin-top: 20px;
  }
  .introduce .introduce-left .detail-con .li-con .li-con-left{
    width: 48%;
    height: auto;
    float: left;
  }
  .introduce .introduce-left .detail-con .li-con .li-con-right{
    width: 48%;
    height: auto;
    float: right;
  }
  .introduce .introduce-left .detail-con .li-con .li-con-left .outline-list,.introduce .introduce-left .detail-con .li-con .li-con-right .outline-list{
    width: 100%;
    height: auto;
    padding: 0;
  }
  .introduce .introduce-left .detail-con .li-con .li-con-left .outline-list li,  .introduce .introduce-left .detail-con .li-con .li-con-right .outline-list li{
    margin-top: 50px;
  }
  .introduce .introduce-left .detail-con .li-con .li-con-left .outline-list li:first-child,.introduce .introduce-left .detail-con .li-con .li-con-right .outline-list li:first-child{
    margin-top: 0;
  }
  .introduce .introduce-left .detail-con .li-con .outline-list li .outline-tit{
    text-decoration: underline;
    font-size: 15px;
    color: #666;
    font-weight: bold;
    width: 100%;
  }
  .introduce .introduce-left .detail-con .li-con .outline-list li .outline-con{
    font-size: 15px;
    color: #666;
    width: 100%;
    margin-top: 5px;
  }
  .introduce .introduce-right{
    float: right;
    width: 330px;
    height: auto;
  }
  .introduce .introduce-right .teacher_introduce{
    border: 1px solid #dcdcdc;
    width: 330px;
    height: auto;
  }
  .introduce .introduce-right .teacher_introduce li{
    padding: 45px 30px;
    overflow: hidden;
    border-bottom: 1px solid #dcdcdc;
  }
  .introduce .introduce-right .teacher_introduce li:last-child{
    border-bottom: none;
  }
  .introduce .introduce-right .li-tit{
    font-size: 20px;
    color: #ff6900;
  }
  .introduce .introduce-right .teacher_introduce li  .teacher_header{
    width: 128px;
    height: 128px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    margin: 30px auto 0;
    text-align: center;
  }
  .introduce .introduce-right .teacher_introduce li  .teacher_name{
    font-size: 15px;
    color: #333;
    text-align: center;
    margin-top: 25px;
    font-weight: bold;
  }
  .introduce .introduce-right .teacher_introduce li   .teacher_con{
    font-size: 15px;
    color: #666;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  .introduce .introduce-right .teacher_introduce li  .teacher_tips{
    width: 120px;
    height: 30px;
    float: left;
    border: 1px solid #ff6900;
    text-align: center;
    line-height: 30px;
    color: #ff6900;
    margin-top: 15px;
    margin-right: 14px;
    font-size: 15px;
  }
  .introduce .introduce-right  .about-lesson{
    margin-top: 25px;
    cursor: pointer;
  }
  .introduce .introduce-right  .about-lesson p{
    margin-bottom: 0;
  }
  .introduce .introduce-right .about-tit{
    margin-top: 15px;
    font-size: 15px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .introduce .introduce-right .teacher_project,  .introduce .introduce-right .recommend-lesson{
    width: 330px;
    border: 1px solid #dcdcdc;
    margin-top: 20px;
    padding: 45px 30px;
    overflow: hidden;
  }
  .introduce .introduce-right .teacher_project .project_list{
    width: 121px;
    float: left;
    text-align: center;
    margin-top: 25px;
  }
  .introduce .introduce-right .teacher_project .project_list:nth-child(even){
    margin-right: 15px;
  }
  .introduce .introduce-right .teacher_project .project_list .pr-name{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
</style>
