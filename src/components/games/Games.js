import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGames } from './hooks';
import { ROUTES } from '../../constants'
import { Loader } from '../ui';
import GamesGame from './GamesGame';
import './games.css';

const Games = ({ dbUser }) => {
  let history = useHistory();
  const { games, loading } = useGames( dbUser.uid );
  
  return (
    <div className="games" data-testid="games">
      {loading && <Loader />}
      <p className="text-center"><button onClick={() => history.push(ROUTES.NEW_GAME.path)} className="btn newgame-btn">New Game</button></p>
      {games.length
        ? (games.map(game => <GamesGame key={game.id} game={game} dbUser={dbUser} />))
        : (<p className="text-muted">You haven't added any games yet.</p>)
      }
    </div>
  )
}

export default Games;
