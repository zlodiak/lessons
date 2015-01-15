// close form
	
$('.window_form .close').on('click', function(){
	$(this).closest('.window_form').css('display', 'none');
});

// active map
$('.schema_active li')
	.on('mouseenter', function(){
		if($(this).hasClass('free')){
			$(this).find('.pic_map, .reserv_map, .info_map').css('display', 'block');
		}
		else if($(this).hasClass('busy')){
			var	x = $(this).offset().top,
				y = $(this).offset().left
				widthLi = $(this).width(),
				heightLi = $(this).height(),
				widthInformer = $('.map_informer').width(),
				heightInformer = $('.map_informer').height();				

			$('.map_informer').css({
				'top': x - (heightInformer) + 40 + 'px',
				'left': y + widthLi + 31 + 'px',
				'display': 'block'
			});
		}
	})
	.on('mouseleave', function(){
		$(this).find('.pic_map, .reserv_map, .info_map').css('display', 'none');
		
			$('.map_informer').css({
				'display': 'none'
			});		
	});
	
	
$('.reserv_map').on('click', function(){
			var	x = $(this).offset().top,
				y = $(this).offset().left
				widthLi = $(this).width(),
				heightLi = $(this).height(),
				widthInformer = $('.map_informer').width(),
				heightInformer = $('.map_informer').height();				

			$('.window_form').css({
				'top': x - (heightInformer) + 40 + 'px',
				'left': y + widthLi + 31 + 'px',
				'display': 'block'
			});	
});	


$('.info_map').on('click', function(){
	console.log('пщ пщ');
});


//ajax форма комментариев reviewsFancy
$('#reviewsFancyMenu').on('click', function(e){
	console.log('e');
	e.stopPropagation()
	$('.reviews_fancy').toggleClass('hide');
});		

$(".button").click(function() {
	console.log('click');

	var title = $("#RFForm input[name=title]");
	var name = $("#RFForm input[name=name]");
	var message = $("#RFForm input[name=message]");
	
	console.log(title);
	console.log(name);
	console.log(message);

	var error = "";
	// Проверка введена ли информация в поля формы
	if ((name.val() == '') || (message.val() == '')) {
		 error = "Вы не ввели имя и сообщение";
		 if (name.val() == '' && message.val() != '') {
			error = "Вы не ввели имя";
		 }
		 if (name.val() != '' && message.val() == '') {
			error = "Вы не ввели сообщение";
		 }
		 alert(error);
	}
	// Если поля заполнены, отправляем их значения
	if (!error) {
		console.log('no errors');

		console.log(title.val());
		console.log(name.val());
		console.log(message.val());
	
		$.ajax({
			url: "/reviewsFancy/call/",
			type: 'POST',
			dataType: "html",
			data: {
				"title": title.val(),
				"name": name.val(),
				"message": message.val(),
			},
			error: function() {
				console.log('err');
				alert('Ошибка получения запроса');
			},
			// При успехе очищаем поля и меняем кнопочку
			success: function(data) {
				var json = JSON.parse(data);
				
				console.log('succ');
				console.log(json['result']);
				if(json['result']){
					title.val('');
					name.val('');
					message.val('');
					$('.reviews_fancy').toggleClass('hide');
					alert('сообщение отправлено');
				}
				else{
					alert('ошибка БД');
				}
			},
			beforeSend: function(xhr, settings) {
				console.log('-------------before send--');
				
				function getCookie(name) {
					var cookieValue = null;
					if (document.cookie && document.cookie != '') {
						var cookies = document.cookie.split(';');
						for (var i = 0; i < cookies.length; i++) {
							var cookie = jQuery.trim(cookies[i]);
							// Does this cookie string begin with the name we want?
							if (cookie.substring(0, name.length + 1) == (name + '=')) {
								cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
								break;
							}
						}
					}
				
					return cookieValue;
				}
				
				if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
					// Only send the token to relative URLs i.e. locally.
					xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
				}
			}						
		});// ajax
	}
	return false;
});			