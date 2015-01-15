<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
	<title>Делаем табы с помощью CSS</title>
	<meta http-equiv="Content-Language" content="ru" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	<link rel="stylesheet" media="screen" type="text/css" href="style.css" />
</head>
<body>
	<div id="wrap">
		<div id="header">
			<h1>Алексей Ильин <sup>демо</sup></h1>
			<div class="description">Делаем табы с помощью CSS</div>
			<ul>
				<li><a href="http://www.alexilin.ru/tabs-with-pure-css/" title="К статье">К статье <span>></span></a></li>
			</ul>
		</div>
		<div id="content">
			<ul class="tabs">
				<li><a href="#one">1</a></li>
				<li><a href="#two">2</a></li>
				<li><a href="#three">3</a></li>
				<li><a href="#four">4</a></li>
				<li><a href="#five">5</a></li>
			</ul>
			<div class="tabs-content">
				<ul>
					<li id="one">1</li>
					<li id="two">2</li>
					<li id="three">3</li>
					<li id="four">4</li>
					<li id="five">5</li>
				</ul>
			</div>
		</div>
	</div>
</body>
</html>