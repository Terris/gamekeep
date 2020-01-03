import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (uid, email) =>
  db.collection('users').doc(uid).set({ uid, email })

export const user = (uid) =>
  db.collection("users").doc(uid)

export const userByEmail = (email) =>
  db.collection('users').where("email", "==", email).limit(1)

// Friends API
// ----------------------------------
export const usersFriends = (uid) =>
  db.collection("users").doc(uid).collection("friends")

export const usersFriend = (uid, friendId) =>
  db.collection("users").doc(uid).collection("friends").doc(friendId)
  
export const createUsersFriend = (uid, friendId) =>
  usersFriend(uid, friendId).set({ })
