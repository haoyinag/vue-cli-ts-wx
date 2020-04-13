import { RouteItem } from "./types";
// import { UseStore } from "@/views";

export const storeRoutes: RouteItem[] = [
  {
    path: "/use_store",
    name: "UseStore",
    meta: {
      title: "vuex使用"
    },
    component: () => import("@/views/UseStore/index.vue")
  }
];
