(function (global) { // initializes namepsace if neccessary

  /**
   * @class mw
   */
  var mw = global.mw = global.mw || {};

/**
 * @member mw.namespace
 * @method
 * @param namepath
 */
mw.namespace = function(namepath) {

  var parts = namepath.split('.'),
    parent = window,
    currentPart = '';

  for(var i = 0, length = parts.length; i < length; i++) {
    currentPart = parts[i];
    parent[currentPart] = parent[currentPart] || {};
    parent = parent[currentPart];
  }
};

/**
 * 合并两个或更多个对象
 * @member mw.extend
 * @method
 * @param {Object} Object-1 The base object.
 * @param {Object} Object-n other objects.
 */
mw.extend = function extend() {
  var args = Array.prototype.slice.call(arguments, 0),
    isDeepCopy = args[0] && typeof args[0] === 'boolean',
    argsStartIndex = isDeepCopy ? 1 : 0,
    base;

  if (isDeepCopy) {
    args.shift();
  }

  base = args.shift();

  for (var i= 0, len=args.length; i<len; i++) {
    for (var k in args[i]) {

      if (isDeepCopy && mw.isObject(args[i][k])) {
        base[k] = mw.extend(isDeepCopy, {}, base[k], args[i][k]);
      } else if (isDeepCopy && mw.isArray(args[i][k])) {
        base[k] = mw.extend(isDeepCopy, {}, base[k], args[i][k]);
      } else {
        base[k] = args[i][k];
      }

    }
  }

  return base;
};

mw.extend(mw, {
  /**
   * 判断变量是否为Function
   * @member mw.isFunction
   * @method
   * @param obj
   * @returns {boolean}
   */
  isFunction : function isFunction(obj) {
    return typeof obj === 'function';
  },

  /**
   * @member mw.isFunc
   * @method
   * @alias isFunction
   * @param obj
   * @returns {boolean}
   */
  isFunc: function(obj) {
    return this.isFunction(obj);
  },

  /**
   * 判断变量是否为Object
   * @member mw.isObject
   * @method
   * @param obj
   * @returns {boolean}
   */
  isObject : function isObject(obj) {
    return !!(obj && obj.constructor === Object);
  },

  /**
   * 判断变量是否为String
   * @member mw.isString
   * @method
   * @param obj
   * @returns {boolean}
   */
  isString : function isString(obj) {
    return typeof obj === 'string';
  },

  /**
   * 判断变量是否为Array
   * @member mw.isArray
   * @method
   * @param obj
   * @returns {boolean}
   */
  isArray : function isArray(obj) {
    return !!(obj && obj.constructor === Array);
  },

  /**
   * 判断变量是否为数字
   * @member mw.isNumeric
   * @method
   * @param obj
   * @returns {*|boolean}
   */
  isNumeric : function isNumeric(obj) {
    return (obj || obj===0) && obj.constructor === Number;
  },

  /**
   * 判断变量是否为HTML Elements
   * @member mw.isElement
   * @method
   * @param obj
   * @returns {boolean}
   */
  isElement : function isElement(obj) {
    return !!(obj && mw.isNumeric(obj.nodeType));
  }
});

/*global ActiveXObject,escape*/
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
   * @param {Function} options.success     请求成功的回调方法
   * @param {Function} options.filter      过滤向服务器发送的参数
   * @param {Function} options.complete    请求完成时的回调方法，无论请求成功都会被调研；
   * @param {Function} options.beforeSend  发送请求前调用，返回false时http请求将会被终止；
   * @param {Function} options.xtra        Callback arguments
   */
  ajax : function(options) {

    var http = mw.ajax.create(),
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
            if (mw.isFunction(onError)) {

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
  },

  /**
   * @method
   * @alias mw.ajax
   * @member mw.get
   */
  'get': function(url, data, callback, type) {
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
  },

  /**
   * @method
   * @alias mw.ajax
   * @member mw.post
   */
  'post': function(url, data, callback, type) {

    if ( this.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return this.ajax({
      url: url,
      method: 'POST',
      dataType: type,
      data: data,
      success: callback
    });
  }

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

var configs = {};
var readonlyList = {};

mw.namespace('mw.sdk');

mw.extend(mw, {

  /**
   * @method
   * @member mw.config
   * @param key
   * @param value
   * @param readonly
   */
  config : function (key, value, readonly) {
    if (typeof value !== 'undefined') {
      return mw.config.set(key, value, readonly);
    } else if (typeof key === 'string') {
      return mw.config.get(key);
    } else if (typeof key === 'undefined') {
      return mw.extend({}, configs);
    }
  },

  /**
   * 设置和获取常量
   * @member mw.constant
   * @param key
   * @param value
   * @returns {*}
   */
  constant: function (key, value) {
    if (typeof value === 'undefined') {
      return mw.config(key);
    } else {
      mw.config(key, value, true);
    }
  },

  /**
   * 设置和获取变量
   * @member mw.var
   * @param key
   * @param value
   * @alias mw.config
   * @returns {*}
   */
  var: function (key, value) {
      return mw.config(key, value);
  }
});

/**
 * 设置配置信息
 * @static
 * @member mw.config.set
 * @param key 配置key
 * @param value 值
 * @param readonly 是否只读
 * @returns {Object}
 */
mw.config.set = function (key, value, readonly) {
  if (typeof key === 'string') {

    if (!readonlyList[key]) {
      configs[key] = value;

      if (readonly === true) {
        readonlyList[key] = true;
      }
    }

    return mw.config;
  }
};

/**
 * @static
 * @member mw.config.get
 * @param key {String}
 * @returns {*}
 */
mw.config.get = function (key) {
  if (key) {
    return configs[key];
  }
};


(function(mw) {

  var sdk = mw.sdk,
      readyQueue = [];

  /**
   * @member mw.sdk.connect
   * @method
   * @ignore
   * @protected
   * @param {Function} onConnected
   */
  sdk.connect = function(onConnected) {

  };

  /**
   * 是否已经初始化，此属性初始值为false，在调用mw.sdk.init()方法后，其值则会变成true，
   * 第二次调用mw.sdk.init()时会被阻止。
   * @member mw.sdk.initialized
   * @type {boolean}
   */
  sdk.initialized = false;

  /**
   * 初始化SDK，
   * @member mw.sdk.init
   * @method
   * @param {Object} configs
   * @param {String} configs.server SDK服务器地址
   * @param {String} configs.appkey 您在魔窗后台应用配置里面填写的AppKey
   */
  sdk.init = function(configs) {

    if (sdk.initialized) {
      return;
    }

    var defaults = {
      server: 'sdk.magicwindow.cn',
      appkey: 'com.webapp.com'
    },
    options = mw.extend(defaults, configs);

    for (var k in options) {
      mw.config(k, options[k]);
    }

    sdk.initialized = true;
    sdk.onReady();
  };

  /**
   * @member mw.sdk.onReady
   * @method
   * @param {Function} callback
   */
  sdk.onReady = function(callback) {
    var action;

    if (mw.isFunction(callback)) {
      readyQueue.push(callback);
    }

    if (sdk.initialized) {
      while (readyQueue.length) {
        action = readyQueue.shift();
        if (mw.isFunction(action)) {
          action();
        }
      }
    }
  };

}(mw));

}(this));
