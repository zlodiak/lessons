<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- ��������� ������ -->
    <xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" indent="no" doctype-system="about:legacy-compat"/>
    
    <!-- ����� ������� �������� -->
    <xsl:param name="page" select="1"/>
    
    <!-- �������� �������������� -->
    <xsl:template match="/">
        <!-- ����� ��������� �� �������� -->
        <xsl:variable name="pageItems" select="5"/>
    
        <!-- ��������� ������� ��������  -->
        <xsl:variable name="pageCurrent">
            <xsl:choose>
                <!-- ���� ������� �������� ������ ������ -->
                <xsl:when test="number($page) < 1">
                    <xsl:text>1</xsl:text>
                </xsl:when>
                <!-- ���� ������� �������� ������ ������ ���������� -->
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
                <title><xsl:value-of select="concat('�������� � ',$pageCurrent)"/></title>
                <!-- ������� ������ ��� ������� -->
                <style>
                    #nav li{float:left;list-style:none;}
                    #nav a{text-decoration:none;padding:4px;color:#333}
                    #nav a.on, #nav a:hover{background:#bbb;}
                </style>
            </head>
            <body>
                <h1><xsl:value-of select="concat('�������� � ',$pageCurrent)"/></h1>
                <ul>
                    <xsl:for-each select="/root/*[position() > ($pageCurrent * $pageItems - $pageItems) and position() <= ($pageCurrent * $pageItems)]">
                        <li><xsl:value-of select="@id"/></li>
                    </xsl:for-each>
                </ul>
                <hr/>
                <!-- �������� ������ ������������ ��������� -->
                <xsl:call-template name="pageNav">
                    <xsl:with-param name="items" select="/root/*"/>
                    <xsl:with-param name="pageCurrent" select="$page"/>
                    <xsl:with-param name="pageItems" select="$pageItems"/>
                    <xsl:with-param name="pageParty" select="4"/>
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>

    <!-- ������ �������� ������������ ��������� -->
    <xsl:template name="pageNav">
        <!-- �������� -->
        <xsl:param name="items"/>
        <!-- ������� �������� -->
        <xsl:param name="pageCurrent"/>
        <!-- ����� ��������� �� �������� -->
        <xsl:param name="pageItems"/>
        <!-- ����� ������ ����� � ������ -->
        <xsl:param name="pageParty"/>

        <!-- ����� ������� -->
        <xsl:variable name="count" select="ceiling(count($items) div $pageItems)"/>

        <ul id="nav">
            <!-- � ������ � ����� -->
            <xsl:if test="$pageCurrent > 1">
                <li><a href="?page=1"><<</a></li>
                <li><a href="?page={$pageCurrent - 1}"><</a></li>
            </xsl:if>
            <!-- ����������� -->
            <xsl:for-each select="$items[(position() - 1) mod $pageItems = 0]">
                <xsl:if test="($pageCurrent - $pageParty) <= position() and ($pageCurrent + $pageParty) >= position()">
                    <li><a href="?page={position()}">
                        <xsl:if test="$pageCurrent=position()">
                            <xsl:attribute name="class">on</xsl:attribute>
                        </xsl:if>
                        <xsl:value-of select="position()"/>
                    </a></li>
                </xsl:if>
            </xsl:for-each>
            <!-- ��������� � � ����� -->
            <xsl:if test="$pageCurrent < $count">
                <li><a href="?page={$pageCurrent + 1}">></a>	</li>
                <li><a href="?page={$count}">>></a></li>
            </xsl:if>
        </ul>
    </xsl:template>

</xsl:stylesheet>