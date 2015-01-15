var Mint = new Object();
Mint.save = function() 
{
	var now		= new Date();
	var debug	= false; // this is set by php 
	if (window.location.hash == '#Mint:Debug') { debug = true; };
	var path	= 'http://cssing.org.ua/mint/?record' + ((debug)?'&debug&errors':'') + '&key=3661416d374d70596d496b55533131316f6731343169495261463331747451';
	
	// Loop through the different plug-ins to assemble the query string
	for (var developer in this) 
	{
		for (var plugin in this[developer]) 
		{
			if (this[developer][plugin] && this[developer][plugin].onsave) 
			{
				path += this[developer][plugin].onsave();
			};
		};
	};
	// Slap the current time on there to prevent caching on subsequent page views in a few browsers
	path += '&'+now.getTime();
	
	// Redirect to the debug page
	if (debug) { window.location.href = path; return; };
	
	if (document.write) { document.write('<img src="'+path+'" alt="" style="position: absolute; left: -9999px;" onload="this.parentNode.removeChild(this);" />'); }
	else
	{
		// Record this visit; uses XMLHttpRequest to play nice with pages served as application/xhtml+xml
		// Causes a security issue when served from a sub or other domain
		var data = false;
		/*@cc_on @*/
		/*@if (@_jscript_version >= 5)
		try { data = new ActiveXObject("Msxml2.XMLHTTP"); } 
		catch (e) { try { data = new ActiveXObject("Microsoft.XMLHTTP"); } catch (E) { data = false; } }
		@end @*/
		if (!data && typeof XMLHttpRequest!='undefined') { data = new XMLHttpRequest(); }
		if (data) { data.open("GET", path, true); data.send(null); }
	};
};
if (!Mint.SI) { Mint.SI = new Object(); }
Mint.SI.Referrer = 
{
	onsave	: function() 
	{
		if (typeof Mint_SI_DocumentTitle=='undefined') { Mint_SI_DocumentTitle = document.title; }
		var referer		= (window.decodeURI)?window.decodeURI(document.referrer):document.referrer;
		var resource	= (window.decodeURI)?window.decodeURI(document.URL):document.URL;
		return '&referer=' + escape(referer) + '&resource=' + escape(resource) + '&resource_title=' + escape(Mint_SI_DocumentTitle);
	}
};
Mint.save();
