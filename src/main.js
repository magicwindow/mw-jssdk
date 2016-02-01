import Test from './test.js';
import common from './common.js';
import config from './config.js';
import Marketing from './marketing.js';
import Render from './render.js';
import Profile from './profile.js';

var initialized;
var readyQueue = [];

class Mwsdk {

  /**
   * 初始化SDK
   */
  init (configs) {
    var marketing = new Marketing();

    // Apply configs
    for (var k in configs) {
      config.constant(k, configs[k]);
    }

    // Initialize once;
    if (!initialized) {
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

      initialized = true;
    }
  }


  /**
   * 公开接口
   * @param phoneNumber
   */
  setPhoneNumber (phoneNumber) { Profile.setPhoneNumber(phoneNumber); }
  getPhoneNumber () { return Profile.getPhoneNumber(); }

  setCityCode (cityCode) { Profile.setCityCode(cityCode); }
  getCityCode () { return Profile.getCityCode(); }

  setUserProfile (userProfile) { Profile.setUserProfile(userProfile); }
  getUserProfile () { return Profile.getUserProfile(); }


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

window.mwsdk = window.mwsdk || new Mwsdk();

export default Mwsdk;
