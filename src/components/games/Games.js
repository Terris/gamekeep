import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants'
import { Loader } from '../ui';
import { useGames } from './hooks';
import GameListItem from './GameListItem';
import './games.css';

const Games = ({ dbUser }) => {
  
  const { games, loading } = useGames( dbUser.uid );
  
  return (
    <div className="games" data-testid="games">
      {loading && <Loader />}
      <p><Link to={ROUTES.NEW_GAME.path}>New Game</Link></p>
      {games.length
        ? (games.map(game => <GameListItem key={game.id} game={game} />))
        : (<p className="text-muted">You haven't added any games yet.</p>)
      }
    </div>
  )
}

export default Games;
