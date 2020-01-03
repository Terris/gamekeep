import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { auth } from '../../firebase';
import { routes } from '../../constants';
import './header.css';

const Header = (props) => (
  <header className="header" data-testid="comp-header">
    <h1 className="logo">Gamekeep</h1>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </header>
);

const NavigationAuth = withRouter(
  ({ authUser, history }) => (
    <Fragment>
      <Link to={routes.DASHBOARD}>Dashboard</Link>
      <Link to={routes.ACCOUNT}>Account</Link>
      <button onClick={auth.signOut}>Sign Out</button>
    </Fragment>
  )
);

const NavigationNonAuth = () => (
  <Fragment>
    <Link to={routes.SIGN_UP}>Sign Up</Link>
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </Fragment>
);

export default Header;
