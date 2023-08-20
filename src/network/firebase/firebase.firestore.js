import { firestore } from './firebase.config';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore';

export const createUserAccountFromAuthResponse = async (
  authenticatedUser,
  additionalData = {}
) => {
  const userDocRef = doc(firestore, 'users', authenticatedUser.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = authenticatedUser;
    const currentDateTime = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        createdAt: currentDateTime,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user!', error);
    }
  }

  return userDocRef;
};

export const createCollectionAndInsertDocuments = async (
  collectionKey,
  documentsToInsert
) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);

  documentsToInsert.forEach((document) => {
    const docRef = doc(collectionRef, document.title.toLowerCase());
    batch.set(docRef, document);
  });

  await batch.commit();
  console.log('done');
};

export const fetchCategoriesAndDocuments = async () => {
  const collectionRef = collection(firestore, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
