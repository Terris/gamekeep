import React from 'react';
import { useUser } from '../user';

const Player = ({ player }) => {
  const { user, loading } = useUser( player );
  if (loading) { return null }
  
  return (
    <>
      {!!user && (
        <span className="player"> {user.displayName}</span>
      )
      }
    </>
  )
}

export default Player;
