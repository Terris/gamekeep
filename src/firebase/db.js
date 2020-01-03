import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (id, email) =>
  db.ref(`users/${id}`).set({ email })
