import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants';
import { Message } from '../ui';
import SignInWithGoogleBtn from './SignInWithGoogleBtn';

const SignUp = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  
  const createDbUser = (displayName, email, photoURL, uid) => {
    db.createUser(displayName, email, photoURL, uid)
    .then(() => history.push(routes.WELCOME.path))
    .catch(error => setMessage(error.message))
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(response => createDbUser(response.user.displayName, response.user.email, response.user.photoURL, response.user.uid))
        .catch(error => setMessage(error.message))
    } else {
      setMessage("Passwords do not match.")
    }
  }

  return (
    <div data-testid="page-signup" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign Up</h2>
      <p><SignInWithGoogleBtn /></p>
      <hr/>
      {message && <Message type="error" message={message} />}
      <p>Sign up with your email and password.</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            label='Password'
            name="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.currentTarget.value)} />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            label='Confirm Password'
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.currentTarget.value)} />
        </div>
        <div className="field">
          <button type='submit' className="btn">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
