import React, { useState } from 'react';
import { auth } from '../../firebase';
import { withRouter, Link } from 'react-router-dom';
import { routes } from '../../constants';
import SignInWithGoogleBtn from './SignInWithGoogleBtn';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      history.push(routes.DASHBOARD)
    })
    .catch(error => setError(error.message))
  }

  return (
    <div data-testid="page-signin" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign In</h2>
      {error && <div className="message message-error">{error}</div>}
      <p><SignInWithGoogleBtn />
      </p>
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
          <button type='submit' className="btn">Submit</button>
          <Link to={routes.FORGOT_PASSWORD} style={{ marginLeft: "20px" }}>Forgot your password?</Link>
        </div>
      </form>
      <hr/>
      <p>Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>
    </div>
  )
}

export default withRouter(SignIn);
