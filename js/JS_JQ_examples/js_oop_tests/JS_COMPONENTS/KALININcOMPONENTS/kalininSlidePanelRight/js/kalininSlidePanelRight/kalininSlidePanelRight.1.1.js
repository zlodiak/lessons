/* 
INFO: 
project: kalininSlidePanelRight
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 08/2013 (prozaik81-2@yandex.ru)
desc: виджет выдвигающейся справа панели для нескольких вкладок одновременно
version 1.1
*/

// ---------------------------------------------------------------------------------------------- PLUGIN kalininSlidePanelRight IMPLEMENTATION------------
function KalininSlidePanelRight(options){
	// ------------------------------------------------------------------------------------------ properties ---------	
	var self = $(options.element),
		top = options.top || 30;	
	
	var	widthPanel = self.outerWidth(),
		heightPanel = self.outerHeight();
		
	init();	

	// ------------------------------------------------------------------------------------------ methods ------------	
	function init(){
		self.css({
			'top': top + 'px',
			'right': -widthPanel + 'px'
		});
		
		$('<div class="handle" />').appendTo(self).css({
			'height': heightPanel - 2 + 'px'
		});
	}	
	
	function slideAction(slidePanel, offset){
		$(self).stop(true, true).animate({
			right: offset + 'px'
		}, {queue: false, duration: 1700, easing: 'easeOutBounce'});				
	}

	// ------------------------------------------------------------------------------------------ handlers -----------		
	function hidePanel(){
		slideAction($(self), -widthPanel);
	}
	
	function openPanel(slidePanel){
		slideAction(slidePanel, 0);
	}		
			
	// ------------------------------------------------------------------------------------------ events -------------	
	$(self).on('click', function(e){
		e.stopPropagation();
	
		openPanel(self);
	});		

	$(document).on('click', function(){
		hidePanel();
	});		
}