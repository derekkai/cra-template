import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick'
import App from './App'
import Route from './Routes'
import { store } from './store/configureStore'
import './i18n'
import reportWebVitals from './reportWebVitals'
import insertCss from './utils/insertCss'

FastClick.attach(document.body)

ReactDOM.render(
  <React.StrictMode>
    <App insertCss={insertCss} store={store}>
      <Route />
    </App>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
