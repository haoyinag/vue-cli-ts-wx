import qs from "qs";
import fly, { FlyRequestConfig } from "flyio";
import { Toast } from "vant";

import { base } from "./base";
import { errorCodes } from "./status";

fly.config.baseURL = base; // 请求域名配置--添加了代理
fly.config.timeout = 20000;
fly.config.headers = {
  //   token,
  "Content-Type": "application/json;charset=UTF-8"
};

//添加请求拦截器
fly.interceptors.request.use((request: FlyRequestConfig) => {
  // request.headers["X-Tag"] = "flyio"; //请求头设置方式二
  Toast.loading({
    message: "加载中...",
    forbidClick: true
  });
  if (request.method!.toUpperCase() === "GET") {
    request.body = qs.stringify(request.body);
  }
  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    console.log(response);
    return new Promise((resolve, reject) => {
      //只将请求结果的data字段返回
      if (response.data.success) {
        setTimeout(() => {
          //   Toast.hide();
          return resolve(response.data);
        }, 350);
      } else {
        setTimeout(() => {
          //   Toast.hide();
          //   Toast.info(`${response.data.errorCode}:${response.data.errorMsg}`, 3);
          return reject(response.data);
        }, 350);
      }
    });
  },
  (err: any) => {
    const code = errorCodes.filter(code => code.code === err.status) || [];
    setTimeout(() => {
      //   Toast.hide();
      let text;
      if (code.length > 0) {
        text = code[0].msg;
      } else {
        switch (err.status) {
          case 0:
            text = `网络无连接，请检查网络后重试`; // 网络异常
            break;
          case 1:
            text = `网络不佳，请检查网络后重试`; // timeout超时
            break;
          default:
            text = `${err.status}:${err.message || "请求失败"}`;
            break;
        }
      }
      console.log(text);
      Toast.fail(text);
      //   Toast.fail(text, 3, () => {}, true);
    }, 350);
    //发生网络错误后会走到这里
    // console.log(err);
    return Promise.reject(err);
  }
);
export default fly;

/**
 * 使用说明：
 * 
  get：
    fly.get('/user', {
        id: 133
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  post：
    fly.post('/user', {
        name: 'Doris',
        age: 24
        phone:"18513222525"
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
 *
 
 1、 发起多个请求
    function getUserRecords() {
    return fly.get('/user/133/records');
    }

    function getUserProjects() {
    return fly.get('/user/133/projects');
    }

    fly.all([getUserRecords(), getUserProjects()])
    .then(fly.spread(function (records, projects) {
        //两个请求都完成
    }))
    .catch(function(error){
        console.log(error)
    })

    2、发送 FormData
     var formData = new FormData();
     var log=console.log
     formData.append('username', 'Chris');
     fly.post("../package.json",formData).then(log).catch(log)

    3、请求二进制数据
    fly.get("/Fly/v.png",null,{
        responseType:"arraybuffer"
    }).then(d=>{
    //d.data 为ArrayBuffer实例
    })
 */
