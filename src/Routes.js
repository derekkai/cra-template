import { lazy, Suspense } from 'react'
import history from 'utils/history'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { useInjectSaga } from 'redux-injectors'
import rootSaga from './sagas/rootSaga'

const Home = lazy(() => import('pages/HomePage/HomePage'))
const Login = lazy(() => import('pages/LoginPage/LoginPage'))

const Routes = () => {
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

export default Routes
