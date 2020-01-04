import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthUserContext } from '../session';
import { auth } from '../../firebase';
import { routes } from '../../constants';
import Drawer from '../ui/drawer';

import './header.css';

const NavigationAuth = () => (
  <Fragment>
    <Link to={routes.DASHBOARD}>Dashboard</Link>
    <Link to={routes.FRIENDS}>Friends</Link>
    <Link to={routes.ACCOUNT}>Account</Link>
    <button onClick={auth.signOut}>Sign Out</button>
  </Fragment>
);

const NavigationNonAuth = () => (
  <Fragment>
    <Link to={routes.SIGN_UP}>Sign Up</Link>
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </Fragment>
);

const Header = () => (
  <header className="header" data-testid="comp-header">
    <h1 className="logo">GameKeep</h1>
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
