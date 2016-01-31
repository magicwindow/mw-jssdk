export default class Cookie {


  /**
   * 获取Cookie
   * @param {String} cookieName
   */
  static getCookie (cookieName) {

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
  static setCookie (cookieName, value, msToExpire, path, domain, secure) {

    var expiryDate;

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
