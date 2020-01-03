import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (uid, email) =>
  db.collection('users').doc(uid).set({ uid, email })

// Friends API
// ----------------------------------
export const usersFriends = (uid) =>
  db.collection("users").doc(uid).collection("friends")
