// ---------------------------------------------------------------------------------------------- WIDJET SlideMenu IMPLEMENTATION------------
function SlideMenu(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var elem = options.elem,
		duration = options.duration
		menu = $('.menu')
		punktMenu = menu.find('li');
		
	
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	self.slideD = function(){
		elem.find('ul').stop(true).slideDown(duration);
	}
	
	self.slideU = function(){
		elem.find('ul').stop(true).slideUp(duration);
	}
	
	self.output = function(){
		alert(555);
		//$("#selected").html(e.value);
	}
	
	self.click = function(target){
		value = $(target).find('a').attr('href');
		
		console.log(3);
		console.log(target);
	
		elem.trigger({
		  type: 'test',
		  value: value
		});	
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onMouseEnter = function(){
		self.slideD();
	}
	
	self.onMouseOut = function(){
		self.slideU();
	}
	
	self.onSelect = function(){
		self.output();
	}
	
	self.onClick = function(e){
		console.log(1);
		self.click(e.target);
		console.log(2);
	}

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.hover(self.onMouseEnter, self.onMouseOut);
	
	$('#sweeties').on('click', 'li', self.onClick);


}	


