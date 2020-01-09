import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { useAuthState } from './useAuthState';
import { ROUTES } from '../../constants';

const withAuthorization = (authCondition) => (Component) => {
  const WithAuthorization = (props) => {
    let history = useHistory();
    const [dbUser, setDbUser] = useState(null);
    const { authUser, loading } = useAuthState();
    
    useEffect(() => {
      if ( !loading ) {
        if (!authCondition(authUser)) {
          history.push(ROUTES.SIGN_IN.path);
        } else {
          db.user(authUser.uid)
            .get()
            .then(doc => {
              setDbUser(doc.data());
            })
        }
      }
    }, [authUser, loading, history])
    
    return (
      <>
        {authUser ? <Component {...props} authUser={authUser} dbUser={dbUser} /> : null }
      </>
    );
  }
  return WithAuthorization;
}
export default withAuthorization;
