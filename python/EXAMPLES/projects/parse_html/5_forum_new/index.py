import pprint
import requests
import re
import shelve

import bs4
import quantity


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

def scanning_posts(topicList, url):
        print('------------------------scanning posts begin--------------------')

        topicLastUrl = {}
        
        for topic in topicList:
            url = topic
            html = requests.get(url)
            soup = bs4.BeautifulSoup(html.text)
            el = soup.find('div', {'class': 'pagination'})
            if not el:
                href = url
            else:
                ul1 = el.findAll('ul')[1]
                ul2 = el.findAll('ul')[2]
                liLast = ul2.find('li', {'class': 'last'})
                if liLast:
                    href = liLast.find('a')['href']
                else:
                    href = ul1.findAll('li')[-1]
                    href = href.find('a')['href']
            topicLastUrl[str(topic)] = str(href)
                
        pprint.pprint(topicLastUrl)

        topicLastNum = {}
        flagNew = False

        try:
            data = shelve.open('data')
        except Exception:
            print(Exception)
        else:
            for key, value in topicLastUrl.items():
                html = requests.get(value)
                soup = bs4.BeautifulSoup(html.text)
                num = soup.findAll('a', {'itemprop': 'replyToUrl'})
                #print(num)
                num = str(num[-1])
                topicLastNum[key] = re.search('#(\d+)\s', num)
                topicLastNum[key] = topicLastNum[key].group(1)
                #print('key__', key)

                if key in data:
                    if data[key] != topicLastNum[key]:
                        print('\n\tNEW POSTS in ', key)
                        flagNew = True;
                        data[key] = topicLastNum[key]
                else:
                    data[key] = topicLastNum[key]
        finally:
            data.close()

        print('-----------------scanning posts end------------------')

        if not flagNew:
            print('\tNO NEW POSTS')
        else:
            print('\tNEW POSTS DETECTED')
            
    
def scanning_mail(url):
    print('-----------------scanning mail end------------------')
    url = url + 'index.php?app=members&module=messaging&section=view&do=showFolder&folderID=myconvo'
    html = requests.get(url)
    print(html.text)
    #soup = bs4.BeautifulSoup(html.text)
    #table = soup.find('table', {'id': 'message_table'})
    #print(table)
    #unreadMessages = table.findAll('tr', {'class': 'unread'})
    #unreadMessagesLen = len(unreadMessages)
    #print(unreadMessagesLen)
    print('-----------------scanning mail end------------------')
    '''
    if unreadMessagesLen > 0:
        print('\tNEW MAIL MESSAGES: ', num.contents)
    else:
        print('\tNO NEW MAIL')
    '''

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
    topicList = [
                #'http://forum.saransk.ru/topic/60480-padonkovskie-kartinki/',
                'http://forum.saransk.ru/topic/4112-zx-spectrum-spektrumovskie-igrushki/',
                'http://forum.saransk.ru/topic/70004-poisk-gruppy-ili-muzykanta-dlia-gruppy/',
                'http://forum.saransk.ru/topic/108267-pokupka-prodazha-muzykalnykh-instrumentov/',
                'http://forum.saransk.ru/topic/194378-avtorizatciia-na-fsru/',
                'http://forum.saransk.ru/topic/193635-nasledovanie-pri-sozdanii-gui-v-python/',
                'http://forum.saransk.ru/topic/194165-lokalnyi-server-s-podderzhkoi-python/',
                'http://forum.saransk.ru/topic/186866-saity-za-butery/',
                'http://forum.saransk.ru/topic/194312-html-verstalschik-v-bytex/',
                'http://forum.saransk.ru/topic/189111-ischu-rabotu-web-razrabotka/'#,
                #'http://forum.saransk.ru/topic/191832-shest-prichin-ne-zhenitsia-na-razvedenke-s-rebenk/',
                #'http://forum.saransk.ru/topic/191874-ukraina-novyi-maidan/'                
    ]


    if authorization(authData, header, url, cookie):
        pass





    '''
    if authorization(authData, header, url, cookie):
        scanning_mail(url)

    
    if authorization(authData, header, url, cookie):
        scanning_posts(topicList, url)
        scanning_mail(url)
    '''

    print('-----------------full stop------------------')    
