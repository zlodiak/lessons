import pprint
import requests
import lxml.etree
import lxml.html
import lxml.cssselect
import re


def get_doc(url):
    try:
        req = requests.get(url)
    except Exception:
        print('Error open. __', Exception)
    else:
        html = req.text
        doc = lxml.html.document_fromstring(html)
        return doc
                    

def record_xml(xml, fileName='xml.xml'):
    try:
        with open(fileName, "w") as file:
            file.write(xml)
    except Exception:
        print('Error record', Exception)
    else:
        print('record ok')


def get_list_pages(doc):
    listPages = []
    #listPages = doc.xpath('//table//td[@class="pages"]/a')
    listLinks = doc.cssselect('table.pagn td.pages a')
    for elem in listLinks:
        href = elem.get('href')
        listPages.append(href)

    if not listPages:
        print('Error forming list pages')
    else:
        return listPages

def get_list_goods(listPages):
    listGoodsLinks = []
    i = 0
    for path in listPages:
        doc = get_doc(path)
        listGoods = doc.xpath('//div[@id="ResultSetItems"]/table//h3/a')
        i = i + 1
        if i > 1: break
        for elem in listGoods:
            href = elem.get('href')
            listGoodsLinks.append(href) 

    if not listGoodsLinks:
        print('Error forming list goods')
    else:
        return listGoodsLinks


def get_info(listGoodsLinks):
    i = 0
    result = {}
    for url in listGoodsLinks:
        doc = get_doc(url)
        
        try:
            title = doc.xpath('//h1[@id="itemTitle"]/text()')[0].strip()
        except Exception:
            title = 'None'

        try:
            priceUSD = [t.replace('\xa0', ' ') for t in doc.xpath('//span[@itemprop="price"]/text()')] or [t.replace('\xa0', ' ') for t in doc.xpath('//span[@id="mm-saleDscPrc"]/text()')]
            priceUSD = priceUSD[0]
            #search = re.search('([\d, ]+)$', priceUSD)
            #priceUSD = search.group(1)
            priceUSD = priceUSD.replace('US $', '')
        except Exception:
            priceUSD = 'None'

        try:
            priceRUR = [t.replace('\xa0', ' ') for t in doc.xpath('//div[@id="prcIsumConv"]/span/text()')]
            priceRUR = priceRUR[0]
            priceRUR = priceRUR.replace(u' руб', '')
        except Exception:
            priceRUR = 'None'            
            
        try:
            condition = doc.xpath('//div[@id="vi-itm-cond"]/text()')[0].strip()
        except Exception:
            condition = 'None'
            
        try:
            timeLeft = doc.xpath('//span[@id="vi-cdown_timeLeft"]/text()')[0].strip()
        except Exception:
            timeLeft = 'None'

        try:
            sellerName = doc.xpath('//span[@class="mbg-nw"]/text()')[0].strip()
        except Exception:
            sellerName = 'None'

        try:
            salesQuantity = doc.xpath('//span[@class="mbg-l"]/a/text()')[0].strip()
        except Exception:
            salesQuantity = 'None'

        print(title, priceUSD, priceRUR, condition, timeLeft, url, sellerName, salesQuantity, end='\n\n')

        info = {
                    'title': title,
                    'price_usd': priceUSD,
                    'price_rur': priceRUR,
                    'condition': condition,
                    'time_left': timeLeft,
                    'seller_name': sellerName,
                    'sales_quantity': salesQuantity
        }

        result[url] = info
        i = i + 1
        if i > 2: break

    return result


def make_elements(info):
    parent = lxml.etree.Element('data')
    for url in sorted(info):
        child = lxml.etree.Element('item', href=url)
        for key, value in info[url].items():
            child2 = lxml.etree.Element(key)
            child2.text = value
            child.append(child2)
        parent.append(child)

    return parent
     

if __name__ == "__main__":
    url = 'http://ebay.com/'
    query = 'http://www.ebay.com/sch/i.html?_sacat=0&_nkw=dw+drum+set&_frs=1'
    doc = get_doc(query)

    #получаем набор линков страниц с товарами
    listPages = get_list_pages(doc)    
    pprint.pprint(listPages)

    #получаем набор линков на страницы конкретного товара
    listGoodsLinks = get_list_goods(listPages)
    pprint.pprint(listGoodsLinks)

    #получаем набор данных для 
    info = get_info(listGoodsLinks)

    #строим xml-дерево
    xml = make_elements(info)
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
    print(xmlPretty)    
    
    #запись xml в текстовый файл
    record_xml(xmlPretty, 'ebay.xml')


