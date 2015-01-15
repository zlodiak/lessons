// ---------------------------------------------------------------------------------------------- WIDJET clock IMPLEMENTATION------------
function List(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var elem = options.elem;
	
	var self = this;
	
	// ------------------------------------------------------------------------------------------ methods ------------	
	self.deselectAllItems = function(){
		$(elem).find('li').removeClass('selected');
	}
	
	self.toggleSelectItem = function(li){
		li.className = (li.className == '') ? 'selected' : '';
		
		alert($('.selected').text());
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------	
	self.onClickPunkt = function(e){
		var e = e || event;
		var target = e.target || e.srcElement;
		
		if (!e.shiftKey) {
			self.deselectAllItems();
		}

		self.toggleSelectItem(target);		
	}
	
	self.onSelectstart = function(){
		return false;
	}	
	
	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('click', 'li', self.onClickPunkt);
	elem.on('selectstart onmousedown', self.onSelectstart);

}	