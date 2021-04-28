# webpack-externals-match-plugin

## 简介

在使用`webpack`的`externals`时，会遇到设置的externals模块可能会有一些相对路径引用，此时往往无法将该模块命中为外部模块。
当前插件用于增强`externals`匹配规则。

## 使用

> webpack.js

```js
const WebpackExternalsMatchPlugin = require('webpack-externals-match-plugin');

module.exports = {
  plugins:[
    new WebpackExternalsMatchPlugin({
      'react':'window.React',
      'a/src/config':'window.myConfig',
    })
  ]
}
```

## 匹配模式

`WebpackExternalsMatchPlugin`插件只能接收一个对象参数，

例如如下配置：

```js
{
  'react':'window.React',
  'a/src/config':'window.myConfig',
}
```

其中 `a/src/config`

如果时在`a`包中相对引用`config`模块

`import '../config'`

此时在匹配强会将`../config`转换成`xx/node_modules/a/src/config`

然后通过处理掉`node_modules`后变换成`a/src/config`进行匹配。
