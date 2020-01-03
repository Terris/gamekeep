import { auth, emailAuthProvider, googleAuthProvider } from './firebase';

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signInWithGoogle = () =>
  auth.signInWithPopup(googleAuthProvider)

export const signOut = () =>
  auth.signOut()

export const currentUser = () =>
  auth.currentUser

export const sendPasswordResetEmail = (email) =>
  auth.sendPasswordResetEmail(email)

export const getEmailAuthCredential = (email, password) =>
  emailAuthProvider.credential(email, password)

export const getGoogleAuthCredential = (user) =>
  googleAuthProvider.credential(currentUser().getAuthResponse().id_token);
