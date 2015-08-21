describe('common.js.', function(){

  var _clock;

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
      expect(mw.isObject({a:2})).equals(true);
    });

    it("isObject(Element)", function () {
      expect(mw.isObject(document.body)).equals(false);
    });

    it("isObject(Array)", function () {
      expect(mw.isObject([1,2,3,4])).equals(false);
    });

    it("isObject(Boolean)", function () {
      expect(mw.isObject(true)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(mw.isObject(2)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(mw.isObject(0)).equals(false);
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
      expect(mw.isArray({a:2})).equals(false);
    });

    it("isArray(Element)", function () {
      expect(mw.isArray(document.body)).equals(false);
    });

    it("isArray(Array[...])", function () {
      expect(mw.isArray([1,2,3,4])).equals(true);
    });

    it("isArray(Array[])", function () {
      expect(mw.isArray([])).equals(true);
    });

    it("isArray(Boolean)", function () {
      expect(mw.isArray(true)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(mw.isArray(2)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(mw.isArray(0)).equals(false);
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
      expect(mw.isNumeric({a:2})).equals(false);
    });

    it("isNumeric()(Element)", function () {
      expect(mw.isNumeric(document.body)).equals(false);
    });

    it("isNumeric()(Array[...])", function () {
      expect(mw.isNumeric([1,2,3,4])).equals(false);
    });

    it("isNumeric()(Array[])", function () {
      expect(mw.isNumeric([])).equals(false);
    });

    it("isNumeric()(Boolean)", function () {
      expect(mw.isNumeric(true)).equals(false);
    });

    it("isNumeric()(Number)", function () {
      expect(mw.isNumeric(2)).equals(true);
    });

    it("isNumeric()(Number)", function () {
      expect(mw.isNumeric(0)).equals(true);
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
      expect(mw.isElement({a:2})).equals(false);
    });

    it("isElement()(Element)", function () {
      expect(mw.isElement(document.body)).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(mw.isElement(document.createElement('div'))).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(mw.isElement(document.createComment('Comments!'))).equals(true);
    });

    it("isElement()(Array[...])", function () {
      expect(mw.isElement([1,2,3,4])).equals(false);
    });

    it("isElement()(Array[])", function () {
      expect(mw.isElement([])).equals(false);
    });

    it("isElement()(Boolean)", function () {
      expect(mw.isElement(true)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(mw.isElement(2)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(mw.isElement(0)).equals(false);
    });
  });

  /*
   * extend
   */
  describe('extend', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

    it("extend({a:1,b:2}, {x:3,b:4})", function () {
      var a = {a:1, b:2};
      var b = {x:3, b:4};
      mw.extend(a, b);

      expect(a.x).equals(3);
      expect(a.b).equals(4);
      expect(b.b).equals(4);
      expect(b.x).equals(3);
    });

    it("extend(true, {m:{x:1,y:2}}, {m:{x:9}})", function () {
      var a = {m:{x:1,y:2}};
      var b = {m:{x:9}};
      mw.extend(true, a, b);

      expect(a.m.x).equals(9);
      expect(a.m.y).equals(2);
      expect(b.m.x).equals(9);
    });

  });

});
