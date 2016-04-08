import device from './device';

const DOMAINS = [
  'magicwindow.cn',
  'mlinks.cc'
];

const MSG_CHANNEL = ['getUserAgent'];

export default class Messager{

  constructor (config) {

    window.addEventListener('message', (event) => {

      let origin = event.origin;

      DOMAINS.forEach((domain)=>{

        if (origin.indexOf(domain) !== -1) {
          this.receive(event.data, domain);
        }
      });

    });


    this.channels = {
      getUserAgent: ()=>{
        let ua = '(MagicWindow JSSDK [[VERSION]];$META)';
        let meta = [];
        // d/%@;fp/%@;av/%@;sv/%@;uid/%@;m/%@;c/%@;b/Apple;mf/Apple
        meta.push(['d', device.deviceId].join('/'));
        meta.push(['fp', device.fingerprint].join('/'));
        meta.push(['av', device.appVersion].join('/'));
        meta.push(['sv', device.sdkVersion].join('/'));
        meta.push(['uid', device.uuid].join('/'));
        meta.push(['m', device.model].join('/'));
        meta.push(['c', 0].join('/'));
        meta.push(['b', 0].join('/'));
        meta.push(['mf', device.manufacturer].join('/'));

        ua.replace('$META', meta.join(';'));
        return window.navigator.userAgent + ua;
      }
    }
  }

  receive(data, domain) {
    let msg;
    try {
      msg = JSON.parse(data);
    } catch(e) {
      msg = {};
    }

    switch (msg.channel) {
      case 'getUserAgent':
            this.post(window, 'getUserAgent', this.channels[msg.channel](), domain);
            break;

    }
  }

  /**
   * 向打开的
   * @param domain
     */
  postUA (window, domain) {
    let channel = 'getUserAgent';
    this.post(window, channel, this.channels[channel](), domain);
  }

  post (window, channel, data, domain) {
    let msg = {
      channel: channel,
      data: data
    }

    window.postMessage(JSON.stringify(msg), domain);
  }
}
