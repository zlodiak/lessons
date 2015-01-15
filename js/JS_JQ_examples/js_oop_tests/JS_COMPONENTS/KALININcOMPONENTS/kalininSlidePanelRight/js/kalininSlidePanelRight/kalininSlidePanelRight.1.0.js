/* 
INFO: 
project: kalininSlidePanelRight
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 08/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин выдвигающейся справа панели. нехуй делать универсальную, перу значений поменять можно при надобности
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininSlidePanelRight IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininSlidePanelRight = function(options) {					
		var options = jQuery.extend({
			'top':  '300'
		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------	
			var self = $(this);	
			
			var	widthPanel = self.outerWidth(),
				heightPanel = self.outerHeight();
				
			init();	
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function init(){
				self.css({
					'top': options.top + 'px',
					'right': -widthPanel + 'px'
				});
				
				$('#handle').remove();
				
				$('<div id="handle" class="handle" />').appendTo('#slidePanel').css({
					'height': heightPanel - 2 + 'px'
				});
			}	
			
			function slideAction(slidePanel, offset){
				$('#slidePanel').stop(true, true).animate({
					right: offset + 'px'
				}, {queue: false, duration: 1700, easing: 'easeOutBounce'});				
			}
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			function hidePanel(){
				slideAction($('#slidePanel'), -widthPanel);
			}
			
			function openPanel(slidePanel){
				slideAction(slidePanel, 0);
			}			
			
			// ------------------------------------------------------------------------------------------ events -------------	
			$('#slidePanel').on('click', function(e){
				e.stopPropagation();
			
				openPanel($(this));
			});		

			$(document).on('click', function(){
				hidePanel();
			});			
		});
	};
})(jQuery);