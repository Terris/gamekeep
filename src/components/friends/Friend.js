import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Message } from '../ui';

const Friend = ({ uid }) => {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("");
  const [friend, setFriend] = useState();
  
  useEffect(() => {
    db.user(uid)
      .get()
      .then(doc => {
        setFriend(doc.data());
        setLoading(false);
      })
      .catch(error => setMessage(error.message));
  }, [uid]);
  
  if (loading) {
    return null;
  }
  
  return (
    <div className="friends-friend">
      {message && <Message message={message} />}
      <p>{friend.displayName}</p>
      <hr/>
    </div>
  )
}

export default Friend;
