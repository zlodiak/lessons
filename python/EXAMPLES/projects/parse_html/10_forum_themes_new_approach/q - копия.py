import lxml.etree

def record_xml_to_file(xml, fileName='qw.xml'):
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True, xml_declaration=True)
    print(xmlPretty)
    
    try:
        with open(fileName, "wb") as file:
            file.write(xmlPretty)
    except OSError as exc:
        print('Error record. ', exc)
    else:
        return True
        
h = lxml.etree.Element('html')
record_xml_to_file(h)


