import pprint
import requests
import re

import bs4

r = requests.post('http://forum.saransk.ru/')
pprint.pprint(r.headers)


s = requests.Session()
data = {"login":"my_login", "password":"my_password"}
r = s.post(''http://forum.saransk.ru/'', headers=data)




'''

url = 'http://forum.saransk.ru/'
html = requests.get(url)

rawCookie = html.headers['Set-Cookie']
cookie = re.search(r"invbf_session_id=(.*?);", rawCookie).group(1)
pprint.pprint(cookie)

html = requests.get(url)
soup = bs4.BeautifulSoup(html.text)
loginForm = soup.find('form', {'id': 'login'})
hiddenAuthKey = soup.find('input', {'name': 'auth_key'})['value']

authData = {    
            'ips_username': 'xxxxxxxxxxxxxxxxxx',
            'ips_password': 'xxxxxxxxxxxxxxxxxx',
            'auth_key': hiddenAuthKey,
            'rememberMe': 1,
            'referer': 	'http://forum.saransk.ru/'
}

pprint.pprint(authData)

req = requests.get(url, params=authData, cookies=cookie)
soup = bs4.BeautifulSoup(req.text)

signLinkNotLogged = soup.find('a', {'id': 'sign_in'})
if signLinkNotLogged:
    print('not_enter')
else:
    print('enter')

'''
