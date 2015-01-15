$(document).ready(function () {
    $('a.menu_class').click(function () {
	$('div#login-form').slideToggle('normal');
    });
});