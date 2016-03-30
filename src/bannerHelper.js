/**
 * Created by colin on 16/3/30.
 */
export default class BannerHelper {
  constructor(bannerData) {
    this.data = bannerData;
  }

  /**
   * Banner图片URL
   * @returns {String}
     */
  get imgUrl(){ return this.data.iu; }

  /**
   * 缩略图URL
   * @returns {String}
     */
  get thumbUrl(){ return this.data.tu; }

  /**
   * Banner标题
   * @returns {String}
     */
  get title(){ return this.data.t; }

  /**
   * Banner简介
   * @returns {String}
     */
  get description(){ return this.data.dc; }

  /**
   * 活动入口地址
   * @returns {String}
     */
  get url(){ return this.data.au; }

  /**
   * 活动开始时间戳
   * @returns {TimeStamp}
     */
  get startTime(){ return this.data.st; }

  /**
   * 活动结束时间戳
   * @returns {TimeStamp}
     */
  get endTime(){ return this.data.et; }

  /**
   * 魔窗位Key
   * @returns {String}
     */
  get key(){ return this.data.k; }

  /**
   * 魔窗后台生成的App Key
   * @returns {String}
     */
  get appKey(){ return this.data.ak; }

  /**
   * 分享链接
   * @returns {String}
     */
  get shareUrl(){ return this.data.su; }

  /**
   * iOS 9以上版本专用的Universal Link URL
   * @returns {String}
     */
  get universalLink(){ return this.data.ul; }

  /**
   * Universal Link Type; -1:不使用universal link; 0:app自己的universal link;   1:magicwindow的短链接服务
   * @returns {Int}
     */
  get universalLinkType(){ return this.data.ut; }

  /**
   * mLink 默认参数列表
   * @returns {Object}
     */
  get mlinkParams(){ return this.data.mp; }

  /**
   * 判断右上角是否显示分享按钮，1:显示，0:不显示
   * @returns {Int}
     */
  get shareStatus(){ return this.data.ss; }

  /**
   * 魔窗内容的展示方式，0: 点击进入webview展示，1:点击直接分享，2:应用内跳转（直接点魔窗位），3:图文（不能点击）, 4 (deep link）
   * @returns {Int}
     */
  get deeplinkType(){ return this.data.dt; }

  /**
   * webview 上面显示的标题
   * @returns {String}
     */
  get viewTitle(){ return this.data.vt; }

  /**
   * 访问魔窗位是否需要登录，true 需要， false 不需要
   * @returns {Boolean}
     */
  get requireLogin(){ return this.data.rl; }

  /**
   * 判断活动是否已过期
   * @returns {boolean}
     */
  isExpired() {
    let now = new Date().getTime();
    return (this.endTime < now);
  }
}
