import pprint
import requests

import bs4

url = 'http://forum.saransk.ru/'
html = requests.get(url)
soup = bs4.BeautifulSoup(html.text)
loginForm = soup.find('form', {'id': 'login'})
hiddenAuthKey = soup.find('input', {'name': 'auth_key'})['value']

authData = {    
            'ips_username': 'sergey kalinin',
            'ips_password': 'ZEROCITY133',
            'auth_key': hiddenAuthKey,
            'rememberMe': 1,
            'referer': 	'http://forum.saransk.ru/'
}

pprint.pprint(authData)

cookies = dict(invbf_session_id='a903cd5122864d42f18e710123d25dc5')

pprint.pprint(cookies)

req = requests.get(url, params=authData, cookies=cookies)
soup = bs4.BeautifulSoup(req.text)

signLinkNotLogged = soup.find('a', {'id': 'sign_in'})
if signLinkNotLogged:
    print('not_enter')
else:
    print('enter')

