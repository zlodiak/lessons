(function() {
	var ua = navigator.userAgent;
	var device = ua.match(/android/i);
	var wideDevice = window.innerWidth > 700;
	
	if (!device)
		return;
	
//	if (!localStorage.getItem('imp_shown')) {
//		localStorage.setItem('imp_shown', true);
//		showPopup();
//	}
	
	showPopup();
	
	function createStyle() {
		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'http://www.imobilco.ru/f/1/g/i/librusec/reader-banner.css');
		document.getElementsByTagName('head')[0].appendChild(link);
	}
	
	function showPopup() {
		createStyle();
		var messages = {
			phone: 'Скачайте приложение «Айчиталка» и читайте любимые книги прямо в телефоне!',
			tablet: 'Скачайте приложение «Айчиталка» и читайте любимые книги прямо в планшете!'
		};
		
		var body = document.body;
		
		var popup = document.createElement('div');
		popup.className = 'imob-reader';
		if (wideDevice)
			popup.className += ' imob-reader_ipad';
		
		popup.innerHTML = '<span class="imob-reader__close">×</span>'
			+ '<a href="http://www.imobilco.ru/rrr/ichitalka-android/"><img src="http://www.imobilco.ru/f/1/g/i/librusec/reader-logo.png" alt="Айчиталка" class="imob-reader__logo" width="251" height="251" /></a>'
			+ '<p>' + (wideDevice ? messages.tablet : messages.phone) + '</p>'
			+ '<p><a href="http://www.imobilco.ru/rrr/ichitalka-android/" class="imob-reader__download-btn">Скачать</a></p>';
		
		var overlay = document.createElement('div');
		overlay.className += 'imob-reader-overlay';

		var closeIcon = popup.getElementsByClassName('imob-reader__close')[0];
		
		closeIcon.onclick = closeIcon.ontouchstart = function() {
			body.removeChild(popup);
			body.removeChild(overlay);
		};
		
		body.appendChild(popup);
		body.appendChild(overlay);
	}
})();