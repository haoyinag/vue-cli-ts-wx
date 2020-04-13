// import Search from "./Search.vue"; // 直接加载
// import Result from "./Result.vue";

/**  利用webpack封装提供的import方法实现懒加载，即进入该路由才会加载该js */
const Search = () => import("./Search.vue");
const Result = () => import("./Result.vue");

export { Search, Result };
