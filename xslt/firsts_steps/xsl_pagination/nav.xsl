<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Настройка вывода -->
    <xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" indent="no" doctype-system="about:legacy-compat"/>
    
    <!-- Номер текущей страницы -->
    <xsl:param name="page" select="1"/>
    
    <!-- Основное преобразование -->
    <xsl:template match="/">
        <!-- Число элементов на странице -->
        <xsl:variable name="pageItems" select="5"/>
    
        <!-- Вычисляем текущую страницу  -->
        <xsl:variable name="pageCurrent">
            <xsl:choose>
                <!-- Если текущая страница меньше одного -->
                <xsl:when test="number($page) &lt; 1">
                    <xsl:text>1</xsl:text>
                </xsl:when>
                <!-- Если текущая страница больше общего количества -->
                <xsl:when test="number($page) > ceiling(count(/root/*) div $pageItems)">
                    <xsl:value-of select="ceiling(count(/root/*) div $pageItems)"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="number($page)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <html lang="ru">
            <head>
                <title><xsl:value-of select="concat('Страница № ',$pageCurrent)"/></title>
                <!-- Немного стилей для красоты -->
                <style>
                    #nav li{float:left;list-style:none;}
                    #nav a{text-decoration:none;padding:4px;color:#333}
                    #nav a.on, #nav a:hover{background:#bbb;}
                </style>
            </head>
            <body>
                <h1><xsl:value-of select="concat('Страница № ',$pageCurrent)"/></h1>
                <ul>
                    <xsl:for-each select="/root/*[position() > ($pageCurrent * $pageItems - $pageItems) and position() &lt;= ($pageCurrent * $pageItems)]">
                        <li><xsl:value-of select="@id"/></li>
                    </xsl:for-each>
                </ul>
                <hr/>
                <!-- Вызываем шаблон постраничной навигации -->
                <xsl:call-template name="pageNav">
                    <xsl:with-param name="items" select="/root/*"/>
                    <xsl:with-param name="pageCurrent" select="$page"/>
                    <xsl:with-param name="pageItems" select="$pageItems"/>
                    <xsl:with-param name="pageParty" select="4"/>
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>

    <!-- Шаблон создания постраничной навигации -->
    <xsl:template name="pageNav">
        <!-- Элементы -->
        <xsl:param name="items"/>
        <!-- Текущая страница -->
        <xsl:param name="pageCurrent"/>
        <!-- Число элементов на странице -->
        <xsl:param name="pageItems"/>
        <!-- Число ссылок назад и вперед -->
        <xsl:param name="pageParty"/>

        <!-- Всего страниц -->
        <xsl:variable name="count" select="ceiling(count($items) div $pageItems)"/>

        <ul id="nav">
            <!-- В начало и назад -->
            <xsl:if test="$pageCurrent > 1">
                <li><a href="?page=1">&lt;&lt;</a></li>
                <li><a href="?page={$pageCurrent - 1}">&lt;</a></li>
            </xsl:if>
            <!-- Центральные -->
            <xsl:for-each select="$items[(position() - 1) mod $pageItems = 0]">
                <xsl:if test="($pageCurrent - $pageParty) &lt;= position() and ($pageCurrent + $pageParty) >= position()">
                    <li><a href="?page={position()}">
                        <xsl:if test="$pageCurrent=position()">
                            <xsl:attribute name="class">on</xsl:attribute>
                        </xsl:if>
                        <xsl:value-of select="position()"/>
                    </a></li>
                </xsl:if>
            </xsl:for-each>
            <!-- Следующая и в конец -->
            <xsl:if test="$pageCurrent &lt; $count">
                <li><a href="?page={$pageCurrent + 1}">></a>	</li>
                <li><a href="?page={$count}">>></a></li>
            </xsl:if>
        </ul>
    </xsl:template>

</xsl:stylesheet>