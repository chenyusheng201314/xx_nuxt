<template>
  <div class="top-bg">
    <!--:style="'background-image: url('+src+')'"-->
    <!--<img  class="bg-img" :src="src" alt="">-->
    <div :class="{'bg-case-img':cases,'bg-img':!cases,}" :style="'background-image: url('+src+')'"></div>
  </div>
</template>
<script>
export default {
  name: 'topBg',
  props: ['src','cases']
}
</script>

