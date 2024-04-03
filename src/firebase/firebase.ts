import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5iDLBcoJQjUVrYlKcmGtTxwF8ss46_ro",
  authDomain: "zalo-mini-app-75fbf.firebaseapp.com",
  projectId: "zalo-mini-app-75fbf",
  storageBucket: "zalo-mini-app-75fbf.appspot.com",
  messagingSenderId: "451324155515",
  appId: "1:451324155515:web:4a4e342cfda2189aeff4de",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
