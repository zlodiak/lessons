$(document).ready(function( ) {
	$('.otvet').hide();
	$('#block_vopros h2').toggle(
		function() {
			$(this).next('.otvet').slideDown(700,'swing');
			$(this).addClass('close_otvet');
		},
		function() {
			$(this).next('.otvet').slideUp(500,'linear');
			$(this).removeClass('close_otvet');
	  }
	);
});