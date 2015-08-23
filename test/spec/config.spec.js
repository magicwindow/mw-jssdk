describe('common.js.', function(){

  var _clock;

  /*
   * isObject
   */
  describe('config', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("config.set('a', 123456)", function () {
      mw.config.set('a', 123456)
      expect(mw.config.get('a')).equals(123456);
    });

    it("config.set('xx', 1, true)", function () {
      mw.config.set('xx', 1, true);
      mw.config.set('xx', 2);
      expect(mw.config.get('xx')).equals(1);
    });

    it("config.set('arr', ['a', 'b', 'c'])", function () {
      mw.config.set('arr', ['a', 'b', 'c']);
      expect(mw.config.get('arr')[0]).equals('a');
      expect(mw.config.get('arr')[1]).equals('b');
      expect(mw.config.get('arr')[2]).equals('c');
    });

    it("config.set('arr', {'a':1, 'b':2, 'c':3})", function () {
      mw.config.set('arr', {'a':1, 'b':2, 'c':3});
      expect(mw.config.get('arr').a).equals(1);
      expect(mw.config.get('arr').b).equals(2);
      expect(mw.config.get('arr').c).equals(3);
    });

    it("config('a', 123)", function () {
      mw.config('a', 123);
      expect(mw.config.get('a')).equals(123);
    });

    it("constant('a', 123)", function () {
      mw.constant('constant-a', 123);
      expect(mw.constant('constant-a')).equals(123);
    });

    it("var('a', 123)", function () {
      mw.var('var-a', 98);
      expect(mw.var('var-a')).equals(98);
    });

  });

});
