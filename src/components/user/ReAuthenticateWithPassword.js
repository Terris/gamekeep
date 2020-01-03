import React, { useState } from 'react';
import { auth } from '../../firebase';

const ReAuthenticateWithPassword = ({ user, open }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const onSubmit = e => {
    e.preventDefault();
    
    let credential = auth.getEmailAuthCredential(user.email, password);
    
    user.reauthenticateWithCredential(credential).then(function() {
      setModalOpen(false);
    }).catch(function(error) {
      setMessage(error.message);
    });
    
  }
  
  const onClose = () => { setModalOpen(false); }
  
  return (
    <div className={modalOpen ? "open" : ""}>
      <h2>Please enter your password to continue.</h2>
      {message && <div className="message message-error">{message}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="password"
          label='Password'
          name="password"
          placeholder='Password'
          value={password}
          onChange={e => { setPassword( e.currentTarget.value ) }} />
      </form>
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
};

export default ReAuthenticateWithPassword;
