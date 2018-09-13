<template>
  <div v-if="show" class="modal">
      <div v-show="show" class="modal-con" :class="data.class">
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
  computed: {
    show () {
      return this.$props.data.show
    }
  },
  methods: {
    hide () {
      this.data.show = false
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

<style scoped>
  .modal {
    background-color: rgba(0,0,0,.4);
    display: block;
  }
  .modal-con {
    width: 80%;
    min-height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 40px;
    margin: 160px auto;
  }
  .modal-header {
    display: block;
    padding:10px 0;
  }
  .modal-close {
    float: right;
    /*font-size: 28px;*/
    /*color: #999;*/
  }
  .modal-title {
    font-size: 20px;
    color: #333;
    line-height: 2;
  }
  .modal-line {
    width: 100%;
    height: 1px;
    background-color: #ddd;
  }
  .modal-content {
    border: 0 none;
    background-color: inherit;
  }

</style>
