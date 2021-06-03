import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const auth = {
    namespaced: true,
    state: {
        token: "",
    },
    actions: {

    },
    mutations: {
       setUser(state,payload){
           state.user = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        removeToken(state) {
            state.token = ""
        }
    },
    getters: {
        token(state) {
            return state.token;
        },
    }
}