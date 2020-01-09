import React from 'react';
import { withPermission } from '../session';
import Avatar from '../ui/avatar';
import EditUser from './EditUser';
import './account.css';

const Account = ({ authUser, dbUser }) => (
  <div className="ui-account">
    <div className="ui-account-header">
      <Avatar dbUser={dbUser} wrapperClass={"ui-account-avatar"} />
      <h2 className="ui-account-display-name">{dbUser.displayName}</h2>
      <p className="ui-account-email">{authUser.email}</p>
    </div>
    <hr/>
    <EditUser authUser={authUser} dbUser={dbUser} />
  </div>
);

const condition = authUser => !!authUser;
export default withPermission(condition)(Account);
