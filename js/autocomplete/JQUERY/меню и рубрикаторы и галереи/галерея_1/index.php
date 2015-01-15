<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="JavaScript" type="text/javascript" src="js/jquery.json-2.3.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>

<script type="text/javascript">
$(document).ready(function(){

	$("h2").append('<em></em>')

	$(".thumbs a").click(function(){
	
		var largePath = $(this).attr("href");
		var largeAlt = $(this).attr("title");
		
		$("#largeImg").attr({ src: largePath, alt: largeAlt });
		
		$("h2 em").html(" (" + largeAlt + ")"); return false;
	});
	
});
</script>

<style type="text/css">
body {
	margin: 20px auto;
	padding: 0;
	width: 580px;
	font: 75%/120% Arial, Helvetica, sans-serif;
}
h2 {
	font: bold 190%/100% Arial, Helvetica, sans-serif;
	margin: 0 0 .2em;
}
h2 em {
	font: normal 80%/100% Arial, Helvetica, sans-serif;
	color: #999999;
}
#largeImg {
	border: solid 1px #ccc;
	width: 550px;
	height: 400px;
	padding: 5px;
}
.thumbs img {
	border: solid 1px #ccc;
	width: 100px;
	height: 100px;
	padding: 4px;
}
.thumbs img:hover {
	border-color: #FF9900;
}
</style>
</head>

<body>

<h2>Illustrations</h2>

<p><img id="largeImg" src="images/img1-lg.jpg" alt="Large image" /></p>

<p class="thumbs">
	<a href="images/img2-lg.jpg" title="Image 2"><img src="images/img2-thumb.jpg" /></a>
	<a href="images/img3-lg.jpg" title="Image 3"><img src="images/img3-thumb.jpg" /></a>
	<a href="images/img4-lg.jpg" title="Image 4"><img src="images/img4-thumb.jpg" /></a>
	<a href="images/img5-lg.jpg" title="Image 5"><img src="images/img5-thumb.jpg" /></a>
	<a href="images/img6-lg.jpg" title="Image 6"><img src="images/img6-thumb.jpg" /></a>
</p>

</body>
</html>
