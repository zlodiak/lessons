import pprint
import requests
import lxml.html
import lxml.cssselect
import re
import my_utils
 

def get_pagination_type(doc_html, doc_obj):
    paginationType = 0
    
    paginationExist = doc_obj.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " pagination ")]')
    if len(paginationExist):
        print('_pexist')
        paginationMoreExist = paginationExist[0].xpath('ul[contains(concat(" ", normalize-space(@class), " "), " forward ")]/li[@class="last"]')
        print('_pmexist')
        if len(paginationMoreExist):
            paginationType = 'full_pagination'
        else:
            paginationType = 'little_pagination'
    else:
        paginationType = 'no_pagination'

    return paginationType
    

def get_pages_links_little_pagination(doc_html, url, doc_obj, first_page_url):
    #print('little')
    search_links_list = [first_page_url]

    pagination = doc_obj.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " pagination ")]')
    links = pagination[0].xpath('ul[@class="ipsList_inline left pages"]/li[@class="page"]/a')
                              
    for link in links:
        href = link.get('href')
        search_links_list.append(href)
    
    return search_links_list


def get_pages_links_full_pagination(doc_html, url, doc_obj, first_page_url):
    #print('full')
    search_links_list = [first_page_url]

    pagination = doc_obj.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " pagination ")]')
    links = pagination[0].xpath('ul[@class="ipsList_inline forward left"]/li[@class="last"]/a')
    last_link = links[0].get('href')
    search = re.search('(.*?st=)(\d+)', str(last_link))
    base_path = search.group(1)
    #print(base_path)
    last_page_index = search.group(2)
    last_page_index = int(last_page_index)
    #print(last_page_index)

    for index in range(25, last_page_index + 25, 25):
        index = str(index)
        link = base_path + index
        search_links_list.append(link)
    
    return search_links_list


def get_dict_data(search_links_list):
    data = {}
    data_dict = {}
    
    for url in search_links_list:
        req = my_utils.get_doc(url)
        html = req.text
        doc = lxml.html.document_fromstring(html)
        #print(html)
        table_tr = doc.xpath('//table[@id="forum_table"]/tr')
            
        for item in table_tr:
            td = item.xpath('td')
            if len(td):
                td = td[1]
                
            title = td.xpath('h4/a/text()')
            if len(title):
                title = title[0].strip()

            section = td.xpath('span[contains(concat(" ", normalize-space(@class), " "), " blend_links ")]/a/text()')
            if len(section):
                section = section[0].strip()
                
            date = td.xpath('span[contains(concat(" ", normalize-space(@class), " "), " toggle_notify_off ")]/node()')
            if len(date):
                date = date[4].replace(',', '').strip()
            
            #print(title, section, date)
            data[title] = [section, date]

        data_dict.update(data)

    return data_dict


def construct_xml(data_dict):
    itemsQuantity = 0
    parent = lxml.etree.Element('data')
    for key in data_dict:
        childItem = lxml.etree.Element('item')
        childMessage = lxml.etree.Element('message')
        childMessage.text = key       
        childSection = lxml.etree.Element('section')
        childSection.text = data_dict[key][0]
        childDate = lxml.etree.Element('date')
        childDate.text = data_dict[key][1]
        childItem.append(childMessage)
        childItem.append(childSection)
        childItem.append(childDate)
        parent.append(childItem)
        itemsQuantity =itemsQuantity + 1

    return parent, itemsQuantity


def record_xml_to_file(xml, fileName='xml.xml'):
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
    print(xmlPretty, 'quantity items: ', itemsQuantity)
    
    try:
        with open(fileName, "wt") as file:
            file.write(xmlPretty)
    except OSError as exc:
        print('Error record. ', exc)
    else:
        return True


if __name__ == "__main__":
    url = 'http://forum.saransk.ru/index.php?app=core&module=search&section=search&do=search&fromsearch=1'
    
    post = {
            'search_app':'forums',
            'search_term':'',
            'search_app':'forums',
            'search_content':'titles',
            'search_tags':'',
            'search_author':'SIMBIR',
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

    first_page_url = 'http://forum.saransk.ru/index.php?app=core&module=search&do=search&andor_type=&sid=fef8dd7aa3cc1759da2e28ea3100281d&search_author=' + post["search_author"] + '&search_app_filters[forums][sortKey]=date&search_content=' + post["search_content"] + '&search_app_filters[forums][sortDir]=0&search_app_filters[forums][pCount]=&search_app_filters[forums][pViews]=&search_app_filters[forums][noPreview]=1&search_app_filters[forums][sortKey]=date&search_term=&search_app=forums&st=0'
    
    #получаем главную страницу с результатами поиска
    req = my_utils.get_doc(url, post=post, headers=headers)
    doc_html = req.text
    #print(doc_html)v
    doc_obj = lxml.html.document_fromstring(doc_html)

    #получаем тип пагинации
    pagination_type = get_pagination_type(doc_html, doc_obj)
    #print(pagination_type)

    if pagination_type == 'no_pagination':
        search_links_list = [first_page_url]
    elif pagination_type == 'little_pagination':
        search_links_list = get_pages_links_little_pagination(doc_html=doc_html, url=url, doc_obj=doc_obj, first_page_url=first_page_url)
    elif pagination_type == 'full_pagination':
        search_links_list = get_pages_links_full_pagination(doc_html=doc_html, url=url, doc_obj=doc_obj, first_page_url=first_page_url)

    #pprint.pprint(search_links_list)

    #парсим данные
    data_dict = get_dict_data(search_links_list)
    #pprint.pprint(data_dict)

    #строим xml-дерево
    xml, itemsQuantity = construct_xml(data_dict)
    #print(itemsQuantity, ' items') 

    #записываем xml в файл
    if(record_xml_to_file(xml)):
        print('record ok')
    
    print('--------------------full end-------------------чся')
