$(document).ready(function() {
	var tmp_budget;
	var dateFormat = /^\d{2}[\.|\/|-]\d{2}[\.|\/|-]\d{4}$/;
		
	jQuery.browser={};(function(){jQuery.browser.msie=false;
	jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
	jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	
	if ($.browser.msie) {
		$('input[placeholder]').each(function() {
			$(this).val($(this).attr('placeholder')).prop('defaultValue', $(this).attr('placeholder'));
		});
		$('input[placeholder]').on({
			focus: function() {
				if ($(this).val() == $(this)[0].defaultValue) {
					$(this).val('');
				}
			},
			blur: function() {
				if ($(this).val() == '') {
					$(this).val($(this)[0].defaultValue);
				}
			}
		});
	}
	
	setInterval(function(){blinkUserMenuLink()}, 1000);
	
	$('.code-pre code').each(function(i, e) {hljs.highlightBlock(e, null, false);});
	$('.go-top').click(function() { $('html, body').animate({ scrollTop: 0 }, 'slow'); return false; });
	$('code').each(function(i, e) { if (!$(this).parent('.code-pre').html()) {hljs.highlightBlock(e, null, true) }});
	
	$(window).scroll(function() {
		if ($(window).scrollTop() > ($(window).height() / 2)) { $('.go-top').stop(true, true).fadeIn('slow'); }	
		if ($(window).scrollTop() < ($(window).height() / 2)) { $('.go-top').fadeOut('slow'); }
	});

	$(document).on('click', 'a.false', function() {
		return false;
	});
	
  	
	$(document).on('click', 'button[type="submit"]', function() {
		var b = $(this);
		if (b.attr('data-action') && b.attr('data-form')) {
			if (b.attr('name') == 'preIt' && b.attr('data-form') == '#addWork-form') {
				var error = new Array();
				
				if ($('#project-name').val() == '') {error.push('#project-name');}
				if ($('#project-desc').val() == '') {error.push('#project-desc');}
				if (!$('#project-uncertain').is(':checked') && $('#project-budget').val() == '') {error.push('#project-budget');}
				if ($('#project-deadline').val() == '' || !dateFormat.test($('#project-deadline').val())) {error.push('#project-deadline');}
				
				if (error.length) {
					$.each(error, function(i, v) {
						$(v).addClass('error-field');
					});
					return false;
				}
			}
			$(b.attr('data-form')).attr('action', b.attr('data-action')).submit();
		}
	});
	
	$(document).on('click', '.site-information .left .report-site a', function() {
		if ($('#report-site').length && $('#mask-form').length) {
			$('#mask-form').css({opacity: 0});
			$('#mask-form').fadeTo('fast', 0.7, function() {
				$('#report-site').fadeIn('fast');
			});
		}
		return false;
	});

	$(document).on('click', '#mask-form', function() {
		if ($('#report-site').is(':visible')) {
			$('#report-site').fadeOut('fast', function() {
				$('#report-site form')[0].reset();
			});
		}
		$('#mask-form').fadeOut('fast');
		return false;
	});
	
	$(document).on('submit', 'form#report-site-form', function() {
		var $form = $(this),
			$id = $form.find('input#rid'),
			$name = $form.find('input#rname'),
			$email = $form.find('input#remail'),
			$msg = $form.find('textarea#rmsg'),
			emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			errors = [];
			
		if ($id.val() != '') {
			if ($form.parent().parent().hasClass('logged-out')) {
				if ($name.val() == '') { errors.push($name); }
				if ($email.val() == '' || !emailPattern.test($email.val())) { errors.push($email); }
			}
		} else {
			location.reload(true);
		}
		if (errors.length) {
			$.each(errors, function(a, b) {
				$(b).addClass('error-field');
			});
		} else {
			$form.find('input').prop('disabled', true);
			$form.find('button').prop('disabled', true);
			$msg.prop('disabled', true);
			$.post('ajax/reportSite/', {site: $id.val(), msg: $msg.val(), name: $name.val(), email: $email.val()}, function(re) {
				if (re.status == 1) {
					if (re.message) {
						$('#report-site .form-parent').empty().html(re.message);
					}
				} else if (re.status == 2) {
					$name.addClass('error-field');
					$email.addClass('error-field');
				} else {
					location.reload(true);
				}
			}, 'json');
		}
		return false;
	});
	
	$(document).on('click', 'a.click-login', function() {
		$('html, body').animate({ scrollTop: 1 }, 'slow');
	});
	
	$(document).on('click', 'a[rel*="external"], a[class="links"]', function() {
		$(this).attr('target', '_blank');
	});
	
  if ($.type($('.popup-login').val())!="undefined"){
    $(".i-login>a,.click-login").click(function(e){
      e.preventDefault();
      $('.popup-login').fadeToggle();
      $('<div id="overlay-form"></div>').appendTo($('body'));
      //e.stopPropagation();
    }); 
  }
  
    $('body').on('click','#overlay-form',function(e) {
        e.preventDefault();
        $('.popup-login').fadeOut();
        $('.popup-social').fadeOut();
        $('#overlay-form').remove();
    });    
    $('body').on('click','.close-1',function(e) {
        e.preventDefault();
        $(this).parents('.form-parent').fadeOut();
    });   
	
  $('#main-menu > ul > li:not(.show)').hover(
      function () { 
        $(this).addClass('active');  
        $(this).children('.menu-hop').stop(1).animate({
            height: "toggle",
            opacity: "toggle"
        }, 200);
      },
      function () {                    
        $(this).removeClass('active'); 
        $(this).children('.menu-hop').stop(1).animate({
            height: "toggle",
            opacity: "toggle"
        }, 200);
      }
  );


  $('.main-menu-2 > ul > li:not(.show)').hover(
      function () { 
        //if (!$(this).hasClass('active')){
          $(this).siblings('.show').removeClass('show').addClass('showDisable'); 
          $(this).addClass('active');  
          $(this).children('ul').stop(1).animate({
              height: "toggle",
              opacity: "toggle"
          }, 0);
       // }
      },
      function () {   
        //if ($(this).hasClass('active')){             
          $(this).siblings('.showDisable').removeClass('showDisable').addClass('show');         
          $(this).removeClass('active'); 
          $(this).children('ul').stop(1).hide();
        //}
      }
  );
  
  //styled select
  $('.select-pick').selectpicker();

  if ($.type($('.datepicker').val())!="undefined"){
	$('.datepicker').datepicker({
  		format: 'dd.mm.yyyy',
  		startDate: '01.01.2005',
  		language: 'ru'
	});
  }

	if ($.type($('.datepicker-nojs').val())!="undefined"){
		var nowTemp = new Date();
		var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
		var then = new Date(nowTemp.getFullYear(), nowTemp.getMonth()+2, nowTemp.getDate(), 0, 0, 0, 0);
		$('#project-deadline').datepicker({
			format: 'dd.mm.yyyy',
			language: 'ru',
			onRender: function(date) {
				return date.valueOf() < now.valueOf() ? 'disabled' : (date.valueOf() > then.valueOf() ? 'disabled' : '');
			}
		});
	}

  if ($.type($('.radio-block .radio').val())!="undefined"){
    $('.radio input').radio();
  }

  if ($.type($('input[type="checkbox"]').val())!="undefined"){
	 $('input[type="checkbox"]').checkbox();
  }
  
  
  if ($.type($('input[type="text"].filebrowser').val())!="undefined"){
    	$(document).on('click', 'input[type="text"].filebrowser', function() {
  		if ($(this).attr('data-target')) {
  			$($(this).attr('data-target')).click();
  		}
  	});
  }
    
$('input[type="file"].hidden').change(function() {
	$('input[data-target="#' + $(this).attr('id') + '"].filebrowser').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});
    
  $('#modx-slider').carousel({interval: 6500});   
  
  $(document).on('click', '.nav-tabs a', function(e) {
    e.preventDefault();
	
	//tabContent($(this).parent().index());
	//var data = new Object();
	//data.params = new Array();
	//data.params[0] = $(this).data('ajax');
	//data.f = 'qaAjaxPagination';
	//History.pushState(data,docTitle,$(this).attr('href'));
	
	var $tab = $(this),
		$tabc = $('.tab-pane' + $tab.attr('data-target'));
		
		
    $tab.tab('show');
	if ($tab.attr('data-ajax')) {
		if (!$tab.parent().hasClass('preloaded')) {
			if (xhr) {
				xhr.abort();
			}
			var xhr = $.ajax({
				url: $tab.attr('data-ajax'),
				success: function(data) {
					$tabc.html(data);
					$tab.parent().addClass('preloaded');
					$('.select-pick').selectpicker('refresh');
				}
			});
		}
	}
  });
  
	
  
  if ($.type($('.question').val())!="undefined"){
    $('.question').tooltip({placement:'right'});
  }
  
  //
  
  if ($.type($('.question-up').val())!="undefined"){
    $('.question-up').each( function() {
       $(this).tooltip({placement:'topleft',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});
       $(this).prev('a.with-q-up').tooltip({placement:'topleft',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow tooltip-yellow-a"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});      
    });
  }

  if ($.type($('.link-up').val())!="undefined"){
    $('.link-up').each( function() {
       $(this).tooltip({placement:'topleft',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});
    });
  }
  
  if ($.type($('.question-right').val())!="undefined"){
    $('.question-right').each( function() {
       $(this).tooltip({placement:'rightmy',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});      
    });
  }
  
	$("#footer-social a").hover(
        function () {
          $(this).stop(1).fadeTo("300", 0.80);  
        },
        function () {
          $(this).stop(1).fadeTo("300", 1);  
        }   
	);
	
	var replyLabel = $('.reply-label').text();
	$('#quip-add-comment-qcom textarea').keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
     $('#'+this.id).parents('form').find('button').click();
    }
  });
  	
	$('.comment-reply').click(function() {
		var id = $(this).attr('data-id');
		
    $('.quip-reply-link .hiddenreply').show().removeClass('hiddenreply');
    $('.quip-edit-link .hiddenedit').show().removeClass('hiddenedit');
		$(this).hide().addClass('hiddenreply');
		
		$('#comment-parent').val(id);
		$('#id-edit-quip').remove();
		if ($('#quip-add-comment-qcom button').attr('name')=='quip-post-edit'){
		  $('#quip-comment-box-qcom').val('');
		}
		$('#quip-add-comment-qcom button').attr('name','quip-post').text('Добавить');		
		//$('.reply-label').html(((!$(this).hasClass('offer-reply')) ? 'Ответ на комментарий #'+id+'(<a href="#" class="cancel-reply">x</a>):' : 'Ответ на предложение #'+id+'(<a href="#" class="cancel-reply">x</a>):'));
		$('.reply-label').remove();
		
        //not(".form-parent.donthide")
		$(".form-parent:first").appendTo($(this).parents('.quip-comment-text'));
		
		if (!$('#add-comment-form').length){
		  $("#quip-success-qcom").after('<a href="#" id="add-comment-form">Добавить комментарий</a>');
		}
		
		$('html,body').animate({scrollTop: $('.form-parent').offset().top});
		$('.form-parent textarea').focus();
		return false;
	});
	
	
	$('.comment-edit').click(function() {
		var id = $(this).attr('data-id');
		
    $('.quip-edit-link .hiddenedit').show().removeClass('hiddenedit');
    $('.quip-reply-link .hiddenreply').show().removeClass('hiddenreply');
    $(this).hide().addClass('hiddenedit');
    		
		var textcomment=$('#qcom'+id+'-div').find('.comm-text').html();
		textcomment=textcomment.replace(/<br[^>]*>/gi,'');
		textcomment=textcomment.replace('<pre class="code-pre">','');
		textcomment=textcomment.replace('</pre>','');	
		textcomment=textcomment.replace(/<span[^>]*>/gi,'');	 	
		textcomment=textcomment.replace(/<[/^]*span>/gi,'');	
		textcomment=decodeHtmlEntity(textcomment);
		//textcomment=textcomment.find("span").remove().end();    	
		$('#quip-comment-box-qcom').val(textcomment);
		if ($('#id-edit-quip').length>0){
		  $('#id-edit-quip').val(id);
		}else{
		  $('#quip-add-comment-qcom').prepend('<input id="id-edit-quip" type="hidden" name="idc" value="'+id+'"/>');
    }
		
		$('#quip-add-comment-qcom button').attr('name','quip-post-edit').text('Изменить');
		$('#comment-parent').val(id);
		//$('.reply-label').html(((!$(this).hasClass('offer-reply')) ? 'Изменить ответ #'+id+'(<a href="#" class="cancel-reply">x</a>):' : 'Изменить ответ на предложение #'+id+'(<a href="#" class="cancel-reply">x</a>):'));
		$('.reply-label').remove();
		
		$(".form-parent").appendTo($(this).parents('.quip-comment-text'));
		
		if (!$('#add-comment-form').length){
		  $("#quip-success-qcom").after('<a href="#" id="add-comment-form">Добавить комментарий</a>');
		}
		
		$('html,body').animate({scrollTop: $('.form-parent').offset().top});
		$('.form-parent textarea').focus();
		return false;
	});
	
	$('body').on('click','#add-comment-form', function(e) {
	   e.preventDefault();

    $('.quip-reply-link .hiddenreply').show().removeClass('hiddenreply');
    $('.quip-edit-link .hiddenedit').show().removeClass('hiddenedit');
        
		$("#quip-success-qcom").after($('#content .form-parent'));
		$("#add-comment-form").remove();
		
		$('html,body').animate({scrollTop: $('.form-parent').offset().top});	

		$('#comment-parent').val('0');
		$('#id-edit-quip').remove();
		if ($('#quip-add-comment-qcom button').attr('name')=='quip-post-edit'){
		  $('#quip-comment-box-qcom').val('');
		}
		
		$('#quip-add-comment-qcom button').attr('name','quip-post').text('Добавить');
		$('#quip-add-comment-qcom input[name="preview_mode"]').after('<label for="quip-comment-box-qcom" class="reply-label">'+replyLabel+'</label>');
	});
	
	
	$('#uploader').click(function () {
		$('#prview-upload-iframe').contents().find('#site-preview-img').click();
	});
		
		
	var isIE = navigator.userAgent.indexOf(' MSIE ') > -1;
	 
	//if js enbled remove filter controls
	$('.submit-filter').remove();
	
	if ($('.pagenav .gonav').length>0){
     $('#content-inner').on('change','.gonav', function(){
        $(this).next().find('.filter-option').text($(this).val());      
        if ($(this).parents('.gallery-pagination').length>0){
          //galleryAjaxPagination($(this).find(':selected').data('src')+'&ajax=1',isIE);
		  historyPagination($(this).find(':selected').data('src'),$(this).find(':selected').data('href'),'galleryAjaxPagination');
        }else if ($(this).parents('#modx-work').length>0){        
          //workAjaxPagination($(this).attr('data-src'));
		  historyPagination($(this).find(':selected').data('src'),$(this).find(':selected').data('href'),'workAjaxPagination');	
        }else if ($(this).parents('.list-developers').length>0){
          //developerAjaxPagination($(this).find(':selected').data('src'), $(this).find(':selected').data('url'));
		  historyPagination($(this).find(':selected').data('src'), $(this).find(':selected').data('url'),'developerAjaxPagination');
        }else if ($(this).parents('.article-pagination').length>0){
          //articleAjaxPagination($(this).find(':selected').data('src'));
		  historyPagination($(this).find(':selected').data('src'),$(this).find(':selected').data('href'),'articleAjaxPagination');	 	  
        }else if ($(this).parents('.qa-pagination').length>0){
          historyPagination($(this).find(':selected').data('src'),$(this).find(':selected').data('href'),'qaAjaxPagination');	 	  
        }else if ($(this).parents('.list-company').length>0){
          //companyAjaxPagination($(this).find(':selected').data('src'));
		  historyPagination($(this).find(':selected').data('src'), $(this).find(':selected').data('url'),'companyAjaxPagination');
        }else if ($(this).parents('.search-pagination').length>0){
          seacrhAjaxPagination($(this).find(':selected').data('src'));
        }
     });
     $('#content-inner').on('click','.gonav-drop .btn',function(){
        $(this).parent().prev('.gonav').simulate('mousedown'); 
     });
  }
  
	History.options.disableSuid = true;
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		if (typeof state.data.params[1] != 'undefined') {
			$('.nav-tabs.nav-tabs-2 li').removeClass('active').eq(state.data.params[1]).addClass('active');
			$('.tab-in-content tab-pane').removeClass('active').eq(state.data.params[1]).addClass('active');
		}
		if (state.data.f) {
			window[state.data.f](state.data.params);
		} 
		
	});
	/*History.Adapter.bind(window,'statechange',function(){
		
		console.log('statechange');
		
	});*/
	
	
	

	$('#site-gallery img.preview, .active.tab-pane img.preview').each(function () {
		//skip if load from cache
		if (!$(this)[0].complete) {
			$(this).hide();
			$(this).load(function () {
				if (isIE) {
					$(this).show();
				} else {
					$(this).fadeIn();	
				}
			});	
		}
	});
	
	// main page site gallery filter
	$('#site-gallery').on('click', '.bl-menu a', function() {
		$('#site-gallery').ajaxABlock();
		$.ajax({
			//data: $(this).attr('data-src').split('?')[1],
			data: $(this).attr('data-src')+'&ajax=1',
			dataType: 'html',
			url: 'ajax/sitegalleryonmain/',
			cache: false,
			complete: function(r) {
				$('#site-gallery').html(r.responseText);
				$('#site-gallery .select-pick').selectpicker('refresh');
				$('#site-gallery').ajaxABlock(true);
				$('#site-gallery img.preview').each(function () {
					if (!$(this)[0].complete) {
						//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
						$(this).load(function () {
							if (isIE) {
								$(this).show();
							} else {
								$(this).fadeIn();	
							}
						});
					} else {
						if (isIE) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					}
				});
			}
		});
		return false;
	});
	$('#site-gallery').on('change', '.select-pick',function() {
		$('#site-gallery').ajaxABlock();
		$.ajax({
			data: $('#site-gallery form.filter').serialize()+'&ajax=1',
			dataType: 'html',
			url: 'ajax/sitegalleryonmain/',
			cache: false,
			complete: function(r) {
				$('#site-gallery').html(r.responseText);
				$('#site-gallery .select-pick').selectpicker('refresh');
				$('#site-gallery').ajaxABlock(true);
				$('#site-gallery img.preview').each(function () {
					if (!$(this)[0].complete) {
						//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
						$(this).load(function () {
							if ($.browser.msie) {
								$(this).show();
							} else {
								$(this).fadeIn();	
							}
						});
					} else {
						if ($.browser.msie) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					}
				});
			}
		});
	});
	
	function ajaxSiteGalleryFilters(data) {
		$.ajax({
			data: data[0]+'&ajax=1',
			dataType: 'html',
			url: data[1],
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
				$('.active.tab-pane img.preview').each(function () {
					if (!$(this)[0].complete) {
						//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
						$(this).load(function () {
							if ($.browser.msie) {
								$(this).show();
							} else {
								$(this).fadeIn();	
							}
						});
					} else {
						if ($.browser.msie) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					}
				});
			}
		});
	}
	
	// inner page site gallery filter
	$('.gallery-tab .tab-pane').on('change', '.select-pick',function() {
	
		/*
		var data = new Array();
		data[0] = $('.active.tab-pane form.filter').serialize();
		data[1] = 'ajax/sitegallery/';
		datauri = $(this).children(':selected').data('href');
		*/
		
		var data = new Array();
		data[0] = $('.active.tab-pane form.filter').serialize();
		data[1] = 'ajax/sitegallery/';
		
		
		
		var $a = $(this),
			$sgroup = $($a.parents()[2]),
			$btn = $('.gallery-tab button.submit-filter-visible');
            
			
		if (!$btn.is(':visible')) {
			$sgroup.ajaxAnimation('small');
		} else {
			$btn.ajaxAnimation('small-btn');
		}
		
		$a.prop('disabled', true);
		$a.selectpicker('refresh');
		
		historyFilters(data,$(this).children(':selected').data('href'),'ajaxSiteGalleryFilters');
		//historyDevFilters(data,datauri,'ajaxSiteGalleryFilters');
		
	});
	$('.gallery-tab .tab-pane').on('click', '.submit-filter-visible',function() {
	
		var data = new Array();
		data[0] = $('.active.tab-pane form.filter').serialize();
		data[1] = 'ajax/sitegallery/';
		datauri = $('.active #search-name').data('href').replace('{name}',$('.active #search-name').val());
        
		
		$(this).ajaxAnimation('small-btn');
		
		historyFilters(data,datauri,'ajaxSiteGalleryFilters');
	
		/*
		$(this).ajaxAnimation('small-btn');
		$.ajax({
			data: $('.active.tab-pane form.filter').serialize()+'&ajax=1',
			dataType: 'html',
			url: 'ajax/sitegallery/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
				$('.active.tab-pane img.preview').each(function () {
					if (!$(this)[0].complete) {
						//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
						$(this).load(function () {
							if (isIE) {
								$(this).show();
							} else {
								$(this).fadeIn();	
							}
						});
					} else {
						if (isIE) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					}
				});
			}
		});
		*/
		return false;
	});
	$('.gallery-tab .tab-pane').on('click', '.gallery-pagination a',function(e) {
		if (!$(this).hasClass('active')) {
        //galleryAjaxPagination($(this).attr('data-src')+'&ajax=1',isIE);
			historyPagination($(this).attr('data-src'), $(this).attr('href'),'galleryAjaxPagination');
		}
		return false;
	});
	//site voting
	var _marked = 0;
	$('.rating.sitegallery li a').click(function() {
		var _this = $(this);
		
		if (!_this.parents('ul.rating').attr('data-selected')) {_marked++;}
		
		_this.parents('ul.rating').attr('data-selected', _this.attr('data-mark'));
		_this.parents('ul.rating').prev('span.current-rating').css({
			'width': (_this.attr('data-mark') * 10) + '%',
			'background-position': '0 -160px'
		});

		if (_marked == 6) {
			$('#site-vote').removeClass('disabled').removeClass('question-up').attr('data-title', '');
			$('#site-vote').tooltip('disable');
		}
		
		/*
		$.ajax({
			data: 'type='+$(this).parents('.rating.sitegallery').attr('data-type')+'&mark='+$(this).attr('data-mark')+'&site_id='+$(this).parents('.rating.sitegallery').attr('data-siteid'),
			dataType: 'json',
			url: 'ajax/sitegalleryrate/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				if (ret.res == 'ok') {
					_this.parents('.param').html(ret.text);	
					$('#total').text(ret.total);
				}
				if (ret.error) {
					_this.parents('.param').html(ret.error);	
				}
			}
		});
		*/
		
		return false;
	});
	
	$('#site-vote').click(function() {
		var _this = $(this);
		if (!_this.hasClass('disabled')) {
			if (_marked == 6) {
				if (_this.attr('data-id')) {
					var error = 0;
					var selected_params = {};
					$('table td div.star-wrapper').each(function(i) {
						var ul = $(this).find('ul.rating.sitegallery');
						if (!ul.attr('data-selected')) {
							error++;
						} else {
							selected_params[ul.attr('data-type')] = ul.attr('data-selected');
						}
					});
					
					var length = 0;
					for(prop in selected_params){
						if (selected_params.hasOwnProperty(prop)) {
							length++;
						}
					}
					
					var challenge, response;
					if(typeof Recaptcha != 'undefined'){
				   		challenge = Recaptcha.get_challenge();
				   		response = Recaptcha.get_response();
				   	}

					if (!error && length == 6) {
						_this.addClass('disabled');
						$.post('ajax/sitegalleryrate/', {site_id: _this.attr('data-id'),challenge:challenge, response:response, marks: selected_params}, function(data) {
							if (data.error && data.error=='wrong captcha') {
								Recaptcha.reload();
								$('#site-vote').removeClass('disabled');
								return;
							}
							$('.rating-block table').remove();
							$('.rating-block').prepend(data.html);
							$('#total').text(data.rating);
							$('#total_voted').text(data.count);
							_this.prev('br').remove();
							_this.next('br').remove();
							_this.remove();
							
							if (data.error && data.error=='voting limit') {
								$('.info-rate').append('Превышен лимит голосования в день');
							}
							
							if ($.type($('.question-up').val())!="undefined") {
								$('.question-up').each(function() {
									$(this).tooltip({placement:'topleft',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});
									$(this).prev('a.with-q-up').tooltip({placement:'topleft',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="tooltip tooltip-yellow tooltip-yellow-a"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});      
								});
							}
						}, 'json');
					}
				}
			}
		}
		return false;
	});
	
	// top sites block
	$('#inner-column').on('change', '#top-10-sites .select-pick',function() {
		$('#top-10-sites').ajaxABlock();
		$('#top-10-sites .preload-mask').css('background', 'transparent');
		$('#top-10-sites ol.clearfix').css('opacity', 0.2);
		$.ajax({
			data: 'year='+$(this).val(),
			dataType: 'html',
			url: 'ajax/topsiteslist/',
			cache: false,
			complete: function(r) {
				$('#top-10-sites').parent(':first').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});
	});
	
	//my sites filters
	$('#personal').on('change', '.select-pick',function() {
		$.ajax({
			data: $('#personal form').serialize(),
			dataType: 'html',
			url: 'ajax/sitegallerymysites/',
			cache: false,
			complete: function(r) {
				$('#personal').html(r.responseText);
				$('#personal .select-pick').selectpicker('refresh');
			}
		});
	});
	$('#personal').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/sitegallerymysites/',
				cache: false,
				complete: function(r) {
					$('#personal').html(r.responseText);
					$('#personal .select-pick').selectpicker('refresh');
				}
			});
		}
		return false;
	});
	//company sites filters
	$('#company').on('change', '.select-pick',function() {
		$.ajax({
			data: $('#company form').serialize(),
			dataType: 'html',
			url: 'ajax/sitegallerycompanysites/',
			cache: false,
			complete: function(r) {
				$('#company').html(r.responseText);
				$('#company .select-pick').selectpicker('refresh');
			}
		});
	});
	$('#company').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/sitegallerycompanysites/',
				cache: false,
				complete: function(r) {
					$('#company').html(r.responseText);
					$('#company .select-pick').selectpicker('refresh');
				}
			});
		}
		return false;
	});
	// comment
	
	//confirm site rights
	$('#submit-confirmation').attr('disabled','disabled');
	
	$('#site-address').change(function() {
		//
		var _this = $(this);
		$.ajax({
			data: 'url='+$(this).val(),
			dataType: 'html',
			url: 'ajax/checksiteurl/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				//var test = '<div class="tooltip tooltip-yellow tooltip-success"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
				
				_this.tooltip('destroy');
				_this.tooltip({
					placement:'rightmy',
					html:true,
					trigger:'manual',
					title: ret.txt,
					template: '<div class="tooltip tooltip-yellow white-arrow-r tooltip-'+ret.status+'"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
				}); 
				_this.tooltip('show'); 
				
				if (ret.status == 'success') {
					$('#submit-confirmation').removeAttr('disabled');
				} else {
					$('#submit-confirmation').attr('disabled','disabled');
				}
			}
		});
	});
	
	if ($('#site-address').val()) {
		$('#site-address').trigger('change');	
	}
	
	//main page articles filters
	$('#articles-main').on('click', '.bl-menu a', function() {
		$('#articles-main').ajaxABlock();
		$.ajax({
			data: $(this).attr('data-src'),
			dataType: 'html',
			url: 'ajax/articlesonmain/',
			cache: false,
			complete: function(r) {
				$('#articles-main').html(r.responseText);
				$('#articles-main .select-pick').selectpicker('refresh');
				$('#articles-main').ajaxABlock(true);
			}
		});
		return false;
	});
	
	$('#articles-main').on('change', '.select-pick', function() {
		$('#articles-main').ajaxABlock();
		$.ajax({
			data: $('#articles-main form').serialize(),
			dataType: 'html',
			url: 'ajax/articlesonmain/',
			cache: false,
			complete: function(r) {
				$('#articles-main').html(r.responseText);
				$('#articles-main .select-pick').selectpicker('refresh');
				$('#articles-main').ajaxABlock(true);
			}
		});
	});
	//inner page article filters
	$('.article-tab .tab-pane').on('change', '.select-pick',function() {
		//console.log('1');
		
		var data = new Array();
		data[0] = $('.active.tab-pane form.filter').serialize();
		data[1] = 'ajax/articles/';
		
		historyFilters(data,$(this).children(':selected').data('href'),'ajaxFilters');
		
		
		/*var $a = $(this),
			data = $('.active.tab-pane form.filter').serialize(),
			$sgroup = $($a.parents()[2]);
			
		$sgroup.ajaxAnimation('small');
		$a.prop('disabled', true);
		$a.selectpicker('refresh');
		
		$.ajax({
			data: data,
			dataType: 'html',
			url: 'ajax/articles/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});*/
	});
	$('.article-tab .tab-pane').on('click', '.article-pagination a',function(e) {
		if (!$(this).hasClass('active')) {
		  //articleAjaxPagination($(this).attr('data-src'));
		  historyPagination($(this).attr('data-src'),$(this).attr('href'),'articleAjaxPagination');	
		}
		return false;
	});
	$(document).on('click', '.comments-pagination a', function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/commentslist/',
				cache: false,
				complete: function(r) {
					$('#content-inner').html(r.responseText);
					$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
				}
			});
		}
		return false;
	});
	$(document).on('click', '.search-pagination a', function() {
		if (!$(this).hasClass('active')) {
		  seacrhAjaxPagination($(this).attr('href'));
		}
		return false;
	});
	//remove tag
	/*$('.article-tab .tab-pane').on('click', '.remove-tag',function() {
		$.ajax({
			data: $(this).attr('data-src'),
			dataType: 'html',
			url: 'ajax/articles/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});
		return false;
	});*/
	
	
	//article voting
	$('.article-vote-button').click(function() {
		var _this = $(this);
		$.ajax({
			data: {article_id: _this.attr('data-id'), mark: _this.attr('data-mark')},
			dataType: 'html',
			url: 'ajax/articlevote/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				var decoded = $("<div/>").html(ret.title).text();
				$('#stats .article-stat-rating').text(ret.votes);
				$('#stats .article-stat-rating').attr('title', decoded);
				$('.article-vote-button').remove();
			}
		});
		return false;
	});
	
	//comment voting
	$('.comment-vote-button').click(function() {
		var _this = $(this);
		$.ajax({
			data: {comment_id: _this.attr('data-id'), mark: _this.attr('data-mark')},
			dataType: 'html',
			url: 'ajax/commentvote/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				var rating = '';
				var decoded = $("<div/>").html(ret.title).text();
				if (ret.votes >= 1) {
					rating = 'positive';
				} else if (ret.votes < 0) {
					rating = 'negative';
				}
				$('.comment_rating[data-id="' + _this.attr('data-id') + '"]').removeClass('positive').removeClass('negative').addClass(rating).text(ret.votes);
				$('.comment_rating[data-id="' + _this.attr('data-id') + '"]').attr('title', decoded);
				_this.parent().find('.comment-vote-button').remove();
			}
		});
		return false;
	});
	
	//question voting
	$('.question-vote-button').click(function() {
		var _this = $(this);
		$.ajax({
			data: {qa_id: _this.attr('data-id'), mark: _this.attr('data-mark')},
			dataType: 'html',
			url: 'ajax/qavote/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				$('#stats .article-stat-rating').text(ret.votes);
				$('.question-vote-button').remove();
			}
		});
		return false;
	});
	//personal articles
	$('#articles-personal').on('change', '.select-pick',function() {
		$.ajax({
			data: $('#articles-personal form').serialize(),
			dataType: 'html',
			url: 'ajax/articlesmyarticles/',
			cache: false,
			complete: function(r) {
				$('#articles-personal').html(r.responseText);
				$('#articles-personal .select-pick').selectpicker('refresh');
			}
		});
	});
	$('#articles-personal').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/articlesmyarticles/',
				cache: false,
				complete: function(r) {
					$('#articles-personal').html(r.responseText);
					$('#articles-personal .select-pick').selectpicker('refresh');
				}
			});
		}
		return false;
	});
	//company articles
	$('#articles-company').on('change', '.select-pick',function() {
		$.ajax({
			data: $('#articles-company form').serialize(),
			dataType: 'html',
			url: 'ajax/articlescompanyarticles/',
			cache: false,
			complete: function(r) {
				$('#articles-company').html(r.responseText);
				$('#articles-company .select-pick').selectpicker('refresh');
			}
		});
	});
	$('#articles-company').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/articlescompanyarticles/',
				cache: false,
				complete: function(r) {
					$('#articles-company').html(r.responseText);
					$('#articles-company .select-pick').selectpicker('refresh');
				}
			});
		}
		return false;
	});
	//modx work
	$('#modx-work').on('change', '.select-pick',function() {
		/*var $a = $(this),
			data = $('#workSort').serialize(),
			$sgroup = $($a.parents()[2]);
		*/
		
		var data = new Array();
		data[0] = $('#workSort').serialize();
		
		historyWorkFilters(data,$(this).children(':selected').data('href'),'ajaxWorkFilters');
		
		/*$('.sort-group').ajaxAnimation('small-blue');
		$('.sort-group .select-pick').prop('disabled', true);
		$('.sort-group .select-pick').selectpicker('refresh');
		
		$.ajax({
			data: data,
			dataType: 'html',
			url: 'ajax/worklist/',
			cache: false,
			complete: function(r) {
				$('#modx-work').html(r.responseText);
				$('#modx-work .select-pick').selectpicker('refresh');
			}
		});
		return false;*/
	});
	
	
	
	
	
	
	$('#modx-work').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			historyPagination($(this).attr('data-src'),$(this).attr('href'),'workAjaxPagination');	
			//workAjaxPagination($(this).attr('data-src'));
		}
		return false;
	});
	$('#modx-work-adm').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/workatmodx/',
				cache: false,
				complete: function(r) {
					$('#modx-work-adm').html(r.responseText);
				}
			});
		}
		return false;
	});
	//developers list filters
	$('#content .list-developers').on('change', 'select.select-pick',function() {
		if (!$(this).hasClass('disabled')) {
			/*var btn = $($(this).parents()[1]).find('button.submit-filter-visible');
			btn.ajaxAnimation('small-btn');*/
			
			var data = new Array();
			data[0] = $('#content .list-developers form.filter').serialize();
			data[1] = 'ajax/developerrating/';
			datauri = $(this).children(':selected').data('href');
			
			$('.list-developers button.submit-filter-visible').ajaxAnimation('small-btn');
			
			historyDevFilters(data,datauri,'ajaxDevFilters');
			
		}
	});
	
	$('#content .list-developers').on('click', '.submit-filter-visible',function(e) {
		if (!$(this).hasClass('disabled')) {
			e.preventDefault();
			
			var data = new Array();
			data[0] = $('#content .list-developers form.filter').serialize()+'&searchok=1';
			data[1] = 'ajax/developerrating/';
			datauri = $('#search-name').data('href').replace('{name}',$('#search-name').val());
			
			$('.list-developers button.submit-filter-visible').ajaxAnimation('small-btn');
			
			historyDevFilters(data,datauri,'ajaxDevFilters');
			
			//$(this).ajaxAnimation('small-btn');
			
		}
		return false;
	});	
	

	
	
	
	$('#content .list-developers').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
		  //developerAjaxPagination($(this).attr('data-src'), $(this).attr('href'));
		  historyPagination($(this).attr('data-src'), $(this).attr('href'),'developerAjaxPagination');
		}
		return false;
	}); 
	
	$('#content .list-developers').on('click', '.table-developer th a',function(e) {
	
		var data = new Array();
		data[0] = $(this).data('src');
		data[1] = 'ajax/developerrating/';
		datauri = $(this).attr('href');
		
		historyDevFilters(data,datauri,'ajaxDevFilters');
		
		/*$.ajax({
			data: $(this).attr('data-src'),
			dataType: 'html',
			url: 'ajax/developerrating/',
			cache: false,
			complete: function(r) {
				$('#content .list-developers').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});*/
		
		return false;
	});
	// QA list filters
	$('.qa-tab .tab-pane').on('click', '.qa-pagination a',function(e) {
		if (!$(this).hasClass('active')) {
			historyPagination($(this).attr('data-src'),$(this).attr('href'),'qaAjaxPagination');		
		}
		return false;
	});

	$('.qa-tab .tab-pane').on('change', '.select-pick',function() {
		/*var $a = $(this),
			data = $('.active.tab-pane form.filter').serialize(),
			$sgroup = $($a.parents()[2]);*/
			
		var data = new Array();
		data[0] = $('.active.tab-pane form.filter').serialize();
		data[1] = 'ajax/qalist/';
		
		historyFilters(data,$(this).children(':selected').data('href'),'ajaxFilters');
	});
	// QA list filters on main
	$('#qa-main').on('click', '.bl-menu a', function() {
		$('#qa-main').ajaxABlock();
		$.ajax({
			data: $(this).attr('data-src'),
			dataType: 'html',
			url: 'ajax/qalistonmain/',
			cache: false,
			complete: function(r) {
				$('#qa-main').html(r.responseText);
				$('#qa-main .select-pick').selectpicker('refresh');
				$('#qa-main').ajaxABlock(true);
			}
		});
		return false;
	});
	
	$('#qa-main').on('change', '.select-pick', function() {
		$('#qa-main').ajaxABlock();
		$.ajax({
			data: $('#qa-main form').serialize(),
			dataType: 'html',
			url: 'ajax/qalistonmain/',
			cache: false,
			complete: function(r) {
				$('#qa-main').html(r.responseText);
				$('#qa-main .select-pick').selectpicker('refresh');
				$('#qa-main').ajaxABlock(true);
			}
		});
	});
	//QA vote button
	$('#qa-vote-button').click(function() {
		var _this = $(this);
		$.ajax({
			data: 'qa_id='+_this.attr('data-id'),
			dataType: 'html',
			url: 'ajax/qavote/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				$('#stats .article-stat-rating').text(ret.votes);
				_this.remove();
			}
		});
		return false;
	});
	//QA best answer button
	$('.qa-best-answer').click(function() {
		var _this = $(this);
		$.ajax({
			data: _this.attr('data-src'),
			dataType: 'html',
			url: 'ajax/qabestanswer/',
			cache: false,
			complete: function(r) {
				var ret = $.parseJSON(r.responseText);
				$('#qcom'+ret.result+'-div').addClass('best-answer');
				$('.qa-best-answer').remove();
			}
		});
		return false;
	});
	//QA list nav
	$('#question-answer').on('click', '.pagin a',function(e) {
		if (!$(this).hasClass('active')) {
			$.ajax({
				data: $(this).attr('data-src'),
				dataType: 'html',
				url: 'ajax/qanswers/',
				cache: false,
				complete: function(r) {
					$('#question-answer').html(r.responseText);
				}
			});
		}
		return false;
	});
	
    
	
	if ($.type($('.form-parent form').val())!="undefined"){
		$(".form-parent form").submit(function() {
			//When the form is submitted
			var elem = $(this).children('fieldset').find('input');
			elem.removeClass("error-field");
			$(this).removeClass("error-form");			
			var error,foc;
		  
			//Loop through each input and textarea
			elem.each(function(index){

				if($(this).hasClass('email')==true){
					var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
					if (!pattern.test(this.value)){
						$(this).addClass("error-field");
						error = true;
						if(!foc)foc = $(this);   
					}else{
						$(this).removeClass("error-field");
					}                
				}else if($(this).hasClass('required')==true){
					//It has the class, is it empty or still have the default value?
					if(!this.value){ //|| this.value == this.defaultValue ) {
						//Add the error class for CSS styling
						$(this).addClass("error-field");
						//Switch the error var to true
						error = true;
						//If this is the first required element not filled out, save the ID
						if(!foc)foc = $(this);
					}else{
						//If this is filled out make sure it doesn't have the error class
						$(this).removeClass("error-field");
					}
				}
			});
	 
			//If error has been switched to true
			if (error){     
				//Focus on the first required element that hasn't been filled out.
				if(foc) foc.focus();
				$(this).addClass("error-form");
				//Stop the form from submitting
				return false;
			}else{
				//Clear default values on non required elements before submit continues
				if(elem.value == this.defaultValue)
				this.value = "";
			}
		});  
	}

	$(document).on('change', '#project-uncertain', function() {
		if ($('#project-budget').val() != '') {
			tmp_budget = $('#project-budget').val();
		}
		if ($('#project-uncertain').is(':checked') == 1) {
			$('#project-budget').val('').attr('disabled', true);
			$('#project-currency').prop('disabled', true);
			$('#project-currency').selectpicker('refresh');
		} else if ($('#project-uncertain').is(':checked') == 0) {
			$('#project-budget').attr('disabled', false).val(tmp_budget);
			$('#project-currency').prop('disabled', false);
			$('#project-currency').selectpicker('refresh');
		}
	});
	
	$(document).on('click', '.social-fields span.delete a', function() {
		var p = $(this).parent().parent().parent();
		p.find('select.select-pick option:eq(0)').attr('selected', 'selected');
		p.find('input.social-value').val('');
		p.find('select.select-pick').selectpicker('refresh');
		if ($('.social-fields:visible').length > 1) {
			p.addClass('social-hidden');
			
			var p_clone = p;
			p.remove();
			$('.add-social-contact').before(p_clone);
		}
		return false;
	});
	
	$(document).on('click', '.social-block a.add-social-contact', function() {
		var next = $('.social-fields:visible').next('.social-fields.social-hidden');
		if (next.length) {
			next.removeClass('social-hidden');
		}
		return false;
	});
	
	$(document).on('click', 'input[type="button"], button', function() {
		if ($(this).attr('data-href')) {
			document.location.href = $(this).attr('data-href');
		}
	});
	
    if ($('.city-ajax').length>0) {
		var cn=$('.city-ajax').data('country');
		var ct=$('.city-ajax').data('city');
		var countryselect=$('.city-ajax');
		if (cn)
		$.ajax({
			data: { country: cn },
			dataType: 'json',
			type: 'post',
			url: 'ajax/cities/?rand=' + new Date().getTime() + Math.random(),
			cache: false,
			complete: function(data) {
				var dataJSON=$.parseJSON(data.responseText);
				var options = [];
				$.each(dataJSON, function(key, value) {
					options.push(
						$("<option>").val(value).text(key)
					);
				});
				if (dataJSON){
					var select=countryselect;
					select.children('option').each(function(i,el){
						if (i>0){
						//alert($(this).html());
							$(this).remove();
						}
					});
					
					var options_html ='';
					$.each(options,function(index, value) {
						options_html+='<option value="'+value[0].value+'"'+((ct == value[0].value) ? ' selected' : '')+'>'+value[0].text+'</option>';
					});
					$(options_html).appendTo(select);
					
					/*
					var options='';
					$.each(dataJSON,function(index, value) {
						if (ct==index){
							options+='<option value="'+value+'" selected>'+index+'</option>';	
						}			else{
							options+='<option value="'+value+'">'+index+'</option>';	
						}						
					});
					*/
					//$(options).appendTo(select);		 
					//select.selectpicker('render');	
					//select.selectpicker('refresh');
					//select.selectBoxIt('refresh');				
				}
			}
		});			
	}
	
  if ($.type($('input[data-title],textarea[data-title]').val())!="undefined"){
	$('body').tooltip({selector:'.error-field',placement:'topleftauto',html:true,trigger:'hover',title:$(this).data('title'),template: '<div class="fly-form-auto tooltip tooltip-yellow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'});    
  }
  
  	if ($.type($('.l-form').val())!="undefined"){
		$('.l-form').submit(function(e) {
			var form=$(this);	
			if(form.attr('validated')){
				return true;
			}
			if (!(form.hasClass('error-form'))){
				$.ajax({
					data: form.serialize(),
					dataType: 'json',
					type: 'post',
					url: 'ajax/login/?rand=' + new Date().getTime() + Math.random(),
					cache: false,
					complete: function(data) {
						dataJSON=$.parseJSON(data.responseText)
						if (dataJSON.errors){
							$.each(dataJSON.errors,function(index, value) {
								form.find("[name="+index+"]").attr('data-title',value).addClass("error-field");	
							});
						}else{
							form.attr('validated',true);
							form.submit();
						}
					}
				});				
			}
			e.preventDefault();
		});
	}
  
  $('.run-auth').click(function(e){
    e.preventDefault();
    $('.i-login>a').click(); 
      $.scrollTo('0px', 600, { axis:'y' }); 
  });
  
  
  if ($.type($('.popup-social').val())!="undefined"){
    $("body").on("click",".link-social",function(e){
      e.preventDefault();
      $('.popup-login').fadeOut();	  
      $('.popup-social').fadeToggle();
      $('#overlay-form').remove();	  
      $('<div id="overlay-form"></div>').appendTo($('body'));
    });   
  }
  
  	$('.birthday-block').on('change', 'select[name="profile-month"]',function() {
		var today = new Date();
		if (!(year=$(this).nextAll('select[name="profile-year"]').find(':selected').val())){
			var year = today.getFullYear(); 
		}

		var month=$(this).val();
		var days=new Date(year, month, 0).getDate();
		optionsDays($(this),days);
	});
	
  	$('.birthday-block').on('change', 'select[name="profile-year"]',function() {
		var today = new Date();
		if (!(month=$(this).prevAll('select[name="profile-month"]').find(':selected').val())){
			var month = today.getMonth(); 
		}

		var year=$(this).val();
		var days=new Date(year, month, 0).getDate();
		
		optionsDays($(this),days);
    });
	
	//styled select
	/*$('.select-box-fast').selectBoxIt({
		// Uses the Twitter Bootstrap theme for the drop down
		theme: "bootstrap"
	});*/
  
  	$('form').on('change', '.country-ajax',function(){
		var countryid=$(this).val()
		var countryselect=$(this);
		$.ajax({
			data: { country: countryid },
			dataType: 'json',
			type: 'post',
			url: 'ajax/cities/?rand=' + new Date().getTime() + Math.random(),
			cache: false,
			complete: function(data) {
				dataJSON=$.parseJSON(data.responseText);
				var options = [];
				$.each(dataJSON, function(key, value) {
					options.push(
						$("<option>").val(value).text(key)
					);
				});
				
				if (dataJSON){
					var select=countryselect.parent().next('.row').children('.city-ajax');
					select.children('option').each(function(i,el){
						if (i>0){
						//alert($(this).html());
							$(this).remove();
						}
					});
					
					var options_html ='';
					$.each(options,function(index, value) {
						options_html+='<option value="'+value[0].value+'">'+value[0].text+'</option>';
					});
					$(options_html).appendTo(select);
					select.next().find('.filter-option').text('Выберите населенный пункт');
					//select.selectpicker('render');	
					//select.selectpicker('refresh');
					//select.selectBoxIt('refresh');					
				}
			}
		});	
	});
  	$('form').on('change', '.select-ajax',function(){
		val = $('option:selected',this).text();
		$(this).next().find('.filter-option').text(val);
	});
	
	if ($.type($('#cj-activekey').val())!="undefined"){	
    var run=0;
		$('#cj-activekey').keyup(function(){
			var thisak=$(this);		
			var activekey=thisak.val();	
			if ((activekey.length==24) && (run===0)){
        run=1;
				thisak.after('<div class="ajax-loader-1"></div>');
				$.ajax({
					data: { 'activekey': activekey },
					dataType: 'json',
					type: 'post',
					url: 'ajax/company-by-activation-key/?rand=' + new Date().getTime() + Math.random(),
					cache: false,
					complete: function(data) {
						thisak.nextAll('.ajax-loader-1').remove();					
						thisak.nextAll('.show-company').remove();
						thisak.after(data.responseText);
            run=0;
					}
				});	
			}else{
				thisak.nextAll('.ajax-loader-1').remove();					
				thisak.nextAll('.show-company').remove();
			}
		});		
	}
	
	$('#content .list-company').on('change', 'select.select-pick',function() {
		/*var btn = $($(this).parents()[1]).find('button.submit-filter-visible');
			btn.ajaxAnimation('small-btn');*/
			
			var data = new Array();
			data[0] = $('#content .list-company form.filter').serialize();
			data[1] = 'ajax/list-company/';
			datauri = $(this).children(':selected').data('href');
			
			$('.list-company button.submit-filter-visible').ajaxAnimation('small-btn');
			
			historyDevFilters(data,datauri,'ajaxDevFilters');
			
			
		/*$.ajax({
			data: $('#content .list-company form.filter').serialize(),
			dataType: 'html',
			url: 'ajax/list-company/',
			cache: false,
			complete: function(r) {
				$('#content .list-company').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});*/
	});
	
	
	$('#content .list-company').on('click', '.submit-filter-visible',function(e) {
		if (!$(this).hasClass('disabled')) {
			
			e.preventDefault();
			
			var data = new Array();
			data[0] = $('#content .list-company form.filter').serialize()+'&searchok=1';
			data[1] = 'ajax/list-company/';
			datauri = $('#search-name').data('href').replace('{name}',$('#search-name').val());
			
			$('.list-company button.submit-filter-visible').ajaxAnimation('small-btn');
			
			historyDevFilters(data,datauri,'ajaxDevFilters');
			
			
			/*$(this).ajaxAnimation('small-btn');
			$.ajax({
				data: $('#content .list-company form.filter').serialize()+'&searchok=1',
				dataType: 'html',
				url: 'ajax/list-company/',
				cache: false,
				complete: function(r) {
					$('#content .list-company').html(r.responseText);
					$('.select-pick').selectpicker('refresh');
				}
			});*/
		}
		return false;
	});	
	
	$('#content .list-company').on('click', '.table-company th a',function() {
	
		var data = new Array();
		data[0] = $(this).data('src');
		data[1] = 'ajax/list-company/';
		datauri = $(this).attr('href');
		
		historyDevFilters(data,datauri,'ajaxDevFilters');
	
		/*$.ajax({
			data: $(this).attr('data-src'),
			dataType: 'html',
			url: 'ajax/list-company/',
			cache: false,
			complete: function(r) {
				$('#content .list-company').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
			}
		});*/
		return false;
	}); 
	
	$('#content .list-company').on('click', '.pagin a',function() {
		//companyAjaxPagination($(this).attr('data-src'));
		historyPagination($(this).attr('data-src'), $(this).attr('href'),'companyAjaxPagination');
		return false;
	});   


	$('#inner-column').on('click', '.bl-menu a', function(e) {
		var $a = $(this),
			tab = $a.attr('data-tab'),
			url = $a.attr('data-url');
	
		if (tab) {
			$('.bl-menu a.active').removeClass('active');
			$('#inner-column section .records-list').hide();
			$('#'+tab).show();
			
			$a.addClass('active');
			
			if (!$a.hasClass('preloaded')) {
				if (url) {
					$.ajax({
						dataType: 'html',
						url: url,
						cache: false,
						complete: function(r) {
							$('#'+tab).html(r.responseText);
							$a.addClass('preloaded');
						}
					});
				}
			}
		}
		return false;
	});


});    

