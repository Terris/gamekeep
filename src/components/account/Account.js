import React from 'react';
import { withAuthorization } from '../session';
import { useRealtimeUser } from '../user';
import Avatar from '../ui/avatar';
import EditUser from './EditUser';
import { Loader, Message } from '../ui';
import './account.css';

const Account = ({ authUser }) => {
  const { message, loading, user} = useRealtimeUser(authUser.uid);
  
  if ( loading ) {
    return <Loader />
  }
  
  return (
    <div className="ui-account">
      <div className="ui-account-header">
        {message && <Message message={message} />}
        {!!authUser.photoURL && <Avatar src={authUser.photoURL} alt={`${authUser.displayName}'s Avatar'`} wrapperClass={"ui-account-avatar"} /> }
        <h2 className="ui-account-display-name">{user.displayName}</h2>
        <p className="ui-account-email">{authUser.email}</p>
      </div>
      <hr/>
      <EditUser authUser={authUser} user={user} />
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);
