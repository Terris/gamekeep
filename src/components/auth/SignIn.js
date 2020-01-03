import React, { useState } from 'react';
import { auth } from '../../firebase';
import { withRouter, Link } from 'react-router-dom';
import { routes } from '../../constants';

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

  const signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(() => history.push(routes.DASHBOARD))
    .catch(error => setError(error.messsage))
  }

  return (
    <div data-testid="page-signin" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h2>Sign In</h2>
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
          <button type='submit' className="btn">Submit</button>
          <Link to={routes.FORGOT_PASSWORD} style={{ marginLeft: "20px" }}>Forgot your password?</Link>
        </div>
      </form>
      <hr/>
      <p><button type='button' className="btn" onClick={signInWithGoogle}>Sign In with Google</button></p>
    </div>
  )
}

export default withRouter(SignIn);
