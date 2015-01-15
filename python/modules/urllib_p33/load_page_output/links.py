import urllib.request

from bs4 import BeautifulSoup

page = urllib.request.urlopen("http://icult.ru/index.php")
print(page.read(3000).decode('windows-1251'))
'''
soup = BeautifulSoup(page)
for incident in soup('td'):
    where, linebreak, what = incident.contents[:3]
    print(where.strip())
    print(what.strip())
    
'''
