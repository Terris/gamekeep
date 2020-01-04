import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Message, Modal } from '../ui';

const ReAuthenticateWithPassword = ({ user, open }) => {
  
  const [modalOpen, setModalOpen] = useState(true);
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
    <Modal open={modalOpen}>
      <h3>Please enter your password to continue.</h3>
      {message && <Message type="error" message={message} />}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            label='Password'
            name="password"
            placeholder='Password'
            value={password}
            onChange={e => { setPassword( e.currentTarget.value ) }} />
        </div>
        <div className="field">
          <button onClick={onSubmit} type="submit" className="btn">Submit</button>
          <button onClick={onClose} className="btn btn-cancel" style={{marginLeft: "20px"}}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
};

export default ReAuthenticateWithPassword;
