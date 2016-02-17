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

	var _test = __webpack_require__(1);

	var _test2 = _interopRequireDefault(_test);

	var _common = __webpack_require__(2);

	var _common2 = _interopRequireDefault(_common);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _marketing = __webpack_require__(4);

	var _marketing2 = _interopRequireDefault(_marketing);

	var _render = __webpack_require__(6);

	var _render2 = _interopRequireDefault(_render);

	var _profile = __webpack_require__(7);

	var _profile2 = _interopRequireDefault(_profile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var initialized;
	var readyQueue = [];

	var Mwsdk = function () {
	  function Mwsdk() {
	    _classCallCheck(this, Mwsdk);
	  }

	  _createClass(Mwsdk, [{
	    key: 'init',

	    /**
	     * 初始化SDK
	     */
	    value: function init(configs) {
	      var _this = this;

	      var marketing = new _marketing2.default();

	      // Apply configs
	      for (var k in configs) {
	        _config2.default.constant(k, configs[k]);
	      }

	      // Initialize once;
	      if (!initialized) {

	        marketing.load(function (response) {

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
	     * 执行所有排队的方法
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Test = function Test(x, y) {
	  _classCallCheck(this, Test);

	  this.x = x;
	  this.y = y;
	};

	exports.default = Test;

/***/ },
/* 2 */
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
	  }]);

	  return Common;
	}();

	exports.default = Common;

/***/ },
/* 3 */
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
	     * @member mw.var
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
	     * @member mw.config.set
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
	     * @member mw.config.get
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _ajax = __webpack_require__(5);

	var _ajax2 = _interopRequireDefault(_ajax);

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
	        server: (_config2.default.variable('server') || '').replace(/\/$/, ''),
	        ak: _config2.default.variable('appkey'),
	        av: _config2.default.variable('av'),
	        sv: _config2.default.variable('sv')
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
	     * 加载 Marketing 数据
	     * @param {Fucntion} callback
	     */

	  }, {
	    key: 'load',
	    value: function load(callback) {

	      // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
	      var macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
	      var params = this.getParams();
	      var url = this.applyParams(macketingUrl, params);
	      var ajax = new _ajax2.default();

	      ajax.http({
	        url: url,
	        type: 'get',
	        dataType: 'jsonp',
	        success: callback,
	        error: function error() {
	          reject('error');
	        }
	      });
	    }

	    /**
	     * 加载 Marketing 数据
	     * @returns {Promise}
	     */

	  }, {
	    key: 'loadPromise',
	    value: function loadPromise() {

	      //return new Promise((resolve, reject) => {
	      //
	      //  // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
	      //  var macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
	      //  var params = this.getParams();
	      //  var url = this.applyParams(macketingUrl, params);
	      //  var ajax = new Ajax();
	      //
	      //  ajax.http({
	      //    url: url,
	      //    type: 'get',
	      //    dataType: 'jsonp',
	      //    success: function(data) {
	      //      resolve(data);
	      //    },
	      //    error: function() {
	      //      reject('error');
	      //    }
	      //  });
	      //
	      //});
	    }
	  }]);

	  return Marketing;
	}();

	exports.default = Marketing;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(2);

	var _common2 = _interopRequireDefault(_common);

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

	  _createClass(Ajax, [{
	    key: 'http',
	    value: function http() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var http = Ajax.create(),
	          self = this,
	          tried = 0,
	          tmp = undefined,
	          i = undefined,
	          j = undefined,
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
	        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
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

	        if (timeout > 0) {
	          setTimeout(function () {
	            if (window[cbHandler]) {}
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
	            } catch (e) {
	              if (_common2.default.isFunction(onError)) {}
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

	      if (typeof onBeforeSend !== 'function' || onBeforeSend.call(http) !== false) {
	        http.send(params);
	      }

	      return http;
	    }

	    /**
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

	  }, {
	    key: 'post',
	    value: function post(url, data, callback, type) {

	      if (this.isFunction(data)) {
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
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var marketingData;

	var Render = function () {
	  function Render(data) {
	    _classCallCheck(this, Render);

	    marketingData = data;
	    this.watch();
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

	      this.initBannerEvent(data, block);
	      block.setAttribute('render', true);
	    }

	    /**
	     * 魔窗位事件渲染
	     * @param data
	     * @param banner
	     */

	  }, {
	    key: 'initBannerEvent',
	    value: function initBannerEvent(data, banner) {

	      if (!banner.getAttribute('render')) {

	        var handle = function handle() {
	          var url = decodeURIComponent(banner.getAttribute('data-au'));

	          //mLink
	          if (data.dt == 4) {} else {
	            window.location = url.replace(/([&\?])?mw=1[&$]?/g, '$1');
	          }
	        };

	        if (window.document.ontouchstart) {
	          banner.addEventListener('touchend', handle);
	        } else {
	          banner.addEventListener('click', handle);
	        }
	      }
	    }
	  }]);

	  return Render;
	}();

	exports.default = Render;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cookie = __webpack_require__(8);

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
/* 8 */
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

/***/ }
/******/ ]);