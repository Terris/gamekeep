import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useGames = (uid) => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    const unsubscribe = db.games(uid)
      .onSnapshot(snapshot => {
        const newGames = snapshot.docs.map(game => ({
          id: game.id,
          ...game.data(),
        }));
        setGames(newGames);
        setLoading(false);
      })
    return () => unsubscribe();
  })
  
  return { games, loading };
}

export const useGame = (id) => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState([]);
  
  useEffect(() => {
    const unsubscribe = db.game(id)
      .onSnapshot(doc => {
        setGame(doc.data());
        setLoading(false);
      })
    return () => unsubscribe();
  })
  
  return { game, loading };
}
