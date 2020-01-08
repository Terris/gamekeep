import React from 'react';
import { useUser } from '../user';
import { Message, Avatar } from '../ui';

const Friend = ({ uid }) => {
  const { message, loading, user } = useUser(uid);
  
  if (loading) { return null }
  
  return (
    <>
      {message && <Message message={message} />}
      <div className="friends-friend">
        <Avatar user={user} size="small" wrapperClass="avatar-inline" />
        <p>{user.displayName}</p>
      </div>
    </>
  )
}

export default Friend;
