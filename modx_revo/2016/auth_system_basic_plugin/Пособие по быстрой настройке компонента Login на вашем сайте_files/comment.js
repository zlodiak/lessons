var mySettings = {
	onShiftEnter:	{keepDefault:false, replaceWith:'<br />\n'},
	onTab:			{keepDefault:false, openWith:'	 '},
	previewParserPath: '~/parsers/markitup.comment-parser.php',
	markupSet: [
		{name:'Полужирный', className:'bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
		{name:'Курсив', className:'italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)' },
		{name:'Зачеркнутый', className:'stroke', key:'S', openWith:'<del>', closeWith:'</del>' },	
		{separator:'---------------' },	
		{name:'Ul', className:'ul', openWith:'<ul>\n', closeWith:'</ul>\n' },
		{name:'Ol', className:'ol', openWith:'<ol>\n', closeWith:'</ol>\n' },
		{name:'Li', className:'li', openWith:'<li>', closeWith:'</li>' },
		{separator:'---------------' },	
		{name:'Фотография', className:'picture', key:'P', replaceWith:'<img src="[![Источник:!:http://]!]" alt="[![ALT текст картинки]!]" />' },
		{name:'Ссылка', className:'link', key:'L', openWith:'<a href="[![Ссылка:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Текст ссылки...' },
		{separator:'---------------' },	        	
		{name:'Добавить код', className:'code',  key:'K', openWith:'<code>', closeWith:'</code>' },		
		{separator:'---------------' },
		{name:'Убрать форматирование', className:'clean', replaceWith:function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } },
		{name:'Предпросмотр', className:'preview', call:'preview' },
		{separator:'---------------' },
		{name: 'Развернуть / Уменьшить',
                className: 'fullScreen',
                key: "F",
                call: function(){
                        if ($('.markItUp').hasClass('fullScreen')) {
                                $('.markItUp').removeClass('fullScreen');
                                $('textarea#content').css(
                                        'height',
                                        markItUpTextareaOGHeight + "px"
                                );
                                $('.markitup-fullscreen').remove();                                  
                        }
                        else {
                                markItUpTextareaOGHeight = $('textarea#content').innerHeight();
                                $('.markItUp').addClass('fullScreen');
                                $('.markItUp.fullScreen textarea#content').css(
                                        'height',
                                        ($('.markItUp.fullScreen').innerHeight() - 90) + "px"
                                );
                                $('body').append("<div class='markitup-fullscreen'></div>");                                                              
                        }
                }
	}
  ]
}