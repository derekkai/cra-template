import { lazy, Suspense } from 'react'
import useStyles from 'hooks/useStyles'
import history from 'utils/history'
import { useInjectSaga } from 'redux-injectors'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import defaultTheme from 'theme/_default.scss'
import resetStyle from 'normalize.css'
import rootSaga from './sagas/rootSaga'
import globalStyles from './index.css'

const Home = lazy(() => import('pages/Home/Home'))
const Login = lazy(() => import('pages/Login/Login'))

function App() {
  useStyles(globalStyles)
  useStyles(defaultTheme)
  useStyles(resetStyle)
  useInjectSaga({ key: 'root', saga: rootSaga })
  return (
    <ConnectedRouter history={history}>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Suspense>
    </ConnectedRouter>
  )
}

export default App
