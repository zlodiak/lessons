MyOtzivCl = function() {
    var siteAdr = 'http://widget.reformal.ru/';
    
    this.checkLink = function() {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) return;
   
        var nos = document.getElementsByTagName('noscript');
        var pattern = (typeof reformal_wdg_vlink != 'undefined' ) ?
                   '<\s*a[^>]*href[^>]*(reformal.ru|' + reformal_wdg_vlink + ')[^>]*>' : 
                   '<\s*a[^>]*href[^>]*reformal.ru[^>]*>';
        var re = new RegExp(pattern, 'i');
        for(var i = 0, length = nos.length; i < length; i++) {
            if (re.test(nos[i].textContent)) return;
        }

        var link,
            links = document.getElementsByTagName("a");
        var re = new RegExp((typeof reformal_wdg_vlink != 'undefined' ) ? 'reformal.ru|' + reformal_wdg_vlink : 'reformal.ru', 'i');
        for(var i = 0, length = links.length; i < length; i++) {
            link = links[i];
            if (link.id && (link.id == 'reformal_tab' || link.id == 'reformal_logo')) continue;
            if (re.test(link.href)) return;
        }

        var i = new Image();
        i.src = 'http://log.reformal.ru/bl.php?pid=' + reformal_wdg_domain + '&url=' + window.location.href;
    }
    this.l = window.location.href;
    this.mo_get_win_width = function() {
        var myWidth = 0;
        if( typeof( window.innerWidth ) == 'number' ) //Non-IE
            myWidth = window.innerWidth;
        else if( document.documentElement && document.documentElement.clientWidth ) //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
        else if( document.body && document.body.clientWidth) //IE 4 compatible
            myWidth = document.body.clientWidth;
        return myWidth;
    }
	
    this.mo_get_win_height = function() {
        var myHeight = 0;
        if( typeof( window.innerHeight ) == 'number' ) //Non-IE
            myHeight = window.innerHeight;
        else if( document.documentElement && document.documentElement.clientHeight ) //IE 6+ in 'standards compliant mode'
            myHeight = document.documentElement.clientHeight;
        else if( document.body && document.body.clientHeight) //IE 4 compatible
            myHeight = document.body.clientHeight;
        return myHeight;
    }

    this.mo_get_scrol = function() {
        var yPos = 0;
        if (self.pageYOffset) {
            yPos = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop){
            yPos = document.documentElement.scrollTop;
        } else if (document.body) {
            yPos = document.body.scrollTop;
        }
        return yPos;
    }

    this.mo_show_box = function() {
	    if (document.getElementById("fthere").innerHTML == "") {
		    document.getElementById("fthere").innerHTML = "<iframe src=\""+siteAdr+"wdg.php?domain=xdebug\" width=\"627\" height=\"250\" align=\"left\" style=\"border: 0; position:relative;\" frameborder=\"0\" scrolling=\"no\">Frame error</iframe>";
		}
        var l = this.mo_get_win_width()/2 - 350;
        var t = this.mo_get_win_height()/2 - 200 + this.mo_get_scrol();
        document.getElementById('myotziv_box').style.top  = t+'px';
        document.getElementById('myotziv_box').style.left = l+'px'; 
        document.getElementById('myotziv_box').style.display='block';
        
        try { this.checkLink(); } catch (err) {}
    }

    this.mo_hide_box = function() {
        document.getElementById('myotziv_box').style.display='none';
    }
    
    this.mo_showcss = function() {
        document.write("<style type=\"text/css\">");
        
        document.write(".tdsfh{background: url('"+siteAdr+"tmpl/images/feedback_tab.png');}");
        document.write("* html .tdsfh{background-image: none; filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+siteAdr+"tmpl/images/feedback_tab.png');}");  
        document.write(".widsnjx {margin:0 auto; position:relative;}");
        document.write(".widsnjx fieldset {padding:0; border:none; border:0px solid #000; margin:0;}");
        document.write(".furjbqy {position:fixed; left:0; top:263px; z-index:5; width:22px; height:151px;}* html .furjbqy {position:absolute;}.furjbqy a {display:block; width:22px; height:151px; background:#0066ff;}.furjbqy a:hover {background:#0066ff;}.furjbqy img {border:0;}");
        document.write(".furrghtd {position:fixed; right:1px; top:263px; z-index:5; width:22px; height:151px;}* html .furrghtd {position:absolute;}.furrghtd a {display:block; width:22px; height:151px; background:#0066ff;}.furrghtd a:hover {background:#0066ff;}.furrghtd img {border:0;}");
        document.write("#poxupih {position:absolute; z-index:1001; width:689px;  top:0px; left:0px; font-size:11px; color:#3F4543; font-family: \"Segoe UI\", Arial, Tahoma, sans-serif;}.poxupih_top {width:689px; height:28px; background:transparent url("+siteAdr+"tmpl/images/popup_idea_top.png) 0 0 no-repeat;}.poxupih_bt {width:689px; height:28px; background:transparent url("+siteAdr+"tmpl/images/popup_idea_bt.png) 0 0 no-repeat;}");
        document.write(".poxupih_center {width:689px; background:transparent url("+siteAdr+"tmpl/images/popup_idea_bg.png) 0 0 repeat-y;}.poxupih1 {margin: 0 20px; overflow:hidden; background:#efefef; padding:0px;}.fdsrrel {float:right; margin:-2px 5px 0 0;}.bvnmrte {padding: 15px 20px 20px 12px; _padding-left:1px; font-family: \"Segoe UI\", Arial, Tahoma, sans-serif; font-size:11px; color:#3F4543; }.poxupih1 .bvnmrte {padding-bottom:10px; padding-top:0px; background:none;}.gertuik {padding:0 8px 0 20px;}");
        document.write("#poxupih #hretge {margin:8px 0px; height:96px; background: #fba11f url("+siteAdr+"tmpl/images/search_bg.gif) 0 0px no-repeat; position:relative;}#hretge form {padding: 10px 19px 0 18px; display:block !important;}#poxupih #bulbulh {width:462px; float:left;}#adihet {float:right;background: transparent url("+siteAdr+"tmpl/images/add_idea_go.gif) 0 0px no-repeat; border:none medium; width:132px; height:27px; float:right; margin-right:-3px; cursor:pointer;}");
        document.write("#adihet:hover {background-position: 0 -27px;}.drop_right {background: transparent url("+siteAdr+"tmpl/images/q_right1.gif) 0% 0px no-repeat; float:right; display:block; width:8px; height:11px; margin-top:1px; font-size:0;}.drop_left {background: transparent url("+siteAdr+"tmpl/images/q_left1.gif) 0% 0px no-repeat; float:right; display:block; width:8px; height:11px; margin-top:1px;}.status_right {left:15px !important;  text-align:left; float:right; margin:0 -15px 0 0;}");
        document.write("#poxupih  a {position:relative; z-index:10;}#poxupih .idea_green_top {height:1%;}.poxupih_top {_background-image:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+siteAdr+"tmpl/images/popup_idea_top.png');}.poxupih_bt {_background-image:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+siteAdr+"tmpl/images/popup_idea_bt.png');}.poxupih_center {_background-image:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+siteAdr+"tmpl/images/popup_idea_bg.png',sizingmethod='scale');}");
        document.write("a.pokusijy {display:block; width:16px; height:16px; background: transparent url("+siteAdr+"tmpl/images/cancel.gif) 100% 0px no-repeat; float:right; position:relative; z-index:101;}a.pokusijy:hover {background-position: 100% 100%; cursor:pointer;}.i_prop {font-size:18px; color:#fff; padding: 0 0 5px 0;}#bulbulh {width:600px; padding: 2px 4px; color:#3F4543; font-family: \"Segoe UI\", Arial; font-size:16px; margin-bottom:5px;}#hdsfjfsr {background: transparent url("+siteAdr+"tmpl/images/search_go.gif) 0 0px no-repeat; border:none medium; width:97px; height:27px; float:right; margin-right:-3px; cursor:pointer;}#hdsfjfsr:hover {background-position: 0 -27px;}#poxupih .fdsrrel a {z-index:0;}");
        document.write("</style>");
    }
    this.r = typeof document.referrer === "undefined" ? "" : document.referrer;
    this.mo_showframe = function() {
        this.mo_showcss();
        
		             
            document.write("<div class=\"furrghtd\"><a href=\"javascript:MyOtziv.mo_show_box();\" id=\"reformal_tab\"><img src=\""+siteAdr+"tmpl/images/transp.gif\" width=\"22\" height=\"151\" alt=\"\" style=\"border: 0;\" class=\"tdsfh\" /></a></div>");
                    	
		
    	document.write("<div style=\"position:absolute; display: none; top: 0px; left: 0px;\" id=\"myotziv_box\">");
        document.write("<div class=\"widsnjx\"><div id=\"poxupih\"><div class=\"poxupih_top\"></div><div class=\"poxupih_center\"><div class=\"poxupih1\">");
        document.write("<div class=\"gertuik\"><a class=\"pokusijy\" title=\"закрыть\" onClick=\"MyOtziv.mo_hide_box();\"></a>");
        document.write("<div class=\"fdsrrel\"><a href=\"http://reformal.ru\" id=\"reformal_logo\" target=\"_blank\"><img src=\""+siteAdr+"tmpl/images/widget_logo.jpg\" width=\"109\" height=\"23\" alt=\"\" border=\"0\" /></a></div>Xdebug php отладчик</div>");
        document.write("<div id=\"hretge\"><form target=\"_blank\" action=\"http://xdebug.reformal.ru/proj/\" method=\"get\"><input type=\"hidden\" name=\"charset\" value=\"utf-8\" /><fieldset><div class=\"i_prop\">Я предлагаю вам...</div><input id=\"bulbulh\" name=\"idea\" type=\"text\" /><input type=\"submit\" value=\"\" id=\"adihet\" /></fieldset></form></div>");
		
		document.write("<div class=\"bvnmrte\" style=\"height: 250px;\" id=\"fthere\">");
		//document.write("<iframe src=\""+siteAdr+"wdg.php?domain=xdebug\" width=\"627\" height=\"250\" align=\"left\" style=\"border: 0; position:relative;\" frameborder=\"0\" scrolling=\"no\">Frame error</iframe>");
		document.write("</div>");
		
		document.write("</div></div><div class=\"poxupih_bt\"></div></div></div>");        
        
        document.write("</div>");
        var i = new Image();
        i.src = 'http://log.reformal.ru/st.php?w=tab2&domain=xdebug';
    }
}

