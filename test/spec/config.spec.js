describe('common.js.', function(){

  var _clock;

  /*
   * isObject
   */
  describe('isObject', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("config.set('a', 123456)", function () {
      mw.sdk.config.set('a', 123456)
      expect(mw.sdk.config.get('a')).equals(123456);
    });

    it("config.set('xx', 1, true)", function () {
      mw.sdk.config.set('xx', 1, true);
      mw.sdk.config.set('xx', 2);
      expect(mw.sdk.config.get('xx')).equals(1);
    });

    it("config.set('arr', ['a', 'b', 'c'])", function () {
      mw.sdk.config.set('arr', ['a', 'b', 'c']);
      expect(mw.sdk.config.get('arr')[0]).equals('a');
      expect(mw.sdk.config.get('arr')[1]).equals('b');
      expect(mw.sdk.config.get('arr')[2]).equals('c');
    });

    it("config.set('arr', {'a':1, 'b':2, 'c':3})", function () {
      mw.sdk.config.set('arr', {'a':1, 'b':2, 'c':3});
      expect(mw.sdk.config.get('arr').a).equals(1);
      expect(mw.sdk.config.get('arr').b).equals(2);
      expect(mw.sdk.config.get('arr').c).equals(3);
    });

    it("config('a', 123)", function () {
      mw.sdk.config('a', 123);
      expect(mw.sdk.config.get('a')).equals(123);
    });

  });

});
