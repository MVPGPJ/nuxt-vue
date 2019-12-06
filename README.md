简体中文

# 前言

**Nuxt**就是基于**Vue**的一个应用框架，采用**服务端渲染**，让你的**SPA应用(Vue)**也可以拥有**SEO**

# 

# 技术栈

nuxt2 + vue + vuex + vue-router（路由系统nuxt自动集成，node服务express）

## 项目运行

```
git clone ------

# 安装依赖环境 -- 各类包和插件
# 注意 ： yarn 安装时报cache错误，请先执行yarn cache clean
npm install / yarn 

# 本地开发环境
npm run dev / yarn dev

# 模版快速生成 (自己情况请自定义)
npm run tep `文件名`  / yarn tep xxx

# pm2方式部署 --- （建议初期使用dist文件部署）
npm run start / yarn start

# dist部署方式
npm run generate / yarn generate      默认是正式环境的包
npm run generate:dev / yarn generate:dev        打包开发环境下的静态包
npm run generate:test / yarn generate:test       打包测试环境下的静态包
npm run generate:pre / yarn generate:pre        打包预发环境下的静态包
```

## 补充



# 目标功能



# 业务介绍

目录结构

    ├── api                   	 // api请求
    ├── assets                   // 静态资源
    │   ├── images                 		// 图片资源
    │   ├── styles                    // 样式文件
    ├── components               // 组件
    ├── config
    │   └── index.js                  // 配置文件
    ├── layouts                  // 布局
    ├── middleware               // 中间件
    ├── pages                    // 页面
    ├── plugins                  // 插件（引入各类三文件）
    ├── static                   // 静态资源
    └── store                    // vuex状态树
    └── utils   								 // 常用工具类



# 说明

>  

# 开发记录

### nuxt模版搭建

这里关于项目初始化，我是直接使用的 `Nuxt` 官网提供的 create-nuxt-app

```shell

# 确保安装了npx（npx在NPM版本5.2.0默认安装了）：
npx create-nuxt-app <项目名>

它会让你进行一些选择:
  1.在集成的服务器端框架之间进行选择:
    None (Nuxt默认服务器)
    Express
    Koa
    Hapi
    Feathers
    Micro
    Adonis (WIP)
  2.选择您喜欢的UI框架:
    None (无)
    Bootstrap
    Vuetify
    Bulma
    Tailwind
    Element UI
    Buefy
  3.选择你想要的Nuxt模式 (Universal or SPA)
  4.添加 axios module 以轻松地将HTTP请求发送到您的应用程序中。
  5.添加 EsLint 以在保存时代码规范和错误检查您的代码。
  6.添加 Prettier 以在保存时格式化/美化您的代码。

# 启动本地服务
npm run dev

```

访问 http://localhost:3000 ，现在我们来看下初始化好的项目目录

注意：nuxt默认会读取pages里面的vue文件，自动生成路由，如需要自定义路由，可在nuxt.config.js中配置对应参数。

### request请求封装

数据和展示层的剥离是有必要的，这也是为什么前端都提倡MV*的设计模式，而对request请求封装是我们第一步要完成的。这里我选了axios作为HTTP请求客户端，axios兼容浏览器端和node端，同时提供了请求拦截、响应拦截等让我们开发更加愉快的功能。

在 `config/index.js` 中写入：

```
module.exports = {
  IS_RELEASE: true, // true线上，false测试

  BASE_URL: `http://localhost:3000/api`, // 测试

  // BASE_URL: `https://./api`, // 生产

  // IMG_URL: 'http://localhost:9000/', // 测试

  IMG_URL: 'https://', // 生产

  HEADERS: {
    'Content-Type': 'application/json;charset=UTF-8'
  },

  TIMEOUT: 12000, // api超时时间

};

```

在 `assets/utils/request.js` 中写入：

```

