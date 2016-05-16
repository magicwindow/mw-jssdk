import Ajax from './ajax';
import Uri from './uri';
import Promise from './promise';
import common from './common';
import config from './config';
import device from './device';
import apis from './apis';
import Markting from './marketing';

let deeplinks;
let deeplinksPromise;
let markting = new Markting();

export default class Mlink {

  constructor() {
    this.cache = {};
  }

  /**
   * 场景还原方法
   * @param callback
   * @param onError
   * @returns {PromisePolyfill}
   */
   deferrerRedirect(callback, onError) {
    return new Promise(()=>{
      this.getDeferrerInfo().then((result)=>{
        if (typeof callback === 'function') {
          callback(result);
        }
      }, ()=>{
        if (typeof onError === 'function') {
          onError(result);
        }
      });
    });
  }

  /**
   * 拼接成真正的url
   *
   * @param url String 后台DeepLink 字符串
   * @param params        JSONObject 动态参数
   * @return String
   */
  getRealUrl(url, params, defaultParams) {

    if (!url) {
      return "";
    }

    params = params || {};
    defaultParams = defaultParams || {};
    params = common.mix(defaultParams, params);

    let uri = new Uri(url);
    let scheme = uri.scheme;
    let host = uri.host;
    let path = uri.path;
    let query = uri.queryString;
    let hash = uri.hash;
    let realUriBuilder = [];

    realUriBuilder.push(scheme);
    realUriBuilder.push("://");
    realUriBuilder.push(host);

    path = this.replacePathParams(path, params);
    realUriBuilder.push(path);

    query = this.replaceQueryParams(query, params);
    realUriBuilder.push(query);

    hash = this.replacePathParams(hash, params);
    realUriBuilder.push('#'+ hash);

    return realUriBuilder.join('');
  }

  /**
   * 替换Path中的动态参数
   * @param path
   * @param params
   * @returns {String}
   */
  replacePathParams (path, params) {
    let result = [];
    let exp = /^:/;

    path = (typeof path === 'string') ? path.split('/') : path;

    path.forEach((seg)=>{
      if (seg.match(exp)) {
        result.push(params[seg.replace(exp, '')] || '');
      } else {
        result.push(seg);
      }
    });

    return result.join('/');
  }

  /**
   * 替换QueryString中的动态参数
   * @param query
   * @param params
   * @returns {string}
     */
  replaceQueryParams (query, params) {
    let queryArr = query.split('&');
    let exp = /^:/;
    let result = [];

    if (queryArr.length > 0) {
      queryArr.forEach((paramSet)=>{
        paramSet = paramSet.split('=');

        let key = paramSet[0];
        let value = paramSet[1];

        if (value && value.match(exp)) {
          value = params[value.replace(exp, '')] || '';
        }

        result.push([key, value].join('='));
      });
    }

    return (result.length>0) ? ('?' + result.join('&')) : '';
  }


  /**
   *
   * @param failUrl
   */
  openDownloadUrl (failUrl) {
    setTimeout(()=> {
      var hidden;
      if (typeof document.hidden !== "undefined") {
        hidden = document.hidden;
      } else if (typeof document.mozHidden !== "undefined") {
        hidden = document.mozHidden;
      } else if (typeof document.msHidden !== "undefined") {
        hidden = document.msHidden;
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = document.webkitHidden;
      } else {
        hidden = false;
      }

      this.sendDplEvent(failUrl);

      if (hidden === false) {
        window.location.href = failUrl;
      }
    }, 1500);
  }

  /**
   * mLink跳转()
   * @param url
   * @param data
   * @param params
   */
  redirect(mlinkUrl, params) {

    this.loadDefaultParams().then((defaultParams)=>{

      let realUrl = this.getRealUrl(mlinkUrl, params, defaultParams);

      // 微信
      if (device.isWeixin()) {

        // Universal Link直接跳转
        if (/^https?:\/\//.test(realUrl)) {
          window.location.href = realUrl;
        } else {
          this.showWeixinDownloadModal();
        }

      } else {
          window.location.href = realUrl;
      }
    });
  }

  /**
   * 显示微信下载链接的提示
   */
  showWeixinDownloadModal () {
    let tips = document.createElement('div');
        tips.id = 'mw-download-tips';

    if (device.isAndroid()) {
      tips.classList.add('android');
      tips.classList.remove('ios');
    } else if (isIos()) {
      tips.classList.add('ios');
      tips.classList.remove('android');
    }
    document.body.appendChild(tips);
  }

