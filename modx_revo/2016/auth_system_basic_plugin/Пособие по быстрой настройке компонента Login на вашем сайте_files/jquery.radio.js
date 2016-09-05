/*
 * jQuery Radio Buttons Styler 1.0.1 (22.09.20012)
 * http://dimox.name/styling-input-radio-using-jquery-css/
 *
 * Copyright (c) 2012 Dimox (http://dimox.name/)
 * Dual licensed under the MIT and GPL licenses.
 *
 */

(function($) {
	$.fn.radio = function() {
		$(this).css({position: 'absolute', left: '-9999px'}).each(function() {
			var input = $(this);
			if (input.next('span.radio-style').length < 1) {
				var span = $('<span class="radio-style" style="display:inline-block"></span>');
				input.after(span);
				if (input.is(':checked')) span.addClass('checked');
				if (input.is(':disabled')) span.addClass('disabled');
				if (input.is('.error-field')) span.addClass('error-radio-field');        
				// клик на псевдорадиокнопке
				span.click(function() {
					if (!$(this).is('.disabled')) {
						$('input[name="' + input.attr('name') + '"]').next().removeClass('checked');
						input.attr('checked', true).next().addClass('checked');
						return false;
					}
				});
				// клик на label
				input.parent('label').add('label[for="' + input.attr('id') + '"]').click(function() {
					span.click();
					return false;
				});
				// переключение стрелками
				input.change(function() {
					span.click();
				})
				.focus(function() {
					if (!span.is('.disabled')) span.addClass('focused');
				})
				.blur(function() {
					span.removeClass('focused');
				});
				// обновление при динамическом изменении
				$('body').on('refresh',input, function() { 
					if (input.is(':checked')) {
						$('input[name="' + input.attr('name') + '"]').next().removeClass('checked');
						span.addClass('checked');
					}
					if (input.is(':disabled')) span.addClass('disabled');
						else span.removeClass('disabled');
				})
			}
		});
	}
})(jQuery)