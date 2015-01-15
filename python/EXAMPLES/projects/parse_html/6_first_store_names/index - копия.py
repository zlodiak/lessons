import pprint
import requests
import lxml.etree
import lxml.html

def get_catalog(url):
    try:
        req = requests.get(url)
    except Exception:
        print('Error open. ')
    else:
        html = req.text
        doc = lxml.html.document_fromstring(html)
        listCatalog = doc.xpath('//section[@class="catalog"]/ul')

        if listCatalog:
            return listCatalog[0]
        else:
            print('Error find catalog')


def parse_catalog_categories(catalogMenuList):
    listA = catalogMenuList.xpath('li/a')

    dictCategories = {}
    for elem in listA:
        href = elem.xpath('@href')[0]
        text = elem.xpath('text()')[0].strip()
        dictCategories[text] = href

    if not dictCategories:
        print('Error. dictonary is empty')
    else:
        return dictCategories

def parse_catalog_goods(catalogMenuList):
    listA = catalogMenuList.xpath('li/ul/li/a') #???????????????????????????????
    print(listA[0])
    
    dictGoods = {}
    for elem in listA:
        href = elem.xpath('@href')[0]
        text = elem.xpath('text()')[0].strip()
        dictGoods[text] = href
        
    if not dictGoods:
        print('Error. dictonary is empty')
    else:
        return dictGoods    


def put_xml(dictCategories, parentTag, childTag):
    parent = lxml.etree.Element(parentTag)
    for name, link in dictCategories.items():
        child = lxml.etree.Element(childTag, href=link)
        child.text = name
        parent.append(child)
    
    xml = lxml.etree.tounicode(parent, pretty_print=True)

    if not xml:
        print('Error xml tree build')
    else:
        return xml
        

def record_xml(xml, fileName):
    try:
        with open(fileName, "w") as file:
            file.write(xml)
    except Exception:
        print('Error record', Exception)


if __name__ == "__main__":
    url = 'http://first-store.ru/'
    listCatalog = get_catalog(url)
    
    dictCategories = parse_catalog_categories(listCatalog)
    pprint.pprint(dictCategories)
    xmlCategories = put_xml(dictCategories, 'categories', 'category')
    print(xmlCategories)
    record_xml(xmlCategories, 'categories.xml')

    dictGoods = parse_catalog_goods(listCatalog)
    pprint.pprint(dictGoods)
    xmlGoods = put_xml(dictGoods, 'goods', 'item')
    print(xmlGoods)
    record_xml(xmlGoods, 'goods.xml')


