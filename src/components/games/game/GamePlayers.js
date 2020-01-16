import React from 'react';
import { usePlayers } from '../hooks';
import GamePlayer from './GamePlayer';

const GamePlayers = ({ gameId, game }) => {
  const { players } = usePlayers(game.players);
  return (
    <div className="gameplayercards">
      {!!players && players.map((player, index) =>
        <GamePlayer key={player.uid} gameId={gameId} player={player} />
      )}
    </div>
  )
}

export default GamePlayers;