import axios from 'axios';
import config from '~/config';
import { Toast } from 'mint-ui';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.timeout = config.TIMEOUT;
axios.defaults.headers = config.HEADERS;

// 请求拦截器
axios.interceptors.request.use( request => {
  if (!config.IS_RELEASE) {
    console.log(
      `${new Date().toLocaleString()}【 M=${request.url} 】P=`,
      request.params || request.data,
    );
  }
  return request;
}, error => {
  return Promise.reject(error);
});

export default async (options = { method: 'GET' }) => {
  let isdata = true;
  if (
    options.method.toUpperCase() !== 'POST'
    && options.method.toUpperCase() !== 'PUT'
    && options.method.toUpperCase() !== 'PATCH'
  ) {
    isdata = false;
  }
  const res = await axios({
    method: options.method,
    url: options.url,
    data: isdata ? options.data : null,
    params: !isdata ? options.data : null,
  });
  if (res.status >= 200 && res.status < 300) {
    if (!config.IS_RELEASE) {
      console.log(
        `${new Date().toLocaleString()}【接口响应：】`,
        res.data,
      );
    }
    // 浏览器环境弹出报错信息
    if(typeof window !== "undefined" && res.data.code !== 0) {
      Toast(res.data.msg);
    }
    return res.data;
  }else {
    if(typeof window !== "undefined" && res.data.code !== 0) {
      Toast('请求错误');
    }
  }

};

```

最后所有api请求都写进server.js文件，方便统一管理。

### 跨域处理

使用过 `vue` 的同学，肯定知道对于项目中的跨域，`vue-cli` 对 `webpack` 中的 `proxy` 选项进行了一层封装。它暴露出来的是一个叫 `proxyTable` 的选项，是对 `webpack` 中的 `proxy` 和其三方插件 `http-proxy-middleware` 的一个整合。

不幸的 `Nuxt` 中没有 `proxyTable` 这么一个配置项来进行跨域的配置。当然幸运的是，在 `Nuxt` 中你可以直接通过配置 `http-proxy-middleware`  来处理跨域。更幸运的是 `Nuxt` 官方提供了两个包来处理 `axios` 跨域问题。

- [@nuxtjs/axios](https://www.npmjs.com/package/@nuxtjs/axios)
- [@nuxtjs/proxy](https://www.npmjs.com/package/@nuxtjs/proxy)

首先，进行安装

```shell
npm i @nuxtjs/axios @nuxtjs/proxy -D
```

然后在 `nuxt.config.js` 文件里进行配置

```
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',{
        // target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: { '^/api' : '/' }
      }
    ]
  ],
```

然后你就可以安心使用你的 axios 进行跨域请求了

### 项目部署

拥有一个服务器

| 命令            | 描述                                       |
| ------------- | ---------------------------------------- |
| dev           | 启动一个热加载的 Web 服务器（开发模式） [localhost:3000](http://localhost:3000/) |
| start         | 以pm2守护启动一个 Web 服务器 (`nuxt build` 会先被执行)   |
| generate      | 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)    |


#### 开始部署


上传代码到服务器，然后执行命令npm run start 监听3000端口。
接下来，开始配置你的 nginx （用于端口转发）

```
 server {
  # 端口，http为 80，如果部署了https请监听 443
  listen 80;
  # 域名
  server_name gongpengji.com;
  # 反向代理
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

然后重启 nginx

```
nginx -s restart
```

然后你就能在 gong peng ji.com 访问到你的网站啦


### 最后

对于 `Nuxt`，在使用层面，是比较简单、好上手的。相对 vue-ssr 来说，它大大的简化了开发的配置，让开发人员可以只需思考业务的开发，而不用太去担心文件的配置。其中 `Nuxt` 通过监听 pages 目录文件变更并自动生成路由更是直接省去了我们平常对于路由的配置。

目前 `Nuxt` 整体还是有待提高的，社区相关的三方插件比较有限，市面上相关的参考资料也相对比较少。
