<template>
  <div class="mine-box">
    <div class="mine-con">
      <div class="mine-title">
        <div class="h-title">选择问题类型</div>
      </div>
      <input type="radio" id="one" value="1" v-model="check">
      <label for="one">服务问题</label><br>
      <input type="radio" id="two" value="2" v-model="check">
      <label for="two">软件出错</label><br>
      <input type="radio" id="three" value="3" v-model="check">
      <label for="three">课程问题</label><br>
      <input type="radio" id="four" value="4" v-model="check">
      <label for="four">其他</label><br>
      <div class="position-relative text-box">
        <textarea maxlength="140" cols="30" rows="5" placeholder="尽情向我们吐槽吧" v-model="text"></textarea>
        <div class="position-absolute length">{{len}}/140</div>
      </div>
      <button class="btn-main" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine11feedback',
  data () {
    return {
      check: '',
      text: ''
    }
  },
  computed: {
    len () {
      return this.$data.text.length
    }
  },
  methods: {
    change (dd) {
      console.log(dd)
    },
    submit () {
      console.log(this.$data.check)
    }
  }
}
</script>

<style scoped>
  .mine-box {
    width: 100%;
  }
  .mine-con{
    padding: 75px;
  }
  label {
    font-size: 15px;
    color: #666;
  }
  textarea {
    width: 1040px;
    height: 200px;
    border: 1px solid #e5e5e5;
    font-size: 15px;
    color: #666;
    padding: 18px;
    margin: 20px 0;
  }
  textarea::placeholder {
    color: #999;
  }
  textarea:focus {
    outline: none;
  }
  .length {
    font-size: 15px;
    color: #999;
    right: 20px;
    bottom: 40px;
  }
  .btn-main {
    width: 150px;
    height: 50px;
    line-height: 50px;
    display: inline-block;
  }
</style>
