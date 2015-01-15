/*
(c)2012
*/

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
	this.health = health;	
	this.x = x;	
	this.y = y;	
	
	var	enemy;
	
	createEnemy();
	
	renderEnemy(x, y);
	
	setInterval(function(){
		x += ((Math.round(Math.random() * 2) - 1) * 10);

		if((x < 900) && (x > 0)){
			renderEnemy(x, y);
		}
	}, 300);		
	
	function createEnemy(){	
		enemy = $('<div />',{
			class: 'enemy',
			html: health
		});	
		
		enemy.appendTo('body');
	}
	
	function renderEnemy(x, y){	
		enemy.css({
			'left': x + 'px',
			'top': y + 'px'
		});	
	}
}

function Player(score, health, bullets, x ,y){		
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
	
	var coord_x,
		coord_y;
		
	coord_x = elem.offsetLeft + offset ;		
	
	if((coord_x > -10) && (coord_x < 910)){
		mediator.players.player1.x = coord_x;
		$(elem).attr('style', 'left: ' + coord_x + 'px');	
	}
}

function Bullet(x, y){	console.log(444);
	this.x = x;
	this.y = y;
	
	var	id;	
	
	var	bullet;
	
	createBullet();
	
	renderBullet(this.x, this.y);
	
	id = setInterval(function(){
		this.y -= 30;

		if((this.y < 400) && (this.y > 0)){
			renderBullet(this.x, this.y);
			
			console.log(mediator.bullets.length);
		}
		else{
			clearInterval(id);
			
			
			console.log(mediator.bullets.pop());
			console.log(mediator.bullets.length);
		}
	}, 300);	
	
	function createBullet(){	
		bullet = $('<div />',{
			class: 'bullet'
		});
	}
	
	function renderBullet(x, y){	
		bullet.appendTo('body');

		bullet.attr('style', 'left: ' + x + 'px; top: ' + y + 'px');	
	}
}

var	mediator = {
	tables: {},
	
	enemy: [],
	
	bullets: [],
	
	players: [], 
	
	init: function(){
		var	data,
			health,
			x,
			y;
			
		this.players.player1 = new Player(0, 3, 100, 450, 400);	
		
		data = {
				score: this.players.player1.score,
				health: this.players.player1.health,
				bullets: this.players.player1.bullets
			}		
	
		this.tables.table1 = new Table(data);
		
		for(var	i = 4;  i--;){
			health = 3,
			x = Math.floor(Math.random() * 900),
			y = 0;
			
			this.enemy.push(new Enemy(health, x, y));
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
		
		if (e.which === 32) { 
			x = mediator.players.player1.x;
			mediator.bullets.push(new Bullet(x + 19, 394));
			
			return; 
		}

		if (e.which === 51) { 
			console.log(mediator.bullets.length);
			
			return; 
		}  		
	} 
	
}

