import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from './react-auth0-spa'
import config from './auth_config.json'
import history from './utils/history'
import store from './redux/index'

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}


ReactDOM.render(
  <Provider store={store} >
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        audience={config.audience} 
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
  </Provider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
