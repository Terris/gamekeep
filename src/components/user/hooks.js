import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useUser = uid => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    db.user(uid)
      .get()
      .then(doc => {
        setUser(doc.data());
        setLoading(false);
      })
      .catch(error => setMessage(error.message));
  }, [uid]);
  
  return {
    message,
    loading,
    user,
  }
};

export const useRealtimeUser = uid => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = db.user(uid)
      .onSnapshot(doc => {
        setUser(doc.data());
        setLoading(false);
      }, error => setMessage(error.message));
    return () => unsubscribe();
  }, [uid]);
  
  return {
    message,
    loading,
    user,
  }
};
