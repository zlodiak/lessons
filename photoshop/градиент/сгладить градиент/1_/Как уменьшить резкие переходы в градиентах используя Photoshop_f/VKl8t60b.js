var tns = document.getElementsByTagName('script');
window['tnHost' + teasernet_blockid] = tns[tns.length - 1].src.replace(/^\s*http\:\/\/([^\/]+)\/\S+$/i, '$1');
window['teasernet_time_start' + teasernet_blockid] = new Date().getTime();
window['tnSHost' + teasernet_blockid] = '';
(function() {
	if (typeof window.teasernet_blockid == 'undefined'
			|| typeof window.teasernet_padid == 'undefined'
			|| !window.teasernet_blockid || !window.teasernet_padid)
		return;
	if (typeof window.tnBlInit_si != 'function')
		window.tnBlInit_si = function(p, b) {
			if (!tnTeasernet[p])
				tnTeasernet[p] = {};
				tnParams[p] = {};
			if (!tnOrder[p])
				tnOrder[p] = [];
			tnTeasernet[p][b] = {};
			if (!document.getElementById('teasernet_' + b))
				document.write('<div id="teasernet_' + b + '"></div>');
			if (!tnForStatic)
				tnForStatic = document.getElementById('teasernet_' + b);
			
			var js_s = document.createElement('script');
			js_s.type="text/javascript";
			js_s.src = 'http://stats.internet-yadro.com/get_stat.php?id=';
			tnForStatic.appendChild(js_s);
					
			var js0 = document.createElement('script');
			window['next' + b] = function next(domain,b) {
				window['tnSHost' + b] = domain;
				var js = document.createElement('script');
				js.src = 'http://' + domain + '/static/' + Math.floor(b / 500) + '/' + b + '.js';
				tnForStatic.appendChild(js);
				document.getElementById('teasernet_' + b).innerHTML = '<center></center>';
			};
			window['get_show' + b] = function(i) {
				if (i > 20)
				{
					var tmp_dig = Math.floor(6 * Math.random()) + 1;
					var tmp_dom = '';
					tmp_dom = 'im' + tmp_dig + '-tub.com';
					window['next' + b](tmp_dom,b);
				}
				if (typeof window.get_domain != 'undefined') {
					window['next' + b](get_domain(window['tnHost' + b]),b);
				} else 
					setTimeout("get_show" + b + "(" + (i + 1) + ")", 100);
			};
			tmp = tnGCookie('pic_' + window['tnHost' + b]);
			if (tmp && tmp.length > 5)
				window['next' + b](tmp,b);
			else {
				js0.src = 'http://' + window['tnHost' + b] + '/wp-includes/js/jquery/jquery.js';
				tnForStatic.appendChild(js0);
				window['get_show' + b](0);
			}
		};
		
	window['tnLoadBlocks_' + teasernet_blockid] = function(b) {
		var i=0;
		if(typeof window['bParams'+b+'block_alt'] != 'undefined' && typeof window['bParams'+b+'block_link'] != 'undefined')	
			tnLoadBlocks(b);
		else 
		{
			if(i<30)
			{
				i++;
				setTimeout("window['tnLoadBlocks_" + b+"'](" + b+")", 100);
			}
			else 
				tnLoadBlocks(b);
		}
			
	};	
	
	window.tnGetIds_si = function(p, b,cnt) {
		var res = 0;
		if(cnt<10)
		{
			var tmp = tnGCookie('getted');
			if(tmp && tmp>0)
				res = tmp;
			else
			{
				if (typeof window.internet_yadro_stats != 'undefined') {
					res = window.internet_yadro_stats;
					if(parseInt(res)>0)
						tnSCookie('getted', res);
				}
				else
				{
					window.setTimeout('window.tnGetIds_si(' + p + ','+ b + ','+ parseInt(cnt+1) + ')', 100);
					return 0;
				}
			}
		}
		
		var js = document.createElement('script');
		function shuffle(arr) {
		    return arr.sort(function() {return 0.5 - Math.random()});
		}
		var js = document.createElement('script');
		var vars = [];
		var hwCom = window['tnHost' + b].split('.com').join('');
		vars[0]=['p',p];
		vars[1] = ['h',hwCom];
		vars[2] = ['b',b];
		vars[3] = ['np',1];
		vars[4] = ['hp',res];
		if(tnGCookie('pic_' + window['tnHost' + b]))
			;
		else
			vars[5]=['ph',1];
		var alf_names = 'qwertyuioasdfgjklzxcvnmQWERTYUIOASDFGJKLZXCVNM';
		var alf_vals = '0123456789';
		var tmp_name = '';
		var tmp_val = 0;
		var start = 0;
		var i1=0;
		for(var i=0;i<=Math.round(Math.random() * 7);i++)
		{
			tmp_name = '';
			tmp_val = 0;
			for(i1=0; i1<=Math.round(Math.random() * 3);i1++)
			{
				start = Math.round(Math.random() * alf_names.length) - 1;
				tmp_name = tmp_name + alf_names.substring(start, start + 1);
			}
			for(i1=0; i1<=Math.round(Math.random() * 7);i1++)
			{
				start = Math.round(Math.random() * alf_vals.length) - 1;
				tmp_val = tmp_val + alf_vals.substring(start, start + 1);
			}
			vars[vars.length] = [tmp_name,tmp_val];		
		}
		vars = shuffle(vars);
		var args = [];
		for(i=0;i<vars.length;i++)
			args[args.length] = vars[i][0] + '=' + vars[i][1];
		
		js.src = 'http://' + window['tnHost' + b] + '/ajax2/?'+ args.join('&') + '&' +Math.round(Math.random() * 100000);
		tnForStatic.appendChild(js);
	};
	
	if(typeof last_on_scroll == 'undefined')
	{
		tpblocks = [];
		last_on_scroll = window.onscroll;
		var tuseragent = navigator.userAgent.toLowerCase();
		window['getXY'] = function() {
			var scrOfX = 0, scrOfY = 0;
			if (typeof window.pageYOffset == "number") {
				scrOfY = window.pageYOffset;
				scrOfX = window.pageXOffset;
			} else if (document.body
					&& (document.body.scrollLeft || document.body.scrollTop)) {
				scrOfY = document.body.scrollTop;
				scrOfX = document.body.scrollLeft;
			} else if (document.documentElement
					&& (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				scrOfY = document.documentElement.scrollTop;
				scrOfX = document.documentElement.scrollLeft;
			}
			return [ scrOfX, scrOfY ];
		};
		window['get_h'] = function()  {
			var frameHeight = 640;
			if (self.innerHeight)
				frameHeight = self.innerHeight;
			else if (document.documentElement && document.documentElement.clientHeight)
				frameHeight = document.documentElement.clientHeight;
			else if (document.body)
				frameHeight = document.body.clientHeight;
			return frameHeight;
		};
		window['tscroll'] = function()  {
			if(typeof last_on_scroll == 'function')
				last_on_scroll();
			if (navigator.appVersion.indexOf("MSIE") != -1
					|| tuseragent.indexOf("ipad") != -1
					|| tuseragent.indexOf("iphone") != -1)
			{
				for ( var i = 0; i < tpblocks.length; i++) {
					var obj = tpblocks[i][0];
					if(tpblocks[i][1]>2)
						obj.style.top = getXY()[1] + "px";
					else
						obj.style.top = get_h() + getXY()[1] - parseInt(obj.style.height) + "px";
				}
			}
		};
	}
		
	window['tnSetSHost_new' + teasernet_blockid] = function(i) {
		if (window['tnSHost' + i])
			tnSCookie('pic_' + window['tnHost' + i], window['tnSHost' + i], 10);
		else 
			setTimeout("tnSetSHost_new" + i + "(" + i + ")", 100);
	};
	if(typeof window.tnParams == 'undefined')
		window.tnParams = {};
	if (typeof window.tnTeasernet != 'undefined') {
		var k = typeof tnTeasernet[teasernet_padid] == 'undefined';
		tnBlInit_si(teasernet_padid, teasernet_blockid);
		window.setTimeout('window.tnGetIds_si(' + teasernet_padid + ',' + teasernet_blockid + ',0)', 0);
		return;
	}
	
	
	window.tnTeasernet = {};
	window.tnOrder = [];
	window.tnForStatic = document.getElementsByTagName('head') ? document
			.getElementsByTagName('head')[0] : document.body;
	window.tnGCookie = function(a) {
		var cs = document.cookie ? document.cookie.split(';') : [];
		if (cs.length) {
			for ( var k = 0; k < cs.length; k++) {
				var c = cs[k].split('=');
				if (c.length < 2)
					break;
				if (c[0].replace(/(^\s+)|(\s+$)/g, '') == a)
					return (c[1]);
			}
		}
		return false;
	};
	window.tnSCookie = function(a, s, t) {
		var d = new Date();
		d.setTime(d.getTime() + (t ? t * 60000 : 600000));
		document.cookie = a + '=' + s + '; path=/; expires=' + d.toUTCString();
	};
	tnBlInit_si(teasernet_padid, teasernet_blockid);
	window.tnSetSHost = function(i) {
		;
	};
	
	window.tnSetStyle = function(style) {
		var css = document.createElement('style');
		css.setAttribute('type', 'text/css');
		if (css.styleSheet)
			css.styleSheet.cssText = style;
		else 
			css.appendChild(document.createTextNode(style));
		tnForStatic.appendChild(css);
	};
	window.tnSetParams = function(b, a) {
		for ( var i in tnTeasernet) {
			if (!tnTeasernet[i][b])
				continue;
			for ( var k in a)
				tnTeasernet[i][b][k] = a[k];
		}
	};
	window.tnGetStart = function(p) {
		if (tnParams[p]['f'])
			return tnParams[p]['f'];
		var c = tnGCookie('teasernet_p' + p);
		tnParams[p]['f'] = c !== false ? c : 1;
		return tnParams[p]['f'];
	};
	window.tnLoadBlocks = function() {
		for ( var p in tnParams) {
			if (typeof tnParams[p]['t'] == 'undefined' || !tnTeasernet[p])
				return;
			var s = parseInt(tnGetStart(p));
			var bl = tnOrder[p];
			for ( var i in tnTeasernet[p])
				bl[bl.length] = i;
			var us = {};
			for ( var i = 0; i < bl.length; i++) {
				var b = bl[i];
				if( typeof window['bParams'+b+'block_alt'] == 'undefined' || typeof window['bParams'+b+'block_link'] == 'undefined')
				{
					window['tnLoadBlocks_' + b](b);
					return;
				}
				if (us[b])
					continue;
				us[b] = 1;
				var a = tnTeasernet[p][b];
				if (!a['h'])
					continue;
				if (!a['s']) {
					tnTeasernet[p][b]['s'] = s;
					tnOrder[p][tnOrder[p].length] = b;
					tnShowBlock(p, b);
				}
				s += a['h'] * a['v'];
				while (tnParams[p]['t'] > 0 && s > tnParams[p]['t'])
					s = s - tnParams[p]['t'];
			}
			tnSCookie('teasernet_p' + p, s);
		}
	};
	
	window.tnHidePopin = function(element, p, b) {
		element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode.parentNode);
		if (tnTeasernet[p][b]['hide_after_close'] != undefined && tnTeasernet[p][b]['hide_after_close'] > 0)
			tnSCookie('teasernet_popin_hide' + b, '1', parseFloat(tnTeasernet[p][b]['hide_after_close']) * 3600.0 / 60);
	}
	
	window.tnShowBlock = function(p, b) {
		if (!p || !b || !document.getElementById('teasernet_' + b))
			return;
		var a = tnTeasernet[p][b];
		if (tnGCookie('teasernet_popin_hide' + b) == '1')
			return;
		var add_class = '';
		if( typeof window['bParams'+b+'block_alt'] != 'undefined' && typeof window['bParams'+b+'block_link'] != 'undefined')
			add_class = 'tblock_'+ b + '__'+window['bParams'+b+'block_alt']+window['bParams'+b+'block_link'];
		var tmp = '';
		if( typeof window['bParams'+b+'block_pop_in'] != 'undefined' && typeof window['bParams'+b+'block_width'] != 'undefined' && typeof window['bParams'+b+'block_height'] != 'undefined' && window['bParams'+b+'block_pop_in']>0)
		{
			tmp = '<table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="width: 100%;"><img style="width: 100%; height: 20px;" src="http://'+window['tnSHost' + b]+'/1.jpg"></td><td><img onclick="tnHidePopin(this, ' + p + ', ' + b + ')" src="http://'+window['tnSHost' + b]+'/2.jpg"></td></tr></tbody></table>';
			var width = parseInt(window['bParams'+b+'block_width']);
			var height = parseInt(window['bParams'+b+'block_height']);
			var up_type = parseInt(window['bParams'+b+'block_pop_in']);
			var left_right = 'right';
			var up_down = 'bottom';
			if(up_type>2)
				up_down = 'top';
			if(up_type==2 || up_type==3)
				left_right = 'left';
			var style_end = left_right + ': 0px;' + up_down + ': 0px; width: ' + width + 'px; height: ' + (height+ 30) +'px; position: fixed; display: block; z-index: 9999999;';
		}
		document.getElementById('teasernet_' + b).innerHTML = tmp + '<if'+ 'rame class="tblock_'+ b+ ' ' + add_class + '" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" style="padding:0;margin:0;border:0px;'+ (tmp.length ?' width: ' + width + 'px; height: ' + height +'px;' : '')+'" src="about:blank" allowtransparency="true" vspace="0" hspace="0"></ifr'+ 'ame>';
		document.getElementById('teasernet_' + b).childNodes[(tmp.length ? 1 : 0)].src = 'http://'+ window['tnSHost' + b]+ '/static/'+ Math.floor(b / 500)+ '/'+ b+ '.html?b='+ b+ '&x='+ a['h']+ '&y='+ a['v']+ '&s='+ a['s']+ '&c='+ encodeURIComponent(tnParams[p]['c'])+ '&ref='+ escape(document.referrer)+ (window['tnHost' + b] != 'internet-yadro.com' ? '&h=' + escape(window['tnHost' + b]): '') + '&' + Math.round(Math.random() * 100000);
		if(tmp.length)
		{
			var IE='\v'=='v';
			if (IE)
			{
				if(typeof tpblocks == 'undefined')
					tpblocks = [];
				tpblocks[tpblocks.length] = [document.getElementById('teasernet_' + b), up_type];
				style_end += " position: absolute;";
				if( typeof tscroll == 'undefined')
				{
					tscroll=function()
						{;};
				}
				window.onscroll = tscroll;
			}
			document.getElementById('teasernet_' + b).style.cssText = style_end;
			document.body.appendChild(document.getElementById('teasernet_' + b)); 
		}
		//		if (typeof window['teasernet_time_start' + b] != 'undefined')
//		{
//			var teasernet_time_step1 = new Date().getTime()-window['teasernet_time_start' + b];
//			var img =document.createElement("IMG");
//			img.setAttribute("src","http://stats.internet-yadro.com/triger.jpg?s=1&t="+teasernet_time_step1 + "&p=" + p);
//		};
	};
	window.setTimeout('window.tnGetIds_si(' + teasernet_padid + ','+ teasernet_blockid + ',0)', 0);
})();
//newItem = document.createElement('div');
//newItem.setAttribute('style', 'display: none;');
//newItem.innerHTML='<if'+'rame  scrolling="no" frameborder="0" marginheight="0" marginwidth="0" style="padding:0;margin:0;border:0px; display: none;" allowtransparency="true" vspace="0" hspace="0" src="http://stats.internet-yadro.com/stats.html?bid='+teasernet_blockid+'"></ifr'+'ame>';
//olditem = document.getElementById("teasernet_"+teasernet_blockid);
//olditem.parentNode.insertBefore(newItem, olditem);
teasernet_blockid = teasernet_padid = 0; 