/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(1);

	var _common2 = _interopRequireDefault(_common);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _marketing = __webpack_require__(3);

	var _marketing2 = _interopRequireDefault(_marketing);

	var _render = __webpack_require__(12);

	var _render2 = _interopRequireDefault(_render);

	var _profile = __webpack_require__(14);

	var _profile2 = _interopRequireDefault(_profile);

	var _device = __webpack_require__(8);

	var _device2 = _interopRequireDefault(_device);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(16);

	var initialized;
	var readyQueue = [];

	var Mwsdk = function () {
	  function Mwsdk() {
	    _classCallCheck(this, Mwsdk);

	    this.version = "2.0.1";
	    this.device = _device2.default;

	    _device2.default.appVersion = this.version;
	  }

	  /**
	   * 初始化SDK
	   */

	  _createClass(Mwsdk, [{
	    key: 'init',
	    value: function init(configs) {
	      var _this = this;

	      var marketing = new _marketing2.default();

	      // Apply configs
	      for (var k in configs) {
	        _config2.default.constant(k, configs[k]);
	      }

	      // Initialize once;
	      if (!initialized) {

	        marketing.load().then(function (response) {
	          _this.onReady(function () {
	            new _render2.default(response.data);
	          });
	        });

	        initialized = true;
	      }
	    }

	    /**
	     * 公开接口
	     * @param phoneNumber
	     */

	  }, {
	    key: 'setPhoneNumber',
	    value: function setPhoneNumber(phoneNumber) {
	      _profile2.default.setPhoneNumber(phoneNumber);
	    }
	  }, {
	    key: 'getPhoneNumber',
	    value: function getPhoneNumber() {
	      return _profile2.default.getPhoneNumber();
	    }
	  }, {
	    key: 'setCityCode',
	    value: function setCityCode(cityCode) {
	      _profile2.default.setCityCode(cityCode);
	    }
	  }, {
	    key: 'getCityCode',
	    value: function getCityCode() {
	      return _profile2.default.getCityCode();
	    }
	  }, {
	    key: 'setUserProfile',
	    value: function setUserProfile(userProfile) {
	      _profile2.default.setUserProfile(userProfile);
	    }
	  }, {
	    key: 'getUserProfile',
	    value: function getUserProfile() {
	      return _profile2.default.getUserProfile();
	    }

	    /**
	     * @member mw.sdk.onReady
	     * @method
	     * @param {Function} callback
	     */

	  }, {
	    key: 'onReady',
	    value: function onReady(callback) {
	      var _this2 = this;

	      // Put callback into queue
	      if (_common2.default.isFunction(callback)) {
	        readyQueue.push(callback);
	      }

	      if (window.document.readyState === 'complete') {
	        this.excuteReadyQueue();
	      } else {
	        window.document.addEventListener('readystatechange', function () {
	          if (window.document.readyState === 'complete') {
	            _this2.excuteReadyQueue();
	          }
	        });
	      }
	    }

	    /**
	     * 执行队列中所有的方法
	     */

	  }, {
	    key: 'excuteReadyQueue',
	    value: function excuteReadyQueue() {

	      while (readyQueue.length) {
	        readyQueue.shift()();
	      }
	    }
	  }]);

	  return Mwsdk;
	}();

	window.mwsdk = window.mwsdk || new Mwsdk();

	exports.default = Mwsdk;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Common = function () {
	  function Common() {
	    _classCallCheck(this, Common);
	  }

	  _createClass(Common, null, [{
	    key: 'isFunction',

	    /**
	     * 判断变量是否为Function
	     * @member isFunction
	     * @method
	     * @param obj
	     * @returns {boolean}
	     */
	    value: function isFunction(obj) {
	      return typeof obj === 'function';
	    }

	    /**
	     * @member isFunc
	     * @method
	     * @alias isFunction
	     * @param obj
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isFunc',
	    value: function isFunc(obj) {
	      return this.isFunction(obj);
	    }

	    /**
	     * 判断变量是否为Object
	     * @member isObject
	     * @method
	     * @param obj
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isObject',
	    value: function isObject(obj) {
	      return !!(obj && obj.constructor === Object);
	    }

	    /**
	     * 判断变量是否为String
	     * @member isString
	     * @method
	     * @param obj
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isString',
	    value: function isString(obj) {
	      return typeof obj === 'string';
	    }

	    /**
	     * 判断变量是否为Array
	     * @member isArray
	     * @method
	     * @param obj
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isArray',
	    value: function isArray(obj) {
	      return !!(obj && obj.constructor === Array);
	    }

	    /**
	     * 判断变量是否为数字
	     * @member isNumeric
	     * @method
	     * @param obj
	     * @returns {*|boolean}
	     */

	  }, {
	    key: 'isNumeric',
	    value: function isNumeric(obj) {
	      return (obj || obj === 0) && obj.constructor === Number;
	    }

	    /**
	     * 判断变量是否为HTML Elements
	     * @member isElement
	     * @method
	     * @param obj
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isElement',
	    value: function isElement(obj) {
	      return !!(obj && this.isNumeric(obj.nodeType));
	    }

	    /**
	     * 判断App运行环境是否为微信
	     * @member isWeixin
	     * @method
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isWeixin',
	    value: function isWeixin() {
	      return window.navigator.userAgent.match(/Micromessag/);
	    }

	    /**
	     * 判断App运行环境是否为魔窗SDK
	     * @member isWm
	     * @method
	     * @version v2.0.0
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isWm',
	    value: function isWm() {
	      return window.navigator.userAgent.match(/magicwindow/) || window.location.href.match(/[&\?]mw=1[#&$]/);
	    }

	    /**
	     * 格式化JSON字符串
	     * @param String jsonString
	     * @param String isStrict
	     * @returns {Object}
	       */

	  }, {
	    key: 'parseJson',
	    value: function parseJson(jsonString, isStrict) {
	      if (isStrict) {
	        return JSON.parse(jsonString);
	      } else {
	        return new Function('return ' + jsonString)();
	      }
	    }
	  }]);

	  return Common;
	}();

	exports.default = Common;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var configs = {};
	var readonlyList = {};

	var Config = function () {
	  function Config() {
	    _classCallCheck(this, Config);
	  }

	  _createClass(Config, [{
	    key: 'config',

	    /**
	     * @method
	     * @member mw.config
	     * @param key
	     * @param value
	     * @param readonly
	     */
	    value: function config(key, value, readonly) {

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

	  }, {
	    key: 'constant',
	    value: function constant(key, value) {
	      if (typeof value === 'undefined') {
	        return this.config(key);
	      } else {
	        this.config(key, value, true);
	      }
	    }

	    /**
	     * 设置和获取变量
	     * @member variable
	     * @param key
	     * @param value
	     * @alias mw.config
	     * @returns {*}
	     */

	  }, {
	    key: 'variable',
	    value: function variable(key, value) {
	      return this.config(key, value);
	    }

	    /**
	     * 设置配置信息
	     * @static
	     * @member config.set
	     * @param key 配置key
	     * @param value 值
	     * @param readonly 是否只读
	     * @returns {Object}
	     */

	  }], [{
	    key: 'set',
	    value: function set(key, value, readonly) {
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
	     * @member config.get
	     * @param key {String}
	     * @returns {*}
	     */

	  }, {
	    key: 'get',
	    value: function get(key) {
	      if (key) {
	        return configs[key];
	      }
	    }
	  }]);

	  return Config;
	}();

	exports.default = new Config();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _ajax = __webpack_require__(4);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _promise = __webpack_require__(5);

	var _promise2 = _interopRequireDefault(_promise);

	var _device = __webpack_require__(8);

	var _device2 = _interopRequireDefault(_device);

	var _apis = __webpack_require__(11);

	var _apis2 = _interopRequireDefault(_apis);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Marketing = function () {
	  function Marketing() {
	    _classCallCheck(this, Marketing);
	  }

	  _createClass(Marketing, [{
	    key: 'getParams',

	    /**
	     * 获取参数
	     * @returns {{server: string, ak: *, av: *, sv: *}}
	     */
	    value: function getParams() {
	      return {
	        ak: _device2.default.appKey || _config2.default.constant('appkey'),
	        os: _device2.default.os,
	        sv: _device2.default.sdkVersion,
	        d: _device2.default.uuid,
	        sr: _device2.default.screen,
	        av: _device2.default.appVersion || _config2.default.constant('av'),
	        fp: _device2.default.getCanvasFingerprint()
	      };
	    }

	    /**
	     * 替换参数
	     * @param url
	     * @param params
	     * @returns {*|XML|void|string}
	     */

	  }, {
	    key: 'applyParams',
	    value: function applyParams(url, params) {
	      if (url) {
	        for (var k in params) {
	          url = url.replace('{' + k.toUpperCase() + '}', params[k]);
	        }
	      }

	      url = url.replace(/\{(\w)*\}/g, '');
	      return url;
	    }

	    /**
	     * 获取服务器
	     * @returns {string|*|{res}|void|XML}
	     */

	  }, {
	    key: 'getServer',
	    value: function getServer() {
	      return _config2.default.constant('server').replace(/\/$/, '');
	    }

	    /**
	     * 加载Marketing数据
	     * @param {Function} [callback] 如果有此参数, 则使用回调方式加载,否则使用Promise模式
	     * @returns {*}
	       */

	  }, {
	    key: 'load',
	    value: function load(callback) {
	      if (typeof callback !== 'undefined') {
	        return this.loadCallback(callback);
	      } else {
	        return this.loadPromise();
	      }
	    }

	    /**
	     * 加载 Marketing 数据
	     * @param {Fucntion} callback
	     */

	  }, {
	    key: 'loadCallback',
	    value: function loadCallback(callback) {

	      // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
	      //let macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
	      var params = this.getParams();
	      var url = this.getServer() + _apis2.default.marketing;
	      var ajax = new _ajax2.default();

	      return ajax.request({
	        url: url,
	        type: 'get',
	        dataType: 'jsonp',
	        params: params,
	        success: callback,
	        error: function error(msg) {
	          console.log(msg);
	        }
	      });
	    }

	    /**
	     * 加载 Marketing 数据
	     * @returns {Promise|PromisePolyfill}
	     */

	  }, {
	    key: 'loadPromise',
	    value: function loadPromise() {

	      // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
	      //let macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
	      var params = this.getParams();
	      var url = this.getServer() + _apis2.default.marketing;
	      var ajax = new _ajax2.default();

	      return ajax.request({
	        url: url,
	        type: 'get',
	        dataType: 'jsonp',
	        params: params
	      });
	    }
	  }]);

	  return Marketing;
	}();

	exports.default = Marketing;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(1);

	var _common2 = _interopRequireDefault(_common);

	var _promise = __webpack_require__(5);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ajax = function () {

	  /**
	   * Constructor
	   * @returns {*}
	   */

	  function Ajax() {
	    _classCallCheck(this, Ajax);
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

	  _createClass(Ajax, [{
	    key: 'request',
	    value: function request() {
	      var _this = this;

	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var http = undefined,
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

	      if (options.headers) {
	        for (var k in options.headers) {
	          headers[k] = options.headers || defaultHeaders[k];
	        }
	      }

	      method = method.toLowerCase();

	      return new _promise2.default(function (resolve, reject) {

	        var successHandler = function successHandler(data) {
	          typeof onSuccess === 'function' && onSuccess(data);
	          resolve(data);
	        };

	        var errorHandler = function errorHandler(msg) {
	          typeof onError === 'function' && onError(msg);
	          reject(msg);
	        };

	        // Load jsonp
	        if (dataType && dataType.toLowerCase() === 'jsonp') {
	          url += (url.indexOf('?') === -1 ? '?' : '&') + _this.seriesParams(params, filter);
	          _this.loadJsonp(url, successHandler, errorHandler, timeout);
	        } else {

	          http = Ajax.create();

	          if (method === 'post') {
	            params = headers.ContentType === 'application/json' ? JSON.stringify(params) : _this.seriesParams(params, filter);
	          } else {
	            url += (url.indexOf('?') === -1 ? '?' : '&') + _this.seriesParams(params, filter);
	            params = null;
	          }

	          http.open(method, url, true);
	          http.setRequestHeader('Method', method.toUpperCase() + ' ' + url + ' HTTP/1.1');
	          http.setRequestHeader('Content-type', headers.ContentType);

	          http.onreadystatechange = function () {
	            _this.onReadyStatusChange(http, dataType, successHandler, onComplete, errorHandler);
	          };

	          if (typeof onBeforeSend !== 'function' || onBeforeSend.call(http) !== false) {
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

	  }, {
	    key: 'onReadyStatusChange',
	    value: function onReadyStatusChange(http, dataType, onSuccess, onComplete, onError) {

	      if (http.readyState !== 4) {
	        return;
	      }

	      if (typeof onComplete === 'function') {
	        onComplete.call(null);
	      }

	      if (http.status === 200) {

	        var responseText = http.responseText;

	        // JSON
	        if (dataType.toUpperCase() === 'JSON') {

	          /*jslint evil: true*/
	          try {
	            var json = new Function('return ' + responseText)();

	            if (json && typeof onSuccess === 'function') {
	              onSuccess(json);
	            }
	          } catch (e) {}
	        } else if (typeof onSuccess === 'function') {
	          onSuccess(responseText);
	        }
	      } else {
	        onError('Error code:' + http.status, http);
	      }
	    }

	    /**
	     * 拼接参数
	     * @param {Object} params
	     * @returns {string}
	     */

	  }, {
	    key: 'seriesParams',
	    value: function seriesParams(params, filter) {
	      var tmp = [];
	      var j = undefined;

	      if (params) {
	        for (var i in params) {
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

	  }, {
	    key: 'loadJsonp',
	    value: function loadJsonp(url, onSuccess, onError, timeout) {
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

	      if (timeout > 0) {
	        setTimeout(function () {
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

	  }, {
	    key: 'fetch',
	    value: function fetch(url, data, callback, type) {
	      if (this.isFunction(data)) {
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

	  }, {
	    key: 'post',
	    value: function post(url, data, callback, type) {

	      if (this.isFunction(data)) {
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

	  }], [{
	    key: 'create',
	    value: function create() {
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
	  }]);

	  return Ajax;
	}();

	exports.default = Ajax;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var global = typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : undefined;
	var NativePromise = global['Promise'];
	var nativePromiseSupported = NativePromise &&
	// Some of these methods are missing from
	// Firefox/Chrome experimental implementations
	'resolve' in NativePromise && 'reject' in NativePromise && 'all' in NativePromise && 'race' in NativePromise &&
	// Older version of the spec had a resolver object
	// as the arg rather than a function
	function () {
	  var resolve = undefined;
	  new NativePromise(function (r) {
	    resolve = r;
	  });
	  return typeof resolve === 'function';
	}();

	// async calls
	var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
	var asyncQueue = [];
	var asyncTimer = undefined;

	var PENDING = 'pending';
	var SEALED = 'sealed';
	var FULFILLED = 'fulfilled';
	var REJECTED = 'rejected';
	var NOOP = function NOOP() {};

	function isArray(value) {
	  return Object.prototype.toString.call(value) === '[object Array]';
	}

	function asyncFlush() {
	  // run promise callbacks
	  for (var i = 0; i < asyncQueue.length; i++) {
	    asyncQueue[i][0](asyncQueue[i][1]);
	  }

	  // reset async asyncQueue
	  asyncQueue = [];
	  asyncTimer = false;
	}

	function asyncCall(callback, arg) {
	  asyncQueue.push([callback, arg]);

	  if (!asyncTimer) {
	    asyncTimer = true;
	    asyncSetTimer(asyncFlush, 0);
	  }
	}

	function invokeResolver(resolver, promise) {
	  function resolvePromise(value) {
	    resolve(promise, value);
	  }

	  function rejectPromise(reason) {
	    reject(promise, reason);
	  }

	  try {
	    resolver(resolvePromise, rejectPromise);
	  } catch (e) {
	    rejectPromise(e);
	  }
	}

	function invokeCallback(subscriber) {
	  var owner = subscriber.owner;
	  var settled = owner.state_;
	  var value = owner.data_;
	  var callback = subscriber[settled];
	  var promise = subscriber.then;

	  if (typeof callback === 'function') {
	    settled = FULFILLED;
	    try {
	      value = callback(value);
	    } catch (e) {
	      reject(promise, e);
	    }
	  }

	  if (!handleThenable(promise, value)) {
	    if (settled === FULFILLED) resolve(promise, value);

	    if (settled === REJECTED) reject(promise, value);
	  }
	}

	function handleThenable(promise, value) {
	  var resolved = undefined;

	  try {
	    if (promise === value) throw new TypeError('A promises callback cannot return that same promise.');

	    if (value && (typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
	      var then = value.then; // then should be retrived only once

	      if (typeof then === 'function') {
	        then.call(value, function (val) {
	          if (!resolved) {
	            resolved = true;

	            if (value !== val) resolve(promise, val);else fulfill(promise, val);
	          }
	        }, function (reason) {
	          if (!resolved) {
	            resolved = true;

	            reject(promise, reason);
	          }
	        });

	        return true;
	      }
	    }
	  } catch (e) {
	    if (!resolved) reject(promise, e);

	    return true;
	  }

	  return false;
	}

	function resolve(promise, value) {
	  if (promise === value || !handleThenable(promise, value)) fulfill(promise, value);
	}

	function fulfill(promise, value) {
	  if (promise.state_ === PENDING) {
	    promise.state_ = SEALED;
	    promise.data_ = value;

	    asyncCall(publishFulfillment, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise.state_ === PENDING) {
	    promise.state_ = SEALED;
	    promise.data_ = reason;

	    asyncCall(publishRejection, promise);
	  }
	}

	function publish(promise) {
	  var callbacks = promise.then_;
	  promise.then_ = undefined;

	  for (var i = 0; i < callbacks.length; i++) {
	    invokeCallback(callbacks[i]);
	  }
	}

	function publishFulfillment(promise) {
	  promise.state_ = FULFILLED;
	  publish(promise);
	}

	function publishRejection(promise) {
	  promise.state_ = REJECTED;
	  publish(promise);
	}

	/**
	 * @class PromisePolyfill
	 */

	var PromisePolyfill = function () {
	  function PromisePolyfill(resolver) {
	    _classCallCheck(this, PromisePolyfill);

	    this.state_ = PENDING;
	    this.then_ = null;
	    this.data_ = undefined;

	    if (typeof resolver !== 'function') {
	      throw new TypeError('Promise constructor takes a function argument');
	    }

	    if (this instanceof PromisePolyfill === false) {
	      throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
	    }

	    this.then_ = [];

	    invokeResolver(resolver, this);
	  }

	  /**
	   * then
	   * @param onFulfillment
	   * @param onRejection
	   * @returns {*}
	   */

	  _createClass(PromisePolyfill, [{
	    key: 'then',
	    value: function then(onFulfillment, onRejection) {
	      var subscriber = {
	        owner: this,
	        then: new PromisePolyfill(NOOP),
	        fulfilled: onFulfillment,
	        rejected: onRejection
	      };

	      if (this.state_ === FULFILLED || this.state_ === REJECTED) {
	        // already resolved, call callback async
	        asyncCall(invokeCallback, subscriber);
	      } else {
	        // subscribe
	        this.then_.push(subscriber);
	      }

	      return subscriber.then;
	    }

	    /**
	     *
	     * @param onRejection
	     * @returns {*}
	     */

	  }, {
	    key: 'catch',
	    value: function _catch(onRejection) {
	      return this.then(null, onRejection);
	    }

	    /**
	     * @static
	     * @param promises
	     * @returns {PromisePolyfill}
	     */

	  }], [{
	    key: 'all',
	    value: function all(promises) {

	      if (!isArray(promises)) {
	        throw new TypeError('You must pass an array to Promise.all().');
	      }

	      return new PromisePolyfill(function (resolve, reject) {

	        var results = [];
	        var remaining = 0;

	        function resolver(index) {
	          remaining++;
	          return function (value) {
	            results[index] = value;
	            if (! --remaining) resolve(results);
	          };
	        }

	        for (var i = 0, promise; i < promises.length; i++) {
	          promise = promises[i];

	          if (promise && typeof promise.then === 'function') {
	            promise.then(resolver(i), reject);
	          } else {
	            results[i] = promise;
	          }
	        }

	        if (!remaining) resolve(results);
	      });
	    }

	    /**
	     *
	     * @param promises
	     * @returns {PromisePolyfill}
	     */

	  }, {
	    key: 'race',
	    value: function race(promises) {

	      if (!isArray(promises)) {
	        throw new TypeError('You must pass an array to Promise.race().');
	      }

	      return new PromisePolyfill(function (resolve, reject) {
	        for (var i = 0, promise; i < promises.length; i++) {

	          promise = promises[i];

	          if (promise && typeof promise.then === 'function') {
	            promise.then(resolve, reject);
	          } else {
	            resolve(promise);
	          }
	        }
	      });
	    }

	    /**
	     * resolve
	     * @param value
	     * @returns {*}
	     */

	  }, {
	    key: 'resolve',
	    value: function resolve(value) {

	      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === PromisePolyfill) {
	        return value;
	      }

	      return new PromisePolyfill(function (resolve) {
	        resolve(value);
	      });
	    }

	    /**
	     * reject
	     * @param reason
	     * @returns {PromisePolyfill}
	     */

	  }, {
	    key: 'reject',
	    value: function reject(reason) {

	      return new PromisePolyfill(function (resolve, reject) {
	        reject(reason);
	      });
	    }
	  }]);

	  return PromisePolyfill;
	}();

	exports.default = nativePromiseSupported ? global['Promise'] : PromisePolyfill;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(7).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate, __webpack_require__(6).clearImmediate))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _uri = __webpack_require__(9);

	var _uri2 = _interopRequireDefault(_uri);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _sha = __webpack_require__(10);

	var _sha2 = _interopRequireDefault(_sha);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var URI = new _uri2.default(document.location.href);
	var UA = window.navigator.userAgent;

	var Device = function () {
	  function Device() {
	    _classCallCheck(this, Device);

	    var os = this.getOsInfo();

	    this.constructor.sdkVersion = "2.0.1";
	    this.constructor.appKey = _config2.default.constant('appKey');
	    this.constructor.appVersion = _config2.default.constant('appVersion');

	    this.constructor.model = '';
	    this.constructor.os = os.platform;
	    this.constructor.version = os.version;
	    this.constructor.uuid = this.getCanvasFingerprint();
	    this.constructor.manufacturer = '';
	    this.constructor.isVirtual = '';
	    this.constructor.serial = '';
	    this.constructor.screen = window.screen.width + 'x' + window.screen.height;
	  }

	  _createClass(Device, [{
	    key: 'isIos',

	    /**
	     * 判断是否是iOs设备
	     * @returns {boolean}
	     */
	    value: function isIos() {
	      return !!UA.match(/iPhone|iPad|iPod/);
	    }

	    /**
	     * 判断iOs设备是否是9.0以上版本
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isIos9',
	    value: function isIos9() {
	      var exp = /iPhone\s?OS\s?(\d+)_(\d*)/;
	      var matched = UA.match(exp);
	      var version = matched ? new Number(matched[1] + '.' + matched[2]) : 0;

	      return version >= 9;
	    }

	    /**
	     * 判断是否是Android设备
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isAndroid',
	    value: function isAndroid() {
	      return !!UA.match(/Android/);
	    }

	    /**
	     * 判断App运行环境是否为微信
	     * @member isWeixin
	     * @method
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isWeixin',
	    value: function isWeixin() {
	      return UA.match(/[Mm]icro[Mm]essenger/);
	    }

	    /**
	     * 判断App运行环境是否为魔窗SDK
	     * @member isWm
	     * @method
	     * @version v2.0.0
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isWm',
	    value: function isWm() {
	      var params = URI.getParams();
	      return !!UA.match(/[Mm]agic[Ww]indow/) || params.mw;
	    }

	    /**
	     * Get OS information
	     * returns {Object}
	     */

	  }, {
	    key: 'getOsInfo',
	    value: function getOsInfo() {

	      var IOS = 1;
	      var ANDROID = 0;
	      var VERSION = '0.0.0';

	      var info = {
	        platform: 0,
	        version: VERSION
	      },
	          isIOS = UA.match(/(iPad|iPhone)/),
	          isAndroid = UA.match(/Android/),
	          iosExp = /(iPad|iPhone)\s*OS\s*(\d*_\d*_?\d?)/,
	          androidExp = /Android\s*(\d*\.?\d*\.?\d?)/,
	          versionExp = /Version\/(\d*\.?\d*\.?\d?)/,
	          version = undefined,
	          ios = UA.match(iosExp),
	          android = UA.match(androidExp);

	      if (isIOS) {
	        info.platform = IOS;
	        version = UA.match(versionExp);
	        info.version = ios[2] ? ios[2].replace(/_/g, '.') : version ? version[1] : VERSION;
	      } else if (isAndroid) {
	        info.platform = ANDROID;
	        version = UA.match(versionExp);
	        info.version = android[1] ? android[1].replace('_', '.') : version ? version[1] : VERSION;
	      }

	      return info;
	    }

	    /**
	     * 生成 Fingerprint
	     * returns {String}
	     */

	  }, {
	    key: 'getCanvasFingerprint',
	    value: function getCanvasFingerprint() {
	      var canvas = document.createElement('canvas');
	      var ctx = canvas.getContext('2d');
	      var txt = 'http://magicwindow.cn';

	      // https://www.browserleaks.com/canvas#how-does-it-work
	      ctx.textBaseline = "top";
	      ctx.font = "14px 'Arial'";
	      ctx.textBaseline = "alphabetic";
	      ctx.fillStyle = "#f60";
	      ctx.fillRect(125, 1, 62, 20);
	      ctx.fillStyle = "#069";
	      ctx.fillText(txt, 2, 15);
	      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
	      ctx.fillText(txt, 4, 17);

	      return (0, _sha2.default)(canvas.toDataURL());
	    }
	  }, {
	    key: 'sdkVersion',
	    set: function set(value) {
	      if (value) {
	        this.constructor.sdkVersion = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.sdkVersion;
	    }
	  }, {
	    key: 'appKey',
	    set: function set(value) {
	      if (value) {
	        this.constructor.appKey = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.appKey;
	    }
	  }, {
	    key: 'appVersion',
	    set: function set(value) {
	      if (value) {
	        this.constructor.appVersion = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.appVersion;
	    }
	  }, {
	    key: 'model',
	    set: function set(value) {
	      if (value) {
	        this.constructor.model = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.model;
	    }
	  }, {
	    key: 'os',
	    set: function set(value) {
	      if (value) {
	        this.constructor.os = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.os;
	    }
	  }, {
	    key: 'version',
	    set: function set(value) {
	      if (value) {
	        this.constructor.version = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.version;
	    }
	  }, {
	    key: 'uuid',
	    set: function set(value) {
	      if (value) {
	        this.constructor.uuid = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.uuid;
	    }
	  }, {
	    key: 'manufacturer',
	    set: function set(value) {
	      if (value) {
	        this.constructor.manufacturer = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.manufacturer;
	    }
	  }, {
	    key: 'isVirtual',
	    set: function set(value) {
	      if (value) {
	        this.constructor.isVirtual = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.isVirtual;
	    }
	  }, {
	    key: 'serial',
	    set: function set(value) {
	      if (value) {
	        this.constructor.serial = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.serial;
	    }
	  }, {
	    key: 'screen',
	    set: function set(value) {
	      if (value) {
	        this.constructor.screen = value;
	      }
	    },
	    get: function get() {
	      return this.constructor.screen;
	    }
	  }]);

	  return Device;
	}();

	exports.default = new Device();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(1);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Uri = function () {

	  /**
	   * Constructor
	   * @returns {*}
	   */

	  function Uri(uri) {
	    _classCallCheck(this, Uri);

	    var parsedUri = uri.match(/(\w+):\/\/([^:\/\?]*):?(\d*)([^\?]*)\??([^#$]*)#?([^#]*)/) || [];

	    this.scheme = parsedUri[1] || '';
	    this.protocol = parsedUri[1] || '';
	    this.domain = parsedUri[2] || '';
	    this.host = parsedUri[2] || '';
	    this.port = parsedUri[3] || '';
	    this.path = parsedUri[4] || '';
	    this.queryString = parsedUri[5] || '';
	    this.search = parsedUri[5] || '';
	    this.hash = parsedUri[6] || '';
	  }

	  /**
	   * 获取所有参数集合
	   * @returns {Map}
	   */

	  _createClass(Uri, [{
	    key: 'getParams',
	    value: function getParams() {

	      var paramsSet = this.queryString.split('&');
	      var params = {};

	      paramsSet.forEach(function (param) {
	        var paramArr = param.split('=');
	        params[paramArr[0]] = paramArr[1];
	      });

	      return params;
	    }

	    /**
	     * 获取参数值
	     * @returns {String}
	     */

	  }, {
	    key: 'getParam',
	    value: function getParam(paramName) {
	      return this.getParams()[paramName];
	    }
	  }]);

	  return Uri;
	}();

	exports.default = Uri;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (str) {
	  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	  // + namespaced by: Michael White (http://getsprink.com)
	  // +      input by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   jslinted by: Anthon Pang (http://piwik.org)

	  function rotate_left(n, s) {
	    return n << s | n >>> 32 - s;
	  }

	  function cvt_hex(val) {
	    var strout = '',
	        i,
	        v;

	    for (i = 7; i >= 0; i--) {
	      v = val >>> i * 4 & 0x0f;
	      strout += v.toString(16);
	    }

	    return strout;
	  }

	  var blockstart = undefined,
	      i = undefined,
	      j = undefined,
	      W = [],
	      H0 = 0x67452301,
	      H1 = 0xEFCDAB89,
	      H2 = 0x98BADCFE,
	      H3 = 0x10325476,
	      H4 = 0xC3D2E1F0,
	      A = undefined,
	      B = undefined,
	      C = undefined,
	      D = undefined,
	      E = undefined,
	      temp = undefined,
	      str_len = undefined,
	      word_array = [];

	  str = encodeURIComponent(str);
	  str_len = str.length;

	  for (i = 0; i < str_len - 3; i += 4) {
	    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
	    word_array.push(j);
	  }

	  switch (str_len & 3) {
	    case 0:
	      i = 0x080000000;
	      break;
	    case 1:
	      i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
	      break;
	    case 2:
	      i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
	      break;
	    case 3:
	      i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
	      break;
	  }

	  word_array.push(i);

	  while ((word_array.length & 15) !== 14) {
	    word_array.push(0);
	  }

	  word_array.push(str_len >>> 29);
	  word_array.push(str_len << 3 & 0x0ffffffff);

	  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
	    for (i = 0; i < 16; i++) {
	      W[i] = word_array[blockstart + i];
	    }

	    for (i = 16; i <= 79; i++) {
	      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
	    }

	    A = H0;
	    B = H1;
	    C = H2;
	    D = H3;
	    E = H4;

	    for (i = 0; i <= 19; i++) {
	      temp = rotate_left(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999 & 0x0ffffffff;
	      E = D;
	      D = C;
	      C = rotate_left(B, 30);
	      B = A;
	      A = temp;
	    }

	    for (i = 20; i <= 39; i++) {
	      temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1 & 0x0ffffffff;
	      E = D;
	      D = C;
	      C = rotate_left(B, 30);
	      B = A;
	      A = temp;
	    }

	    for (i = 40; i <= 59; i++) {
	      temp = rotate_left(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC & 0x0ffffffff;
	      E = D;
	      D = C;
	      C = rotate_left(B, 30);
	      B = A;
	      A = temp;
	    }

	    for (i = 60; i <= 79; i++) {
	      temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6 & 0x0ffffffff;
	      E = D;
	      D = C;
	      C = rotate_left(B, 30);
	      B = A;
	      A = temp;
	    }

	    H0 = H0 + A & 0x0ffffffff;
	    H1 = H1 + B & 0x0ffffffff;
	    H2 = H2 + C & 0x0ffffffff;
	    H3 = H3 + D & 0x0ffffffff;
	    H4 = H4 + E & 0x0ffffffff;
	  }

	  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	  return temp.toLowerCase();
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  marketing: '/marketing/v2',
	  deeplinks: '/dp/dpls',
	  getDeeplinks: '/dp/getDPL',
	  deeplinkEvent: '/dp/event'
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mlink = __webpack_require__(13);

	var _mlink2 = _interopRequireDefault(_mlink);

	var _common = __webpack_require__(1);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var marketingData = undefined;
	var mlink = new _mlink2.default();

	var Render = function () {
	  function Render(data) {
	    _classCallCheck(this, Render);

	    marketingData = data;

	    this.watch();
	    mlink.loadDPLs();
	  }

	  /**
	   * 检测页面DOM节点，并渲染
	   */

	  _createClass(Render, [{
	    key: 'watch',
	    value: function watch() {
	      var _this = this;

	      if (marketingData && marketingData.length > 0) {
	        marketingData.forEach(function (data) {
	          var blocks = _this.getMwBlocks(data.k);
	          var block;

	          for (var i = 0, l = blocks.length; i < l; i++) {
	            block = blocks[i];

	            if (!block.getAttribute('render')) {
	              _this.render(data, block);
	            }
	          }
	        });
	      }

	      setTimeout(function () {
	        _this.watch();
	      }, 1000);
	    }

	    /**
	     *
	     * @param id
	     * @returns {Array}
	     */

	  }, {
	    key: 'getMwBlocks',
	    value: function getMwBlocks(id) {
	      var list = document.getElementsByTagName('mw-block');
	      var blocks = [];

	      for (var i = 0, l = list.length; i < l; i++) {
	        if (list[i].getAttribute('id') === id) {
	          blocks.push(list[i]);
	        }
	      }
	      return blocks;
	    }

	    /**
	     * 魔窗位渲染
	     * @param data
	     * @param block
	     */

	  }, {
	    key: 'render',
	    value: function render(data, block) {

	      //var id = block.getAttribute('id');

	      block.setAttribute('data-au', data.au);
	      block.innerHTML = '<img src="' + data.iu + '" style="max-width:100%;"/>';

	      this.initMwBlockEvent(data, block);
	      block.setAttribute('render', true);
	    }

	    /**
	     * 绑定魔窗位事件
	     * @param data
	     * @param banner
	     */

	  }, {
	    key: 'initMwBlockEvent',
	    value: function initMwBlockEvent(data, mwBlock) {
	      var _this2 = this;

	      if (!mwBlock.getAttribute('render')) {

	        mwBlock.addEventListener('click', function () {
	          var url = decodeURIComponent(mwBlock.getAttribute('data-au'));

	          _this2.showLoading(mwBlock);

	          //mLink
	          if (Number(data.dt) === 4) {
	            var params = _common2.default.parseJson(mwBlock.getAttribute('data-mlink-params'));
	            mlink.redirect(url, data, params);
	          } else {
	            window.location = url.replace(/([&\?])?mw=1[&$]?/g, '$1');
	          }
	        });
	      }
	    }
	  }, {
	    key: 'showLoading',
	    value: function showLoading(mwBlock) {
	      var loading = document.createElement('div');
	      var icon = document.createElement('div');

	      loading.classList.add('mw-loading');
	      loading.addEventListener('click', function (event) {
	        event.stopPropagation();

	        loading.removeChild(icon);
	        mwBlock.removeChild(loading);
	        loading = null;
	        icon = null;
	        mwBlock = null;
	      });

	      mwBlock.appendChild(loading);

	      icon.classList.add('mw-loading-icon');
	      loading.appendChild(icon);
	    }
	  }]);

	  return Render;
	}();

	exports.default = Render;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ajax = __webpack_require__(4);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _uri = __webpack_require__(9);

	var _uri2 = _interopRequireDefault(_uri);

	var _promise = __webpack_require__(5);

	var _promise2 = _interopRequireDefault(_promise);

	var _common = __webpack_require__(1);

	var _common2 = _interopRequireDefault(_common);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _device = __webpack_require__(8);

	var _device2 = _interopRequireDefault(_device);

	var _apis = __webpack_require__(11);

	var _apis2 = _interopRequireDefault(_apis);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var deeplinks = undefined;
	var deeplinksPromise = undefined;

	var Mlink = function () {
	  function Mlink() {
	    _classCallCheck(this, Mlink);
	  }

	  /**
	   * 拼接成真正的url
	   *
	   * @param url String 后台DeepLink 字符串
	   * @param params        JSONObject 动态参数
	   * @return String
	   */

	  _createClass(Mlink, [{
	    key: 'getRealUrl',
	    value: function getRealUrl(url, params) {

	      if (!url) {
	        return "";
	      }

	      if (!params) {
	        params = {};
	      }

	      var uri = new _uri2.default(url);
	      var scheme = uri.scheme;
	      var host = uri.host;
	      var path = uri.path;
	      var query = uri.queryString;
	      var hash = uri.hash;
	      var realUriBuilder = [];

	      realUriBuilder.push(scheme);
	      realUriBuilder.push("://");
	      realUriBuilder.push(host);

	      path = this.replacePathParams(path, params);
	      realUriBuilder.push(path);

	      query = this.replaceQueryParams(query, params);
	      realUriBuilder.push(query);

	      hash = this.replacePathParams(hash, params);
	      realUriBuilder.push('#' + hash);

	      return realUriBuilder.join('');
	    }

	    /**
	     * 替换Path中的动态参数
	     * @param path
	     * @param params
	     * @returns {String}
	     */

	  }, {
	    key: 'replacePathParams',
	    value: function replacePathParams(path, params) {
	      var result = [];
	      var exp = /^:/;

	      path = typeof path === 'string' ? path.split('/') : path;

	      path.forEach(function (seg) {
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

	  }, {
	    key: 'replaceQueryParams',
	    value: function replaceQueryParams(query, params) {
	      var queryArr = query.split('&');
	      var exp = /^:/;
	      var result = [];

	      if (queryArr.length > 0) {
	        queryArr.forEach(function (paramSet) {
	          paramSet = paramSet.split('=');

	          var key = paramSet[0];
	          var value = paramSet[1];

	          if (value && value.match(exp)) {
	            value = params[value.replace(exp, '')] || '';
	          }

	          result.push([key, value].join('='));
	        });
	      }

	      return result.length > 0 ? '?' + result.join('&') : '';
	    }

	    /**
	     *
	     * @param failUrl
	     */

	  }, {
	    key: 'openDownloadUrl',
	    value: function openDownloadUrl(failUrl) {
	      var _this = this;

	      setTimeout(function () {
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

	        _this.sendDplEvent(failUrl);

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

	  }, {
	    key: 'redirect',
	    value: function redirect(url, data, params) {

	      var ack = data.ak;
	      var iosDownloadUrl = 'http://fir.im/mwshowios';
	      var androidDownloadUrl = 'http://fir.im/mwshowandroid';
	      var iosLink = 'mwshow://campaign/' + ack;
	      var androidLink = iosLink;
	      var ios9Link = 'https://s.mlinks.cc/AAAc?key=' + ack;

	      var realUrl = this.getRealUrl(url, params);
	      //window.location = realUrl;

	      // > IOS 9.0
	      if (_device2.default.isWeixin()) {

	        var tips = document.createElement('div');
	        tips.id = 'mw-download-tips';

	        var protocol = ios9Link;

	        if (_device2.default.isIos9() && (protocol === 'http' || protocol === 'https')) {
	          window.location.href = ios9Link;
	        } else {

	          if (_device2.default.isAndroid()) {
	            tips.classList.add('android');
	            tips.classList.remove('ios');
	          } else if (isIos()) {
	            tips.classList.add('ios');
	            tips.classList.remove('android');
	          }
	        }
	      } else {

	        if (_device2.default.isIos()) {
	          var protocol = new _uri2.default(ios9Link).scheme;
	          if (_device2.default.isIos9() && (protocol === 'http' || protocol === 'https')) {
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

	  }, {
	    key: 'loadDPLs',
	    value: function loadDPLs() {

	      if (deeplinks) {
	        // 如果Deeplinks已经加载完成,则直接执行resolve
	        return new _promise2.default(function (resolve) {
	          resolve(deeplinks);
	        });
	      } else if (deeplinksPromise) {
	        // 返回还未处理完成的Promise
	        return deeplinksPromise;
	      }

	      var url = _config2.default.constant('server').replace(/\/$/, '') + _apis2.default.deeplinks;
	      var ajax = new _ajax2.default();
	      var params = {
	        ak: _config2.default.constant('appkey') || _config2.default.constant('ak'),
	        av: _config2.default.constant('appVersion') || _config2.default.constant('av'),
	        sv: _device2.default.sdkVersion,
	        uid: _device2.default.uuid,
	        fp: _device2.default.getCanvasFingerprint(),
	        d: _device2.default.getCanvasFingerprint(),
	        os: _device2.default.os,
	        osv: _device2.default.version,
	        m: _device2.default.model,
	        mf: _device2.default.manufacturer,
	        sr: _device2.default.screen
	      };

	      deeplinksPromise = ajax.request({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        ContentType: 'application/json',
	        params: params
	      }).then(function (response) {
	        deeplinks = response.data;
	        deeplinksPromise = null;
	      }, function () {
	        deeplinksPromise = null;
	      });

	      return deeplinksPromise;
	    }

	    /**
	     * 加载发送方所有的Deeplinks
	     * @returns {*}
	     */

	  }, {
	    key: 'getDPLs',
	    value: function getDPLs() {

	      if (deeplinks) {
	        // 如果Deeplinks已经加载完成,则直接执行resolve
	        return new _promise2.default(function (resolve) {
	          resolve(deeplinks);
	        });
	      } else if (deeplinksPromise) {
	        // 返回还未处理完成的Promise
	        return deeplinksPromise;
	      }

	      var url = _config2.default.constant('server').replace(/\/$/, '') + _apis2.default.getDeeplinks;
	      var ajax = new _ajax2.default();
	      var params = {
	        ak: _config2.default.constant('appkey') || _config2.default.constant('ak'),
	        av: _config2.default.constant('appVersion') || _config2.default.constant('av'),
	        sv: _device2.default.sdkVersion,
	        uid: _device2.default.uuid,
	        fp: _device2.default.getCanvasFingerprint(),
	        d: _device2.default.getCanvasFingerprint(),
	        os: _device2.default.os,
	        osv: _device2.default.version,
	        m: _device2.default.model,
	        mf: _device2.default.manufacturer,
	        sr: _device2.default.screen
	      };

	      deeplinksPromise = ajax.request({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        ContentType: 'application/json',
	        params: params
	      }).then(function (response) {
	        deeplinks = response.data;
	        deeplinksPromise = null;
	      }, function () {
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

	  }, {
	    key: 'sendDplEvent',
	    value: function sendDplEvent(data, realUrl) {

	      var url = _config2.default.constant('server').replace(/\/$/, '') + _apis2.default.deeplinkEvent;
	      var ajax = new _ajax2.default();
	      var params = {
	        ak: _config2.default.constant('appkey') || _config2.default.constant('ak'),
	        av: _config2.default.constant('appVersion') || _config2.default.constant('av'),
	        sv: _device2.default.sdkVersion,
	        uid: _device2.default.uuid,
	        dp: realUrl,
	        ack: data.ack,
	        dt: data,
	        fp: _device2.default.getCanvasFingerprint(),
	        d: _device2.default.getCanvasFingerprint(),
	        os: _device2.default.os,
	        osv: _device2.default.version,
	        m: _device2.default.model,
	        mf: _device2.default.manufacturer,
	        sr: _device2.default.screen
	      };

	      ajax.request({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        ContentType: 'application/json',
	        params: params
	      });
	    }
	  }]);

	  return Mlink;
	}();

	exports.default = Mlink;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cookie = __webpack_require__(15);

	var _cookie2 = _interopRequireDefault(_cookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Profile = function () {
	  function Profile() {
	    _classCallCheck(this, Profile);
	  }

	  _createClass(Profile, null, [{
	    key: 'setPhoneNumber',

	    /**
	     * 设置用户手机号码
	     * @param phoneNumber
	     */
	    value: function setPhoneNumber(phoneNumber) {
	      _cookie2.default.setCookie('phoneNumber', phoneNumber);
	    }

	    /**
	     * 获取用户手机号码
	     * @returns {String} 返回用户手机号码
	     */

	  }, {
	    key: 'getPhoneNumber',
	    value: function getPhoneNumber() {
	      return _cookie2.default.getCookie('phoneNumber');
	    }

	    /**
	     * 设置城市代码
	     * @param cityCode
	     */

	  }, {
	    key: 'setCityCode',
	    value: function setCityCode(cityCode) {
	      _cookie2.default.setCookie('cityCode', cityCode);
	    }

	    /**
	     * 获取城市代码
	     * @returns {*}
	     */

	  }, {
	    key: 'getCityCode',
	    value: function getCityCode() {
	      return _cookie2.default.getCookie('cityCode');
	    }

	    /**
	     * 设置UserProfile
	     * @param userProfile
	     */

	  }, {
	    key: 'setUserProfile',
	    value: function setUserProfile(userProfile) {
	      _cookie2.default.setCookie('userProfile', userProfile);
	    }

	    /**
	     * 获取User Profile
	     */

	  }, {
	    key: 'getUserProfile',
	    value: function getUserProfile() {
	      return _cookie2.default.getCookie('userProfile');
	    }
	  }]);

	  return Profile;
	}();

	exports.default = Profile;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cookie = function () {
	  function Cookie() {
	    _classCallCheck(this, Cookie);
	  }

	  _createClass(Cookie, null, [{
	    key: 'getCookie',

	    /**
	     * 获取Cookie
	     * @param {String} cookieName
	     */
	    value: function getCookie(cookieName) {

	      var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
	          cookieMatch = cookiePattern.exec(document.cookie);

	      return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
	    }

	    /**
	     * Set cookie value
	     * @param {String} cookieName
	     * @param {String} value
	     * @param {Number} msToExpire
	     * @param {String} path
	     * @param {String} domain
	     * @param {String} secure
	     */

	  }, {
	    key: 'setCookie',
	    value: function setCookie(cookieName, value, msToExpire, path, domain, secure) {

	      var expiryDate;

	      // relative time to expire in milliseconds
	      if (msToExpire) {
	        expiryDate = new Date();
	        expiryDate.setTime(expiryDate.getTime() + msToExpire);
	      }

	      document.cookie = cookieName + '=' + encodeURIComponent(value) + (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path || '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
	    }
	  }]);

	  return Cookie;
	}();

	exports.default = Cookie;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?:global!./main.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?:global!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes mw-kfr-loading {\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n@-moz-keyframes mw-kfr-loading {\n  0% { -moz-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -moz-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n@keyframes mw-kfr-loading {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\nmw-block {\n  display: block;\n  position: relative;\n}\n\n.mw-loading {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.mw-loading-icon {\n  display: block;\n  height: 48px;\n  width: 48px;\n  position: absolute;\n  z-index: 100000000000;\n  top: 50%;\n  left: 50%;\n  margin: -24px auto auto -24px;\n  border: 3px solid rgba(255,255,255,0);\n  border-top: 3px solid rgba(255,255,255,0.8);\n  border-left: 2px dotted rgba(255,255,255,0.6);\n  border-bottom: 1px dashed rgba(255,255,255,0.2);\n  border-radius: 50%;\n  box-shadow: 0 0 15px rgba(0,0,0, 1);\n\n  -webkit-animation: mw-kfr-loading 0.8s linear infinite;\n  -moz-animation: mw-kfr-loading 0.8s linear infinite;\n  animation: mw-kfr-loading 0.8s linear infinite;\n}\n\n/*下载链接*/\n#mw-download-tips {\n  display: none;\n  position: fixed;\n  z-index: 9990;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  background-repeat: no-repeat;\n  background-position: top right;\n  background-size: 85% auto;\n}\n\n#mw-download-tips.android {\n  display: block;\n  background-image: url(\"http://activity.test.magicwindow.cn/common/asserts/navigator-modal/bg-android.png\");\n}\n\n#mw-download-tips.ios {\n  display: block;\n  background-image: url(\"http://activity.test.magicwindow.cn/common/asserts/navigator-modal/bg-ios.png\");\n}\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);