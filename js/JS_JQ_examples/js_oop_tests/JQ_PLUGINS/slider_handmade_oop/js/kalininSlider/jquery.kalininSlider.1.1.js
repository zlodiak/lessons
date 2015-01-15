/* 
INFO: 
project: kalininSlider
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин для преобразования списка в слайдер с возможностью прокрутки при помощи ползунка и стрелок-указателей
version 1.1
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininSlider IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininSlider = function(options) {					
		var options = jQuery.extend({
			position: 0,
			effectSpeed: 1000,
			slide_width: 300
		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------	
			var self = $(this);	
				
			init();	
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function init(){
				obj = new arrows(1, 2, 3);
				
				console.log('-');
				console.log(obj.a);
				console.log('-');
			}
			
			function arrows(arrowsType, arrowsLeftVisible, arrowsRightVisible){
				var	arrowsType = arrowsType,
					arrowsLeftVisible = arrowsLeftVisible,
					arrowsRightVisible = arrowsRightVisible;
					
					a = function (){
						return 'asd';
					}
				
			}
			
			function indikator(indikatorType, indikatorVisible){
				var	indikatorType,
					indikatorVisible;
						
			}
			
			function tape(slideOffset, slideWidth, slideEffect, slideEffectSpeed){
				var	slideOffset,
					slideWidth,
					slideEffect,
					slideEffectSpeed;
				
			}
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			function onClickControls(){

			}
			
			function onClickIndikator(){

			}
			
			// ------------------------------------------------------------------------------------------ events -------------	
			$('#prev, #next').on('click', onClickControls);	
			
			$('.indikator_element').on('click', onClickIndikator);			
			
		});
	};
})(jQuery);