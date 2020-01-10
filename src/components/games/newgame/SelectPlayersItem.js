import React from 'react';
import { useUser } from '../../user';
import { Avatar } from '../../ui';

const SelectPlayersItem = ({ player }) => {
  const { user, loading } = useUser( player );
  
  if (loading) { return null }
  return (
    <>
      {!!user && (
        <>
          <Avatar user={user} size="small" />
          <span>{user.displayName}</span>
        </>
      )}
    </>
  )
}

export default SelectPlayersItem;
