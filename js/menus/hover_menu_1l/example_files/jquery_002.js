jQuery.fn.sprites = function(settings) {
	settings = jQuery.extend({
		allowClick: true,
		show: {opacity: 'show'},
		hide: {opacity: 'hide'},
		active: 'active',
		click: 'click'
	}, settings);

	// Attach events to each child
	jQuery(this).children().each(function(){		

		// Do not attach events to active children
		if(!jQuery(this).hasClass(settings.active)){
			
			//hide the css defined :hover background
			jQuery(this).children('a').css({background: "none"});
			
			// Mouseover
			jQuery(this).hover(function() {
				jQuery('<div style="display:none"></div>').prependTo(this).animate(settings.show);		
			
			//Mouseout
			},function(){
				jQuery(this).children('div').animate(settings.hide, function(){
					jQuery(this).children('div').remove();
				});
			});
			
			//click events on the a if allowClick is true
			if(settings.allowClick){
				
				// Mousedown
				jQuery(this).children('a').mousedown(function(){
					jQuery(this).prev().addClass('click');
				//Mouseup
				}).mouseup(function(){
					jQuery(this).prev().removeClass('click');
				});
			}
			
		}
	});
};
