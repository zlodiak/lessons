<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template name="head">
		<head>
			<title>портал</title>
			<link rel="stylesheet" href="css/styles.css" type="text/css" />
		</head>    
    </xsl:template>
	
    <xsl:template name="header">
		<div class="header">
			<img src="images/logo.jpg" alt="Логотип сайта" width="100%" height="50" />
			
			<div class="nav_top">
				<ul>
					<li>
						<a href="index.xml">поэты</a>
					</li>
					
					<li>
						<a href="index_2.xml">прозаики</a>
					</li>							
				</ul>
			</div>
		</div>		
    </xsl:template>	
	
    <xsl:template name="footer">
		<div class="footer">(c) Исаак Тынгылчав</div>
    </xsl:template>
</xsl:stylesheet>
