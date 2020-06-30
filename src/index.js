import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './redux/index'

import './i18n'

ReactDOM.render(
  <Provider store={store} >
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
