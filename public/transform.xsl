<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>:)</title>
    <style>
      html,body {
        height: 100%;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }

      button * {
        pointer-events: none;
      }
    </style>
    <link href="/styles/system.css" rel="stylesheet"/>
    <script async="true" src="https://ga.jspm.io/npm:es-module-shims@1.8.2/dist/es-module-shims.js"></script>
    <script>
      document.title = window.location.pathname
      const parameters = new URLSearchParams(window.location.search)
      const world = parameters.get('world')
      window.plan98 = {
        parameters,
        provider: 'pro.thelanding.page',
        host: world ? world : window.location.host,
      }

      document.write(`<link href="/cdn/${window.plan98.host}/default.css" rel="stylesheet"/>`)
    </script>
    <script type="importmap">
      {
        "imports": {
          "@sillonious/computer": "/sillyz.computer.js",
          "@sillonious/module": "/module.js",
          "@sillonious/party": "/modules/sillonious-party.js",
          "aframe": "https://esm.sh/aframe@1.5.0",
          "babylonjs": "https://esm.sh/babylonjs@6.33.1",
          "codemirror": "https://esm.sh/codemirror@6.0.1",
          "colorjs.io": "https://esm.sh/colorjs.io@0.4.0",
          "diffhtml": "https://esm.sh/diffhtml@1.0.0-beta.30",
          "focus-trap" : "https://esm.sh/focus-trap",
          "gun": "https://esm.sh/gun@0.2020.1239",
          "havok": "https://esm.sh/@babylonjs/havok@1.3.0",
          "quill" : "https://esm.sh/quill@1.3.7",
          "react": "https://esm.sh/react@18.2.0",
          "react-dom": "https://esm.sh/react-dom@18.2.0",
          "statebus": "/_statebus.js",
          "tone@next": "https://esm.sh/tone@next"
        }
      }
    </script>
  </head>
  <body>
		<xsl:for-each select="rss/channel">
			<a href="https://wherespodcast.org">
				Back to wherespodcast.org
			</a>
			<h1>
				<xsl:value-of select="title"/>
			</h1>
			<p>
				<xsl:value-of select="description"/>
			</p>
			<xsl:for-each select="item">
				<xsl:variable name="slug" select="slug"/>
				<xsl:variable name="src" select="guid"/>
				<xsl:variable name="link" select="link"/>

				<a name="{$slug}"></a>
				<h2>
					<a href="{$link}">
						<xsl:value-of select="title"/>
					</a>
				</h2>

				<time><xsl:value-of select="pubDate"/></time>
				<xsl:value-of select="description" disable-output-escaping="yes"/>
				<audio src="{$src}" preload="auto" controls="controls" type="audio/mp3">
					Your browser doesn't support the <code>audio</code> element.
				</audio>
			</xsl:for-each>
		</xsl:for-each>
    <script type="module">
      import Computer from '@sillonious/computer'
      const sillyz = new Computer(window.plan98, { path: '/modules' })
    </script>
  </body>
</html>
</xsl:template>
</xsl:stylesheet>