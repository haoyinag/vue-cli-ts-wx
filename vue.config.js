const path = require("path");

/** 视图插件 */
const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");

/** 优化插件 */
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 代码压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const tsImportPluginFactory = require("ts-import-plugin");

/** 环境判断 */
const isProduction = process.env.NODE_ENV !== "development";

/** 主题路径 */
const myTheme = path.resolve(__dirname, "src/theme.less");

// cdn链接
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     // vue: 'Vue',
//   },
//   // cdn的css链接
//   css: [
//     // 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
//   ],
//   // cdn的js链接
//   js: [
//     // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
//   ]
// };

//gzip压缩
function Gzip(config) {
  const productionGzipExtensions = ["html", "js", "css"];
  return config.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件
    })
  );
}

//代码压缩
function UglifyJs(config) {
  return config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        //生产环境自动删除console
        compress: {
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ["console.log"]
        }
      },
      sourceMap: false,
      parallel: true
    })
  );
}

/** 公共代码抽离 */
function Optimization(config) {
  return (config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        styles: {
          name: "styles",
          test: /\.(sa|sc|c)ss$/,
          chunks: "all",
          enforce: true
        },
        runtimeChunk: {
          name: "manifest"
        }
      }
    }
  });
}

/** 图片压缩 */
function UglifyImage(config) {
  return config.module
    .rule("images")
    .use("image-webpack-loader")
    .loader("image-webpack-loader")
    .options({ bypassOnDebug: true })
    .end();
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  /** 构建时开启多进程处理 babel 编译--打包优化 */
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  chainWebpack: config => {
    // UglifyImage(config);
    // ============注入cdn start============
    // config.plugin("html").tap(args => {
    //   // 生产环境或本地需要cdn时，才注入cdn
    //   if (isProduction || devNeedCdn) args[0].cdn = cdn;
    //   return args;
    // });
    // ============注入cdn start============
  },
  configureWebpack: config => {
    UglifyJs(config);
    Optimization(config);
    // 生产环境相关配置
    if (isProduction) {
      Gzip(config);
    }

    // 用cdn方式引入，则构建时要忽略相关资源
    // if (isProduction || devNeedCdn) config.externals = cdn.externals
  },
  // webpack-dev-server 相关配置
  devServer: {
    hot: true,
    open: process.platform === "darwin",
    // host: "localhost",
    // port: 3001, //8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        // target: "https://emm.cmccbigdata.com:8443/",
        target: "http://8.129.55.191",
        // target: "http://47.106.136.114/",
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/api": ""
        }
      }
    },
    before: app => {}
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${myTheme}";`
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [".ignore"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false // 允许在媒体查询中转换`px`
          })
        ]
      }
    }
  }
  // ...
};
