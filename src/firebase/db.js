import { db } from './firebase';
import { FRIEND_STATUS } from '../constants'

// User API
// ----------------------------------
export const user = (uid) =>
  db.collection("users").doc(uid)

export const userByEmail = (email) =>
  db.collection('users').where("email", "==", email).limit(1)

export const createUser = (displayName, email, photoURL, uid) =>
  db.collection('users').doc(uid).set({ displayName, email, photoURL, uid })

// Friendships API
// ----------------------------------
export const friendships = ()  =>
  db.collection('friendships')

export const friendship = (id)  =>
  db.collection('friendships').doc(id)

export const createFriendship = async (uid, friendId) => {
  let friendOne = await db.collection('friendships').add({ uid: uid, friend_id: friendId})
  let friendTwo = await db.collection('friendships').add({ uid: friendId, friend_id: uid})
  let inviteOne = await friendOne.id;
  let inviteTwo = await friendTwo.id;
  let batch = db.batch();
  await batch.update(friendship(inviteOne), { inverse_id: inviteTwo, status: FRIEND_STATUS.REQUESTER } );
  await batch.update(friendship(inviteTwo), { inverse_id: inviteOne, status: FRIEND_STATUS.REQUESTEE } );
  let commit = await batch.commit()
  return commit;
}

export const acceptFriendRequest = (friend) => {
  let batch = db.batch();
  batch.update(friendship(friend.id), { status: FRIEND_STATUS.ACCEPTED } );
  batch.update(friendship(friend.inverse_id), { status: FRIEND_STATUS.ACCEPTED } );
  return batch.commit()
}

export const removeFriend = (friend) => {
  let batch = db.batch();
  batch.delete(friendship(friend.id));
  batch.delete(friendship(friend.inverse_id));
  return batch.commit()
}
