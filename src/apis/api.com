mw.namespace('mw.sdk.api');

/**
 * @class
 * @member mw.sdk.api
 * @static
 */
mw.extend(mw.sdk.api, {

  getParams: function() {
    return {
      server: mw.config('server'),
      ak: mw.config('appkey'),
      av: mw.config('av'),
      sv: mw.config('sv')
    };
  },

  applyParams : function(url, params) {
    if (url) {
      for (var k in params) {
        url = url.replace('{'+ k.toUpperCase() +'}', params[k]);
      }
    }
    return url;
  }
});
