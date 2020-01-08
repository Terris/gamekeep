import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { ROUTES } from '../../constants';

const HomePage = () => {
  return(
    <div data-testid="page-home">
      <h2>Home</h2>
    </div>
  )
}

const Home = () => {
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        authUser
        ? <Redirect to={ROUTES.DASHBOARD.path} />
        : ( <HomePage /> )
      }
    </AuthUserContext.Consumer>
  )
}

export default Home;
