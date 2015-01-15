// ---------------------------------------------------------------------------------------------- WIDJET kalininFormCheck IMPLEMENTATION------------
function KalininFormCheck(options) {
	// ------------------------------------------------------------------------------------------ properties ----------	
	var	self = this;
	
	var elem = options.elem;
	
	var	data = {
		fld_name_form: '',
		fld_phone_form: 34344456456,
		fld_email_form: 'prozaik81-2@yandex.ru',
		fld_site_form: 'http://www.microsoft.com',
		fld_comments_form: 'делаем что-то с элементом element, у которого индекс index',
	}
	
	var	config = {
		fld_name_form: 'isNotEmpty',
		fld_phone_form: 'isNumber',
		fld_email_form: 'isNotEmpty',
		fld_site_form: 'isNotEmpty',
		fld_comments_form: 'isNotEmpty',
	}
	
	var	messages = [];

	
	// ------------------------------------------------------------------------------------------ methods ------------			
	function isNotEmpty(value){
		console.log(111); 
		
		if(value.length == 0){
			return false;
		}
		
		return true;
	}

	function isNumber(value){
		console.log(111); 
			
		if(typeof(value) == 'number'){
			return false;
		}
		
		return true;
	}	
	
	function checkStart(){
		for (key in data) {
		  // console.log(data[key]);
		  // console.log(config[key]);
		  // console.log('-----');
			var checker = config[key],
				value = data[key];
		  
			if(!checker){
				console.log(1);
			}
			else{
				console.log(2);
			}
		}

		
	}
	
	// ------------------------------------------------------------------------------------------ handlers -----------		
	function onSubmit(){	
		checkStart();
	
		return false;
	}

	// ------------------------------------------------------------------------------------------ events -------------	
	elem.on('submit', onSubmit);
}	


