// ------------------------------------------------------------------------------------ factory
function ObjMaker(){};

ObjMaker.Star = function(id){ 
	var	self = this;
	
	self.size; 
	self.offsetY;
	self.id = id; 
	self.x = helper.random(50, 950);	
	self.y = helper.random(50, 550);	

	self.move = function(){
		var	newY = self.y + self.offsetY,
			newX;
		
		newX = self.x;
		
		if(newY >= 595){
			newY = 5;
			
			newX = helper.random(50, 950);
			
			self.x = newX;
		}	
		
		self.y = newY;
		
		self.render(newX, newY);
		
		return;
	};		
	
	self.render = function(x, y){		
		$('#star_' + self.id).css({
			'left': (self.x = x || self.x) + 'px',
			'top': (self.y = y || self.y) + 'px'
		}).appendTo('#wrap');	
		
		return;
	};

	self.init = function(){
		$('<div class="star" id="star_' + self.id + '"  />').css({
			'width': self.size + 'px',
			'height': self.size + 'px'
		}).appendTo('#wrap');
		
		self.render(self.x, self.y);
		
		return;
	};	
}; 

ObjMaker.ShipEnemy = function(id){ 
	var	self = this;
	
	self.health = 100; 
	self.speed = helper.random(5, 10); 
	self.id = id;	
	self.x = helper.random(50, 950);	
	self.y = helper.random(50, 350);	
	
	self.move = function(){
		var	offsetX = helper.random(-2, 2) * self.speed,
			offsetY = helper.random(-1, 1) * self.speed,
			newX = self.x + offsetX,
			newY = self.y + offsetY;
			
		if(newX >= 950){
			newX = 950;
		}
		else if(newX <= 50){
			newX = 50;
		}
		
		if(newY >= 550){
			newY = 550;
		}
		else if(newY <= 50){
			newY = 50;
		}		
		
		self.x = newX;
		self.y = newY;
		
		self.render(newX, newY);
		
		/* damage */
		$('#player').each(function(){
			var	x1Player = parseInt(this.style.left),
				x2Player = x1Player + 70,
				y1Player = parseInt(this.style.top),
				y2Player = y1Player + 87,
				idPlayer = this.id,
				objPlayer = player;
				
			if((self.x >= (x1Player - 42)) && (self.x <= x2Player) && ((self.y + 69) >= y1Player) && ((self.y -87) <= y2Player)){	
				$(this).animate({opacity:0}, 1000, function(){
					helper.deleteElement('player');
					
					player = new Player;

					player.changeProps({
						health: -player.health
					});		

					alert('Game over! Противник предпринял абордаж P-)');	
				});	
			}			
		});	
		
		return;
	};	
	
	self.render = function(x, y){			
		$('#shipEnemy_' + self.id).css({
			'left': (self.x = x || self.x) + 'px',
			'top': (self.y = y || self.y) + 'px'
		}).appendTo('#wrap').data('instance', self);	
		
		return;
	};

	self.init = function(){
		$('<div class="ship_enemy" id="shipEnemy_' + self.id + '" ><span class="health_mark active">' + self.health + '</span></div>').appendTo('#wrap');
		
		self.render(self.x, self.y);
		
		return;
	};			
	
	self.changeProps =function(props){
		$('#shipEnemy_' + self.id + ' .health_mark').text(self.health += props.health || 0);		
		
		return;
	};
	
	return{
		move: self.move,
		init: self.init,
		changeProps: self.changeProps
	};
}; 

