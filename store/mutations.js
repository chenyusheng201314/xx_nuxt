export default {
  setPosts(state, data) {
    state.posts = data
  },
  setUser(state, data) {
    state.user = data
  },
  SET_USER(state, user,username) {
    state.userInfo = user
  },
  setUserIsLogin(state, isLogined) {
    state.isLogin = isLogined
  },
  setToken(state, token) {
    state.token = token
  },
  changeLoginBoxVisible(state, visible) {
    state.isLoginBoxVisible = visible;
  },
  changeLoginState(state, isLogined) {
    state.isLogined = isLogined;
  },
  setApi(state,res) { 
    state.baseURL = res
    state.mineURL = res
    state.mineBaseURL = res.replace(/\/api\/v1/g,"")
  }
}
