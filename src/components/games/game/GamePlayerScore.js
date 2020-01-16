import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { usePlayerScores } from '../hooks';

const GamePlayerScore = ({ gameId, player }) => {
  const [showScores, setShowScores] = useState(false);
  const {scores, scoreTotal} = usePlayerScores(gameId, player.uid)
  return (
    <div className="playerscore">
      <span className="playerscore-total" onClick={() => setShowScores(true)}>{scoreTotal}</span>
      {!!showScores && (
        <div className="playerscore-scores">
          <button
            className="close-playerscores-btn"
            onClick={() => setShowScores(false)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="playerscore-scores-inner">
            <h4>{player.displayName}</h4>
            <ul className="playerscore-scores-list">
              {scores.length > 0 && scores.map((score, index) => <li key={index}>{score}</li>)}
              <li>{scoreTotal}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePlayerScore
