import React from 'react';
import { useUser } from '../user';

const Player = ({ player }) => {
  const { user, loading } = useUser( player );
  if (loading) { return null }
  
  return (
    <>
      {!!user && (
        <span> {user.displayName}</span>
      )
      }
    </>
  )
}

export default Player;
