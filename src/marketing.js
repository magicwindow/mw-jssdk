import config from './config';
import Ajax from './ajax';
import Promise from './promise';
import device from './device';
import apis from './apis';

export default class Marketing {

  /**
   * 获取参数
   * @returns {{server: string, ak: *, av: *, sv: *}}
   */
  getParams () {
    return {
      ak: device.appKey || config.constant('appkey'),
      os: device.os,
      sv: device.sdkVersion,
      d : device.uuid,
      sr: device.screen,
      av: device.appVersion || config.constant('av'),
      fp: device.getCanvasFingerprint()
    };
  }

  /**
   * 替换参数
   * @param url
   * @param params
   * @returns {*|XML|void|string}
   */
  applyParams (url, params) {
    if (url) {
      for (let k in params) {
        url = url.replace('{'+ k.toUpperCase() +'}', params[k]);
      }
    }

    url = url.replace(/\{(\w)*\}/g, '');
    return url;
  }

  /**
   * 获取服务器
   * @returns {string|*|{res}|void|XML}
   */
  getServer() {
    return config.constant('server').replace(/\/$/, '');
  }

  /**
   * 加载Marketing数据
   * @param {Function} [callback] 如果有此参数, 则使用回调方式加载,否则使用Promise模式
   * @returns {*}
     */
  load (callback) {
    if (typeof callback !== 'undefined') {
      return this.loadCallback(callback);
    } else {
      return this.loadPromise();
    }
  }

  /**
   * 加载 Marketing 数据
   * @param {Fucntion} callback
   */
  loadCallback (callback) {

    // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
    //let macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
    let params = this.getParams();
    let url = this.getServer() + apis.marketing;
    let ajax = new Ajax();

    return ajax.request({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      params: params,
      success: callback,
      error: (msg) => {
        console.log(msg);
      }
    });
  }

  /**
   * 加载 Marketing 数据
   * @returns {Promise|PromisePolyfill}
   */
  loadPromise () {

    // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
    //let macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
    let params = this.getParams();
    let url = this.getServer() + apis.marketing;
    let ajax = new Ajax();

    return ajax.request({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      params: params
    });

  }
}
