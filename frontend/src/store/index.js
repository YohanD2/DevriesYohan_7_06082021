import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      authenticated: false,
      role: null
    },
    mutations: {
      setAuthentication(state, status) {
        state.authenticated = status;
      },
      setRole(state, status) {
        state.role = status;
      }
    },
    plugins: [createPersistedState()]
})


