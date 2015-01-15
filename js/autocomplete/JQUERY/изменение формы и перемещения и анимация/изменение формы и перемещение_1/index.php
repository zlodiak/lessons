<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="JavaScript" type="text/javascript" src="js/jquery.json-2.3.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>

<script type="text/javascript">
$(document).ready(function(){


	$(".run").click(function(){
	
		$("#box").animate({opacity: "0.1", left: "+=400"}, 1200)
		.animate({opacity: "0.4", top: "+=160", height: "20", width: "20"}, "slow")
		.animate({opacity: "1", left: "0", height: "100", width: "100"}, "slow")
		.animate({top: "0"}, "fast")
		.slideUp()
		.slideDown("slow")
		return false;
	
	});

});
</script>

<style type="text/css">
body {
	margin: 20px auto;
	padding: 0;
	width: 580px;
	font: 80%/120% Arial, Helvetica, sans-serif;
}
a {
	font-weight: bold;
	color: #000000;
}
#box {
	background: #6699FF;
	height: 100px;
	width: 100px;
	position: relative;
}
</style>
</head>

<body>
<p><a href="#" class="run">Run</a></p>
<div id="box">
</div>
</body>
</html>


