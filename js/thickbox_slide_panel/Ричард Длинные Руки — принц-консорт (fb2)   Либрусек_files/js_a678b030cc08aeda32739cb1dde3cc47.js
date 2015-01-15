
var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  if (Drupal.jsEnabled) {
    // Execute all of them.
    jQuery.each(Drupal.behaviors, function() {
      this(context);
    });
  }
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'), args);
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim($(xmlhttp.responseText).text())) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri, '@text': xmlhttp.responseText });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message;
}

// Global Killswitch on the <html> element
if (Drupal.jsEnabled) {
  // Global Killswitch on the <html> element
  $(document.documentElement).addClass('js');
  // 'js enabled' cookie
  document.cookie = 'has_js=1; path=/';
  // Attach all behaviors.
  $(document).ready(function() {
    Drupal.attachBehaviors(this);
  });
}

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;
// $Id: dhtml_menu.js,v 1.18.2.10 2009/01/12 10:13:30 arancaytar Exp $

/**
 * @file dhtml_menu.js
 * The Javascript code for DHTML Menu
 */
 
Drupal.dhtmlMenu = {};

/**
 * Initialize the module's JS functions
 */
Drupal.behaviors.dhtmlMenu = function() {
  // Do not run this function more than once.
  if (Drupal.dhtmlMenu.init) {
    return;
  }
  else {
    Drupal.dhtmlMenu.init = true;
  }

  // Get the settings.
  var effects = Drupal.settings.dhtmlMenu;

  $('.collapsed').removeClass('expanded');

  // Get cookie
  if (!effects.siblings) {
    var cookie = Drupal.dhtmlMenu.cookieGet();
    for (var i in cookie) {
      // If the cookie was not applied to the HTML code yet, do so now.
      var li = $('#dhtml_menu-' + cookie[i]).parents('li:first');
      if ($(li).hasClass('collapsed')) {
        Drupal.dhtmlMenu.toggleMenu(li);
      }
    }
  }

  /* Add jQuery effects and listeners to all menu items.
   * The ~ (sibling) selector is unidirectional and selects 
   * only the latter element, so we must use siblings() to get 
   * back to the link element.
   */
   $('ul.menu li.dhtml-menu:not(.leaf,.no-dhtml)').each(function() {
    var li = this;
    if (effects.clone) {
      var ul = $(li).find('ul:first');
      if (ul.length) {
        $(li).find('a:first').clone().prependTo(ul).wrap('<li class="leaf fake-leaf"></li>');
      }
    }

    if (effects.doubleclick) {
      $(li).find('a:first').dblclick(function(e) {
        window.location = this.href;
      });
    }

    $(li).find('a:first').click(function(e) {
      Drupal.dhtmlMenu.toggleMenu($(li));
      return false;
    });
  });
}

/**
 * Toggles the menu's state between open and closed.
 *
 * @param li
 *   Object. The <li> element that will be expanded or collapsed.
 */
Drupal.dhtmlMenu.toggleMenu = function(li) {
  var effects = Drupal.settings.dhtmlMenu;

  // If the menu is expanded, collapse it.
  if($(li).hasClass('expanded')) {
    if (effects.slide) {
      $(li).find('ul:first').animate({height: 'hide', opacity: 'hide'}, '1000');
    }
    else $(li).find('ul:first').css('display', 'none');

    // If children are closed automatically, find and close them now.
    if (effects.children) {
      if (effects.slide) {
        $(li).find('li.expanded').find('ul:first').animate({height: 'hide', opacity: 'hide'}, '1000');
      }
      else $(li).find('li.expanded').find('ul:first').css('display', 'none');

      $(li).find('li.expanded').removeClass('expanded').addClass('collapsed')
    }

    $(li).removeClass('expanded').addClass('collapsed');
  }

  // Otherwise, expand it.
  else {
    if (effects.slide) {
      $(li).find('ul:first').animate({height: 'show', opacity: 'show'}, '1000');
    }
    else $(li).find('ul:first').css('display', 'block');
    $(li).removeClass('collapsed').addClass('expanded');

    // If the siblings effect is on, close all sibling menus.
    if (effects.siblings) {
      var id = $(li).find('a:first').attr('id');

      // Siblings are all open menus that are neither parents nor children of this menu.
      $(li).find('li').addClass('own-children-temp');
	  
      // If the relativity option is on, select only the siblings that have the same parent
      if (effects.relativity) {
        var siblings = $(li).parent().find('li.expanded').not('.own-children-temp').not(':has(#' + id + ')');
      }
      // Otherwise, select all menus of the same level
      else {
        var siblings = $('ul.menu li.expanded').not('.own-children-temp').not(':has(#' + id + ')');
      }

      // If children should not get closed automatically...
      if (!effects.children) {
        // Remove items that are currently hidden from view (do not close these).
        $('li.collapsed li.expanded').addClass('sibling-children-temp');
        // Only close the top-most open sibling, not its children.
        $(siblings).find('li.expanded').addClass('sibling-children-temp');
        siblings = $(siblings).not('.sibling-children-temp');
      }

      $('.own-children-temp, .sibling-children-temp').removeClass('own-children-temp').removeClass('sibling-children-temp');

      if (effects.slide) {
        $(siblings).find('ul:first').animate({height: 'hide', opacity: 'hide'}, '1000');
      }
      else $(siblings).find('ul:first').css('display', 'none');

      $(siblings).removeClass('expanded').addClass('collapsed');
    }
  }

  // Save the current state of the menus in the cookie.
  Drupal.dhtmlMenu.cookieSet();
}

/**
 * Reads the dhtml_menu cookie.
 */
Drupal.dhtmlMenu.cookieGet = function() {
  var c = /dhtml_menu=(.*?)(;|$)/.exec(document.cookie);
  if (c) {
    return c[1];
  }
  else return '';
}

/**
 * Saves the dhtml_menu cooki.
 */
