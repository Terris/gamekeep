import React, { Fragment, useState } from 'react';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Message } from '../ui';

const SignInWithGoogleBtn = () => {
  
  let history = useHistory();
  const [message, setMessage] = useState("");
  
  const createDbUser = (displayName, email, uid) => {
    db.createUser(displayName, email, uid)
      .then(() => history.push(routes.WELCOME))
      .catch(error => setMessage(error.message))
  }
  
  const signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(response => {
      if (response.additionalUserInfo.isNewUser === true) {
        createDbUser(response.user.displayName, response.user.email, response.user.uid)
      } else {
        history.push(routes.DASHBOARD)
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
