import Vue from "vue";
import Vuex from "vuex";
import { GlobalTypes } from "./types";
import user from "./modules/user";

Vue.use(Vuex);
const initPageState = {
  token: ""
};
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  // 具体模块
  modules: {
    user
  },
  state: initPageState,
  mutations: {
    [GlobalTypes.SAVE_TOKEN](state: any, pageState: any) {
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    }
  },
  actions: {}
});

export default store;
