<?php
defined('_JEXEC') or die;

JHtml::_('behavior.framework', true);

$app                = JFactory::getApplication();
$doc				= JFactory::getDocument();
$templateparams     = $app->getTemplate(true)->params;

//echo    '<pre><xmp>'.print_r(get_defined_vars(), true).'</xmp></pre>';
//echo("<hr />");
?>	

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">     
<head>
	<meta charset="utf-8" />
	 <title><?php echo($doc->title); ?> - Joomla Shop</title>
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/styles.css" type="text/css" media="screen,projection" />
</head>
<body>	
	<nav class="nav_top">
		<div class="nav_top_inner">
			<jdoc:include type="modules" name="position-7"  style="none" />		
		</div>
	</nav>
	
	<div class="wrap">		
		<header class="header">
			hh
		</header>
		
		<div class="main">
			<div class="main_inner">
				<div class="content_outer">
					<div class="content">
						<jdoc:include type="modules" name="position-1"  style="none" />		
						
						<jdoc:include type="modules" name="position-2"  style="none" />		
						
						<jdoc:include type="component" />	
					</div>
				</div>
				
				<aside class="aside_right">
					<div class="mod_cart module_block">
						<jdoc:include type="modules" name="position-10"  style="xhtml" />		
					</div>	
					
					<div class="mod_search module_block">
						<jdoc:include type="modules" name="position-9"  style="xhtml" />		
					</div>										
					
					<div class="mod_news module_block">
						<jdoc:include type="modules" name="position-12"  style="xhtml" />		
					</div>							
				</aside>
				
				<aside class="aside_left">
					<nav class="vm_category module_block clearfix">
						<jdoc:include type="modules" name="position-3"  style="xhtml" />		
					</nav>					
					
					<div class="mod_login module_block">
						<jdoc:include type="modules" name="position-4"  style="xhtml" />		
					</div>
					
					<div class="mod_metr module_block">
						<jdoc:include type="modules" name="position-8"  style="xhtml" />		
					</div>					
				</aside>				
			</div>
		</div>
			
		<footer class="footer">
			<div class="footer_inner">
				<jdoc:include type="modules" name="position-6"  style="none" />						
			</div>
		</footer>
	</div>
</body>
</html>