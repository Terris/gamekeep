import React from 'react';
// Router
import { Switch, Route } from 'react-router-dom';
// Hooks & Context
import { AuthUserContext, useAuthState } from '../session';
// Constants
import { ROUTES } from '../../constants';
// Partials
import { Header } from '../header';
// UI Components
import { Loader } from '../ui';
// Routes
import { Home } from '../home';
import { Welcome } from '../welcome';
import { Dashboard } from '../dashboard';
import { SignUp } from '../auth';
import { SignIn } from '../auth';
import { ForgotPassword } from '../auth';
import { Account } from '../account';
import { Friends } from '../friends';
import { NotAllowed } from '../notallowed';
import { NoMatch } from '../nomatch';
// CSS
import './app.css';

const App = () => {
  
  const { authUser, dbUser, loading } = useAuthState();
  
  if (loading) {
    return <Loader />
  }
  return (
    <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
      <div data-testid="app">
        <Header />
        <main className="main">
          <Switch>
            <Route exact path={ROUTES.HOME.path} component={Home} />
            <Route exact path={ROUTES.SIGN_UP.path} component={SignUp} />
            <Route exact path={ROUTES.SIGN_IN.path} component={SignIn} />
            <Route exact path={ROUTES.FORGOT_PASSWORD.path} component={ForgotPassword} />
            <Route exact path={ROUTES.WELCOME.path} component={Welcome} />
            <Route exact path={ROUTES.DASHBOARD.path} component={Dashboard} />
            <Route exact path={ROUTES.FRIENDS.path} component={Friends} />
            <Route exact path={ROUTES.ACCOUNT.path} component={Account} />
            <Route exact path={ROUTES.NOT_ALLOWED.path} component={NotAllowed} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    </AuthUserContext.Provider>
  )
}

export default App;
