<template>
  <div class="VueToNuxtLogo">
        <h1>head</h1>
    <div v-if="$store.state.isLogin==0">
    <input v-model="username" placeholder="">
    <input v-model="password" placeholder="">
    <button v-on:click="login()" >登录</button>
  </div>
  <div v-if="$store.state.isLogin==1">
      你好：{{$store.state.userInfo.username}} <span v-on:click="$store.dispatch('logout')">退出</span>
  </div>  
<br /><br />
   <nuxt-link :to="{name: 'secret'}">查看登录权限</nuxt-link><br /><br />

   <nuxt-link :to="{name: 'user', query:query}">查看列表 </nuxt-link>

  </div>
</template>
<script>
import axios from '~/plugins/axios'
import MD5 from 'md5.js';
export default {
  data() {
      return {
        bannert: [{
          thumb: 123
        }, {
          thumb: 345
        }],
        username:"",
        password:"",
        query:""
      }
    },
    methods: {
      async login() {
        let ht={}
        ht.username=this.username;
        ht.password=new MD5().update(this.password).digest('hex');
        let res = await this.$store.dispatch('login',ht)  
        alert(res.msg);
      },

      setQuery() {
        this.query = {id:1,ids:2};
      }
     
    },
    mounted() {
      this.setQuery();
    
    },
    
}
</script>

