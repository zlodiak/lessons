import urllib
import re
import os
import pprint

import requests
import bs4


def make_catalog():
    try: 
        os.mkdir('GRAB')
    except FileExistsError:
        print('FileExistsError')
    except PermissionError :
        print('PermissionError ')
    except Exception:
        print(Exception)                


def change_catalog():
    try: 
        os.chdir('GRAB')
    except PermissionError :
        print('PermissionError ')
    except Exception:
        print(Exception)
        

def download_image(path, name):
    img = urllib.request.urlopen(path).read()

    with open(name, "wb") as f:
        f.write(img)



beginIndex = 5794
endIndex = 5800
prefix = "http://www.inpic.ru"
rep_chars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '-' , ' ']
make_catalog()
change_catalog()

for i in range(beginIndex, endIndex):
    req = requests.get(prefix + '/image/' + str(i))
    if req.status_code == requests.codes.ok:
        #print(i, '\t', req.status_code, '\t', req, end='\n')
        soup = bs4.BeautifulSoup(req.content)
        #print(soup.prettify())
        name = soup.find("td", {"class": "post_title"}).contents[1].contents
        #author = soup.find("div", {"class": "date_author"}).contents[1].contents
        print('NAME: ', name[0])
        #print(author[0])

        #name[0] = re.sub('[\\\\/:*?"<>|-]', '_', name[0])
        for char in rep_chars:
            name[0] = name[0].replace(char, '_')

        print('newNAME: ', name[0])

        mainImagePath = soup.find("img", {"class": "image last"})["src"]
        mainImageExt = mainImagePath.split('.')[-1]
        manyImages = soup.findAll("img", {"class": "image"})

        print('MAINUMAGE: ', mainImagePath)
        print('MAINIMAGE EXT: ',mainImageExt)
        print('MANYIMAGE: \n')
        pprint.pprint(manyImages)

        if len(manyImages) > 1:
            print('CATALOG MAKE')
            try: 
                os.mkdir(name[0])
            #except FileExistsError:
                #print('FileExistsError')
            except PermissionError :
                print('PermissionError')
            except Exception:
                print(Exception)                

            os.chdir(name[0])
            #download_image(mainImagePath, str(name[0]) + '_0.' + mainImageExt)
            i = 0
            for name in manyImages:
                #print(prefix + name['src'], end='------------\n')
                print(str(name['src']))
                download_image(prefix + name['src'], str(name['src'][5:]))
                i = i + 1
            os.chdir('../')
            
        else:
            print('IMAGE MAKE')
            download_image(prefix + mainImagePath, str(name[0]) + '.' + mainImageExt)
            print('mainImagePath', mainImagePath)
            print('name', str(name[0]) + '.' + mainImageExt)

        print('==================================')


