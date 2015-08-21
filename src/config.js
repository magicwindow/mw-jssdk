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

