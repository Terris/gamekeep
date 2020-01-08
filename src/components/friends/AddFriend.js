import React, { useState } from 'react';
import { db } from '../../firebase';
import { Message } from '../ui';

const AddFriend = ({ user, friends }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const onSubmit = e => {
    e.preventDefault();
    if (email === "") {
      setMessage("The email field is required.")
    } else if (email === user.email) {
      setMessage("That's your email, silly.")
    } else {
      db.userByEmail(email)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length) {
            let friend = snapshot.docs[0].data();
            friends.findIndex(fr => fr.friend_id === friend.uid) !== -1
            ? setMessage("You are already friends with that person.")
            : (db.createFriendship(user.uid, friend.uid)
                .then(() => handleClose())
                .catch(error => setMessage(error.message))
            )
          } else {
            setMessage("That user hasn't signed up yet.");
          }
        })
        .catch(error => setMessage(error.message));
    }
  }
  
  const handleClose = () => {
    setMessage("");
    setEmail("");
  }
  
  return (
    <div className="addfriend">
      {message && <Message type="error" message={message} />}
      <form onSubmit={onSubmit} className="add-friend-form">
        <div className="field">
          <label htmlFor="email">Add Friend</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Search by email'
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} />
        </div>
      </form>
    </div>
  )
}

export default AddFriend;
