/* 
INFO: 
project: kalininTabs
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: графический компонент для преобразования списка во вкладки
version 1.0
*/

// ---------------------------------------------------------------------------------------------- WIDJET kalininTabs IMPLEMENTATION------------
function KalininTabs(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var tabContainer = options.tabContainer,
		tabs = tabContainer.children('section'),
		tabsLengtht = tabs.length;
	
	init();
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	function init(){
		var	i = 1,
			labelText,
			stateClass;
		
		tabContainer.prepend('<ul id="labelContainer" class="label_container" />');
		
		tabs.each(function(){
			$(this).attr('data-num', i);
			
			labelText = $(this).children('h1').text();
			
			(i == 1) ? stateClass = 'active' : stateClass = '';
			
			$('#labelContainer').append('<li class="' + stateClass + '" data-num="' + i + '"><span class="label_container_text">' + labelText + '</span></li>').find('li').css('width', 100 / tabsLengtht + '%');
			
			i++;
		});
		
		$('.label_container_text').height($('#labelContainer').height() - 10);		
		
		tabChange($('#labelContainer li').eq(0));
		
		$('.tab article > p').each(function(){
			var	fullText = $(this).text();
			
			$(this).html(cropText($(this).text())).append('<span class="full_text">' + fullText + '</span>');
		});
		
		$('.tab article > p').each(function(){
			var	fullText = $(this).children('.full_text').text(),
				cropText = $(this).children('.crop_text').text();
				
			if(fullText != cropText){
				$(this).on('mouseover', function(){
					$(this).children('p > span').css('text-decoration', 'underline');
				}).on('mouseleave', function(){
					$(this).children('p > span').css('text-decoration', 'none');
				});
			}
		});
	}
	
	function tabChange(element){
		var	activeNum;
		
		$('.tab').css('display', 'none');
		$('#labelContainer li').removeClass('active');
		
		activeNum = element.attr('data-num');	

		$('.tab[data-num="' + activeNum + '"]').css('display', 'block');
		$('#labelContainer li[data-num="' + activeNum + '"]').addClass('active');
	}
	
	function cropText(text){
		var	textCropped,
			dots;
		
		(text.length <= 110) ? dots = '' : dots = '...';
		
		textCropped = '<span class="crop_text">' + text.substr(0, 110) + dots + '</span>';
		
		return textCropped;
	}
	
	function fullText(hiddenElement, shell){
		shell.find('.full_text, .crop_text').css('display', 'none');
		
		shell.find(hiddenElement).css('display', 'block');
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	function onTabMouseOver(){
		tabChange($(this));
	}
	
	function onArticleMouseClick(){
		var	hiddenElement;
		
		hiddenElement = $(this).find(' > p > span:hidden')[0];
		
		fullText(hiddenElement, $(this));
	}	

	// ------------------------------------------------------------------------------------------ events -------------	
	$('#labelContainer li').on('mouseover', onTabMouseOver);
	
	$('.tab article').on('click', onArticleMouseClick);
}	


