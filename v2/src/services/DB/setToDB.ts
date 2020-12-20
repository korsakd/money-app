import { resolvePlugin } from '@babel/core';
import database, {
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';

export const initDB = (userId: string, data: number) => {
  console.tron({ userId });
  new Promise<void>((resolve, reject) => {
    database()
      .ref(`users/${userId}`)
      .set(data)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};
