<template>
  <div class="medal-box">

      <!--<div class="mine-title">-->
        <!--<h4 class="h-title">星级勋章</h4>-->
      <!--</div>-->
      <ul>
        <li class="stars" v-for="(item,index) in medal" :key="index">
          <!--<div class="text-center medal-title">{{item.name}}</div>-->
          <div class="mine-title">
            <h4 class="h-title">{{item.name}}</h4>
          </div>
          <ul class="star-list">
            <li class="text-center text-of-one d-inline-block star" :class="{'star-right':(ind+1)%6===0}" v-for="(it,ind) in item.son" :key="ind">
              <!--<nuxt-link>-->
                <img class="medal-cover" :class="{'medal-cover1':item.name === '训练营勋章'}" :src="it.is_get? it.image_color:it.image_gray" alt="">
                <div class="star-name">{{it.name}}</div>
                <div class="star-rule">{{it.medal_rule.rule_type.name}}{{it.medal_rule.rule_value}}{{it.medal_rule.rule_type.unit}}</div>
              <!--</nuxt-link>-->
            </li>
          </ul>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'mine05medal',
  async asyncData({store}) {
    let res = await store.dispatch('mineGet', {
      url: '/app/personal/medal',
      data: {}
    })
    console.log('勋章',res)
    return {
      medal:res.data
    }
  },
}
</script>

<style scoped>

</style>
