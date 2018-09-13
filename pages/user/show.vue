<template>
  <div class="container">

    <li v-for="(post, index) in posts" :key="index" v-on:click="greet">
         {{ post.title }}{{index}}
     
      </li> 
 
  
<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        1
      </div>
      <div class="swiper-slide">
        2
      </div>
      <div class="swiper-slide">
        3
      </div>
    </div>
  </div>
  
 
</div>
   
</template>

<script>

import axios from 'axios'
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';

export default {
 
  data () {
      return {
        banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
        name:123
      }
    },
 
  async asyncData(query) {

    function getUserAccount(pht) {
      return axios({
        method: 'post',
        url: "http://3g.pqbszs.com/home-case-index-catId-12.html",
        params: {
          page: pht.page,
          isAjax: pht.isAjax
        }
      });
    }

    function getUserPermissions(pht) {
      return axios({
        method: 'post',
        url: "http://3g.pqbszs.com/home-case-index-catId-12.html",
        params: {
          page: pht.page,
          isAjax: pht.isAjax
        }
      });
    }
    return axios.all([getUserAccount(query.query), getUserPermissions(query.query)])
      .then(axios.spread(function(acct, perms) {
        //console.log(acct.data.list.data);
        return {
          posts: acct.data.list.data,
          msg: perms.data.list.data,
        }
      }));
  },
  created(){
    
  },
 
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
    
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    },


  },
  


  layout: 'index',
  head() {
    return {
      title: "123",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
      link: [{
        rel: 'stylesheet',
        href: '/css/swiper.min.css'
      }],
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/js/lib.js'
      },{
        src: '/js/index.js'
      }]
    }
  },
}

</script>
 

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
.swiper-container { width: 200px; }
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41B883;
}
</style>