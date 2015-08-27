mw.namespace('mw.sdk.api');

/**
 * @class
 * @member mw.sdk.api
 * @static
 */
mw.extend(mw.sdk.api, {

  data: [],

  getParams: function() {
    return {
      server: (mw.config('server')||'').replace(/\/$/, ''),
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

    url = url.replace(/\{(\w)*\}/g, '');
    return url;
  }
});
