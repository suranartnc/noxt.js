import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { getDataFromTree } from 'react-apollo/server'
import reactCookie from 'react-cookie'
import 'isomorphic-fetch'
import getRoutes from 'shared/routes'
import config from 'shared/configs'
import createApolloClient from 'shared/utils/apollo/createApolloClient'
import createStore from 'shared/store/createStore'
import { MEMBER_LOAD_AUTH } from 'shared/actions/userActions'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const serverPath = `http://${config.host}:${config.port}/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

function renderPage(content, state) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="http://p3.isanook.com/sh/0/di/sanook-fav-icon.ico">
        <title>ข่าว ดูดวง เกมส์ ฟังเพลง หวย ช้อปปิ้ง : Sanook.com</title>
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.main.css}" />` : ''}
      </head>
      <body>
        <div id="root">${content}</div>

        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify({
            ...state,
            apollo: { data: state.apollo.data },
          })}
        </script>

        <script src="http://p3.isanook.com/sh/0/js/jquery-1.8.3.min.js"></script>
        <script src="http://p3.isanook.com/jo/0/wg/js/joox.widget.js?v=1.3"></script>

        <script src="${serverPath}build/vendor-react.js"></script>
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assetsManifest.main.js}"></script>`
          : `<script src="${wdsPath}main.js"></script>`
        }

        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async='async'></script>
        <script>
          var OneSignal = window.OneSignal || [];
          OneSignal.push(["init", {
            appId: "3baf29b1-8d2e-4663-81ce-664200b74dea",
            autoRegister: true, /* Set to true to automatically prompt visitors */
            subdomainName: 'sanooknext',   
            notifyButton: {
                enable: false /* Set to false to hide */
            }
          }]);
        </script>

      </body>
    </html>
  `
}

export default function (req, res) {
  reactCookie.plugToRequest(req, res)
  const client = createApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: `http://${config.host}:${config.port}/graphql`,
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
    }),
  })
  const store = createStore(client)
  store.dispatch({
    type: MEMBER_LOAD_AUTH,
  })
  const routes = getRoutes(store)
  match({
    location: req.originalUrl,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const component = (
        <ApolloProvider store={store} client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      getDataFromTree(component)
        .then((context) => {
          const content = renderToString(component)
          const html = renderPage(content, context.store.getState())
          res.status(200).send(html)
        })
        .catch(e => console.error('RENDERING ERROR:', e))
    } else {
      res.status(404).send('Not found')
    }
  })
}
