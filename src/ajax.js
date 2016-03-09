import Common from './common';
import Promise from './promise';

export default class Ajax {

  /**
   * Constructor
   * @returns {*}
   */
  constructor() {

  }

  /**
   * 发起一个Ajax请求，从服务器加载JSON数据或HTML片段，支持JSONP请求。
   *
   * 代码实例：
   *
   *     @example
   *     new Ajax({
   *         url: 'api/list',
   *         method: 'GET',
   *         params: {cat:'123', userId:'kjfjrek132454nnfsdj'},
   *         callback: function(json, http, xtra){
   *
   *         }
   *     });
   *
   * @param {Object} options               Ajax请求配置对象
   * @param {String} options.method        请求类型：GET 或 POST
   * @param {String} options.url           请求地址（URL），如果URL的domain与目前domain不一致，会导致跨域问题
   * @param {Number} options.tries         在请求失败时重新尝试请求的次数
   * @param {Object} options.params        附加的URL后面或者POST数据的参数，如果method=='GET'，则拼接到URL后；如果method=='POST'=='POST',则以POST数据发送。
   * @param {Function} options.success     请求成功的回调方法
   * @param {Function} options.filter      过滤向服务器发送的参数
   * @param {Function} options.complete    请求完成时的回调方法，无论请求成功都会被调研；
   * @param {Function} options.beforeSend  发送请求前调用，返回false时http请求将会被终止；
   * @param {Function} options.xtra        Callback arguments
   *
   * @returns {Promise}
   */
  request(options={}) {

    let http,
      filter = options.filter,
      onBeforeSend = options.beforeSend,
      onSuccess = options.success || options.callback,
      onError = options.error,
      onComplete = options.complete,
      timeout = options.timeout || 100000,
      url = options.url,
      method = options.method || options.type || 'GET',
    //xtra = options.xtra,
      dataType = options.dataType || 'text',
      params = options.params || options.data,
      defaultHeaders = {
        "ContentType": options.ContentType || 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"
      },
      headers = {};

    // Extend defalt headers
    for (let k in defaultHeaders) {
        headers[k] = defaultHeaders[k];
    }

    // Extend custom headers
    if (options.headers) {
      for (let k in options.headers) {
          headers[k] = options.headers[k] || defaultHeaders[k];
      }
    }

    method = method.toUpperCase();

    return new Promise((resolve, reject)=>{

      let successHandler = (data)=> {
        typeof onSuccess === 'function' && onSuccess(data);
        resolve(data);
      };

      let errorHandler = (msg) => {
        typeof onError === 'function' && onError(msg);
        reject(msg);
      };

      // Load jsonp
      if (dataType && dataType.toLowerCase() === 'jsonp') {
        url += (url.indexOf('?') === -1 ? '?' : '&') + this.seriesParams(params, filter);
        this.loadJsonp(url, successHandler, errorHandler, timeout);
      } else {

        http = Ajax.create();

        if (method === 'POST') {
          params = (headers.ContentType === 'application/json') ? JSON.stringify(params) : this.seriesParams(params, filter);
        } else {
          url += (url.indexOf('?') === -1 ? '?' : '&') + this.seriesParams(params, filter);
          params = null;
        }

        http.open(method, url, true);
        http.setRequestHeader('Method', method.toUpperCase() + ' ' + url + ' HTTP/1.1');
        http.setRequestHeader('Content-type', headers.ContentType);

        http.onreadystatechange = ()=> {
          this.onReadyStatusChange(http, dataType, successHandler, onComplete, errorHandler);
        };

        if (typeof onBeforeSend !== 'function' || onBeforeSend.call(http)!==false) {
          http.send(params);
        }
      }
    });
  }

  /**
   * Http Request status change listener
   * @param http
   * @param xtra
   * @param dataType
   * @param onSuccess
   * @param onComplete
   * @param onError
   */
  onReadyStatusChange (http, dataType, onSuccess, onComplete, onError) {

    if (http.readyState !== 4) {
      return;
    }

    if (typeof onComplete === 'function') {
      onComplete.call(null);
    }

    if (http.status === 200) {

      let responseText = http.responseText;

      // JSON
      if (dataType.toUpperCase() === 'JSON') {

        /*jslint evil: true*/
        try {
          var json = new Function('return ' + responseText)();

          if (json && typeof onSuccess === 'function') {
            onSuccess(json);
          }
        } catch(e) {}
      } else if (typeof onSuccess === 'function') {
        onSuccess(responseText);
      }

    } else {
      onError('Error code:'+ http.status, http);
    }
  }

  /**
   * 拼接参数
   * @param {Object} params
   * @returns {string}
   */
  seriesParams (params, filter) {
    let tmp = [];
    let j;

    if (params) {
      for (let i in params) {
        j = params[i];
        tmp.push(i + '=' + (typeof filter === 'function' ? filter.call(null, j) : escape(j)));
      }
    }

    return tmp.join('&');
  }

  /**
   * request use jsonp
   * @param url
   * @param onSuccess
   */
  loadJsonp (url, onSuccess, onError, timeout) {
    let cbHandler = 'ajax_cb_' + new Date().getTime() + '_' + Math.floor(Math.random() * 500),
      script = document.createElement('script');

    url += (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + cbHandler;

    window[cbHandler] = function (data) {
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
      delete window[cbHandler];
      document.head.removeChild(script);
    };

    if (timeout>0) {
      setTimeout(function() {
        if (window[cbHandler]) {
          typeof onError === 'function' && onError();
        }
      }, timeout);
    }

    document.head.appendChild(script);
    script.src = url;
  }


  /**
   *
   * @method
   * @member fetch
   */
  fetch (url, data, callback, type) {
    if ( this.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return this.http({
      url: url,
      method: 'GET',
      dataType: type,
      data: data,
      success: callback
    });
  }

  /**
   * @method
   * @member post
   */
  post (url, data, callback, type) {

    if ( this.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return this.http({
      url: url,
      method: 'POST',
      dataType: type,
      data: data,
      success: callback
    });
  }

  /**
   * Creates XMLHttpRequest
   * @static
   * @member create
   * @return {XMLHttpRequest}
   */
  static create() {
    var http;

    try {
      http = new XMLHttpRequest();
    } catch (e) {
      try {
        http = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (f) {
        try {
          http = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (g) {
          console.log(g);
        }
      }
    }

    return http;
  }
}
