<?php

// Change the following to suit your own installation:

	$host = "localhost";
	$database = "autocomplete_demo";
	$user = "root";
	$password = "";
	
//get condition	

	echo('
		<script type="text/javascript">	
			var cond = document.getElementById("search1").val;
			alert(cond);
		</script>		
	');
	

// You don't have touch a thing from here on unless you really want to:

	mysql_connect($host,$user,$password);
	mysql_select_db($database);

	$sql = "SELECT title FROM `songs` WHERE title LIKE '%" . $_POST['search1'] . "%'";
	$rs = mysql_query($sql);
	
?>

<ul>

<? while($data = mysql_fetch_assoc($rs)) { ?>
  <li><? echo stripslashes($data['title']);?></li>
<? } ?>

</ul>
