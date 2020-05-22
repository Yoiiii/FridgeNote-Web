import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectFridge: '',
    FridgeList: [],
    userName:'',
    userId:'',
  },
  mutations: {
    changeFridge(state, payload){
      state.selectFridge = state.FridgeList[payload]
    },
    setFridgeList(state,payload){
      state.FridgeList=payload
    },
    setUserInfo(state,payload){
      state.userName=payload.userName
      state.userId=payload.userId
    },
    deleteUserInfo(state){
      state.userName=''
      state.userId=''
    }
  },
  actions:{
    async getFridgeList(context,payload){
      const res = await Vue.prototype.$http.post("getfridgelist/", { id: payload });
      context.commit('setFridgeList',res.data)
      context.commit('changeFridge',0)
    }
  }
})

export default store