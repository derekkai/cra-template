import { lazy, Suspense } from 'react'
import history from 'utils/history'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

const Home = lazy(() => import('pages/Home/Home'))
const Login = lazy(() => import('pages/Login/Login'))

function App() {
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
