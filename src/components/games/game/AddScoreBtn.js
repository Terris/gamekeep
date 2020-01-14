import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ScorePad from './ScorePad';

const AddScoreBtn = ({ gameId, playerId }) => {
  
  const [scorePadOpen, setScorePadOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setScorePadOpen(true)} className="btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {!!scorePadOpen && <ScorePad gameId={gameId} playerId={playerId} closeScorePad={() => setScorePadOpen(false)} />}
    </>
  )
}

export default AddScoreBtn;
