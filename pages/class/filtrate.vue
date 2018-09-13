<template>
  <ul class="class-condition">
    <li>
      <span class="li-tit">课程分类：</span>
      <span class="li-choose-all" @click="choose_class('全部')" :class="{active:all_choose_type}">全部</span>
      <span class="li-choose" :class="{active:item.type}" v-for="(item,index) in class_list"
            @click="choose_class(item.con,index)" :key="index">{{item.con}}</span>
    </li>
    <li>
      <span class="li-tit">优惠活动：</span>
      <span class="li-choose-all" @click="choose_discounts('全部')" :class="{active:all_discounts_type}">全部</span>
      <span class="li-choose" :class="{active:item.type}" v-for="(item,index) in discounts_list"
            @click="choose_discounts(item.con,index)" :key="index">{{item.con}}</span>
    </li>
    <li>
      <span class="li-tit">培训费用：</span>
      <span class="li-choose-all" @click="choose_price('全部')" :class="{active:all_price_type}">全部</span>
      <span class="li-choose" :class="{active:item.type}" v-for="(item,index) in price_list"
            @click="choose_price(item.con,index)" :key="index">{{item.con}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "Filtrate",
    data() {
      return {
        all_discounts_type: true,
        all_price_type: true
      };
    },
    props: ['class_list', 'choose_now_list', 'discounts_list', 'price_list', 'all_choose_type'],
    methods: {
      // 课程分类选择条件
      choose_class(val, index) {
        const that = this;
        const {choose_now_list, class_list} = this;
        // 当前课程
        choose_now_list(val);
        // 添加选择之后的效果
        if (val === "全部") {
          that.$emit('all_choose_type',true);
          class_list.forEach(function (v, key) {
            v.type = false;
          });
        } else {
          that.$emit('all_choose_type',false);

          class_list.forEach(function (v, key) {
            if (key === index) {
              v.type = true;
            } else {
              v.type = false;
            }
          });
        }
      },

      // 优惠活动选择条件
      choose_discounts(val, index) {
        const that = this;
        const {discounts_list} = this;
        // 添加选择之后的效果
        if (val === "全部") {
          discounts_list.forEach(function (v, key) {
            v.type = false;
            that.all_discounts_type = true;
          });
        } else {
          that.all_discounts_type = false;
          discounts_list.forEach(function (v, key) {
            if (key === index) {
              v.type = true;
            } else {
              v.type = false;
            }
          });
        }
      },

      // 价格选择条件
      choose_price(val, index) {
        const that = this;
        const {price_list} = this;
        // 添加选择之后的效果
        if (val === "全部") {
          price_list.forEach(function (v, key) {
            v.type = false;
            that.all_price_type = true;
          });
        } else {
          that.all_price_type = false;
          price_list.forEach(function (v, key) {
            if (key === index) {
              v.type = true;
            } else {
              v.type = false;
            }
          });
        }
      }
    }
  };
</script>

<style scoped>
  .class-condition {
    width: 1200px;
    height: auto;
    border: 1px solid #dcdcdc;
    padding: 0;
  }

  .class-condition li {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dcdcdc;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    padding: 0 45px;
  }

  .class-condition li:last-child {
    border-bottom: none;
  }

  li .li-tit {
    font-size: 15px;
    color: #333;
    font-weight: bold;
  }

  li .li-choose-all {
    display: inline-block;
    border: 1px solid #ff6900;
    padding: 3px 5px;
    font-size: 15px;
    color: #ff6900;
    line-height: 15px;
    margin-right: 25px;
    cursor: pointer;
  }

  li .li-choose {
    display: inline-block;
    font-size: 15px;
    color: #666;
    padding: 5px 8px;
    line-height: 15px;
    background: #fff;
    cursor: pointer;
    margin-right: 25px;
  }

  li .li-choose:hover {
    background: #ff6900;
    color: #fff;
  }

  li .active {
    background: #ff6900;
    color: #fff;
  }
</style>
