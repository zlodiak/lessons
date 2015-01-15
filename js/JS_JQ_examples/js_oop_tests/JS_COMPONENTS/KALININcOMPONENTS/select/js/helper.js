// ---------------------------------------------------------------------------------------------- WIDJET CustomSelect IMPLEMENTATION------------
function CustomSelect(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var self = this;
	
	var elem = options.elem,
		first = elem.find('.customselect-options li:first-child').text();
		
	var isOpen = false;	
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	self.onClickTitle = function(){		
		if (self.isOpen){
			self.selectClose();
		} 
		else{
			self.selectOpen();
		}	
	}	
	
	self.onClickElement = function(e){
		self.output(e.target);
	}
	
	function onDocumentClick(e){
		if ($(e.target).closest(elem).length){
			return;
		}
		
		self.selectClose();		
	}
	
	// ------------------------------------------------------------------------------------------ methods ------------		
	self.selectOpen = function(){
		elem.addClass('open');
		self.isOpen = true;
		
		$('body').on('click', onDocumentClick);
	};	
	
	self.selectClose = function(){
		elem.removeClass('open');
		self.isOpen = false;
		
		$('body').off('click', onDocumentClick);
	}	
	
	self.output = function(target){
		self.selectClose();
		
		elem.find('.customselect-title').html($(target).html());

		$('#result').text($(target).data('value'));
	}
	
	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('click', '.customselect-title', self.onClickTitle);
	
	elem.on('click', '.customselect-options li', self.onClickElement);
}	