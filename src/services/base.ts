// import qs from 'qs';

let base: string;
// const hostName = window.location.hostname;
if (process.env.NODE_ENV === "development") {
  base = "/api"; // 代理模式
  // base = `http://8.129.55.191`; // 非代理模式
} else {
  base = `http://8.129.55.191`;
}

export { base }; // 环境域名
