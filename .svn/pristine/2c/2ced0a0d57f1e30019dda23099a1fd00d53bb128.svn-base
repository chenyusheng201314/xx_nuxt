import Vuex from 'vuex'
import axios from 'axios'

const state = {
  isLogin: 0,
  token: '',
  userInfo: '',
  baseUrl: 'https://platform.vpx.com.cn/api/v1',
  fileAddUrl:'https://platform.vpx.com.cn/api/v1/common/file/add',
  sex:['男','女'],
 
}
const mutations = {

  setToken(state, res) {
    state.token = res
  },
  serUser(state, user) {
    state.userInfo = user
  },
  setIsLogin(state, isLogined) {
    state.isLogin = isLogined
  },
 

}
const actions = {
  // changeLeftNav(context, params) {
  //   context.commit('newName', params)
  // }

  async nuxtServerInit({commit, state}, {req}) {
     
    // console.log(req.session.token);
    // commit('setToken', "ff17c841b1e2e615db2f625d9b21bc01");
    // commit('setIsLogin', 1)
    if (req.session && req.session.token) {
      console.log(2);
      commit('setToken', req.session.token);
      commit('setIsLogin', 1)
    }
    else {
      console.log(1);
      commit('setToken', '');
      commit('setIsLogin', 0);
    }
  },
  // 登录
  async admin_login({commit, state}, ht) {
    let res = await axios.post('/api/logins', ht);

    if (res.data.token) {
      commit('setToken', res.data.token)
      commit('setIsLogin', 1)
      return 1
    } else {
      commit('setToken', '')
      commit('setIsLogin', 0)
      return 0
    }
  },
  async admin_logout({commit, state}) {
    await axios.post('/api/admin_logout');
  },
  async adminHttpGet({commit,state},params) {
    const { data } = await axios({
      method: 'get',
      url: state.baseUrl+params.url,
      headers:{'token':state.token},
      params: params.data
    })
    return data;
  },
  async adminHttpPost({commit,state},params) {
    const { data } = await axios({
      method: 'post',
      url: state.baseUrl+params.url,
      headers:{'token':state.token},
      data: params.data
    })
    return data;
  },

}

export default {
  state, mutations, actions
}
