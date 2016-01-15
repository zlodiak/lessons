describe("pow", function() {

  describe("возводит x в степень n", function() {

    function makeTest(x) {
      var expected = x * x * x;
      it("при возведении " + x + " в степень 3 результат: " + expected, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (var x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });
});


describe("helper", function() {
  var helper = new Helper,
      random;

  describe("randomIntFromZero testing", function() {
    beforeEach(function() { 
      random = helper.randomIntFromZero(10);
    });  

    it(" слуяайное число не больше max", function() {
      assert.isTrue(random < 10) ;
    });

    it(" слуяайное число не отрицательное ", function() {
      assert.isTrue(random >= 0) ;
    });

    it(" слуяайное число не больше max", function() {
      assert.isFalse(random >= 10) ;
    });  
  });

  describe("randomIntFromInterval testing", function() {
    beforeEach(function() { 
      random = helper.randomIntFromInterval(1, 10);
    });  

    console.log(random);

    it("слуяайное число не больше max", function() {
      assert.isTrue(random < 10) ;
    });

    it(" слуяайное число не меньше min ", function() {
      assert.isTrue(random >= 1) ;
    });


  });  
});