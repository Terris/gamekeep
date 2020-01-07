import React from 'react';
import { useUser } from '../user';
import { Message } from '../ui';

const Friend = ({ uid }) => {
  const { message, loading, user } = useUser(uid);
  
  if (loading) { return null }
  
  return (
    <div className="friends-friend">
      {message && <Message message={message} />}
      <p>{user.displayName}</p>
      <hr/>
    </div>
  )
}

export default Friend;
