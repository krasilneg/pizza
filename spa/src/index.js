
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {store, init} from './state'
import App from './components/App.js'

const root = document.getElementById('pizza')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
)

init();