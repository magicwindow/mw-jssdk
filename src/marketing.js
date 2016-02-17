import config from './config'
import Ajax from './ajax.js';

export default class Marketing {

  /**
   * 获取参数
   * @returns {{server: string, ak: *, av: *, sv: *}}
   */
  getParams () {
    return {
      server: (config.variable('server')||'').replace(/\/$/, ''),
      ak: config.variable('appkey'),
      av: config.variable('av'),
      sv: config.variable('sv')
    };
  }

  /**
   * 替换参数
   * @param url
   * @param params
   * @returns {*|XML|void|string}
   */
  applyParams (url, params) {
    if (url) {
      for (var k in params) {
        url = url.replace('{'+ k.toUpperCase() +'}', params[k]);
      }
    }

    url = url.replace(/\{(\w)*\}/g, '');
    return url;
  }

  /**
   * 加载 Marketing 数据
   * @param {Fucntion} callback
   */
  load (callback) {

    // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
    var macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
    var params = this.getParams();
    var url = this.applyParams(macketingUrl, params);
    var ajax = new Ajax();

    ajax.http({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      success: callback,
      error: () => {
        reject('error');
      }
    });
  }

  /**
   * 加载 Marketing 数据
   * @returns {Promise}
   */
  loadPromise () {

    return new Promise(function(resolve, reject) {

      // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
      var macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}';
      var params = this.getParams();
      var url = this.applyParams(macketingUrl, params);
      var ajax = new Ajax();

      ajax.http({
        url: url,
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
          resolve(data);
        },
        error: function() {
          reject('error');
        }
      });

    }.bind(this));
  }
}
