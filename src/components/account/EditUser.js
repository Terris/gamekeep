import React, { Fragment, useState } from 'react';
import { db } from '../../firebase';
import { Message } from '../ui';
import ReAuthenticateWithPassword from './ReAuthenticateWithPassword';

const EditUser = ({ authUser, user }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(authUser.email);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [reAuthWithPassword, setReAuthWithPassword] = useState(false);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if ( displayName !== user.displayName ) {
      db.user(authUser.uid).update({ displayName: displayName })
        .catch(error => setMessage(error.message));
    }
    if ( email !== authUser.email ) {
      authUser.updateEmail(email)
        .catch(error => {
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
      {message && <Message type="error" message={message} />}
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
            disabled={authUser.providerData[0].providerId === "google.com" ? "disabled" : ""}
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} />
        </div>
        <div className="field">
          <button type='submit' className="btn">Update</button>
        </div>
      </form>
      {!!reAuthWithPassword && <ReAuthenticateWithPassword authUser={authUser} />}
    </Fragment>
  );
}
  

export default EditUser;
