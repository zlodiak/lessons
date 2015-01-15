<?php
defined('_JEXEC') or die;

$document = JFactory::getDocument();

$document->addStyleSheet(JURI::root() . "modules/mod_metr/css/styles.css");
?>

<div class="mod_metr_wrap">
	<a href="http://metrika.yandex.ru/add/">
		<img src="<?php JURI::root() ?>modules/mod_metr/images/metr.png" alt="metrika" title="metrika" width="88" height="31" />
	</a>
</div>

