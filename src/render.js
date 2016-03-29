import Mlink from './mlink';
import Common from './common';

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

          if (!block.getAttribute('render')) {
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

    //var id = block.getAttribute('id');

    block.setAttribute('data-au', data.au);
    block.innerHTML = '<img src="'+ data.iu +'" style="max-width:100%;"/>';

    this.initMwBlockEvent(data, block);
    block.setAttribute('render', true);
  }

  /**
   * 绑定魔窗位事件
   * @param data
   * @param banner
   */
  initMwBlockEvent (data, mwBlock) {

    if (!mwBlock.getAttribute('render')) {
      mwBlock.addEventListener('click', () => {
        let url = decodeURIComponent(mwBlock.getAttribute('data-au'));

        this.showLoading(mwBlock);

        //mLink
        if (Number(data.dt) === 4) {
          let params = Common.parseJson(mwBlock.getAttribute('data-mlink-params'));
          mlink.redirect(url, params);
        } else {
          window.location = url.replace(/([&\?])?mw=1[&$]?/g, '$1');
        }
      });
    }
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
