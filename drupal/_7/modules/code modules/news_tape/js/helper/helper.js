(function ($){
	/********************************************************************************************* behaviors */	
	Drupal.behaviors.Example = {
		attach: function (context, settings){
			$(".icon_delete").once(function(){
				$(this).click(function(event){
					console.log(55555);
					
					var num = $(this).attr('data-num');
					
					jQuery.ajax({
						url: 'ajaxQuery/',
						type: 'POST',
						dataType: 'application/json',
						success: function(data){
							console.log(66666);
							
							var jobj = jQuery.parseJSON(data);
							
							console.log(jobj);
						}
					});					
				});
			});  
		}
	};
	
	/********************************************************************************************* datepicker */	
	Drupal.behaviors.datepicker = {
		attach: function (context, settings){	
			$('#news-tape-settings .datefield').datepicker({ 
				dateFormat: 'yy-mm-dd'
			});	
		}
	};	
})(jQuery);
