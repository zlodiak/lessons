<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>CSS vertical center using float and clear</title>
<style type="text/css">


	html, body {
		height:100%;
		margin:0;
		padding:0;		
		}

	body {
		background-color:#fc6;
		text-align:center; /* horizontal centering for IE Win quirks */
		}

	#distance { 
		width:100%;
		height:50%;
		background-color: red;
		margin-bottom:-13.75em; /* half of container's height */
		float:left;
		}

	#container {
		margin:0 auto;
		position:relative; /* puts container in front of distance */
		height:27.5em;
		width:45em;
		clear:left;
		background-color:#ff9;
		}



</style>
</head>
<body>

	<div id="distance"></div>
	<div id="container">

			This box stays in the middle of the browser's viewport.<br>
			The content does not disappear when the viewport gets smaller than the box.

	</div>

</body>
</html>