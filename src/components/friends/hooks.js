import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useFriends = uid => {
  const [friends, setFriends] = useState(null);
  
  useEffect(() => {
    let unsubscribe = db.friendships(uid)
      .where('uid', '==', uid)
      .onSnapshot(snapshot => {
        const newFriends = snapshot.docs.map(friend => ({
          id: friend.id,
          ...friend.data(),
        }));
      setFriends(newFriends);
    });
    return () => unsubscribe();
  }, [uid]);
  return { friends };
};
