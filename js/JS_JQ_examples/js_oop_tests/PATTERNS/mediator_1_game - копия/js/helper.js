function Table(data){
	var	elem = document.getElementById('table');
	
	update(data);
	
	function update(data){
		var	i,
			output = '';	
			
		for(i in data){
			if(data.hasOwnProperty(i)){
				output += i + " : " + data[i] + "<br />";
			}
		}		
		
		elem.innerHTML = output;
	}
}

function Enemy(health, x, y){
	var	health = health,
		x,
		y;	
		
	this.health = health;	
	this.x = x;	
	this.y = y;	
	
	createEnemy();
	appendEnemy();
	
	function createEnemy(){	
		enemy = $('<div />',{
			class: 'enemy',
			html: health
		});	
	}
	
	function appendEnemy(){
		enemy.appendTo('body');
		
		enemy.css({
			'left': x,
			'top': y 
		});	
	}
}

function Player(score, health, bullets, x ,y){
	var	player,
		score,
		health,
		bullets,
		x,
		y;	
		
	this.score = score;
	this.health = health;
	this.bullets = bullets;
	this.x = x;
	this.y = y;
	
	createPlayer();
	appendPlayer();
	
	function createPlayer(){	
		player = $('<div />',{
			class: 'player',
			id: 'player'
		});	
	}
	
	function appendPlayer(){
		player.appendTo('body');

		player.attr('style', 'left: ' + x + 'px; top: ' + y + 'px');
	}
}

Player.prototype.move = function(offset){
	var elem = document.getElementById('player');
	
	var coord_x = elem.offsetLeft + offset,
		coord_y = elem.offsetTop;
	
	$(elem).attr('style', 'left: ' + coord_x + 'px; top: ' + coord_y + 'px');		
}

mediator = {
	tables: {},
	
	ememy: {},
	
	players: {}, 
	
	init: function(){
		var	data;
			
		this.players.player1 = new Player(0, 3, 100, 450, 400);	
		
		data = {
				score: this.players.player1.score,
				health: this.players.player1.health,
				bullets: this.players.player1.bullets
			}		
	
		this.tables.table1 = new Table(data);
		
		for(var	i = 3;  i--;){
			var health = 3,
				x = Math.floor(Math.random() * 900) + 'px',
				y = 0;
			
			this.ememy.enemy1 = new Enemy(health, x, y);
		}		
	},
	
	keypress: function (e) { 
		e = e || window.event;
		
		if (e.which === 49) { 
			mediator.players.player1.move(-10); 
			
			return; 
		} 
		
		if (e.which === 50) { 
			mediator.players.player1.move(10); 
			
			return; 
		} 
	} 
	
}

