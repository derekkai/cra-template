import PropTypes from 'prop-types'
import App from 'App'
import { store } from 'store/configureStore'

const initialState = {}

const MockAppWrapper = ({ children }) => (
  <App store={store} insertCss={() => {}}>
    {children}
  </App>
)

MockAppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MockAppWrapper
