<template>
  <div v-if="show" class="position-fixed modal modal-component">
      <div v-if="show" class="modal-con" :class="data.class">
        <div class="clearfix modal-header">
          <!--<div class="" >X</div>-->
          <img class="modal-close" src="/images/common/close.png" alt="关闭" @click="hide">
          <div v-if="data.title" class="modal-title">{{data.title}}</div>
        </div>
        <div v-if="data.title" class="modal-line"></div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['data'],
  data () {
    return {
    }
  },
  watch:{
    show (v){
      if (v) {
        document.getElementsByTagName('body')[0].className = 'modal-open'
      }else {
        document.getElementsByTagName('body')[0].className = ''
      }
    }
  },
  computed: {
    show () {
      return this.$props.data.show
    }
  },
  methods: {
    hide () {
      this.data.show = false
      this.$emit('close')
    }
  },
  mounted () {
    // setInterval(() => {
    //   this.data.show = !this.data.show
    // }, 2000
    // )
  }
}
</script>
