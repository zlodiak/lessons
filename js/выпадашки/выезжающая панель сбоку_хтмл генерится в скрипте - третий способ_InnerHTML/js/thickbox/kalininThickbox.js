$(function() {
	//генерируем html дл€ выпадающей панели. чтобы браузер не мучать, добавим узлы в один заход, использу€ замечательный createDocumentFragment
	// var newdiv = document.createElement('div');
		// newdiv.className = 'slide_anons';
		// newdiv.id = 'slidebox';		

	// var anonsdiv = document.createElement('div');
		// anonsdiv.className = 'slide_anons-header';
		
	// var titlediv = document.createElement('div');
		// titlediv.className = 'title';	
		
	// var anonse_text = document.createTextNode('јнонсы');
		
	// var exitdiv = document.createElement('button');
		// exitdiv.className = 'close slide_anons-close';
		
	// var exit_text = document.createTextNode('закрыть');	
	
	// var slidediv = document.createElement('div');
		// slidediv.className = 'slide_anons-content';
		
	// var slidediv_inner = document.createElement('div');
		// slidediv_inner.className = 'slide_inner';
		
	// var slidediv_content = document.createElement('div');
		// slidediv_content.className = 'slide_content';
		// slidediv_content.id = 'slide_content';
		
	// var content_text = document.createTextNode('ѕыщ пыщ');	
	
	// var fragment = document.createDocumentFragment();
	// var parent = fragment.appendChild(newdiv);		
	// var parent_inner = parent.appendChild(anonsdiv);
	// var title = parent_inner.appendChild(titlediv);
		// title.appendChild(anonse_text);
	// var exit = parent_inner.appendChild(exitdiv);
		// exit.appendChild(exit_text);
	// var parent_inner2 = parent.appendChild(slidediv);
	// var slidediv_inner2 = parent_inner2.appendChild(slidediv_inner);
	// var slidediv_inner3 = slidediv_inner2.appendChild(slidediv_content);
	// var cont = slidediv_inner3.appendChild(content_text);
	// document.getElementsByTagName('body').item(0).appendChild(fragment);
	
	//генерируем html дл€ выпадающей панели.
	var div = document.createElement('div');
	div.innerHTML = '<div class="slide_anons" id="slidebox"><div class="slide_anons-header"><div class="title">јнонсы</div><button class="close slide_anons-close">закрыть</button></div><div class="slide_anons-content"><div class="slide_inner"><div class="slide_content" id="slide_content">ѕыщ пыщ</div></div></div></div>'
	document.body.appendChild(div);

	//подключаем стили хитрым образом
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', 'js/thickbox/style_anons.css');
	document.getElementsByTagName('head')[0].appendChild(link);
});

//ну и гвоздь программы - логика дл€ выпадашки
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
