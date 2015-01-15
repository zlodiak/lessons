function field(){
	//свойства игрового поля	
	var width = 500;
	var height = 400;
	var units = 'px';
	var color = ['cyan', 'green', 'red', 'yellow', 'green', 'orange', 'magenta'];

	//добавим элемент поля
	var place = document.getElementById('wrap');	
	var newNode = document.createElement('div');
	newNode.id = "field";
	newNode.style.background = color[0];
	newNode.style.width = width + units;
	newNode.style.height = height + units;
	newNode.style.position = "relative";	
	place.appendChild(newNode);		
}

function aim(){
	var width, height, x_coord, y_coord;		
	
	//создание элемента цели в dom	
	var place = document.getElementById('field');	
	var newNode = document.createElement('div');
	
	var fieldWidth = document.getElementById('field').offsetWidth;
	var fieldHeight = document.getElementById('field').offsetHeight;			
	
	var aimWidth = aimHeight = random(0, 10);		
	
	newNode.className = "aim";
	newNode.style.width = aimWidth + "px";
	newNode.style.height = aimHeight + "px";	
	newNode.style.position = "absolute";	
	newNode.style.left = random(0, fieldWidth) + 'px';	
	newNode.style.top = random(0, fieldHeight) + 'px';	
	newNode.style.border = "1px solid #000";	
	place.appendChild(newNode);	
		
	this.onclick = function(){
		alert(56);	
	}
}

function addControlElements(){
	var color = ['green', 'red', 'yellow', 'green', 'orange', 'magenta'];
	
	//добавить кнопку смены цвета поля
	var place = document.getElementById('field');	
	var newNode = document.createElement('input');		
	newNode.id = "colorButton";
	newNode.style.position = "absolute";	
	newNode.style.left = '0px';	
	newNode.style.bottom = '-40px';		
	newNode.value = 'Изменить цвет игрового поля';		
	newNode.type = 'button';		
	newNode.style.cursor = 'pointer';		
	newNode.style.width = "250px";
	newNode.style.height = "30px";		
	place.appendChild(newNode);			
	
	//добавить кнопку добавления новой цели	
	var newNode = document.createElement('input');		
	newNode.id = "aimButton";
	newNode.style.position = "absolute";	
	newNode.style.left = '0px';	
	newNode.style.bottom = '-80px';		
	newNode.value = 'Добавить новую цель на поле';		
	newNode.type = 'button';		
	newNode.style.cursor = 'pointer';		
	newNode.style.width = "250px";
	newNode.style.height = "30px";		
	place.appendChild(newNode);		
	
	//событие на клик кнопки смены цвета поля
	document.getElementById('colorButton').onclick = function() {
		place.style.background = color[random(0 , 5)];
	}
	
	//событие на клик кнопки добавления новой цели на поле
	document.getElementById('aimButton').onclick = function() {
		new aim();
	}	
}

function random(min, max)
{
	var res = Math.random() * (max - min) + min;
	res = Math.round(res);
	return res;
}

function fabric(place, newNode, styleArr, attrArr){
	
}

obj = new field();

obj2 = new addControlElements();

