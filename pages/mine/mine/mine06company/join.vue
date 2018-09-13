<template>
  <div>
    <div class="position-relative search-box">
      <input type="text" placeholder="搜索企业" v-model="keyword" @keyup.enter="search">
      <img class="position-absolute search-icon" src="/images/mine/search.png" alt="" @click="search">
    </div>
    <ul class="clearfix result">
      <li v-for="(item, index) in result" :key="index">
        <img :src="item.cover" alt="封面">
        <div class="text-overflow-one result-name">{{item.name}}</div>
        <div class="result-exit" @click="exit(item.id)">退出公司</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'join',
  data () {
    return {
      keyword: '',
      result: [
        {
          id: 0,
          cover: '/images/test.png',
          name: '思科网络科技有限公司'
        }, {
          id: 1,
          cover: '/images/test.png',
          name: '思科网络科技有限公司科技有限公司科技有限公司'
        }, {
          id: 3,
          cover: '/images/test.png',
          name: '思科网络科技有限公司科技有限公司科技有限公司'
        }
      ]
    }
  },
  methods: {
    search () {
      console.log(this.$data.keyword)
    },
    exit (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
  .search-box{
    margin-bottom: 45px;
  }
  .search-box > input{
    width: 235px;
    height: 40px;
    font-size: 15px;
    color: #333;
    line-height: 40px;
    border: 1px solid #ff6900;
    border-radius: 20px;
    padding: 0 20px;
  }
  .search-box > input::placeholder{
    color: #999;
  }
  .search-box > input:focus{
    outline: none;
  }
  .search-icon{
    top: 10px;
    left: 200px;
  }
  .result{

  }
  .result li{
    width: 200px;
    float: left;
    text-align: center;
    margin-right: 20px;
  }
  .result li img{
    width: 200px;
    height: 200px;
    border: 1px solid #e5e5e5;
    border-radius: 100px;
    margin-bottom: 20px;
  }
  .result-name{
    color: #333;
    width: 100%;
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
  }
  .result-exit{
    color: #666;
    padding-left: 40px;
    background: url("/images/mine/exit.png") no-repeat 65px center;
  }
  .result-exit:hover {
    background-image: url("/images/mine/exit1.png");
    color: #ff6900;
  }
</style>
