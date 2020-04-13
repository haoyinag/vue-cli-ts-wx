/** 库 */

import { UserGetters, UserMutations, UserActions } from "./user_types";

const initPageState = () => {
  return {
    foo: "Food",
    num: 111,
    userInfo: {
      _id: "",
      name: "用户名",
      avator: ""
    }
  };
};

const getters = {
  /**
   * getters：在页面中通过mapGetters解构获取
   *    在getters中不允许更改state，
   *    更改state只能在mutations中进行，
   * state：当前的state
   * getter：
   * rootState：整个store树的state
   */
  [UserGetters.SET_NUM](state) {
    return state.num;
  },
  [UserGetters.GET_USER_NAME](state, getter, rootState) {
    console.log(state, getter, rootState);
    return state.userInfo.name;
  }
};

const mutations = {
  /**
   * mutations：对store中state的同步操作
   * 页面调用：this.$store.emit('方法'，传递的参数)
   * @param state 当前的state
   * @param pageState 传递的参数
   */
  [UserMutations.SET_NUM](state: any, pageState: string) {
    // console.log(state, pageState);
    state.num += pageState;
    console.log(state.num);
  },
  [UserMutations.SET_USER_NAME](state: any, pageState: any) {
    // console.log(state, pageState);
    state.userInfo.name = pageState;
    console.log(state.userInfo.name);
  }
};

const actions = {
  /**
   * actions：异步操作，返回同步对mutations
   *    context：上下文，相当于箭头函数对this
   *    payload：参数
   */
  [UserActions.SET_USER_NAME_ASYNC]({ commit }: any, payload: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(UserMutations.SET_USER_NAME, payload);
        resolve();
      }, 1000);
    });
  }
};

const user = {
  /**
   * namespaced: true,一定要加，使其成为带命名空间的模块，
   * 否则报错：module namespace not found in mapState():
   * 而且·class组件·中的·namespace·关键字注册·module·必须用到
   */
  namespaced: true,
  /**
   * state：页面中通过this.$store.state.user获取
   */
  state: initPageState(),
  getters,
  mutations,
  actions
};

export default user;
