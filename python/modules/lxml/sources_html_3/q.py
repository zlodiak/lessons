import lxml.html
import requests
import urllib

doc = lxml.html.document_fromstring("""<html>
 <body>
   <span class="simple_text">One</span> tehfghhxt</br>
   <span class="cyrillic_text">Второй</span> cyrcyrcyr</br>
 </body>
</html>
""")
txt1 = doc.xpath('/html/body/span[@class="simple_text"]/text()[1]')
print(txt1)


print('-----------')


string = open('html.html', 'r').read()
doc = lxml.html.document_fromstring(string)
txt1 = doc.xpath('/html/body/span[@class="simple_text"]/text()[1]')
print(txt1)


print('-----------')
'''
resp = requests.get('http://ru.wikipedia.org/wiki/Категория:Животные_по_алфавиту')
doc = lxml.html.document_fromstring(resp.text)
links = doc.xpath('//*[@id="mw-pages"]//li[a]/a')
for link in links:
  print(link.get('href'))



'''
req = requests.get("http://prozaik.16mb.com/html.html")
html = req.text
#print(html)
doc = lxml.html.document_fromstring(html)
txt1 = doc.xpath('/html/body/span[@class="simple_text"]/text()[1]')
print(txt1)

