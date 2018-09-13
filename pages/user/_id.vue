<template>
  <div class="container">
    <h1>{{ post.title }}</h1>
    <pre>{{ post.body }}</pre>
    <p><nuxt-link to="/user">Back to the list</nuxt-link></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  //middleware: 'auth',
  layout: 'index',
  async asyncData({ params }) {
    console.log(params.id);

    // We can use async/await ES6 feature
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    return { post: data }
  },
  methods: {
    
  },
  mounted() {


  }
}

</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
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