import Ajax from './ajax';
import Uri from './uri';
import Promise from './promise';
import common from './common';
import config from './config';
import device from './device';
import apis from './apis';

let deeplinks;
let deeplinksPromise;

export default class Mlink {

  constructor() {}

  /**
   * 拼接成真正的url
   *
   * @param url String 后台DeepLink 字符串
   * @param params        JSONObject 动态参数
   * @return String
   */
  getRealUrl(url, params) {

    if (!url) {
      return "";
    }

    if (!params) {
      params = {};
    }

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
   * 跳转
   * @param url
   * @param data
   * @param params
   */
  redirect(url, data, params) {

    let ack = data.ak;
    let iosDownloadUrl = 'http://fir.im/mwshowios';
    let androidDownloadUrl = 'http://fir.im/mwshowandroid';
    let iosLink = 'mwshow://campaign/'+ ack;
    let androidLink = iosLink;
    let ios9Link = 'https://s.mlinks.cc/AAAc?key='+ ack;

    let realUrl = this.getRealUrl(url, params);
    //window.location = realUrl;

    // > IOS 9.0
    if (device.isWeixin()) {

      let tips = document.createElement('div');
      tips.id = 'mw-download-tips';

      let protocol = (ios9Link);

      if (device.isIos9() && (protocol === 'http' || protocol === 'https')) {
        window.location.href = ios9Link;
      } else {

        if (device.isAndroid()) {
          tips.classList.add('android');
          tips.classList.remove('ios');
        } else if (isIos()) {
          tips.classList.add('ios');
          tips.classList.remove('android');
        }

      }

    } else {

      if (device.isIos()) {
        let protocol = new Uri(ios9Link).scheme;
        if (device.isIos9() && (protocol === 'http' || protocol === 'https')) {
          window.location.href = ios9Link;
        } else {
          window.location.href = iosLink;
          this.openDownloadUrl(iosDownloadUrl);
        }
      } else {
        window.location.href = androidLink;
        this.openDownloadUrl(androidDownloadUrl);
      }
    }
  }

  /**
   * 加载发送方所有的Deeplinks
   * @returns {*}
   */
  loadDPLs () {

    if (deeplinks) {
      // 如果Deeplinks已经加载完成,则直接执行resolve
      return new Promise((resolve)=>{
        resolve(deeplinks);
      });
    } else if (deeplinksPromise) {
      // 返回还未处理完成的Promise
      return deeplinksPromise;
    }

    let url = config.constant('server').replace(/\/$/,'') + apis.deeplinks;
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

    deeplinksPromise = ajax.request({
      url: url,
      type: 'POST',
      dataType: 'jsonp',
      ContentType: 'application/json',
      params: params
    }).then((response)=>{
      deeplinks = response.data;
      deeplinksPromise = null;
    }, ()=>{
      deeplinksPromise = null;
    });

    return deeplinksPromise;
  }


  /**
   * 加载发送方所有的Deeplinks
   * @returns {*}
   */
  getDPLs () {

    if (deeplinks) {
      // 如果Deeplinks已经加载完成,则直接执行resolve
      return new Promise((resolve)=>{
        resolve(deeplinks);
      });
    } else if (deeplinksPromise) {
      // 返回还未处理完成的Promise
      return deeplinksPromise;
    }

    let url = config.constant('server').replace(/\/$/,'') + apis.getDeeplinks;
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

    deeplinksPromise = ajax.request({
      url: url,
      type: 'POST',
      dataType: 'json',
      ContentType: 'application/json',
      params: params
    }).then((response)=>{
      deeplinks = response.data;
      deeplinksPromise = null;
    }, ()=>{
      deeplinksPromise = null;
    });

    return deeplinksPromise;
  }

  /**
   * 没有安装过接收方的app,需要调用一下dp/event接口
   *
   * @param dt        用户mLink的动态参数
   * @param realUrl   mLink发起方url
   */
  sendDplEvent(data, realUrl) {

    let url = config.constant('server').replace(/\/$/,'') + apis.deeplinkEvent;
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