function tabContent(t) {
	$tab = $('.nav-tabs a').eq(t);

	$tabc = $('.tab-pane' + $tab.attr('data-target'));
	$tab.tab('show');
	if ($tab.attr('data-ajax')) {
		if (!$tab.parent().hasClass('preloaded')) {
			if (xhr) {
				xhr.abort();
			}
			var xhr = $.ajax({
				url: $tab.attr('data-ajax'),
				success: function(data) {
					$tabc.html(data);
					$tab.parent().addClass('preloaded');
					$('.select-pick').selectpicker('refresh');
				}
			});
		}
	}
}

function uploadHandler() {
		$('#prview-upload-iframe').contents().find('#site-preview-img').change(function () {
		//alert($(this).val());
		$('#uploader').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		$('#prview-upload-iframe').contents().find('form').submit();
	});	
	
	if ($('#prview-upload-iframe').contents().find('#response').text().length > 1) {
		$('.filebrowser-image-fr').attr('src',$('#prview-upload-iframe').contents().find('#response').text());	
	}
	
} 

function optionsDays(obj,days){
		var iselected=0;
		var profileday=obj.prevAll('select[name="profile-day"]');
		profileday.children().each(function(i,el){
			if (i>0){
				if ($(this).is(':selected')){
					iselected=i;
				}
				$(this).remove();
			}
		});

		for( var i = 1; i<=days; i++ ){
			if (iselected==i) {
				$('<option value="'+i+'" selected>'+i+'</option>').appendTo(profileday);
			}else{
				$('<option value="'+i+'">'+i+'</option>').appendTo(profileday);
			}
		}

		profileday.selectpicker('refresh');
}

