import Common from './common';

export default class Uri {

  /**
   * Constructor
   * @returns {*}
   */
  constructor(uri) {

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
  getParams () {

    let paramsSet = this.queryString.split('&');
    let params = {};

    paramsSet.forEach((param) => {
      let paramArr = param.split('=');
      params[paramArr[0]] = paramArr[1];
    });

    return params;
  }

  /**
   * 获取参数值
   * @returns {String}
   */
  getParam (paramName) {
    return this.getParams()[paramName];
  }
}
