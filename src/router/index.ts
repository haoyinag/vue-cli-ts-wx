import Vue from "vue";
import VueRouter from "vue-router";
// import  { Route } from 'vue-router' 类型检测
// import Home from "../views/Home.vue";
// import { Search } from "@/views";
import { storeRoutes } from "./useStore";

const Home = () => import("../views/Home.vue");
const page404 = () => import("../views/404.vue");

Vue.use(VueRouter);

// interface RouteItem

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页"
    },
    component: Home
  },
  {
    path: "*",
    name: "Home",
    meta: {
      title: "页面丢失"
    },
    component: page404 // () => import(/* webpackChunkName: "about" */ "../views/404.vue")
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "关于"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: page404 // () => import(/* webpackChunkName: "about" */ "../views/404.vue")
  },
  ...storeRoutes
];

const router = new VueRouter({
  mode: "hash",
  // mode：如果是生产环境需要用history模式，后台需要配置路由重定向
  // mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(from);
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
  /*如果需要登录，当前没有登录，直接跳转到登录页*/
  // if (to.meta.Auth && !store.state.loginStatus) {
  //     return next({ name: 'Login', query: {path: to.name}})
  // }
  // next()
});

export default router;
