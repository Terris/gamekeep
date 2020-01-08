import React, { useState } from 'react';
import { db } from '../../firebase';
import { Message } from '../ui';

const RemoveFriendBtn = ({ friend }) => {
  
  const [message, setMessage] = useState();
  
  const removeFriend = () => {
    db.removeFriend(friend)
      .catch(error => setMessage(error.message));
  }
  
  return (
    <>
      {!!message && <Message type={message.type} message={message.message} />}
      <button onClick={removeFriend}>Remove friend</button>
    </>
  )
}

export default RemoveFriendBtn;
