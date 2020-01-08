import React, { useState } from 'react';
import { db } from '../../firebase';
import { Message } from '../ui';

const AcceptFriendBtn = ({ friend }) => {
  
  const [message, setMessage] = useState();
  
  const acceptFriendRequest = () => {
    db.acceptFriendRequest(friend)
      .catch(error => setMessage(error.message));
  }
  
  return (
    <>
      {!!message && <Message type={message.type} message={message.message} />}
      <button onClick={acceptFriendRequest}>Accept friend request</button>
    </>
  )
}

export default AcceptFriendBtn;
