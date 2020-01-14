import moment from 'moment';
import { db, firestore } from './firebase';
import { FRIEND_STATUS } from '../constants'

// User API
// ----------------------------------
export const user = (uid) =>
  db.collection("users").doc(uid)

export const userByEmail = (email) =>
  db.collection('users').where("email", "==", email).limit(1)

export const createUser = (displayName, email, photoURL, uid) =>
  db.collection('users').doc(uid).set({ displayName, email, photoURL, uid })

// Alerts API
// ----------------------------------
export const userAlerts = (uid) =>
  db.collection('users').doc(uid).collection('alerts')

export const userAlert = (uid, id) =>
  user(uid).collection('alerts').doc(id)

export const createUserAlert = (uid, alert) =>
  user(uid).collection('alerts').add({ ...alert })

export const deleteUserAlert = (uid, alertId) =>
  user(uid).collection('alerts').doc(alertId).delete()

// Friendships API
// ----------------------------------
export const friendships = ()  =>
  db.collection('friendships')

export const friendship = (id)  =>
  db.collection('friendships').doc(id)

export const createFriendship = async (user, friend) => {
  let friendshipOne = await db.collection('friendships').add({ uid: user.uid, friend_id: friend.uid})
  let friendshipTwo = await db.collection('friendships').add({ uid: friend.uid, friend_id: user.uid})
  let inviteAlert = await createUserAlert(friend.uid, {type: "invite", message: `${user.displayName} wants to be friends! Click here to accept.`, link: "FRIENDS" });
  friendshipOne = await friendshipOne.id;
  friendshipTwo = await friendshipTwo.id;
  inviteAlert = await inviteAlert.id;
  let batch = db.batch();
  await batch.update(friendship(friendshipOne), { inverse_id: friendshipTwo, status: FRIEND_STATUS.REQUESTER } );
  await batch.update(friendship(friendshipTwo), { inverse_id: friendshipOne, status: FRIEND_STATUS.REQUESTEE, alertRef: inviteAlert } );
  const commit = await batch.commit();
  return commit;
}

export const acceptFriendRequest = (user, friend) => {
  let batch = db.batch();
  batch.update(friendship(friend.id), { status: FRIEND_STATUS.ACCEPTED } );
  batch.update(friendship(friend.inverse_id), { status: FRIEND_STATUS.ACCEPTED } );
  batch.delete(userAlert(friend.uid, friend.alertRef));
  createUserAlert(friend.friend_id, {type: "invite_accepted", message: `${user.displayName} accepted your friend request!`, link: "FRIENDS" });
  return batch.commit();
}

export const removeFriend = (friend) => {
  let batch = db.batch();
  batch.delete(friendship(friend.id));
  batch.delete(friendship(friend.inverse_id));
  return batch.commit();
}

// Games API
// ----------------------------------

export const games = (uid) =>
  db.collection("games").where('uid', "==", uid)

export const game = (id) =>
  db.collection("games").doc(id)

export const createGame = (uid, name, players) =>
  db.collection("games").add({ uid: uid, name: name, players: players, scores: {}})

export const addGameScore = (gameId, playerId, score) => {
  return game(gameId).set({
    scores: {
      [playerId]: firestore.FieldValue.arrayUnion({
        timestamp: moment().format(),
        score
      })
    }
  }, { merge: true })
}
  
