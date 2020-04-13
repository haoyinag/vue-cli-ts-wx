<template>
  <div class="use-store">
    UseStore
    <br />
    {{ getName }}
    <br />
    {{ foo }}
    <br />
    {{ num }}
    <br />
    {{ getNum }}
    <br />
  </div>
</template>

<script lang="ts">
/**
 * 在ts中使用vuex有两种方式：
 * 1、通过命名空间
 *      注意：使用这种方式对应的module必须有命名空间·namespaced: true·，
 *      然后通过·vuex-class·中的·namespace·关键字注册·module·
 *          如：const userModule = namespace("user");
 *      这样就能拿到对应的·user·模块对应的权限；
 *      最后通过·@命名变量·使用，如：@userModule.State(state => state.num) num;
 * 2、通过装饰器
 *      如通过·vuex-class·的装饰器·State·也可以获取对应·vuex·的·state·
 *      使用方式如：@State("user") stateFoo；其中·user·是对应的模块，
 *      ·stateFoo·是对应模块的·state·的映射。
 */
/** 库 */
// import { mapGetters, mapMutations, mapActions } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action, namespace } from "vuex-class";

/** 本地 */
import {
  ModulesName,
  UserGetters,
  UserMutations,
  UserActions
} from "@/store/types";
// import { Button } from "vant";

const moduleName = ModulesName.user;
const userModule = namespace(moduleName);

@Component({
  name: "useStore"
  //   computed: {
  //     /** ·computed· 只能在装饰器·@Component·中而非·class·组件中生效*/
  //     ...mapGetters([UserGetters.GET_USER_NAME, UserGetters.SET_NUM])
  //   },
  //   created: function(): void {
  //     /** 当装饰器·@Component·和·class·中同时含有声明周期函数当时候，只有·class· 中的·created·会被执行*/
  //     console.log("@Component中的created");
  //   }
})
export default class UseStore extends Vue {
  // computed = {/** 这里的·computed·只是相当于一个变量 */};
  async created() {
    /** 1、·namespace·命名空间-模块使用 */
    this.foo = this.stateFoo.foo;
    this.getNum = this.num2;
    setTimeout(() => {
      this.getNum = this.setNum(100);
    }, 1000);
    await this.setUserNameAsync("哈哈");
    /** 如果想获取正确的值·哈哈·，对应的·action·的异步函数必须有一个异步的·return· */
    this.getName = this.userName;
    await this.setUserNameAsync2("呵呵呵");
    this.getName = this.userName2;
    setTimeout(() => {
      this.getNum = this.setNum2(500);
    }, 1000);
  }
  /** 1、·namespace·命名空间-模块使用 */
  @userModule.State(state => state.num) num;
  @userModule.State(state => state.userInfo.name) userName;
  @userModule.Mutation(`${UserMutations.SET_NUM}`) setNum;
  @userModule.Action(`${UserActions.SET_USER_NAME_ASYNC}`) setUserNameAsync;

  /** 2、装饰器使用--必须加上命名空间前缀 */
  @State(`${moduleName}`) stateFoo;
  @Getter(`${moduleName}/${UserGetters.SET_NUM}`) num2;
  @Getter(`${moduleName}/${UserGetters.GET_USER_NAME}`) userName2;
  @Mutation(`${moduleName}/${UserMutations.SET_NUM}`) setNum2;
  @Action(`${moduleName}/${UserActions.SET_USER_NAME_ASYNC}`)
  setUserNameAsync2;
  private foo = "";
  private getNum = "";
  private getName = "";
}
</script>

<style lang="stylus">
.use-store {
  width: 80%;
  height: 500px;
  margin-left: 10%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
