var overlay_hide = function () {
    $('#imgdiv').remove();
    $('#fadediv').remove();
}
var overlay_show = function() {
    var fadediv = $('<div id="fadediv" />');
    fadediv.css({
	'position': 'fixed',
	'top': 0,
	'left': 0,
	'width': '100%',
	'height': '100%',
	'min-height': '100%',
	'background-color':'#252525',
	'filter': 'alpha(opacity=80)',
	'opacity': 0.8,
	'text-align' : 'center',
	'z-index':9998
    });
    // window dimensions
    var bodywidth = parseInt($('body').css('width'));
    var bodyheight = parseInt($(window).height());
    var imgdiv = $('<div id="imgdiv" />');
    // Big picture dimensions
    var width = '600';
    var height = '400';
    imgdiv.css({
	'position': 'fixed',
	'top': parseInt((parseInt(bodyheight)-parseInt(height))/2),
	'left': parseInt((parseInt(bodywidth)-parseInt(width))/2),
	'width': width+'px',
	'height': height+'px',
	'z-index':9999
    });
    // Getting filename for big picture
    var src = $(this).attr('src');
    src = src.replace('_small.jpg', '.jpg');
    $(imgdiv).html('<img src="'+src+'" />');
    $(fadediv).click(overlay_hide).appendTo('body');
    $(imgdiv).click(overlay_hide).appendTo('body');
}
$(document).ready(function(){
    $(".pics").click(overlay_show);
});
