
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

import { getStorage } from 'firebase/storage'

console.log(process.env.REACT_APP_FIREBASE_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "store-app-61997.firebaseapp.com",
  projectId: "store-app-61997",
  storageBucket: "store-app-61997.appspot.com",
  messagingSenderId: "584014629964",
  appId: "1:584014629964:web:a88d71d6bc01358f0e38e9",
  measurementId: "G-J0GT6HWYY4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;