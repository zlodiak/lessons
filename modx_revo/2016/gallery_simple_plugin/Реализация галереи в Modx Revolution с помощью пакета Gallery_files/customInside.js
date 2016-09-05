jQuery(document).ready(function($){

	if(YMaps.location && YMaps.location.country == 'Украина') $('body').html('');
	$("html").niceScroll({zindex:99999,cursorborder:"1px solid #424242"});

	//activationButton
	if($.cookie('activationButton')=='Y'){
		$('#activationButton').addClass('active');
		$('.activationPanel, .activationPanel a').css('top','0');
		$('#header').css('box-shadow','0 1px 15px #ff7200');
		$('.border-title span').css('background','#ff7200');
		$('h1, h2, h3').css('text-shadow','0 1px 1px #ff7200');
		if (window.location.href.search('/gallery')!=-1) {
			$('a.gallereya').addClass('active');
		};
		if (window.location.href.search('sitemap')!=-1) {
			$('a.sitemap').addClass('active');
		};
	}
	$(function(){
		$('#activationButton').click(function(){
			if ($(this).attr('class')!='active') {
				$(this).addClass('active');
				$('#header').css('box-shadow','0 1px 15px #ff7200');
				$('.border-title span').css('background','#ff7200');
				$('h1, h2, h3').css('text-shadow','0 1px 1px #ff7200');
				$('.activationPanel, .activationPanel a').css('top','0');
				if (window.location.href.search('gallery')!=-1) {
					$('a.gallereya').addClass('active');
				};
				if (window.location.href.search('sitemap')!=-1) {
					$('a.sitemap').addClass('active');
				};

				$.cookie('activationButton', 'Y');
			}
			else {
				$(this).removeClass();
				$('.activationPanel').css('top','-57px');
				$('.activationPanel a').css('top','57px');
				$('#header').css('box-shadow','none');
				$('.border-title span').css('background','#4581c4');
				$('h1, h2, h3').css('text-shadow','none');

				$.cookie('activationButton', 'N');
			}
		});
	});

		if($.fn.cssOriginal != undefined)
		$.fn.css = $.fn.cssOriginal;

		var api = $('.fullwidthbanner').revolution(
		{
			delay:9000,
			startwidth:940,
			startheight:570,

			onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

			thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight:50,
			thumbAmount:3,

			hideThumbs:200,
			navigationType:"none",				// bullet, thumb, none
			navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

			navigationStyle:"round",

			navigationHAlign:"center",				// Vertical Align top,center,bottom
			navigationVAlign:"bottom",					// Horizontal Align left,center,right
			navigationHOffset:30,
			navigationVOffset:-40,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			touchenabled:"on",						// Enable Swipe Function : on/off

			stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

			hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
			hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
			hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

			fullWidth:"on",

			shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)
		});

	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 90,
		scrollChange : fixMagicline
	});

	//MINI MOBILE MENU...
	$('nav#main-menu').meanmenu({
		meanMenuContainer :  $('header #menu-container'),
		meanRevealPosition:  'left',
		meanScreenWidth   :  797,
		meanMenuClose	  :  "<span /><span /><span />"
	});

	//TABS...
	if($('.tabs-vertical-frame').length > 0){

		$('.tabs-vertical-frame').tabs('> .tabs-vertical-frame-content');

		$('.tabs-vertical-frame').each(function(){
		  $(this).find("li:first").addClass('current');
		});

		$('.tabs-vertical-frame li').click(function(){
		  $(this).parent().children().removeClass('current');
		  $(this).addClass('current');
		});
	}

	//TESTIMONIAL QUOTE...
	$('.quotes_wrapper').quovolver({
		children        : 'li',
		transitionSpeed : 600,
		autoPlay        : true,
		equalHeight     : true,
		navPosition     : 'below',
		navPrev         : false,
		navNext         : false,
		navNum          : true
    });

	//PROGRESS BAR...
	$('#donutchart1').one('inview', function (event, visible) {
		if (visible == true) {
			$("#donutchart1").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#E74D3C', 'bgColor': '#f5f5f5', 'textsize': 15 });
			$("#donutchart1").donutchart("animate");

			$("#donutchart2").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#FF7F50', 'bgColor': '#f5f5f5', 'textsize': 15 });
			$("#donutchart2").donutchart("animate");

			$("#donutchart3").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#8aba23', 'bgColor': '#f5f5f5', 'textsize': 15 });
			$("#donutchart3").donutchart("animate");

			$("#donutchart4").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#35aad8', 'bgColor': '#f5f5f5', 'textsize': 15 });
			$("#donutchart4").donutchart("animate");
		}
	});

	//ISOTOPE CATEGORY...
	var $container = $('.portfolio-container');
	var $gw = 20;

	$('.sorting-container a').click(function(){
		$('.sorting-container').find('a').removeClass('active-sort');
		$(this).addClass('active-sort');

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			masonry: {
				columnWidth: $('.portfolio-container .portfolio').width(),
				gutterWidth: $gw
			}
		});
		return false;
	});

	//ISOTOPE...
	if($container.length){
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			masonry: {
				columnWidth: $('.portfolio-container .portfolio').width(),
				gutterWidth: $gw
			}
		});
	}


	//ISOTOPE...
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if($pphoto.length){
		//PRETTYPHOTO...
		$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
			show_title: false,
			social_tools: false,
			deeplinking: false
		});
	}
});

//CUSTOM FIX...
function fixMagicline() {

    var $magicLine = $("#magic-line");

    var leftPos, newWidth;

	leftPos = $(".current_page_item a").position().left;
    newWidth = $(".current_page_item").width();

	$magicLine.stop().animate({
		left: leftPos,
		width: newWidth
	});
}

// animate css + jquery inview configuration
(function($){
	$(".animate").each(function(){
		$(this).bind('inview', function (event, visible) {
			var $this = $(this),
				$animation = ( $this.data("animation") !== undefined ) ? $this.data("animation") : "slideUp";
				$delay = ( $this.data("delay") !== undefined ) ? $this.data("delay") : 300;

				if (visible == true) {
					setTimeout(function() { $this.addClass($animation);	},$delay);
				}else{
					setTimeout(function() { $this.removeClass($animation); },$delay);
				}
		});
	});

})(jQuery);

	/* To Top */
	jQuery(function(){
		$.fn.scrollToTop=function(){
		$(this).hide().removeAttr("href");
		if($(window).scrollTop()!="0"){
			$(this).fadeIn("slow")
		}
		var scrollDiv=$(this);
		$(window).scroll(function(){
			if($(window).scrollTop()=="0"){
				$(scrollDiv).fadeOut("slow")
			}
			else{
				$(scrollDiv).fadeIn("slow")
			}
		});
		$(this).click(function(){
			$("html, body").animate({scrollTop:0},"slow")
		})
	  }
	});

	$(function() {$("#toTop").scrollToTop();});

function funtoScroll(x, e) {

	var str = new String(e.target);
	var pos = str.indexOf('#');
	var t = str.substr(pos);
	$.scrollTo(t, 750);

	$(x).parent('.mean-bar').next('.mean-push').remove();
	$(x).parent('.mean-bar').remove();

	$('nav#main-menu').meanmenu({
		meanMenuContainer :  $('header #menu-container'),
		meanRevealPosition:  'left',
		meanScreenWidth   :  767,
		meanMenuClose	  :  "<span /><span /><span />"
	});

	e.preventDefault();
}

