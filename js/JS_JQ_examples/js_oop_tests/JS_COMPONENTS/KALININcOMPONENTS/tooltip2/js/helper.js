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
		cursorLeft,
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
		
		isShow = true;
	}
	
	self.deleteTooltip = function(){
		$('.tooltip').remove();
		
		isShow = false;
	}
	
	self.calculate = function(pageX, pageY){
		var scrollY = $(window).scrollTop();
		var winBottom = scrollY + $(window).height();

		var scrollX = $(window).scrollLeft();
		var winRight  = scrollX + $(window).width();

		var newLeft = pageX + offset;
		var newTop = pageY + offset;
		
		if (newLeft + bodyTooltip.outerWidth() > winRight) { // если за правой границей окна
		  newLeft -= bodyTooltip.outerWidth();
		  newLeft -= offset + 2; // немного левее, чтобы курсор был не над подсказкой
		}

		if (newTop + bodyTooltip.outerHeight() > winBottom) { // если за нижней границей окна
		  newTop -= bodyTooltip.outerHeight();
		  newTop -= offset + 2;  // немного выше
		}	

		bodyTooltip.css({
			left: newLeft,
			top: newTop
		});		
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onOver = function(e){		
		//if(!isShow){
			self.createTooltip();
			
			self.appendTooltip();
			
			self.calculate(e.pageX, e.pageY);
		//}
	}	
	
	self.onLeave = function(){		
		if(isShow){
			self.deleteTooltip();
		}
	}	

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('mousemove', self.onOver);
	
	elem.on('mouseout', self.onLeave);
}	


