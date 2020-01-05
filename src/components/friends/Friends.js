import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { withAuthorization } from '../session';
import { Loader } from '../ui';
import AddFriendBtn from './AddFriendBtn';
import Friend from './Friend';
import './friends.css';

const Friends = ({ authUser }) => {
  
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    const unsubscribe = db.usersFriends(authUser.uid)
      .onSnapshot((snapshot) => {
        const newFriends = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setFriends(newFriends);
        setLoading(false);
    });
    return () => unsubscribe();
  }, [authUser]);
  
  return (
    <div className="friends">
      {!!loading && <Loader />}
      <h2>Friends</h2>
      <AddFriendBtn user={authUser} />
      {!!friends && friends.map(friend => <Friend key={friend.id} uid={friend.id} />)}
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
