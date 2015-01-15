
if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

if(document.getElementById('adfocus_banner_style') == undefined) {
	var style = document.createElement('style');
	style.setAttribute('id', 'adfocus_banner_style');
	style.text = "div.jma_ban_st, .jma_ban_st div, .jma_ban_st span, .jma_ban_st object, .jma_ban_st iframe,\
			.jma_ban_st p, .jma_ban_st a, .jma_ban_st em, .jma_ban_st img,\
			.jma_ban_st s, .jma_ban_st b, .jma_ban_st u, .jma_ban_st i, .jma_ban_st center,\
			.jma_ban_st form, .jma_ban_st label,\
			.jma_ban_st table, .jma_ban_st tbody, .jma_ban_st tr, .jma_ban_st th, .jma_ban_st td,\
			.jma_ban_st table tbody tr td, .jma_ban_st table tr td,\
			.jma_ban_st embed, .jma_ban_st param\
			{\
				margin: 0px!important;\
				padding: 0px!important;\
				border: 0;\
				font-size: 100%;\
				font: inherit;\
				vertical-align: baseline;\
			}";
	document.getElementsByTagName('head').item(0).appendChild(style);
}

var script;
if(document.getElementById('adfocus_banner_handler') == undefined) {
	script = document.createElement('script');
	script.setAttribute('id', 'adfocus_banner_handler');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', 'http://adfocus.ru/banner/scrollhandler.js');
	document.getElementsByTagName('head').item(0).appendChild(script);
	
	var adfba = new Array();
	var adfbb = new Array();
	var adfbt = new Array();
	var adfbui = 0;
	var adfbri = 0;
	var svs = false;
}

if(adfba.indexOf(1143) == -1) {

	document.write("<script type=\"text/javascript\">\
		var _gaq = _gaq || [];\
		_gaq.push(['_setAccount', 'UA-42987023-1']);\
		_gaq.push(['_trackPageview']);\
		(function() {\
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';\
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\
		})();\
	</script>");
	
	var banner = '';

	document.write('<script type="text/javascript" src="http://adfocus.ru/banner/afc.php?id=1143&ak=OB70ME5WCEGMLR2O&referer=' + encodeURIComponent(window.location) + '"></script>');
	document.write('<script type="text/javascript" src="http://adfocus.ru/banner/banner_body.php?id=1143&ak=OB70ME5WCEGMLR2O&referer=' + encodeURIComponent(window.location) + '"></script>');
}