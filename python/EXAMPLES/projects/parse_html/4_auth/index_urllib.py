import urllib
import pprint
import re
import requests

import bs4

#search auth key in form
url = 'http://forum.saransk.ru/'
html = urllib.request.urlopen(url).read().decode('utf-8')
soup = bs4.BeautifulSoup(html)
loginForm = soup.find('form', {'id': 'login'})
hiddenAuthKey = soup.find('input', {'name': 'auth_key'})['value']

#forming authorize data array
authData = {    
            'login': 'sergey kalinin',
            'password': 'ZEROCITY133',
            'authKey': hiddenAuthKey,   #from hidden field of form
            'invbfSessionId': '9e2f7feb2e1423b7982c0551b563eafe'    #search cookie auth id in browser(invbf_session_id)
}

#authData = urllib.parse.urlencode(authData)

pprint.pprint(authData)

req = urllib.request.Request(url='http://forum.saransk.ru/', data=authData)

html = urllib.request.urlopen(req).read().decode('utf-8')
soup = bs4.BeautifulSoup(html)

signLink = soup.find('a', {'id': 'sign_in'})
if signLink:
    print(signLink.prettify())