ObjMaker.Bullet = function(bulletId){ 
	var	self = this;
	
	self.id = bulletId; 
	self.x = 100;	
	self.y = 500;	
	
	self.render = function(x, y){		
		$('#' + self.id).css({
			'left': (self.x = x || self.x) + 'px',
			'top': (self.y = y || self.y) + 'px'
		}).appendTo('#wrap');	
		
		return;
	};	

	self.move = function(){		
		var	offsetY = -10,
			newY = self.y + offsetY;
		
		if(newY <= 5){
            observerable.removeListener(self, "makeMoveBullet", "move"); 
			
			helper.deleteElement(self.id);
			
			delete self.x;
			delete self.y;
			
			helper.deleteProps(self);
			
			return;
		}	
		
		self.y = newY;
		
		self.render(self.x, newY);		
		
		/* collision */
		$('.ship_enemy').each(function(){
			var	x1Enemy = parseInt(this.style.left) - 5,
				x2Enemy = x1Enemy + 52,
				y1Enemy = parseInt(this.style.top),
				y2Enemy = y1Enemy + 69,
				objEnemy = $(this).data('instance');
				
			if((self.x >= x1Enemy) && (self.x <= x2Enemy) && (self.y >= y1Enemy) && (self.y <= y2Enemy)){
				self.y = 0;
				
				helper.deleteElement(self.id);	
									
				if(objEnemy.health <= 0){					
					$(this).animate({height:0, opacity:0}, 1000, function(){
						helper.deleteElement(this.id);
						
						player = new Player;

						player.changeProps({
							score: 100
						});					
					});	
				}
				else{
					objEnemy.changeProps({
						health: -10
					});	

					player = new Player;

					player.changeProps({
						score: 10
					});						
				};
				
				if(player.score >= player.prize){
					informer = new Informer;
					
					informer.render('За набранные очки получите дополнительные патроны', 3000);
					
					player.changeProps({
						'bullets': prizeValues.dataMassive(prizeValues.index()).value
					});					
					
					player.prize = prizeValues.next();
				};				
			}			
		});

		return;
	};		

	self.init = function(playerX, playerY){
		console.log(self.id);
		$('<div class="bullet" id="' + self.id + '"  />').appendTo('#wrap');
		
		self.x = playerX + 31;
		self.y = playerY - 9;
		
		self.render(self.x, self.y);
		
		return;
	};
}; 

ObjMaker.factory = function(type, id, args){ 
	var newObj;
		
	if (typeof ObjMaker[type] !== "function"){ 
		throw { 
			name: "Error", 
			message: type + " doesn't exist" 
		}; 
	} 

	if (typeof ObjMaker[type].prototype.drive !== "function") { 
		ObjMaker[type]. prototype = new ObjMaker(); 
	} 
	
	if(type == 'Star'){
		newObj = new ObjMaker[type](id); 
		
		newObj.x = helper.random(5, 995);
		newObj.y = helper.random(5, 595);
		newObj.size = helper.random(1, 5);
		newObj.size = helper.random(1, 5);
		newObj.offsetY = helper.random(1, 3);
		
		newObj.init();
	}
	else if(type == 'ShipEnemy'){
		newObj = new ObjMaker[type](id); 
		
		newObj.init();
	}
	else if(type == 'Bullet'){
		newObj = new ObjMaker[type](id); 
		
		newObj.init(args.playerX, args.playerY);
	}	
	
	return newObj; 
}; 

// ------------------------------------------------------------------------------------ observer
var observerable = {
	listeners: {},
	
	addListener: function (object, evt, callback) {       
		if (!this.listeners.hasOwnProperty(evt)) {           
			this.listeners[evt] = [];    
		}        
		
		this.listeners[evt].push(object[callback]);       
	},
	
	removeListener: function (object, evt, callback) {       
		if (this.listeners.hasOwnProperty(evt)) {      
			var i, length;     
			        
			for (i = 0, length = this.listeners[evt].length; i < length; i += 1) {               
				if (this.listeners[evt][i] === object[callback]) {                   
					this.listeners[evt].splice(i, 1);        
				}      
			}    
		}  
	},
	    
	publisher: function (evt, args) {       
		if (this.listeners.hasOwnProperty(evt)){                       
			var i, length;       
			                          
			for (i = 0, length = this.listeners[evt].length; i < length; i += 1){                
				this.listeners[evt][i](args);      
			}            
		}                            
	}
}; 


// ------------------------------------------------------------------------------------ singletone
var Player = function(id, x, y){
	if (Player.prototype._singletonInstance){
		return Player.prototype._singletonInstance;
	};
	
	Player.prototype._singletonInstance = this;
	
	var	self = this;

	self.playerId = id;
	self.x = x; 
	self.y = y;
	self.speed = 10;
	self.score = 0;
	self.health = 100;
	self.bullets = 50;
	self.prize = prizeValues.next();
	
	self.move = function(x, y){
		self.x = x;
		self.y = y;
		
		self.render(x, y);	

		return;		
	};

	self.render = function render(x,y){
		$('#' + self.playerId).css({
			'left': (self.x = x || self.x) + 'px',
			'top':  (self.y = y || self.y) + 'px'
		});
		
		return;
	};
	
	self.init = function(){
		if($('#' + self.playerId).length == 0){
			$('<div class="ship_player" id="' + self.playerId + '" />').appendTo('#wrap');
		}	

		self.render();
		
		self.changeProps({});
		
		return;			
	};
	
	self.changeProps = function changeProps(props){
		$('.score').text(self.score += props.score || 0);
		
		$('.bullets').text(self.bullets += props.bullets || 0);
		
		$('.health').text(self.health += props.health || 0);
		
		$('.speed').text(self.speed += props.speed || 0);
		
		return;
	};	
};

