import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthUserContext } from '../session';
import { auth } from '../../firebase';
import { ROUTES } from '../../constants';
import PageTitle from '../pagetitle';
import Drawer from '../ui/drawer';

import './header.css';

const NavigationAuth = () => (
  <Fragment>
    <Link to={ROUTES.DASHBOARD.path}>Dashboard</Link>
    <Link to={ROUTES.FRIENDS.path}>Friends</Link>
    <Link to={ROUTES.ACCOUNT.path}>Account</Link>
    <button onClick={auth.signOut}>Sign Out</button>
  </Fragment>
);

const NavigationNonAuth = () => (
  <Fragment>
    <Link to={ROUTES.SIGN_UP.path}>Sign Up</Link>
    <Link to={ROUTES.SIGN_IN.path}>Sign In</Link>
  </Fragment>
);

const Header = () => (
  <header className="header" data-testid="comp-header">
    <h1 className="logo">GameKeep</h1>
    <PageTitle />
    <Drawer trigger={<FontAwesomeIcon icon={faBars} />}>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
    </Drawer>
  </header>
);

export default Header;
