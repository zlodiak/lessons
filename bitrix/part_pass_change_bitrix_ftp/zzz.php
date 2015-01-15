<?php
// require($_SERVER['DOCUMENT_ROOT']."/bitrix/header.php");
// echo $USER->Update(1,array("PASSWORD"=>'Bitrix*123456'));
// echo $USER->LAST_ERROR;
// require($_SERVER['DOCUMENT_ROOT']."/bitrix/footer.php");
?>

<?
require($_SERVER['DOCUMENT_ROOT']."/bitrix/header.php");
// пример динамического добавления текущего пользователя в группу 
// и его дальнейшая переавторизация
global $USER;
$arrGroups_new = array(1,4); // в какие группы хотим добавить
$arrGroups_old = $USER->GetUserGroupArray(); // получим текущие группы
$arrGroups = array_unique(array_merge($arrGroups_old, $arrGroups_new)); // объединим два массива и удалим дубли
$USER->Update($USER->GetID(), array("GROUP_ID" => $arrGroups)); // обновим профайл пользователя в базе
$USER->Authorize($USER->GetID()); // авторизуем

require($_SERVER['DOCUMENT_ROOT']."/bitrix/footer.php");
?>