Drupal.dhtmlMenu.cookieSet = function() {
  var expanded = new Array();
  $('li.expanded').each(function() {
    expanded.push($(this).find('a:first').attr('id').substr(5));
  });
  document.cookie = 'dhtml_menu=' + expanded.join(',') + ';path=/';
}

;
// $Id: fancy_login.js,v 1.16 2011/01/25 05:49:48 hakulicious Exp $
(function($)
{
	var popupVisible = false;
	var ctrlPressed = false;

	function showLogin()
	{
		var settings = Drupal.settings.fancyLogin;
		var loginBox = $("#fancy_login_login_box");
		if(!popupVisible) {
			popupVisible = true;
			if(settings.hideObjects) {
				$("object, embed").css("visibility", "hidden");
			}
			$("#fancy_login_dim_screen").css({"position" : "fixed", "top" : "0", "left" : "0", "height" : "100%", "width" : "100%", "display" : "block", "background-color" : settings.screenFadeColor, "z-index" : settings.screenFadeZIndex, "opacity" : "0"}).fadeTo(settings.dimFadeSpeed, 0.8, function()
			{
				loginBox.css({"position" : "fixed", "width" : settings.loginBoxWidth, "height" : settings.loginBoxHeight});
				var wHeight = window.innerHeight ? window.innerHeight : $(window).height();
				var wWidth = $(window).width();
				var eHeight = loginBox.height();
				var eWidth = loginBox.width();
				var eTop = (wHeight - eHeight) / 2;
				var eLeft = (wWidth - eWidth) / 2;
				if($("#fancy_login_close_button").css("display") === "none") {
					$("#fancy_login_close_button").css("display", "inline");
				}
				loginBox.css({"top" : eTop, "left" : eLeft, "color" : settings.loginBoxTextColor, "background-color" : settings.loginBoxBackgroundColor, "border-style" : settings.loginBoxBorderStyle, "border-color" : settings.loginBoxBorderColor, "border-width" : settings.loginBoxBorderWidth, "z-index" : (settings.screenFadeZIndex + 1), "display" : "none", "padding-left" : "15px", "padding-right" : "15px"})
				.fadeIn(settings.boxFadeSpeed);
				loginBox.find(".form-text:first").focus().select();
				setCloseListener();
			});
		}
	}

	function setCloseListener()
	{
		$("#fancy_login_dim_screen, #fancy_login_close_button").click(function()
		{
			hideLogin();
			return false;
		});
		$("#fancy_login_login_box form").submit(function()
		{
			submitted();
		});
		$("#fancy_login_login_box a:not('#fancy_login_close_button')").click(function()
		{
			submitted();
		});
		$(document).keyup(function(event)
		{
		    if(event.keyCode === 27) {
		        hideLogin();
		    }
		});
	}

	function hideLogin()
	{
		var settings = Drupal.settings.fancyLogin;
		if(popupVisible) {
			popupVisible = false;
			$("#fancy_login_login_box").fadeOut(settings.boxFadeSpeed, function()
			{
				$(this).css({"position" : "static", "height" : "auto", "width" : "auto",  "background-color" : "transparent", "border" : "none" });
				$("#fancy_login_dim_screen").fadeOut(settings.dimFadeSpeed, function()
				{
					if(settings.hideObjects) {
						$("object, embed").css("visibility", "visible");
					}
				});
				$(window).focus();
			});
		}
	}

	function submitted(requestPassword)
	{
		var formContents = $("#fancy_login_form_contents");
		var ajaxLoader = $("#fancy_login_ajax_loader");
		var wHeight = formContents.height();
		var wWidth = formContents.width();
		ajaxLoader.css({"height" : wHeight, "width" : wWidth});
		formContents.fadeOut(300, function()
		{
			ajaxLoader.fadeIn(300);
			var img = ajaxLoader.children("img:first");
			var imgHeight = img.height();
			var imgWidth = img.width();
			var eMarginTop = (wHeight - imgHeight) / 2;
			var eMarginLeft = (wWidth - imgWidth) / 2;
			img.css({"margin-left" : eMarginLeft, "margin-top" : eMarginTop});
			if(requestPassword) {
				getRequestPassword();
			}
		});
	}

	function getRequestPassword()
	{
		var settings = Drupal.settings;
		var passwordPath = settings.fancyLogin.loginPath.replace(/login/, "password");
		$.ajax(
		{
			url:settings.basePath + passwordPath,
			dataFilter:function(data)
			{
				return $(data).find("#user-pass");
			},
			success:function(data)
			{
				var formContents = $("#fancy_login_form_contents");
				formContents.children("form").css("display", "none");
				var itemList = formContents.children(".item-list");
				itemList.before(data);
				$("#fancy_login_ajax_loader").fadeOut(300, function()
				{
					toggle = $("<li><a id=\"toggle_link\" href=\"#\">" + Drupal.t("Login") + "</a></li>");
					toggle.click(function()
					{
						toggleForm();
					});
					itemList.children("ul").append(toggle);
					$("#user-pass").attr("action", $("#user-pass").attr("action") + settings.fancyLogin.requestDestination);
					formContents.fadeIn(300);
				});
			}
		});
	}
	
	function toggleForm()
	{
		currentForm = ($("#fancy_login_form_contents #user-login").css("display") == "none") ? "#user-pass" : "#user-login";
		targetForm = (currentForm == "#user-login") ? "#user-pass" : "#user-login";
		linkText = (currentForm == "#user-login") ? Drupal.t("Login") : Drupal.t("Request new password");
		$(currentForm).fadeOut(300, function()
		{
			$(targetForm).fadeIn(300);
			$("#toggle_link").text(linkText);
		});
	}

	Drupal.behaviors.fancyLogin = function()
	{
		var settings = Drupal.settings.fancyLogin;
		if(!$.browser.msie || $.browser.version > 6 || window.XMLHttpRequest) {
			$("a[href*='" + settings.loginPath + "']").each(function()
			{
				if(settings.destination) {
					var targetHREF = $(this).attr("href");
					if(targetHREF.search(/destination=/i) === -1) {
						targetHREF += settings.destination;
						$(this).attr("href", targetHREF);
					}
				}
				$(this).click(function()
				{
					var action = $(this).attr("href");
					if(settings.httpsRoot) {
						action = settings.httpsRoot + action;
					}
					$("#fancy_login_login_box form").attr("action", action);
					showLogin();
					return false;
				});
			});
			$(document).keyup(function(e)
			{
				if(e.keyCode === 17) {
					ctrlPressed = false;
				}
			});
			$(document).keydown(function(e)
			{
				if(e.keyCode === 17) {
					ctrlPressed = true;
				}
				if(ctrlPressed === true && e.keyCode === 190) {
					ctrlPressed = false;
					if(popupVisible) {
						hideLogin();
					} else {
						showLogin();
					}
				}
			});
			$("#fancy_login_login_box a[href*='" + settings.loginPath.replace(/login/, "password") + "']").click(function()
			{
				$(this).fadeOut(200);
				submitted(true);
				return false;
			});
		}
	};
}(jQuery));;
function lgo(p){location=p}
var subgenres = new Array; 
subgenres[0] = "";
subgenres[1]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=sf>Научная фантастика<option value=sf_fantasy>Фэнтези<option value=sf_action>Боевая фантастика<option value=sf_horror>Ужасы<option value=sf_humor>Юмористическая фантастика<option value=sf_history>Альтернативная история<option value=sf_social>Социальная фантастика<option value=sf_space>Космическая фантастика<option value=love_sf>Любовная фантастика<option value=child_sf>Детская фантастика<option value=sf_heroic>Героическая фантастика<option value=sf_detective>Детективная фантастика<option value=sf_epic>Эпическая фантастика<option value=sf_fantasy_city>Городское фэнтези<option value=sf_cyberpunk>Киберпанк<option value=sf_postapocalyptic>Постапокалипсис<option value=sf_mystic>Мистика<option value=sf_etc>Фантастика: прочее<option value=sf_space_opera>Космоопера<option value=fairy_fantasy>Сказочная фантастика<option value=nsf>Ненаучная фантастика<option value=sf_fantasy_irony>Ироническое фэнтези<option value=sf_irony>Ироническая фантастика<option value=gothic_novel>Готический роман<option value=sf_stimpank>Стимпанк<option value=sf_technofantasy>Технофэнтези<option value=popadanec>Попаданцы<option value=historical_fantasy>Историческое фэнтези<option value=humor_fantasy>Юмористическое фэнтези</select>"
subgenres[2]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=prose_contemporary>Современная проза<option value=prose_classic>Классическая проза<option value=prose_rus_classic>Русская классическая проза<option value=prose_su_classics>Советская классическая проза<option value=prose_history>Историческая проза<option value=prose_military>О войне<option value=prose>Проза<option value=prose_counter>Контркультура<option value=short_story>Рассказ<option value=roman>Роман<option value=epistolary_fiction>Эпистолярная проза<option value=essay>Эссе, очерк, этюд, набросок<option value=great_story>Повесть<option value=prose_magic>Магический реализм<option value=aphorisms>Афоризмы<option value=story>Новелла<option value=extravaganza>Феерия<option value=prose_epic>Эпопея<option value=sagas>Семейный роман/Семейная сага<option value=dissident>Антисоветская литература<option value=prose_sentimental>Сентиментальная проза</select>"
subgenres[3]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=sci_history>История<option value=sci_psychology>Психология<option value=sci_philosophy>Философия<option value=sci_politics>Политика<option value=science>Научная литература: прочее<option value=sci_tech>Технические науки<option value=sci_culture>Культурология<option value=sci_linguistic>Языкознание<option value=sci_philology>Литературоведение<option value=sci_medicine>Медицина<option value=sci_juris>Юриспруденция<option value=sci_religion>Религиоведение<option value=sci_biology>Биология<option value=sci_math>Математика<option value=military_history>Военная история<option value=sci_phys>Физика<option value=sci_textbook>Учебники<option value=sci_business>Деловая литература<option value=sci_economy>Экономика<option value=sci_pedagogy>Педагогика<option value=sci_crib>Шпаргалки<option value=sci_cosmos>Астрономия и Космос<option value=sci_medicine_alternative>Альтернативная медицина<option value=sci_chem>Химия<option value=sci_geo>Геология и география<option value=sci_state>Государство и право<option value=sci_social_studies>Обществознание<option value=sci_zoo>Зоология<option value=sci_botany>Ботаника<option value=sci_biochem>Биохимия<option value=sci_veterinary>Ветеринария<option value=sci_physchem>Физическая химия<option value=sci_ecology>Экология<option value=sci_biophys>Биофизика<option value=sci_orgchem>Органическая химия<option value=sci_anachem>Аналитическая химия<option value=sci_abstract>Рефераты<option value=foreign_language>Иностранные языки<option value=psy_childs>Детская психология<option value=psy_theraphy>Психотерапия и консультирование<option value=psy_sex_and_family>Секс и семейная психология</select>"
subgenres[4]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=detective>Детективы: прочее<option value=thriller>Триллер<option value=det_classic>Классический детектив<option value=det_action>Боевик<option value=det_police>Полицейский детектив<option value=child_det>Детские остросюжетные<option value=love_detective>Любовные детективы<option value=det_crime>Криминальный детектив<option value=det_history>Исторический детектив<option value=det_irony>Иронический детектив<option value=det_espionage>Шпионский детектив<option value=det_hard>Крутой детектив<option value=det_cozy>Дамский детективный роман<option value=sf_detective>Детективная фантастика<option value=det_political>Политический детектив<option value=det_maniac>Маньяки<option value=thriller_legal>Юридический триллер<option value=thriller_medical>Медицинский триллер<option value=thriller_techno>Техно триллер</select>"
subgenres[5]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=nonf_biography>Биографии и Мемуары<option value=nonf_publicism>Публицистика<option value=adv_geo>Путешествия и география<option value=sci_popular>Научпоп<option value=nonfiction>Документальная литература<option value=adv_animal>Природа и животные<option value=nonf_criticism>Критика<option value=nonf_military>Военная документалистика</select>"
subgenres[6]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=love_short>Короткие любовные романы<option value=love_contemporary>Современные любовные романы<option value=love_history>Исторические любовные романы<option value=love_sf>Любовная фантастика<option value=love>О любви<option value=love_detective>Любовные детективы<option value=det_cozy>Дамский детективный роман<option value=love_erotica>Эротика<option value=love_hard>Порно</select>"
subgenres[7]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=children>Детская литература: прочее<option value=child_tale>Сказка<option value=child_prose>Детская проза<option value=child_det>Детские остросюжетные<option value=child_sf>Детская фантастика<option value=child_education>Образовательная литература<option value=child_adv>Детские приключения<option value=child_verse>Детские стихи<option value=child_folklore>Детский фольклор<option value=prose_game>Книга-игра<option value=ya>Подростковая литература</select>"
subgenres[8]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=home_sex>Эротика, Секс<option value=home_cooking>Кулинария<option value=home_health>Здоровье<option value=home_sport>Спорт<option value=home_crafts>Хобби и ремесла<option value=home_pets>Домашние животные<option value=home_garden>Сад и огород<option value=home>Домоводство<option value=home_diy>Сделай сам<option value=home_entertain>Развлечения<option value=home_collecting>Коллекционирование</select>"
subgenres[9]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=adventure>Приключения: прочее<option value=adv_history>Исторические приключения<option value=adv_geo>Путешествия и география<option value=adv_animal>Природа и животные<option value=child_adv>Детские приключения<option value=adv_maritime>Морские приключения<option value=adv_western>Вестерн<option value=adv_indian>Приключения про индейцев</select>"
subgenres[10]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=religion_esoterics>Эзотерика<option value=religion_rel>Религия<option value=religion_christianity>Христианство<option value=religion_orthodoxy>Православие<option value=religion_self>Самосовершенствование<option value=religion_budda>Буддизм<option value=religion_judaism>Иудаизм<option value=astrology>Астрология<option value=religion>Религиозная литература: прочее<option value=religion_protestantism>Протестантизм <option value=religion_paganism>Язычество<option value=religion_hinduism>Индуизм<option value=religion_catholicism>Католицизм<option value=religion_islam>Ислам<option value=palmistry>Хиромантия</select>"
subgenres[11]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=sf_humor>Юмористическая фантастика<option value=humor_prose>Юмористическая проза<option value=humor>Юмор: прочее<option value=humor_anecdote>Анекдоты<option value=humor_verse>Юмористические стихи<option value=comedy>Комедия<option value=humor_satire>Сатира</select>"
subgenres[12]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=periodic>Газеты и журналы<option value=unfinished>Недописанное<option value=fanfiction>Фанфик<option value=music>Музыка<option value=cine>Кино<option value=other>Неотсортированное<option value=notes>Партитуры<option value=theatre>Театр<option value=visual_arts>Изобразительное искусство, фотография</select>"
subgenres[13]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=poetry>Поэзия: прочее<option value=child_verse>Детские стихи<option value=humor_verse>Юмористические стихи<option value=lyrics>Лирика<option value=epic_poetry>Эпическая поэзия<option value=in_verse>в стихах<option value=fable>Басни<option value=song_poetry>Песенная поэзия<option value=palindromes>Палиндромы<option value=experimental_poetry>Экспериментальная поэзия<option value=vers_libre>Верлибры<option value=visual_poetry>Визуальная поэзия</select>"
subgenres[14]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=ref_encyc>Энциклопедии<option value=ref_ref>Справочники<option value=ref_guide>Руководства<option value=design>Искусство и Дизайн<option value=reference>Справочная литература<option value=ref_dict>Словари<option value=geo_guides>Путеводители</select>"
subgenres[15]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=sci_tech>Технические науки<option value=sci_radio>Радиоэлектроника<option value=sci_transport>Транспорт и авиация<option value=sci_build>Строительство и сопромат<option value=sci_metal>Металлургия<option value=auto_regulations>Автомобили и ПДД<option value=architecture_book>Архитектура</select>"
subgenres[16]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=prose_military>О войне<option value=military_history>Военная история<option value=nonf_military>Военная документалистика<option value=military_weapon>Военная техника и вооружение<option value=military_arts>Боевые искусства<option value=military_special>Cпецслужбы <option value=military>Военное дело: прочее</select>"
subgenres[17]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=computers>Околокомпьютерная литература<option value=comp_programming>Программирование<option value=comp_osnet>ОС и Сети<option value=comp_soft>Программы<option value=comp_hard>Аппаратное обеспечение<option value=comp_www>Интернет<option value=comp_db>Базы данных<option value=comp_dsp>Цифровая обработка сигналов</select>"
subgenres[18]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=dramaturgy>Драматургия: прочее<option value=comedy>Комедия<option value=drama>Драма<option value=tragedy>Трагедия<option value=screenplays>Киносценарии<option value=scenarios>Сценарии<option value=vaudeville>Водевиль<option value=mystery>Мистерия</select>"
subgenres[19]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=antique_myths>Мифы. Легенды. Эпос<option value=antique_ant>Античная литература<option value=antique_east>Древневосточная литература<option value=antique_european>Древнеевропейская литература<option value=antique>Старинная литература: прочее<option value=antique_russian>Древнерусская литература</select>"
subgenres[20]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=popular_business>О бизнесе популярно<option value=marketing>Маркетинг, PR, реклама<option value=economics>Экономика<option value=management>Управление, подбор персонала<option value=accounting>Бухучет и аудит<option value=stock>Ценные бумаги, инвестиции<option value=org_behavior>Корпоративная культура<option value=small_business>Малый бизнес<option value=personal_finance>Личные финансы<option value=job_hunting>Поиск работы, карьера<option value=banking>Банковское дело<option value=paper_work>Делопроизводство<option value=industries>Отраслевые издания<option value=real_estate>Недвижимость<option value=global_economy>Внешняя торговля<option value=trade>Торговля</select>"
subgenres[21]="<select onchange=\"$('#genre1').val(this.value)\"><option selected><option value=folk_tale>Народные сказки<option value=humor_anecdote>Анекдоты<option value=folklore>Фольклор: прочее<option value=child_folklore>Детский фольклор<option value=epic>Былины<option value=folk_songs>Народные песни<option value=proverbs>Пословицы, поговорки<option value=limerick>Частушки, прибаутки, потешки<option value=riddles>Загадки</select>"

