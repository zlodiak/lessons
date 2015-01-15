/* 
INFO: 
project: kalininSlider
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин для преобразования списка в слайдер с возможностью прокрутки при помощи ползунка и стрелок-указателей
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininSlider IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininSlider = function(options) {					
		var options = jQuery.extend({
			position: 0,
			slide_width: '300',	//px
			effect: 'slide',	//'slide', 'fade', 'angle'
			effectSpeed: 1000,
			animationSpeed: 1000,
			timer: 2000,
			arrows: true,
			indikator: 'buttons'	//'buttons', 'numeric'
			// autoSlide: true		
		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------	
			var self = $(this);	
			
			var	slider_wrap_outer = $('#slider_wrap_outer'),
				slider_wrap = $('#slider_wrap'),
				slides_wrap = $('#slides_wrap'),
				slide_elem = slides_wrap.find('li'),
				slides_quantity = slide_elem.length,
				autoSlide = 0;	
				
			init();	
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function init(){
				slides_wrap.css('width', (slides_quantity * options.slide_width) + 'px');
				slider_wrap.css({
					width: options.slide_width + 'px',
					margin: '0 auto'
				});
				
				slider_wrap_outer.append('<div class="prev" id="prev" />').append('<div class="next" id="next" />');	

				if((options.indikator == 'numeric') || (options.indikator == 'buttons')){
					indikatorRender();
				}	

				controlsState(options.position);
				
				slidesState(options.position);		

				setIntervalAutoSlide();
			}
			
			function controlsState(position){
				var	prev = $('#prev'),
					next = $('#next');
					
				(position == 0) ? prev.hide() : prev.show();
				(position == (slides_quantity - 1)) ? next.hide() : next.show();
			}
			
			function slidesState(position, oldPosition, key){
				var	position_max = (slides_quantity - 1),
					prev_slide,
					oldPosition = oldPosition || options.position,
					key;				
					
				key = !key ? false : key;	
					
				console.log(position);	
				
				if(position < 0){
					options.position = 0;
				}
				else if(position > position_max){
					key == true ? options.position = 0 : options.position = position_max;
				}
				
				console.log(position + '__');	
				
				$('.indikator_element').removeClass('active').eq(position).addClass('active');
				
				switch (options.effect) {
					case 'slide':
						shift(options.effectSpeed);
						
						break;
						
					case 'fade':
						dublicate(oldPosition)				
						
						shift(0, function hideEffect(){
							$('.cap').fadeOut(1000);	
						});				
						
						break;
						
					case 'angle':
						dublicate(oldPosition)
						
						shift(0, function hideEffect(){
							$('.cap').hide(1000);	
						});				
						
						break;						
						
					default:
						alert('Эффект смены слайдов не выбран');
						
						break;
				}	

				function dublicate(oldPosition){
					prev_slide = slide_elem.eq(oldPosition).clone().addClass('cap').appendTo('#slider').css({
						'position': 'absolute',
						'top': 0,
						'left': '60px',
						'z-index': 100
					});	
				}				

				function shift(effectSpeed, hideEffect){
					var	hideEffect,
						effectSpeed;
					
					!effectSpeed ? 0 : effectSpeed;
					
					!hideEffect ? false : hideEffect;
					
					slides_wrap.stop(true, true).animate({
						marginLeft: -position * options.slide_width
					}, 100, hideEffect);			
				}		
			}
			
			function removeTrash(){
				$('.cap:hidden').remove();
			}
			
			function indikatorRender(){
				var	i,
					num;
				
				slider_wrap.append('<ul id="indikator" class="indikator" />');
				
				for(i = 1; i <= slides_quantity; i++){
					(options.indikator == 'numeric') ? num = i : num = '';
					
					$('#indikator').append('<li class="indikator_element" id="indikatorElement_' + i + '" data-number="' + i + '">' + num + '</li>');
				}
			}
			
			function setIntervalAutoSlide(){
				if(options.autoSlide){
					autoSlide = window.setInterval(	function(){
														var	oldPosition = options.position;
														
														options.position++
														
														if(options.position > slides_quantity){
															options.position = 0;
														}
														
														slidesState(options.position, oldPosition, true); 
														
														controlsState(options.position);
														
														removeTrash();															
													}, options.timer);
				}				
			}
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			function onClickControls(){
				var	oldPosition = options.position;
				
				($(this).attr('id') == 'prev') ? options.position-- : options.position++;
				
				slidesState(options.position, oldPosition);
				
				controlsState(options.position);
				
				removeTrash();
			}
			
			function onClickIndikator(){
				var	oldPosition = options.position,
					indikNum = $(this).attr('data-number') - 1;
				
				options.position = indikNum;
				
				slidesState(indikNum, oldPosition);
				
				controlsState(options.position);
				
				removeTrash();
			}
			
			// ------------------------------------------------------------------------------------------ events -------------	
			$('#prev, #next').on('click', onClickControls);	
			
			$('.indikator_element').on('click', onClickIndikator);			
		});
	};
})(jQuery);