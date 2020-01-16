import React from 'react';
import { useUser } from '../user';

const Player = ({ playerId, children }) => {
  const { user, loading } = useUser( playerId );
  
  if (loading) {
    return null;
  }
  return (
    <div className="player">
      {user.displayName}
    </div>
  )
}

export default Player;
