$(document).ready(function(){	
	//.main auto height
	var	main = $('.main'),
		mainContainer = $('.main_container'),
		mainHeight;
		
	mainContainer.each(function(){
		mainHeight = $(this).height();
		
		$('<img class="gradient_line_left" src="images/gradient_line.png" height="' + (mainHeight - 10) + '">').appendTo($(this));
		
		$('<img class="gradient_line_right" src="images/gradient_line.png" height="' + (mainHeight - 10) + '">').appendTo($(this));
	});
});