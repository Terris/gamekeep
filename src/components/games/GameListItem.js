import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../ui';
import { usePlayers } from './hooks';

const GameListItem = ({ game, dbUser }) => {
  let history = useHistory();
  const { players } = usePlayers(game.players);
  
  return (
    <div className="gamelistitem" onClick={() => history.push(`/games/${game.id}`)}>
      <p><strong>{game.name}</strong> with</p>
      {!!players && players.map(player => <Avatar key={"avatar-" + player.uid} user={player} size="small" wrapperClass="gamelistitem-avatar" />)}
      {!!players && players.map(player => <p key={"name-" + player.uid}>{player.displayName}</p>)}
    </div>
  )
}

export default GameListItem;
