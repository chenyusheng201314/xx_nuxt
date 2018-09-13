import Vuex from 'vuex'
const state = {
    leftNav:  [
        {
          name: '首页配置',
          link: '/admin/main/app',
          active: true
        }, {
          name: '更新管理',
          link: '/admin/main/app/update',
          active: false
        }, {
          name: '闪屏广告',
          link: '/admin/main/app/adv',
          active: false
        }, {
          name: '意见反馈',
          link: '/admin/main/app/feedback',
          active: false
        } 
      ],
    wei: ['yu', 'ning']
}
const mutations = {
    changeLeftNav(state, res) {
        state.leftNav = res
    }
}
const actions = {
    changeLeftNav(context, params) {
        context.commit('newName', params)
    }
}

export default {
    state, mutations, actions
}