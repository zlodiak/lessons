/* 
INFO: 
project: kalininHuyak
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: продолжение легендарной игры-стрелялки
version 1.1
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininHuyak IMPLEMENTATION------------
function KalininHuyak(options){
	// ------------------------------------------------------------------------------------------ properties ---------	
	var	huyakWrap = options.huyakWrap,
		widthWrap = calculateScreenSize('width'),
		heightWrap = calculateScreenSize('height'),
		starCanvas,
		playerShip;
		
	init();

	// ------------------------------------------------------------------------------------------ methods ------------	
	function init(){
		$('<canvas />').attr({
			'id': 'starCanvas',
			'width': widthWrap,
			'height': heightWrap,
			'class': 'star_canvas'
		}).appendTo(huyakWrap);
		
		starCanvas = $('#starCanvas');
		
		createStarCanvas();
		
		createrPlayerShip();
	}	
	
	function createStarCanvas(){
		var	ctx,
			starX,
			starY,
			i;
		
		if(starCanvas[0].getContext){
			ctx = starCanvas[0].getContext("2d");

			ctx.fillStyle = 'black';
			ctx.rect(0, 0, widthWrap, heightWrap);
			ctx.fill();		

			for (i = 0; i <= 350; i++){
				starX = Math.floor(Math.random() * (widthWrap- 1));
				starY = Math.floor(Math.random() * (heightWrap- 1));
				
				ctx.fillStyle = "white";

				ctx.beginPath();
				ctx.arc(starX, starY, 1, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
			}			
		}
	}

	function calculateScreenSize(dimension){
		var	width,
			height;
		
		width = $(window).width();
		
		if(width <= 900){
			width = 900;
		}
		
		height = $(window).height();
		
		if(height <= 600){
			height = 600;
		}		

		if(dimension == 'width'){
			return	width;
		}
		else if(dimension == 'height'){
			return	height;
		}
	}	
	
	function player(){
		var	health,
			weaponType,
			score,
			ammo,
			speedCoefficient = 1
			fuel = 60,
			playerCoordX,
			playerCoordY;	
		
		function renderTable(){

		}			
	}
	
	function createrPlayerShip(){
		if(!playerShip){
			playerShip = $('<div />').attr({
				'id': 'playerShip',
				'width': 72,
				'height': 128,
				'class': 'player_ship'
			}).appendTo(huyakWrap);			
		};
	}		

	// ------------------------------------------------------------------------------------------ handlers -----------		
	function onResizeWindow(){

	}
	
	// ------------------------------------------------------------------------------------------ events -------------	
		$(window).on('resize', onResizeWindow);	
}