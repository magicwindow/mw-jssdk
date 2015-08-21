

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
