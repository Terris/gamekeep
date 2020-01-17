import React from 'react';
import { useUser } from '../../user';
import { Avatar, Checkbox } from '../../ui';

const SelectPlayersItem = ({ player }) => {
  const { user, loading } = useUser( player );
  
  if (loading) { return null }
  return (
    <>
      {!!user && (
        <>
          <Avatar user={user} size="small" />
          <span>{user.displayName}</span>
          <div className="field">
            <Checkbox initChecked={false} />
          </div>
        </>
      )}
    </>
  )
}

export default SelectPlayersItem;
