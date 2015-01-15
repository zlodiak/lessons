// ---------------------------------------------------------------------------------------------- WIDJET croppable IMPLEMENTATION------------
function Croppable(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var elem = options.elem;
	
	var	x1Crop,
		y1Crop,
		x2Crop,
		y2Crop,
		xOffset,		
		yOffset,
		square,
		dims;
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	self.coordBegin = function(x1, y1){
		square = $('<div class="square" />').appendTo('body');	
	
		x1Crop = x1;
		y1Crop = y1;
		
		xOffset = elem.offset().left;
		yOffset = elem.offset().top;
		
		console.log(x1Crop);
		console.log(y1Crop);
	}
	
	self.coordEnd = function(x2, y2){
		x2Crop = x2;
		y2Crop = y2;
		
		console.log(x2Crop);
		console.log(y2Crop);
	}
	
	self.listenerStart = function(){
		elem.on('mousemove', onMouseMove);
		
		elem.on('mouseup', onMouseUp);
	}
	
	self.render = function(pageX, pageY){
		square.css(dims);
	}
	
	self.eraser = function(){
		console.log(66666666);
		
		$(document).off();
		
		square.remove();
	}
	
	self.calculateSquare = function(pageX, pageY){	
		//вычисление размеров квадрата
		var left = Math.min(x1Crop, pageX);
		var right = Math.max(x1Crop, pageX);
		var top = Math.min(y1Crop, pageY);
		var bottom = Math.max(y1Crop, pageY);	
		
		//ограничение размеров квадрата
		var coords = elem.offset();

		left = Math.max(left, coords.left);
		top = Math.max(top, coords.top);
		right = Math.min(right, coords.left + elem.outerWidth());
		bottom = Math.min(bottom, coords.top + elem.outerHeight());		

		return { left: left, top: top, width: right-left, height: bottom-top };
	}	
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onMouseDown = function(e){	
		var x1 = e.pageX,
			y1 = e.pageY
			
		self.coordBegin(x1, y1);
		self.listenerStart();
	}	
	
	function onMouseMove(e){	
		var pageX = e.pageX,
			pageY = e.pageY;
			
		dims = self.calculateSquare(pageX, pageY);
		
		self.render(pageX, pageY);
	}

	function onMouseUp(e){
		var x2 = e.pageX,
			y2 = e.pageY;
				
			console.log(444444444);
		self.coordEnd(x2, y2);
		console.log(55555555);
		self.eraser();
	}

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('mousedown.croppable', self.onMouseDown);
	
	elem.on('selectstart dragstart', false);
}	


