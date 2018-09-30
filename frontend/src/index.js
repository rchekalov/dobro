import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// If your server supports server rendering, use browserHistory replace with hashHistory.
import {Router, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {configureStore} from './store'
import registerServiceWorker from './registerServiceWorker'
import routes from './routes'
import './styles/main.css'
import { PersistGate } from 'redux-persist/integration/react'

const state = window.__initialState__ || undefined
const { store, persistor } = configureStore(hashHistory, state)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
         <Router history={history} routes={routes}/>
      </PersistGate>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
