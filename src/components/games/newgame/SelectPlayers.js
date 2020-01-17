import React, { useState, useEffect } from 'react';
import { useAcceptedFriends } from '../../friends';
import SelectPlayersItem from './SelectPlayersItem';

const SelectPlayers = ({ dbUser, handleSelection }) => {
  const [ players, setPlayers ] = useState([]);
  const { friends } = useAcceptedFriends(dbUser.uid);
  
  const selectPlayer = (id) =>  {
    let playerPos = players.indexOf(id);
    if ( playerPos === -1 ) {
      setPlayers([...players, id]);
    } else {
      setPlayers(players.filter(p => p !== id));
    }
  }
  
  useEffect(() => {
    handleSelection(players);
  }, [players, handleSelection])
  
  return (
    <div className="selectplayers">
      <h4>Select Players</h4>
      <div className="selectplayers-list">
        {friends && friends.map(friend =>
          <div
            key={friend.id}
            className={`selectplayers-list-item ${players.indexOf(friend.friend_id) === -1 ? '' : 'selected'}`}
            onClick={() => selectPlayer(friend.friend_id)}
          >
            <SelectPlayersItem player={friend.friend_id} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectPlayers;
