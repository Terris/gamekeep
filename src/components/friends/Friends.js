import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { withAuthorization } from '../session';
import AddFriendBtn from './AddFriendBtn';
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
      friends.map(friend => <p key={friend.id}>{friend.id}</p>)
    )
  }
  
  return (
    <div className="friends">
      <h2>Friends</h2>
      <AddFriendBtn user={authUser} />
      {!!loading && <p>...loading</p>}
      {!loading && <RenderFriends />}
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
