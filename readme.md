# React tailwindcss 环境搭建

## 1. 搭建webpack配置

### 1.1 安装依赖

本文不是专门讲解webpack react工程配置的，所以这里使用了自己封装的react webpack预设工具(pd-js-config、pd-css-config)，如果大家感兴趣也可以自己配置自己的webapck react开发环境

> TIPS: tailwindcss是通过postcss以及tailwind插件进行编译的，所以如果是自己搭建环境的话，需要安装postcss，且版本需要在8以上

```bash
yarn add pd-js-config pd-css-config webpack webpack-cli webpack-merge -D 

yarn add react react-dom
```

### 1.2 安装tailwind相关的依赖

```bash

yarn add tailwindcss@lastest postcss@lastest autoprefixer

```

## 2.配置

### 2.1 webpack配置

```javascript
"use strict";

const path = require("path");
const { merge } = require("webpack-merge");
const { default: getJSConfig } = require("pd-js-config");
const { default: getCssConfig } = require('pd-css-config');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(
  {
    entry: "./src/main.js",
    context: path.resolve(__dirname),
    mode: 'production',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [],
    },
    resolve: {
      extensions: [".jsx", ".js", ".css"],
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
      }),
    ],
  },
  getJSConfig({
    jsx: true,
    env: "development",
  }),
  getCssConfig({
    env: 'development',
    cssSplit: {
      enable: true
    },
    useCssModule: false,
    preCompile: 'none'
  })
);

```

### 2.2 配置tailwindcss和postcss

**官方建议**：直接通过tailwind的脚手架来进行生成

> 其中`-p`代表同时生成postcss的配置文件

```bash
npx tailwind init -p
```

**具体配置如下**

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```javascript
module.exports = {
  // 这一部分配置是用到了purgecss
  // 后续会说，主要是用于样式的tree shaking
  purge: {
    mode: 'all',
    enable: true,
    content: ["./index.html", "./src/**/*.{js,jsx}", "./src/app.{js,jsx}"],
  },
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

## 3. 使用

### 3.1 tailwindcss 初体验

至此，所有的配置都已经完成，写一个页面来测试吧

```jsx
import React from "react";

const App = () => {
  return (
    <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        class="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
        src="//www.tailwindcss.cn/img/erin-lindford.jpg"
        alt="Woman's Face"
      />
      <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">Erin Lindford</p>
          <p class="text-gray-500 font-medium">Product Engineer</p>
        </div>
        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Message
        </button>
      </div>
    </div>
  );
};

export default App;
```

### 3.2 效果

![](image/1.png)
