#### vuex-class

vuex-class 是一个基于 Vue、Vuex、vue-class-component 的库，和 vue-property-decorator 一样，它也提供了 4 个修饰符以及 namespace，解决了 vuex 在 .vue 文件中使用上的不便的问题。

- @State
- @Getter
- @Mutation
- @Action
- namespace

```typescript
/**
 * 在ts中使用vuex有两种方式：
 * 1、通过命名空间--必须用命名空间注册
 *      注意：使用这种方式对应的module必须有命名空间·namespaced: true·，
 *      然后通过·vuex-class·中的·namespace·关键字注册·module·
 *          如：const userModule = namespace("user");
 *      这样就能拿到对应的·user·模块对应的权限；
 *      最后通过·@命名变量·使用，如：@userModule.State(state => state.num) num;
 * 2、通过装饰器--必须加上命名空间前缀
 *      如通过·vuex-class·的装饰器·State·也可以获取对应·vuex·的·state·
 *      使用方式如：@State("user") stateFoo；其中·user·是对应的模块，
 *      ·stateFoo·是对应模块的·state·的映射。
 */
```
