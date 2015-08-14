describe('Magic Window JS SDK Unit Test.', function(){

  var _clock;

  /*
   * HELPER FUNCTIONS
   */
  function doSomething() {
    // do something
  }

  /*
   * TESTS
   */
  describe('myFunc', function(){

    beforeEach(function () {
      _clock = sinon.useFakeTimers();
    });
    afterEach(function () {
      _clock.restore();
    });

		/*
		 * TESTS
		 */
    it("should do something", function () {
      expect(mw.sdk.load()).equals(1);
		});
  });
});
