import pprint
import requests
import lxml.etree
import lxml.html

import bs4


def get_catalog(url):
    try:
        req = requests.get(url)
    except Exception:
        print('Error open. ')
    else:
        html = req.text
        #print(html)
        doc = lxml.html.document_fromstring(html)
        catalogMenu = doc.xpath('//section[@class="catalog"]/ul')
        pprint.pprint(catalogMenu)

        if catalogMenu:
            return catalogMenu
        else:
            print('Error find catalog')


def parse_catalog_categories(catalogMenuList):
    catalogCategories = {}
    li = catalogMenuList[0].xpath('li/a/text()')
    for elem in li:
        catalogCategories[elem.strip()] = 'hr'

    if not catalogCategories:
        print('Error. list is empty')
    else:
        return catalogCategories

def parse_all_names(catalogMenuList):
    allNames = {}
    names = catalogMenuList.findAll('a')

    if not names:
        print('Error parse')
    else:
        for name in names:
            allNames[name.string.strip()] = name['href'].strip()
            
        #pprint.pprint(allNames)

        return allNames


def put_xml(names):
    root = lxml.etree.Element('catalog')
    for name, link in names.items():
        child = lxml.etree.Element('child')
        child.text = name
        root.append(child)
    
    xml = lxml.etree.tounicode(root, pretty_print=True)
    #print(xml)

    if not xml:
        print('Error tree build')
    else:
        return xml
        

def file_create(xml, fileName='catalog.xml'):
    try:
        with open(fileName, "w") as file:
            file.write(xml)
    except Exception:
        print('Error record', Exception)

    

if __name__ == "__main__":
    url = 'http://first-store.ru/'
    catalogMenuList = get_catalog(url)
    catalogCategories = parse_catalog_categories(catalogMenuList)
    pprint.pprint(catalogCategories)
    #names = parse_all_names(catalogMenuList)
    #xml = put_xml(names)
    #file_create(xml)
