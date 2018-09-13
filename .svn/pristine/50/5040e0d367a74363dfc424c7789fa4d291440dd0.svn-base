import axios from 'axios'
import Vue from 'vue'
export default {
  async nuxtServerInit({ commit , state}, { req }) {

 
    if (req.session && req.session.userInfo) {

      commit('SET_USER', req.session.userInfo)
      commit('setIsLogin', 1)
    }
    else {
       commit('SET_USER',null)
       commit('setIsLogin', 0)
    }


  },
  async getIndexInfos({ commit, state, getters }, params) {

    const { data } = await axios.post(`http://3g.pqbszs.com/home-case-index-catId-12.html`, params)
    commit('setPosts', data.list.data)
    return data
  },

  delPosts({ commit, state, getters }) {
  	 commit('setPosts', `${getters.setTest}`)
  	 commit('setUser',456)
  },

  async httpGet({commit,state},params) {
    const { data } = await axios({
      method: 'get',
      url: state.apiUrl+params.url,
      headers:{'token':state.token},
      params: params.data
    })
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

