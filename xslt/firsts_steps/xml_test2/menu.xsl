<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet [
  <!ENTITY mdash "&#8212;"> ]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" omit-xml-declaration="yes"/>

  <xsl:template match="/">
    <xsl:apply-templates select="PlayList"/>
  </xsl:template>

  <xsl:template match="PlayList">
    <ul>
      <xsl:apply-templates select="Track"/>
    </ul>
  </xsl:template>

  <xsl:template match="Track">
    <li>
      <a href="http://prostopleer.com/tracks/{@Id}">
        <xsl:value-of select="Artist"/>
        <xsl:text> &mdash; </xsl:text>
        <xsl:value-of select="Title"/>
      </a>
    </li>
  </xsl:template>
</xsl:stylesheet>