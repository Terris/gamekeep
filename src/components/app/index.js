import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Home from '../home';
import Dashboard from '../dashboard';
import NoMatch from '../nomatch';
import { SignUp } from '../auth';
import { SignIn } from '../auth';
import { ForgotPassword } from '../auth';
import { Account } from '../user';
import { withAuthentication } from '../session';
import { routes } from '../../constants';
import './app.css';

const App = () => {
  return (
    <div data-testid="app">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.SIGN_UP} component={SignUp} />
          <Route exact path={routes.SIGN_IN} component={SignIn} />
          <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route exact path={routes.ACCOUNT} component={Account} />
          <Route exact path={routes.DASHBOARD} component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  )
}

export default withAuthentication(App);
