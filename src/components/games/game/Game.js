import React from 'react';
import { useParams } from 'react-router-dom';
import { withPermission } from '../../session';
import { useGame } from '../hooks';
import { Loader } from '../../ui';
import GamePlayers from './GamePlayers';
import './css/game.css';

const Game = () => {
  let { id } = useParams();
  const { game, loading } = useGame(id);
  
  if (loading) {
    return <Loader />
  }
  return (
    <div className="game">
      {!!game &&
        <>
          <h2>{game.name}</h2>
          <hr/>
          <GamePlayers gameId={id} game={game} />
        </>
      }
    </div>
  )
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Game);
