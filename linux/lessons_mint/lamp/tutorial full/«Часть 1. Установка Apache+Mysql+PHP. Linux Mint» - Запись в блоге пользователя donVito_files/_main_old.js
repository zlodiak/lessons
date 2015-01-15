/*
	Главный скрипт сайта
*/
/*
	Функции прокрутки лент постов и другого содержимого
*/
function fancybox() {
	$('.fancybox').fancybox({
		helpers: {
			title : {type : 'inside'},
			buttons: {},
			overlay	: {
				opacity : 0.8,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		},
		openEffect: 'elastic',
		openSpeed: 'normal',
		closeEffect: 'elastic',
		closeSpeed: 'fast',
		nextSpeed: 'normal',
		prevSpeed: 'normal',
		playSpeed: 5000
	});
}

function slider(obj, el, step, speed, options) {
	if (!options) options = {};
	if (typeof(options.append) == 'undefined') options.append = false;
	if (typeof(options.width) == 'undefined') options.width = false;
	if (typeof(options.line) == 'undefined') options.line = '.line';
	
	if (!speed) speed = 2;
	if (options.width) {
		width = 0;
		$(obj + ' div ' + options.line + ' ' + el).each(function(){
			width += $(this).outerWidth(true); 
		});
		$(obj + ' div ' + options.line).css('width', width);
	}
	$(obj + ' div ' + options.line).html($(obj + ' div ' + options.line).html().replace(/>[\s\r\n\t]+</ig, '><'));
	if (options.append) $(obj + ' div ' + options.line).append('<div>&nbsp;</div>');
	var $el = $(obj + ' ' + options.line + ' ' + el + ':first-child');
	
	$(obj + ' .left')[0].onclick = function(){
		var $p = $el.prev(el) ? $el.prev(el) : $el;
		for (var i = 1; i < step; i ++)
			if ($p.prev(el)) $p = $p.prev(el);
		if ($p.length > 0) {
			$(obj + ' div:first').stop().animate({scrollLeft: $p[0].offsetLeft}, ($(obj + ' div:first')[0].scrollLeft - $p[0].offsetLeft) / speed, 'swing', function(){options.scrollLeft = $(this).scrollLeft();});
			$el = $p;
		}
	};
	$(obj + ' .right')[0].onclick = function(){
		if ($(obj + ' div:first').scrollLeft() >= $(obj + ' div:first')[0].scrollWidth - $(obj + ' div:first').width()) return;
		var $n = $el.next(el) ? $el.next(el) : $el;
		for (var i = 1; i < step; i ++)
			if ($n.next(el)) $n = $n.next(el);
		if ($n.length > 0) {
			$(obj + ' div:first').stop().animate({scrollLeft: $n[0].offsetLeft}, ($n[0].offsetLeft - $(obj + ' div:first')[0].scrollLeft) / speed, 'swing', function(){options.scrollLeft = $(this).scrollLeft();});
			$el = $n;
		}
	};
}
/* ------------------------------------------------------------------------------------------------------------------------
	Делаем прокручиваемую графическую ленту постов в теле сайта
*/
function top_slider(step, speed, pause) {
	this.timer = null;
	this.timer_dir = 'right';
	this.speed = speed;
	this.step = step;
	this.pause = pause;
	$('#home_slider div .line').html($('#home_slider div .line').html().replace(/\>[\s\r\n\t]+\</ig, '><'));
	this.el = $('#home_slider .line section:first-child');
	
	var self = this;

	$('#home_slider .left').click(function(){
		self.homeSliderMove('left');
	});
	$('#home_slider .right').click(function(){
		self.homeSliderMove('right');
	});
	$('#home_slider').mouseover(function(){
		clearInterval(self.timer);
	});
	$('#home_slider').mouseout(function(){
		self.timer = setInterval(function(){self.homeSliderMove(self.timer_dir);}, self.pause * 1000);
	});
	$('#home_slider').mouseout();
	
	this.homeSliderMove = function(dir) {
		if (dir == 'left') {
			var $p = self.el.prev('section');
			for (var i = 1; i < step; i ++)
				if ($p.length > 0) $p = $p.prev('section');
			if ($p.length > 0) {
				$('#home_slider div:first').stop().animate({scrollLeft: $p[0].offsetLeft}, ($('#home_slider div:first')[0].scrollLeft - $p[0].offsetLeft) / self.speed, 'swing');
				self.el = $p;
			} else self.timer_dir = 'right';
		} else {
			var $n = self.el.next('section');
			for (var i = 1; i < step; i ++)
				if ($n.length > 0) $n = $n.next('section');
			if ($n.length > 0) {
				$('#home_slider div:first').stop().animate({scrollLeft: $n[0].offsetLeft}, ($n[0].offsetLeft - $('#home_slider div:first')[0].scrollLeft) / self.speed, 'swing');
				self.el = $n;
			} else self.timer_dir = 'left';
		}
	}
}

$(function(){
	//var sl_header_tags = new slider('#scrollable', 'a', 3, 0.4, {width: true, line: 'nav'});
	//var sl_header_posts = new slider('#last_post_line', 'a', 1, 1);
	if ($('#home_slider').length > 0) var index_top_slider = new top_slider(1, 1, 5);
});



/*
	------------------------------------------------------------------------------------------------------------------------
*/
/*
	Задаем функции показа и скрытия блока авторизации
*/
var __lb_handler = null;
$(function(){
	$('#logined_menu a').each(function(){
		if($(this).attr('href').indexOf('javascript:') == 0) {
			$(this).click(function(e) {
                showLoginedMenu(this);
            });
		}
	});
	$('body').bind('click', function(){
		if(typeof(__lb_handler) == 'object' && $(__lb_handler).css('opacity') == 1){hideLoginedMenu(__lb_handler);return;}
		if(__lb_handler != 'box' && $('header .header div.login .box').css('opacity') == 1)hideLoginBox();
	});
});
function showLoginBox()
{
	var $box = $('header .header div.login .box');
	var $content = $box.children('div');
	$box.css({opacity: 0, display: 'block'});
	var h = $content.css('height');
	$content.css({overflow: 'hidden', height: '1px'});
	$box.stop().animate({opacity: 1}, 300, 'swing');
	$content.stop().animate({height: h}, 300, 'swing', function(){$content.css('height', 'auto')});
	$box.click(function(){__lb_handler = 'box';setTimeout(function(){__lb_handler = null},100);});
}

function hideLoginBox()
{
	var $box = $('header .header div.login .box');
	if ($box.css('opacity') == 0) return;
	var $content = $box.children('div');
	$box.stop().animate({opacity: 0}, 300, 'swing', function(){$box.css('display', 'none')});
	$content.stop().animate({height: '1px'}, 300, 'swing', function(){$content.css('height', 'auto')});
}

function showLoginedMenu(a)
{
	if (__lb_handler) {
		var $a = __lb_handler;
		$a.animate({opacity: 0, height: '21px'}, 300, 'swing', function(){
			$a.css({display: 'none', height: 'auto'});
		});
	}
	var $b = $(a).parents('li').children('ul');
	$b.css('opacity', 0);
	var h = $b.outerHeight();
	$b.css({display: 'block', height: '20px'});
	$b.animate({opacity: 1, height: h}, 300, 'swing');
	__lb_handler = $b;
}

function hideLoginedMenu(a)
{
	var $b = $(a);	
	$b.animate({opacity: 0, height: '21px'}, 300, 'swing', function(){
		__lb_handler = null;
		$b.css({display: 'none', height: 'auto'});
	});
}
/*
	------------------------------------------------------------------------------------------------------------------------
*/
$(function(){
	$('#drop_down_menu li').each(function(){
		$(this).click(function(){
			var val = $(this).attr('data-value');
			$('#search_query_type').val(val);
			$('#drop_menu_btn').attr('title', 'Искать ' + (val == 'people' ? 'людей' : $(this).text().toLowerCase()));
		});
	});
	$('#drop_menu_btn').click(function(){
        showSearchTypeList();
    });
	$('body').bind('click', function(){if($('#drop_down_menu').css('opacity') == 1)hideSearchTypeList()});
});

function showSearchTypeList()
{
	var $box = $('#drop_down_menu');
	$box.css({opacity: 0, display: 'block'});
	var h = $box.css('height');
	$box.css({overflow: 'hidden', height: '1px'});
	$box.stop().animate({opacity: 1, height: h}, 300, 'swing', function(){$box.css('height', 'auto')});
	
}

function hideSearchTypeList()
{
	var $box = $('#drop_down_menu');
	if ($box.css('opacity') == 0) return;
	$box.stop().animate({opacity: 0, height: '1px'}, 300, 'swing', function(){$box.css({display: 'none', height: 'auto'});});
}

/*
	------------------------------------------------------------------------------------------------------------------------
*/
$(function(){
	if ($('#dynamic_line').length > 0) 
		if ($('.dynamic_line').length > 0)
		{
			dynamic_line_position();
			setInterval(function(){
				dynamic_line_position();
			}, 400);
		} 
		else $('#dynamic_line').remove();
});
function dynamic_line_position()
{
	var top = $('.dynamic_line').offset().top + ($('.dynamic_line').height() / 2);
	$('#dynamic_line').css('marginTop', top + 'px');
}

var _onct = null;
$(function(){
	$('.answer').each(function(){
		if ($(this).children('input')[0].type == 'radio') 
			$(this).click(function(e) {
				$(this).children('input')[0].checked = true;
			});
		else 
		{
			$(this).click(function(e) {
				var self = this;
				$(self).children('input')[0].checked = !$(self).children('input')[0].checked;
			});
		}
			
	});
});


/* ----------------------------------------- */
/* ----------------------------------------- */
/* |||||			Objects			   ||||| */
/* ----------------------------------------- */
/* ----------------------------------------- */

setInterval(function(){if (Comment._timer) Comment.load_comments(Comment._timer_pid)}, 30 * 1000);

var Comment = {
	parent_id: 0,
	_last_id: 0,
	last_id: 0,
	current_id: 0,
	_loading: false,
	editable: null,
	editable_text: null,
	_timer: null,
	_timer_pid: null,
	construct: function(s){
		if (!s) s = 'comment_editor';
		if(!is_mobile)tinyMCE.execCommand('mceAddControl',true,s);
	},
	timer: function(pid, off){
		if (off){
			this._timer = false;
			return;
		}
		if (pid) this._timer_pid = pid; else pid = this._timer_pid;
		Comment._timer = true;
	},
	destroy: function(s){
		if (!s) s = 'comment_editor';
		if(!is_mobile)tinyMCE.execCommand('mceRemoveControl',true,s);
	},
	open: function(id) {
		var $obj = $('#comment_' + id + ' .closed:first');
		$obj.children('div:first').remove();
		$obj.animate({height: $obj[0].scrollHeight}, 300, function(){$obj.find('.top_num').css('z-index', '5')});
	},
	resetNew: function(id) {
		$('#comment_' + id).removeClass('new');
		var $parent = $('#comment_' + id);
		while (($parent = $parent.parents('.comment')).length > 0)
			$parent.removeClass('new');
	},
	respond: function(id, f){
		var self = this;
		if (id != this._last_id) {
			if (id != 0) self.timer(null, true); else self.timer();
			this.destroy();
			var $respond = $('#comment_' + id + ' .js-respond:first');
			var $current = $('#comment_' +this._last_id + ' .js-respond:first');
			$current.css('overflow', 'hidden');
			$respond.css('opacity', 0);
			$respond.html($current.html());
			$current.children('#comment_editor').attr('id', 'null');
			var last_id = this._last_id;
			if (id == 0) $current.css('opacity', 0);
			$current.stop().animate({height: last_id == 0 ? 16 : 0, opacity: 0}, 300, 'swing', function(){
				if (last_id == 0) {
					$current.html('<div id="new_comment"><a href="javascript:" onclick="Comment.respond(0)">Написать комментарий</a></div>');
					$current.stop().animate({opacity: 1}, 194, 'swing', function(){self.toggleLoading(true);});
				}
			});
			$respond.stop().animate({height: 200, opacity: 1}, 300, 'swing', function(){if (f) f();$respond.css('height', 'auto');});
			
			this.resetNew(id);
				
			this.construct();
		}
		this.parent_id = id;
		this._last_id = id;
	},
	scrollTo: function(pid, id, obj){
		$('html, body').animate({scrollTop: $('#comment_' + pid).offset().top}, 400, 'swing', function(){
			if (id && $('#comment_' + pid + ' .scroll_to:first .down').length == 0) 
				$('#comment_' + pid + ' .scroll_to:first').append('<span class="down" onclick="Comment.scrollTo(\'' + id + '\', null, this);">&darr;</span>');
			if (obj) $(obj).remove();
		});
		this.resetNew(id);
	},
	toggleLoading: function(res, $respond){
		var $loading = $('#comment_' + this._last_id + ' .loading:first');
		if (!$respond) $respond = $('#comment_' + this._last_id + ' .js-respond:first');
		if (res) {
			$loading.css({display: 'none', opacity: 0});
			return;
		}
		if (!this._loading) {
			$loading.css({height: $respond.outerHeight(), width: $respond.outerWidth()});
			$loading.stop().animate({opacity: .7}, 500);
			this._loading = true; 
		} else {
			$loading.stop().animate({opacity: 0}, 500, null, function(){
				$loading.css({'display': 'none'});
			});
			this._loading = false; 
		}
	},
	send: function(pid){
		var self = this;
		var text = !is_mobile ? tinyMCE.get('comment_editor').getContent() : $('#comment_editor').val();
		if (text.replace(/^[\s\t]+$/ig, '') == '') {
			UI.msg('Комментарий не должен быть пустым', 'alert');
			return;
		}
		this.toggleLoading();
		AJAX.json('ajax/comments/add/', {'pid': this.parent_id, 'post_id': pid, 'text': text, 'social': $('#social_user').val()}, null, function(res){
			if (!is_mobile) tinyMCE.get('comment_editor').setContent(''); else $('#comment_editor').val('');
			self.toggleLoading();
			self.load_comments(pid, res.data.id);
			self.timer();
		}, function(){self.toggleLoading();});
	},
	remove: function(id){
		var self = this;
		if (!confirm('Вы уверены, что хотите удалить этот комментарий?')) return;
		AJAX.json('ajax/comments/delete/', {'id': id}, null, function(res){
			var tree = [];
			$('#comment_' + id).children('.comment').each(function(){tree[tree.length] = $(this);});
			
			data = res.data;
			var block = '<div class="deleted"><span class="moder">' + ((data.moder && data.moder != '') ? data.moder : 'Комментарий был удален') + '</span> <span class="scroll_to">';
			if (data.pid != 0)
				block += '<span onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
			block += '</span></div><div class="js-respond"></div><div class="border"></div>';
			$('#comment_' + id).html(block);
			for (key in tree) $('#comment_' + id).append(tree[key]);
		});
	},
	edit: function(id){
		var self = this;
		if (self.editable) {
			//text = !is_mobile ? tinyMCE.get('edit_comment').getContent() : $('#edit_comment').val();
			self.destroy('edit_comment');
			self.editable.html(this.editable_text);
			if (self.editable.parent().attr('id') == 'comment_' + id) {
				self.editable = null;
				self.timer();
				return;
			}
		}
		this.timer(null, true);
		this.editable_text = $('#comment_' + id + ' .content:first').html();
		$('#comment_' + id + ' .content:first').html('<textarea id="edit_comment">' + this.editable_text.replace(/^\s+(.*?)\s+$/gi, '$1') + '</textarea><input type="button" value="Сохранить" onclick="Comment.update('+id+')"><input type="button" value="Отменить" onclick="Comment.edit('+id+')">');
		self.construct('edit_comment');
		self.editable = $('#comment_' + id + ' .content:first');
	},
	update: function(id){
		var self = this;
		var text = !is_mobile ? tinyMCE.get('edit_comment').getContent() : $('#edit_comment').val();
		AJAX.json('ajax/comments/edit/', {'id': id, 'text': text}, null, function(res){
			self.destroy('edit_comment');
			self.editable = null;
			$('#comment_' + id + ' .content:first').html(res.data.text);
			if ($('#comment_' + id + ' > .moder:first')) $('#comment_' + id + ' > .moder:first').html(res.data.moder);
			else $('#comment_' + id + ' .content:first').after('<br><span class="moder">' + res.data.moder + '</span>');
			self.timer();
		});
	},
	/*load_comments: function(pid, sid) {
		var self = this;
        console.log(2);
		AJAX.json('ajax/comments/get/', {'pid': pid, 'lid': this.last_id}, null, function(res){
			res = res.data;
			if (res.length > 0 && ($c = $('#comments .empty_text')).length > 0) $c.remove();
			for (var i = 0; i < res.length; i ++) {
				var data = res[i];
				if ($('#comment_' + data.id).length > 0) continue;
				var block = '<div class="comment new" id="comment_' + data.id + '">';
				if (data.deleted == 0) {
					if (data.rating <= Config.min_comment_rating) {
						block += '<div class="closed"><div><span class="open f-right" onclick="Comment.open(\'' + data.id + '\')">Раскрыть комментарий</span><a href="' + base_url(data.user_name) + '">' + data.user_name + '</a><span class="text">Комментарий скрыт</span><span class="scroll_to">';
						if (data.pid != 0)
							block += '<span onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
						block += '</span></div>';
					}
					block += '<div class="author"><img class="avatar" style="' + data.style + '" src="' + (data.social_user == '1' ? '' : Config.userpics_url) + data.user_photo + '" alt="' + data.user_name + '" width="44" height="44"><a href="' + (data.social_user == '1' ? data.link : base_url(data.user_name)) + '">' + data.user_name + '</a><span class="date">' + data.date + '</span></div><div class="content" onclick="Comment.resetNew(' + data.id + ');">' + data.text + '</div>' + (data.moder ? '<br><span class="moder">' + data.moder + '</span>' : '') + '<div class="clear"></div><div class="controls"><div class="rating f-right"><span class="rating_minus" onclick="Rating.set(\'comment\', \'' + data.id + '\', -1, \'#comment_' + data.id + ' .rating:first .num\')"></span><span class="num ' + (data.rating < 0 ? 'red' : '') + '">' + data.rating + '</span><span class="rating_plus" onclick="Rating.set(\'comment\', \'' + data.id + '\', 1, \'#comment_' + data.id + ' .rating:first .num\')"></span></div>';
					if (data.allow_response == 1) block += '<a class="text grey" href="javascript:" onclick="Comment.respond(\'' + data.id + '\')">Ответить</a>';
					if (data.allow_edit == 1) block += '&nbsp;&nbsp;<a href="javascript:" onclick="Comment.edit(\'' + data.id + '\')" title="Редактировать"><span class="ico-cedit"></span></a>';
					if (data.allow_delete == 1) block += '&nbsp;&nbsp;<a href="javascript:" onclick="Comment.remove(\'' + data.id + '\')" title="Удалить"><span class="ico-cdelete"></span></a>';
					block += '&nbsp;<a href="#comment_' + data.id + '" title="Ссылка на комментарий"><span class="ico-link"></span></a><span class="scroll_to">';
                    
					if (data.pid != 0)
						block += '<span title="Перейти к родительскому комментарию" onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
                    block += '</span><a class="f-right violation text" href="javascript:" onclick="Rating.violation(\'comment\', ' + data.id + ', this)">Пожаловаться!</a></div>';
					if (data.rating <= Config.min_comment_rating) block += '</div>';
				} else {
					block += '<div class="deleted"><span class="moder">' + (data.moder != '' ? data.moder : 'Комментарий был удален') + '</span> <span class="scroll_to">';
                    if (data.pid != 0)
						block += '<span onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
                    block += '</span></div>';
				}
				block += '<div class="js-respond"></div><div class="border"></div></div>';
				if (data.pid == 0) $('#comment_0').before(block);
				else $('#comment_' + data.pid).append(block);
				if (data.id > self.last_id) self.last_id = data.id;
			}
			$('#comments > h2:first').html('Комментарии (' + $('#comments .comment').length + ')');
			self.respond(0, function(){if (sid) $('html,body').animate({scrollTop: $('#comment_' + sid).offset().top}, 700, 'swing');});
		});
	},*/
}

var Feed = {
	add_user: function(obj, uid, callback){
		if (!callback) callback = function(){};
		AJAX.json('ajax/feeds/user/', {'uid': uid}, null, function(){
			$(obj).removeClass('ico-plus');
			$(obj).addClass('ico-minus');
			$(obj).text('Отписаться');
			obj.onclick = function(){
                Feed.remove_user(obj, uid);
            };
			callback();
		});
	},
	remove_user: function(obj, uid, callback){
		if (!callback) callback = function(){};
		AJAX.json('ajax/feeds/rem_user/', {'uid': uid}, null, function(){
			$(obj).removeClass('ico-minus');
			$(obj).addClass('ico-plus');
			$(obj).text('Читать');
			obj.onclick = function(){
                Feed.add_user(obj, uid);
            };
			callback();
		});
	},
	add_post: function(obj, uid, title){
		AJAX.json('ajax/feeds/comments/', {'pid': uid, 'title': title}, null, function(){
			$(obj).text('Отписаться от комментариев');
			obj.onclick = function(){
                Feed.remove_post(obj, uid, title);
            };
		});
	},
	remove_post: function(obj, uid, title){
		AJAX.json('ajax/feeds/rem_comments/', {'pid': uid, 'title': title}, null, function(){
			$(obj).text('Подписаться на комментарии');
			obj.onclick = function(){
                Feed.add_post(obj, uid, title);
            };
		});
	},
	add_community: function(obj, uid, title, short){
		AJAX.json('ajax/feeds/community/', {'cid': uid, 'title': title}, null, function(){
			$(obj).removeClass('ico-plus');
			$(obj).addClass('ico-minus');
			if (short) $(obj).text('Выйти'); 
			else $(obj).text('Выйти из сообщетсва');
			obj.onclick = function(){
                Feed.remove_community(obj, uid, title, short);
            };
		});
	},
	remove_community: function(obj, uid, title, short){
		AJAX.json('ajax/feeds/rem_community/', {'cid': uid, 'title': title}, null, function(){
			$(obj).removeClass('ico-minus');
			$(obj).addClass('ico-plus');
			if (short) $(obj).text('Вступить'); 
			else $(obj).text('Вступить в сообщетсво');
			obj.onclick = function(){
                Feed.add_community(obj, uid, title, short);
            };
		});
	},
	add_company: function(obj, uid, title, short){
		AJAX.json('ajax/feeds/company/', {'cid': uid, 'title': title}, null, function(){
			$(obj).removeClass('ico-plus');
			$(obj).addClass('ico-minus');
			$(obj).text('Отписаться');
			obj.onclick = function(){
                Feed.remove_company(obj, uid, title, short);
            };
		});
	},
	remove_company: function(obj, uid, title, short){
		AJAX.json('ajax/feeds/rem_company/', {'cid': uid, 'title': title}, null, function(){
			$(obj).removeClass('ico-minus');
			$(obj).addClass('ico-plus');
			$(obj).text('Подписаться');
			obj.onclick = function(){
                Feed.add_company(obj, uid, title, short);
            };
		});
	},
	add_favorite: function(obj, uid, title){
		AJAX.json('ajax/feeds/favorite/', {'pid': uid, 'title': title}, null, function(){
			$(obj).text('Удалить из избранного');
			obj.onclick = function(){
                Feed.remove_favorite(obj, uid, title);
            };
		});
	},
	remove_favorite: function(obj, uid, title){
		AJAX.json('ajax/feeds/rem_favorite/', {'pid': uid, 'title': title}, null, function(){
			$(obj).text('В избранное');
			obj.onclick = function(){
                Feed.add_favorite(obj, uid, title);
            };
		});
	},
};

var Rating = {
	set: function(type, uid, val, selector, s){
		if (!s) s = 0;
		if (s && val >= 0) if (!confirm('Внимание!\r\nНажимая на кнопку «Превосходно!», вы признаетесь в том, что восхищены автором: вы прибавляете посту удвоенное количество очков рейтинга, вносите эту запись в «Избранное», а также дарите автору этой записи единицу собственного рейтинга!')) return;
		if (s && val < 0) if (!confirm('Внимание!\r\nНажимая на кнопку «УГ!», вы признаетесь в том, что очень недовольны автором: вы отнимаете у поста удвоенное количество очков рейтинга, отнимаете у автора этой записи единицу рейтинга и сами теряете две единицы собственного рейтинга!')) return;
		AJAX.json('ajax/rating/' + type + '/', {'id': uid, 'val': val, 'super': s}, null, function(res){
			$(selector).html(res.rating);
			if (res.rating < 0) $(selector).addClass('red'); else $(selector).removeClass('red');
			if (res.data)
				for (var key in res.data)
					$('#' + key).html(res.data[key]);
		});
		if (type == 'comment') Comment.resetNew(uid);
	},
	violation: function(type, id, obj){
		AJAX.json('ajax/rating/violation/', {'id': id, 'type': type}, null, function(){
			$(obj).animate({opacity: 0}, 400, null, function(){$(obj).remove();});
		});
		if (type == 'comment') Comment.resetNew(id);
	},
	violation_clear: function(type, id, obj){
		AJAX.json('ajax/rating/violation_clear/', {'id': id, 'type': type}, null, function(){
			obj = $(obj).parents('tr');
			obj.css({overflow: 'hidden'});
			obj.animate({opacity: 0, height: 0}, 400, null, function(){$(obj).remove();});
		});
		if (type == 'comment') Comment.resetNew(id);
	},
}

var Poll = {
	set: function(pid, $obj) {
		if ($obj.length == 0){
			UI.msg('Вы не выбрали ни одного ответа!', 'alert');
			return;
		}
		var val = '';
		var self = this;
		if ($obj.length == 1) {
			val = $obj.val();
		} else {
			$obj.each(function(){val = val + $(this).val() + ':'});;
		}
		
		AJAX.json('ajax/poll/set/', {'id': pid, 'val': val}, null, function(res){
			self.get(pid);
		});
	},
	get: function(pid) {
		AJAX.json('ajax/poll/get/', {'id': pid}, null, function(res){
			res = res.data;
			var data = res.answers;
			var result = '<table class="vote-result">';
			for (var i = 0; i < data.length; i ++) {
				result += '<tr class="' + ((i % 2) == 1 ? 'grey' : '') + '"><td style="' + (res.top_index == i ? 'font-weight: bold' : '') + '">' + data[i].percent + '% <span class="small">(' + data[i].count + ')</span></td><td>' + data[i].text + '<div class="bar ' + (res.top_index == i ? 'top' : '') + '" style="width:' + parseInt(data[i].percent) + '%"></div></td></tr>';	
			}
			
            result += '</table><div class="count_vote">Всего проголосовало: ' + res.count_vote + '</div>';
			
			$('#vote_content').html(result);
		});
	}
}

var AJAX = {
	json: function(u, p, f, a, e){
		p.token = __token;
		if (!f) f = function(res)
		{
			if (res.success) 
			{
				if (typeof(res.success) == 'string') UI.msg(res.success);
				if (a) a(res);
			} 
			else if (res.alert)
			{
				UI.msg(res.alert, 'alert');
				if (e) e(res);
			}
			else
			{
				UI.msg(res.error, 'error');
				if (e) e(res);
			}
		}
		$.post(base_url(u), p, null, 'json')
			.success(f)
			.fail(function(){
				/*UI.msg("Произошла внутренняя ошибка сервера", 'error');*/
			});
	},
}

var UI = {
	msg: function(t, n, s, i) {
		if (!t || t == '') return;
		if (!s) s = false;
		i = 2;
		if (!n) n = 'info';
		t = '<div class="ico-' + n + '">' + t + '</div>';
		$.jGrowl(t, { sticky: s, life: i * 1000 });
	},
}

var Cookie = {
	set: function(c_name, value, exdays) {
		if ( ! exdays) exdays = 30;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	},
	get: function(c_name, def)
	{
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i=0; i < ARRcookies.length; i++)
		{
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g,"");
			if (x == c_name) return unescape(y); else def;
		}
	}
}
var Pagination = {
	current_page: 0,
	mouse_handler: false,
	url: '',
	temp: '',
	process: false,
	init: function(handler) {
		if ($('#mouse_handler').length == 0) return;
		var self = this;
		$('#mouse_handler').mouseover(function(){
			var obj = this;
			if (!!self.mouse_handler) return;
			self.mouse_handler = setTimeout(function(){$(obj).click()}, 300);
		});
		$('#mouse_handler').mouseout(function(){
			clearTimeout(self.mouse_handler);
			self.mouse_handler = false;
		});
		$('#mouse_handler').click(function(){
			clearTimeout(self.mouse_handler);
			if (self.process) return;
			self.process = true;
			if (self.temp == '') self.temp = $('#mouse_handler').html();
			$('#mouse_handler').addClass('preload').html('');
			if (!handler) {
				$.get(
					self.url + (self.url.indexOf('?') > -1 ? '&' : '?') + 'page=' + Math.max(self.current_page - 1, 1), 
					function(data){
						$('#pagination_content > .end_of_content').before(data);
						var id_list = Array($('#pagination_content > div').length);
						var i = 0;
						var is_odd = false;
						$('#pagination_content > div').each(function(){
							if ($(this).attr('data-id') && $(this).attr('data-id') != '') {
								if ($(this).hasClass('odd')) is_odd = true;
								if (id_list.indexOf($(this).attr('data-id')) > -1) $(this).remove();
								id_list[i] = $(this).attr('data-id');
								i++;
							}
						});
						if (is_odd) {
							i = 0;
							$('#pagination_content > div').each(function(){
								if ($(this).hasClass('f-clear')) i = 0; 
								if ($(this).attr('data-id') && $(this).attr('data-id') != '') {
									if (i % 2 > 0) $(this).addClass('odd'); else $(this).removeClass('odd');
									if (i % 3 > 0) i ++;
									i++;
								}
							});
						}
						self.current_page = Math.max(self.current_page - 1, 1);
						$(document).scroll();
						$(window).resize();
						fancybox();
						$('#mouse_handler').removeClass('preload').html(self.temp);
						self.process = false;
					}
				);
			} else {
				handler(self);
			}
		});
	},
	change: function(type){
		var self = this;
		var url = location.href.indexOf('p_type') > -1 ? location.href.replace(/((&|\?)p_type=)[a-zA-Z0-9]+/, '$1' + type) : location.href + (location.href.indexOf('?') > -1 ? '&p_type=' : '?p_type=') + type;
		if (type == 'classic') {
			url = url.indexOf('page') > -1 ? url.replace(/((&|\?)page=)[a-zA-Z0-9]+/, '$1' + self.current_page) : url + (url.indexOf('?') > -1 ? '&page=' : '?page=') + self.current_page;
		}
		location.href = url;
	}
}