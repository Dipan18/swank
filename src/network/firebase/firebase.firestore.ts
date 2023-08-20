import { User } from 'firebase/auth';
import { Category } from '../../store/categories/category.type';
import { firestore } from './firebase.config';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { UserData } from '../../store/user/user.type';

type AdditionalData = {
  displayName?: string;
};

export const createUserAccountFromAuthResponse = async (
  authenticatedUser: User,
  additionalData = {} as AdditionalData
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

type DocumentsToInsert = {
  title: string;
};

export const createCollectionAndInsertDocuments = async <
  T extends DocumentsToInsert
>(
  collectionKey: string,
  documentsToInsert: T[]
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

export const fetchCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(firestore, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as Category);
};
