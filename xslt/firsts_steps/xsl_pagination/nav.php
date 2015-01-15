<?php
// Подготавливаем данные и таблицу стилей
$data = new DOMDocument('1.0', 'UTF-8');
$data->load('nav.xml');
$view = new DOMDocument('1.0', 'UTF-8');
$view->load('nav.xsl');

// Создаем XSLT процессор
$xsl = new XSLTProcessor();

// Импортируем таблицу стилей
$xsl->importStyleSheet($view);

// Если в запросе есть номер страницы, то передаем ее шаблону
if (isset($_GET['page'])) {
    $xsl->setParameter('', 'page', $_GET['page']);
}

// Преобразовываем данные и выводим на экран
echo $xsl->transformToXML($data);
?>