var docTitle = document.title;

function galleryAjaxPagination(datahref){	
	var $container = $('.pagin.gallery-pagination');
	if (!$container.hasClass('disabled')) {
		$container.addClass('disabled');
		$container.ajaxAnimation();
		  $.ajax({
			//data: $(this).attr('data-src').split('?')[1],
			data: datahref[0],
			dataType: 'html',
			url: 'ajax/sitegallery/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
				$container.removeClass('disabled');
				$('.active.tab-pane img.preview').each(function () {
					if (!$(this)[0].complete) {
						//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
						$(this).load(function () {
							if ($.browser.msie) {
								$(this).show();
							} else {
								$(this).fadeIn();	
							}
						});
					} else {
						if ($.browser.msie) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					}
					
				});
				$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
			}
		  });
	}
}

function developerAjaxPagination(datahref, simpleurl){
	var $container = $('.pagin.dev-pagination');
	if (!$container.hasClass('disabled')) {
		$container.addClass('disabled');
		$container.ajaxAnimation();
		$.ajax({
			data: datahref[0],
			dataType: 'html',
			url: 'ajax/developerrating/',
			cache: false,
			complete: function(r) {
				$('#content .list-developers').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
				$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
				$container.removeClass('disabled');
			}
		});
	}
}



function historyPagination(datahref,datauri,f) {
	var data = new Object();
	data.params = new Array();
	data.params[0] = datahref;
	data.params[1] = $('.tab-pane.active').index();
	data.f = f;
	History.pushState(data,docTitle,datauri);
	//qaAjaxPagination(datahref);
}
function qaAjaxPagination(datahref){
	var $container = $('.pagin.qa-pagination');
	if (!$container.hasClass('disabled')) {
		$container.addClass('disabled');
		$container.ajaxAnimation();
		$.ajax({
			data: datahref[0],
			dataType: 'html',
			url: 'ajax/qalist/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
				$('.select-pick').selectpicker('refresh');
				$container.removeClass('disabled');
			}
		});
	}
}
function articleAjaxPagination(datahref){
	var $container = $('.tab-pane.active .pagin.article-pagination');
	if (!$container.hasClass('disabled')) {
		$container.addClass('disabled');
		$container.ajaxAnimation();
		  $.ajax({
			data: datahref[0],
			dataType: 'html',
			url: 'ajax/articles/',
			cache: false,
			complete: function(r) {
				$('.active.tab-pane').html(r.responseText);
				$('.select-pick').selectpicker('refresh');
				$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
				$container.removeClass('disabled');
				$('.submit-filter').remove();
			}
		  });
	}
}


