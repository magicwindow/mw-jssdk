import chai from 'chai';
import Common from '../../src/common';

const expect = chai.expect;

describe('common.js.', function(){

  let _clock;

  /*
   * HELPER FUNCTIONS
   */
  function doSomething() {
    // do something
  }

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

    it("isObject(Object)", function () {
      expect(Common.isObject({a:2})).equals(true);
    });

    it("isObject(Element)", function () {
      expect(Common.isObject(document.body)).equals(false);
    });

    it("isObject(Array)", function () {
      expect(Common.isObject([1,2,3,4])).equals(false);
    });

    it("isObject(Boolean)", function () {
      expect(Common.isObject(true)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(Common.isObject(2)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(Common.isObject(0)).equals(false);
    });
  });

  /*
   * isArray
   */
  describe('isArray', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("isArray(Object)", function () {
      expect(Common.isArray({a:2})).equals(false);
    });

    it("isArray(Element)", function () {
      expect(Common.isArray(document.body)).equals(false);
    });

    it("isArray(Array[...])", function () {
      expect(Common.isArray([1,2,3,4])).equals(true);
    });

    it("isArray(Array[])", function () {
      expect(Common.isArray([])).equals(true);
    });

    it("isArray(Boolean)", function () {
      expect(Common.isArray(true)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(Common.isArray(2)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(Common.isArray(0)).equals(false);
    });
  });

  /*
   * isNumeric
   */
  describe('isNumeric', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("isNumeric()(Object)", function () {
      expect(Common.isNumeric({a:2})).equals(false);
    });

    it("isNumeric()(Element)", function () {
      expect(Common.isNumeric(document.body)).equals(false);
    });

    it("isNumeric()(Array[...])", function () {
      expect(Common.isNumeric([1,2,3,4])).equals(false);
    });

    it("isNumeric()(Array[])", function () {
      expect(Common.isNumeric([])).equals(false);
    });

    it("isNumeric()(Boolean)", function () {
      expect(Common.isNumeric(true)).equals(false);
    });

    it("isNumeric()(Number)", function () {
      expect(Common.isNumeric(2)).equals(true);
    });

    it("isNumeric()(Number)", function () {
      expect(Common.isNumeric(0)).equals(true);
    });
  });


  /*
   * isElement
   */
  describe('isElement', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("isElement()(Object)", function () {
      expect(Common.isElement({a:2})).equals(false);
    });

    it("isElement()(Element)", function () {
      expect(Common.isElement(document.body)).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(Common.isElement(document.createElement('div'))).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(Common.isElement(document.createComment('Comments!'))).equals(true);
    });

    it("isElement()(Array[...])", function () {
      expect(Common.isElement([1,2,3,4])).equals(false);
    });

    it("isElement()(Array[])", function () {
      expect(Common.isElement([])).equals(false);
    });

    it("isElement()(Boolean)", function () {
      expect(Common.isElement(true)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(Common.isElement(2)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(Common.isElement(0)).equals(false);
    });
  });

  /*
   * extend
   */
  describe('mix', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("mix({a:1,b:2}, {x:3,b:4})", function () {
      var a = {a:1, b:2};
      var b = {x:3, b:4};
      Common.mix(a, b);

      expect(a.x).equals(3);
      expect(a.b).equals(4);
      expect(b.b).equals(4);
      expect(b.x).equals(3);
    });

    it("mix(true, {m:{x:1,y:2}}, {m:{x:9}})", function () {
      var a = {x:1,y:2};
      var b = {x:9};
      Common.mix(a, b);

      expect(a.x).equals(9);
      expect(a.y).equals(2);
      expect(b.x).equals(9);
    });

  });

});
