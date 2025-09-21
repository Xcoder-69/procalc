// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy_u2sknXu2Kc4BN2FlEn6YJAZyM7e01o",
  authDomain: "studio-7654728390-57060.firebaseapp.com",
  projectId: "studio-7654728390-57060",
  storageBucket: "studio-7654728390-57060.firebasestorage.app",
  messagingSenderId: "294209817908",
  appId: "1:294209817908:web:58eb9c027c8771a3c62961"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app, {
  persistence: undefined, // Let Firebase decide persistence
  authDomain: "procalc-hub.vercel.app", // Explicitly set for Vercel
});
const db = getFirestore(app);

export { app, auth, db };