function historyFilters(d,datauri,f) {
	var data = new Object();
	data.params = new Array();
	data.params[0] = d[0];
	data.params[1] = $('.tab-pane.active').index();
	data.params[2] = d[1];
	data.f = f;

	History.pushState(data,docTitle,datauri);
}
function ajaxFilters(data) {
	$('.active.tab-pane .sort-group').ajaxAnimation('small');
	$('.active.tab-pane .select-pick').prop('disabled', true);
	$('.active.tab-pane .select-pick').selectpicker('refresh');
	$.ajax({
		data: data[0],
		dataType: 'html',
		url: data[2],
		cache: false,
		complete: function(r) {
			$('.active.tab-pane').html(r.responseText);
			$('.select-pick').selectpicker('refresh');
		}
	});
	
}

function ajaxSiteGalleryFilters(data) {
	$.ajax({
		data: data[0]+'&ajax=1',
		dataType: 'html',
		url: data[2],
		cache: false,
		complete: function(r) {
			$('.active.tab-pane').html(r.responseText);
			$('.select-pick').selectpicker('refresh');
			$('.active.tab-pane img.preview').each(function () {
				if (!$(this)[0].complete) {
					//$(this).attr('src',$(this).attr('src')+'?_='+new Date().getTime());
					$(this).load(function () {
						if ($.browser.msie) {
							$(this).show();
						} else {
							$(this).fadeIn();	
						}
					});
				} else {
					if ($.browser.msie) {
						$(this).show();
					} else {
						$(this).fadeIn();	
					}
				}
			});
		}
	});
}

