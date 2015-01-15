<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>CSS vertical center using float and clear</title>
<style type="text/css">


body {
font-family: Verdana, Helvetica, Arial, sans-serif;
font-size: 90%;
margin: 0; 
padding: 0; }


#content {
width: 779px;
margin-left: auto;
margin-right: auto;
}

#content img {
float: left;
padding-right: 8px;
margin-bottom: 25px; 
 }

#content p {
	float: left;
width: 263px;
margin-bottom: 25px;
margin-top: 0;
padding-right: 8px; }

.clearboth {
clear: both;
height: 1px; }

</style>

</head>
<body>

<div id="content">

	<img src="images/afternoonlight.jpg" />
	<p>The view from my office window is humble, but sometimes the late afternoon light just glows.</p>
	<img src="images/balloons.jpg" />
	<p>An arc of balloons, on Highland, just near the intersection with Hollywood Boulevard.</p>	
	<div class="clearboth"></div>
	
	
	<img src="images/redgrapefruit.jpg" />
	<p>Red grapefruit are so seductive in their color, yet just as bitter as their yellow counterparts in taste.</p>
	<img src="images/chance.jpg" />
	<p>I've always been one for the classics in the scent department, but of late I've found myself branching out a bit, and I'm more than happy with some of my discoveries.</p>
	<div class="clearboth"></div>
		
</div>

</body>
</html>