export default class Common {

  /**
   * 判断变量是否为Function
   * @member isFunction
   * @method
   * @param obj
   * @returns {boolean}
   */
  static isFunction(obj) {
    return typeof obj === 'function';
  }

  /**
   * @member isFunc
   * @method
   * @alias isFunction
   * @param obj
   * @returns {boolean}
   */
  static isFunc(obj) {
    return this.isFunction(obj);
  }

  /**
   * 判断变量是否为Object
   * @member isObject
   * @method
   * @param obj
   * @returns {boolean}
   */
  static isObject(obj) {
    return !!(obj && obj.constructor === Object);
  }

  /**
   * 判断变量是否为String
   * @member isString
   * @method
   * @param obj
   * @returns {boolean}
   */
  static isString(obj) {
    return typeof obj === 'string';
  }

  /**
   * 判断变量是否为Array
   * @member isArray
   * @method
   * @param obj
   * @returns {boolean}
   */
  static isArray(obj) {
    return !!(obj && obj.constructor === Array);
  }

  /**
   * 判断变量是否为数字
   * @member isNumeric
   * @method
   * @param obj
   * @returns {*|boolean}
   */
  static isNumeric(obj) {
    return (obj || obj===0) && obj.constructor === Number;
  }

  /**
   * 判断变量是否为HTML Elements
   * @member isElement
   * @method
   * @param obj
   * @returns {boolean}
   */
  static isElement(obj) {
    return !!(obj && this.isNumeric(obj.nodeType));
  }

  /**
   * 判断App运行环境是否为微信
   * @member isWeixin
   * @method
   * @returns {boolean}
   */
  static isWeixin() {
    return window.navigator.userAgent.match(/Micromessag/);
  }

  /**
   * 判断App运行环境是否为魔窗SDK
   * @member isWm
   * @method
   * @version v2.0.0
   * @returns {boolean}
   */
  static isWm() {
    return window.navigator.userAgent.match(/magicwindow/) || window.location.href.match(/[&\?]mw=1[#&$]/);
  }

  /**
   * 格式化JSON字符串
   * @param String jsonString
   * @param String isStrict
   * @returns {Object}
     */
  static parseJson(jsonString, isStrict) {
    if (isStrict) {
      return JSON.parse(jsonString);
    } else {
      return new Function('return ' + jsonString)();
    }
  }

  /**
   * 合并对象
   * @param p
   * @param p1
     */
  static mix(obj, obj2) {
    if (!p) {
      return;
    }

    if (!p1 && p) {
      return p;
    }

    for (let k in obj) {
      obj[k] = obj2[k];

      for (let j in obj2) {
        if (!obj[j]) {
          obj[j] = obj2[j];
        }
      }
    }

    return obj;
  }

}
