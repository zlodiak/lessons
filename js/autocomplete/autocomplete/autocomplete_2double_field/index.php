<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Autocomplete demonstration</title>
	
	<script type="text/javascript" src="javascripts/prototype.js"></script>
	<script type="text/javascript" src="javascripts/effects.js"></script>
	<script type="text/javascript" src="javascripts/controls.js"></script>
	
	<style>
	body {font-family: verdana; arial, sans-serif; font-size: 12px; }
	#search, ul { padding: 3px; width: 150px; border: 1px solid #999; font-family: verdana; arial, sans-serif; font-size: 12px;}
	#search1, ul { padding: 3px; width: 150px; border: 1px solid #999; font-family: verdana; arial, sans-serif; font-size: 12px;}
	ul { list-style-type: none; font-family: verdana; arial, sans-serif; font-size: 12px;  margin: 5px 0 0 0}
	li { margin: 0 0 5px 0; cursor: default; color: red;}
	li:hover { background: #ffc; }
	</style>		
</head>

<body>	
	<div>
		<label>group</label> <input type="text" id="search" name="search" />
	</div>
		
	<div id="hint"></div>	
	
	<hr />
	
	<div>
		<label>song</label> <input type="text" id="search1" name="search1" />
	</div>
		
	<div id="hint1"></div>	
	
	
	
	<script type="text/javascript">	
		new Ajax.Autocompleter("search","hint","server.php");
		new Ajax.Autocompleter("search1","hint1","server1.php");
	</script>
</body>
</html>
