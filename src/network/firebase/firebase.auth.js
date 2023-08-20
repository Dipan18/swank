import { firebaseAuth } from './firebase.config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
  signInWithPopup(firebaseAuth, googleAuthProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signOutLoggedInUser = async () => await signOut(firebaseAuth);

export const onAuthStateChangedObserver = (callback) =>
  onAuthStateChanged(firebaseAuth, callback);
