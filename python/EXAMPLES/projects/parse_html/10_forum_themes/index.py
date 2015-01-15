import pprint
import requests
import lxml.html
import lxml.cssselect
import re


def get_doc(url, post='', headers=''):
    try:
        req = requests.post(url, params=post, headers=headers)
    except Exception as exc:
        print('Error open url.', exc)
    else:
        return req


def get_list_search_pages(url, docObj):
    results_failed = docObj.xpath('//p[@class="no_messages"]/text()')
    if results_failed:
        listPages = False
    else:
        listPages = []
        listPages.append(url)

        paginationExist = docObj.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " pagination ")]')
        print(paginationExist)

        if len(paginationExist):
            secondPage = paginationExist[0].xpath('ul/li[@class="page"]/a')
            for lnk in secondPage:
                listPages.append(lnk.get('href'))
                secondPageHref = lnk.get('href')
                #print(lnk.get('href'), '=========\n\n')

            pprint.pprint(listPages)
            print(len(listPages))

            paginationMoreExist = paginationExist[0].xpath('ul[contains(concat(" ", normalize-space(@class), " "), " forward ")]')

            if len(paginationMoreExist):
                baseLink = secondPageHref[0:-2]
                lastLink = paginationMoreExist[0].xpath('li[@class="last"]/a/@href')
                if lastLink:
                    #print('yyyyyy', lastLink, 'yyyyyyyyyyyyy')
                    search = re.search('.*?st=(\d+)', str(lastLink))
                    lastIndex = search.group(1)                            
                    #print('-0-0-0-0-0', lastIndex, '-0-0-0-0-0')

                i = 0
                
                while True:
                    link = baseLink + str(i)
                    req = get_doc(link)
                    listPages.append(link)
                    print(req, i, lastIndex, '\n\n')
                    if i > int(lastIndex):
                        print('stop')
                        break
                    i = i + 25

    return listPages


def get_data(listPages):
    data = {}
    dataAll = {}
    
    for url in listPages:
        req = get_doc(url)
        html = req.text
        doc = lxml.html.document_fromstring(html)
        #print(html)
        table = doc.xpath('//table[@id="forum_table"]/tr')
        for item in table:
            title= item.xpath('td/h4/a/text()')[0].strip()
            section = item.xpath('//span[contains(concat(" ", normalize-space(@class), " "), " blend_links ")]/a/text()')[0].strip()
            date = item.xpath('//span[contains(concat(" ", normalize-space(@class), " "), " toggle_notify_off ")]/node()')[4].replace(',', '').strip()
            #print(title, section, date)
            data[title] = [section, date]

        dataAll.update(data)

    if dataAll:
        return dataAll


def construct_xml(dataAll):
    itemsQuantity = 0
    parent = lxml.etree.Element('data')
    for key in dataAll:
        childItem = lxml.etree.Element('item')
        childMessage = lxml.etree.Element('message')
        childMessage.text = key       
        childSection = lxml.etree.Element('section')
        childSection.text = dataAll[key][0]
        childDate = lxml.etree.Element('date')
        childDate.text = dataAll[key][1]
        childItem.append(childMessage)
        childItem.append(childSection)
        childItem.append(childDate)
        parent.append(childItem)
        itemsQuantity =itemsQuantity + 1

    return parent, itemsQuantity


def record_xml(xml, fileName='xml.xml'):
    try:
        with open(fileName, "w") as file:
            file.write(xml)
    except Exception:
        print('Error record', Exception)
    else:
        print('record ok')
        return True
        

if __name__ == "__main__":
    url = 'http://forum.saransk.ru/index.php?app=core&module=search&section=search&do=search&fromsearch=1'
    post = {
            'search_app':'forums',
            'search_term':'',
            'search_app':'forums',
            'search_content':'titles',
            'search_tags':'',
            'search_author':'sergey kalinin',
            'search_date_start':'',
            'search_date_end':'',
            'search_app_filters[core][sortKey]':'date',
            'search_app_filters[core][sortDir]':'0',
            'search_app_filters[members][searchInKey]':'members',
            'search_app_filters[members][members][sortKey]':'date',
            'search_app_filters[members][members][sortDir]':'0',
            'search_app_filters[members][comments][sortKey]':'date',
            'search_app_filters[members][comments][sortDir]':'0',
            'search_app_filters[forums][noPreview]':'1',
            'search_app_filters[forums][pCount]':'',
            'search_app_filters[forums][pViews]':'',
            'search_app_filters[forums][sortKey]':'date',
            'search_app_filters[forums][sortDir]':'0',
            'search_app_filters[calendar][sortKey]':'date',
            'search_app_filters[calendar][sortDir]':'0',
            'search_app_filters[blog][searchInKey]':'entries',
            'search_app_filters[blog][entries][sortKey]':'date',
            'search_app_filters[blog][entries][sortDir]':'0',
            'search_app_filters[blog][comments][sortKey]':'date',
            'search_app_filters[blog][comments][sortDir]':'0',
            'search_app_filters[gallery][searchInKey]':'images',
            'search_app_filters[gallery][images][sortKey]':'date',
            'search_app_filters[gallery][images][sortDir]':'0',
            'search_app_filters[gallery][comments][sortKey]':'date',
            'search_app_filters[gallery][comments][sortDir]':'0',
            'search_app_filters[gallery][albums][sortKey]':'date',
            'search_app_filters[gallery][albums][sortDir]':'0',
            'submit':'Найти'
    }

    headers = {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding':'gzip,deflate,sdch',
                'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
                'Cache-Control':'max-age=0',
                'Connection':'keep-alive',
                'Content-Length':'1623',
                'Content-Type':'application/x-www-form-urlencoded',
                'Cookie':'invbf_emoticon_sidebar=1; invbf_mobileApp=false; invbf_mobileBrowser=0; invbf_coppa=0; invbf_toggleCats=%2C77%2C; invbf_blog_view_type=all; invbf_mqtids=%2C; invbf_member_id=2018; invbf_pass_hash=7cd80bef9e60de34ba7b128330755ff6; invbf_sfc=1394124264; invbf_modtids=%2C; invbf_session_id=84cef0d43096c955fe8a612ea095cf59; invbf_uagent_bypass=1; invbf_rteStatus=rte',
                'Host':'forum.saransk.ru',
                'Origin:http':'//forum.saransk.ru',
                'Referer:http':'//forum.saransk.ru/index.php?app=core&module=search&search_in=forums',
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
    }
    
    #получаем главную страницу с результатами поиска
    req = get_doc(url, post=post, headers=headers)
    docHtml = req.text
    #print(docHtml)
    docObj = lxml.html.document_fromstring(docHtml)    

    #получаем все страницы с результатами поиска
    listPages = get_list_search_pages(url, docObj)
    if not listPages:
        print('no results')
    else:
        print('-----------------')
        pprint.pprint(listPages)

        #вытаскиваем информацию с каждой страницы
        dataAll = get_data(listPages)
        #pprint.pprint(dataAll)

        #строим xml-дерево
        xml, itemsQuantity = construct_xml(dataAll)
        xmlPretty = lxml.etree.tounicode(xml, pretty_print=True, xml_declaration=True)
        print(xmlPretty, 'quantity items: ', itemsQuantity)

        #запись xml в текстовый файл
        record_xml(xmlPretty)
    
    print('full end')


    #Tetraider titles
    #SIMBIR both
    #sergey kalinin titles
