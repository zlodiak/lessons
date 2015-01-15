<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="JavaScript" type="text/javascript" src="js/jquery.json-2.3.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>

<script type="text/javascript">
$(document).ready(function(){
	
	//hide message_body after the first one
	$(".message_list .message_body:gt(0)").hide();
	
	//hide message li after the 5th
	$(".message_list li:gt(4)").hide();

	
	//toggle message_body
	$(".message_head").click(function(){
		$(this).next(".message_body").slideToggle(500)
		return false;
	});

	//collapse all messages
	$(".collpase_all_message").click(function(){
		$(".message_body").slideUp(500)
		return false;
	});

	//show all messages
	$(".show_all_message").click(function(){
		$(this).hide()
		$(".show_recent_only").show()
		$(".message_list li:gt(4)").slideDown()
		return false;
	});

	//show recent messages only
	$(".show_recent_only").click(function(){
		$(this).hide()
		$(".show_all_message").show()
		$(".message_list li:gt(4)").slideUp()
		return false;
	});

});
</script>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}
body {
	margin: 10px auto;
	width: 570px;
	font: 75%/120% Arial, Helvetica, sans-serif;
}
p {
	padding: 0 0 1em;
}
/* message display page */
.message_list {
	list-style: none;
	margin: 0;
	padding: 0;
	width: 383px;
}
.message_list li {
	padding: 0;
	margin: 0;
	background: url(images/message-bar.gif) no-repeat;
}
.message_head {
	padding: 5px 10px;
	cursor: pointer;
	position: relative;
}
.message_head .timestamp {
	color: #666666;
	font-size: 95%;
	position: absolute;
	right: 10px;
	top: 5px;
}
.message_head cite {
	font-size: 100%;
	font-weight: bold;
	font-style: normal;
}
.message_body {
	padding: 5px 10px 15px;
}
.collapse_buttons {
	text-align: right;
	border-top: solid 1px #e4e4e4;
	padding: 5px 0;
	width: 383px;
}
.collapse_buttons a {
	margin-left: 15px;
	float: right;
}
.show_all_message {
	background: url(images/tall-down-arrow.gif) no-repeat right center;
	padding-right: 12px;
}
.show_recent_only {
	display: none;
	background: url(images/tall-up-arrow.gif) no-repeat right center;
	padding-right: 12px;
}
.collpase_all_message {
	background: url(images/collapse-all.gif) no-repeat right center;
	padding-right: 12px;
	color: #666666;
}
</style>
</head>
<body>
<ol class="message_list">
	<li>
		<p class="message_head"><cite>someone:</cite> <span class="timestamp">1 minute ago</span></p>
		<div class="message_body">
			<p>Hello Nick,<br />
				<br />
				This is the latest message display. The rest are collapsed by default</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>nick:</cite> <span class="timestamp">2 minutes ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>someone:</cite> <span class="timestamp">1 day ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>nick:</cite> <span class="timestamp">2 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>someone:</cite> <span class="timestamp">3 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>nick:</cite> <span class="timestamp">5 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>someone:</cite> <span class="timestamp">6 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>nick:</cite> <span class="timestamp">7 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
	<li>
		<p class="message_head"><cite>someone:</cite> <span class="timestamp">8 days ago</span></p>
		<div class="message_body">
			<p>message here</p>
		</div>
	</li>
</ol>
<p class="collapse_buttons"><a href="#" class="show_all_message">Show all message (9)</a> <a href="#" class="show_recent_only">Show 5 only</a> <a href="#" class="collpase_all_message">Collapse all</a></p>
</body>
</html>
