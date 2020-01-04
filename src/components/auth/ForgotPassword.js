import React, { useState } from 'react';
import { Message } from '../ui';
import { auth } from '../../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email)
    .then(response => {
      setSubmitted(true)
    })
    .catch(error => setMessage(error.message))
  }

  return (
    <div data-testid="page-forgot-password" style={{ maxWidth: "360px", margin: "0 auto"}}>
      <h1>Forgot Password</h1>
      {message && <Message type="error" message={message} />}
      {submitted
        ? (
          <p>Thank you. Instructions have been sent to the email you provided.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Enter your email and we'll send you instructions for resetting your password.</p>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                label='Email'
                name="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.currentTarget.value)} />
            </div>
            <div className="field">
              <button type='submit' className="btn">Submit</button>
            </div>
          </form>
        )
      }
    </div>
  )
}
export default ForgotPassword;
