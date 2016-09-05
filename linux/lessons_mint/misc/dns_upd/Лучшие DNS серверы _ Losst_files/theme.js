( function( $ ) {
	// Responsive videos
	var $all_videos = $( '.entry-content' ).find( 'iframe[src*="player.vimeo.com"], iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"], iframe[src*="dailymotion.com"],iframe[src*="kickstarter.com"][src*="video.html"], object, embed' ),
		$window = $(window),
		$more_site = $( '#more-site' ),
		$card = $( '.title-card' ),
		window_height, window_width,
		is_rtl = ( $( 'body' ).hasClass( 'rtl' ) ) ? false : true;

	$all_videos.not( 'object object' ).each( function() {
		var $video = $(this);

		if ( $video.parents( 'object' ).length )
			return;

		if ( ! $video.prop( 'id' ) )
			$video.attr( 'id', 'rvw' + Math.floor( Math.random() * 999999 ) );

		$video
			.wrap( '<div class="responsive-video-wrapper" style="padding-top: ' + ( $video.attr( 'height' ) / $video.attr( 'width' ) * 100 ) + '%" />' )
			.removeAttr( 'height' )
			.removeAttr( 'width' );
	} );
	
	// Image anchor
	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	} );
  if(window.innerWidth < 800) {
  	$('#pageup').hide();
  }
  $('#menu-kategorii li').hover(function () {
     clearTimeout($.data(this,'timer'));
     $('ul',this).stop(true,true).slideDown(200);
  }, function () {
    $.data(this,'timer', setTimeout($.proxy(function() {
      $('ul',this).stop(true,true).slideUp(200);
    }, this), 100));
  });
        $(document).ready(function() {
            $('a#hide').click(function(e){        
                $("nav.navbar-fixed-top").autoHidingNavbar();
		$('.navbar-fixed-top').autoHidingNavbar('hide');
            });
        })

	$(document).ready(function() {
            $('#pageup').click(function(e){
            	$('html, body').animate({scrollTop: 0},800);
	    });

            $('#pagedown').click(function(e){
                $('html, body').animate({scrollTop: $(document).height()},800);
            });

        if (window.innerWidth > 800) {
	   window.onscroll = function () {
		if ( $(window).scrollTop() > 0 ) {
		$('#pageup').show(400);
		} else {
		$('#pageup').hide(400);
		}
		 if ( $(window).scrollTop() < ($(document).height() - $(window).height() ) ) {
			$('#pagedown').show(400);
		}else{
			 $('#pagedown').hide(400);
		}
	};
        }else{
           $('#pageup').hide();
           $('#pagedown').hide();
        } 
	});
    $(window).scroll(function(){
        var bottomOffset = 2000; 
        var data = {
            'action': 'loadmore',
            'query': true_posts,
            'page' : current_page
        };
        if( $(document).scrollTop() > ($(document).height() - bottomOffset) && !$('body').hasClass('loading')){
            $.ajax({
                url:ajaxurl,
                data:data,
                type:'POST',
                beforeSend: function( xhr){
                    $('body').addClass('loading');
                },
                success:function(data){
                    if( data ) { 
                        $('#load_more_gs').before(data);
			$('body').removeClass('loading');
			window.onscroll();
                        current_page++;
                    }
                    else {
                    $('#load_more_gs').remove();
                }
                }
            });
        }
    });
// Shortcode
	if ( theme_js_vars.carousel ) {
		var autoplay = ( theme_js_vars.autoplay ) ? '' : 'pause';
		$( '.carousel' ).carousel( autoplay );
	}

	if ( theme_js_vars.tooltip )
		$( 'a[rel="tooltip"]' ).tooltip();

	if ( theme_js_vars.tabs ) {
		$( '.nav-tabs a' ).click( function(e) {
			e.preventDefault();
			$(this).tab( 'show' );
		} );
	}

    // Arc the site title
    if ( 0 != theme_js_vars.arc )
        $( '#site-title a' ).arctext( {
        	radius: theme_js_vars.arc,
        	rotate: is_rtl,
        	fitText	: theme_js_vars.fittext
        } );
    // Set up jumbo header image
    if ( $card.length ) {
        $window
            .on( 'resize.title-card', function() {
                window_width = $window.width();
				window_height = ( $( 'body' ).hasClass( 'admin-bar' ) ) ? $window.height() - 32 : $window.height();
				if ( window_width < 599 || ! $( 'body' ).hasClass( 'home' ) || ( $( 'body' ).hasClass( 'home' ) && $( 'body' ).hasClass( 'paged' ) ) ) {
					$card.css( 'height', 300 );
					$more_site.removeData( 'scroll-to' ).attr( 'data-scroll-to', 300 );
				} else {
					$card.css( 'height', 300 );
					$more_site.removeData( 'scroll-to' ).attr( 'data-scroll-to', 300 );
				}
			} )
			.trigger( 'resize.title-card' )
			.scroll( function () {
				if ( $window.scrollTop() >= ( $more_site.data( 'scroll-to' ) - 50 ) )
					$( '#site-navigation' ).addClass( 'black' );
				else
					$( '#site-navigation' ).removeClass( 'black' );
			} );

        $card.fillsize( '> img.header-img' );
	}

    // Scroll past jumbo header image
	$more_site.click( function() {
		$( 'html, body' ).animate( { scrollTop: ( $more_site.data( 'scroll-to' ) - 50 ) }, 'slow', 'swing' );
	} );
} )( jQuery );
