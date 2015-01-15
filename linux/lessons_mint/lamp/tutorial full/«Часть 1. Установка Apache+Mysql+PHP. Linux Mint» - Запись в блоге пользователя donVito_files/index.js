$(function(){
    $.fn.scrollToTop=function(){
        $(this).hide();
        if($(window).scrollTop()!="0"){
            $(this).fadeIn("slow");
        }
        var scrollDiv=$(this);
        $(window).scroll(function(){
            if($(window).scrollTop()=="0"){
                $(scrollDiv).fadeOut("slow");
            }else{
                $(scrollDiv).fadeIn("slow");
            }
        });
        $(this).click(function(){
            $("html, body").animate({scrollTop:0},"slow");
        });
    }

    $("#scroll_top").scrollToTop();
});

function str_replace ( search, replace, subject ) {	// Replace all occurrences of the search string with the replacement string
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni

    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
            while(search.length>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }

    if(!(search instanceof Array))search=new Array(search);
    while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
        replace[replace.length]='';
    }

    if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
        for(k in subject){
            subject[k]=str_replace(search,replace,subject[k]);
        }
        return subject;
    }

    for(var k=0; k<search.length; k++){
        var i = subject.indexOf(search[k]);
        while(i>-1){
            subject = subject.replace(search[k], replace[k]);
            i = subject.indexOf(search[k],i);
        }
    }

    return subject;

}


$(function(){
    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( "button" ),
        lbl = wrapper.parent().find( ".file_name" );
    btn.focus(function(){
        inp.focus()
    });
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
            wrapper.removeClass( "focus" );
    });
    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\...\\", '' );
        if( ! file_name.length )
            return;
        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выберите файл" );
        }else
            btn.text( file_name );
    }).change();
});

$(function () {
    var $v_column = $('.vertical_column #pagination_content');
    imagesLoaded($v_column, function() {
        $v_column.masonry({
            itemSelector: '.media'
        });
    });
});

$(function () {
    $(".tag_list").columnize({columns: 4});
    $(".community_list").columnize({columns: 3});
    $('input[type=checkbox], input[type=radio]').customRadioCheck();
    $('.custom-select').customSelect();

    $('#rules input[name="rules"]').on('change',function(){
        if (this.checked){
            $('#signup_button').removeAttr('disabled');
        } else {
            $('#signup_button').attr('disabled', true);
        }
    });
});

