import common from './common';
import config from './config';
import Promise from './promise';
import Marketing from './marketing';
import Render from './render';
import Mlink from './mlink';
import Profile from './profile';
import device from './device';

require('./styles/main.less');

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

    // Initialize once;
    if (!initialized) {

      let marketing = new Marketing();

      // Apply configs
      for (var k in configs) {
        config.constant(k, configs[k]);
      }

      marketing.load().then(
        (response) => {
          this.onReady(()=>{
            new Render(response.data);
          });
        }
      );

      if (common.isFunc(this.onInit)) {
        try {
          this.onInit();
        } catch(e){}
      }

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
   * 第一次安装App时执行,场景还原
   * @param callback(mlinkAndParams)
   * @param onError
   * @returns {PromisePolyfill} 返回Promise对象, 若你可以使用Promise处理结果,也可以使用回调方法callback和onError来跳转;
   */
  router(callback, onError) {

    return new Promise((resolve, reject)=>{

      const route = ()=>{
        new Mlink().deferrerRedirect(
          (result)=>{
            resolve(result);
            if (common.isFunc(callback)) {
              callback(result);
            }
          },
          (err)=> {
            reject(err);
            if (common.isFunc(onError)) {
              onError(err);
            }
          }
        );
      };

      if (initialized) {
        route();
      } else {
        this.onInit = route;
      }
    });
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
