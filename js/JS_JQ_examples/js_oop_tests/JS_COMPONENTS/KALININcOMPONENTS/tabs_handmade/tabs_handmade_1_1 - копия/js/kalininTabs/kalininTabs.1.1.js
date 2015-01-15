/* 
INFO: 
project: kalininTabs
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: графический компонент для преобразования списка во вкладки. задача реализовать на чистом javascript
version 1.1
*/

// ---------------------------------------------------------------------------------------------- WIDJET kalininTabs IMPLEMENTATION------------
function KalininTabs(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var tabContainer = options.tabContainer,
		tabs = tabContainer.getElementsByTagName('section'),
		tabsLengtht = tabs.length;
	
	init();
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	function init(){
		var	i,
			labelText,
			stateClass = '',
			tabList,
			tabLi,
			tabLabel,
			textUnit = tabContainer.getElementsByTagName('p'),
			textUnitLength = textUnit.length,
			fullText,
			croppedText,
			fullTextShell,
			croppedTextShell;
		
		tabList = prepend(tabContainer, 'ul');
		tabList.id='labelContainer';
		tabList.setAttribute('class', 'label_container');
		
		for (i = 0; i < tabsLengtht; i++){
			tabs[i].setAttribute('data-num', i + 1);
			
			labelText = tabs[i].getElementsByTagName('h1')[0].innerHTML;
			
			(i == (tabsLengtht - 1)) ? stateClass = 'active' : stateClass = '';
			
			tabLi = prepend(tabList, 'li');
			tabLi.setAttribute('class', stateClass);
			tabLi.setAttribute('data-num', tabsLengtht - i);
			tabLi.style.width = 100 / tabsLengtht + '%';
			
			tabLabel = prepend(tabLi, 'span');
			tabLabel.setAttribute('class', 'label_container_text');
			tabLabel.innerHTML = labelText;
			tabLabel.style.height = (tabList.offsetHeight - 10) + 'px';
			
			if(hasClass(tabLi, 'active')){
				tabChange(tabLi);
			}

		}	
		
		for (i = 0; i < textUnitLength; i++){
			fullText = textUnit[i].innerHTML;
			croppedText = cropText(fullText);
			
			textUnit[i].innerHTML = '';

			fullTextShell = prepend(textUnit[i], 'span');
			fullTextShell.className = 'full_text';
			fullTextShell.innerHTML = fullText;
			fullTextShell.style.display = 'none';
			
			croppedTextShell = prepend(textUnit[i], 'span');
			croppedTextShell.className = 'crop_text';
			croppedTextShell.innerHTML = croppedText;
			
			if(fullText != croppedText){
				addEvent(textUnit[i], "mouseover", function(){
					this.style.textDecoration = 'underline';
				});
				
				addEvent(textUnit[i], "mouseleave", function(){
					this.style.textDecoration = 'none';
				});
			}
		}
	}
	
	function tabChange(element){
		var	activeNum,
			liCollection = document.getElementById('tabContainer').getElementsByTagName('li');

		activeNum = element.getAttribute('data-num');
		
		for (i = 0; i < tabsLengtht; i++){
			tabs[i].style.display = 'none';		
			
			liCollection[i].className = liCollection[i].className.replace( /(?:^|\s)active(?!\S)/ , '');
			//liCollection[i].classList.remove('active');
		}
		
		tabs[activeNum - 1].style.display = 'block';
		element.className = 'active';
	}
	
	function cropText(text){
		var	textCropped,
			dots;
		
		(text.length <= 110) ? dots = '' : dots = '...';
		
		textCropped = text.substr(0, 110) + dots;
		
		return textCropped;
	}
	
	function textToggle(visibleElement, hiddenElement){
		if(hiddenElement.style.display == 'none'){
			hiddenElement.style.display = 'block';
			visibleElement.style.display = 'none';
		}
		else{
			hiddenElement.style.display = 'none';
			visibleElement.style.display = 'block';		
		}
	}
	
	function lookUpElement(child, parentNodeName, stopAt){
		if(stopAt && stopAt == child) return null;
		
		if (child.tagName == parentNodeName) return child;
		
		return child.parentNode ? lookUpElement(child.parentNode, parentNodeName, stopAt) : null;
	}	
	
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}			
	
	function prepend(id, tag) {
		var first = id.firstChild,
			newNode = document.createElement(tag);
			id.insertBefore(newNode, first);
		
		return newNode;
	}		
	
	function addEvent(elem, type, handler){
		if (elem.addEventListener){
			elem.addEventListener(type, handler, false);
		} 
		else{
			elem.attachEvent('on' + type, handler);
		}
	} 
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	function onTabMouseOver(element){
		if(element.nodeName  = 'SPAN'){
			tabChange(element.parentNode);
		}
		
		return;
	}
	
	function onArticleMouseClick(article){
		var	visibleElement, 
			hiddenElement;
			
		if(article){
			visibleElement = article.getElementsByTagName('span')[0];
			hiddenElement = article.getElementsByTagName('span')[1];
			
			textToggle(visibleElement, hiddenElement);
		}		

		return;
	}	

	// ------------------------------------------------------------------------------------------ events -------------		
	addEvent(document.getElementById('labelContainer'), 'mouseover' , function(e){
		onTabMouseOver(e.target);
	}, false);	
	
	tabContainer.addEventListener("click", function(e){
		var article = lookUpElement(e.target, 'ARTICLE', tabContainer);
		
		onArticleMouseClick(article);
	}, false);	
}	


