import React from 'react'
import { Provider } from 'react-redux'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import ReactDOM from 'react-dom'
import ThemeProvider from './provider/ThemeProvider'
import { store } from './store/configureStore'
import App from './App'
import './i18n'

import reportWebVitals from './reportWebVitals'

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss())
  return () => removeCss.forEach((dispose) => dispose())
}

ReactDOM.render(
  <React.StrictMode>
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </StyleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
