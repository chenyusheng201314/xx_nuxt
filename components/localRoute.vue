<template>
  <div class="local-router">
    <div class="route">当前位置：</div>
    <div class="cursor-pointer route-data" v-for="(item, index) in route" :key="index">
      <a v-if="item.path" :href="item.path">
        {{item.name}} <span v-show="index !== route.length-1"> >&nbsp;&nbsp;</span>
      </a>
      <a v-else>{{item.name}} <span v-show="index !== route.length-1"> >&nbsp;&nbsp;</span></a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'localRoute',
  props: ['route'],
  data () {
    return {
      // route: [{name: '享学科技网', path: '/'}],
      change_params: 0
    }
  },
  methods: {
  },
  mounted () {
    // console.log('local页的router', this.$router)
    // console.log('local页的route', this.$router)
  }
}
</script>

