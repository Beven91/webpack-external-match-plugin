const webpack = require('webpack');
const path = require('path');

class WebpackExternalsMatchPlugin {

  constructor(mapping) {
    this.mapping = mapping || {};
  }

  apply(compiler) {
    new webpack.ExternalsPlugin('module', this.matchExternals).apply(compiler);
  }

  /**
   * 兼容掉相对路径引用
   * @param {*} context 
   * @returns 
   */
  normalizeRequest(context) {
    let request = context.request;
    if (request[0] === '.') {
      // 如果是相对路径
      const segments = path.join(context.context, request).split('node_modules' + path.sep);
      segments.shift();
      request = segments.join('').replace(/\\/g, '/');
    }
    return request;
  }

  /**
   * 自定义匹配模式，在完全匹配情况下，兼容掉相对路径引用
   * @param {*} context 
   * @param {*} callback 
   * @returns 
   */
  matchExternals = (context, callback) => {
    const mapping = this.mapping;
    const request = this.normalizeRequest(context);
    const matched = mapping[request] || mapping[request + '/index'];
    matched ? callback(null, matched) : callback();
  }
}

module.exports = WebpackExternalsMatchPlugin;