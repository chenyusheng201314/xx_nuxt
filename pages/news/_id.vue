<template>
  <div class="container">
    <topBg src="/images/test.png"></topBg>
    <route :route="route_data"></route>
    <div class="text-center border">
      <div class="title">{{title}}</div>
      <div class="text">
        <div class="d-inline-block time">{{time}}</div>
        <div class="d-inline-block ref">来源：{{ref}}</div>
        <div class="d-inline-block editor">责任编辑：{{editor}}</div>
      </div>
      <div class="text-left con" v-html="content"></div>
      <div class="text-left link">
        <div class="d-inline-block text-overflow-one go pre"><nuxt-link :to="'/news/'+pre.id">上一篇：{{pre.title}}</nuxt-link></div>
        <div class="d-inline-block text-overflow-one go next"><nuxt-link :to="'/news/'+next.id">下一篇：{{next.title}}</nuxt-link></div>
      </div>
    </div>
    <div class="border others">
      <div class="top-title">其他资讯</div>
      <div class="d-inline-block other" v-for="(item, index) in others" :key="index">
        <img class="other-cover" :src="item.cover" alt="">
        <div class="text-overflow-one other-title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import topBg from '@/components/topBg'
import route from '@/components/localRoute'
export default {
  name: 'news',
  data () {
    return {
      route_data: [{name: '享学科技网', path: '/'}, {name: '行业资讯', path: '/news'}],
      title: '培训评估无法落地，你可能忘了建立培训价值证据链',
      time: '2018-09-09',
      ref: '成型用/ 胡丽',
      editor: '小安',
      content: '<h2 style="">富文本1</h2>\n' +
        '    <p style="color: #ff6900">富文本内容上一期的文章我们看了当前企业培训评估的现状和时间状况，上</p><h2 style="">富文本2</h2>\\n\' +\n' +
        '      \'    <p style="color: #ff6900">富文本内容上一期的文章我们看了当前企业培训评估的现状和时间状况，上</p><h2 style="">富文本3</h2>\\n\' +\n' +
        '      \'    <p style="color: #ff6900">富文本内容上一期的文章我们看了当前企业培训评估的现状和时间状况，上</p>',
      pre: {
        id: 10,
        title: '这是上一篇新闻标题'
      },
      next: {
        id: 11,
        title: '这是下一篇新闻标题'
      },
      others: [
        {
          id: 22,
          cover: '/images/test.png',
          title: '这是其他新闻标题'
        }, {
          id: 26,
          cover: '/images/test.png',
          title: '这是其他新闻标题'
        }, {
          id: 25,
          cover: '/images/test.png',
          title: '这是其他新闻标题'
        }, {
          id: 24,
          cover: '/images/test.png',
          title: '这是其他新闻标题'
        }
      ]
    }
  },
  components: {
    topBg, route
  },
  methods: {

  },
  mounted () {
    this.$data.route_data.push({name: this.$data.title, path: ''})
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .border {
    border: 1px solid #ddd;
    padding: 45px;
    margin-bottom: 20px;
  }
  .title{
    font-size: 20px;
    color: #ff6900;
    margin-bottom: 30px;
  }
  .text {
    font-size: 15px;
    color: #666;
    margin-bottom: 45px;
  }
  .time{
    margin-right: 30px;
  }
  .ref{
    margin-right: 30px;
  }
  .editor{

  }
  .con{
    border-bottom: 1px solid #ddd;
    padding-bottom: 45px;
    margin-bottom: 45px;
  }
  .link {
    width: 100%;
    font-size: 0;
  }
  .go {
    width: 50%;
    font-size: 18px;
    color: #666;
  }
  .top-title {
    font-size: 20px;
    color: #ff6900;
    padding-bottom: 10px;
    border-bottom: 1px solid #ff6900;
    margin-bottom: 30px;
  }
  .other {
    margin-right: 16px;
  }
  .other:last-of-type {
    margin-right: 0;
  }
  .other-cover {
    width: 265px;
    height: 160px;
    margin-bottom: 20px;
  }
  .other-title {
    padding: 0 10px;
  }
  .others{
    margin-bottom: 60px;
  }
</style>
