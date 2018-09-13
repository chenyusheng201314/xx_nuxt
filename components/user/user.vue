<template>
  <div class="VueToNuxtLogo">
    <ul>
      <li v-for="(post, index) in bannert" :key="index" v-on:click="getData()">
        {{post.thumb}}
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
export default {
	data() {
		return {
			bannert:[
      {thumb:123},
      {thumb:345}
      ]
	 
		}
	}
 

}
</script>

