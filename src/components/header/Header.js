import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuthUserContext } from '../session';
import { auth } from '../../firebase';
import { ROUTES } from '../../constants';
import { PageTitle } from '../pagetitle';
import { Alerts } from '../alerts';
import { Drawer } from '../ui';

import './header.css';

const NavigationAuth = ({ authUser }) => (
  <>
    <Alerts authUser={authUser} />
    <nav className="nav-primary">
      <Drawer trigger={<FontAwesomeIcon icon={faBars} />}>
        <Link to={ROUTES.DASHBOARD.path}>Dashboard</Link>
        <Link to={ROUTES.FRIENDS.path}>Friends</Link>
        <Link to={ROUTES.ACCOUNT.path}>Account</Link>
        <button onClick={auth.signOut}>Sign Out</button>
      </Drawer>
    </nav>
  </>
);

const NavigationNonAuth = () => (
  <Fragment>
    <Link to={ROUTES.SIGN_UP.path}>Sign Up</Link>
    <Link to={ROUTES.SIGN_IN.path}>Sign In</Link>
  </Fragment>
);

const Header = () => {
  const { authUser } = useAuthUserContext();
  
  return (
    <header className="header" data-testid="comp-header">
      <h1 className="logo"><Link to={ROUTES.HOME.path}>G</Link></h1>
      <PageTitle />
      <nav className="header-actions">
        {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
      </nav>
    </header>
  );
};

export default Header;
