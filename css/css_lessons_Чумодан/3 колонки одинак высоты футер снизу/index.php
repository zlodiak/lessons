<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Three Column Liquid Layout</title>
	<style type="text/css">
html {
	overflow: auto;
	background: #800000;
}

html:not(:nth-child(1)) { overflow: visible; }

html, body {
	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
	height: 100%;
}

body {
	font: 14px/120% Verdana, Tahoma, Arial, Helvetica, sans-serif;
	position: relative;
	min-width: 640px;
	width: 90%;
	margin: 0 auto;
}

#header {
	height: 3em;
	background: red;
	color: #FFF;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1000;
	left: 0;
}

.column {
	padding-top: 3em !important;
}

#container {
	padding-left: 220px;
	padding-right: 200px;
	overflow: hidden;
	float: left; /* IE 5.01 */
	float/**/: none;
	height: auto !important;
	height: 100%;
	min-height: 100%;
	background: lime;
	position: relative;
}

* html #container { overflow: visible; }

#left, #right, #content {
	float: left;
	position: relative;
	padding-bottom: 3em !important;
}

/*\*/
#left, #right, #content {
	padding-bottom: 1000em !important;
	margin-bottom: -997em !important;
}
/**/

@media all and (min-width: 0px) {
	#left, #right, #content {
		margin-bottom: 0 !important; 
		padding-bottom: 3em !important;
	}

	#left:before, #right:before, #content:before {
		content: 'EasyClearing';
		display: block;
		background: inherit;
		padding-top: 1000em !important;
		margin-bottom: -1000em !important;
		height: 0;
	}
}

#container:after {
	content: 'EasyClear'; 
	display: block; 
	height: 0; 
	clear: both; 
	visibility: hidden;
}

#container { display: inline-block; }
/*\*/
#container { display: block; }
/**/

#left {
	width: 220px;
	background: cyan; /* url(images/tile-2.jpg) repeat; */
	margin-left: -100%;
	right: 220px;
}

* html #left {
	left: 200px;
}

#right {
	width: 200px;
	background: yellow; /* url(images/tile-3.jpg) repeat; */
	margin-right: -100%;
}

#content {
	width: 100%;
	background: #CCC; /* url(images/tile-1.jpg) repeat; */
}

#footer {
	height: 3em;
	color: #FFF;
	background: green;
	position: relative;
	z-index: 1000;
	margin-top: -3em;
	width: 100%;
}
    </style>
</head>
<body>
	<div id="header">
		Header
	</div>
	<div id="container">
		<div id="content" class="column">
			<p>Sed eleifend, sapien vel mollis euismod, sem velit semper ante, sodales vestibulum sapien erat vitae est. Proin cursus mi ut nunc. Mauris facilisis, lectus eu gravida tincidunt, pede magna elementum erat, at volutpat mauris turpis vel libero. Fusce tristique augue ut turpis ultrices vestibulum. Nulla eget metus vitae felis rutrum scelerisque. Nulla eros diam, sollicitudin eu, vehicula sed, rutrum quis, est. In hac habitasse platea dictumst. Cras condimentum nisl vel orci. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse non nulla. Morbi facilisis sollicitudin nisi. Cras ut risus. Etiam quis ante sit amet nisl commodo accumsan.</p>
			<p>Morbi id erat eu metus rutrum ullamcorper. Nam sed ligula. Duis sodales libero molestie tortor. Nunc mollis egestas magna. Integer arcu arcu, sagittis sed, vulputate eu, pellentesque in, justo. Quisque semper cursus dolor. Mauris elementum. Sed quis lacus sit amet magna condimentum luctus. Sed pellentesque molestie turpis. Morbi a tortor vel nibh cursus ornare. Nunc eget enim ut metus bibendum elementum. Donec eget turpis et mi tincidunt congue. Nulla suscipit malesuada lacus. Nam aliquet arcu a nunc.</p>
			<p>Cras gravida. Donec lectus enim, dignissim vel, vestibulum a, laoreet non, nisi. Duis ut elit sed lectus ullamcorper rhoncus. Suspendisse nec urna pellentesque erat euismod feugiat. Pellentesque blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sollicitudin. Phasellus faucibus sem eu ante. Vivamus in urna sit amet erat molestie tempus. Nullam pulvinar tellus vitae nibh. Vivamus sapien urna, vestibulum nec, porttitor non, commodo nec, mi. Morbi feugiat. Donec quis magna. Fusce placerat nisi. Donec mattis placerat augue. Suspendisse eget lorem. Fusce faucibus, risus euismod consequat dapibus, urna nibh sodales velit, ac dignissim odio ante ac nulla. Aenean elementum, nisi eu gravida volutpat, tortor leo mattis erat, id sagittis justo ligula eu turpis. Ut nibh metus, aliquet ut, condimentum bibendum, aliquet sit amet, metus.</p>
		</div>

		<div id="left" class="column">
			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis sollicitudin dolor nec nunc iaculis tincidunt. Aenean tristique quam tempus lorem. Suspendisse non pede. Etiam rhoncus. Pellentesque cursus dapibus nulla. Suspendisse fermentum sollicitudin enim. Donec massa arcu, faucibus nec, tempor a, sagittis dapibus, elit. Fusce aliquam mauris nec ante. Duis at quam. Duis vestibulum lorem fermentum turpis. Morbi porttitor, justo vel blandit pretium, nunc lacus porta nulla, quis pretium ante felis et mauris. Sed diam. Donec eu sem. Donec id magna vel quam mattis placerat. Proin viverra condimentum dui. Phasellus congue.</p>
		</div>

		<div id="right" class="column">
			<p>Phasellus sollicitudin. Fusce ut tellus. Vivamus dapibus. Cras eu elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse felis. Nam pretium orci non quam. Phasellus at dolor a felis aliquam suscipit. Suspendisse potenti. Curabitur ac tellus at enim dapibus cursus. Donec scelerisque pretium risus. Quisque sodales. Pellentesque metus pede, imperdiet at, feugiat quis, lobortis ut, tortor. Aenean vestibulum, massa ut volutpat blandit, metus nisi rhoncus lorem, at dignissim arcu mi vel lectus.</p>
			<p>Nullam in justo ac mi fringilla congue. Sed blandit magna vel ante. Integer sapien nunc, viverra in, sollicitudin vel, feugiat nec, elit. Integer non sapien. Duis in augue. Nam at est. Nam mattis. Maecenas dui. Proin auctor. Donec augue tellus, malesuada eu, fringilla sed, accumsan sed, leo. Nullam ut tellus. In porttitor. Nunc pulvinar varius mauris. Ut viverra justo vitae nibh. In id nibh et velit varius blandit. Integer sit amet pede. Pellentesque risus.</p>
		</div>
	</div>
	<div id="footer">Footer</div>
</body>
</html>