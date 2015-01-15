import urllib.request
import urllib.parse

from bs4 import BeautifulSoup
from bs4 import BeautifulStoneSoup

#xml = urllib.request.urlopen('http://fh79272k.bget.ru/py_test/books.xml')
xml = "<doc><tag1>Contents 1<tag2>Contents 2<tag1>Contents 3"
soup = BeautifulStoneSoup(xml)
print(soup.prettify())
'''
html = urllib.request.urlopen('http://icult.ru/')
soup = BeautifulSoup(html)
print(soup.prettify())

'''
