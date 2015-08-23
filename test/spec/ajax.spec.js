describe('ajax.js.', function() {
debugger;
  var _clock;

  /*
   * isObject
   */
  describe('ajax.js', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("mw.ajax", function (done) {
      //this.timeout(1000*15);
      mw.ajax({
        url: '/base/test/mocks/ajax.json',
        method: 'GET',
        success: function() {
          console.log('success!');
          done();
        },
        onload: function () {
          console.log('load');
        }
      });
    });

  });

});
