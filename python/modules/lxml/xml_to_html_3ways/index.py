import pprint
import lxml.etree

bodyTable = ''

tree = lxml.etree.parse('data\ebay.xml')
#tree = lxml.etree.parse('http://prozaik.16mb.com/ebay.xml')
#xml_data = """<data></data>"""  #without declaration!
#tree = lxml.etree.fromstring(xml_data)


items = tree.xpath('//item')
for item in items:
    link = item.get('href')
    title = item.xpath('title/text()')[0]
    timeLeft = item.xpath('time_left/text()')[0]
    price = item.xpath('price_rur/text()')[0]
    bodyTable = bodyTable + '<tr><td>' + title + '</td><td>' + price + '</td><td>' + timeLeft + '</td><td>' + link + '</td></tr>'

headerTable = '<table border="1"><thead><tr><th>Title</th><th>Price</th><th>Time left</th><th>Link</th></tr></thead><tbody>'
footerTable = '</tbody><tfoot><tr><td colspan="4">(c) 2013</td></tr></tfoot></table>'
table = headerTable + bodyTable + footerTable

template = '''
<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8" />
		
		<title>%s</title>	

		<!--<link rel="icon" href="img/favicon.ico" type="image/x-icon" />-->
		
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge" />-->	
		
		<link rel="stylesheet" href="css/style.css" />			

		<!--[if lt IE 9]>
			<script src="js/html5/html5.js"></script>
		<![endif]-->			
	</head>
	
	<body>		
            %s
	</body>
</html>
'''

page = template % ('E-bay', table)

print(page)



    
