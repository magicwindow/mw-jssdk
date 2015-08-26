describe('ajax.js.', function() {

  var _clock;
  var base = window.BASE === '/' ? '/' : '/base/';

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

    it("mw.ajax.success.", function (done) {
      //this.timeout(1000*15);
      mw.ajax({
        url: base + 'test/mocks/ajax.json',
        method: 'GET',
        success: function () {
          done();
        },
        complete: function () {
        }
      });
    });

    it("mw.ajax.complete", function (done) {
      //this.timeout(1000*15);
      mw.ajax({
        url: base + 'test/mocks/ajax.json',
        method: 'GET',
        success: function () {
        },
        complete: function () {
          done();
        }
      });
    });


    it("mw.ajax.error", function (done) {
      //this.timeout(1000*15);
      mw.ajax({
        url: base + 'test/mocks/404.json',
        method: 'GET',
        success: function () {
        },
        error: function () {
          done();
        }
      });
    });

    it("mw.ajax.get", function (done) {
      //this.timeout(1000*15);
      mw.get(base + 'test/mocks/ajax.json', function () {
        done();
      });
    });

    it("mw.ajax.post", function (done) {
      //this.timeout(1000*15);
      mw.post(base + 'test/mocks/ajax.json', {}, function () {
        done();
      });
    });

  });
});
