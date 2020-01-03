import React, { useState } from 'react';
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
    <div data-testid="page-forgot-password">
      <h1>Forgot Password</h1>
      {message && <div className="message message-error">{message}</div>}
      {submitted
        ? (
          <p>Thank you. Instructions have been sent to the email you provided.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Enter your email and we'll send you instrucitons for resetting your password.</p>
            <input
              type="text"
              label='Email'
              name="email"
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.currentTarget.value)} />
            <button type='submit'>Submit</button>
          </form>
        )
      }
    </div>
  )
}
export default ForgotPassword;
