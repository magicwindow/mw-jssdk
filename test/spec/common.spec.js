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
      expect(mw.sdk.isObject({a:2})).equals(true);
    });

    it("isObject(Element)", function () {
      expect(mw.sdk.isObject(document.body)).equals(false);
    });

    it("isObject(Array)", function () {
      expect(mw.sdk.isObject([1,2,3,4])).equals(false);
    });

    it("isObject(Boolean)", function () {
      expect(mw.sdk.isObject(true)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(mw.sdk.isObject(2)).equals(false);
    });

    it("isObject(Number)", function () {
      expect(mw.sdk.isObject(0)).equals(false);
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
      expect(mw.sdk.isArray({a:2})).equals(false);
    });

    it("isArray(Element)", function () {
      expect(mw.sdk.isArray(document.body)).equals(false);
    });

    it("isArray(Array[...])", function () {
      expect(mw.sdk.isArray([1,2,3,4])).equals(true);
    });

    it("isArray(Array[])", function () {
      expect(mw.sdk.isArray([])).equals(true);
    });

    it("isArray(Boolean)", function () {
      expect(mw.sdk.isArray(true)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(mw.sdk.isArray(2)).equals(false);
    });

    it("isArray(Number)", function () {
      expect(mw.sdk.isArray(0)).equals(false);
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
      expect(mw.sdk.isNumeric({a:2})).equals(false);
    });

    it("isNumeric()(Element)", function () {
      expect(mw.sdk.isNumeric(document.body)).equals(false);
    });

    it("isNumeric()(Array[...])", function () {
      expect(mw.sdk.isNumeric([1,2,3,4])).equals(false);
    });

    it("isNumeric()(Array[])", function () {
      expect(mw.sdk.isNumeric([])).equals(false);
    });

    it("isNumeric()(Boolean)", function () {
      expect(mw.sdk.isNumeric(true)).equals(false);
    });

    it("isNumeric()(Number)", function () {
      expect(mw.sdk.isNumeric(2)).equals(true);
    });

    it("isNumeric()(Number)", function () {
      expect(mw.sdk.isNumeric(0)).equals(true);
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
      expect(mw.sdk.isElement({a:2})).equals(false);
    });

    it("isElement()(Element)", function () {
      expect(mw.sdk.isElement(document.body)).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(mw.sdk.isElement(document.createElement('div'))).equals(true);
    });

    it("isElement()(Element)", function () {
      expect(mw.sdk.isElement(document.createComment('Comments!'))).equals(true);
    });

    it("isElement()(Array[...])", function () {
      expect(mw.sdk.isElement([1,2,3,4])).equals(false);
    });

    it("isElement()(Array[])", function () {
      expect(mw.sdk.isElement([])).equals(false);
    });

    it("isElement()(Boolean)", function () {
      expect(mw.sdk.isElement(true)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(mw.sdk.isElement(2)).equals(false);
    });

    it("isElement()(Number)", function () {
      expect(mw.sdk.isElement(0)).equals(false);
    });
  });

});
