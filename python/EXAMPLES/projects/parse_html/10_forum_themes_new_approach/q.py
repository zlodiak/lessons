import lxml.etree


def record_xml_to_file(xml, xml_declaration, fileName='qw.xml'):
    xmlPretty = lxml.etree.tounicode(xml, pretty_print=True)
    print(xmlPretty)
    
    try:
        with open(fileName, "w") as file:
            file.write('\n'.join([xml_declaration, lxml.etree.tostring(xml,encoding='unicode',),]))      
    except OSError as exc:
        print('Error record. ', exc)
    else:
        return True
        
        
xml_declaration = '<?xml version="1.0" encoding="utf-8"?>'        
xml = lxml.etree.Element('html')

record_xml_to_file(xml, xml_declaration)


