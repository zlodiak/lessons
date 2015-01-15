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
            return listCatalog
        else:
            print('Error find catalog')


def parse_ul(listUl, indent=''):                                        
    for elemUL in listUl:
        listLI = elemUL.xpath('li')
        if listLI:
            for elemLI in listLI:
                nameCat = elemLI.xpath('a/text()')[0].strip()
                print(indent, nameCat)

                newUL = elemLI.xpath('ul')
                if newUL:
                    parse_ul(newUL, indent='\t')               



def parse_ul2(listUl, indent=''):                                        
    for elemUL in listUl:
        listLI = elemUL.xpath('li')
        if listLI:
            parse_li2(listLI, indent='')


def parse_li2(listLI, indent=''):
    for elemLI in listLI:
        nameCat = elemLI.xpath('a/text()')[0].strip()
        print(indent, nameCat)

        newUL = elemLI.xpath('ul')
        if newUL:
            parse_ul(newUL, indent='\t')
            

if __name__ == "__main__":
    url = 'http://first-store.ru/'
    listCatalog = get_catalog(url)

    #indirect recursion(простая рекурсия)
    #parse_ul(listCatalog)

    #indirect recursion(косвенная рекурсия)
    parse_ul2(listCatalog)



