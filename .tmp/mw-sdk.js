(function (global) { // initializes namepsace if neccessary

  /**
   * @class mw
   */
  var mw = global.mw = global.mw || {};


mw.ajax = function(options) {

};


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
   * 判断变量是否为Object
   * @member mw.sdk
   * @method
   * @param obj
   * @returns {boolean}
   */
  isObject : function isObject(obj) {
    return !!(obj && obj.constructor === Object);
  },

  /**
   * 判断变量是否为Array
   * @member mw.sdk
   * @method
   * @param obj
   * @returns {boolean}
   */
  isArray : function isArray(obj) {
    return !!(obj && obj.constructor === Array);
  },

  /**
   * 判断变量是否为数字
   * @member mw.sdk
   * @method
   * @param obj
   * @returns {*|boolean}
   */
  isNumeric : function isNumeric(obj) {
    return (obj || obj===0) && obj.constructor === Number;
  },

  /**
   * 判断变量是否为HTML Elements
   * @member mw.sdk
   * @method
   * @param obj
   * @returns {boolean}
   */
  isElement : function isElement(obj) {
    return !!(obj && mw.isNumeric(obj.nodeType));
  }
});

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




var sdk = mw.sdk;

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
  var defaults = {
    server: 'sdk.magicwindow.cn',
    appkey: 'com.webapp.com'
  },
  options = mw.extend(defaults, configs);

  for (var k in options) {
    sdk.config(k, options[k]);
  }
};

/**
 * @member mw.sdk.onReady
 * @method
 * @param {Function} callback
 */
sdk.onReady = function(callback) {

};

}(this));
