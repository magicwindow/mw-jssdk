import common from './common';
import config from './config';
import Marketing from './marketing';
import Render from './render';
import Profile from './profile';
import device from './device';

require('./styles/main.css');

var initialized;
var readyQueue = [];

class Mwsdk {

  constructor() {
    this.version = "[[VERSION]]";
    this.device = device;

    device.appVersion = this.version;
  }

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
      this.excuteReadyQueue();
    } else {
      window.document.addEventListener('readystatechange', () => {
        if (window.document.readyState === 'complete') {
          this.excuteReadyQueue();
        }
      });
    }
  }

  /**
   * 执行队列中所有的方法
   */
  excuteReadyQueue () {

    while (readyQueue.length) {
      readyQueue.shift()();
    }
  }
}

window.mwsdk = window.mwsdk || new Mwsdk();

export default Mwsdk;