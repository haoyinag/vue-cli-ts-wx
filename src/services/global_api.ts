// import qs from "qs";
import fly from "./fly";
import { getUrlParams } from "@/utils/utils.ts";

const version = "v1";

//注册微信sdk
export const configWxApi = () => {
  const param = getUrlParams(window.location.href);
  return fly.get(
    `/api/wx/${version}/auth/jsapi/wxJsApiSignature`,
    {
      accountId: param ? param.accountId : 1, //需要在缓存中获取
      url: window.location.href,
      debug: false
    },
    {}
  );
};
