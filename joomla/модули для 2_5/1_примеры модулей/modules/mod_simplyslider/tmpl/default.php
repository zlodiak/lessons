<?php
/**
 * @version		$Id: default.php 1 Aug 23, 2011 10:26:51 AM Thomas $
 * @package		BTShowcase
 * @copyright	Copyright (C) 2011 Bow Themes. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$document = JFactory::getDocument();

$script="
	$(window).load(function() {
		$('#slider').nivoSlider({
			effect: '" . $params->get('effect') . "',
			directionNav: " . $params->get('navigation') . ",
			pauseTime: '" . $params->get('time-interval') . "'
		});
		$('#wrapper').css({width: '" . $params->get('width') . "px', height: '" . $params->get('height') . "px'});
	});
";

$document->addStyleSheet(JURI::root() . "modules/mod_simplyslider/css/styles.css");

if($params->get('jquery')){
	$document->addScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
}
$document->addScript(JURI::root() . "modules/mod_simplyslider/js/jquery.nivo.slider.pack.js");
//$document->addScript(JURI::root() . "modules/mod_simplyslider/js/helper.js");
$document->addScriptDeclaration($script);

//echo(JURI::root() . '<hr />');
//echo($document->title . '<hr />');
?>

<div id="wrapper">	
	<div class="slider-wrapper theme-default">
		<div id="slider" class="nivoSlider">
			<a href="http://<?php echo($params->get('slide_link_1')); ?>"><img src="<?php echo(JURI::root() . $params->get('slide_image_1')); ?>" alt="Slide" title="<?php echo($params->get('slide_title_1')); ?>" width="<?php echo($params->get('width')); ?>" height="<?php echo($params->get('height')); ?>" /></a>
			<a href="http://<?php echo($params->get('slide_link_2')); ?>"><img src="<?php echo(JURI::root() . $params->get('slide_image_2')); ?>" alt="Slide" title="<?php echo($params->get('slide_title_2')); ?>" width="<?php echo($params->get('width')); ?>" height="<?php echo($params->get('height')); ?>" /></a>
			<a href="http://<?php echo($params->get('slide_link_3')); ?>"><img src="<?php echo(JURI::root() . $params->get('slide_image_3')); ?>" alt="Slide" title="<?php echo($params->get('slide_title_3')); ?>" width="<?php echo($params->get('width')); ?>" height="<?php echo($params->get('height')); ?>" /></a>
			<a href="http://<?php echo($params->get('slide_link_4')); ?>"><img src="<?php echo(JURI::root() . $params->get('slide_image_4')); ?>" alt="Slide" title="<?php echo($params->get('slide_title_4')); ?>" width="<?php echo($params->get('width')); ?>" height="<?php echo($params->get('height')); ?>" /></a>
		</div>
		
		<div id="htmlcaption" class="nivo-html-caption">
			<strong>This</strong> is an example of a <em>HTML</em> caption with <a href="#">a link</a>. 
		</div>
	</div>
</div>
