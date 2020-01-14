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
  }, [uid])
  
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
  }, [id])
  
  return { game, loading };
}


export const usePlayers = (gamePlayers) => {
  const [players, setPlayers] = useState([]);
  console.log("render");
  useEffect(() => {
    setPlayers([]);
    gamePlayers.forEach(player => {
      db.user(player)
        .get()
        .then(doc => {
          let pData = doc.data();
          setPlayers(p => [...p, pData]);
        })
    });
  }, [gamePlayers]);
  return { players }
}
