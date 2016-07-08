export default class Cookie {

  /**
   * 获取Cookie
   * @param {String} cookieName cookie名称
   */
  static getCookie (cookieName) {

    let cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
      cookieMatch = cookiePattern.exec(document.cookie);

    return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
  }

  /**
   * Set cookie value
   * @param {String} cookieName cookie名称
   * @param {String} value cookie值
   * @param {Number} msToExpire 过期时间
   * @param {String} path 设置cookie的路径
   * @param {String} domain 设置cookie域名
   * @param {String} secure
   */
  static setCookie (cookieName, value, msToExpire, path, domain, secure) {

    let expiryDate;

    // relative time to expire in milliseconds
    if (msToExpire) {
      expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + msToExpire);
    }

    document.cookie = cookieName + '=' + encodeURIComponent(value) +
      (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
      ';path=' + (path || '/') +
      (domain ? ';domain=' + domain : '') +
      (secure ? ';secure' : '');
  }
}
