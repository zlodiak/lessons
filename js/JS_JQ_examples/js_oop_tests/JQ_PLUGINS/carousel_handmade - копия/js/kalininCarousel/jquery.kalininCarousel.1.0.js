/* 
INFO: 
project: kalininCarousel
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин для преобразования списка в карусель с возможностью прокрутки при помощи стрелок-указателей
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininCarousel IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininCarousel = function(options) {					
		var options = jQuery.extend({
			offsetElements: 0,
			autoScroll: false,
			effectSpeed: 1000,
			autoScrollSpeed: 4000,
			arrowsType: 'visible',	
			rotateBy: 1
		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------		
			var	carousel_wrap = $('#carousel_wrap'),
				carousel = $('#carousel'),
				wrapperElements = $('#carousel > ul'),
				carouselElements = $('#carousel > ul > li'),
				carouselElementsWidth = carouselElements.width() + parseInt(carouselElements.css('margin-left'), 10) + parseInt(carouselElements.css('margin-right'), 10);
				carouselLength = carouselElements.length,
				carouselHeight = carousel_wrap.height(),
				running = false,
				autoScroll = 0;
				
			init();	

			// ------------------------------------------------------------------------------------------ methods ------------		
			function init(){
				wrapperElements.width(carouselElementsWidth * carouselLength * 2);
				
				if(options.arrowsType != 'hidden'){
					carousel_wrap.append('<div class="prev" id="prev">').append('<div class="next" id="next">');
					
					if(options.arrowsType == 'auto'){
						$('#prev, #next').css('display', 'none');
					}	
				}
				
				setIntervalAutoScroll();
			}
			
			function shift(direction){
				var	offset;
				
				if(!running){
					running = true;
					
					if(options.autoScroll){
						window.clearInterval(autoScroll);
					}					
					
					if(direction == -1){
						offset = (carouselElementsWidth * options.rotateBy * direction);
						
						wrapperElements.children(':last').after($('#carousel > ul').children().slice(0, options.rotateBy).clone());	

						shiftAction();
					}
					else{
						offset = 0;
						
						wrapperElements.children(':first').before($('#carousel > ul').children().slice(carouselLength - options.rotateBy, carouselLength).clone());
						
						wrapperElements.css('left', (-1 * options.rotateBy * carouselElementsWidth));
						
						shiftAction();
					}			
				}
				
				function shiftAction(){							
					wrapperElements.animate({
						'left': offset					
					}, options.effectSpeed, 	function(){
													if(direction == -1){
														wrapperElements.children().slice(0, options.rotateBy).remove();
														
														wrapperElements.css('left', 0);
													}
													else{
														wrapperElements.children().slice(carouselLength, carouselLength + options.rotateBy).remove();
													}
													
													setIntervalAutoScroll();

													running = false;
												});											
				}		
			}
			
			function setIntervalAutoScroll(){
				if(options.autoScroll){
					autoScroll = window.setInterval(	function(){
															shift(-1); 
														}, options.autoScrollSpeed);
				}					
			}		

			function showControls(){
				$('#prev, #next').stop(true, true).fadeIn('slow');
			}	

			function hideControls(){
				$('#prev, #next').stop(true, true).fadeOut('slow');
			}				
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			function onClickControls(){
				$(this).attr('id') == 'prev' ? shift(-1) : shift(1);
			}
			
			function onHoverWrap(){
				if(options.arrowsType == 'auto'){
					showControls();
				}
			}		

			function onLeaveWrap(){
				if(options.arrowsType == 'auto'){
					hideControls();
				}			
			}	
			
			// ------------------------------------------------------------------------------------------ events -------------	
			$('#prev, #next').on('click', onClickControls);		
			
			$('#carousel_wrap').on('mouseover', onHoverWrap).on('mouseleave', onLeaveWrap);		
		});
	};
})(jQuery);