import React from 'react';
import { useParams } from 'react-router-dom';
import { withPermission } from '../../session';
import { useGame } from '../hooks';
import { Loader } from '../../ui';
import Player from '../Player';
import PlayerScore from './PlayerScore';
import AddScoreBtn from './AddScoreBtn';
import './css/game.css';

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
      {game.players.map(player =>
        <div key={player} className="gameplayercard">
          <Player player={player} />
          <div className="gameplayercard-score">
            {!!game.scores[player]
              ? (<PlayerScore game={game} player={player} />)
              : ("0")
            }
          </div>
          <AddScoreBtn gameId={id} playerId={player} />
        </div>
      )}
    </div>
  )
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Game);
