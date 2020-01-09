import React from 'react';
import { useUser } from '../user';

const Player = ({ player }) => {
  const { user, loading } = useUser( player );
  if (loading) { return null }
  
  return (
    <div className="player">
      {!!user && (
        <p>{user.displayName}</p>
      )
      }
    </div>
  )
}

export default Player;
