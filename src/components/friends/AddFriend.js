import React, { useState } from 'react';
import { db } from '../../firebase';
import { Message, Modal } from '../ui';

const AddFriend = ({ user, friends }) => {
  const [modalOpen, setModalOpen] = useState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const onSubmit = e => {
    e.preventDefault();
    if (email !== "" && email !== user.email) {
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
            setMessage("That user hasn't signed up yet. Would you like to send them an invite?");
          }
        })
        .catch(error => setMessage(error.message));
    } else {
      setMessage("The email field is required.")
    }
  }
  
  const handleClose = () => {
    setMessage("");
    setEmail("");
    setModalOpen(false);
  }
  
  return (
    <div className="addfriendbtn">
      <p><button className="btn" onClick={() => setModalOpen(true)}>Add Friend</button></p>
      <Modal open={modalOpen}>
        <div className="addfriend">
          <h3>Add a Friend</h3>
          {message && <Message type="error" message={message} />}
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="displayName">Your Friend's Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.currentTarget.value)} />
            </div>
            <div className="field">
              <button onClick={onSubmit} type="submit" className="btn">Submit</button>
              <button onClick={handleClose} type="button" className="btn btn-cancel" style={{marginLeft: "20px"}}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddFriend;
