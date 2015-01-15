/* 
INFO: 
project: kalininStepForm
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 05/2013 (prozaik81-2@yandex.ru)
desc: jquery-плагин для пошаговой формы
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininStepForm IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininStepForm = function(options) {					
		var options = jQuery.extend({

		},options);		
		
		return this.each(function() {
			// ------------------------------------------------------------------------------------------ properties ---------	
			var self = $(this);	
			
			var	form = $('#SignupForm'),
				fieldsets = form.find('fieldset'),
				fieldetsQuantity = fieldsets.length;
				
			markFieldsets();
			
			setDisplays();
			
			buttonsRender()
			
			// ------------------------------------------------------------------------------------------ methods ------------		
			function setDisplays(){
				fieldsets.addClass('hide');
				
				fieldsets.eq(0).removeClass('hide');
			}				
		
			function markFieldsets(){
				var	i = 0;
				
				fieldsets.each(function() {
					$(this).attr('data-step', i);
					
					i++;
				});			
			}	

			function buttonsRender(){
				fieldsets.each(function() {
					var	prev = $('<div class="prev">prev</div>'),
						next = $('<div class="next">next</div>'),
						submit = $('<div class="submit">submit</div>');
						
					if(parseInt($(this).attr('data-step'), 10) == 0){
						$(this).append(next);	
					}			
					else if(parseInt($(this).attr('data-step'), 10) == (fieldetsQuantity - 1)){
						$(this).append(prev).append(submit);
					}
					else{
						$(this).append(prev).append(next);
					}
					
				});		
			}

			function step(elem, className){
				if(className != 'submit'){
					$(elem).closest('fieldset').addClass('hide')[className]().removeClass('hide');
				}
				else{
					form.submit();
				}
			}
			
			// ------------------------------------------------------------------------------------------ handlers -----------		
			function onClickButton(event){	
				var	elem, className;
				
				event = event || window.event;

				elem = event.target || event.srcElement;
				
				className = event.target.className
				
				step(elem, className);
			}				
			
			// ------------------------------------------------------------------------------------------ events -------------	
			$('.next, .prev, .submit').on('click', onClickButton);	
			
		});
	};
})(jQuery);