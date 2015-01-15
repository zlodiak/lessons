<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"/>

    <xsl:param name="nameGroup" select="'country'" />

    <xsl:key name="country_val" match="/bodyData/planshets/item" use="country"/>

    <xsl:template match="/bodyData/planshets">
        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="item">
        <xsl:if test="not(country=preceding-sibling::item/country)" >

         <table width="95%">
                <tr>
                    <td>
                        <a href="javascript:void(0)" style="text-decoration:none;" class="title">

                            <xsl:value-of select="country"/>

                        </a>
                    </td>
                </tr>
            </table>
            <div class="profile-block-shown">

                    <xsl:apply-templates mode="second" select="key('country_val',country)" />

            </div>

      </xsl:if>
    </xsl:template>

    <xsl:template match="item" mode="second">

        <div align="center">

         <xsl:value-of select="$name_val"/>

        </div>
    </xsl:template>
</xsl:stylesheet>