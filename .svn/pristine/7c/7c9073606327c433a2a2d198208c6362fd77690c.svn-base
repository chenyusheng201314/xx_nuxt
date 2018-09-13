<template>

  <div class="case-detail-con">
    <topBg src="/images/test.png"></topBg>
    <localRoute :route="route_data"></localRoute>
    <div class="case-detail-tit">
      <a href="javascript:;" class="case-tit-con" v-for="(item,index) in article_info.detail"
         :class="{active:index === now_ind}"
         @click="tab_change(index)" :key="index">{{item.name}}</a>
    </div>
    <ul class="case-detail-article">
      <li>
        <h3>{{article_info.tit}}</h3>
        <div class="tit-introduce">{{article_info.introduce}}</div>
      </li>
      <li v-for="(item,index) in article_info.detail" :key="index">
        <p class="name" :id="'name'+index">{{item.name}}</p>
        <p class="con" v-for="(it,ind) in item.con" :key="ind">{{it}}</p>
      </li>
    </ul>
    <div class="other-case">
      <p class="name">其他案列</p>
      <ul>
        <li v-for="(item,index) in other_case" :key="index" @click="go_other_case(item.id)">
          <img :src="item.cover" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import topBg from "@/components/topBg";
  import localRoute from "@/components/localRoute";

  export default {
    name: "case-detail",
    components: {
      topBg,
      localRoute
    },
    data() {
      return {
        num: 3,
        route_data: [
          {name: "享学科技网", path: "/"},
          {name: "企业案例", path: "/case/list"},
          {name: "案例详情", path: ""}
        ],
        case_id:'',
        get_id: function () {
         return this.$route.query.id
        },
        now_ind: 0, // 默认选择第一个
        article_info: {
          tit: "灵山企业文化课程开发项目",
          introduce:
            "该客户是一家以旅游、文化为主体，涉及文化、旅游、地产、投资等多种产业的多元化企业集团。该集团下的景点被授予“国家该客户是一家以旅游、文化为主体，涉及文化、旅游、地产、投资等多种产业的多元化企业集团。该集团下的景点被授予“国家该客户是一家以旅游、文化为主体，涉及文化、旅游、地产、投资等多种产业的多元化企业集团。该集团下的景点被授予“国家该客户是一家以旅游、文化为主体，涉及文化、旅游、地产、投资等多种产业的多元化企业集团。该集团下的景点被授予“国家",
          detail: [
            {
              name: "客户介绍",
              con: [
                "客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍",
                "客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍",
                "客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍客户介绍"
              ]
            },
            {
              name: "项目背景和需求",
              con: [
                "项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求",
                "项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求",
                "项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求",
                "项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求项目背景和需求"
              ]
            },
            {
              name: "项目解决方案及成果展示",
              con: [
                "项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示",
                "项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示",
                "项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示",
                "项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示项目解决方案及成果展示"
              ]
            },
            {
              name: "项目收益",
              con: [
                "项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益",
                "项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益",
                "项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益",
                "项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益项目收益"
              ]
            },
            {
              name: "项目参与人员",
              con: [
                "项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员",
                "项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员",
                "项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员",
                "项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员项目参与人员"
              ]
            },
            {
              name: "客户证言和体会",
              con: [
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会",
                "富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本",
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会",
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会",
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会",
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会",
                "客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会客户证言和体会"
              ]
            }
          ]
        },
        other_case: [
          {
            cover: "/images/case/other-case.png",
            id: 1
          },
          {
            cover: "/images/case/other-case.png",
            id: 2
          },
          {
            cover: "/images/case/other-case.png",
            id: 3
          },
          {
            cover: "/images/case/other-case.png",
            id: 4
          },
          {
            cover: "/images/case/other-case.png",
            id: 5
          },
          {
            cover: "/images/case/other-case.png",
            id: 6
          },
          {
            cover: "/images/case/other-case.png",
            id: 7
          },
          {
            cover: "/images/case/other-case.png",
            id: 8
          },
          {
            cover: "/images/case/other-case.png",
            id: 9
          },
          {
            cover: "/images/case/other-case.png",
            id: 10
          }
        ],
      };
    },
    methods: {
      // 导航切换
      tab_change(ind) {
        this.now_ind = ind;
        $("html, body").animate(
          {scrollTop: $("#name" + ind).offset().top - 45 + "px"},
          500
        );
      },
      go_other_case(id) {
        console.log(id)
      }
    },
    watch: {
      get_id(){
        const that =this;
        that.case_id = that.get_id();
        console.log(that.case_id);
        console.log(1)
      }
    },
    mounted() {
      // 获取ID
      const that =this;
      that.case_id = that.get_id();
      console.log( that.case_id);
    }
  };
</script>

<style scoped>
  p {
    margin: 0;
  }

  .case-detail-con {
    width: 1200px;
    margin: 0 auto;
  }

  .case-detail-tit {
    width: 1200px;
    height: 45px;
    background: #eee;
    padding: 0 45px;
  }

  .case-detail-tit .case-tit-con {
    float: left;
    padding: 0 10px;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    margin-right: 55px;
    text-decoration: none;
  }

  .case-detail-tit .case-tit-con:last-child {
    margin-right: 0;
  }

  .case-detail-tit .case-tit-con.active {
    height: 50px;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-bottom: 2px solid #ff6900;
    margin-top: -5px;
    line-height: 50px;
  }

  .case-detail-article {
    padding: 0;
    border: 1px solid #dcdcdc;
    border-bottom: none;
    margin-top: 20px;
  }

  .case-detail-article li {
    padding: 45px;
    border-bottom: 1px solid #dcdcdc;
  }

  .case-detail-article li h3 {
    width: 100%;
    height: auto;
    text-align: center;
    color: #ff6900;
    font-size: 20px;
    font-weight: bold;
  }

  .case-detail-article li .tit-introduce {
    width: 100%;
    height: auto;
    background: #f0f0f0;
    padding: 30px;
    font-size: 15px;
    color: #666;
    margin-top: 30px;
  }

  .case-detail-article li p.name,
  .other-case p.name {
    font-size: 18px;
    color: #ff6900;
    margin-bottom: 30px;
  }

  .case-detail-article li p.con {
    font-size: 15px;
    color: #666;
  }

  .other-case {
    margin-top: 20px;
    border: 1px solid #dcdcdc;
    padding: 45px;
    margin-bottom: 50px;
  }

  .other-case ul {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 0;
    padding: 0;
  }

  .other-case ul li {
    float: left;
    width: 208px;
    margin-right: 13px;
    margin-top: 15px;
    cursor: pointer;
  }
</style>
