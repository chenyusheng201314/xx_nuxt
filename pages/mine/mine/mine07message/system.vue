<template>
  <div class="clearfix">
    <div class="msg-read-all" @click="read_all">全部标记为已读</div>
    <div class="mine-title">
      <div class="h-title">系统消息</div>
    </div>
    <ul>
      <li class="msg-li" v-for="(item, index) in messages" :key="index">
        <div class="d-inline-block text-overflow-one msg-msg" :title="item.con">{{item.con}}<span class="msg-read" v-show="!item.readed">·</span></div>
        <div class="d-inline-block text-right msg-time">{{item.time}}</div>
      </li>
    </ul>
    <Paging class="paging" v-if="pageData.total" :key="pageData.total" :pageData="pageData" @changeList="paging"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/paging'
export default {
  name: 'system',
  data () {
    return {
      messages: [
        {
          id: 0,
          con: '这是一条消这是一条消息这是',
          time: '2018-09-09'
        }, {
          id: 2,
          con: '这是一条消这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息息',
          time: '2018-09-09'
        }, {
          id: 3,
          con: '这是一条消这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息息',
          time: '2018-09-09'
        }, {
          id: 4,
          con: '这是一条消这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息息',
          time: '2018-09-09'
        }
      ],
      pageData: {
        total: 10,
        current: 1,
        visible: 8
      }
    }
  },
  components: {Paging},
  methods: {
    read_all () {
    },
    // 切换分页
    paging (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped>
  .msg-read-all {
    float: right;
    font-size: 15px;
    color: #666;
    padding-right: 32px;
  }
  .msg-li {
    font-size: 15px;
    line-height: 16px;
    color: #666;
    padding: 17px 30px;
    border-bottom: 1px solid #e5e5e5;
  }
  .msg-msg {
    width: 80%;
  }
  .msg-read {
    font-size: 30px;
    line-height: 16px;
    color: #ff6900;
    vertical-align: sub;
    margin-left: 8px;
  }
  .msg-time {
    width: 19%;
  }
  .paging {
    margin-top: 45px;
    margin-bottom: 0!important;
  }
</style>
