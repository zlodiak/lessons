// ---------------------------------------------------------------------------------------------- WIDJET Resize IMPLEMENTATION------------
function Resize(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var elem = options.elem;
	
	var	resizeType,
		widthImage,
		heightImage;	
		
	infoOutput();
	
	wrap = $('<div id="resize-wrapper" class="resize-wrapper"/>');
	$('#image').wrap(wrap);
	
	wrapSize();
	
	$('<div class="markerS" />').appendTo('#resize-wrapper');
	$('<div class="markerE" />').appendTo('#resize-wrapper');
	$('<div class="markerSE" />').appendTo('#resize-wrapper');
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	self.startResize = function(){
		
		$(document).on('mousemove', onMouseMove);
		$(document).on('mouseup', onMouseUp);
	}
	
	self.endResize = function(){
		$(document).off();
	}
	
	function infoOutput(){
		widthImage = $('#image').outerWidth(),
		heightImage = $('#image').outerHeight();	
		$('#image_info').html('width: ' + widthImage + '___height: ' + heightImage);	
	}
	
	function wrapSize(offset, pageY, pageX){
		if (resizeType == 's') {
			newHeight = pageY - offset.top;
			elem.css('height', newHeight);
		}
		
		if (resizeType == 'e') {
			newWidth = pageX - offset.left;
			elem.css('width', newWidth);
		}	
		
		if (resizeType == 'se') {
			newWidth = pageX - offset.left;
			newHeight = pageY - offset.top;
			elem.css({
				'height': newHeight,
				'width': newWidth
			});			
		}		
		
		$('#resize-wrapper').css({
			'width': elem.width(),
			'height': elem.height()
		});
		
		infoOutput();
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onMouseDown = function(e){	
		var className = e.target.className;
		
		if(className == 'markerS'){
			resizeType = 's';
		}
		else if(className == 'markerE'){
			resizeType = 'e';
		}
		else if(className == 'markerSE'){
			resizeType = 'se';
		}
		
		self.startResize();
	}	
	
	function onMouseMove(e){	
		var offset = $('#resize-wrapper').offset(),
			pageY = e.pageY,
			pageX = e.pageX;

		wrapSize(offset, pageY, pageX);	
	}

	function onMouseUp(){	
		self.endResize();
	}

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.parent().on('mousedown', self.onMouseDown);
	

}	


