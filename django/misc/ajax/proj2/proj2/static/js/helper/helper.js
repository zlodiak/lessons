// request forms validation
$('#btn_submit0, #btn_submit1').on('click', function(){
	console.log(111)
	var	flag = false,
		fld_name = $(this).closest('form').find('.fld_name'),
		fld_phone = $(this).closest('form').find('.fld_phone'),
		id = $(this).attr('id');
		
			console.log(id);
		
	if(!$.trim(fld_name.val())){		
		fld_name.addClass('shine');
		
		flag = true;
	}	
	else{
		fld_name.removeClass('shine');
	}
	
	if(!$.trim(fld_phone.val())){		
		fld_phone.addClass('shine');
		
		flag = true;
	}	
	else{
		fld_phone.removeClass('shine');
	}	
	
	if(!flag){
		//send
		if(id == 'btn_submit0'){
			data = { 
				name: $('#fld_name_0').val(),
				phone: $('#fld_phone_0').val(),
			};
		}
		else if(id == 'btn_submit1'){
			data = { 
				name: $('#fld_name_1').val(),
				phone: $('#fld_phone_1').val(),
			};		
		}
			
		$.ajax({
			type: 'POST',
			url: 'js/ajax/requestSend.php',
			data: data,
			dataType: 'json',
			success: function (json) {
			console.log(json);
			
			if(json == 'success'){
				//console.log('yy');
				
				$('#modal-8').modal();
				
				$('#request_form_0, #request_form_1').find('input[type="text"]').val('').removeClass('shine');	
			}
			else{
				//console.log('nn');
			}
			
			//
		}	
		});			
	}

	return false;
});


// move nav_top on scroll
var	header = $('.header'),
	navTop = $('.nav_top'),
	headerHeight = header.outerHeight(),
	navTopHeight = navTop.outerHeight();
	
	console.log(headerHeight);
	console.log(navTopHeight);
	
	scrollMove();
	
	$(window).scroll(function() {
		scrollMove();
	});

	function scrollMove(){
		var	scrollTop = $(window).scrollTop();
		
		if(scrollTop > headerHeight){		
			navTop.attr('style', 'position: absolute; top: ' + scrollTop + 'px; width: 100%; z-index: 190;');	
		}
		else{
			navTop.removeAttr('style');	
		}			
	}	