<template>
  <div class="container">
    <h1>Blog</h1>
    <user/>
    <li v-for="(post, index) in posts" :key="index">
         <nuxt-link :to="{name: 'user-id',params:{ id:post.id }}">{{post.title}}</nuxt-link>
     
      </li> 
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
          {{banner}}
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
     </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import user from '~/components/user/user.vue'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  components: {
    user
  },
  data() {
    return {
      banners: ['/1.jpg', '/2.jpg', '/3.jpg'],
    }
  },
  async asyncData(query){
      let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/`)
      return {posts: data}      
  },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: true,
      loop: true
    })
  },
  layout: 'index',
 
  head () {
    return {
      title: "123",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
      link: [{
        rel: 'stylesheet',
        href: '/css/css.css'
      }],
      script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }, {
        src: '/js/index.js'
      }]
    }
  },
}
</script>



