import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';
import SignInWithGoogleBtn from './SignInWithGoogleBtn';

const SignUp = ({ history }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  
  const createDbUser = (uid, email) => {
    db.createUser(uid, email)
    .then(() => history.push(routes.DASHBOARD))
    .catch(error => setError(error.message))
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(response => createDbUser(response.user.uid, response.user.email))
      .catch(error => setError(error.message))
    } else {
      setError("Passwords do not match.")
    }
  }

  return (
    <div data-testid="page-signup" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign Up</h2>
      {error && <div className="message message-error">{error}</div>}
      <p><SignInWithGoogleBtn /></p>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            label='Email'
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

export default withRouter(SignUp);
