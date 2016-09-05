var Game = function(options) {
  this.options = {
    level: 1,
    fieldWidth: 20,
    fieldHeight: 20
  };

  console.log(this.options);
  console.log('-----');
  console.log(options);

  $.extend(this.options, options);

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
