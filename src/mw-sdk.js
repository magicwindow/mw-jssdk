(function(mw) {

  var sdk = mw.sdk,
      readyQueue = [];

  mw.extend(sdk, {

    /**
     * 是否已经初始化，此属性初始值为false，在调用mw.sdk.init()方法后，其值则会变成true，
     * 第二次调用mw.sdk.init()时会被阻止。
     * @member mw.sdk.initialized
     * @type {boolean}
     */
    initialized : false,

    /**
     * 初始化SDK，
     * @member mw.sdk.init
     * @method
     * @param {Object} configs
     * @param {String} configs.server SDK服务器地址
     * @param {String} configs.appkey 您在魔窗后台应用配置里面填写的AppKey
     */
    init : function (configs) {

      if (sdk.initialized) {
        return;
      }

      var defaults = {
        server: 'sdk.magicwindow.cn',
        appkey: 'com.webapp.com'
      },
      options = mw.extend(defaults, configs);

      for (var k in options) {
        mw.config(k, options[k]);
      }

      sdk.initialized = true;
      sdk.onReady();
    },

    /**
     * @member mw.sdk.onReady
     * @method
     * @param {Function} callback
     */
    onReady : function(callback) {
      var action;

      if (mw.isFunction(callback)) {
        readyQueue.push(callback);
      }

      if (sdk.initialized) {
        while (readyQueue.length) {
          action = readyQueue.shift();
          if (mw.isFunction(action)) {
            action();
          }
        }
      }

      this.getMarketing(function(data) {
        sdk.api.data = data.data;
        this.watch();
      }.bind(this));
    },

    /**
     *
     */
    watch : function() {
      var api = sdk.api;

      if (api.data && api.data.length>0) {
        api.data.forEach(function (data) {
          var blocks = sdk.getMwBlocks(data.k);
          sdk.render(data, blocks);
        });
      }

      setTimeout(function() {
        sdk.watch();
      }, 1000);
    },

    /**
     *
     * @param id
     * @returns {Array}
     */
    getMwBlocks: function(id) {
      var list = document.getElementsByTagName('mw-block');
      var blocks = [];
      for (var i= 0,l=list.length; i<l; i++) {
        if (list[i].getAttribute('id') === id) {
          blocks.push(list[i]);
        }
      }
      return blocks;
    },

    render: function(data, blocks) {
      for (var i = 0,l=blocks.length; i<l; i++) {
        sdk.renderBlock(data, blocks[i]);
      }
    },

    renderBlock: function(data, block) {
      var id = block.getAttribute('id');
      block.setAttribute('data-au', data.au);
      block.innerHTML = '<img src="'+ data.iu +'" style="max-width:100%;"/>';
      sdk.initBannerEvent(block);
      block.setAttribute('render', true);
    },

    initBannerEvent: function (banner) {
      var data = this.api.data;
      if (!banner.getAttribute('render')) {
        var handle = function() {
          var url = decodeURIComponent(banner.getAttribute('data-au'));

          if (data.dt === 4) {
            //Deep link

          } else {
            window.location = url.replace(/[&\?]?mw=1[\?$]?/g, '');
          }
        };

        banner.addEventListener('click', handle);
        banner.addEventListener('touchend', handle);
      }
    }
  });

}(mw));
