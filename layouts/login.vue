<template>
  <div class="admin-login">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    name: "login",
    head() {
      return {
        script: [
          {
            src: '/js/jquery.min.js'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .admin-login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
</style>
