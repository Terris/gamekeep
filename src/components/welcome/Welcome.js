import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { withAuthorization } from '../session';
import { ROUTES } from '../../constants';
import { Message } from '../ui';

const Welcome = ({ authUser }) => {
  let history = useHistory();
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState(authUser.displayName || "");
  
  const onSubmit = (e) => {
    e.preventDefault();
    if ( displayName !== "" ) {
      db.user(authUser.uid)
        .update({ displayName: displayName })
        .then(() => history.push(ROUTES.DASHBOARD.path))
        .catch(error => setMessage(error.message));
    } else {
      setMessage("You must set a Display Name to continue.")
    }
  }
  
  return (
    <div className="welcome">
      <h2>Welcome to GameKeep</h2>
      <p>To get started, first create a display name.</p>
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
          <button type='submit' className="btn">Submit</button>
        </div>
      </form>
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Welcome);
