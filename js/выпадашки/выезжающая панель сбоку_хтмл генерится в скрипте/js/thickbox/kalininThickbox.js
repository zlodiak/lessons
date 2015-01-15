$(function() {
	//генерируем html для выпадающей панели. чтобы браузер не мучать, добавим узлы в один заход, используя замечательный createDocumentFragment
	var fragment = document.createDocumentFragment();

	var newdiv = document.createElement('div');
		newdiv.className = 'slide_anons';
		newdiv.id = 'slidebox';		
	var parent = fragment.appendChild(newdiv);

	var anonsdiv = document.createElement('div');
		anonsdiv.className = 'slide_anons-header';
	var parent_inner = parent.appendChild(anonsdiv);

	var titlediv = document.createElement('div');
		titlediv.className = 'title';
		
	var title = parent_inner.appendChild(titlediv);
		title.appendChild(document.createTextNode('Анонсы'));
		
	var exitdiv = document.createElement('button');
		exitdiv.className = 'close slide_anons-close';
		
	var exit = parent_inner.appendChild(exitdiv);
		exit.appendChild(document.createTextNode('закрыть'));
		
	var slidediv = document.createElement('div');
		slidediv.className = 'slide_anons-content';
	var parent_inner2 = parent.appendChild(slidediv);

	var slidediv_inner = document.createElement('div');
		slidediv_inner.className = 'slide_inner';
	var slidediv_inner2 = parent_inner2.appendChild(slidediv_inner);

	var slidediv_content = document.createElement('div');
		slidediv_content.className = 'slide_content';
		slidediv_content.id = 'slide_content';
	var slidediv_inner3 = slidediv_inner2.appendChild(slidediv_content);

	var cont = slidediv_inner2.appendChild(slidediv_inner3);
		cont.appendChild(document.createTextNode('Пыщ пыщ'));

	document.getElementsByTagName('body').item(0).appendChild(fragment);

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
