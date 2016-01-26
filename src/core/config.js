var configs = {};
var readonlyList = {};

class Config {

  /**
   * @method
   * @member mw.config
   * @param key
   * @param value
   * @param readonly
   */
  config (key, value, readonly) {

    if (typeof value !== 'undefined') {
      return Config.set(key, value, readonly);
    } else if (typeof key === 'string') {
      return Config.get(key);
    } else if (typeof key === 'undefined') {
      var allConf = {};

      for (var k in configs) {
        allConf[k] = configs[k];
      }
      return allConf;
    }
  }

  /**
   * 设置和获取常量
   * @member mw.constant
   * @param key
   * @param value
   * @returns {*}
   */
  constant (key, value) {
    if (typeof value === 'undefined') {
      return this.config(key);
    } else {
      this.config(key, value, true);
    }
  }

  /**
   * 设置和获取变量
   * @member mw.var
   * @param key
   * @param value
   * @alias mw.config
   * @returns {*}
   */
  variable (key, value) {
      return this.config(key, value);
  }

  /**
   * 设置配置信息
   * @static
   * @member mw.config.set
   * @param key 配置key
   * @param value 值
   * @param readonly 是否只读
   * @returns {Object}
   */
  static set(key, value, readonly) {
    if (typeof key === 'string') {

      if (!readonlyList[key]) {
        configs[key] = value;

        if (readonly === true) {
          readonlyList[key] = true;
        }
      }

      return this.config;
    }
  }

  /**
   * @static
   * @member mw.config.get
   * @param key {String}
   * @returns {*}
   */
  static get (key) {
    if (key) {
      return configs[key];
    }
  }
}

export default new Config();
