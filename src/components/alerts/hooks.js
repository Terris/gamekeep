import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useAlerts = uid => {
  const [alerts, setAlerts] = useState(null);
  
  useEffect(() => {
    let unsubscribe = db.userAlerts(uid)
      .onSnapshot(snapshot => {
        const newAlerts = snapshot.docs.map(alert => ({
          id: alert.id,
          ...alert.data(),
        }));
      setAlerts(newAlerts);
    });
    return () => unsubscribe();
  }, [uid]);
  return { alerts };
};
