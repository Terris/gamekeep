import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';

const PlayerScore = ({ gameId, playerId }) => {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    
    const unsubscribe = db.gamePlayerScores(gameId, playerId)
      .onSnapshot(doc => {
        if ( doc.data() ) {
          let newScore = 0;
          doc.data().scores.forEach(score => {
            newScore = newScore + score;
          })
          setScore(newScore);
        }
      })
      return () => unsubscribe();
  }, [gameId, playerId])
  
  return (
    <span className="playerscore">
      {score}
    </span>
  )
}

export default PlayerScore
