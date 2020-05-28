import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // baseUrl:"http://localhost:5000",
    baseUrl:"https://pmtapi.elvischuks.com.ng",
    data:[],
    failed:[],
  },
  mutations: {
    setBookingData(state,payload){
      [state.data,state.failed] = payload;
      
    }
  },
  actions: {
  },
  getters:{
    getBaseUrl:state =>{
      return state.baseUrl
    },
    getSuccess:state => {
      return state.data
    },
    getFailed:state => {
      return state.failed
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    }),
  ],
})
