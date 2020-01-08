import React from 'react';
import { withAuthorization } from '../session';
import { useFriends } from './hooks';
import { Loader } from '../ui';
import AddFriend from './AddFriend';
import Friend from './Friend';
import './friends.css';

const Friends = ({ authUser }) => {
  const { friends } = useFriends(authUser.uid);
  
  return (
    <div className="friends">
      {!friends && <Loader />}
      <AddFriend user={authUser} friends={friends} />
      {friends.length
        ? (friends.map(friend => <Friend key={friend.id} uid={friend.friend_id} />))
        : (<p className="text-muted text-center">You haven't added any friends yet. Use the search bar above to find or invite your friends.</p>)
      }
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
