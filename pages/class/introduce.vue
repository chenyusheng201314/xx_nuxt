<template>
  <div class="introduce">
    <div class="introduce-left" v-html="info.description"></div>
    <div class="introduce-right">
      <ul class="teacher_introduce">
        <li class="cursor-pointer abotu-tacher">
          <nuxt-link :to="'/teacher/'+teacher_info.id">
            <p class="li-tit">讲师介绍</p>
            <div class="teacher_header">
              <img :src="teacher_info.photo_small" alt="" width="128" height="128"
                   style="border-radius: 50%;-webkit-border-radius: 50%;-ms-border-radius: 50%; -moz-border-radius: 50%; -o-border-radius: 50%;">
            </div>
            <p class="teacher_name">{{teacher_info.realname}}</p>
            <p class="teacher_name" style="margin-top: 0px">{{teacher_info.realname_en}}</p>
            <p class="teacher_con" v-html="teacher_info.introduction"></p>
            <div class="teacher_tips" v-for="(item,index) in teacher_info.organization_teacher_tags.slice(0,4)"
                 :key="index">{{
              item.name }}
            </div>
          </nuxt-link>
        </li>
        <li>
          <p class="li-tit">主讲课程</p>
          <div class="about-lesson" v-for="(item,index) in other_lesson" :key="index">
            <a :href="'/class/'+item.id">
              <img :src="item.cover" alt="" width="270">
              <p class="about-tit">{{item.course_name}}</p>
            </a>
          </div>
        </li>
      </ul>
      <div class="teacher_project">
        <p class="li-tit li-tit-project">参与过的项目</p>
        <div class="project_list" v-for="(item,index) in tea_case" :key="index">
          <a :href="'/case/'+item.cases_id">
            <img :src="item.organization_cases.organization_small_logo" alt="" width="270">
            <p class="text-overflow-two pr-name">{{item.organization_cases.title}}</p>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'introduce',
    props: ['info', 'teacher_info', 'other_lesson', 'tea_case'],
    data() {
      return {
        stu_left: [],
        stu_right: [],
        outline_left: [],
        outline_right: []
      }
    },
    methods: {

    },
    mounted: function () {
      const that = this;
    }
  }
</script>
