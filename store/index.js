import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import admin from './modules/admin/index'
import company from './modules/company/index'

export default () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      admin,
      company
    } 
  })
}
