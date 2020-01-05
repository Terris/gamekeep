import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Home from '../home';
import Welcome from '../welcome';
import Dashboard from '../dashboard';
import NoMatch from '../nomatch';
import { SignUp } from '../auth';
import { SignIn } from '../auth';
import { ForgotPassword } from '../auth';
import { Account } from '../user';
import { Friends } from '../friends';
import { withAuthentication } from '../session';
import { routes } from '../../constants';
import './app.css';

const App = () => {
  return (
    <div data-testid="app">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={routes.HOME.path} component={Home} />
          <Route exact path={routes.SIGN_UP.path} component={SignUp} />
          <Route exact path={routes.SIGN_IN.path} component={SignIn} />
          <Route exact path={routes.FORGOT_PASSWORD.path} component={ForgotPassword} />
          <Route exact path={routes.WELCOME.path} component={Welcome} />
          <Route exact path={routes.DASHBOARD.path} component={Dashboard} />
          <Route exact path={routes.FRIENDS.path} component={Friends} />
          <Route exact path={routes.ACCOUNT.path} component={Account} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  )
}

export default withAuthentication(App);