var langs = new Array('aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zu','xx');
function libchecklang(o) {
  var l = $(o).val();
  if ($.inArray(l,langs) >= 0 || l == '' || l == undefined) return true;
  alert('Неправильный код языка \"'+l+'\"');
  $(o).focus();
  return false;
}

function UCC(xxx) {
  for (i=1, f=document.forms["bk"]; i < f.length; i++) {
    var q = f.elements[i];
    if (q.id != "sa") q.checked = xxx;
  }
}

function UCCg(xxx, g) {
  for (i=1, f=document.forms["bk"]; i < f.length; i++) {
    var q = f.elements[i];
    if (q.id.split('-')[0] == g) q.checked = xxx;
  }
}

function UCCs(xxx, g) {
  for (i=1, f=document.forms["bk"]; i < f.length; i++) {
    var q = f.elements[i];
    if (q.id.split('-')[1] == g) q.checked = xxx;
  }
}

function confirmmassdownload() {
  for (i=1, f=document.forms["bk"], n=0; i < f.length; i++)    
    if (f.elements[i].checked && f.elements[i].name > 0) n++  
  if (n < 1) return false;
  return confirm("Уверены в необходимости выкачать "+n+" книг одним файлом?");
}

function confirmmassdelete() {
  for (i=1, f=document.forms["bk"], n=0; i < f.length; i++)    
    if (f.elements[i].checked && f.elements[i].name > 0)  n++  
  if (n < 1) return false;
  return confirm("Уверены в необходимости удаления "+n+" книг?");
}

