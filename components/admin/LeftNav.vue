<template>
  <div class="left_nav">
    <ul>
      <li v-for="(nav, index) in data" :key="index" :class="{active:nav.active}" @click="nav_choose(index)">
        {{nav.name}}
      </li>
    </ul>
 
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    props: ['data'],
    data() {
      return {}
    },
    methods: {
      // 导航选择
      nav_choose(ind) {
        const that = this;
        $.each(that.data, function (key, val) {
          if (key === ind) {
            val.active = true
          } else {
            val.active = false
          }
        });
        this.$router.push({path: that.data[ind].link})
      },

  

    // setActive: function (index) {
    //   for (let i in this.leftNav) {
    //     this.leftNav[i].active = false
    //   }
    //   this.leftNav[index].active = true
    //   console.log(this.leftNav);
    // },
   
  },
  mounted () {
      console.log(this.data)
      for (let i in this.data) {
        if(this.data[i].link == this.$route.path){
          this.data[i].active = true
        }
        else {
          this.data[i].active = false
        }
        
    }
   
  }
}
</script>
<style>

</style>

