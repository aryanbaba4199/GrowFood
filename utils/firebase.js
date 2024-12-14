// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';

dotenv.config();


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FRKEY,
  authDomain: process.env.NEXT_PUBLIC_FRDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FRPID,
  storageBucket: process.env.NEXT_PUBLIC_FRSTORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FRMID,
  appId: process.env.NEXT_PUBLIC_AID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
