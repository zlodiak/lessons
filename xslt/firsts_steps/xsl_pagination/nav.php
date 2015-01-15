<?php
// �������������� ������ � ������� ������
$data = new DOMDocument('1.0', 'UTF-8');
$data->load('nav.xml');
$view = new DOMDocument('1.0', 'UTF-8');
$view->load('nav.xsl');

// ������� XSLT ���������
$xsl = new XSLTProcessor();

// ����������� ������� ������
$xsl->importStyleSheet($view);

// ���� � ������� ���� ����� ��������, �� �������� �� �������
if (isset($_GET['page'])) {
    $xsl->setParameter('', 'page', $_GET['page']);
}

// ��������������� ������ � ������� �� �����
echo $xsl->transformToXML($data);
?>