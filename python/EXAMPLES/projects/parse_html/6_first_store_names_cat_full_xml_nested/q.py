import pprint
import requests
import lxml.etree
import lxml.html
import lxml.cssselect


def get_doc(url):
    try:
        req = requests.get(url)
    except Exception:
        print('Error open. __', Exception)
    else:
        html = req.text
        doc = lxml.html.document_fromstring(html)
        return doc
    

def get_data(xml):
    newXml = lxml.etree.Element('data')
    
    listHref = xml.xpath('category/@href')
    #print(listHref)
    for href in listHref:
        link = url + href
        print(link)
        doc = get_doc(url + href)
        listItem = doc.xpath('//div[@class="content"]/section[@class="block_products"]/div[@class="body"]/article//form')
        if not listItem:
            print('Error find catalog')
        else:
            for article in listItem:
                newItem = lxml.etree.Element('item')
                newXml.append(newItem)                                      

                try:
                    thumb = article.cssselect('a img')[0].get('src').strip()
                except Exception:
                    print('no image')
                else:
                    print(thumb)
                    newThumb = lxml.etree.Element('thumb')
                    newThumb.text = thumb
                    newItem.append(newThumb)                                           

    return newXml


def record_xml(xml, fileName):
    try:
        with open(fileName, "w") as file:
            file.write(xml)
    except Exception:
        print('Error record', Exception)
                    
    
url = 'http://first-store.ru/'
xml = lxml.etree.XML('''<catalog>
                     <category href="catalog/iphone_5s">iPhone 5S</category><category href="catalog/iphone-5s-vip">iPhone 5S VIP</category></catalog>''')

xml = get_data(xml)
xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
print(xmlPretty)

record_xml(xmlPretty, 'xml.xml')


