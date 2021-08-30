import { lazy, Suspense } from 'react'
import useStyles from 'hooks/useStyles'
import history from 'utils/history'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import defaultTheme from 'theme/_default.scss'
import resetStyle from 'normalize.css'
import globalStyles from './index.css'

const Home = lazy(() => import('pages/Home/Home'))
const Login = lazy(() => import('pages/Login/Login'))

function App() {
  useStyles(globalStyles)
  useStyles(defaultTheme)
  useStyles(resetStyle)
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
