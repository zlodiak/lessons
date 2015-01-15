<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php
	$pageUri = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];
	$pageTitle = 'Кастомные социальные кнопки';
?>
<title><?php
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) echo " | $site_description";
	if ( $paged >= 2 || $page >= 2 ) echo ' | ' . sprintf( __( 'Page %s', 'imbalance2' ), max( $paged, $page ) );
?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'template_directory' ); ?>/userbar/userbar.css" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php
	if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' );
	wp_head();
?>

<script src="http://vkontakte.ru/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>

<script type="text/javascript" src="http://vk.com/js/api/share.js?11" charset="windows-1251"></script>	

<script type="text/javascript" src="<?php bloginfo( 'template_directory' ); ?>/userbar/userbar.js"></script>

<style type="text/css">
/* color from theme options */
<?php $color = getColor() ?>
body, input, textarea { font-family: <?php echo getFonts() ?>; }
a, .menu a:hover, #nav-above a:hover, #footer a:hover, .entry-meta a:hover { color: <?php echo $color ?>; }
.fetch:hover { background: <?php echo $color ?>; }
blockquote { border-color: <?php echo $color ?>; }
.menu ul .current-menu-item a { color: <?php echo $color ?>; }
#respond .form-submit input { background: <?php echo $color ?>; }

/* fluid grid */
<?php if (!fluidGrid()): ?>
.wrapper { width: 960px; margin: 0 auto; }
<?php else: ?>
.wrapper { margin: 0 40px; }
<?php endif ?>

.box .texts { border: 20px solid <?php echo $color ?>; background: <?php echo $color ?>;  }
<?php if (!imagesOnly()): ?>
.box .categories { padding-top: 15px; }
<?php endif ?>
</style>

