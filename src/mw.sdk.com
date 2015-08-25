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
