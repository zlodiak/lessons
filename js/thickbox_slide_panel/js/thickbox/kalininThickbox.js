$(function() {
	//генерируем html для выпадающей панели
	var div = document.createElement('div');
	div.innerHTML = '<div class="slide_anons" id="slidebox"><div class="slide_anons-header"><div class="title">Анонсы</div><button class="close slide_anons-close">закрыть</button></div><div class="slide_anons-content"><div class="slide_inner"><div class="slide_content" id="slide_content">Пыщ пыщ</div></div></div></div>'
	document.body.appendChild(div);

	//подключаем стили хитрым образом
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', 'js/thickbox/style_anons.css');
	document.getElementsByTagName('head')[0].appendChild(link);
});

//ну и гвоздь программы - логика для выпадашки
$(function() {
	$(window).scroll(function(){			
		if  ($(window).scrollTop() > 700){//на режим совместимости забиваем
			$('#slidebox').animate({'right': '0px'}, 300);
		}	
		else {
			$('#slidebox').stop(true).animate({'right': '-400px'}, 100);	
		}	
	});

	$('#slidebox .close').bind('click',function(){
		$(this).parent().parent().remove();
	});
});