/*function qaAjaxFilters(data) {
	
	$('.active.tab-pane .sort-group').ajaxAnimation('small');
	$('.active.tab-pane .select-pick').prop('disabled', true);
	$('.active.tab-pane .select-pick').selectpicker('refresh');
	$.ajax({
		data: data[0],
		dataType: 'html',
		url: data[2],
		cache: false,
		complete: function(r) {
			$('.active.tab-pane').html(r.responseText);
			$('.select-pick').selectpicker('refresh');
		}
	});
}*/

/*function articleAjaxFilters(data) {

	$('.active.tab-pane .sort-group').ajaxAnimation('small');
	$('.active.tab-pane .select-pick').prop('disabled', true);
	$('.active.tab-pane .select-pick').selectpicker('refresh');	
	
	$.ajax({
		data: data[0],
		dataType: 'html',
		url: data[2],
		cache: false,
		complete: function(r) {
			$('.active.tab-pane').html(r.responseText);
			$('.select-pick').selectpicker('refresh');
		}
	});

}*/
function historyWorkFilters(d,datauri,f) {
	var data = new Object();
	data.params = new Array();
	data.params[0] = d[0];
	//data.params[1] = $('.tab-pane.active').index();
	//data.params[2] = d[1];
	data.f = f;
	//ajaxWorkFilters(data.params);
	History.pushState(data,docTitle,datauri);
}
function ajaxWorkFilters(data) {
	$('.sort-group').ajaxAnimation('small-blue');
	$('.sort-group .select-pick').prop('disabled', true);
	$('.sort-group .select-pick').selectpicker('refresh');
	
	$.ajax({
		data: data[0],
		dataType: 'html',
		url: 'ajax/worklist/',
		cache: false,
		complete: function(r) {
			$('#modx-work').html(r.responseText);
			$('#modx-work .select-pick').selectpicker('refresh');
		}
	});
	
}
function historyDevFilters(d,datauri,f) {
	var data = new Object();
	data.params = new Array();
	data.params[0] = d[0];
	data.params[2] = d[1];
	data.f = f;
	
	History.pushState(data,docTitle,datauri);
	//ajaxDevFilters(data.params);
}
		
