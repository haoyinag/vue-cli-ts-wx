// @ts-nocheck

import { configWxApi } from "@/services";

/** 判断非空 */
export const isNotEmpty = (v: any) => v !== null && v !== undefined && v !== "";

/** 获取url参数 */
export function getUrlParams(url = window.location.href) {
  const d: any = decodeURIComponent;
  const splitArr = url ? url.split("?") : [];
  let queryString = url
    ? splitArr[splitArr.length - 1]
    : window.location.search.slice(1);
  // console.log(queryString);
  const obj: any = {};
  if (queryString) {
    if (queryString.indexOf("###") === -1) {
      queryString = queryString.split("#")[0]; // eslint-disable-line
    }
    // console.log(queryString);
    const arr = queryString.split("&");
    for (let i = 0; i < arr.length; i += 1) {
      const a = arr[i].split("=");
      let paramNum;
      const paramName = a[0].replace(/\[\d*\]/, v => {
        paramNum = v.slice(1, -1);
        return "";
      });
      const paramValue =
        typeof a[1] === "undefined" || a[1] === "undefined" ? "" : a[1];
      if (obj[paramName]) {
        console.log(typeof paramNum);
        if (typeof obj[paramName] === "string") {
          obj[paramName] = d([obj[paramName]]);
        }
        // if (typeof paramNum === 'undefined') {
        //   obj[paramName].push(d(paramValue));
        // } else {
        //   obj[paramName][paramNum] = d(paramValue);
        // }
      } else {
        if (isNaN(+d(paramValue))) {
          obj[paramName] = d(paramValue);
        } else {
          obj[paramName] = +d(paramValue);
        }
      }
    }
  }
  return obj;
}

/** 去除字符串内空格 */
export function clearStrSpace(str: any) {
  return str.replace(/\s*/g, ""); // 去除字符串内所有的空格：
  // 去除字符串内两头的空格：str = str.replace(/^\s*|\s*$/g, "");
  // 去除字符串内左侧的空格：str = str.replace(/^\s*/, "");
  // 去除字符串内右侧的空格：str = str.replace(/(\s*$)/g, "");
}

/** storage存/取 */
export function cacheStorage(name: any, value: any) {
  if (value) {
    if ("object" === typeof value)
      window.localStorage.setItem(name, JSON.stringify(value));
    else window.localStorage.setItem(name, value);
  } else {
    const newvalue: any = window.localStorage.getItem(name);
    try {
      return JSON.parse(newvalue);
    } catch (error) {
      return newvalue;
    }
  }
}

/** 数组去重 */
export function uniqueArray(array: any, field: any) {
  const res: any = [];
  const json: any = {};
  for (let i = 0; i < array.length; i += 1) {
    if (!json[array[i]]) {
      res.push(array[i]);

      let uniqueStr = array[i];
      if (field && field in array[i]) {
        uniqueStr = array[i][field];
      }
      json[uniqueStr] = 1;
    }
  }
  return res;
}

/** 过滤掉对象值为 undefined 和 空字符串 和 空数组 的属性 */
export function filterNullValue(obj: any) {
  const result: any = {};
  if (obj && Object.keys(obj).length >= 1) {
    Object.keys(obj).forEach(key => {
      if (key && obj[key] !== undefined && obj[key] !== "") {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
          return;
        }
        result[key] = obj[key];
      }
    });
  }
  return result;
}

/** 判断是否为空对象{} */
export function isEmptyObject(obj: any) {
  if (typeof obj === "object") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

/** 判断是否为对象 */
export function isObject(value: any) {
  const type = typeof value;
  return !!value && (type === "object" || type === "function");
}

/** 判断是否为数组 */
export function isArray(value: any) {
  return Array.isArray(value);
}

/** 转数字 */
export function toNumber(str: any) {
  return parseInt(str, 10) || 0;
}

/** 深拷贝 */
export function deepClone(value: any) {
  if (!isObject(value)) {
    return value;
  }
  if (isArray(value)) {
    return value.reduce(
      (prev: any, current: any) => prev.concat(deepClone(current)),
      []
    );
  } else {
    return Object.keys(value).reduce((prev: any, current: any) => {
      prev[current] = deepClone(value[current]); // eslint-disable-line
      return prev;
    }, {});
  }
}

//微信分享
export function wxShare(_option: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接
  imgUrl: string; // 分享图标
  success?: any;
  cancel?: any;
}) {
  configWxApi()
    .then((res: any) => {
      console.log("_option", _option);
      console.log(res);
      window.wx.config(res.data);
      wx.ready(function() {
        //分享给朋友
        wx.onMenuShareAppMessage(_option);
        // wx.updateAppMessageShareData(_option); //（1.4.0）
        //分享到朋友圈
        wx.onMenuShareTimeline(_option);
        // wx.updateTimelineShareData(_option); //（1.4.0）
      });
      wx.error((error: any) => {
        console.error(error);
        // Toast.info(`${error.errMsg}`, 3);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        // alert("接口验证失败，详细信息：\n" + JSON.stringify(error));
      });
      //  提示服务器异常暂时取反
    })
    .catch((err: any) => {
      console.log(err);
    });
}
