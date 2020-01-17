import React from 'react';
import GamePlayerScore from './GamePlayerScore';
import AddScoreBtn from './AddScoreBtn';
import { Avatar } from '../../ui';

const GamePlayer = ({ gameId, player }) => (
  <div className="gameplayer">
    <div className="gameplayer-user">
      <Avatar key={"avatar-" + player.uid} user={player} size="small" wrapperClass="gameplayer-user-avatar" />
      {player.displayName}
    </div>
    <GamePlayerScore gameId={gameId} player={player} />
    <AddScoreBtn gameId={gameId} playerId={player.uid} />
  </div>
)

export default GamePlayer;