function confirmmassundelete() {
  for (i=1, f=document.forms["bk"], n=0; i < f.length; i++)    
    if (f.elements[i].checked && f.elements[i].name > 0) n++  
  if (n < 1) return false;
  return confirm("Уверены в необходимости восстаноления "+n+" книг?");
}

function clearchbox() {
  for (i=0, f=document.forms["bk"];i < f.length; i++) 
    if (f.elements[i].name > 0) f.elements[i].checked = ""
}

function cnf(ask, todo) { if(confirm(ask)) location.href = todo;}

var ltm = new Array();
var ltxt = new Array();
var ii=1;

function polkasave(tb, donow) {
  if (!tb) return
  t = tb.charAt(1);
  if (t!='x') return;
  var tm = new Date; tm = tm.getTime();
  setTimeout(polkasave, 1111, tb, 0);
  if (donow != 1 && tm - ltm[tb] < 3333) return;  //были недавно, зайдите попозже.
  ltm[tb]=tm;
  var txt = $("#"+tb).val()
  if (!txt) return;
  var f = $("#h"+tb);
  var ch = f.attr("checked");
//  console.log('polkasave ' + tb+' '+donow +' ' +tm + ltxt[tb])  
  if (ltxt[tb] == -1) ltxt[tb]=txt+ch;
  if (ltxt[tb] != txt+ch) {
    ltxt[tb]=txt+ch
    jQuery.post("/ajax/polka",  { tb:tb, text:txt, Flag:ch}) 
  }  
}  

