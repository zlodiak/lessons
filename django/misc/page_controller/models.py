from django.db import models


class Page(models.Model):
	title = models.CharField(u'Заголовок страницы', max_length=30)
	menu_punkt = models.CharField(verbose_name=u'Название пункта меню',max_length=30)
	slug = models.CharField(verbose_name=u'Короткая ссылка (slug)', max_length=30)
	content = models.TextField(verbose_name=u'Контент',max_length=30000)
	show_on_index = models.BooleanField(verbose_name=u'Показывать на главной', default=False)
		
	@classmethod
	def get_all_pages(self):
		return self.objects.all()	
		
	@classmethod
	def get_page(self, slug):
		return self.objects.filter(slug=slug)	
		
	@classmethod
	def get_main_pages(self):
		return self.objects.filter(show_on_index=True)						
		
	class Meta:
		verbose_name = 'Страница'
		verbose_name_plural = 'Страницы'	
