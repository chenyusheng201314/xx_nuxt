<template>
<div>
  <div class="d-inline-block menu">
    <ul>
      <li @click="item=1"><nuxt-link :class="{'item-active':item === 1}" to="/mine/mine/mine01trip/total">
        <div class="point"></div>我的学习统计</nuxt-link>
      </li>
      <li @click="item=2"><nuxt-link :class="{'item-active':item === 2}" to="/mine/mine/mine01trip/pro"><div class="point"></div>我的项目</nuxt-link></li>
      <li @click="item=3"><nuxt-link :class="{'item-active':item === 3}" to="/mine/mine/mine01trip/buy"><div class="point"></div>已购课程</nuxt-link></li>
      <li @click="item=4"><nuxt-link :class="{'item-active':item === 4}" to="/mine/mine/mine01trip/company"><div class="point"></div>企业课程</nuxt-link></li>
      <li @click="item=5"><nuxt-link :class="{'item-active':item === 5}" to="/mine/mine/mine01trip/history"><div class="point"></div>听课历史</nuxt-link></li>
      <li @click="item=6"><nuxt-link :class="{'item-active':item === 6}" to="/mine/mine/mine01trip/train"><div class="point"></div>训练营</nuxt-link></li>
    </ul>
  </div>
  <div class="d-inline-block content">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <nuxt-child/>
      </keep-alive>
    </transition>
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$router.push('/mine/mine/mine01trip/total')
    })
  },
  mounted () {
  }
}
</script>

<style scoped>
  .menu {
    width: 330px;
    border: 1px solid #ddd;
    margin-right: 20px;
    vertical-align: top;
    box-shadow: 0 2px 2px 1px #ddd;
  }

  .menu ul li a{
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #666;
    padding-left: 35px;
    border-bottom: 1px solid #e5e5e5;
  }
  .point {
    display: inline-block;
    font-size: 14px;
    width: 10px;
    height: 10px;
    margin-right: 16px;
    margin-bottom: 2px;
    border-radius: 5px;
    background-color: #666;
  }
  .menu ul li a:hover{
    color: #fff!important;
    background-color: #ff6900!important;
  }
  .menu ul li a:hover  .point {
    background-color: #fff!important;
  }
  .item-active {
    color: #fff!important;
    background-color: #ff6900!important;
  }
  .item-active .point {
    background-color: #fff!important;
  }
</style>
