export default {
  setPosts(state, data) {
    state.posts = data
  },
  setUser(state, data) {
    state.user = data
  },
  SET_USER(state, user) {
    state.userInfo = user
  },
  setIsLogin(state, isLogined) {
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
  }
}
