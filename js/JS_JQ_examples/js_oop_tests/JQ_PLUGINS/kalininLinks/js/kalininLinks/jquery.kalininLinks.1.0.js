/* 
INFO: 
project: kalininLinks
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 01/2013 (prozaik81-2@yandex.ru)
desc: Тестовый jquery-плагин. изменяет вид родных подсказок браузера, которые появляются при наведении курсора на ссылку
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininLinks IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininLinks = function(options) {					
		var options = jQuery.extend({
			bgColor: 'yellow',
			borderColor: 'magenta',
			fontSize: '14px',
			fontColor: 'green',
			paddingVertical: '5px',
			paddingHorizontal: '10px',
			offset: 10,							//смещение по вертикали
			effectShow: 'show', 				//show, fadeIn, slideDown
			effectHide: 'hide', 				//hide, fadeOut, slideUp
			effectShowSpeed: 300,				//время эффекта показа
			effectHideSpeed: 300,				//время эффекта скрытия
			rounded: true						//закруглены ли уголки
		},options);		
			
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ----------	
			var $self = $(this);
			
			var	bodyTooltip,
				isShow = false;		
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function createTooltip(){
				var html = $self.attr('data-title') ? $self.attr('data-title') : $self.html();
				
				if(!bodyTooltip){
					bodyTooltip = $('<div />',{
						class: 'tooltip',
						html: html
					});	
					
					return bodyTooltip;
				}
			}	

			function appendTooltip(){
				var	bRadius = options.rounded ? '3px' : '0';
				
				bodyTooltip.appendTo('body');
				
				bodyTooltip.css({
					'color': options.fontColor,
					'background-color': options.bgColor,
					'border-color': options.borderColor,
					'border-width': '1px',
					'border-style': 'solid',
					'padding-top': options.paddingVertical,
					'padding-bottom': options.paddingVertical,
					'padding-left': options.paddingHorizontal,
					'padding-right': options.paddingHorizontal,
					'font-color': options.fontColor,
					'border-radius': bRadius,
					'display': 'none'
				});			

				bodyTooltip[options.effectShow](options.effectShowSpeed, function(){
					isShow = true;
				});				
			}
			
			function deleteTooltip(){
				bodyTooltip[options.effectHide](options.effectHideSpeed, function(){
					isShow = false;
				});
			}
			
			function calculate(pageX, pageY){
				var newTop,
					newLeft;
				
				var scrollY = $(window).scrollTop();
				var winBottom = scrollY + $(window).height();

				var scrollX = $(window).scrollLeft();
				var winRight  = scrollX + $(window).width();

				var newLeft = pageX + options.offset;
				var newTop = pageY + options.offset;
				
				if (newLeft + bodyTooltip.outerWidth() > winRight) {
					newLeft -= bodyTooltip.outerWidth();
					newLeft -= options.offset + 2;
				}

				if (newTop + bodyTooltip.outerHeight() > winBottom) {
					newTop -= bodyTooltip.outerHeight();
					newTop -= options.offset + 2; 
				}	

				bodyTooltip.css({
					left: newLeft,
					top: newTop
				});		
			}

			function rewriteAttributes(){
				var attrTitle = $self.attr('title');
				
				$self.attr('data-title', attrTitle);
				$self.removeAttr('title');
			}		

			function restoreAttributes(){
				var attrDataTitle = $self.attr('data-title');
				
				$self.attr('title', attrDataTitle);
				$self.removeAttr('data-title');
			}				

			// ------------------------------------------------------------------------------------------ handlers -----------		
			function onOver(e){		
				if(!isShow){
					rewriteAttributes();
					
					createTooltip();
					
					appendTooltip();
					
					calculate(e.pageX, e.pageY);
				}
			}	
			
			function onLeave(){		
				if(isShow){
					deleteTooltip();
				}
				
				restoreAttributes();
			}	

			// ------------------------------------------------------------------------------------------ events -------------	
			$self.on('mousemove', onOver);
			
			$self.on('mouseout', onLeave);			
		});
	};
})(jQuery);