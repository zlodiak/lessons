<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output 
		indent="yes" 
		doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" 
		method="html" 
		version="5" 
		encoding="utf-8" 
		omit-xml-declaration="yes"  
		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
	/>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>Поэтический портал</title>
				<link rel="stylesheet" href="css/styles.css" type="text/css" />
			</head>
				  
			<body>
				<div class="header"><img src="images/logo.jpg" alt="Логотип сайта" width="100%" height="50" /></div>
				
				<div class="content">
					<table>
						<xsl:for-each select="//author">
							<tr>
								<td><xsl:value-of select="born"/></td>
								<td><a href="author/{@id}"><xsl:value-of select="fio/f"/></a></td>
							</tr>
						</xsl:for-each>   
					</table>
				</div>
				
				<div class="footer">(c) Исаак Тынгылчав</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>