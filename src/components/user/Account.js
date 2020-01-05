import React from 'react';
import { withAuthorization } from '../session';
import Avatar from '../ui/avatar';
import EditUser from './EditUser';
import './account.css';

const Account = ({ authUser }) => {
  
  return (
    <div className="ui-account">
      <div className="ui-account-header">
        {!!authUser.photoURL && <Avatar src={authUser.photoURL} alt={`${authUser.displayName}'s Avatar'`} wrapperClass={"ui-account-avatar"} /> }
        <h2 className="ui-account-display-name">{authUser.displayName}</h2>
        <p className="ui-account-email">{authUser.email}</p>
      </div>
      <hr/>
      <EditUser authUser={authUser} />
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);
