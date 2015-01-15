// ---------------------------------------------------------------------------------------------- WIDJET Tooltip IMPLEMENTATION------------
function Tooltip(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var elem = options.elem,
		html = options.html
		offset = options.offset || 20;
		
	var isShow = false;	
	
	var	bodyTooltip,
		elemCoords,
		winLeft,
		left,
		top,
		winTop;	
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	self.createTooltip = function(){
		if(!bodyTooltip){
			bodyTooltip = $('<div />',{
				class: 'tooltip',
				html: html
			});
			
			return bodyTooltip;
		}
	}
	
	self.appendTooltip = function(){
		bodyTooltip.appendTo('body');
		
		self.calculate();
		
		isShow = true;
	}
	
	self.deleteTooltip = function(){
		$('.tooltip').remove();
		
		isShow = false;
	}
	
	self.calculate = function(){
		elemCoords = elem.offset();

		winLeft = $(window).scrollLeft();
		winTop = $(window).scrollTop();
		
		left = elemCoords.left + (elem.outerWidth() - bodyTooltip.outerWidth())/2^0;
		top = elemCoords.top - bodyTooltip.outerHeight() - offset;
		
		if (left < winLeft){
			left = winLeft;
		}	
		 
		if (top < winTop){
			top = elemCoords.top + elem.outerHeight() + offset;
		}

		bodyTooltip.css({
			left: left,
			top: top
		});		
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onOver = function(){		
		if(!isShow){
			self.createTooltip();
			
			self.appendTooltip();
		}
	}	
	
	self.onLeave = function(){		
		if(isShow){
			self.deleteTooltip();
		}
	}	

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('mouseenter', self.onOver);
	
	elem.on('mouseout', self.onLeave);
}	


