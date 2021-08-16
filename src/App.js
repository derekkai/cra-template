import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { history } from 'utils'
import Home from 'components/Home/Home'
import Login from 'components/Login/Login'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { setFlag } from './reducers/global'

function App() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(setFlag())
  }

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App
