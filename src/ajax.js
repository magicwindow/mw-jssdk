
mw.extend(mw, {

  /**
   * 发起一个Ajax请求，从服务器加载JSON数据或HTML片段，支持JSONP请求。
   *
   * 代码实例：
   *
   *     @example
   *     mw.ajax({
   *         url: 'api/list',
   *         method: 'GET',
   *         params: {cat:'123', userId:'kjfjrek132454nnfsdj'},
   *         callback: function(json, http, xtra){
   *
   *         }
   *     });
   *
   * @member mw.ajax
   * @param {Object} options               Ajax请求配置对象
   * @param {String} options.method        请求类型：GET 或 POST
   * @param {String} options.url           请求地址（URL），如果URL的domain与目前domain不一致，会导致跨域问题
   //* @param {String} options.target        Element ID that will receive http.responseText
   * @param {Number} options.tries         在请求失败时重新尝试请求的次数
   * @param {Object} options.params        附加的URL后面或者POST数据的参数，如果method=='GET'，则拼接到URL后；如果method=='POST'=='POST',则以POST数据发送。
   * @param {Function} options.callback    请求回调方法
   * @param {Function} options.filter      过滤向服务器发送的参数
   * @param {Function} options.onload
   * @param {Function} options.onrequest
   * @param {Function} options.xtra        Callback arguments
   */
  ajax : function(options) {

    var http = this.create(),
      self = this,
      tried = 0,
      tmp, i, j,
      onload = options.onload,
      onrequest = options.onrequest,
      filter = options.filter,
      callback = options.callback || options.success,
      tries = options.tries,
      target = options.target,
      url = options.url,
      method = options.method,
      xtra = options.xtra,
      dataType = options.dataType || 'html',
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
        if (typeof callback === 'function') {
          callback(data);
        }
        delete window[cbHandler];
        document.head.removeChild(script);
      };

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

      if (typeof onload === 'function') {
        onload.call(null);
      }

      if (http.status === 200) {

        // JSON
        if (dataType.toUpperCase() === 'JSON') {
          var text = http.responseText;

          /*jslint evil: true*/
          var json = new Function('return ' + text)();

          if (json && typeof callback === 'function') {
            callback.call(null, json, http, xtra);
          }

          return;
        }

        if (target) {
          if (http.getResponseHeader('content-type').match(/(html|plain)/)) {
            self.parseHTML(target, http.responseText);
          }
        }

        if (typeof callback === 'function') {
          callback.call(null, true, http, xtra);
        }
      } else {
        if (tries > 0) {
          if (tried < tries) {
            tried++;
            http.abort();
            http.send(params);
          }
        } else if (typeof callback === 'function') {
          callback.call(null, false, http, xtra);
        }
      }
    };

    if (typeof onrequest === 'function') {
      onrequest.call(null);
    }

    http.send(params);

    return http;
  },

  /**
   * @method
   * @member mw.get
   */
  'get': function(options) {
    options.method = 'GET';
    options.dataType = options.dataType === 'jsonp' ? 'json' : options.dataType;
    this.request(options);
  },

  /**
   * @method
   * @member mw.post
   */
  'post': function(options) {
    options.method = 'POST';
    options.dataType = options.dataType === 'jsonp' ? 'json' : options.dataType;
    this.request(options);
  },
});


/**
 * Creates XMLHttpRequest
 * @static
 * @member mw.ajax.create
 * @return {XMLHttpRequest}
 */
mw.ajax.create = function() {
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
};
