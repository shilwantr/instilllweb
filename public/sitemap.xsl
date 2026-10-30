<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>inStill — XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #1e293b;
            background-color: #fafbf9;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border: 2px solid #e2e8f0;
          }
          h1 {
            font-size: 28px;
            margin: 0 0 8px 0;
            color: #0f172a;
          }
          p.desc {
            font-size: 14px;
            color: #64748b;
            margin: 0 0 24px 0;
          }
          .badge {
            display: inline-block;
            background: #d2f56c;
            color: #0a4839;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #f1f5f9;
            color: #334155;
            text-align: left;
            padding: 12px 16px;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #0a4839;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">inStill Sitemap Protocol 0.9</div>
          <h1>XML Sitemap</h1>
          <p class="desc">This XML sitemap is indexed by search engines like Google, Bing, and AI search bots. Generated for <strong>https://instilll.in/</strong> and <strong>https://instilll.com/</strong>.</p>
          <table>
            <thead>
              <tr>
                <th style="width: 60%;">URL Location</th>
                <th style="width: 20%;">Change Frequency</th>
                <th style="width: 20%;">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
