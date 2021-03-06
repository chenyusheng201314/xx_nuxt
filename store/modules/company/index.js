import Vuex from 'vuex'
import axios from 'axios'

const state = {
  isLogin: 0,
  companyUsername:'',
  companyInfo:{},
  token: '9cf37de69dd6592564bdc23d23242704',
  userInfo: '',
  baseUrl: '',
  fileAddUrl: '',
  sex: {0:'--',1:'男',2:'女'},
  inp: '',
  now_nav: '首页',
  companyRole:{}
};
const mutations = {
  setCompanyToken(state, res) {
    state.token = res
  },
  serUser(state, user) {
    state.userInfo = user
  },
  setCompanyIsLogin(state, isLogined) {
    state.isLogin = isLogined
  },
  setCompanyUsername(state,username){
    state.companyUsername = username
  },
  setCompanyRole(state, res) {
    state.companyRole = res
  },
  setCompanyApi(state,res) {
    console.log(res)
    state.baseUrl = res
    state.fileAddUrl = res+'/common/file/add'
  },
  setCompanyInfo(state,res) {
    state.companyInfo = res
  }
};
const actions = {
  async nuxtServerInit({commit, state}, {req}) {
    commit('setCompanyApi', process.env.apiUrl);
    if (req.session && req.session.companyToken && req.session.companyInfo) {
      commit('setCompanyToken', req.session.companyToken);
      // commit('setCompanyToken', "9cf37de69dd6592564bdc23d23242704");
      commit('setCompanyIsLogin',1)
      commit('setCompanyUsername',req.session.companyUsername)
      let hm = {url: "/company/acl/role_my_info",data:{role_id:req.session.companyInfo.role_id}}
      let res = await this.dispatch("companyHttpGet",hm)
      commit('setCompanyRole',res)
      let paramst = {url: "/company/company/company_info",data:{}}
      let rest  = await this.dispatch("companyHttpGet",paramst)
      commit('setCompanyInfo',rest.data)
    }
    else {
      commit('setCompanyUsername', '');
      commit('setCompanyIsLogin', 0,'');
      commit('setCompanyToken', '');
      commit('setCompanyInfo',{})
    }

  },
  
  // 登录
  async company_login({commit, state}, ht) {
    let res = await axios.post('/api/company_login', ht);
    if (res.data.token) {
      commit('setCompanyToken', res.data.token)
      commit('setCompanyIsLogin', 1)
      commit('setCompanyUsername',ht.mobile)
      let hm = {url: "/company/acl/role_my_info",data:{role_id:res.data.role_id}}
      let rest = await this.dispatch("companyHttpGet",hm);
      commit('setCompanyRole',rest)
      let paramsd = {url: "/company/company/company_info",data:{}}
      let resd  = await this.dispatch("companyHttpGet",paramsd)
      commit('setCompanyInfo',resd.data)
      res.isLogin = 1
    } else {
      commit('setCompanyToken', '')
      commit('setCompanyIsLogin', 0)
      commit('setCompanyUsername','')
      res.isLogin = 0
    }
    return res
  },
  async company_logout({commit, state}) {
    await axios.post('/api/company_logout');
    commit('setCompanyToken', '')
    commit('setCompanyIsLogin', 0)
    commit('setCompanyUsername','')
  },
  async companyHttpGet({commit, state}, params) {
    const {data} = await axios({
      method: 'get',
      url: state.baseUrl + params.url,
      headers: {'token': state.token},
      params: params.data
    });
    if(data.code==2001) {
      commit('setCompanyIsLogin', 0)
    }
    if(data.code!==0) {
      data.data = {}
      data.data.data = []
    }
    return data;
  },
  async companyHttpPost({commit, state}, params) {
    const {data} = await axios({
      method: 'post',
      url: state.baseUrl + params.url,
      headers: {'token': state.token},
      data: params.data
    })
    return data;
  },

}

export default {
  state, mutations, actions
}
