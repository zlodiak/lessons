// ������� ����� ������ ��������� ������ � ��������� ������
function adfgetDocumentHeight() {
	return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, adfgetViewportHeight());
}

// ������� ����� ������ ������� ����� ���������
function adfgetViewportHeight() {
	var ua = navigator.userAgent.toLowerCase();
	var isOpera = (ua.indexOf('opera')  > -1);
	var isIE = (!isOpera && ua.indexOf('msie') > -1);
	return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;
}

// �������� ������
function adfsendView() {
	svs  = true;
	
	var offset = (window.pageYOffset || document.documentElement.scrollTop);
	
	var xmlhttp;
	if (window.XDomainRequest) {
		xmlhttp = new XDomainRequest(); // IE 7/8/9
	} else if (window.XMLHttpRequest) {
		// Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		// IE 5,6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	/*
		if (!xmlhttp.onload) { // ��� IE 7/8/9, � ��� ������ XMLHttpRequest
			if (window.XDomainRequest) {
				xmlhttp = new XDomainRequest(); // ..�� ���� XDomainRequest
			} else {
				// IE 5,6
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
	*/
	for(var i = 0; i < adfba.length; i++) {
		if(document.getElementById('adfbp' + adfba[i]) != undefined &&
		adfbt[adfba[i]][0] == false &&
		(adfgetViewportHeight()+offset) > document.getElementById('adfbp' + adfba[i]).offsetTop &&
		offset < document.getElementById('adfbp' + adfba[i]).offsetTop+document.getElementById('adfbp' + adfba[i]).offsetHeight) {
			adfbt[adfba[i]][0] = true;
		}
		
		if(adfbt[adfba[i]][0] == true) {
			adfbt[adfba[i]][1]++;
			if(adfbt[adfba[i]][1] > 2 && adfbt[adfba[i]][2] == false) {
				// �������� ����, ��� ������������ ����� ���
				
				var locationUrl = window.location;
				/*
				var current = window;
				while(true) {
					if(current.location != current.parent.location) {
						current = current.parent;
					} else {
						locationUrl = current.location;
						break;
					}
				}
				*/
				var url = "http://adfocus.ru/banner/ajax.php";
				url += "?show_block_id=" + adfbb[adfba[i]];
				url += "&adfbui=" + adfbui;
				url += "&adfbri=" + adfbri;
				url += "&adfbpi=" + adfba[i];
				url += "&url=" + encodeURIComponent(locationUrl);
				xmlhttp.open("GET", url, true);
				xmlhttp.send();
				
				adfbt[adfba[i]][2] = true;
			}
		}
	}
	
	setTimeout("adfsendView()", 500);
}

// ������� ��� ���������� ����������� �������
function adfaddHandler(object, event, handler, useCapture) {
	if (object.addEventListener) {
		object.addEventListener(event, handler, useCapture ? useCapture : false);
	} else if (object.attachEvent) {
		object.attachEvent('on' + event, handler);
	} else alert("Add handler is not supported");
}

// ���������� ������� ��� ����������
function adfscroll() {
	var offset = (window.pageYOffset || document.documentElement.scrollTop);
	
	for(var i = 0; i < adfba.length; i++) {
		if(document.getElementById('adfbp' + adfba[i]) != undefined &&
		adfbt[adfba[i]][0] == false &&
		adfgetViewportHeight()+offset > document.getElementById('adfbp' + adfba[i]).offsetTop &&
		offset < document.getElementById('adfbp' + adfba[i]).offsetTop+document.getElementById('adfbp' + adfba[i]).offsetHeight) {
			adfbt[adfba[i]][0] = true;
			adfbt[adfba[i]][1] = 0;
		} else {
			adfbt[adfba[i]][0] = false;
			adfbt[adfba[i]][1] = 0;
		}
	}
}

// ���������� ������� ��� ������ ���������
function adfwheel(event) {
	
	var delta; // ����������� �������
	// -1 - ������ ����
	// 1  - ������ �����
	event = event || window.event;
	// Opera � IE �������� �� ��������� wheelDelta
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120;
		// � ����� �������� wheelDelta ����� ��, �� � ��������������� ������
		if (window.opera) delta = -delta;
		// � ���������� Gecko ������� �������� detail
	} else if (event.detail) {
		delta = -event.detail / 3;
	}
	// ��������� ��������� ������� ��������� �� ���������
	//if (event.preventDefault)  event.preventDefault();
	//event.returnValue = false;
	
	var offset = (window.pageYOffset || document.documentElement.scrollTop);
	
	for(var i = 0; i < adfba.length; i++) {
		if(document.getElementById('adfbp' + adfba[i]) != undefined &&
		adfbt[adfba[i]][0] == false &&
		adfgetViewportHeight()+offset > document.getElementById('adfbp' + adfba[i]).offsetTop &&
		offset < document.getElementById('adfbp' + adfba[i]).offsetTop+document.getElementById('adfbp' + adfba[i]).offsetHeight) {
			adfbt[adfba[i]][0] = true;
			adfbt[adfba[i]][1] = 0;
		} else {
			adfbt[adfba[i]][0] = false;
			adfbt[adfba[i]][1] = 0;
		}
	}
	
	return delta;
}

// ��������� �����������
// Gecko
adfaddHandler(window, 'DOMMouseScroll', adfwheel);
// Opera
adfaddHandler(window, 'mousewheel', adfwheel);
// IE
adfaddHandler(document, 'mousewheel', adfwheel);

adfaddHandler(window, 'scroll', adfscroll);
