import Uri from './uri';
import config from './config';
import sha1 from './sha1';

const URI = new Uri(document.location.href);
const UA = window.navigator.userAgent;

class Device {
  constructor () {

    let os = this.getOsInfo();

    this.constructor.sdkVersion = "[[VERSION]]";
    this.constructor.appKey = config.constant('appKey');
    this.constructor.appVersion = config.constant('appVersion');

    this.constructor.model = '';
    this.constructor.os = os.platform;
    this.constructor.version = os.version;
    this.constructor.uuid = this.getCanvasFingerprint();
    this.constructor.manufacturer = '';
    this.constructor.isVirtual = '';
    this.constructor.serial = '';
    this.constructor.screen = window.screen.width + 'x'+ window.screen.height;
    this.constructor.deviceId = '';
  }

  set sdkVersion(value) { if(value) { this.constructor.sdkVersion = value; }}
  get sdkVersion()      { return this.constructor.sdkVersion; }

  set appKey(value) { if(value) { this.constructor.appKey = value; }}
  get appKey()      { return this.constructor.appKey; }

  set appVersion(value) { if(value) { this.constructor.appVersion = value; }}
  get appVersion()      { return this.constructor.appVersion; }

  set model(value) { if(value) { this.constructor.model = value; }}
  get model()      { return this.constructor.model; }

  set os(value) { if(value) { this.constructor.os = value; }}
  get os()      { return this.constructor.os; }

  set version(value) { if(value) { this.constructor.version = value; }}
  get version()      { return this.constructor.version; }

  set uuid(value) { if(value) { this.constructor.uuid = value; }}
  get uuid()      { return this.constructor.uuid; }

  set manufacturer(value) { if(value) { this.constructor.manufacturer = value; }}
  get manufacturer()      { return this.constructor.manufacturer; }

  set isVirtual(value) { if(value) { this.constructor.isVirtual = value; }}
  get isVirtual()      { return this.constructor.isVirtual; }

  set serial(value) { if(value) { this.constructor.serial = value; }}
  get serial()      { return this.constructor.serial; }

  set screen(value) { if(value) { this.constructor.screen = value; }}
  get screen()      { return this.constructor.screen; }

  /**
   * 读取MagicWindow信息
   * @returns {{}}
     */
  getMWMetaData() {
    // (MagicWindow;d/%@;fp/%@;av/%@;sv/%@;uid/%@;m/%@;c/%@;b/Apple;mf/Apple)
    let mwUA = UA.match(/\(MagicWindow\s*([\d\.]*)*;([^\)]*)*\)/);
    let metaStr = mwUA ? mwUA[2] : '';
    let metaArr = metaStr.split(';');
    let meta = {};

    metaArr.forEach((value, i)=>{
      let kv = value.split('/');
      meta[kv[0]] = kv[1] || '';
    });
    return meta;
  }

  /**
   * 判断是否是iOs设备
   * @returns {boolean}
   */
  isIos() {
    return !!UA.match(/iPhone|iPad|iPod/);
  }

  /**
   * 判断iOs设备是否是9.0以上版本
   * @returns {boolean}
   */
  isIos9() {
    let exp = /iPhone\s?OS\s?(\d+)_(\d*)/;
    let matched = UA.match(exp);
    let version = matched ? new Number(matched[1]+'.'+matched[2]) : 0;

    return version >= 9;
  }

  /**
   * 判断是否是Android设备
   * @returns {boolean}
   */
  isAndroid() {
    return !!UA.match(/Android/);
  }

  /**
   * 判断App运行环境是否为微信
   * @member isWeixin
   * @method
   * @returns {boolean}
   */
  isWeixin() {
    return UA.match(/[Mm]icro[Mm]essenger/);
  }

  /**
   * 判断App运行环境是否为魔窗SDK
   * @member isMw
   * @method
   * @version v2.0.0
   * @returns {boolean}
   */
  isMw() {
    var params = URI.getParams();
    return !!UA.match(/[Mm]agic[Ww]indow/) || params.mw;
  }

  /**
   * Get OS information
   * returns {Object}
   */
  getOsInfo () {

    const IOS = 1;
    const ANDROID = 0;
    const VERSION = '0.0.0';

    let info = {
        platform: 0,
        version: VERSION
      },
      isIOS = UA.match(/(iPad|iPhone)/),
      isAndroid = UA.match(/Android/),
      iosExp = /(iPad|iPhone)\s*OS\s*(\d*_\d*_?\d?)/,
      androidExp = /Android\s*(\d*\.?\d*\.?\d?)/,
      versionExp = /Version\/(\d*\.?\d*\.?\d?)/,
      version,
      ios = UA.match(iosExp),
      android = UA.match(androidExp);

    if (isIOS) {
      info.platform = IOS;
      version = UA.match(versionExp);
      info.version = ios[2]
        ? ios[2].replace(/_/g, '.')
        : (version ? version[1] : VERSION);
    } else if (isAndroid) {
      info.platform = ANDROID;
      version = UA.match(versionExp);
      info.version = android[1]
        ? android[1].replace('_', '.')
        : (version ? version[1] : VERSION);
    }

    return info;
  }

  /**
   * 生成 Fingerprint
   * returns {String}
   */
  getCanvasFingerprint () {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let txt = 'http://magicwindow.cn';

    // https://www.browserleaks.com/canvas#how-does-it-work
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);

    return sha1(canvas.toDataURL());
  }
}

export default new Device();
