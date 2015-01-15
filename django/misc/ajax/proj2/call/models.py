from django.db import models
from django.forms import ModelForm


class Call(models.Model):
    name = models.CharField(u"имя", max_length=50)
    email = models.CharField(u"e-mail", max_length=150)

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'

    def __unicode__(self):
        return self.name


class CallForm(ModelForm):
    class Meta:
        model = Call