function fancybox() {
    $('.fancybox').fancybox({
        helpers: {
            title : {type : 'inside'},
            buttons: {},
            overlay : {
                opacity : 0.8,
                css : {
                    'background-color' : '#000'
                }
            },
            thumbs  : {
                width   : 50,
                height  : 50
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

$(".fancybox").fancybox();

/**
 *  OBJECTS
**/

setInterval(function(){if (Comment._timer) Comment.load_comments(Comment._timer_pid)}, 15 * 1000);

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
    ctrlEnter: function(e) {
        var os = (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris');
        key = e.keyCode || e.which;
        if (key == 10 || key == 13 && (e.ctrlKey || e.metaKey && os == 'mac')) {
            
            $('#comment_0 .js-respond input[type=submit],#comment_0 .js-respond button').click();
            
            if (!e) return false;
            while (e.originalEvent) {
                e = e.originalEvent;
            }
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
        }
        //if(e.ctrlKey && (key == 13)) {
        //  $('#comment_0 .js-respond input[type=submit],#comment_0 .js-respond button').click();
        //  return false;
        //}
        //return true;
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
            var respForm = $current.html();
            $('#comment_editor').remove();
            $respond.html(respForm);
//            $current.children('#comment_editor').removeAttr('id');
//
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
        $('html, body').animate({scrollTop: $('#comment_text_' + pid).offset().top}, 400, 'swing', function(){
            if (id && $('#comment_text_' + pid + ' .scroll_to:first .down').length == 0)
                $('#comment_text_' + pid + ' .scroll_to:first').append('<span class="down" onclick="Comment.scrollTo(\'' + id + '\', null, this);">&darr;</span>');
            if (obj) $(obj).remove();
        });
        this.resetNew(id);
    },
    commentTo: function( id, obj){
        $('html, body').animate({scrollTop: $('#comment_' + id).offset().top}, 400, 'swing', function(){  });
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
            $(".loading").removeClass("hide_box");
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
            $('#comment_' + id + ' .author:first').css('display', 'block');
            $('#comment_' + id + ' .media-text:first').css('paddingLeft', 150);
            if (self.editable.parent().attr('id') == 'comment_' + id) {
                self.editable = null;
                self.timer();
                return;
            }
        }
        this.timer(null, true);
        $('#comment_' + id + ' .author:first').css('display', 'none');
        this.editable_text = $('#comment_' + id + ' .media-text:first').css('paddingLeft', 0).html();
        $('#comment_' + id + ' .media-text:first').html('<textarea id="edit_comment">' + this.editable_text.replace(/^\s+(.*?)\s+$/gi, '$1') + '</textarea><input type="button" value="Сохранить" class="btn btn-warning btn-mini" onclick="Comment.update('+id+')"><input type="button" value="Отменить" class="btn btn-warning btn-mini" onclick="Comment.edit_cancel('+id+')">');
        self.construct('edit_comment');
        self.editable = $('#comment_' + id + ' .media-text:first');
    },
    edit_cancel: function(id){
        var self = this;
            self.destroy('edit_comment');
            self.editable.html(this.editable_text);
            $('#comment_' + id + ' .author:first').css('display', 'block');
            $('#comment_' + id + ' .media-text:first').css('paddingLeft', 0);
            if (self.editable.parent().attr('id') == 'comment_' + id) {
                self.editable = null;
                self.timer();
                return;
            }
    },
    update: function(id){
        var self = this;
        var text = !is_mobile ? tinyMCE.get('edit_comment').getContent() : $('#edit_comment').val();
        AJAX.json('ajax/comments/edit/', {'id': id, 'text': text}, null, function(res){
            self.destroy('edit_comment');
            self.editable = null;
            $('#comment_' + id + ' .media-text:first').html(res.data.text);
            if ($('#comment_' + id + ' .media_comment_vers:first')) $('#comment_' + id + ' .media_comment_vers:first').html(res.data.moder);
           // else $('#comment_' + id + ' .media-text:first').after('<br><span class="moder">' + res.data.moder + '</span>');
            self.timer();
        });
    },
/*load_comments: function(pid, sid) {
        var self = this;
        
        AJAX.json('ajax/comments/get/', {'pid': pid, 'lid': this.last_id}, null, function(res){
            var comments_count = res.count_comments;
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
                    block += '<div class="pull-left avatar">'
                            + '<a href="' + (data.social_user == '1' ? data.link : base_url(data.user_name)) + '">'
                                + '<img class="img-circle" style="' + data.style + '" src="' + (data.social_user == '1' ? '' : Config.userpics_url) + data.user_photo + '" alt="' + data.user_name + '">'
                            + '</a>'
                        + '</div>'

                        + '<div class="media-body">'
                            + '<div class="media-heading">'
                                + '<a href="' + (data.social_user == '1' ? data.link : base_url(data.user_name)) + '">' + data.user_name + '</a>'
                                + '<em class="muted">' + data.date + '</em>'

                                + '<div class="rating pull-right">';


                    block += '<span class="icon  icon-plus" onclick="Rating.set(\'comment\', \'' + data.id + '\', 1, \'#comment_' + data.id + ' .rating:first .num\');this.onclick = function (){};">like</span>'

                                    + '<span class="num ' + (data.rating < 0 ? 'red' : '') + '">' + data.rating + '</span>'

                                    + '<span class="icon icon-minus" onclick="Rating.set(\'comment\', \'' + data.id + '\', -1, \'#comment_' + data.id + ' .rating:first .num\');this.onclick = function (){};">dislike</span></div>'
                            + '</div>'

                            + '<div class="media-text" onclick="Comment.resetNew(' + data.id + ');">' + data.text + '</div>' + (data.moder ? '<br><span class="moder">' + data.moder + '</span>' : '');
                            if (data.allow_response == 1) block += '<a href="javascript:" class="muted" onclick="Comment.respond(\'' + data.id + '\')">Ответить</a>';
                    block +='</div>';


                    block +='<div class="rating comment_action pull-right">';
                    if (data.pid != 0)
                    {
                        block +='<span class="icon icon-scroll_parent" title="Перейти к родительскому комментарию" onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
                    }
                    block +='<span class="icon icon-anchor" title="Ссылка на комментарий" onclick="Comment.commentTo(\'' + data.id + '\')">Ссылка на комментарий</span>';
                    block +='<span class="icon icon-ban" title="Пожаловаться" onclick="if (confirm(\'Вы уверены, что данный комментарий нарушает правила или закон?\')) Rating.violation(\'comment\',  \'' + data.id + '\', this)">Пожаловаться</span>';
                    block +='<span class="icon icon-edit" title="Редактировать" onclick="Comment.edit(\'' + data.id + '\')">Редактировать</span>';
                    block +='<span class="icon icon-delete" title="Удалить" onclick="Comment.remove(\'' + data.id + '\')">Удалить</span>';
                    block +='</div>';

                    if (data.rating <= Config.min_comment_rating) block += '</div>';
                } else {
                    block += '<div class="deleted"><span class="moder">' + (data.moder != '' ? data.moder : 'Комментарий был удален') + '</span> <span class="scroll_to">';
                    if (data.pid != 0)
                        block += '<span onclick="Comment.scrollTo(\'' + data.pid + '\', \'' + data.id + '\')">&uarr;</span>';
                    block += '</span></div>';
                }
                block += '<div class="js-respond"></div><div class="border"></div></div>';
                var $block=$(block);
                if (data.pid == 0) {

                    $('.comments_section').append($block);
                    $block.addClass('level_0');
                }
                else {
                    var p = $('#comment_' + data.pid);
                    p.append($block);
                    var level= p.attr('class').match(/level_(\d+)/i)[1];
                    $block.addClass('level_'+(parseInt(level)+1));
                }
                if (data.id > self.last_id) self.last_id = data.id;
                self.onload();
            }
            //$('#comments > h2:first').html('Комментарии (' + $('#comments .comment').length + ')');
            $('#comments_count').html(comments_count);
            $(".comments_count").html(parseInt(comments_count));
            self.respond(0, function(){if (sid) $('html,body').animate({scrollTop: $('#comment_' + sid).offset().top}, 700, 'swing');});
        });
    },*/
    onload: function(){}
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
        /**
         *         $('#mouse_handler').mouseover(function(){
            var obj = this;
            if (!!self.mouse_handler) return;
            self.mouse_handler = setTimeout(function(){$(obj).click()}, 300);
        });
         */
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
                        var $pag_content = $('#pagination_content > .end_of_content');
                        $pag_content.before(data);
                        var $vcol=$('.vertical_column #pagination_content');
                        if ($vcol.length==1){
                            imagesLoaded($pag_content,function(){
                                $vcol.masonry('reloadItems');
                                $vcol.masonry('layout');
                            });


                        }

//                        $('.vertical_column #pagination_content').masonry('destroy');

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
                        if (self.current_page == 1) $('#pagination').remove();
                        self.current_page = Math.max(self.current_page - 1, 1);
                        $(document).scroll();
                        $(window).resize();
                        //fancybox();
                        //init_drop_menu();
                        $('#mouse_handler').removeClass('preload').html(self.temp);
                        self.process = false;
                        self.onload();

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
    },
    onload: function(){}
}

var Localization = {
    current: {country: 0, region: 0, city: 0},
    objects: {countries: '#countries', regions: '#regions', cities: '#cities'},
    options: {zero: false},
    init: function(){
        var self = this;
        $(this.objects.countries).change(function(e) {
            self.regions($(this).val());
        });
        $(this.objects.regions).change(function(e) {
            self.cities($(this).val());
        });
        $(this.objects.countries).attr('disabled', true).html('');
        $(this.objects.regions).attr('disabled', true).html('');
        $(this.objects.cities).attr('disabled', true).html('');
        
        AJAX.json('ajax/localization/countries/', function(res){
            var data = res.data;
            
            for (var i = 0; i < data.length; i++)
            {
                var option = $('<option>');
                option.attr('value', data[i].id);
                option.text(data[i].label);
                if (data[i].id == self.current.country) option.attr('selected', true);
                if (data[i].value == 'ru' || 
                    data[i].value == 'kz' || 
                    data[i].value == 'by')
                    $(self.objects.countries).prepend(option);
                else $(self.objects.countries).append(option);
            }
            
            if (self.options.zero != false) {
                var option = $('<option>');
                option.attr('value', '0');
                option.text(self.options.zero);
                if (0 == self.current.country) option.attr('selected', true);
                $(self.objects.countries).prepend(option);
            }
        
            $(self.objects.countries).attr('disabled', false);
            $(self.objects.countries).change();
        });
    },
    regions: function(id){
        var self = this;
        $(this.objects.regions).attr('disabled', true).html('');
        $(this.objects.cities).attr('disabled', true).html('');
        
        if (self.options.zero != false) {
            var option = $('<option>');
            option.attr('value', '0');
            option.text(self.options.zero);
            if (0 == self.current.region) option.attr('selected', true);
            $(self.objects.regions).append(option);
        }
        
        if (id == 0) {
            $(self.objects.regions).attr('disabled', false);
            $(self.objects.regions).change();
            return;
        }
        
        AJAX.json('ajax/localization/regions/' + id, function(res){
            var data = res.data;
            
            for (var i = 0; i < data.length; i++)
            {
                var option = $('<option>');
                option.attr('value', data[i].id);
                option.text(data[i].label);
                if (data[i].id == self.current.region) option.attr('selected', true);
                $(self.objects.regions).append(option);
            }
            $(self.objects.regions).attr('disabled', false);
            $(self.objects.regions).change();
        });
    },
    cities: function(id){
        var self = this;
        $(this.objects.cities).html('');
        
        if (self.options.zero != false) {
            var option = $('<option>');
            option.attr('value', '0');
            option.text(self.options.zero);
            if (0 == self.current.city) option.attr('selected', true);
            $(self.objects.cities).append(option);
        }
        
        if (id == 0) {
            $(self.objects.cities).attr('disabled', false);
            $(self.objects.cities).change();
            return;
        }
        
        AJAX.json('ajax/localization/cities/' + id, function(res){
            var data = res.data;
            
            for (var i = 0; i < data.length; i++)
            {
                var option = $('<option>');
                option.attr('value', data[i].id);
                option.text(data[i].label);
                if (data[i].id == self.current.city) option.attr('selected', true);
                $(self.objects.cities).append(option);
            }
            $(self.objects.cities).attr('disabled', false);
        });
    },
}


var Feed = {
    add_user: function(obj, uid, callback){
        if (!callback) callback = function(){};
        AJAX.json('ajax/feeds/user/', {'uid': uid}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-plus');
                $(obj).addClass('ico-minus');
            }
            $(obj).text('Отписаться от автора');
            obj.onclick = function(){
                Feed.remove_user(obj, uid);
            };
            callback();
        });
    },
    remove_user: function(obj, uid, callback){
        if (!callback) callback = function(){};
        AJAX.json('ajax/feeds/rem_user/', {'uid': uid}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-minus');
                $(obj).addClass('ico-plus');
            }
            $(obj).text('Читать автора');
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
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-plus');
                $(obj).addClass('ico-minus');
            }
            if (short) $(obj).text('Выйти'); 
            else $(obj).text('Выйти из сообщества');
            obj.onclick = function(){
                Feed.remove_community(obj, uid, title, short);
            };
        });
    },
    remove_community: function(obj, uid, title, short){
        AJAX.json('ajax/feeds/rem_community/', {'cid': uid, 'title': title}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-minus');
                $(obj).addClass('ico-plus');
            }
            if (short) $(obj).text('Вступить'); 
            else $(obj).text('Вступить в сообщество');
            obj.onclick = function(){
                Feed.add_community(obj, uid, title, short);
            };
        });
    },
    add_company: function(obj, uid, title){
        AJAX.json('ajax/feeds/company/', {'cid': uid, 'title': title}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-plus');
                $(obj).addClass('ico-minus');
            }
            $(obj).text('Отписаться');
            obj.onclick = function(){
                Feed.remove_company(obj, uid, title, short);
            };
        });
    },
    remove_company: function(obj, uid, title){
        AJAX.json('ajax/feeds/rem_company/', {'cid': uid, 'title': title}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-minus');
                $(obj).addClass('ico-plus');
            }
            $(obj).text('Подписаться');
            obj.onclick = function(){
                Feed.add_company(obj, uid, title, short);
            };
        });
    },
    add_fan: function(obj, uid, title){
        AJAX.json('ajax/feeds/fan/', {'cid': uid, 'title': title}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-plus');
                $(obj).addClass('ico-minus');
            }
            $(obj).text('Не нравиться');
            obj.onclick = function(){
                Feed.remove_fan(obj, uid, title);
            };
        });
    },
    remove_fan: function(obj, uid, title){
        AJAX.json('ajax/feeds/rem_fan/', {'cid': uid, 'title': title}, null, function(){
            if ($(obj).hasClass('ico-minus') || $(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-minus');
                $(obj).addClass('ico-plus');
            }
            $(obj).text('Нравиться');
            obj.onclick = function(){
                Feed.add_fan(obj, uid, title);
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
    add_request: function(obj, uid, title){
        AJAX.json('ajax/feeds/add_request/', {'cid': uid, 'title': title}, null, function(){
            $(obj).text('Отозвать заявку');
            obj.onclick = function(){
                Feed.remove_request(obj, uid, title);
            };
        });
    },
    remove_request: function(obj, uid, title){
        AJAX.json('ajax/feeds/rem_request/', {'cid': uid, 'title': title}, null, function(){
            $(obj).text('Подать заявку');
            obj.onclick = function(){
                Feed.add_request(obj, uid, title);
            };
        });
    },
    blacklist: function(obj, uid){
        AJAX.json('ajax/feeds/blacklist/', {'uid': uid}, null, function(){
            if ($(obj).hasClass('ico-minus')) {
                $(obj).removeClass('ico-minus');
                $(obj).addClass('ico-plus');
            } else if ($(obj).hasClass('ico-plus')) {
                $(obj).removeClass('ico-plus');
                $(obj).addClass('ico-minus');
            }
            if (($(obj).text() == 'В черный список') || ($(obj).text() == 'Добавить в черный список')) $(obj).text('Удалить из черного списка');
            else $(obj).text('В черный список');
        });
    },
    onload: function(){}
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
    hate: function(obj, id, value){
        AJAX.json('ajax/users/hate/' + id, {'val': value}, null, function(){
            if ( ! value || value < 0) value = -1; else value = 1;
            
            obj = $(obj).parents('.hatemetr').find('.scale > div');
            
            if ( ! obj.hasClass('red') && ! obj.hasClass('green')) obj.css('width', 0);
            
            var marginLeft = parseInt(obj.css('margin-left').replace('px', ''));
            var width = (marginLeft < 0 ? -1 : 1) * parseInt(obj.css('width').replace('px', '')) + value;
            
            var marginLeft = value >= 0 ? 0 : marginLeft + value;
            width = width > 100 ? 100 : (width < -100 ? -100 : width);
            marginLeft = marginLeft < -100 ? -100 : (marginLeft > 0 ? 0 : marginLeft);
            
            if (marginLeft < 0) obj.removeClass('green').addClass('red');
            else obj.removeClass('red').addClass('green');
            
            if (marginLeft == 0 && width == 0) {
                width = 1; 
                obj.removeClass('green').removeClass('red');
            }
            
            obj.css({width: width < 0 ? width * -1 : width, marginLeft: marginLeft});
        });
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
        if (typeof(p) == 'function')
        {
            a = p;
            e = f;
            p = {};
            f = null;
        }
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