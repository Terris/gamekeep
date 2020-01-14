import React, { useState, useEffect } from 'react';

const PlayerScore = ({game, player}) => {
  
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    let newScore = 0;
    game.scores[player].forEach(({ score }) => {
      newScore = newScore + score;
    })
    setScore(newScore);
  }, [game.scores, player])
  
  return (
    <span className="playerscore">
      {score}
    </span>
  )
}

export default PlayerScore
