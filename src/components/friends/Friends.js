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
  
  const RenderFriends = () => {
    if (!friends.length) {
      return <p>You haven't added any friends yet.</p>
    }
    return (
      friends.map(friend => <Friend key={friend.id} uid={friend.id} />)
    )
  }
  
  return (
    <div className="friends">
      {!!loading && <Loader />}
      <h2>Friends</h2>
      <AddFriendBtn user={authUser} />
      <RenderFriends />
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
