/* 
INFO: 
project: kalininRainbowText
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин для изменения цвета каждой буквы определённого блока
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininRainbowText IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininRainbowText = function(options) {					
		var options = jQuery.extend({
			colorArray: new Array('#974bff', '#ec11a1', 'navy', 'orange', '#ecb111', 'magenta', '#055d12', '#4bb1ff')
		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------	
			var self = $(this);	
			
			var colorArrayLength  = options.colorArray.length,
				text = self.text(),
				textLength = text.length;

			init();	
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function init(){
				self.html(colorize(textLength, text));
			}
			
			function colorize(textLength, text){
				var	newText = '',
					i;
					
				console.log(textLength, text);	
				
				for(i = 0; i < textLength; i++){
					var	colorLetter;
					
					colorLetter = '<span style="color: ' + (options.colorArray[Math.floor(Math.random() * (colorArrayLength))]) + '">' + text.substr(i, 1) + '</span>';
					
					newText += colorLetter;
				}
				
				return newText;
			}		
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			
			// ------------------------------------------------------------------------------------------ events -------------			
		});
	};
})(jQuery);