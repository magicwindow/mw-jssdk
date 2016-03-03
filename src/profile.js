import Cookie from './cookie';

export default class Profile {

  /**
   * 设置用户手机号码
   * @param phoneNumber
   */
  static setPhoneNumber(phoneNumber) {
    Cookie.setCookie('phoneNumber', phoneNumber);
  }

  /**
   * 获取用户手机号码
   * @returns {String} 返回用户手机号码
   */
  static getPhoneNumber() {
    return Cookie.getCookie('phoneNumber');
  }

  /**
   * 设置城市代码
   * @param cityCode
   */
  static setCityCode(cityCode) {
    Cookie.setCookie('cityCode', cityCode);
  }

  /**
   * 获取城市代码
   * @returns {*}
   */
  static getCityCode() {
    return Cookie.getCookie('cityCode');
  }

  /**
   * 设置UserProfile
   * @param userProfile
   */
  static setUserProfile(userProfile) {
    Cookie.setCookie('userProfile', userProfile);
  }

  /**
   * 获取User Profile
   */
  static getUserProfile() {
    return Cookie.getCookie('userProfile');
  }

}
