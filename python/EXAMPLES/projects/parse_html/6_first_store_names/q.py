import pprint
import requests
import lxml.html

import bs4


def get_catalog():
    html = '''
    <section class="catalog">
            <h1>Каталог</h1>

            <ul class="topnav" style="display: block;">
                    <li>
                            <a class="selected" href="catalog/iphone" data-category="32">iPhone</a>
                            
                            <ul class="topnav" style="display: none;">
                                    <li>
                                            <a href="catalog/iphone_5s" data-category="137">iPhone 5S</a>
                                    </li>
                                    
                                    <li>
                                            <a href="catalog/iphone-5s-vip" data-category="150">iPhone 5S VIP</a>
                                    </li>
                            </ul>
                    </li>

                    <li>
                            <a href="catalog/ipod" data-category="30">iPod</a>
                            
                            <ul class="topnav">
                                    <li>
                                            <a href="catalog/iPod_Nano" data-category="95">iPod Nano</a>
                                    </li>
                                    
                                    <li>
                                            <a href="catalog/iPod_Touch" data-category="94">iPod Touch</a>
                                    </li>
                                    
                                    <li>
                                            <a href="catalog/iPod_Shuffle" data-category="119">iPod Shuffle</a>
                                    </li>
                            </ul>
                    </li>
            </ul>
    </section>
    '''
    #print(html)
    doc = lxml.html.document_fromstring(html)
    catalogMenu = doc.xpath('//section[@class="catalog"]/ul')

    if catalogMenu:
        return catalogMenu
    else:
        print('Error find catalog')


def parse_catalog_categories(catalogMenuList):
    catalogCategories = {}
    href = catalogMenuList[0].xpath('li/a/@href')
    text = catalogMenuList[0].xpath('li/a/text()')

    hrefDict = {}
    for key, value in enumerate(href):
        hrefDict[key] = value.strip()
    #pprint.pprint(hrefDict)

    textDict = {}
    for key, value in enumerate(text):
        textDict[key] = value.strip()
    #pprint.pprint(textDict)

    for index in hrefDict.keys():
        catalogCategories[textDict[index]] = hrefDict[index]
    #pprint.pprint(catalogCategories)

    if not catalogCategories:
        print('Error. list is empty')
    else:
        return catalogCategories


if __name__ == "__main__":
    catalogMenuList = get_catalog()
    catalogCategories = parse_catalog_categories(catalogMenuList)
    pprint.pprint(catalogCategories)    

    
