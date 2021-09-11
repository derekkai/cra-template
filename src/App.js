import PropTypes from 'prop-types'
import React, { Children } from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux'
import ThemeProvider from './theme/ThemeProvider'

const App = ({ children, insertCss, store }) => {
  return (
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <ThemeProvider>{Children.only(children)}</ThemeProvider>
      </Provider>
    </StyleContext.Provider>
  )
}

App.propTypes = {
  store: PropTypes.object,
  children: PropTypes.element.isRequired,
  insertCss: PropTypes.func.isRequired,
}

export default App
