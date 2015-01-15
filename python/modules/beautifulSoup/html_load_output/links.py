import urllib.request
import urllib.parse

from bs4 import BeautifulSoup

html = urllib.request.urlopen('http://icult.ru/')

soup = BeautifulSoup(html)
print(soup.prettify())

'''
for incident in soup('td'):
    where, linebreak, what = incident.contents[:3]
    print(where.strip())
    print(what.strip())
    '''
    

