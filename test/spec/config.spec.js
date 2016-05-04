import chai from 'chai';
import config from '../../src/config';
const expect = chai.expect;

describe('common.js.', function(){

  let _clock;

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

    it("config.variable('a', 123456)", function () {
      config.variable('a', 123456)
      expect(config.variable('a')).equals(123456);
    });

    it("config.constant('xx', 1, true)", function () {
      config.constant('xx', 1);
      config.variable('xx', 2);
      expect(config.variable('xx')).equals(1);
    });

    it("config.variable('arr', ['a', 'b', 'c'])", function () {
      config.variable('arr', ['a', 'b', 'c']);
      expect(config.variable('arr')[0]).equals('a');
      expect(config.variable('arr')[1]).equals('b');
      expect(config.variable('arr')[2]).equals('c');
    });

    it("config.variable('arr', {'a':1, 'b':2, 'c':3})", function () {
      config.variable('arr', {'a':1, 'b':2, 'c':3});
      expect(config.variable('arr').a).equals(1);
      expect(config.variable('arr').b).equals(2);
      expect(config.variable('arr').c).equals(3);
    });

    it("config('a', 123)", function () {
      config.variable('a', 123);
      expect(config.variable('a')).equals(123);
    });

    it("constant('a', 123)", function () {
      config.constant('constant-a', 123);
      expect(config.constant('constant-a')).equals(123);
    });

    it("var('a', 123)", function () {
      config.variable('var-a', 98);
      expect(config.variable('var-a')).equals(98);
    });

  });

});
