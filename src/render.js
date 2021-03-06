import Mlink from './mlink';
import config from './config';
import Common from './common';
import BannerHelper from './bannerHelper';
import Messager from './messager';

const RENDERED = 'rendered';
const PREFIX_DIALOG_ID = 'mw-block-dialog';
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
          url = url.replace(/([&\?])?mw=1[&$]?/g, '$1');

          this.openMwBlockDialog(mwBlock, url);
          //window.location = url;
        }
      });
    }
  }

  getOffset (elem) {
    let rect = elem.getBoundingClientRect();
    return {
      top: Math.max(0, rect.top),
      left: Math.max(0, rect.left)
    };
  }

  /**
   * 关闭显示魔窗位的Dialog
   * @param id
     */
  closeMwBlockDialog (id) {
    let dialog = document.getElementById(id);
    dialog.classList.remove('show');
    setTimeout(()=>{
      dialog.parentNode.removeChild(dialog);
    }, 300);
  }

  /**
   * 以modal方式打开魔窗位
   * @param mwBlock
     */
  openMwBlockDialog(mwBlock, url) {
    let dialog = document.createElement('div');
    let iframe;
    let btnClose;

    let bdWidth = document.documentElement.clientWidth;
    let bdHeight = document.documentElement.clientHeight;
    let loading = mwBlock.getElementsByClassName('mw-loading-icon')[0];
    let offset = this.getOffset(loading);
    let loadingWidth = loading.clientWidth;
    let loadingHeight = loading.clientHeight;
    let top = offset.top;
    let left = offset.left;

    dialog.style.top = offset.top + 'px';
    dialog.style.left = offset.left + 'px';
    dialog.style.right = (bdWidth - loadingWidth - left) + 'px';
    dialog.style.bottom = (bdHeight - loadingHeight - top) + 'px';

    dialog.id = PREFIX_DIALOG_ID + '-' + mwBlock.id;
    dialog.classList.add(PREFIX_DIALOG_ID);
    dialog.innerHTML = `
      <div class="${PREFIX_DIALOG_ID}-toolbar">
        <a class="closeMWBlock" href="javascript:void(0);"></a>
       </div>
      <div class="${PREFIX_DIALOG_ID}-main">
        <iframe src="about:blank" frameborder="0"></iframe>
      </div>`;
    btnClose = dialog.getElementsByTagName('a')[0];
    btnClose.addEventListener('click', () => {
      dialog.classList.remove('show');
      setTimeout(()=>{
        dialog.parentNode.removeChild(dialog);
        mwBlock = btnClose = iframe = dialog = null;
      }, 500);
    });

    document.body.appendChild(dialog);

    iframe = dialog.getElementsByTagName('iframe')[0];
    iframe.contentWindow.opener = mwsdk;
    iframe.onload = () => {

      dialog.classList.add('show');
      this.hideLoading(mwBlock);
      try {
        let myurl = typeof window.URL === 'function' ? new URL(url) : {};
        new Messager().postUA(iframe.contentWindow, myurl.origin);
      } catch(e){

      }
      mwBlock = null;
    };
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

      this.closeMwBlockDialog(PREFIX_DIALOG_ID + '-' + mwBlock.id);
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

  /**
   * 隐藏魔窗位上的Loading图标
   * @param mwBLock
     */
  hideLoading (mwBLock) {
    if (mwBLock) {
      let loading = mwBLock.getElementsByClassName('mw-loading')[0];
      if (loading) {
        loading.parentNode.removeChild(loading);
        return true;
      }
    }
  }

}
