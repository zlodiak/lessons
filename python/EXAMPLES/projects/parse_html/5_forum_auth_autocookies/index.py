import pprint
import requests
import re
import shelve

import bs4


def authorization(authData, header, url, cookie):
    print('------------------------enter begin--------------------')
    
    result = False
    html = requests.get(url)
    rawCookie = html.headers['Set-Cookie']
    cookie = re.search(r"invbf_session_id=(.*?);", rawCookie).group(1)
    pprint.pprint(cookie)

    html = requests.get(url)
    soup = bs4.BeautifulSoup(html.text)
    loginForm = soup.find('form', {'id': 'login'})
    hiddenAuthKey = soup.find('input', {'name': 'auth_key'})['value']
    authData['auth_key'] = hiddenAuthKey

    print('\tlogin: ', authData['ips_username'])

    cookie = dict(invbf_session_id=cookie)

    req = requests.get(url, params=authData, cookies=cookie, headers=header)
    soup = bs4.BeautifulSoup(req.text)

    signLinkNotLogged = soup.find('a', {'id': 'sign_in'})
    if signLinkNotLogged:
        print('------------------------enter failed--------------------')
    else:
        print('------------------------enter successful--------------------')
        result = True

    return result



if __name__ == "__main__":
    url = 'http://forum.saransk.ru/'
    cookie = '6fbc6a128e5f4491a057edc4e98d6b7d'
    authData = {    
                'ips_username': 'sergey kalinin',
                'ips_password': 'ZEROCITY133',
                'rememberMe': 1,
                'referer': 	'http://forum.saransk.ru/'
    }
    header = {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding':'gzip,deflate,sdch',
        'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'Connection':'keep-alive',
        'Cookie':'invbf_emoticon_sidebar=1; invbf_mobileApp=false; invbf_mobileBrowser=0; invbf_coppa=0; invbf_toggleCats=%2C77%2C; invbf_blog_view_type=all; invbf_mqtids=%2C; invbf_sfc=1393265178; invbf_sfct=zx%2Bspectrum; invbf_member_id=2018; invbf_pass_hash=7cd80bef9e60de34ba7b128330755ff6; invbf_modtids=%2C; invbf_session_id=ec10df013b8d625fe6b8c56b8bc119d1; invbf_uagent_bypass=1; invbf_rteStatus=rte',
        'Host':'forum.saransk.ru',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
    }

    start = requests.get(url, headers=header)
    pprint.pprint(start.headers)

    input()

    if authorization(authData, header, url, cookie):
        print('auth ok')
    else:
        print('auth failed')


    print('-----------------full stop------------------')    
