import React, { useState } from 'react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(response => history.push(routes.DASHBOARD))
      .catch(error => setError(error.message))
    } else {
      setError("Passwords do not match.")
    }
  }

  const signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(() => history.push(routes.DASHBOARD))
    .catch(error => setError(error.messsage))
  }

  return (
    <div data-testid="page-signup" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign Up</h2>
      {error && <div className="message message-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            label='Email'
            name="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} />
        </div>
        <div className="field">
          <input
            type="password"
            label='Password'
            name="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.currentTarget.value)} />
        </div>
        <div className="field">
          <input
            type="password"
            label='Confirm Password'
            name="passwordConfirmation"
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.currentTarget.value)} />
        </div>
        <div className="field">
          <button type='submit' className="btn">Submit</button>
        </div>
      </form>
      <hr/>
      <p><button type='button' className="btn" onClick={signInWithGoogle}>Sign Up with Google</button></p>
    </div>
  )
}

export default withRouter(SignUp);
