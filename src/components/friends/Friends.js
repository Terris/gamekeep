import React from 'react';
import { withAuthorization } from '../session';
import { useFriends } from './hooks';
import { Loader } from '../ui';
import AddFriend from './AddFriend';
import Friend from './Friend';

const Friends = ({ authUser }) => {
  const { friends } = useFriends(authUser.uid);
  
  return (
    <div className="friends">
      {!friends && <Loader />}
      <h2>Friends</h2>
      <AddFriend user={authUser} friends={friends} />
      {!!friends && friends.map(friend => <Friend key={friend.id} uid={friend.friend_id} />)}
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Friends);
