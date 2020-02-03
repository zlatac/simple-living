export default new Vuex.Store({
    state: {
        meow: ''
    },
    mutations: {
        meow(state, payload) {
            state.meow = payload
        }
    }
})