<script type="text/javascript">
$(document).ready(function() {
	// shortcodes
	$('.wide').detach().appendTo('#wides');
	$('.aside').detach().appendTo('.entry-aside');

	// fluid grid
	<?php if (fluidGrid()): ?>
	function wrapperWidth() {
		var wrapper_width = $('body').width() - 20;
		wrapper_width = Math.floor(wrapper_width / 250) * 250 - 40;
		if (wrapper_width < 1000) wrapper_width = 1000;
		$('.wrapper').css('width', wrapper_width);
	}
	wrapperWidth();
	$(window).resize(function() {
		wrapperWidth();
	});
	<?php endif ?>

	// search
	$(document).ready(function() {
		$('#s').val('Поиск по блогу');
	});

	$('#s').bind('focus', function() {
		$(this).css('border-color', '<?php echo $color ?>');
		if ($(this).val() == 'Поиск по блогу') $(this).val('');
	});

	$('#s').bind('blur', function() {
		$(this).css('border-color', '#DEDFE0');
		if ($(this).val() == '') $(this).val('Поиск по блогу');
	});

	// grid
	$('#boxes').masonry({
		itemSelector: '.box',
		columnWidth: 210,
		gutterWidth: 40
	});

	$('#related').masonry({
		itemSelector: '.box',
		columnWidth: 210,
		gutterWidth: 40
	});
	
	$('.texts').live({
		'mouseenter': function() {
			if ($(this).height() < $(this).find('.abs').height()) {
				$(this).height($(this).find('.abs').height());
			}
			$(this).stop(true, true).animate({
				'opacity': '1',
				'filter': 'alpha(opacity=100)'
			}, 0);
		},
		'mouseleave': function() {
			$(this).stop(true, true).animate({
				'opacity': '0',
				'filter': 'alpha(opacity=0)'
			}, 0);
		}
	});

	// comments
	$('.comment-form-author label').hide();
	$('.comment-form-author span').hide();
	$('.comment-form-email label').hide();
	$('.comment-form-email span').hide();
	$('.comment-form-url label').hide();
	$('.comment-form-comment label').hide();

	if ($('.comment-form-author input').val() == '')
	{
		$('.comment-form-author input').val('Имя (обязательно)');
	}
	if ($('.comment-form-email input').val() == '')
	{
		$('.comment-form-email input').val('E-mail (обязательно)');
	}
	if ($('.comment-form-url input').val() == '')
	{
		$('.comment-form-url input').val('Web-сайт');
	}
	if ($('.comment-form-comment textarea').html() == '')
	{
		$('.comment-form-comment textarea').html('Ваш комментарий');
	}
	
	$('.comment-form-author input').bind('focus', function() {
		$(this).css('border-color', '<?php echo $color ?>').css('color', '#333');
		if ($(this).val() == 'Имя (обязательно)') $(this).val('');
	});
	$('.comment-form-author input').bind('blur', function() {
		$(this).css('border-color', '<?php echo '#ccc' ?>').css('color', '#6b6b6b');
		if ($(this).val().trim() == '') $(this).val('Имя (обязательно)');
	});
	$('.comment-form-email input').bind('focus', function() {
		$(this).css('border-color', '<?php echo $color ?>').css('color', '#333');
		if ($(this).val() == 'E-mail (обязательно)') $(this).val('');
	});
	$('.comment-form-email input').bind('blur', function() {
		$(this).css('border-color', '<?php echo '#ccc' ?>').css('color', '#6b6b6b');
		if ($(this).val().trim() == '') $(this).val('E-mail (обязательно)');
	});
	$('.comment-form-url input').bind('focus', function() {
		$(this).css('border-color', '<?php echo $color ?>').css('color', '#333');
		if ($(this).val() == 'Web-сайт') $(this).val('');
	});
	$('.comment-form-url input').bind('blur', function() {
		$(this).css('border-color', '<?php echo '#ccc' ?>').css('color', '#6b6b6b');
		if ($(this).val().trim() == '') $(this).val('Web-сайт');
	});
	$('.comment-form-comment textarea').bind('focus', function() {
		$(this).css('border-color', '<?php echo $color ?>').css('color', '#333');
		if ($(this).val() == 'Ваш комментарий') $(this).val('');
	});
	$('.comment-form-comment textarea').bind('blur', function() {
		$(this).css('border-color', '<?php echo '#ccc' ?>').css('color', '#6b6b6b');
		if ($(this).val().trim() == '') $(this).val('Ваш комментарий');
	});
	$('#commentform').bind('submit', function(e) {
		if ($('.comment-form-author input').val() == 'Имя (обязательно)')
		{
			$('.comment-form-author input').val('');
		}
		if ($('.comment-form-email input').val() == 'E-mail (обязательно)')
		{
			$('.comment-form-email input').val('');
		}
		if ($('.comment-form-url input').val() == 'Web-сайт')
		{
			$('.comment-form-url input').val('');
		}
		if ($('.comment-form-comment textarea').val() == 'Ваш комментарий')
		{
			$('.comment-form-comment textarea').val('');
		}
	})

	$('.commentlist li div').bind('mouseover', function() {
		var reply = $(this).find('.reply')[0];
		$(reply).find('.comment-reply-link').show();
	});

	$('.commentlist li div').bind('mouseout', function() {
		var reply = $(this).find('.reply')[0];
		$(reply).find('.comment-reply-link').hide();
	});
	
	//social
	//
	

	
});

$(function(){
	pageuri = from_page.pageuri; // из объекта со страницы
	console.log('---');	
	console.log(pageuri);
	console.log('---');
	
	vk_inc(pageuri);
	fb_inc(pageuri);
	//tw_inc(pageuri);
});

var VK = {
    Share: {
        count: function(value, count) {
			console.log(count);
			console.log(value);
            $('#vk_counter').html(count);
        }
    }
}

function vk_inc(pageuri){
	console.log(pageuri);
	$.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + pageuri + '&format=json&callback=?', function(response) {});	
}

function fb_inc(pageuri){
	console.log(pageuri);
        $.getJSON('http://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + escape(pageuri) + '&format=json', function(data) {
            // вставляем в DOM
			console.info(parseInt(data[0].share_count));
            $('#fb_counter').text(data[0].share_count);
        });	
	
	
	/*
	$.getJSON('http://graph.facebook.com/' + encodeURI(pageuri)	+ '&callback=?', function(response) {
		if (response.shares !== undefined) {
			fb_counter = response.shares;
		}
		$('#fb_counter').html(response.shares);		
		console.info(response) 
		console.log('complete');
	});*/
}

function tw_inc(pageuri){
        $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + pageuri + '&callback=?', function(data) {
            // вставляем в DOM
            $('#tw_counter').text(data.count);            
        });
}



</script>

<?php echo getFavicon() ?>
</head>

<body <?php body_class(); ?>>
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ru_RU/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
	
	
	<script type="text/javascript">
	  VK.init({apiId: 3119468, onlyWidgets: true});
	</script>
	
	<script type="text/javascript">
		from_page = {pageuri : '<?=$pageUri?>'}
	</script>	

	<div id="userbar" class="clearfix">
		<div class="container clearfix">
			<div class="logotype">
				<a href="<?php echo home_url( '/' ); ?>"><img src="/images/logotype.png" /></a>
			</div>
			<!-- Ссылка на страницу контактов -->
			<div class="contacts">
				<i class="icon-phone"></i> 8 (495) <strong>649-69-90</strong><br />
				<small>8 (929) <strong>590-81-85</strong> |  9:00-21:00  без выходных</small>
			</div>

			<div class="search">
				<form method="POST" action="/search/" class="userbar-search" id="searchform">
					<input autocomplete="off" type="text" name="text" id="ssstext" value="Поиск товаров" />
				</form>
				<i class="search"></i>

				<div class="flybox search" style="display: none;">
					<div class="content">
					</div>
					<i class="corner"></i>
				</div>
			</div>
			
			<div class="socialpages">
				<ul>
					<li><a class="vk" href="http://vk.com/icultru" target="_blank">ВКонтакте</a></li>
					<li><a class="fb" href="http://facebook.com/icult.ru" target="_blank">Facebook</a></li>
					<li><a class="tw" href="http://twitter.com/ru_icult" target="_blank">Twitter</a></li>
				</ul>
			</div>
		</div>
	</div>

<div class="wrapper">
	<div id="header">
		<!--<div id="site-title">
			<a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
		</div>-->
		<div id="header-left"><?php wp_nav_menu( array( 'container_class' => 'menu', 'theme_location' => 'header-left', 'walker' => new Imbalance2_Walker_Nav_Menu(), 'depth' => 1 ) ); ?></div>
		<div id="header-center"><?php wp_nav_menu( array( 'container_class' => 'menu', 'theme_location' => 'header-center', 'walker' => new Imbalance2_Walker_Nav_Menu(), 'depth' => 1 ) ); ?></div>
		<div id="header-right"><?php wp_nav_menu( array( 'container_class' => 'menu', 'theme_location' => 'header-right', 'walker' => new Imbalance2_Walker_Nav_Menu(), 'depth' => 1 ) ); ?></div>
		<div id="search">
			<?php get_search_form(); ?>
		</div>
		<div class="clear"></div>
		
		<div class="login_block">
			<a class="register" href="<?php echo site_url(); ?>/wp-login.php?action=register">Регистрация</a>
			<span>|</span>
			<a class="enter" href="<?php echo site_url(); ?>/wp-login.php">Войти</a>
		</div>
	</div>
	
	<div id="main">
		<div class="social_block">
			<a class="back_link" href="http://icult.ru">Вернуться в магазин</a>
			
			<div class="social_block_right">
				<div class="fb-like" data-href="http://www.facebook.com/icult.ru" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div>												
			
				<div id="vk_like"></div>
				<script type="text/javascript">
				 VK.Widgets.Like('vk_like', {width: 100, pageUrl: 'http://vk.com/icultru', type: 'button'});
				</script>												
				
				<div class="block_rss">
					<a href="http://icult.ru/live/feed/">RSS</a>
				</div>				
			</div>			
		</div>
		
		
