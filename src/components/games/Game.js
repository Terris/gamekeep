import React from 'react';
import { withPermission } from '../session';
import { useParams } from 'react-router-dom';
import { useGame } from './hooks';
import GameListItem from './GameListItem';
import { Loader } from '../ui';

const Game = () => {
  let { id } = useParams();
  const { game, loading } = useGame(id);
  
  if (loading) {
    return <Loader />
  }
  return (
    <div className="game">
      <h2>{game.name}</h2>
      <hr/>
      <p>{JSON.stringify(game)}</p>
    </div>
  )
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Game);
