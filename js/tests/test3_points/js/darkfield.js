var Field = {
	init: function(backgroundColor, width, height, units, left, top){		
		this.background = ['lime', 'magenta', 'red', 'blue', 'orange', 'cyan'];
		this.backgroundColor = backgroundColor?backgroundColor:0;
		this.width = width?width:500;
		this.height = height?height:500;
		this.units = units?units:'px';
		this.left = left?left:0;
		this.top = top?top:0;		
		
		//this.fieldRender();		
	},

	
	fieldRender: function() {
		var elem = document.getElementById('wrap');
		var newNode = document.createElement('div');
		newNode.id = "field";
		newNode.style.background = this.background[this.backgroundColor];
		newNode.style.width = this.width + this.units;
		newNode.style.height = this.height + this.units;
		newNode.style.position = "absolute";	
		newNode.style.left = this.left + this.units;
		newNode.style.top = this.top + this.units;		
		elem.appendChild(newNode);			
	},
	
	changeBackground: function(el, bg){		
		var self = this;		
		var elem = document.getElementById(el);
		var bg = bg?bg:0;
		elem.onclick = function(){			
			elem.style.backgroundColor = self.background[bg];	
			
			Aim.init(5, 10, 10, 'px', 100, 100);
			Aim.fieldRender();
			Aim.changeBackground('field', 1);								
		}
	}
}

Field.init(2, 500, 500, 'px', 0, 0);
Field.fieldRender();
Field.changeBackground('field', 4);

var Aim = {
	init: function(backgroundColor, width, height, units){		
		this.background = ['lime', 'magenta', 'red', 'blue', 'orange', 'cyan'];
		this.backgroundColor = backgroundColor?backgroundColor:0;
		this.width = width?width:500;
		this.height = height?height:500;
		this.units = units?units:'px';
		this.left = (this.random(0, 480) + 10);
		this.top = (this.random(0, 480) + 10);							
	},

	
	fieldRender: function() {
		var elem = document.getElementById('field');
		var newNode = document.createElement('div');
		newNode.id = "aim";
		newNode.style.background = this.background[this.backgroundColor];
		newNode.style.width = this.width + this.units;
		newNode.style.height = this.height + this.units;
		newNode.style.position = "absolute";	
		newNode.style.left = this.left + this.units;
		newNode.style.top = this.top + this.units;		
		elem.appendChild(newNode);	
		console.log(45);		
	},
	
	changeBackground: function(el, bg){		
		var self = this;		
		var elem = document.getElementById(el);
		var bg = bg?bg:0;
		elem.onclick = function(){			
			elem.style.backgroundColor = self.background[bg];						
		}
	},
	
	random: function(min, max)
	{
		var res = Math.random() * (max - min) + min;
		res = Math.round(res);
		return res;
	}
}


