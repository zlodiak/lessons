<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version = '1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output 
		indent="yes" 
		doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" 
		method="html" 
		version="5" 
		encoding="utf-8" 
		omit-xml-declaration="yes"  
		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
	/>

	<xsl:template match="/doc">
        <html lang="ru">
            <head>
                <title>Прайс-лист2</title>
				
				<link rel="stylesheet" href="css/styles.css" media="all" />				
            </head>
			
            <body>
				<div class="wrap">
					<xsl:apply-templates select="price"/>
				</div>				
            </body>
        </html>		
	</xsl:template>
	
	<xsl:template match="/doc/price">
		<xsl:apply-templates select="item"/>
	</xsl:template>
	
	<xsl:template match="item">
		<article class="price_unit">
			<div class="price_img">
				<img src="{image}" alt="" width="180" height="200" />
			</div>
			
			<h1>
				<xsl:apply-templates select="header"/>
			</h1>			
			
			<ul class="price_desc">				
				<li class="per">
					<xsl:value-of select="percent" />
				</li>
				
				<li>
					<xsl:value-of  select="weight"/>
				</li>
				
				<li>
					<xsl:value-of  select="color"/>
				</li>
				
				<li>
					<xsl:value-of  select="price"/>
				</li>
				
				<li>
					<xsl:value-of  select="quantity"/>
				</li>
			</ul>
		</article>
	</xsl:template>
	

	

</xsl:stylesheet>