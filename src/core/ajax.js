import Common from './common.js';

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
   * @class Ajax
   * @param {Object} options               Ajax请求配置对象
   * @param {String} options.method        请求类型：GET 或 POST
   * @param {String} options.url           请求地址（URL），如果URL的domain与目前domain不一致，会导致跨域问题
   //* @param {String} options.target        Element ID that will receive http.responseText
   * @param {Number} options.tries         在请求失败时重新尝试请求的次数
   * @param {Object} options.params        附加的URL后面或者POST数据的参数，如果method=='GET'，则拼接到URL后；如果method=='POST'=='POST',则以POST数据发送。
   * @param {Function} options.success     请求成功的回调方法
   * @param {Function} options.filter      过滤向服务器发送的参数
   * @param {Function} options.complete    请求完成时的回调方法，无论请求成功都会被调研；
   * @param {Function} options.beforeSend  发送请求前调用，返回false时http请求将会被终止；
   * @param {Function} options.xtra        Callback arguments
   */
   http(options={}) {

    let http = Ajax.create(),
        self = this,
        tried = 0,
        tmp, i, j,
        filter = options.filter,
        onBeforeSend = options.beforeSend,
        onSuccess = options.success || options.callback,
        onError = options.error,
        onComplete = options.complete,
        tries = options.tries,
        target = options.target,
        timeout = options.timeout || 100000,
        url = options.url,
        method = options.method || options.type || 'GET',
        xtra = options.xtra,
        dataType = options.dataType || 'text',
        params = options.params || options.data;

    method = method.toLowerCase();

    if (params) {
      if (typeof params === 'object') {
        tmp = [];

        for (i in params) {
          j = params[i];
          tmp.push(i + '=' + (typeof filter === 'function' ? filter.call(null, j) : escape(j)));
        }

        params = tmp.join('&');
      }

      if (method === 'get') {
        url += url.indexOf('?') === -1 ? '?' + params : '&' + params;
      }
    }

    if (dataType && dataType.toLowerCase() === 'jsonp') {
      var cbHandler = 'ajax_cb_' + new Date().getTime() + '_' + Math.floor(Math.random() * 500),
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

          }
        }, timeout);
      }

      document.head.appendChild(script);
      script.src = url;
      return;
    }

    http.open(method, url, true);

    if (method === 'post') {
      http.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    } else {
      params = null;
    }

    http.onreadystatechange = function () {

      if (http.readyState !== 4) {
        return;
      }

      if (typeof onComplete === 'function') {
        onComplete.call(null);
      }

      if (http.status === 200) {

        // JSON
        if (dataType.toUpperCase() === 'JSON') {
          var text = http.responseText;

          /*jslint evil: true*/
          try {
            var json = new Function('return ' + text)();

            if (json && typeof onSuccess === 'function') {
              onSuccess.call(null, json, http, xtra);
            }
          } catch(e) {
            if (Common.isFunction(onError)) {

            }
          }

          return;
        }

        if (target) {
          if (http.getResponseHeader('content-type').match(/(html|plain)/)) {
            self.parseHTML(target, http.responseText);
          }
        }

        if (typeof onSuccess === 'function') {
          onSuccess.call(null, true, http, xtra);
        }
      } else {
        if (tries > 0) {
          if (tried < tries) {
            tried++;
            http.abort();
            http.send(params);
          }
        } else if (typeof onError === 'function') {
          onError.call(null, false, http, xtra);
        }
      }
    };

    if (typeof onBeforeSend !== 'function' || onBeforeSend.call(http)!==false) {
      http.send(params);
    }

    return http;
  }


  /**
   * @method
   * @member fetch
   */
  fetch (url, data, callback, type) {
    if ( this.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return this.ajax({
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

    return ajax({
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
