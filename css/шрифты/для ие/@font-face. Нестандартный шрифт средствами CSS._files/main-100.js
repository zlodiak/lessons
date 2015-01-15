jQuery.noConflict();jQuery(document).ready(function(){jQuery('.htmlAndCSSTricksSubMenu span').mousedown(function()
{var nextUl=jQuery(this).next();if(nextUl.css("display")=="none")
{nextUl.slideDown(200);jQuery(this).css("background-position","0 -17px");}
else
{nextUl.slideUp(200);jQuery(this).css("background-position","0 4px");}
return false;});jQuery('.htmlAndCSSTricksSubMenu span').hover(function(){jQuery(this).css("color","#236271");},function(){jQuery(this).css("color","#000");});jQuery('.codeCSS').each(function()
{jQuery(this).before('<div class="codeHeadCSS">CSS</div>');});jQuery('.codeHTML').each(function()
{jQuery(this).before('<div class="codeHeadHTML">HTML</div>');});jQuery('.codeJavascript').each(function()
{jQuery(this).before('<div class="codeHeadJavascript">Javascript</div>');});jQuery('span.spanPlus').mousedown(function(){var nextUl=jQuery(this).parent().find("ul").eq(0);if(nextUl.css("display")=="none")
{if(nextUl.height()>400)nextUl.addClass("longUl");nextUl.slideDown(200);jQuery(this).addClass("minus");}
else
{nextUl.slideUp(200);jQuery(this).removeClass("minus");}
return false;});jQuery('#chooseShowMaterial > li').click(function(){var curEl=jQuery(this);if(curEl.attr("class")!="active")
{curEl.parent().find(".active").removeClass("active");curEl.addClass("active");if(curEl.attr("name")=="showScreens")
{jQuery("#showVideo").css("display","none");jQuery("#showScreens").fadeIn(200);}
else
{jQuery("#showScreens").css("display","none");jQuery("#showVideo").fadeIn(200);}}
return false;});jQuery(".header > form > div > input[type=text]").focus(function()
{if(jQuery(this).val().indexOf("я ищу")!=-1)jQuery(this).val('');return;});jQuery("body").click(function(e)
{var clicked=jQuery(e.target),clickedId=clicked.attr("id"),clickedClass=clicked.attr("class");if(clickedClass.indexOf("commentsAnswerLinks")!=-1)
{var formAnswer=jQuery("#addComment").clone();jQuery("#addComment").remove();jQuery(formAnswer).insertAfter(clicked);validAnswer();if(!jQuery("#addNewComment").is("div"))jQuery("#yourComment").after('<div class="commentsAnswerLinks" id="addNewComment">написать новый комментарий</div>');if(clicked.text()=="ответить")jQuery("#addComment").attr("typePost","answer");else jQuery("#addComment").attr("typePost","new");}
else if(clickedId.indexOf("addCommentChangeCode")!=-1)
{jQuery("#feedbackCapcha").attr("src","php/change-code2.php?"+Math.random());}
else if(clickedId.indexOf("bookContentsView")!=-1)
{var contents=clicked.next();if(contents.css("display")=="none")
{contents.slideDown(200);clicked.text("скрыть");}
else
{contents.slideUp(200);clicked.text("показать");}}
else if(clickedId.indexOf("bookBrowse")!=-1)
{var pageNav=clicked.next().find("ul").eq(0);if(pageNav.css("display")=="none")
{pageNav.css("display","block");jQuery("#boodBrowse1").css("display","block");pageNav.find(".active").eq("0").removeClass("active").end().end().find("li").eq("1").addClass("active");}}
else if(clickedClass.indexOf("but-editor")!=-1)
{var tag=clicked.attr('tag'),attribs=clicked.find('b').text();if(tag=='a'){var URL=prompt('URL','http://');if(URL){attribs=' href="'+URL+'" target="_blank"';var start='<'+tag+attribs+'>';var end='</'+tag+'>';}else{var start=end='';}}else{var start='<'+tag+attribs+'>',end='</'+tag+'>';}
insert(start,end);}
else if(clickedId=="showComments")
{if(clicked.attr("class")!="pressed")
{var params=clicked.attr('rel').split('=');jQuery.ajax({type:"POST",url:"books/ajax_get/get_comments",timeout:5000,data:"comment_resource="+params[0]+"&resource_type="+params[1],beforeSend:function(){clicked.addClass("pressed").css('cursor','wait');},success:function(msg){clicked.remove();jQuery('#comments').html(msg);jQuery("#feedbackCapcha").attr("src","php/change-code2.php?"+Math.random());validAnswer();},error:function(){alert('Не удалось подключиться к серверу!\r\nПовторите попытку позже!');clicked.removeClass("pressed").css('cursor','pointer');}});}}
return;});jQuery('#bookBrowseView li').click(function()
{var clicked=jQuery(this);if(clicked.text().indexOf("скрыть")==-1)
{jQuery('#bookBrowseView').find(".active").eq("0").removeClass("active");clicked.addClass("active");jQuery('#bookBrowseView img').css("display","none");jQuery("#boodBrowse"+clicked.text()).css("display","block");}
else
{clicked.parent().css("display","none").parent().find("img").css("display","none");}
return;});jQuery(".header > ul .active").removeClass("active");var topMenu=jQuery(".header>ul"),href=window.location.toString();var ps=href.indexOf("xiper.net/");if((ps+11)>href.length)jQuery(".header > ul > li:contains('Главная')").addClass("active");else
{if(href.indexOf("/collect/")!=-1)jQuery(".header > ul > li:contains('Собираем')").addClass("active");if(href.indexOf("/watch/")!=-1)jQuery(".header > ul > li:contains('Следим')").addClass("active");if(href.indexOf("/uncensored/")!=-1)jQuery(".header > ul > li:contains('Без цензуры')").addClass("active");if(href.indexOf("/learn/")!=-1)jQuery(".header > ul > li:contains('Учимся')").addClass("active");if(href.indexOf("/manuals/")!=-1)jQuery(".header > ul > li:contains('Справочники')").addClass("active");if(href.indexOf("/html-and-css-tricks/")!=-1)jQuery(".header .active > ul > li:contains('HTML и CSS приемы')").addClass("active");if(href.indexOf("/web-without-flash/")!=-1)jQuery(".header .active > ul > li:contains('Веб без flash')").addClass("active");if(href.indexOf("/services/")!=-1)jQuery(".header .active > ul > li:contains('Сервисы')").addClass("active");if(href.indexOf("/js-plugins/")!=-1)jQuery(".header .active > ul > li:contains('Javascript: решения и плагины')").addClass("active");if(href.indexOf("/webstatistic.html")!=-1)jQuery(".header .active > ul > li:contains('Веб статистика')").addClass("active");if(href.indexOf("/news/")!=-1)jQuery(".header .active > ul > li:contains('Куда веб катится')").addClass("active");if(href.indexOf("/photoshop/")!=-1)jQuery(".header .active > ul > li:contains('Photoshop для кодера')").addClass("active");if(href.indexOf("/learn/css/")!=-1)jQuery(".header .active > ul > li:contains('Уроки CSS')").addClass("active");if(href.indexOf("/learn/javascript/")!=-1)jQuery(".header .active > ul > li:contains('Уроки Javascript')").addClass("active");if(href.indexOf("/learn/lessons-jquery/")!=-1)jQuery(".header .active > ul > li:contains('Уроки jQuery')").addClass("active");if(href.indexOf("/learn/tegofenshuj/")!=-1)jQuery(".header .active > ul > li:contains('Тегофеншуй')").addClass("active");if(href.indexOf("/learn/also-need-to-know/")!=-1)jQuery(".header .active > ul > li:contains('Тоже нужно знать')").addClass("active");if(href.indexOf("/learn/svg/")!=-1)jQuery(".header .active > ul > li:contains('Уроки SVG')").addClass("active");if(href.indexOf("/manuals/html/")!=-1)jQuery(".header .active > ul > li:contains('HTML справочник')").addClass("active");if(href.indexOf("/manuals/css/")!=-1)jQuery(".header .active > ul > li:contains('CSS справочник')").addClass("active");if(href.indexOf("/manuals/terms/")!=-1)jQuery(".header .active > ul > li:contains('Cловарь терминов')").addClass("active");}
if(jQuery(".innerTags").is("div"))
{var h1Text=jQuery("h1").eq(0).text(),url=window.location.toString(),innerSocial='<div id="innerSocial">'+'<a rel="nofollow" href="http://twitter.com/home/?status='+h1Text+'http://tinyurl.com/2vrceh3" class="innerTwitter" title="затвитить">twitter</a>'+'<a rel="nofollow" href="http://memori.ru/link/?sm=1&u_data[url]='+url+'&u_data[name]='+h1Text+'" class="innerMemory" title="добавить в memory.ru">добавить в memory.ru</a>'+'<a rel="nofollow" href="http://www.bobrdobr.ru/addext.html?url='+url+'&title='+h1Text+'" class="innerBobr" title="забобрить">забобрить</a>'+'<a rel="nofollow" href="http://vkontakte.ru/share.php?url='+url+'" class="innerVkontakte" title="добавить в vkontakte.ru">добавить в vkontakte.ru</a>'+'<a rel="nofollow" href="http://www.facebook.com/sharer.php?u='+url+'&t='+h1Text+'" class="innerFacebook" title="добавить на facebook">добавить на facebook</a>'+'<a rel="nofollow" href="http://my.ya.ru/posts_add_link.xml?title='+h1Text+'&URL='+url+'" class="innerYa" title="добавить в я.ru">добавить в я.ru</a>'+'<a rel="nofollow" href="http://www.google.com/bookmarks/mark?op=add&title='+h1Text+'&bkmk='+url+'" class="innerGoogle" title="добавить в закладки google">добавить в закладки google</a>'+'<a rel="nofollow" href="http://www.livejournal.com/update.bml?event='+url+'&subject='+h1Text+'" class="innerLJ" title="добавить в livejournal">добавить в livejournal</a>'+'<a rel="nofollow" href="http://www.liveinternet.ru/journal_post.php?action=l_add&cnurl='+url+'" class="innerLi" title="добавить в live internet">добавить в live internet</a>'+'<a rel="nofollow" href="http://connect.mail.ru/share?share_url='+url+'" class="innerMailru" title="добавить в мой мир">добавить в мой мир</a>'+'</div>';jQuery(".innerTags").after(innerSocial);var jsGoogle=document.createElement('script'),body=document.getElementsByTagName('body')[0];jsGoogle.src='http://apis.google.com/js/plusone.js';body.appendChild(jsGoogle);var jsTwitter=document.createElement('script');jsTwitter.src="http://platform.twitter.com/widgets.js";body.appendChild(jsTwitter);var jsMailru=document.createElement('script');jsMailru.src="http://cdn.connect.mail.ru/js/loader.js";body.appendChild(jsMailru);var jsVkontakte=document.createElement('script');jsVkontakte.src="http://userapi.com/js/api/openapi.js?31";body.appendChild(jsVkontakte);innerSocial=''+'<div id="likeFacebook"><iframe src="http://www.facebook.com/plugins/like.php?href='+url+'&layout=button_count&show_faces=false&width=200&action=like&colorscheme=light&height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:21px;" allowTransparency="true"></iframe></div>'+'<div id="vk_like"></div>'+'<div id="likeMailru"><a target="_blank" class="mrc__plugin_like_button" href="http://connect.mail.ru/share" data-mrc-config="{\'type\' : \'button\', \'width\' : \'150\'}">Нравится</a></div>'+'<div id="likeGoogle"><g:plusone size="medium"></g:plusone></div>'+'<div id="likeTwitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a></div>'+'';jQuery("#innerSocial").append(innerSocial);window.onload=function(){VK.init({apiId:2353717,onlyWidgets:true});VK.Widgets.Like("vk_like",{type:"button"});}}});function validAnswer()
{jQuery("#addComment").unbind("submit");jQuery('#emailSubscribe').unbind("submit");jQuery('#comment').unbind("focus");jQuery('#name').unbind("focus");jQuery('#addComment #code').unbind("focus");jQuery('#addCommentChangeCode').unbind("click");if(jQuery('form#addComment').length!=0)
{var allCookie=document.cookie,allCookieArray=allCookie.split(';'),cookieName='xiperContrForm=',xCookie;jQuery.each(allCookieArray,function(){var curCookie=jQuery.trim(this);if(curCookie.indexOf(cookieName)==0)
{xCookie=curCookie.split('=');}});if(xCookie)
{var xValues=unescape(xCookie[1]);xValues=xValues.split(';');jQuery('#name').attr('value',xValues[0]);jQuery('#email').attr('value',xValues[1]);jQuery('#subsc-email').attr('value',xValues[1]);};};jQuery('#addComment').submit(function()
{if(jQuery('#remember').attr('checked')==true)
{var cookieVal=escape(jQuery('#name').attr('value')+';'+jQuery('#email').attr('value')),cookieDomain='',cookiePath='/',cookieExp=new Date();cookieExp.setMonth(cookieExp.getMonth()+1);document.cookie='xiperContrForm='+cookieVal+'; expires='+cookieExp.toGMTString()+'; path=/; domain='+cookieDomain+';';}
else
{cookieExp=new Date();cookieExp.setMonth(cookieExp.getMonth()-1);document.cookie="xiperContrForm=; path=/; expires="+cookieExp.toGMTString();};var error=0;if(jQuery("#comment").val()=='')
{jQuery("#comment").css("border-color","red").val("сюда нужно что-то толковое написать");error++;}
if(jQuery("#name").val()==''||jQuery("#name").val()=='забыл как тебя зовут?')
{jQuery("#name").css("border-color","red").val("забыл как тебя зовут?");error++;}
if(jQuery("#code").val()=='')
{jQuery("#code").css("border-color","red").val("введи код");error++;}
if(error>0)return false;var thisForm=jQuery(this);var parentidVal=0;if(thisForm.attr("typepost")=="answer")parentidVal=thisForm.prev().attr("id");try
{jQuery.ajax({type:"POST",url:"books/ajax_get/add_comment",timeout:15000,data:thisForm.serialize()+"&coment_parent_id="+parentidVal+"&url="+window.location,beforeSend:function(){jQuery('#addComment').css('cursor','wait').find('input[type=submit]').eq(0).attr('disabled','disabled');jQuery('#addComment input').css('cursor','wait');},success:function(msg){if(msg=="er-code")
{jQuery("#code").css("border-color","red").val("неверный код");}
else if(msg=="er-comment")
{alert("Неверный формат сообщения.");}
else
{var formatMsg;formatMsg='<li>'+msg+'</li>';if(jQuery("#addComment").attr("typePost")=="new")
{if(jQuery("#comments > ul").is("ul"))jQuery("#comments > ul").append(formatMsg);else
{formatMsg="<ul>"+formatMsg+"</ul>";jQuery("#comments").find("p").remove().end().append(formatMsg);}}
else
{if(thisForm.parent().find("ul").is("ul"))
{thisForm.parent().find("ul").eq(0).append(formatMsg);}
else
{formatMsg="<ul>"+formatMsg+"</ul>";thisForm.parent().append(formatMsg);}}
document.getElementById("addComment").reset();jQuery("#feedbackCapcha").attr("src","php/change-code.php?"+Math.random());validAnswer();}
jQuery('#addComment').css('cursor','inherit').find('input[type=submit]').eq(0).removeAttr('disabled');jQuery('#addComment input').css('cursor','inherit');},error:function(jqXHR,textStatus,errorThrown)
{alert("При попытке отправить сообщение произошла неизвестная ошибка. \n Попробуй еще раз через несколько минут."+textStatus);jQuery('#addComment').css('cursor','inherit').find('input[type=submit]').eq(0).removeAttr('disabled');jQuery('#addComment input').css('cursor','inherit');}});}
catch(e)
{alert("При попытке отправить сообщение произошла неизвестная ошибка. \n Попробуй еще раз через несколько минут.");}
return false;});jQuery('#emailSubscribe').submit(function(){jQuery.ajax({type:"POST",url:"books/ajax_get/add_subscribe",timeout:5000,data:"comment_resource="+jQuery('#comment_resource').attr('value')+"&resource_type="+jQuery('#resource_type').attr('value')+"&email="+jQuery('#subsc-email').attr('value'),beforeSend:function(){jQuery('#emailSubscribe input').css('cursor','wait')
jQuery('#emailSubscribe').find('input[type=submit]').eq(0).attr('disabled','disabled');},success:function(msg){if(msg=='ok')alert('Подписка прошла успешно!');else alert(msg);jQuery('#emailSubscribe').find('input[type=submit]').eq(0).removeAttr('disabled');jQuery('#emailSubscribe *').css('cursor','inherit');},error:function(){alert('Не удалось подключиться к серверу!\r\nПовторите попытку позже!');jQuery('#emailSubscribe').find('input[type=submit]').eq(0).removeAttr('disabled');jQuery('#emailSubscribe *').css('cursor','inherit');return false;}});return false;});jQuery('#comment').focus(function()
{if(jQuery(this).val()=="сюда нужно что-то толковое написать")
{jQuery(this).val('').css("border-color","#6699ff");}
return true;});jQuery('#name').focus(function()
{if(jQuery(this).val()=="забыл как тебя зовут?")
{jQuery(this).val('').css("border-color","#6699ff");}
return true;});jQuery('#addComment #code').focus(function()
{var codeText=jQuery(this).val();if(codeText=="введи код"||codeText=="неверный код")
{jQuery(this).val('').css("border-color","#6699ff");}
return true;});jQuery('#addCommentChangeCode').click(function()
{jQuery("#feedbackCapcha").attr("src","php/change-code.php?"+Math.random());return true;});}
function insert(start,end){element=document.getElementById("comment");if(document.selection){element.focus();sel=document.selection.createRange();sel.text=start+sel.text+end;}else if(element.selectionStart||element.selectionStart=='0'){element.focus();var startPos=element.selectionStart;var endPos=element.selectionEnd;element.value=element.value.substring(0,startPos)+start+element.value.substring(startPos,endPos)+end+element.value.substring(endPos,element.value.length);}else{element.value+=start+end;}}