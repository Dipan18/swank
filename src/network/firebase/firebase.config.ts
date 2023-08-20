import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC5YbmU-8SJOyfm6JlZAM67x9pbIURBjWs',
  authDomain: 'swank-db.firebaseapp.com',
  projectId: 'swank-db',
  storageBucket: 'swank-db.appspot.com',
  messagingSenderId: '1065407397135',
  appId: '1:1065407397135:web:87bc7f268d33664a8e127a',
};

initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const firebaseAuth = getAuth();
