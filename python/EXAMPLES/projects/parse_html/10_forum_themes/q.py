import pprint
import requests
import lxml.html
import lxml.cssselect

#url = 'http://forum.saransk.ru/index.php?app=core&module=search&section=search&do=search&fromsearch=1'
#req = get_doc(url)
#docHtml = req.text

docHtml = '''
<!DOCTYPE html>
	<html lang="ru" >
	<head>
		<title>dg</title>
	</head>
<body>
<table class="ipb_table topic_list" id="forum_table">		
	<tbody><tr class="_recordRow __topic __tid72851  expandable " id="trow_72851" data-tid="72851">
	<td class="col_f_icon short altrow">
<img src="http://forum.saransk.ru//public/style_images/master/t_read_dot.png" alt="Вы оставили сообщение в этой теме" title="Вы оставили сообщение в этой теме"><br>
	</td>
	<td>
		<h4><a href="http://forum.saransk.ru/index.php?showtopic=72851&amp;hl=" title="Просмотр">обмен школами ударных</a></h4>
		<span class="desc blend_links">
			<span class="desc lighter">в</span> <a href="http://forum.saransk.ru/forum/8-vse-o-muzyke/">Все о музыке</a>
		</span>
		<span class="desc lighter blend_links toggle_notify_off">
			<br>Автор <a hovercard-ref="member" hovercard-id="2018" data-ipb="noparse" class="url fn name   ___hover___member _hoversetup" href="http://forum.saransk.ru/user/2018-sergey-kalinin/" title="" id="anonymous_element_3"><span itemprop="name">Sergey Kalinin</span></a>, 19.02.2008
		</span>
	</td>
	<td class="col_f_preview __topic_preview">
		<a href="#" class="expander closed" title="Предпросмотр темы">&nbsp;</a>
	</td>	
	</tr>
<tr class="_recordRow __topic __tid72554  expandable " id="trow_72554" data-tid="72554">
	<td class="col_f_icon short altrow">
<img src="http://forum.saransk.ru//public/style_images/master/t_read_dot.png" alt="Вы оставили сообщение в этой теме" title="Вы оставили сообщение в этой теме"><br>
	</td>
	<td>
		<h4><a href="http://forum.saransk.ru/topic/72554-ischu/" title="Просмотр">ищу</a></h4>
		<span class="desc blend_links">
			<span class="desc lighter">в</span> <a href="http://forum.saransk.ru/forum/9-programmirovanie/">Программирование</a>	
		</span>
		<span class="desc lighter blend_links toggle_notify_off">
			<br>Автор <a hovercard-ref="member" hovercard-id="2018" data-ipb="noparse" class="url fn name   ___hover___member _hoversetup" href="http://forum.saransk.ru/user/2018-sergey-kalinin/" title="" id="anonymous_element_5"><span itemprop="name">Sergey Kalinin</span></a>, 14.02.2008		
		</span>
	</td>
	<td class="col_f_preview __topic_preview">
		<a href="#" class="expander closed" title="Предпросмотр темы">&nbsp;</a>
	</td>
	<td class="col_f_views">
		<ul>
			<li>9 Ответов</li>
			<li class="views desc">362 Просмотров</li>
		</ul>
	</td>
	<td class="col_f_post">
	<a href="http://forum.saransk.ru/user/2876-prog-mn/" class="ipsUserPhotoLink left">
<img src="http://forum.saransk.ru/uploads/av-2876.jpg?_r=0" alt="Фотография" class="ipsUserPhoto ipsUserPhoto_mini">
	</a>
		<ul class="last_post ipsType_small">
				<li><a hovercard-ref="member" hovercard-id="2876" data-ipb="noparse" class="url fn name  ___hover___member _hoversetup" href="http://forum.saransk.ru/user/2876-prog-mn/" title="" id="anonymous_element_6"><span itemprop="name">ProG-M@N</span></a></li>
				<li>
					<a href="http://forum.saransk.ru/topic/72554-ischu/?view=getlastpost" title="Перейти к последнему сообщению">20.02.2008</a>
				</li>
		</ul>
	</td>
</tr>	
</tbody></table>
</body>
</html>
'''
docObj = lxml.html.document_fromstring(docHtml)    
table = docObj.xpath('//table[@id="forum_table"]//tr')
for item in table:
    title= item.xpath('td/h4/a/text()')[0].strip()
    theme = item.xpath('//span[contains(concat(" ", normalize-space(@class), " "), " blend_links ")]/a/text()')[0].strip()
    date = item.xpath('//span[contains(concat(" ", normalize-space(@class), " "), " toggle_notify_off ")]/node()')[4].replace(',', '').strip()
    print(title, theme, date)
    