function ajaxDevFilters(data) {	
	$.ajax({
		data:data[0],
		dataType: 'html',
		url: data[2],
		cache: false,
		complete: function(r) {
			if ($('#content .list-developers').length) {
				$('#content .list-developers').html(r.responseText);
			} else if ($('#content .list-company').length) {
				$('#content .list-company').html(r.responseText);
			}
			$('.select-pick').selectpicker('refresh');
		}
	});
}

function companyAjaxPagination(data){
			var $container = $('.pagin.company-pagination');
			if (!$container.hasClass('disabled')) {
				$container.addClass('disabled');
				$container.ajaxAnimation();
				$.ajax({
					data: data[0],
					dataType: 'html',
					url: 'ajax/list-company/',
					cache: false,
					complete: function(r) {
						$('#content .list-company').html(r.responseText);
						$('.select-pick').selectpicker('refresh');
						$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
						$container.removeClass('disabled');
					}
				});
			}
}     
function workAjaxPagination(datahref){
			var $container = $('.pagin.work-pagination');
			if (!$container.hasClass('disabled')) {
				$container.addClass('disabled');
				$container.ajaxAnimation();
				$.ajax({
					data: datahref[0],
					dataType: 'html',
					url: 'ajax/worklist/',
					cache: false,
					complete: function(r) {
						$('#modx-work').html(r.responseText);
						$('#modx-work .select-pick').selectpicker('refresh');
						$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
						$container.removeClass('disabled');
					}
				});
			}
}
function seacrhAjaxPagination(href){
			var $container = $('.pagin.search-pagination');
			if (!$container.hasClass('disabled')) {
				$container.addClass('disabled');
				$container.ajaxAnimation();
			var uri = href.split('?');
			var q = uri[1].split('&');
			var params = {};
			$.each(q, function(i, v) {
				var c = v.split('=');
				params[c[0]] = c[1];
			});

			$.get('ajax/search', params, function(data) {
				$('#content-inner').html(data);
				$('html, body').animate({ scrollTop: $('#content-inner').offset().top - 10 }, 'slow');
				$container.removeClass('disabled');
			});
		}
}
var decodeHtmlEntity = function(str) {
  return str.replace(/&([a-zA-Z0-9]+);/g, function(match, dec) {
    d=document.createElement('div');
    d.innerHTML = '&'+dec;
    return d.innerText;
  });
};

