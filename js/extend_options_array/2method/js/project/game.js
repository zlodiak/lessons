var Game = function(options) {
  var extend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i])
        continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }

    return out;
  };

  this.options = {
    level: 1,
    fieldWidth: 20,
    fieldHeight: 20
  };

  console.log(this.options);
  console.log('-----');
  console.log(options);

  extend(this.options, options);

  console.log('-----');
  console.log(this.options)  

  this.objectsPointers = {
    f: 1,
    levelObj: 'undefined',
    playerObserverObj: 'undefined',
    targetObserverObj: 'undefined',
    enemyObserverObj: 'undefined',
    fieldObj: 'undefined',
    playerObj: 'undefined',
    targetObj: 'undefined',
    enemyObj: {}
  },

  this.options = options ? options : {}; 
      
  while (this.options.level < 10) {
    break;
    this.objectsPointers.levelObj = new Level;
  }

  console.log('you win!' + this.options.level);
};
