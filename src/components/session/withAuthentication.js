import React, { useState, useEffect } from 'react';
import AuthUserContext from './context';
import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  const WithAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null)
      });
      return () => unsubscribe();
    }, []);
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component />
      </AuthUserContext.Provider>
    )
  }
  return WithAuthentication;
}
export default withAuthentication;
