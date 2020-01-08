import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthUserContext from './context';
import { ROUTES } from '../../constants';
import { firebase, db } from '../../firebase';

const withAuthorization = (authCondition) => (Component) => {
  const WithAuthorization = (props) => {
    let history = useHistory();
    const [dbUser, setDbUser] = useState(null);
    
    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          history.push(ROUTES.SIGN_IN.path);
        } else {
          db.user(authUser.uid)
            .get()
            .then(doc => {
              setDbUser(doc.data());
            })
        }
      });
      return () => unsubscribe();
    }, [history])
    
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? <Component {...props} authUser={authUser} dbUser={dbUser} /> : null }
      </AuthUserContext.Consumer>
    );
  }
  return WithAuthorization;
}
export default withAuthorization;
