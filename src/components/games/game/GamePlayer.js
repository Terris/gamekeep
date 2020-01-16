import React from 'react';
import GamePlayerScore from './GamePlayerScore';
import AddScoreBtn from './AddScoreBtn';
import { Avatar } from '../../ui';

const GamePlayer = ({ gameId, player }) => (
  <div className="gameplayercard">
    <div className="gameplayercard-player">
      <Avatar key={"avatar-" + player.uid} user={player} size="small" wrapperClass="gameplayercard-avatar" />
      {player.displayName}
    </div>
    <div className="gameplayercard-score">
      <GamePlayerScore gameId={gameId} playerId={player.uid} />
    </div>
    <AddScoreBtn gameId={gameId} playerId={player} />
  </div>
)

export default GamePlayer;
