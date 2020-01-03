import React, { Fragment, useState } from 'react';
import { auth, db } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignInWithGoogleBtn = ({ history }) => {
  
  const [error, setError] = useState("");
  
  const createDbUser = (uid, email) => {
    db.createUser(uid, email)
    .then(() => history.push(routes.DASHBOARD))
    .catch(error => setError(error.message))
  }
  
  const signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(response => {
      if (response.additionalUserInfo.isNewUser === true) {
        createDbUser(response.user.uid, response.user.email)
      } else {
        history.push(routes.DASHBOARD)
      }
    })
    .catch(error => setError(error.messsage))
  }
  
  return (
    <Fragment>
      {error && <div className="message message-error">{error}</div>}
      <button type='button' className="btn" onClick={signInWithGoogle}>
        <span style={{marginRight: "30px"}}><FontAwesomeIcon icon={faGoogle} /></span>
        Sign In with Google
      </button>
    </Fragment>
  )
}

export default withRouter(SignInWithGoogleBtn);
