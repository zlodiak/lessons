// ---------------------------------------------------------------------------------------------- WIDJET clock IMPLEMENTATION------------
function Voter(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var elem = options.elem,
		value = options.value || 66,
		vote = elem.find('#vote');
		
	var self = this;
	
	setVote(value, true);
	
	// ------------------------------------------------------------------------------------------ methods ------------	
	function setVote(newVote, flag){
		if(!flag){
			$(self).triggerHandler({
				type: 'ch',
				value: newVote
			});
		}
		
		$(vote).text(newVote);
	}	
	
	self.up = function(){
		var nowVote = $(vote).text();
		
		nowVote = Number(nowVote) + 1;
		setVote(nowVote, false);	
	}
	
	self.down = function(){
		var nowVote = $(vote).text();
		
		nowVote = Number(nowVote) - 1;
		setVote(nowVote, false);
	}	
	
	// ------------------------------------------------------------------------------------------ handlers -----------	
	self.onUp = function(){
		self.up();
	}
	
	self.onDown = function(){
		self.down();
	}	
	
	self.onCh = function(e){
		alert(e.value);
		console.log('alert');
	}
	
	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('click', '.up', self.onUp)
		.on('click', '.down', self.onDown);
}	