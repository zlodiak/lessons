<script>
	console.log('hhhhhhh');
</script>

<?php 
$q = 	db_insert('news_tape')
		->fields(array(
			'title' => '1',
			'body' => '1',
			'date' => '1'
		))
		->execute();	
				
echo('complete');				
					
// $link = mysql_connect('localhost', 'root', '');
// if (!$link) {
    // die('������ ����������: ' . mysql_error());
// }
// else{
	// echo '������� �����������';
// }

// $db_selected = mysql_select_db('d7_modules', $link);
// if (!$db_selected) {
    // die ('�� ������� ������� ����: ' . mysql_error());
// }
// else{
	// echo('db select ok');
	
	// $q = mysql_query('insert into `news_tape` values ("", "rr", "rr", "rr")');
	
	// if($q){
		// echo('ok');
	// }
	// else{
		// echo('no'.mysql_error());
	// }
// }
					
				/*	
			$q = '';		
					
			if($q){
				echo('yes');
			}
			else{
				echo('no');
			}*/
?>