var Informer = function(id){
	if (Informer.prototype._singletonInstance){
		return Informer.prototype._singletonInstance;
	};
	
	Informer.prototype._singletonInstance = this;
	
	self = this;

	self.timeExposition = 3000;
	self.informerId = id;
	
	self.render = function(message, timeExposition){
		var	informElem = $('.informer span');
		informElem.text(message).show('slow');
	
		setTimeout(function(){
			informElem.hide('slow', function(){
				$(self).empty()
			});
		}, timeExposition || self.timeExposition);
		
		return;		
	};
	
	self.init = function(){
		if($('#' + self.informerId).length == 0){
			$('<div class="' + self.informerId + '" id="' + self.informerId + '"><span></span></div>').appendTo('body');
		}	

		self.render();
		
		return;			
	};
};

// ------------------------------------------------------------------------------------ iterator
var prizeValues = (function(){ 
	var	index = 0, 
		data = [{
					score: 100,
					value: 50
				},	
				{
					score: 200,
					value: 50
				},	
				{
					score: 250,
					value: 100
				},
				{
					score: 350,
					value: 30
				},
				{
					score: 450,
					value: 50
				},	
				{
					score: 600,
					value: 100
				},
				{
					score: 650,
					value: 30
				},
				{
					score: 800,
					value: 50
				},	
				{
					score: 900,
					value: 100
				},
				{
					score: 1000,
					value: 30
				},
				{
					score: 1100,
					value: 50
				},	
				{
					score: 1250,
					value: 100
				},
				{
					score: 1350,
					value: 30
				},
				{
					score: 1500,
					value: 50
				},	
				{
					score: 1650,
					value: 100
				},
				{
					score: 1750,
					value: 30
				}], 
		length = data.length; 

	return{ 
		next: function(){ 
			var element; 
			
			if(!this.hasNext()){ 
				return null; 
			} 
			
			element = data[index]; 
			
			index = index + 1; 
			
			return element.score; 
		},
		
		hasNext: function(){ 
			return index < length; 
		},
		
		rewind: function(){ 
			index = 0; 
		},

		index: function(){ 
			return index; 
		},
		
		dataMassive: function(index){
			return data[index];
		}
	}; 
}()); 


// ------------------------------------------------------------------------------------ helper
function Helper(){
	this.random = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	this.deleteElement = function(id){
		$('#' + id).remove();
		
		return;
	};	
	
	this.deleteProps = function(obj){
		// for (var key in obj){
			// delete obj[key];
		// }
	
		delete obj;	
		
			console.log(observerable.listeners);
	};	
};

// ------------------------------------------------------------------------------------ init
var	helper;

(function (){	
	/* helper initialization */
	helper = new Helper();
	
	/* stars initialization */
	var	i,
		bulletId = 0;
	
	for(i = 0; i <= 50; i++){
		var stars = ObjMaker.factory('Star', i); 	
		
		observerable.addListener(stars, "makeMoveStar", "move");	
	}
	
	/* enemies initialization */
	for(i = 0; i <= 5; i++){
		var shipsEnemy = ObjMaker.factory('ShipEnemy', i); 
		
		observerable.addListener(shipsEnemy, "makeMoveEnemy", "move");										
	}	
	
	/* player initialization */
	var player = new Player('player', 500, 500);
	
	player.init();

	/* informer initialization */
	var informer = new Informer('informer');
	
	informer.init();	
	
	/* control initialization */
	$(document).on('keydown', function(e){		
		var	newX,
			bullet;
		
		if(e.which == 49){	
			newX = player.x - (1 * player.speed);
			
			if(newX <= 0){
				newX = player.x;
			};
			
			player.move(newX, 500);
		}
		else if(e.which == 50){
			newX = player.x + (1 * player.speed);
			
			if(newX >= 930){
				newX = player.x;
			};
			
			player.move(newX, 500);
		}
		else if(e.which == 51){
			if(player.bullets > 0){
				bullet = ObjMaker.factory('Bullet', 'bullet_' + bulletId, {playerX: player.x, playerY: player.y}); 	
				
				observerable.addListener(bullet, "makeMoveBullet", "move");	
				
				bulletId++;
				
				player.changeProps({bullets: -1});
			}
		}	
		else if(e.which == 52){
			$('.ship_enemy .health_mark').toggleClass('active');
		}		
	});	
	
	/* move objects initialization */
	setInterval(function(){
		observerable.publisher("makeMoveEnemy");
	}, 500);
	
	setInterval(function(){
		observerable.publisher("makeMoveStar");
		
		observerable.publisher("makeMoveBullet");
	}, 100);
})();