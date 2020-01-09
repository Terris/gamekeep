import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthUserContext } from '../session';
import { ROUTES } from '../../constants';

const HomePage = () => {
  return(
    <div data-testid="page-home">
      <h2>Home</h2>
    </div>
  )
}

const Home = () => {
  
  const { authUser } = useAuthUserContext();
  
  return (
    <>
      {authUser ? (<Redirect to={ROUTES.DASHBOARD.path} />) : (<HomePage />)}
    </>
  )
}

export default Home;
