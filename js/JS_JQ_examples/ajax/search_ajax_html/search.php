<?php
	$hostname = 'localhost';
	$username = 'root';
	$password = '';
	 
	// ������������ � ������� MySQL
	$db = mysql_connect($hostname, $username, $password)
			or die('connect to database failed');
	 

	 
	// �������� ������ ��
	mysql_select_db('simpla4') or die('db not found');

	$searchq = $_POST['name'];

	$q = 'SELECT * FROM `s_products` WHERE `name` LIKE "%'.addslashes($searchq).'%"';
	$getName = mysql_query($q);
	
	echo($q . '<hr />');

	while ($row = mysql_fetch_array($getName)){
		echo $row['name'] . '<br/>';
	}

	mysql_close($db);	
?>