import Test from './test.js';
import common from './common.js';
import config from './config.js';
import Marketing from './marketing.js';
import Render from './render.js';

var initialized;
var readyQueue = [];

class Mwsdk {

  constructor(configs) {

    // Apply configs
    for (var k in configs) {
      config.constant(k, configs[k]);
    }

    // Initialize once;
    if (!initialized) {
      this.init();
      initialized = true;
    }
  }

  /**
   * 初始化SDK
   */
  init () {
    var marketing = new Marketing();

    marketing.load().then(
      (response) => {

        this.onReady(()=>{
          new Render(response.data);
        });

      },
      (msg) => {
        console.log(msg);
      }
    );
  }

  /**
   * @member mw.sdk.onReady
   * @method
   * @param {Function} callback
   */
  onReady (callback) {

    // Put callback into queue
    if (common.isFunction(callback)) {
      readyQueue.push(callback);
    }

    if (window.document.readyState === 'complete') {
      this.excuteReadyQUeue();
    } else {
      window.document.addEventListener('readystatechange', () => {
        if (window.document.readyState === 'complete') {
          this.excuteReadyQUeue();
        }
      });
    }
  }

  /**
   * 执行所有排队的方法
   */
  excuteReadyQUeue () {

    while (readyQueue.length) {
      readyQueue.shift()();
    }
  }
}

window.mwsdk = window.mwsdk || {
    init: function(options) {
      return new Mwsdk(options);
    }
  };

export default Mwsdk;
