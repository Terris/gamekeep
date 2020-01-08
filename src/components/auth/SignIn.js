import React, { useState } from 'react';
import { auth } from '../../firebase';
import { useHistory, Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Message } from '../ui';
import SignInWithGoogleBtn from './SignInWithGoogleBtn';

const SignIn = () => {
  
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      history.push(ROUTES.DASHBOARD.path)
    })
    .catch(error => setMessage(error.message))
  }

  return (
    <div data-testid="page-signin" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign In</h2>
      <p><SignInWithGoogleBtn /></p>
      <hr/>
      {message && <Message type="error" message={message} />}
      <p>Sign in with your email and password.</p>
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
          <Link to={ROUTES.FORGOT_PASSWORD.path} style={{ marginLeft: "20px" }}>Forgot your password?</Link>
        </div>
      </form>
      <hr/>
      <p>Don't have an account? <Link to={ROUTES.SIGN_UP.path}>Sign Up</Link></p>
    </div>
  )
}

export default SignIn;
