import pprint
import requests

import bs4

url = 'http://forum.saransk.ru/'
html = requests.get(url)
soup = bs4.BeautifulSoup(html.text)
loginForm = soup.find('form', {'id': 'login'})

pprint.pprint(loginForm)