$.fn.ajaxAnimation = function(size) {
	var size = typeof size !== 'undefined' ? size : 'large';
	if (size == 'large') {
		var html = '<img src="/assets/templates/html/i/ajax-preload.GIF" alt="" class="ajax-animation" /><div class="overlay"></div>';
	}
	if (size == 'small') {
		var html = '<img src="/assets/templates/html/i/ajax-preload-small.GIF" alt="" class="ajax-animation" />';
	}
	if (size == 'small-btn') {
		var html = '<img src="/assets/templates/html/i/ajax-preload-small-tr.GIF" alt="" class="ajax-animation" />';
		$(this).addClass('disabled');
	}
	if (size == 'small-blue') {
		var html = '<img src="/assets/templates/html/i/ajax-preload-small-blue.GIF" alt="" class="ajax-animation blue" />';
	}
	$(this).append(html);
}

$.fn.ajaxABlock = function(remove) {
	if (remove && remove === true) {
		$(this).find('.preload-mask').remove();
	} else {
		$(this).prepend('<div class="preload-mask"><div class="preload-image"></div></div>');
		$(this).find('.preload-mask').css({height: $(this).height() + 1 + 'px'});
	}
}

function blinkUserMenuLink() {
	var el = $("li.flashing a");
	if (!el.hasClass('active')) {
		el.fadeTo(100, 0.2).fadeTo(200, 1.0);
	}
}