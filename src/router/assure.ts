import { RouteItem } from "./types";
import { Search, Result } from "@/views";

export const assureRoutes: RouteItem[] = [
  {
    path: "/assure_search",
    name: "Assure",
    meta: {
      title: "保函真伪查询"
    },
    component: Search
  },
  {
    path: "/assure_result",
    name: "Result",
    meta: {
      title: "保函查询结果"
    },
    component: Result
  }
];
