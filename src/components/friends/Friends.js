import React from 'react';
import { withAuthorization } from '../session';
import { useFriends } from './hooks';
import { Loader } from '../ui';
import AddFriend from './AddFriend';
import Friend from './Friend';
import './friends.css';

const Friends = ({ authUser, dbUser }) => {
  const { friends, loading } = useFriends(authUser.uid);
  
  return (
    <div className="friends">
      {loading && <Loader />}
      <AddFriend dbUser={dbUser} friends={friends} />
      {friends.length
        ? (friends.map(friend => <Friend key={friend.id} dbUser={dbUser} friend={friend} />))
        : (<p className="text-muted">You haven't added any friends yet. Use the search bar above to find or invite your friends.</p>)
      }
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
