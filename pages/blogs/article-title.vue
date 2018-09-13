<template>
  <div class="blog-article-title">
    <span class="blog-article-title-con">{{now_address}}</span>
  </div>
</template>

<script>
  export default {
    name: 'article-title',
    props: {
      now_address: String
    }
  }
</script>

<style scoped>
  .blog-article-title{
    width: 1200px;
    height: 45px;
    background: #eee;
    margin-top: 45px;
    margin-bottom: 20px;
    padding: 0 45px;
  }
  .blog-article-title .blog-article-title-con{
    display: inline-block;
    background: #fff;
    height: 50px;
    border: 1px solid #dcdcdc;
    border-bottom: 3px solid #ff6900;
    width: 100px;
    text-align: center;
    line-height: 50px;
    margin-top: -5px;
    color: #ff6900;
  }
</style>
