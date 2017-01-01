import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import 'isomorphic-fetch'
import getRoutes from '../app/routes'
import prefetch from 'noxt/server/prefetch'
import config from '../config'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const serverPath = `http://${config.host}:${config.port}/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

function renderPage (content) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Noxt.js</title>
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.main.css}" />` : ''}
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="${serverPath}build/vendor-react.js"></script>
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assetsManifest.main.js}"></script>`
          : `<script src="${wdsPath}main.js"></script>`
        }
      </body>
    </html>
  `
}

export default function (req, res) {
  const routes = getRoutes()
  match({
    location: req.originalUrl,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      prefetch(renderProps.components, renderProps.params)
        .then(() => {
          const content = renderToString(
            <RouterContext {...renderProps} />
          )
          const html = renderPage(content)
          res.status(200).send(html)
        })
        .catch(e => console.log(e))
    } else {
      res.status(404).send('Not found')
    }
  })
}
