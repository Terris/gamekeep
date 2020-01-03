import React, { Fragment, useState } from 'react';
import { auth } from '../../firebase';
import ReAuthenticateWithPassword from './ReAuthenticateWithPassword';

const EditUser = () => {
  
  const user = auth.currentUser();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(user.email);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [reAuthWithPassword, setReAuthWithPassword] = useState(false);
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if( displayName !== user.displayName ) {
      user.updateProfile({displayName: displayName})
        .then(function() {
          // Update successful.
        }).catch(function(error) {
          setMessage(error.message);
        });
    }
    if( email !== user.email ) {
      user.updateEmail(email)
        .then(function() {
          // Update successful.
        }).catch(error => {
          if( error.code === "auth/requires-recent-login") {
            setReAuthWithPassword(true);
          } else {
            setMessage(error.message);
          }
        });
    }
  }
  
  return (
    <Fragment>
      {message && <div className="message message-error">{message}</div>}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            placeholder='Display Name'
            value={displayName}
            onChange={e => setDisplayName(e.currentTarget.value)} />
        </div>
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
          <button type='submit' className="btn">Update</button>
        </div>
      </form>
      {!!reAuthWithPassword && <ReAuthenticateWithPassword user={user} />}
    </Fragment>
  );
}
  

export default EditUser;
