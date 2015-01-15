// ---------------------------------------------------------------------------------------------- WIDJET clock IMPLEMENTATION------------
function Clock(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var elem = options.elem;
	
	var self = this;
	
	var	flag,
		timer,
		nowTime;
						
	// ------------------------------------------------------------------------------------------ methods ------------	
	self.nowTime = function() {
		nowTime = new Date();
		return nowTime.getHours().toString() + ':' + nowTime.getMinutes().toString() + ':' + nowTime.getSeconds().toString();
	};			

	self.render = function(){
		$('#clock-nowtime').html(self.nowTime());
	}		
	
	self.start = function(){
		timer = setInterval(self.render, 1000);
	}

	self.stop = function(){
		clearInterval(timer);
	}	

	self.alert = function(){
		alert('stop');
	}		
	
	// ------------------------------------------------------------------------------------------ handlers -----------	
	self.onStart = function(){
		self.start();
	}
	
	self.onStop = function(){
		self.stop();
	}	

	self.onAlert = function(){
		self.alert();
	}					
	
	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('click', '#clock-start', self.onStart);
	
	elem.on('click', '#clock-stop', self.onStop);
	
	elem.on('click', '#clock-alert', self.onAlert);
}	