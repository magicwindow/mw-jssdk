import config from './config';

let hostName = '{{HOST_NAME}}'.replace(/\/$/, '');
const SERVER = (hostName.indexOf('HOST_NAME')>-1 || !hostName) ? 'http://stats.magicwindow.cn' : hostName;

export default {
  marketing: SERVER + '/marketing/v2',
  deeplinks: SERVER + '/dp/dpls',
  deferrerInfo: SERVER + '/dp/getDPL', // 场景还原参数
  deeplinkEvent: SERVER + '/dp/event'
}
