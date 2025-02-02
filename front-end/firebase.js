// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJphTd_LbAfn2tTlM_E1q7LHFgdG5XQGo",
  authDomain: "scanner-2025.firebaseapp.com",
  projectId: "scanner-2025",
  storageBucket: "scanner-2025.firebasestorage.app",
  messagingSenderId: "963296948965",
  appId: "1:963296948965:web:d0834d7d1dddc971245a0c",
  measurementId: "G-S1BJV5C9MR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
