import urllib
import pprint
import re

import requests
import bs4


def get_people_info(friendInfo):
    peopleDictonary = {}
    
    for key, value in friendInfo.items():
        friendHtml = urllib.request.urlopen(value[0]).read().decode('utf-8')
        peopleInfo = get_friend_info(friendHtml)
        peopleDictonary.update(peopleInfo)

    return peopleDictonary
        

def get_friend_info(html):
    soup = bs4.BeautifulSoup(html)
    friendsDiv = soup.find('div', {'id': 'friends_overview'})
    friend = friendsDiv.findAll('a', {'class': 'ipsUserPhotoLink'})
    
    friendsDictonary = {}
    
    for el in friend:
        friendLink = el['href']
        friendIcon = el.find('img')['src']
        friendName = el.find('img')['data-tooltip']
        
        friendsDictonary[friendName] = (friendLink, friendIcon)

    return friendsDictonary


    
url = 'http://forum.saransk.ru/user/20892-ujdyj/'
userName = url.split('/')[-2]
userName = userName.replace('-', '_')
userNameH = re.search('(\d+?)_.*', userName)
userNameH = userNameH.group(1)
html = urllib.request.urlopen(url).read().decode('utf-8')

friendInfo = get_friend_info(html)
print('========quantity friends of ', userNameH, ': ', len(friendInfo))
pprint.pprint(friendInfo)

peopleInfo = get_people_info(friendInfo)
print('\n\n\n========quantity available peoples of ', userNameH, ': ', len(peopleInfo))
pprint.pprint(peopleInfo)




