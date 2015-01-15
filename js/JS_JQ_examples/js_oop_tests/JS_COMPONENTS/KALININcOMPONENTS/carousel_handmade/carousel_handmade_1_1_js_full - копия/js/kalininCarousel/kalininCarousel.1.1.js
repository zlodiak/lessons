/* 
INFO: 
project: kalininCarousel
browsers: opera/chrome/FF/ie9/safari
coding: Sergey Kalinin 07/2013 (prozaik81-2@yandex.ru)
desc: графический компонент для преобразования списка в карусель с возможностью прокрутки при помощи стрелок-указателей. слайды карусели должны быть одинаковой длины
version 1.1
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininCarousel IMPLEMENTATION------------
function KalininCarousel(options){
	// ------------------------------------------------------------------------------------------ properties ---------	
	var	carouselWrap = options.carouselWrap,
		carousel = document.getElementById('carousel'),
		wrapperElements = carousel.getElementsByTagName('ul')[0],
		carouselElements = wrapperElements.getElementsByTagName('li'),
		carouselElementsWidth;

	if(window.getComputedStyle){
		carouselElementsWidth	= carouselElements[0].offsetWidth 
								+ parseInt(getComputedStyle(carouselElements[0], '').marginLeft, 10) 
								+ parseInt(getComputedStyle(carouselElements[0], '').marginRight, 10);
	} 
	else{
		carouselElementsWidth 	= carouselElements[0].offsetWidth 
								+ parseInt(carouselElements[0].currentStyle.marginLeft, 10) 
								+ parseInt(carouselElements[0].currentStyle.marginRight, 10);
	}
		
	var	carouselLength = carouselElements.length,
		running = false,
		runningScroll = true,
		autoScroll = 0,
		prev,
		next;
		
	init();

	// ------------------------------------------------------------------------------------------ methods ------------	
	function init(){
		wrapperElements.style.width = carouselElementsWidth * carouselLength * 2 + 'px';
		
		prev = prepend(carouselWrap, 'div');
		prev.id = 'prev';
		prev.className = 'prev';
		
		next = prepend(carouselWrap, 'div');
		next.id = 'next';
		next.className = 'next';			

		
		if((options.arrowsType == 'auto') || (options.arrowsType == 'hidden')){
			toggleControls('none', 'none');
		}	

		toggleIntervalAutoScroll('start');
	}		

	function shift(direction){
		var	offset,
			cloneSlides,
			lastSlide,
			i;
		
		if(!running){
			running = true;		
			
			toggleIntervalAutoScroll('stop');

			if(direction == -1){
				offset = (carouselElementsWidth * options.rotateBy * direction);
				
				for(i = 0; i < options.rotateBy; i++){
					cloneSlides = carouselElements[i].cloneNode(true);
					
					wrapperElements.appendChild(cloneSlides);	
				}
				
				shiftAction();
			}
			else{
				offset = 0;

				for(i = (carouselLength - 1); i > (carouselLength - options.rotateBy - 1); i--){
					cloneSlides = carouselElements[carouselLength - 1].cloneNode(true);
					
					wrapperElements.insertBefore(cloneSlides, wrapperElements.firstChild);	
				}
				
				wrapperElements.style.left = (-1 * options.rotateBy * carouselElementsWidth) + 'px';
				
				shiftAction();				
			}			
		}

		function shiftAction(){	
			var	interval,
				offset;
			
			if(direction == -1){
				offset = 0;
				
				function animateLeft(){
					offset -= 13;
					
					wrapperElements.style.left = offset + 'px';
					
					if(offset <= (-1 * options.rotateBy * carouselElementsWidth)){
						clearInterval(interval);
						
						for(i = 0; i < options.rotateBy; i++){
							wrapperElements.removeChild(document.getElementsByTagName('li')[0]);
						}
						
						wrapperElements.style.left = 0;
						
						if(runningScroll){
							toggleIntervalAutoScroll('start');
						}
						
						running = false;
					}	
				}	

				setIntervalCustom(animateLeft);				
			}
			else{
				offset = parseInt(wrapperElements.style.left, 10);
				
				function animateRight(){
					offset += 13;
					
					wrapperElements.style.left = offset + 'px';
					
					if(offset >= 0){
						clearInterval(interval);
						
						for(i = options.rotateBy; i > 0; i--){						
							wrapperElements.removeChild(document.getElementsByTagName('li')[carouselLength + i - 1]);
						}						
						
						wrapperElements.style.left = 0;
						
						if(runningScroll){
							toggleIntervalAutoScroll('start');
						}
						
						running = false;
					}	
				}	

				setIntervalCustom(animateRight);
			
			}
			
			function setIntervalCustom(animate){
				return interval = setInterval(animate, 25);
			}
		}		
	}		

	function toggleControls(prevState, nextState){		
		prev.style.display = prevState;
		
		next.style.display = nextState;
	}	
	
	function toggleIntervalAutoScroll(stateInterval){
		if(options.autoScroll){
			if(stateInterval == 'start'){
				autoScroll = window.setInterval(	function(){
														shift(-1); 
													}, options.autoScrollSpeed);			
			}
			else if(stateInterval == 'stop'){
				window.clearInterval(autoScroll);
			}
		}
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
	function onClickControls(direction){
		shift(direction);
	}
	
	function onHoverWrap(){
		if(options.arrowsType == 'auto'){
			toggleControls('block', 'block');
		}
		
		toggleIntervalAutoScroll('stop');
		
		runningScroll = false;
	}		

	function onLeaveWrap(){
		if(options.arrowsType == 'auto'){
			toggleControls('none', 'none');
		}	

		toggleIntervalAutoScroll('start');	

		runningScroll = true;		
	}	
	
	// ------------------------------------------------------------------------------------------ events -------------	
	addEvent(prev, 'click' , function(e){
		onClickControls(-1);
	}, false);	
	
	addEvent(next, 'click' , function(e){
		onClickControls(1);
	}, false);	

	addEvent(carouselWrap, 'mouseover' , function(e){
		onHoverWrap();
	}, false);		
	
	addEvent(carouselWrap, 'mouseout' , function(e){
		onLeaveWrap();
	}, false);			
}