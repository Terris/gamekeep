import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { routes } from '../../constants';

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
        ? <Redirect to={routes.DASHBOARD.path} />
        : ( <HomePage /> )
      }
    </AuthUserContext.Consumer>
  )
}

export default Home;
