(function(c){c.fn.darkbox=function(){function j(){clearInterval(m);d.css("background-position","24px 24px")}function h(){j();k.animate({opacity:0},q,function(){b.removeClass(r);d.stop();l.unbind("error",n).attr("src","")})}function o(a){if(27===a.which||32===a.which)if(0===c("div.darkbox:hidden").length){a.preventDefault();h()}}function n(){j();b.addClass("darkbox-error");setTimeout(h,s)}c('<div class="darkbox"><div class="darkbox-shadow"></div><div class="darkbox-canvas"><img alt=""><div class="darkbox-button" title="Close"></div></div></div>').appendTo("body");
var q=100,s=800,r="darkbox-on darkbox-done darkbox-loaded darkbox-error",t=/mac/i.test(navigator.platform)?"darkbox-button-left":"darkbox-button-right",b=c("div.darkbox"),k=b.children("div.darkbox-shadow"),d=b.children("div.darkbox-canvas"),l=d.children("img"),u=d.children("div.darkbox-button"),m=0,i=0;k.css({opacity:0}).click(h);u.addClass(t).click(h);l.load(function(){j();var a=c(this),g=1,e=a.width(),f=a.height();g=b.width();var p=b.height();if(0===e&&0===f)setTimeout(function(){a.load()},10);
else{if(e>g-50||f>p-50){g=Math.min((g-50)/e,(p-50)/f);e=Math.round(e*g);f=Math.round(f*g)}b.addClass("darkbox-loaded");d.animate({width:e,marginLeft:-e/2,height:f,marginTop:-f/2,opacity:1},400,function(){b.addClass("darkbox-done")})}});c(document).keypress(o).keydown(o);this.click(function(a){a.preventDefault();a=c(this);b.addClass("darkbox-on");d.css({width:"",marginLeft:"",height:"",marginTop:"",opacity:0.5});m=setInterval(function(){d.css("background-position","24px "+(24-56*i)+"px");i=7<=i?0:
i+1},90);l.one("error",n).css({width:"",height:""}).attr("src",a.attr("href")).attr("alt",a.attr("title"));k.animate({opacity:0.6},200)});return this}})(jQuery);