import pprint
import requests
import lxml.etree
import lxml.html
import lxml.cssselect
import re

def get_doc(url):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'npii=bcguid/7c95fc6d1440a5688552de62fdfa50a754f5e43e^tguid/7c95f5fc1440a2a8c375c1b5fffd89eb54f5e43e^; JSESSIONID=9601E9A22203007B7915707CFECA841B; cssg=7c95f5fc1440a2a8c375c1b5fffd89eb; ns1=BAQAAAUR68LGzAAaAANgASVT39OVjNjl8NjAxXjEzOTM2NjAxMzM2NTVeXjFeM3wyfDV8NHw3XjFeMl40XjNeMTJeMTJeMl4xXjFeMF4xXjBeMV42NDQyNDU5MDc1CHmhyM47efUaKUn0Kc+0JoTQVx4*; s=CgAD4ACBTGBLlN2M5NWY1ZmMxNDQwYTJhOGMzNzVjMWI1ZmZmZDg5ZWIBSgAZUxgS5TUzMTZjMTY1LjAuMS4xMS4xNTguOS4wLjEA7gBRUxgS5TMGaHR0cDovL3d3dy5lYmF5LmNvbS9zY2gvaS5odG1sP19zYWNhdD0wJl9ua3c9ZHcrZHJ1bStzZXQmX2Zycz0xI2l0ZW00YWQxMzk3YjY4B9CKOB0*; nonsession=CgAAIABxTPk5lMTM5NDAwMDIyOXgxMjEyNzE2NjgxMDR4MHgyWQDLAAFTFshtMQDKACBcfMLlN2M5NWY1ZmMxNDQwYTJhOGMzNzVjMWI1ZmZmZDg5ZWIBTAAZVPf05TUzMTU3NzE4LjAuMS4xMC4xNTcuMy4wLjIoOgmd; lucky9=2820836; dp1=bu1p/QEBfX0BAX19AQA**54f7f4e5^bl/RU56d92865^pbf/%2346000c0000081000200000054f7f4e5^idm/15316d4d2^; ds2=ssts/1394000335749^; ebay=%5Edv%3D53119bec%5Esbf%3D%234000000000c0000100000%5Ecv%3D15555%5Ejs%3D1%5Epsi%3DA43JRAAE*%5E',
        'Host': 'www.ebay.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
    }
    
    try:
        req = requests.get(url, headers=headers)
    except Exception:
        print('Error open. __', Exception)
    else:
        html = req.text
        doc = lxml.html.document_fromstring(html)
        return doc, req

for url in ['http://www.ebay.com/itm/DW-PDP-Concept-Pearlescent-White-Maple-Drumset-/121271668104?pt=US_Drums&hash=item1c3c5acd88', 'http://www.ebay.com/itm/LOT-OF-20-DRUM-SET-TUNING-KEYS-DW-TAMA-PEARL-SABIAN-and-OTHER-UNIQUE-KEYS-/291092068092?pt=US_Drums&hash=item43c67076fc']:
    doc, req = get_doc(url)
    print('----------------------')
    pprint.pprint(req.headers)
    title = doc.xpath('//h1[@id="itemTitle"]/text()')
    print(title)
    

    try:
        reviewQuantity = doc.xpath('//div[@id="si-fbMini"]/text()')[0].strip()
    except Exception as e:
        print(e)
        reviewQuantity = 'None'

    print(reviewQuantity, end='\n\n')
