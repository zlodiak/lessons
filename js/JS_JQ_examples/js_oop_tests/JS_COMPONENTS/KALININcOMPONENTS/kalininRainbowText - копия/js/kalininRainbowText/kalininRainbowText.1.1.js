/* 
INFO: 
project: kalininRainbowText
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: графический компонент для изменения цвета каждой буквы определённого блока
version 1.1
*/


// ---------------------------------------------------------------------------------------------- PLUGIN kalininRainbowText IMPLEMENTATION------------
function KalininRainbowText(options){
	// ------------------------------------------------------------------------------------------ properties ---------	
	var	self = options.element,
		colorArray = options.colorArray || new Array('#974bff', '#ec11a1', 'navy', 'orange', '#ecb111', 'magenta', '#055d12', '#4bb1ff'),
		colorArrayLength  = options.colorArray.length,
		text = self.innerHTML,
		textLength = text.length;
		
	init();

	// ------------------------------------------------------------------------------------------ methods ------------	
	function init(){
		self.innerHTML =colorize(textLength, text);
	}	

	function colorize(textLength, text){
		var	newText = '',
			colorLetter,
			i;
			
		for(i = 0; i < textLength; i++){			
			newText += '<span style="color: ' + (options.colorArray[Math.floor(Math.random() * (colorArrayLength))]) + '">' + text.substr(i, 1) + '</span>';
		}	

		return newText;		
	}	

	// ------------------------------------------------------------------------------------------ handlers -----------		
	
	// ------------------------------------------------------------------------------------------ events -------------			
}