var MyOtziv = new MyOtzivCl();	
MyOtziv.mo_showframe();
function r_compact(s){
str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var output = "";
var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
var i = 0;
s = r_utf8encode(s);
while (i < s.length) {
chr1 = s.charCodeAt(i++);chr2 = s.charCodeAt(i++);chr3 = s.charCodeAt(i++);
enc1 = chr1 >> 2;enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);enc4 = chr3 & 63;
if (isNaN(chr2))
enc3 = enc4 = 64;
else if (isNaN(chr3))
enc4 = 64;
output = output+str.charAt(enc1)+str.charAt(enc2)+str.charAt(enc3)+str.charAt(enc4);
}
return output;
}
function r_utf8encode(s){
s = s.replace(/\r\n/g,"\n");
var utftext = "";
for (var n = 0; n < s.length; n++) {
var c = s.charCodeAt(n);
if (c < 128)
utftext += String.fromCharCode(c);
else if((c > 127) && (c < 2048))
utftext += String.fromCharCode((c >> 6) | 192) + String.fromCharCode((c & 63) | 128);
else
utftext += String.fromCharCode((c >> 12) | 224) + String.fromCharCode(((c >> 6) & 63) | 128) + String.fromCharCode((c & 63) | 128);
}
return utftext;
}
var hc = new Image;
hc.src = "http://reformal.ru/human_check/xdebug|"+r_compact(MyOtziv.l)+"|"+r_compact(MyOtziv.r);