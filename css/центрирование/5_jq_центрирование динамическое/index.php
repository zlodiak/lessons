<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>�������������� � ������������ ������������ �� ������ ��� ������ jquery</title>

<link rel="stylesheet" type="text/css" href="styles.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

<!-- Centering className both horizontally and vertically with jQuery: -->

<script type="text/javascript">
$(document).ready(function(){
						   
	$(window).resize(function(){

		$('.className').css({
			position:'absolute',
			left: ($(window).width() - $('.className').outerWidth())/2,
			top: ($(window).height() - $('.className').outerHeight())/2
		});
		
	});
	// To initially run the function:
	$(window).resize();

});
</script>

</head>

<body id="exampleBody">

<div class="className">
	<p>������������ �� ������ �������� � ������� jQuery</p>
</div>

</body>
</html>
