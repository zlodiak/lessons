import urllib.request
import urllib.parse
import re

import requests
import bs4


print(requests.codes.ok)
'''
hello = urllib.request.urlopen('http://icult.ru/')
commentSoup = bs4.BeautifulSoup(hello)
comment = commentSoup.find(text=re.compile("cult"))

print(comment)


soup = bs4.BeautifulSoup("Hello")
print(soup.contents[0])
print(soup.originalEncoding)


#xml = urllib.request.urlopen('http://fh79272k.bget.ru/py_test/books.xml')
xml = "<doc><tag1>Contents 1<tag2>Contents 2<tag1>Contents 3"
soup = BeautifulStoneSoup(xml)
print(soup.prettify())

html = urllib.request.urlopen('http://icult.ru/')
soup = BeautifulSoup(html)
print(soup.prettify())

'''
