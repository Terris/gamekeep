import React from 'react';
import { FRIEND_STATUS } from '../../constants';
import { useUser } from '../user';
import { Message, Avatar } from '../ui';
import AcceptFriendBtn from './AcceptFriendBtn';
import RemoveFriendBtn from './RemoveFriendBtn';

const Friend = ({ dbUser, friend }) => {
  const { message, loading, user } = useUser(friend.friend_id);
  
  if (loading) { return null }
  return (
    <>
      {!!message && <Message message={message} />}
      <div className="friend">
        <Avatar user={user} size="small" wrapperClass="avatar-inline" />
        <p className="friend-name">{user.displayName}</p>
        <div className={`friend-status friend-status-${friend.status}`}>
          {friend.status ===  FRIEND_STATUS.REQUESTER
            ? ("Friend request sent.")
            : friend.status ===  FRIEND_STATUS.REQUESTEE
            ? (<AcceptFriendBtn dbUser={dbUser} friend={friend} />)
            : friend.status ===  FRIEND_STATUS.ACCEPTED
            ? (<RemoveFriendBtn friend={friend} />)
            : null
          }
        </div>
      </div>
    </>
  )
}

export default Friend;
