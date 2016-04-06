import Mlink from './mlink';
import config from './config';
import Common from './common';
import BannerHelper from './bannerHelper';

const RENDERED = 'rendered';
let marketingData;
let mlink = new Mlink();

export default class Render {

  constructor (data) {
    marketingData = data;

    this.watch();
    mlink.loadDPLs();
  }

  /**
   * 检测页面DOM节点，并渲染
   */
  watch () {
    if (marketingData && marketingData.length>0) {
      marketingData.forEach( (data) => {
        var blocks = this.getMwBlocks(data.k);
        var block;

        for (var i = 0,l=blocks.length; i<l; i++) {
          block = blocks[i];

          if (!block.getAttribute(RENDERED)) {
            this.render(data, block);
          }
        }
      });
    }

    setTimeout(() => {
      this.watch();
    }, 1000);
  }

  /**
   *
   * @param id
   * @returns {Array}
   */
  getMwBlocks(id) {
    var list = document.getElementsByTagName('mw-block');
    var blocks = [];

    for (var i= 0,l=list.length; i<l; i++) {
      if (list[i].getAttribute('id') === id) {
        blocks.push(list[i]);
      }
    }
    return blocks;
  }

  /**
   * 魔窗位渲染
   * @param data
   * @param block
   */
  render(data, block) {

    block.setAttribute('data-au', data.au);
    block.innerHTML = this.parseTemplate(data);
    this.initMwBlockEvent(data, block);
    block.setAttribute(RENDERED, true);
  }

  /**
   * 格式化模板
   * @param data
   * @return {String}
     */
  parseTemplate(data) {
    let banner = new BannerHelper(data);
    let defaultTemplate = '<img src="[ $imgUrl ]" style="max-width:100%;"/>';
    let template = config.constant('template');
    let regExpGlobal = /\[\s*\$(\w+)\s*\]/ig;
    let regExp = /\[\s*\$(\w+)\s*\]/;

    template = template || defaultTemplate;

    // 如果是Map类型的模板,从Map中读取当前魔窗位的模板,若未定义则使用默认模板
    if (Common.isObject(template)) {
      template = template[banner.key] || defaultTemplate;
    }

    // 如果是自定义渲染方法,则执行开发者自定义的渲染方法
    if (Common.isFunc(template)) {
      template = template(banner);
    }

    if (Common.isString(template)) {
      let matched = template.match(regExpGlobal);
      let fieldName;

      if (matched) {
        matched.forEach((field)=>{
          fieldName = field.match(regExp);
          fieldName = fieldName ? fieldName[1] : '';
          template  = template.replace(field, banner[fieldName]);
        });
      }
    }

    return template;
  }

  /**
   * 绑定魔窗位事件
   * @param data
   * @param banner
   */
  initMwBlockEvent (data, mwBlock) {

    if (!mwBlock.getAttribute(RENDERED)) {
      mwBlock.addEventListener('click', () => {
        let url = decodeURIComponent(mwBlock.getAttribute('data-au'));

        this.showLoading(mwBlock);

        //mLink
        if (Number(data.dt) === 4) {
          let params = Common.parseJson(mwBlock.getAttribute('data-mlink-params'));
          mlink.redirect(url, params);
        } else {
          debugger;
          this.openMwBlockDialog(url.replace(/([&\?])?mw=1[&$]?/g, '$1'));
          //window.location = url.replace(/([&\?])?mw=1[&$]?/g, '$1');
        }
      });
    }
  }

  /**
   * 以modal方式打开魔窗位
   * @param mwBlock
     */
  openMwBlockDialog(url) {
    debugger;
    let dialog = document.createElement('div');
    let iframe = document.createElement('iframe');
    let toolbar = document.createElement('div');

    toolbar.classList.add('mw-block-dialog-toolbar');
    toolbar.innerHTML = '<div><a class="closeMWBlock" href="javascript:void(0);"></a></div>';
    dialog.classList.add('mw-block-dialog');
    dialog.appendChild(iframe);
    document.body.appendChild(dialog);

    iframe.src = url;
  }

  /**
   * 点击魔窗位时,在魔窗位上显示Loading效果
   * @param mwBlock
     */
  showLoading (mwBlock) {
    let loading = document.createElement('div');
    let icon = document.createElement('div');

    loading.classList.add('mw-loading');
    loading.addEventListener('click', (event)=>{
      event.stopPropagation();

      loading.removeChild(icon);
      mwBlock.removeChild(loading);
      loading = null;
      icon = null;
      mwBlock = null;
    });

    mwBlock.appendChild(loading);

    icon.classList.add('mw-loading-icon');
    loading.appendChild(icon);
  }

}
