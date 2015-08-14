(function (global) { // initializes namepsace if neccessary

  mw.namespace('mw.sdk');

  var configs = {};
  var readonlyList = {};

  mw.extend(mw.sdk, {

    /**
     * @method
     * @member mw.sdk.config
     * @param key
     * @param value
     * @param readonly
     */
    config : function (key, value, readonly) {
      if (typeof value !== 'undefined') {
        return mw.sdk.config.set(key, value, readonly);
      } else if (typeof key === 'string') {
        return mw.sdk.config.get(key);
      } else if (typeof key === 'undefined') {
        return mw.sdk.extend({}, configs);
      }
    }
  });

    /**
     * 设置配置信息
     * @static
     * @member mw.sdk.config.set
     * @param key 配置key
     * @param value 值
     * @param readonly 是否只读
     * @returns {Object}
     */
    mw.sdk.config.set = function (key, value, readonly) {
      if (typeof key === 'string') {

        if (!readonlyList[key]) {
          configs[key] = value;

          if (readonly === true) {
            readonlyList[key] = true;
          }
        }

        return mw.sdk.config;
      }
    };

    /**
     * @static
     * @member mw.sdk.config.get
     * @param key {String}
     * @returns {*}
     */
    mw.sdk.config.get = function (key) {
      if (key) {
        return configs[key];
      }
    };

})(this);
