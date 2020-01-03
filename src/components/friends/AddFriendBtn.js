import React, { useState } from 'react';
import { db } from '../../firebase';
import Modal from '../ui/modal';

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
                  setMessage("You're already friends with that person.")
                } else {
                  db.createUsersFriend(user.uid, friend.uid, "anon")
                    .then(() => setModalOpen(false))
                    .catch(error => setMessage(error));
                }
              }).catch(error => console.log(error));
          } else {
            // user not found
            setMessage("That user hasn't signed up yet. Would you like to send them an invite?");
          }
        })
        .catch(error => setMessage(error));
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
          {!!message && <div className="message message-error">{message}</div>}
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
              <button onClick={onSubmit} className="btn">Submit</button>
              <button onClick={onClose} className="btn btn-cancel" style={{marginLeft: "20px"}}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddFriendBtn;