  /**
   * 从Markting接口加载魔窗默认参数(如果有缓存,返回的将是缓存数据,缓存周期为当前文档的生命周期)
   */
  loadDefaultParams () {

    return new Promise(function(resolve, reject) {

      markting.load().then((response)=>{
        var defaultParams = (response.data||{}).mp;
        resolve(defaultParams);
      }, ()=>{
        reject();
      });
    });
  }

  /**
   * 加载发送方所有的Deeplinks
   * @returns {*}
   */
  loadDPLs () {
    let cache = this.cache;

    if (cache['deeplinks']) {
      // 如果Deeplinks已经加载完成, 则直接执行resolve
      return new Promise((resolve)=>{
        resolve(cache['deeplinks']);
      });
    } else if (cache['deeplinksPromise']) {
      // 直接返回还未处理完成的Promise
      return cache['deeplinksPromise'];
    }

    let url = apis.deeplinks;
    let ajax = new Ajax();
    let params = {
        ak  : config.constant('appkey') || config.constant('ak'),
        av  : config.constant('appVersion') || config.constant('av'),
        sv  : device.sdkVersion,
        uid : device.uuid,
        fp  : device.getCanvasFingerprint(),
        d   : device.getCanvasFingerprint(),
        os  : device.os,
        osv : device.version,
        m   : device.model,
        mf  : device.manufacturer,
        sr  : device.screen
    };

    cache['deeplinksPromise'] = ajax.request({
      url: url,
      type: 'POST',
      dataType: 'json',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      ContentType: 'application/json',
      params: params
    }).then((response)=>{
      cache['deeplinks'] = response.data;
      cache['deeplinksPromise'] = null;
    }, ()=>{
      cache['deeplinksPromise'] = null;
    });

    return cache['deeplinksPromise'];
  }


  /**
   * 加载场景还原所需要的数据
   * @returns {*}
   */
  getDeferrerInfo () {

    let cache = this.cache;

    if (cache['deferrerCache']) {
      // 如果Deeplinks已经加载完成,则直接执行resolve
      return new Promise((resolve)=>{
        resolve(cache['deferrerCache']);
      });
    } else if (cache['deferrerPromise']) {
      // 返回还未resolve的Promise对象
      return cache['deferrerPromise'];
    }

    let url = apis.deferrerInfo;
    let ajax = new Ajax();
    let params = {
      ak  : config.constant('appkey') || config.constant('ak'),
      av  : config.constant('appVersion') || config.constant('av'),
      sv  : device.sdkVersion,
      uid : device.uuid,
      fp  : device.getCanvasFingerprint(),
      d   : device.getCanvasFingerprint(),
      os  : device.os,
      osv : device.version,
      m   : device.model,
      mf  : device.manufacturer,
      sr  : device.screen
    };

    cache['deferrerPromise'] = ajax.request({
      url: url,
      type: 'POST',
      dataType: 'json',
      ContentType: 'application/json',
      params: params
    }).then((response)=>{
      cache['deferrerCache'] = response.data;
      delete cache['deferrerPromise'];
    }, ()=>{
      delete cache['deferrerPromise'];
    });

    return cache['deferrerPromise'];
  }

  /**
   * 没有安装过接收方的app,需要调用一下dp/event接口
   *
   * @param dt        用户mLink的动态参数
   * @param realUrl   mLink发起方url
   */
  sendDplEvent(data, realUrl) {

    let url = apis.deeplinkEvent;
    let ajax = new Ajax();
    let params = {
      ak  : config.constant('appkey') || config.constant('ak'),
      av  : config.constant('appVersion') || config.constant('av'),
      sv  : device.sdkVersion,
      uid : device.uuid,
      dp  : realUrl,
      ack : data.ack,
      dt  : data,
      fp  : device.getCanvasFingerprint(),
      d   : device.getCanvasFingerprint(),
      os  : device.os,
      osv : device.version,
      m   : device.model,
      mf  : device.manufacturer,
      sr  : device.screen
    };

    ajax.request({
      url: url,
      type: 'POST',
      dataType: 'json',
      ContentType: 'application/json',
      params: params
    });
  }

}
