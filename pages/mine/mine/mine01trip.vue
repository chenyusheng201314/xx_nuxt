<template>
<div class="mine-trip">
  <div class="d-inline-block menu">
    <ul>
      <li @click="item=1"><nuxt-link :class="{'item-active':item === 1}" to="/mine/mine/mine01trip/total">
        <div class="point"></div>我的学习统计</nuxt-link>
      </li>
      <!--<li @click="item=2"><nuxt-link :class="{'item-active':item === 2}" to="/mine/mine/mine01trip/pro"><div class="point"></div>我的项目</nuxt-link></li>-->
      <li @click="item=3"><nuxt-link :class="{'item-active':item === 3}" to="/mine/mine/mine01trip/buy"><div class="point"></div>已购课程</nuxt-link></li>
      <li @click="item=4"><nuxt-link :class="{'item-active':item === 4}" to="/mine/mine/mine01trip/company"><div class="point"></div>企业课程</nuxt-link></li>
      <li @click="item=5"><nuxt-link :class="{'item-active':item === 5}" to="/mine/mine/mine01trip/history"><div class="point"></div>听课历史</nuxt-link></li>
      <!--<li @click="item=6"><nuxt-link :class="{'item-active':item === 6}" to="/mine/mine/mine01trip/train"><div class="point"></div>训练营</nuxt-link></li>-->
    </ul>
  </div>
  <div class="d-inline-block content">
    <!--<transition name="router-fade" mode="out-in">-->
      <keep-alive>
        <nuxt-child :user="user"/>
      </keep-alive>
    <!--</transition>-->
    <!--<transition name="router-fade" mode="out-in">-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->
  </div>
</div>
</template>

<script>
export default {
  layout: 'mine',
  name: 'mine01trip',
  data () {
    return {
      item: 1
    }
  },
  props:['user'],
  mounted () {
    switch (this.$route.path.split('/')[4]){
      case 'total':
        this.item =1
        break;
      case 'buy':
        this.item =3
        break;
      case 'company':
        this.item =4
        break;
      case 'history':
        this.item =5
        break;
    }
  }
}
</script>
