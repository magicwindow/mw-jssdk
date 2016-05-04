import Ajax from '../../src/ajax';

const ajax = new Ajax();


describe('ajax.js.', function() {

  let _clock;
  let base = window.BASE === '/' ? '/' : '/base/';

  /*
   * isObject
   */
  describe('ajax.js', function() {

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("ajax.success.", function (done) {
      //this.timeout(1000*15);
      ajax.request({
        url: base + 'test/mocks/ajax.json',
        method: 'GET',
        success: function () {
          done();
        },
        complete: function () {
        }
      });
    });

    it("ajax.complete", function (done) {
      //this.timeout(1000*15);
      ajax.request({
        url: base + 'test/mocks/ajax.json',
        method: 'GET',
        success: function () {
        },
        complete: function () {
          done();
        }
      });
    });


    it("ajax.error", function (done) {
      //this.timeout(1000*15);
      ajax.request({
        url: base + 'test/mocks/404.json',
        method: 'GET',
        success: function () {
        },
        error: function () {
          done();
        }
      });
    });

    it("ajax.fetch", function (done) {
      //this.timeout(1000*15);
      ajax.fetch(base + 'test/mocks/ajax.json', function () {
        done();
      });
    });

    it("ajax.post", function (done) {
      //this.timeout(1000*15);
      ajax.post(base + 'test/mocks/ajax.json', {}, function () {
        done();
      });
    });

  });
});
