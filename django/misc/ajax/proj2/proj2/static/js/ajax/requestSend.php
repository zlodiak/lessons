<?php 
	// echo('<pre>');
	// print_r($_POST);
	// echo('</pre>');
	
	if($_POST['name'] and $_POST['phone']){				
		$name = mb_substr(htmlspecialchars(trim($_POST['name'])), 0, 1000, 'UTF-8');
		$phone = mb_substr(htmlspecialchars(trim($_POST['phone'])), 0, 1000, 'UTF-8');
		
		$mess = ' Заявка от ' . $name . '. Номер телефона: ' . $phone;
		$to = 'a1-29ru@yandex.ru'; 
		$from='avtoskola@avtoskola.ru'; 
		if(mail($to, 'Заявка с сайта Первой Автошколы Архангельска', $mess, 'Content-type: text/plain; charset=utf-8' . "\r\n" . 'From:'.$from)){
			 $response = 'success';
		}
		else{
			$response = 'error';
		}
	} 	
	
	print json_encode($response);	
?>