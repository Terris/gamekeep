import React, { Fragment, useState } from 'react';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Message } from '../ui';

const SignInWithGoogleBtn = () => {
  
  let history = useHistory();
  const [message, setMessage] = useState("");
  
  const createDbUser = (displayName, email, photoURL, uid) => {
    db.createUser(displayName, email, photoURL, uid)
      .then(() => history.push(ROUTES.WELCOME.path))
      .catch(error => setMessage(error.message))
  }
  
  const signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(response => {
      if (response.additionalUserInfo.isNewUser === true) {
        createDbUser(response.user.displayName, response.user.email, response.user.photoURL, response.user.uid)
      } else {
        history.push(ROUTES.DASHBOARD.path)
      }
    })
    .catch(error => setMessage(error.messsage))
  }
  
  return (
    <Fragment>
      {message && <Message type="error" message={message} />}
      <button type='button' className="btn" onClick={signInWithGoogle}>
        <span style={{marginRight: "30px"}}><FontAwesomeIcon icon={faGoogle} /></span>
        Sign In with Google
      </button>
    </Fragment>
  )
}

export default SignInWithGoogleBtn;
