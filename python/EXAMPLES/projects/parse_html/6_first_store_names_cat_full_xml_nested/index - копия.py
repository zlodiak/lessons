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


def parse_ul(listUl, level=0):
    for elemUL in listUl:
        listLI = elemUL.xpath('li')
        if listLI:
            for elemLI in listLI:
                nameCat = elemLI.xpath('a/text()')[0].strip()
                #print(u"%s%s" % (level * '\t', nameCat))
                hrefCat = elemLI.xpath('a/@href')[0]
                #print(indent, hrefCat)
                child = lxml.etree.Element('category', href=hrefCat)
                child.text = nameCat
                if level != 0:
                    parent.append(child)                
                newUL = elemLI.xpath('ul')
                if newUL:
                    parse_ul(newUL, level=level + 1)

    return parent


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
                    title = article.xpath('h1/a/text()')[0].strip()
                except Exception:
                    print('нет в наличии')
                else:
                    print(title)
                    newTitle = lxml.etree.Element('title')
                    newTitle.text = title
                    newItem.append(newTitle)                    
                    
                try:
                    price = article.cssselect('span.price')[0].text.strip()
                except Exception:
                    print('нет в наличии')
                else:
                    print(price)
                    newPrice = lxml.etree.Element('price')
                    newPrice.text = price
                    newItem.append(newPrice)                       

                try:
                    thumb = article.cssselect('a img')[0].get('src').strip()
                except Exception:
                    print('нет изображения')
                else:
                    print(thumb)
                    newThumb = lxml.etree.Element('thumb')
                    newThumb.text = thumb
                    newItem.append(newThumb)                       

                try:
                    href = article.cssselect('a.image_outer')[0].get('href').strip()
                except Exception:
                    print('нет ссылки')
                else:
                    print(link)
                    newLink = lxml.etree.Element('link')
                    newLink.text = link
                    newItem.append(newLink)                      

    return newXml
                    
    
            

if __name__ == "__main__":
    url = 'http://first-store.ru/'
    #url = 'https://dl.dropboxusercontent.com/u/78886431/testparse.html'
    doc = get_doc(url)
    listCatalog = doc.xpath('//section[@class="catalog"]/ul')
    if not listCatalog:
        print('Error find catalog__')
          
    parent = lxml.etree.Element('catalog')
    xml = parse_ul(listCatalog)
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
    #print(xmlPretty)

    xml = get_data(xml)
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
    print(xmlPretty)    


