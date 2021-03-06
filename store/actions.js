import axios from 'axios'
import Vue from 'vue'
export default {
  async nuxtServerInit({ commit , state}, { req }) {
    commit('setApi', process.env.apiUrl);
    if (req.session && req.session.userInfo) {
      commit('SET_USER', req.session.userInfo)
      commit('setUserIsLogin', 1)
      let res = await this.dispatch('mineGet', {url: '/app/personal/my_info',data: {}})
      commit('setUser', res.data)
    }
    else {
       commit('SET_USER',null)
       commit('setUserIsLogin', 0)

    }
  },


  delPosts({ commit, state, getters }) {
  	 commit('setPosts', `${getters.setTest}`)
  	 commit('setUser',456)
  },

  async httpGet({commit,state},params) {
    const { data } = await axios({
      method: 'get',
      url: state.baseURL+params.url,
      params: params.data
    });
    return data;
  },
 
  async httpPost({commit,state},params) {
    const { data } = await axios({
      method: 'post',
      url: state.baseURL+params.url,
      data: params.data
    });
    return data;
  },
  
  async mineGet({commit,state},params) {
    const { data } = await axios({
      method: 'get',
      headers:{token: state.userInfo.token},
      //headers:{token: 'c264c8e9b5f1a6103f3113f9546b874e'},
      url: state.mineURL+params.url,
      params: params.data
    });
    return data;
  },
  async minePost({commit,state},params) {
    const { data } = await axios({
      method: 'post',
      headers:{token: state.userInfo.token},
      //headers:{token: 'c264c8e9b5f1a6103f3113f9546b874e'},
      url: state.mineURL+params.url,
      data: params.data
    });
    return data;
  },
  login({commit,state},ht) {
    return fetch('/api/login', {
        // 发送客户端 cookies 到服务端
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:ht.username,
          password:ht.password
        })
      })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return res.json()
        }
      })
      .then((userInfo) => {
        if(userInfo.status==1) {
          commit('SET_USER', userInfo.userInfo)
          commit('setIsLogin', 1)
        }
        return userInfo;
      })

  },

  logout ({ commit ,state}) {
    return fetch('/api/logout', {
        // 发送客户端 cookies 到服务端
        credentials: 'same-origin',
        method: 'POST'
      })
      .then(() => {
        commit('SET_USER', null)
        commit('setIsLogin', 0)
      })
  }
}

