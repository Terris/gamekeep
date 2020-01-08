import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useFriends = uid => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    let unsubscribe = db.friendships(uid)
      .where('uid', '==', uid)
      .onSnapshot(snapshot => {
        const newFriends = snapshot.docs.map(friend => ({
          id: friend.id,
          ...friend.data(),
        }));
      setFriends(newFriends);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [uid]);
  return { friends, loading };
};
