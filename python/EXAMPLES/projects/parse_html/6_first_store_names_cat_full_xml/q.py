import lxml.etree
import lxml.html

xml = '<catalog><category>iPhone</category><category>iPad</category><category>iPod</category><category>iMac</category><category>MacBook</category><category>Mac Mini</category><category>Чехлы</category><category>Защитные   пленки</category><category>Акксессуары</category><category>Наушники и гарнитуры</category><category>Переходники и Провода</category><category>Автомобильные аксессуары</category><category>Aккустические системы</category><category>Зарядные устройства</category><category>Видео очки</category><category>Wi-Fi оборудование</category><category>Аккумуляторы и блоки питания</category><category>BlackBerry</category><category>Подставки и док-станции</category><category>Игрушки</category><category>Цифровые ручки</category><category>Полезные устройства</category><category>Планшетные компьютеры</category><category>Samsung</category><category>GoPro</category><category>Память</category></catalog>'
rt = lxml.etree.fromstring(xml)
print(lxml.etree.tounicode(rt, pretty_print=True))



