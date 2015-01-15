import csv
import pprint
import re
import lxml.html
import lxml.etree

result = []
with open('out.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row[0])
        result.append(row[0])
        
        
pprint.pprint(result)

print('\n\n')

for r in result:
	d = r.split(';')
	for x in d:
		print(x)
	
	
print('\n\n')

		
		
parent = lxml.etree.Element('data')		
for r in result:
	item_child = lxml.etree.Element('item')
	d = r.split(';')
	for x in d:
		if x:
			value_child = lxml.etree.Element('value')
			value_child.text = x
			item_child.append(value_child)
		
	parent.append(item_child)
	
	
xmlPretty = lxml.etree.tounicode(parent, pretty_print=True)
print(xmlPretty)	
	