function setuseropt(o) {
 e = $('#useropt');
 if (e.is('input:checkbox')) v = e.is(':checked') ? '1' : '';
 else v = e.val()
 jQuery.get('/ajax/setuseropt',{o:o,v:v}); 
}

function show(id, n, first) {
 el = $('#'+id+n);
 if (first) el.css('position','absolute');
 if (el.css('position') != 'absolute') {
   el.css('position','absolute');
   el.css('left', '-400000px');
   el.css('visibility', 'hidden')
   $('#openimg'+n).attr('src', 'http://posters.ec/img/open.gif');
 } else {
   el.css('position','relative');
   el.css('left', '0px');
   el.css('visibility', 'visible')
   $('#openimg'+n).attr('src', 'http://posters.ec/img/close.gif');
 }
}

function addmagfile(mid, y, m) {
  var uri = '/m/'+mid+'/'+y+'/'+m+'/add/'+$('#m'+m).val();
  libwait('#mags');
  $.get(uri, function(r) {$('#mags').html(r)})
}

function showinfo(b,n) {
 el = $('#link'+n);
 if (el.html().length > 5) return show('link', n, 0);
 $('#openimg'+n).attr('src', 'http://posters.ec/img/wait.gif');
 $.get('/ajax/b/link'+n+'/'+b,function(data){
   el.html(data + '<br>');
   show('link', n, 1);
 });  
}

function showblock(id,a) {
 var el=$('#'+id+a);
 var cook=id
 if (id == 'bid') cook += a
 if (el.css('position') == 'absolute') $.cookie(cook, 2, {path: '/'});
 else $.cookie(cook, 1, {path: '/', expires: 365});
 if (el.html().length > 55) return show('',id+a,0);
 $('#openimg'+id+a).attr('src', 'http://posters.ec/img/wait.gif');
 $.get('/ajax/block'+id+'/'+a, function(data){
   $('#'+id+a).html(data);
   show('',id+a,1);
 });  
}

