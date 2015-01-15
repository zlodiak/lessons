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

	<xsl:template match="/price">
        <html lang="ru">
            <head>
                <title>Прайс-лист2</title>
            </head>
			
            <body>
				<div class="wrap">
					<xsl:apply-templates select="item"/>
				</div>				
            </body>
        </html>		
	</xsl:template>
	
	<xsl:template match="item">
		<article class="price_unit">
			<div class="price_img">
				<img src="{image}" alt="" width="100" height="40" />
			</div>
			
			<h1>
				<xsl:apply-templates select="header"/>
			</h1>			
			
			<ul class="price_desc">				
				<li>
					<xsl:text disable-output-escaping="yes"><![CDATA[Процентное содержание жира:]]></xsl:text>
					<xsl:value-of select="percent" />
				</li>
				
				<li>
					<xsl:text disable-output-escaping="yes"><![CDATA[Вес куска:]]></xsl:text>
					<xsl:value-of  select="weight"/>
				</li>
				
				<li>
					<xsl:text disable-output-escaping="yes"><![CDATA[Цвет:]]></xsl:text>
					<xsl:value-of  select="color"/>
				</li>
				
				<li>
					<xsl:text disable-output-escaping="yes"><![CDATA[цена:]]></xsl:text>
					<xsl:value-of  select="price"/>
				</li>
				
				<li>
					<xsl:text disable-output-escaping="yes"><![CDATA[Количество:]]></xsl:text>
					<xsl:value-of  select="quantity"/>
				</li>
			</ul>
		</article>
	</xsl:template>
	

	

</xsl:stylesheet>