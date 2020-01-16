import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../ui';
import { usePlayers } from './hooks';

const GamesGame = ({ game, dbUser }) => {
  let history = useHistory();
  const { players } = usePlayers(game.players);
  
  return (
    <div className="gamelistitem" onClick={() => history.push(`/games/${game.id}`)}>
      {!!players && players.map((player, index) => <Avatar key={"avatar-" + player.uid} user={player} size="small" wrapperClass="gamelistitem-avatar" />)}
      <p>
        <strong>{game.name}</strong> with
        {!!players && players.map((player, index) =>
          <span key={"name-" + player.uid}>
            {` ${player.displayName}${index === players.length-2
                ? ' & '
                : index < players.length-1
                ? ', '
                : ''}
            `}
          </span>
        )}
      </p>
    </div>
  )
}

export default GamesGame;