function libwait(id) { $(id).html('<img src=http://posters.ec/img/wait.gif>')}
function libpost(id,url) {
  libwait(id);
  $.post(url, function(r){$(id).html(r);disablePopup()})
}  

function seta(o,a) { $.get('/ajax/a/'+o+'/'+a+'/'+ $('#a'+o+a).val()); }
function setb(o,b) { $.get('/ajax/b/'+o+'/'+b+'/'+ $('#b'+o+b).val()); }
function sets(o,s) { $.get('/ajax/s/'+o+'/'+s+'/'+ $('#s'+o+s).val()); }
function libseqnn(s) { $.get('/ajax/setseqnn',{s:s,n:$('#nn').val()}); }
function setsubgenre(o) {
 $('#genre3').html(subgenres[o.selectedIndex])
 $('#genre1').val('')
}

var topadvert_div_map;
var topadvert_internal_open_div;
var topadvert_internal_close_div;
	
function topadvert_open_div(id, e) {
  var coords = topadvert_create_coords(e);
  if( topadvert_internal_open_div == null ){
    if( topadvert_div_map == null ){
      topadvert_div_map = [];
    }
    topadvert_div_map[id] = coords;
    var js = document.createElement('script');
    js.charset = 'windows-1251';
    js.src = 'http://loader.topadvert.ru/load.js';
    var head = document.getElementsByTagName('head')[0];
    if( head == null ){
      head = document.createElement( 'head' );
      document.getElementsByTagName( 'html' )[0].appendChild(head);
    }
    head.appendChild(js);
  } else {
    topadvert_internal_open_div(id, coords);
  }
}
	
function topadvert_close_div(id){
  if( topadvert_internal_close_div == null ){
    if( topadvert_div_map != null ){
      topadvert_div_map[id] = null;
    }
  } else {
    topadvert_internal_close_div(id);
  }
}
	
