import firebase from 'firebase'

const state = {
    count: 0,
    user: {
        email: null,
        password: null
    },
    error: []
}
const getters = {

}
const mutations = {
    changeCount (state) {
        state.count++
    },
    increment (state) {
        state.count--
    },
    register (state, payload) {
        state.user = payload
    }
}
const actions = {
    lessCount (context) {
        setTimeout(() =>    {
            context.commit('increment')
        },1000)
    },
    async register ({ commit }, payload) {
        await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
              .then(response => {
                  commit('register', response.user)
              })
              .catch(error => {
                  this.error = error.message
              })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}