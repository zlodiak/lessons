<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="JavaScript" type="text/javascript" src="js/jquery.json-2.3.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>

<script type="text/javascript">
$(document).ready(function(){

	$(".menu2 a").append("<em></em>");
	
	$(".menu2 a").hover(function() {
		$(this).find("em").stop(true, true).animate({opacity: "show", top: "-75"}, "slow");
		var hoverText = $(this).attr("title");
	    $(this).find("em").text(hoverText);
	}, function() {
		$(this).find("em").stop(true, true).animate({opacity: "hide", top: "-85"}, "fast");
	});


});
</script>

<style type="text/css">
body {
	margin: 10px auto;
	width: 570px;
	font: 80%/120% Arial, Helvetica, sans-serif;
}
.menu2 {
	margin: 100px 0 0;
	padding: 0;
	list-style: none;
}
.menu2 li {
	padding: 0;
	margin: 0 2px;
	float: left;
	position: relative;
	text-align: center;
}
.menu2 a {
	padding: 14px 10px;
	display: block;
	color: #000000;
	width: 144px;
	text-decoration: none;
	font-weight: bold;
	background: url(images/button.gif) no-repeat center center;
}
.menu2 li em {
	font-weight: normal;
	background: url(images/hover.png) no-repeat;
	width: 180px;
	height: 45px;
	position: absolute;
	top: -85px;
	left: -15px;
	text-align: center;
	padding: 20px 12px 10px;
	font-style: normal;
	z-index: 2;
	display: none;
}
</style>
</head>

<body>
<ul class="menu2">
	<li>
		<a href="http://anton.shevchuk.name" title="Go to homepage">Home</a>		
	</li>
	<li>
		<a href="http://anton.shevchuk.name/about/" title="Find out who I am">About</a>
	</li>
	<li>
		<a href="http://feeds.feedburner.com/AntonShevchuk" title="Subscribe RSS feeds">Subscribe RSS</a>
	</li>
</ul>
</body>
</html>

