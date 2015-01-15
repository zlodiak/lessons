import urllib
import re
import os
import pprint
import shelve
import time

import requests
import bs4



'''
def search_vk(stringHtml):
    stringPattern = 'url\suid"\shref="http://vkontakte.ru/id10550933"'
    address = re.search(r"url\s+uid'.+?href='(http://vkontakte.ru/id10550933)'", stringHtml)
    if address:
        address = address.group(1)
    else:
        address = 'no result'
    return address

'''
def search_vk(stringHtml):
    soup = bs4.BeautifulSoup(stringHtml)
    #print(soup.prettify())
    elemVK = soup.find('a', {'class': 'url uid'})
    if elemVK:
        address = str(elemVK.contents[0])
    else:
        address = 'no result'
        
    return address        


def nowTime():
    return str(time.time())


def recorder(nowTime, address):
    print('rrr')
    try:
        db = shelve.open(userName)
    except OSError:
        print('OSError')
    except Exception:
        print(Exception)
    else:
        db[nowTime] = address
    finally:
        db.close()

    return


def checkRecord(userName, address):
    try:
        db = shelve.open(userName)
    except OSError:
        print('OSError')
    except Exception:
        print(Exception)
    else:        
        for key in db:
            print('date: ', key, '\t path: ', db[key], '\n')
    finally:
        db.close()

    return



    

url = 'http://forum.saransk.ru/user/2018-sergey-kalinin/'
userName = url.split('/')[-2]
userName = userName.replace('-', '_')
print(userName)
stringHtml = urllib.request.urlopen(url).read().decode('utf-8')

address = search_vk(stringHtml)
print(address)


while True:
    nowTime_ = nowTime()
    print(nowTime_)    
    time.sleep(1)
    recorder(nowTime_, address)


