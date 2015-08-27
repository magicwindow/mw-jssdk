(function(mw){

  mw.sdk.getMarketing = function(callback) {

    // marketing/v2?ak=XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X&os=0&sv=2.3&d=864387021280405&sr=720x1280&av=2.3&fp=155439573
    var macketingUrl = '{SERVER}/marketing/v2?ak={AK}&os={OS}&sv={SV}&d={D}&sr={SR}&av={AV}&fp={fp}',
      params = mw.sdk.api.getParams(),
      url = mw.sdk.api.applyParams(macketingUrl, params);

    mw.get(url, function(data, a,b,c) {

      if (mw.isFunction(callback)) {
        callback(data);
      }
    }, 'jsonp');
  };

}(this.mw));

