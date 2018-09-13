import Vuex from 'vuex'
const state = {
    leftNav: 'jingna',
    wei: ['yu', 'ning']
}
const mutations = {
    changeName(state, res) {
        state.liu = res
    },
    newName(state, res) {
        console.log("moduleOne.mutations----newName")
        console.log(res)
        state.liu = res
    }
}

const actions = {
    changeNameA(context) {
        context.commit('changeName', '南京')
    },
    newName(context, params) {
        console.log(`moduleOne.actions=====${params}`)
        context.commit('newName', params)
    }
}

export default {
    state, mutations, actions
}