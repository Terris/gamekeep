import React from 'react';
import { useHistory } from 'react-router-dom';
import Player from './Player';

const GameListItem = ({ game }) => {
  let history = useHistory();
  return (
    <div className="gamelistitem" onClick={() => history.push(`/games/${game.id}`)}>
      <p>
        <strong>{game.name}</strong> with
      </p>
      {!!game.players && game.players.map(player => {
        return <Player key={player} player={player} />
      })}
    </div>
  )
}

export default GameListItem;
