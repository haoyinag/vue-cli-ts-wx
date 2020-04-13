# wechat 微信端项目

**基于 vue-cli 脚手架，集成 typescript，并使用有赞的 vant-ui 搭建的移动 web 端项目**

**高度兼容微信公众号开发，内置微信 sdk，提供注册微信以及分享的 api ，并提供一键开启微信端调试利器 [vconsole](https://github.com/Tencent/vConsole/blob/dev/README_CN.md) 。**

**本项目以及对应的 react 版本会持续迭代，持续更新且不止于框架自身新功能、ES6+等前端的新技术**

### 使用技术

整个 vue 工程使用的都是最新的技术，所以不用担心有哪些新特性出现不兼容的问题。

#### vue 全家桶

- "vue-cli": "~4.2.0"
- "vue": "^2.6.11"
- "vuex": "^3.1.2"
- "vue-router": "^3.1.5"
- "vuex-class": "^0.3.2" `包装vuex的装饰器`
- "vue-property-decorator" `装饰器`
- "vue-class-component": "^7.2.2" `class组件`

#### UI 库

- "vant": "^2.0.5"

#### 第三方库

- "typescript": "~3.7.5
- "postcss-px-to-viewport": "^1.1.1" `viewport 适配`
- "flyio": "^0.6.14" `接口请求，更好的支持多端以及更灵活的请求处理`
- ...

## 项目运行

### 安装依赖

```
yarn install
```

### 本地开发

```
yarn serve
```

### 打包

```
yarn build
```

### 代码检测

```
yarn lint
```
