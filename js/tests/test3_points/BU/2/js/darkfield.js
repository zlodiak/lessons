window.onload = function(){
	var color = ['cyan', 'green', 'red', 'yellow', 'green', 'orange', 'magenta'];
	var score = 0;
	var lastColor;
	var colorArr =[];
	var time = 60;
	
	$('.timer .value').text(time)	
	setInterval(timer, 1000) 
		
	function timer(){		
		$('.timer .value').text(time--);
		//console.log($('.timer .value').text());
		if($('.timer .value').text() <= 0 ){

			alert('Игра закончена. Вы набрали ' + score  + ' очков. Нажмите OK для начало новой игры.');			
			window.top.document.location.reload();
		}		
	}
	
	$('.score .value').text(0);		
	
	$('.btn_field_color').click(function(){
		//console.log(random(0, 5));
		$('.field').css('background', color[random(0, 5)]);
	});
	
	$('.btn_new_game').click(function(){
		if(confirm('Вы уверены, что хотите прекратить эту игру и начать новую? Данные этой игры сохранены не будут.')){
		window.top.document.location.reload();
		}else{
			alert('Нефиг тогда нажимать куда попало кривыми руками');
		}
	});
	
	$('.btn_aim_add').click(function(){
				addAim();
	});
	
	function addAim(){
		$('.field').append('<div class="aim">' + random(0, 9) + '</div>');
		 
		 r = random(9, 20);		 
		 $('.field .aim').last().css({
			'width': r,
			'height': r,
			'border': '1px solid #000',
			'z-index': '10',
			'cursor': 'pointer',
			'line-height': r/7,
			'background': color[random(0, 5)],
			'position': 'absolute',
			'left': random(0, 460) + 10,
			'top': random(0, 460) + 10
		 });			
	}
	
	$('.aim').live('click', function(){							
		c = $(this).css('background-color');
		v = $(this).text();
		(c == colorArr[0])?score -= 20:score += Number(v);
		$('.score .value').text(score);	
		
		if(v == 0){
			for(i=0; i<20; i++){
				addAim();
			}			
		}
		
		colorArr.push(c);
		if(colorArr.length>2){
			colorArr.shift();
		}
		$(this).remove();	
		
		if(random(0, 1) == 0){
			$('.field').css('background', color[random(0, 5)]);			
		}		
	});
}		
		
function random(min, max)
{
	var res = Math.random() * (max - min) + min;
	res = Math.round(res);
	//console.log(res);
	return res;
}		

