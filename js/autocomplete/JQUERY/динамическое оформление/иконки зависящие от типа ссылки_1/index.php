<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="JavaScript" type="text/javascript" src="js/jquery.json-2.3.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>

<script type="text/javascript">
$(document).ready(function(){

	$("a[href$=pdf]").addClass("pdf");

	$("a[href$=zip]").addClass("zip");

	$("a[href$=psd]").addClass("psd");
	
	$("a:not([href*=http://www.webdesignerwall.com])").not("[href^=#]")
		.addClass("external")
		.attr({ target: "_blank" });

});
</script>

<style type="text/css">
body {
	margin: 10px auto;
	width: 570px;
	font: 75%/120% Arial, Helvetica, sans-serif;
	color: #999999;
}
a {
	color:#333399;
}
a:hover {
	text-decoration: none;
}
a.pdf {
	background: url(images/file-red.gif) no-repeat;
	padding-left: 16px;
}
a.zip {
	background: url(images/file-orange.gif) no-repeat;
	padding-left: 16px;
}
a.psd {
	background: url(images/file-blue.gif) no-repeat;
	padding-left: 16px;
}
a.external {
	background: url(images/window.gif) no-repeat;
	padding-left: 16px;
}
</style>
</head>

<body>
<p>
	<p><a href="http://www.webdesignerwall.com/file/wdw-logo.pdf">PDF file</a> (wdw-logo.pdf)</p>
	<p><a href="http://www.webdesignerwall.com/file/wdw-logo.psd">PSD file</a> (wdw-logo.psd)</p>
	<p><a href="http://www.webdesignerwall.com/file/wdw-logo.zip">Zip file</a> (wdw-logo.zip)</p>

	<p><a href="#anchor">#anchor link</a> (#anchor)</p>
	<p><a href="http://bestwebgallery.com">Best Web Gallery</a> (http://bestwebgallery.com)</p>
	<p><a href="http://www.ndesign-studio.com">N.Design Studio</a> (http://www.ndesign-studio.com)</p>
	<p><a href="http://www.webdesignerwall.com">Back to Web Designer Wall</a> (http://www.webdesignerwall.com)</p>
</p>
</body>
</html>
