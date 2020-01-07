import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (displayName, email, photoURL, uid) =>
  db.collection('users').doc(uid).set({ displayName, email, photoURL, uid })

export const user = (uid) =>
  db.collection("users").doc(uid)

export const userByEmail = (email) =>
  db.collection('users').where("email", "==", email).limit(1)

// Friendships API
// ----------------------------------
export const friendships = ()  =>
  db.collection('friendships')

export const friendship = (id)  =>
  db.collection('friendships').doc(id)

async function createBothFriendships(uid, friendId) {
  let batch = db.batch();
  let frnOne = await db.collection('friendships').add({ uid: uid, friend_id: friendId})
  let frnTwo = await db.collection('friendships').add({ uid: friendId, friend_id: uid})
  let invOne = await frnOne.id;
  let invTwo = await frnTwo.id;
  await batch.update(friendship(invOne), { inverse_id: frnTwo } );
  await batch.update(friendship(invTwo), { inverse_id: frnOne } );
  let commit = await batch.commit()
  return commit;
}

export const createFriendship = (uid, friendId) =>
  createBothFriendships(uid, friendId)