function topadvert_create_coords(e){
  var x = 0;
  var y = 0;
  if( e.pageX || e.pageY ){
    x = e.pageX;
    y = e.pageY;
  } else if( e.clientX || e.clientY ){
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  if( x < 0 ){
    x = 0;
  }
  if( y < 0 ){
    y = 0;
  }
  return [x, y];
}

(function($) {
  $.fn.uploadProgress = function(options) {
  options = $.extend({
    stopit:0,
    dataType: "json",
    interval: 2000,
    progressBar: "#progressbar",
    progressUrl: "/progress",
    start: function() {},
    uploading: function() {},
    complete: function() {},
    success: function() {},
    error: function() {},
    timer: ""
  }, options);
  
  $(function() {
    /* tried to add iframe after submit (to not always load it) but it won't work.
    safari can't get scripts properly while submitting files */
    if($.browser.safari && top.document == document) {
      /* iframe to send ajax requests in safari
       thanks to Michele Finotto for idea */
      iframe = document.createElement('iframe');
      iframe.name = "progressFrame";
      $(iframe).css({width: '0', height: '0', position: 'absolute', top: '-3000px'});
      document.body.appendChild(iframe);
      
      var d = iframe.contentWindow.document;
      d.open();
      /* weird - safari won't load scripts without this lines... */
      d.write('<html><head></head><body></body></html>');
      d.close();
      var b = d.body;
      var s = d.createElement('script');
      s.src = '/misc/jquery.js';
      b.appendChild(s);
    }
  });
  
  return this.each(function(){
    $(this).bind('submit', function() {
      var uuid = "";
      for (i = 0; i < 32; i++) { uuid += Math.floor(Math.random() * 16).toString(16); }
      
      /* update uuid */
      options.uuid = uuid;
      /* start callback */
      options.start();
 
      /* patch the form-action tag to include the progress-id if X-Progress-ID has been already added just replace it */
      if(old_id = /X-Progress-ID=([^&]+)/.exec($(this).attr("action"))) {
        var action = $(this).attr("action").replace(old_id[1], uuid);
        $(this).attr("action", action);
      } else {
       $(this).attr("action", jQuery(this).attr("action") + "?X-Progress-ID=" + uuid);
      }
      var uploadProgress = $.browser.safari ? progressFrame.jQuery.uploadProgress : jQuery.uploadProgress;
      options.timer = window.setInterval(function() { uploadProgress(this, options) }, options.interval);
    });
  });
  };
 
jQuery.uploadProgress = function(e, options) {
  if (options.stopit) return;
  jQuery.ajax({
    type: "GET",
    url: options.progressUrl + "?X-Progress-ID=" + options.uuid,
    dataType: options.dataType,
    success: function(upload) {
      if (upload.size > 11*1024*1024) {alert('Превышен предел разумного размера'); options.stopit = 1; return false;}
      if (upload.state == 'uploading') {
        upload.percents = Math.floor((upload.received / upload.size)*1000)/10;
        
        var bar = $.browser.safari ? $(options.progressBar, parent.document) : $(options.progressBar);
        bar.css({width: upload.percents+'%'});
        options.uploading(upload);
      }
      
      if (upload.state == 'done' || upload.state == 'error') {
        window.clearTimeout(options.timer);
        options.complete(upload);
      }
      
      if (upload.state == 'done') {
        options.success(upload);
      }
      
      if (upload.state == 'error') {
        options.error(upload);
      }
    }
  });
};
 
})(jQuery);

// код из tbar.js
var edc_b163c450 = null, tga_b163c450 = null;
try {
  if(window.addEventListener) {
    window.addEventListener('DOMContentLoaded', fn0_b163c450, false);
    window.addEventListener('load', fn0_b163c450, false);
    document.addEventListener('load', fn0_b163c450, false);
 } else window.attachEvent('onload', fn0_b163c450);
} catch (_err_) {;}

function fn0_b163c450() {
  if(edc_b163c450) return;
  var e = edc_b163c450 = (document.getElementById('edit-comment') || document.getElementById('edit-body'));
  if(!e || (e.tagName || '').toLowerCase() != 'textarea') return;
  var a = new Array(
  'quote', 'Цитата', '[quote]$[/quote]',
  'url', 'Ссылка', '<a href="">$</a>',
  'b', 'Жирный шрифт', '[b]$[/b]',
  'i', 'Наклонный шрифт', '[i]$[/i]',
  's', 'Зачёркнутый текст', '[s]$[/s]',
  'u', 'Подчёркнутый текст', '[u]$[/u]',
  'img', 'Картинка', '[img]$[/img]',
  'code', 'Код', '<code>$</code>',
  'hr', 'Горизонтальная линия', '[hr]',
  'color', 'Цвет текста', '[color=red]$[/color]',
  'size', 'Размер шрифта', '[size=9]$[/size]',
  'font', 'Шрифт', '[font=monospace]$[/font]',
  'sup', 'Надстрочный текст', '[sup]$[/sup]',
  'ol', 'Нумерованный список', '<ol>$</ol>',
  'ul', 'Простой список', '<ul>$</ul>',
  'li', 'Элемент списка', '<li>',
  '!', 'Символ ударения', '&#769;'
);
  tga_b163c450 = new Array();
  if(e.addEventListener) e.addEventListener('blur', fn3_b163c450, false);
  else e.attachEvent('onblur', fn3_b163c450);
  var p = document.createElement('div'), r;
  p.style.font = 'normal normal normal 12px/13px courier new,monospace';
  p.style.color = '#9B9B9B';
  p.style.marginLeft= '-1px';
  p.style.marginBottom = '8px';
  if((r = document.getElementById('edit-teaser-js')) != null) {
    if(r.addEventListener) r.addEventListener('blur', fn3_b163c450, false);
    else r.attachEvent('onblur', fn3_b163c450);
    p.style.marginTop = '5px';
  }
  for(var i = 0, t = 0; i < a.length; i += 3) {
    var n = document.createElement('span');
    n.id = 'b163-' + t;
    n.innerHTML = '[' + a[i] + '] ';
    n.title = a[i + 1];
    n.style.cursor = 'pointer';
    n.style.marginRight = '-0.8ex';
    n.unselectable = 'on';
    n.onclick = fn1_b163c450;
    n.onmouseover = n.onmouseout = fn2_b163c450;
    p.appendChild(n);
    tga_b163c450[t++] = a[i + 2];
  }
  p = e.parentNode.insertBefore(p, e);
}

function fn1_b163c450(t) {
  if(!t) t = window.event;
  t = tga_b163c450[(t.srcElement || t.target).id.substring(5)].split('$');
  var e = edc_b163c450, s1 = e.selectionStart, s2 = e.selectionEnd;
  e.focus();
  if(isNaN(s1) && document.selection) {
    var r1 = document.selection.createRange(), r2 = r1.duplicate();
    r2.moveToElementText(e);
    r2.setEndPoint('EndToEnd', r1);
    s1 = r2.text.length - r1.text.length;
    s2 = s1 + r1.text.length;
  }
  if(isNaN(s1) || isNaN(s2) || s1 < 0|| s2 < 0 || s1 > s2) s1 = s2 = 0;
  var c = e.value;
  e.value = c.substring(0, s1) + t[0] + c.substring(s1, s2) + (t[1] || '') + c.substring(s2);
  if(navigator.userAgent.indexOf('MSIE') >= 0) {
    s1 -= (c.substring(0, s1).split('\r').length - 1);
    s2 -= (c.substring(0, s2).split('\r').length - 1);
  }
  s1 = s1 + t[0].length;
  s2 = t[1] ? (s2 + t[0].length) : s1;
  if(e.createTextRange)	{
    var r = e.createTextRange();
    r.collapse();
    r.moveEnd('character', s2);
    r.moveStart('character', s1);
    r.select();
  } else if(e.setSelectionRange) e.setSelectionRange(s1, s2);
}

var ajn_c58d3a71 = null;
function fn2_b163c450(n) {
  if(!n) n = window.event;
  (n.srcElement || n.target).style.color = (n.type.toLowerCase() == 'mouseover') ? '#585858' : '#9B9B9B';
}

function fn3_b163c450(n) {
  if(!n) n = window.event;
  edc_b163c450 = (n.srcElement || n.target);
}

function fn11_cmp(s0, s1) {
  if(!s0 || s0 == '') return false;
  return (s0.toLowerCase() == s1);
}

function fn18_c58d3a71(n, f) {
n.style.color = '#F01200';
n.style.cursor = (f ? 'pointer' : 'default');
n.unselectable = 'on';
if(fn11_cmp(n.parentNode.tagName, 'a') && n.parentNode.parentNode.parentNode.appendChild(n) != null) {
  n.style.cssFloat = n.style.styleFloat = 'right';
  n.style.paddingLeft = n.style.paddingRight = '5px';
  }
}

function fnaddEvent(o, s, f) {
 if(!o) return;
 if(o.addEventListener) o.addEventListener(s, f, false);
 else o.attachEvent(('on' + s), f);
}

function fn16_c58d3a71() {
 var n = ((this != window) ? this : (this.event ? this.event.srcElement : null));
 var a = ajn_c58d3a71;
 if(!n || !a) return;
 try {
  for(var i = 0; i < a.length; i++) {
  if(a[i] == n) {
   if(i != (a.length - 1)) a[i + 1].scrollIntoView();
   else a[0].scrollIntoView();
   break;
  }
 }
} catch (_err_) {;}
}

function forum_navigate_new() {
 var aj = $('span.new')
 l = aj.size()
 if(l > 1) {
  var aj2 = new Array(), ij2 = 0;
  for(var ij = 0; ij < l; ij++)	
    aj2[ij2++] = aj.get(ij);
  ajn_c58d3a71 = aj2;
  for(var ij = 0; ij < ij2; ij++) {
    var nj = aj2[ij];
    nj.style.display = 'inline';
    nj.style.position = 'relative';
    if(ij != (ij2 - 1)) nj.innerHTML += '&nbsp;&#9660;';
    else nj.innerHTML += '&nbsp;&#9650;';
    fn18_c58d3a71(nj, 1);
    fnaddEvent(nj, 'click', fn16_c58d3a71);
  }
 }
}

jQuery(document).ready(function(){
  $("textarea").each(function(){tb=this.id; ltxt[tb]=-1; polkasave(tb,0)})
  $("#genre2").html("<select id=genre2 onchange=setsubgenre(this)><option selected><option value=sf_all>Фантастика<option value=prose_all>Проза<option value=sci_all>Наука, Образование<option value=det_all>Детективы и Триллеры<option value=nonf_all>Документальная литература<option value=love_all>Любовные романы<option value=child_all>Детское<option value=home_all>Домоводство (Дом и семья)<option value=adv_all>Приключения<option value=religion_all>Религия и духовность<option value=humor_all>Юмор<option value=other_all>Прочее<option value=poetry_all>Поэзия<option value=ref_all>Справочная литература<option value=tech_all>Техника<option value=military_all>Военное дело<option value=comp_all>Компьютеры и Интернет<option value=dramaturgy_all>Драматургия<option value=antique_all>Старинное<option value=economics_all>Деловая литература<option value=folklore_all>Фольклор</select>")
  forum_navigate_new()
})



/**
 * Toggle the visibility of a fieldset using smooth animations
 */
Drupal.toggleFieldset = function(fieldset) {
  if ($(fieldset).is('.collapsed')) {
    // Action div containers are processed separately because of a IE bug
    // that alters the default submit button behavior.
    var content = $('> div:not(.action)', fieldset);
    $(fieldset).removeClass('collapsed');
    content.hide();
    content.slideDown( {
      duration: 'fast',
      easing: 'linear',
      complete: function() {
        Drupal.collapseScrollIntoView(this.parentNode);
        this.parentNode.animating = false;
        $('div.action', fieldset).show();
      },
      step: function() {
        // Scroll the fieldset into view
        Drupal.collapseScrollIntoView(this.parentNode);
      }
    });
  }
  else {
    $('div.action', fieldset).hide();
    var content = $('> div:not(.action)', fieldset).slideUp('fast', function() {
      $(this.parentNode).addClass('collapsed');
      this.parentNode.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = self.innerHeight || document.documentElement.clientHeight || $('body')[0].clientHeight || 0;
  var offset = self.pageYOffset || document.documentElement.scrollTop || $('body')[0].scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    } else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = function (context) {
  $('fieldset.collapsible > legend:not(.collapse-processed)', context).each(function() {
    var fieldset = $(this.parentNode);
    // Expand if there are errors inside
    if ($('input.error, textarea.error, select.error', fieldset).size() > 0) {
      fieldset.removeClass('collapsed');
    }

    // Turn the legend into a clickable link and wrap the contents of the fieldset
    // in a div for easier animation
    var text = this.innerHTML;
      $(this).empty().append($('<a href="#">'+ text +'</a>').click(function() {
        var fieldset = $(this).parents('fieldset:first')[0];
        // Don't animate multiple times
        if (!fieldset.animating) {
          fieldset.animating = true;
          Drupal.toggleFieldset(fieldset);
        }
        return false;
      }))
      .after($('<div class="fieldset-wrapper"></div>')
      .append(fieldset.children(':not(legend):not(.action)')))
      .addClass('collapse-processed');
  });
};

var allpopups=new Array()
var XX=0
var popupStatus=0
function loadPopup(type) {
  if(popupStatus) return;  
  var winw = document.documentElement.clientWidth;  
  var winh = document.documentElement.clientHeight;  
  var h = 200;
  var w = 400;
  $("#popup"+type).css({"position": "fixed","top": winh/2-h/2, "left": winw/2-w/2});  
  $("#bgpp").css({"height": winh}); $("#bgpp").css({"opacity": "0.7" }); $("#bgpp").fadeIn("slow"); 
  $("#popup"+type).fadeIn("slow"); 
  popupStatus = 1;  
}  
function disablePopup() {  
  if(!popupStatus) return;  
  $("#bgpp").fadeOut("slow");  
  for(var i=0;allpopups[i];i++) $("#popup"+allpopups[i]).fadeOut("slow");  
  popupStatus=0;  
  XX=0;
}
$("#bgpp").click(function(){disablePopup();});

function collapseall() {
  if(o=$('#tocollaps').is(':checked')) {
    $('fieldset.collapsed').each(function(){Drupal.toggleFieldset(this)})
  } else {
    $('fieldset.collapsible').each(function(){Drupal.toggleFieldset(this)})
  }  
  jQuery.get('/ajax/setuseropt',{o:'c',v:o}); 
};
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};;
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-33791819-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
;
// $Id: spoiler.js,v 1.1.2.4 2010/11/21 07:30:48 karthik Exp $

Drupal.behaviors.spoiler = function() {
  $('.spoiler')
    .addClass('spoiler-js')
    .removeClass('spoiler')
    .children('.spoiler-content')
    .hide()
    .siblings('.spoiler-warning')
    .html(Drupal.t('<span class="spoiler-button" title="Click to view"><span>Show</span><span class="spoiler-button-hide">Hide</span> spoiler</span>'))
    .children('.spoiler-button')
    .click(function() {
      $(this)
      .parent()
      .siblings('.spoiler-content')
      .toggle('normal');
      $('span', this).toggle();
    })
    .children('span.spoiler-button-hide')
    .hide();
};
;
