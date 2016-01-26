var marketingData;

export default class Render {

  constructor (data) {
    marketingData = data;
    this.watch();
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

    this.initBannerEvent(data, block);
    block.setAttribute('render', true);
  }

  /**
   * 魔窗位事件渲染
   * @param data
   * @param banner
   */
  initBannerEvent (data, banner) {

    if (!banner.getAttribute('render')) {

      var handle = () => {
        var url = decodeURIComponent(banner.getAttribute('data-au'));

        //mLink
        if (data.dt == 4) {

        } else {
          window.location = url.replace(/[&\?]?mw=1[\?$]?/g, '');
        }

      };

      if (window.document.ontouchstart) {
        banner.addEventListener('touchend', handle);
      } else {
        banner.addEventListener('click', handle);
      }

    }
  }

}
