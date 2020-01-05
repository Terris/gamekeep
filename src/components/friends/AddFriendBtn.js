import React, { useState } from 'react';
import { db } from '../../firebase';
import { Message, Modal } from '../ui';

const AddFriendBtn = ({ user }) => {
  const [modalOpen, setModalOpen] = useState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const onSubmit = e => {
    e.preventDefault();
    if (email !== "") {
      // search for user
      db.userByEmail(email).get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length) {
            // the user exists
            let friend = querySnapshot.docs[0].data();
            // check if friendship already exists
            db.usersFriend(user.uid, friend.uid).get()
              .then(doc => {
                if (doc.exists) {
                  setMessage("You are already friends with that person.")
                } else {
                  db.createUsersFriend(user.uid, friend.uid)
                    .then(() => setModalOpen(false))
                    .catch(error => setMessage(error));
                }
              }).catch(error => setMessage(error.message));
          } else {
            // user not found
            setMessage("That user hasn't signed up yet. Would you like to send them an invite?");
          }
        })
        .catch(error => setMessage(error.message));
    } else {
      setMessage("The email field is required.")
    }
  }
  
  const onClose = () => {
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
              <button onClick={onClose} type="button" className="btn btn-cancel" style={{marginLeft: "20px"}}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddFriendBtn;
