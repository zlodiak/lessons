<?php
	$aRes = array(
		'name' => 'Andrewqqq', 
		'name2' => 'Andrewqqq', 
		'nickname' => 'Aramisqqq'
	);
	
	foreach($aRes as $key => $val){
		$res[] = $key;
	}


	
	print json_encode($res);
	

?>