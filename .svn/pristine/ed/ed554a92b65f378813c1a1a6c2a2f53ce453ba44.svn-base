import axios from '~/plugins/axios'
import headBase from '~/components/user/headBase.vue'
import Swiper from 'swiper';
import MD5 from 'md5.js';
import Url from 'url';
import 'swiper/dist/css/swiper.min.css';
export default {
  layout: 'index',
  components: {
    headBase
  },
  data() {
    return {
      
      seoTitle:1234,
      message:"123",
      picked:"",
      selected: 'A',
      options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
     ],
     
    }
  },
  async asyncData(store, route, error ,query){
      var params = {userame: "admin",password: "admin"}
      let data  = await store.store.dispatch("baseHttp",params);
      let userName = store.store.state.authUser;

      let isLogin = userName!=null ?"已登录":"未登录"
      return {
        isLogin:isLogin,
        posts: data,
      }
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
    this.getData();

   
  },
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello!')
      // `event` 是原生 DOM 事件
      if (event) {
        var el = event.currentTarget
        console.log(el);
        alert(el.tagName);
        alert(el.className);
      }
  
    },

    getData () {
          let md5 = new MD5().update('admin').digest('hex');
          console.log(md5);
          const myURL = new URL('http://user:pass@host.com:8080/p/a/t/h?query=string&id=1#hash');
          myURL.searchParams.set('a', 'b');
          myURL.searchParams.set('id', '1b');
          console.log(myURL.href);
          console.log(this.$route.query)
 
    }
 
  },
 
  head () {
    return {
      title: this.seoTitle,
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
      }]
    }
  }
}
